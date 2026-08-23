import { useState, type FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MoneyInput } from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, Film, ImagePlus, Layers, Plus, Star, Trash2, Upload, X } from 'lucide-react';

export type SelectOption = { id: number; name: string };

export type ExistingClip = {
    id: number;
    name: string;
    url: string;
};

export type TrainingProgramFormInitial = {
    id?: number;
    name: string;
    time_type: '' | 'weekly' | 'monthly' | 'days';
    program_category_id: number | '';
    program_type_id: number | '';
    description: string;
    price: string | number;
    benefit: string;
    cover_image_url?: string | null;
    clips?: ExistingClip[];
};

interface Props {
    mode: 'create' | 'edit';
    initial: TrainingProgramFormInitial;
    programCategories: SelectOption[];
    programTypes: SelectOption[];
}

type NewClip = { name: string; file: File | null };

type FormPayload = {
    name: string;
    time_type: string;
    program_category_id: number | '';
    program_type_id: number | '';
    description: string;
    price: string | number;
    benefit: string;
    cover_image: File | null;
    remove_cover: boolean;
    deleted_clip_ids: number[];
    clips: NewClip[];
    _method?: string;
};

export default function TrainingProgramForm({ mode, initial, programCategories, programTypes }: Props) {
    const [existingClips, setExistingClips] = useState<ExistingClip[]>(initial.clips ?? []);
    const [coverPreview, setCoverPreview] = useState<string | null>(initial.cover_image_url ?? null);

    const { data, setData, post, processing, errors, progress } = useForm<FormPayload>({
        name: initial.name ?? '',
        time_type: initial.time_type || '',
        program_category_id: initial.program_category_id ?? '',
        program_type_id: initial.program_type_id ?? '',
        description: initial.description ?? '',
        price: initial.price ?? '',
        benefit: initial.benefit ?? '',
        cover_image: null,
        remove_cover: false,
        deleted_clip_ids: [],
        clips: [],
        ...(mode === 'edit' ? { _method: 'put' } : {}),
    });

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('cover_image', file);
        setData('remove_cover', false);
        if (file) {
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const removeCover = () => {
        setData('cover_image', null);
        setData('remove_cover', true);
        setCoverPreview(null);
    };

    const addClipRow = () => {
        setData('clips', [...data.clips, { name: '', file: null }]);
    };

    const updateClipRow = (index: number, patch: Partial<NewClip>) => {
        const next = data.clips.map((c, i) => (i === index ? { ...c, ...patch } : c));
        setData('clips', next);
    };

    const removeClipRow = (index: number) => {
        setData(
            'clips',
            data.clips.filter((_, i) => i !== index),
        );
    };

    const removeExistingClip = (clipId: number) => {
        setExistingClips((prev) => prev.filter((c) => c.id !== clipId));
        setData('deleted_clip_ids', [...data.deleted_clip_ids, clipId]);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const url =
            mode === 'create'
                ? '/training-programs'
                : `/training-programs/${initial.id}`;

        post(url, {
            forceFormData: true,
            onError: () => toast.error('Please fix the errors and try again.'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Program Details */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Program Details</CardTitle>
                    </div>
                    <CardDescription>Configure the type, category, and delivery method for this program.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-2 md:col-span-3">
                            <Label htmlFor="name">
                                Program Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter training program name"
                                maxLength={255}
                                required
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time_type">
                                Time Type <span className="text-destructive">*</span>
                            </Label>
                            <Select value={data.time_type} onValueChange={(v) => setData('time_type', v)}>
                                <SelectTrigger><SelectValue placeholder="Select time type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="days">Days</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.time_type && <p className="text-sm text-red-600">{errors.time_type}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="program_category_id">
                                Program Category <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.program_category_id ? String(data.program_category_id) : ''}
                                onValueChange={(v) => setData('program_category_id', Number(v))}
                            >
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>
                                    {programCategories.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.program_category_id && <p className="text-sm text-red-600">{errors.program_category_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="program_type_id">
                                Program Type <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.program_type_id ? String(data.program_type_id) : ''}
                                onValueChange={(v) => setData('program_type_id', Number(v))}
                            >
                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                <SelectContent>
                                    {programTypes.map((t) => (
                                        <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.program_type_id && <p className="text-sm text-red-600">{errors.program_type_id}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Banknote className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Pricing</CardTitle>
                    </div>
                    <CardDescription>Set the enrollment price for this training program.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-w-sm">
                        <Label htmlFor="price">Price <span className="text-destructive">*</span></Label>
                        <div className="relative mt-2">
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
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Description & Benefits */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Description & Benefits</CardTitle>
                    </div>
                    <CardDescription>Describe the program and highlight what participants will gain.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Enter training program description"
                            rows={4}
                            className="min-h-[120px]"
                            required
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="benefit">Benefits <span className="text-destructive">*</span></Label>
                        <Textarea
                            id="benefit"
                            value={data.benefit}
                            onChange={(e) => setData('benefit', e.target.value)}
                            placeholder="List the benefits of this training program"
                            rows={3}
                            className="min-h-[100px]"
                            required
                        />
                        {errors.benefit && <p className="text-sm text-red-600">{errors.benefit}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Cover Image</CardTitle>
                    </div>
                    <CardDescription>Upload an image to represent this program (optional).</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-6">
                        <label
                            htmlFor="cover_image"
                            className="flex min-h-[140px] flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted"
                        >
                            <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Click to upload an image</span>
                            <span className="mt-1 text-xs text-muted-foreground/70">PNG, JPG, GIF up to 10MB</span>
                            <Input
                                id="cover_image"
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                className="hidden"
                            />
                        </label>
                        {coverPreview && (
                            <div className="flex flex-col items-center gap-2">
                                <img
                                    src={coverPreview}
                                    alt="Cover preview"
                                    className="h-[140px] w-[140px] rounded-lg border object-cover"
                                />
                                <Button type="button" variant="ghost" size="sm" onClick={removeCover}>
                                    <X className="mr-1 h-3 w-3" /> Remove
                                </Button>
                            </div>
                        )}
                    </div>
                    {errors.cover_image && <p className="mt-2 text-sm text-red-600">{errors.cover_image}</p>}
                </CardContent>
            </Card>

            {/* Clips */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Film className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Program Short Clips</CardTitle>
                            </div>
                            <CardDescription>Upload short video clips that showcase this program.</CardDescription>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={addClipRow}>
                            <Plus className="mr-1 h-4 w-4" /> Add Clip
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {existingClips.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">Existing Clips</p>
                            {existingClips.map((clip) => (
                                <div
                                    key={clip.id}
                                    className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3"
                                >
                                    <div className="flex flex-1 items-center gap-3">
                                        <Film className="h-5 w-5 text-muted-foreground" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{clip.name}</p>
                                            <a
                                                href={clip.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-primary hover:underline"
                                            >
                                                View clip
                                            </a>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeExistingClip(clip.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.clips.length > 0 && (
                        <div className="space-y-3">
                            {existingClips.length > 0 && (
                                <p className="text-sm font-medium text-muted-foreground">New Clips</p>
                            )}
                            {data.clips.map((clip, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
                                >
                                    <div className="space-y-1">
                                        <Label htmlFor={`clip_name_${index}`}>Clip Name</Label>
                                        <Input
                                            id={`clip_name_${index}`}
                                            value={clip.name}
                                            onChange={(e) => updateClipRow(index, { name: e.target.value })}
                                            placeholder="e.g. Intro Highlight"
                                        />
                                        {errors[`clips.${index}.name` as keyof typeof errors] && (
                                            <p className="text-sm text-red-600">
                                                {errors[`clips.${index}.name` as keyof typeof errors]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor={`clip_file_${index}`}>Clip File</Label>
                                        <Input
                                            id={`clip_file_${index}`}
                                            type="file"
                                            accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
                                            onChange={(e) =>
                                                updateClipRow(index, { file: e.target.files?.[0] ?? null })
                                            }
                                        />
                                        {errors[`clips.${index}.file` as keyof typeof errors] && (
                                            <p className="text-sm text-red-600">
                                                {errors[`clips.${index}.file` as keyof typeof errors]}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeClipRow(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.clips.length === 0 && existingClips.length === 0 && (
                        <p className="rounded-lg border border-dashed py-6 text-center text-sm text-muted-foreground">
                            No clips added yet. Click "Add Clip" to upload one.
                        </p>
                    )}
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
                    {processing
                        ? 'Saving...'
                        : mode === 'create'
                          ? 'Create Training Program'
                          : 'Update Training Program'}
                </Button>
            </div>
        </form>
    );
}
