import { useState, type FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MoneyInput } from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, FileText, ImagePlus, Layers, Tag, Upload, X } from 'lucide-react';

export type SelectOption = { id: number; name: string };

export type ShopProductFormInitial = {
    id?: number;
    product_category_id: number | '';
    name: string;
    description: string;
    price: string | number;
    has_offer: boolean;
    offer_price: string | number | null;
    image_url?: string | null;
    status?: 'active' | 'inactive';
};

interface Props {
    mode: 'create' | 'edit';
    initial: ShopProductFormInitial;
    productCategories: SelectOption[];
}

type FormPayload = {
    product_category_id: number | '';
    name: string;
    description: string;
    price: string | number;
    has_offer: boolean;
    offer_price: string | number;
    image: File | null;
    remove_image: boolean;
    status: 'active' | 'inactive';
    _method?: string;
};

export default function ShopProductForm({ mode, initial, productCategories }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(initial.image_url ?? null);

    const { data, setData, post, processing, errors, progress } = useForm<FormPayload>({
        product_category_id: initial.product_category_id ?? '',
        name: initial.name ?? '',
        description: initial.description ?? '',
        price: initial.price ?? '',
        has_offer: initial.has_offer ?? false,
        offer_price: initial.offer_price ?? '',
        image: null,
        remove_image: false,
        status: initial.status ?? 'active',
        ...(mode === 'edit' ? { _method: 'put' } : {}),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        setData('remove_image', false);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData('image', null);
        setData('remove_image', true);
        setImagePreview(null);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = mode === 'create' ? '/shop-products' : `/shop-products/${initial.id}`;
        post(url, {
            forceFormData: true,
            onError: () => toast.error('Please fix the errors and try again.'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Details */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Product Details</CardTitle>
                    </div>
                    <CardDescription>Set the product name and category.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Product Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="product_category_id">
                                Category <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.product_category_id ? String(data.product_category_id) : ''}
                                onValueChange={(v) => setData('product_category_id', Number(v))}
                            >
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>
                                    {productCategories.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.product_category_id && (
                                <p className="text-sm text-red-600">{errors.product_category_id}</p>
                            )}
                        </div>
                    </div>

                    {mode === 'edit' && (
                        <div className="mt-6 max-w-sm space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(v) => setData('status', v as 'active' | 'inactive')}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Description</CardTitle>
                    </div>
                    <CardDescription>Provide a detailed description of the product.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Enter product description"
                            rows={4}
                            className="min-h-[120px]"
                            required
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Pricing & Offer */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Pricing & Offer</CardTitle>
                    </div>
                    <CardDescription>Set the product price and configure special offers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Price <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <MoneyInput
                                    id="price"
                                    value={data.price}
                                    onValueChange={(value) => setData('price', value)}
                                    placeholder="0.00"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                        </div>

                        {data.has_offer && (
                            <div className="space-y-2">
                                <Label htmlFor="offer_price">
                                    Offer Price <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <MoneyInput
                                        id="offer_price"
                                        value={data.offer_price}
                                        onValueChange={(value) => setData('offer_price', value)}
                                        placeholder="0.00"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                                {errors.offer_price && (
                                    <p className="text-sm text-red-600">{errors.offer_price}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="has_offer"
                            checked={data.has_offer}
                            onCheckedChange={(checked) => {
                                const isChecked = checked === true;
                                setData('has_offer', isChecked);
                                if (!isChecked) {
                                    setData('offer_price', '');
                                }
                            }}
                        />
                        <Label htmlFor="has_offer" className="cursor-pointer text-sm font-medium leading-none">
                            This product has a special offer
                        </Label>
                    </div>
                </CardContent>
            </Card>

            {/* Image */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Product Image</CardTitle>
                    </div>
                    <CardDescription>Upload an image to represent this product (optional).</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-6">
                        <label
                            htmlFor="image"
                            className="flex min-h-[140px] flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted"
                        >
                            <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Click to upload an image</span>
                            <span className="mt-1 text-xs text-muted-foreground/70">PNG, JPG, GIF up to 10MB</span>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {imagePreview && (
                            <div className="flex flex-col items-center gap-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-[140px] w-[140px] rounded-lg border object-cover"
                                />
                                <Button type="button" variant="ghost" size="sm" onClick={removeImage}>
                                    <X className="mr-1 h-3 w-3" /> Remove
                                </Button>
                            </div>
                        )}
                    </div>
                    {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                </CardContent>
            </Card>

            {progress && (
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress.percentage}%` }}
                    />
                </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
                </Button>
            </div>
        </form>
    );
}
