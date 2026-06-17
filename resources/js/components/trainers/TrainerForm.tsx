import { useState, type FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Award,
    CalendarCheck,
    DollarSign,
    GraduationCap,
    ImagePlus,
    Upload,
    User,
    X,
} from 'lucide-react';

export type SelectOption = { id: number; name: string };

export type TrainerFormInitial = {
    id?: number;
    name: string;
    email: string;
    program_type_id: number | '';
    training_level_id: number | '';
    session_price: string | number;
    certifications: string;
    achievements: string;
    availability: '' | 'available' | 'unavailable';
    status?: 'active' | 'inactive';
    image_url?: string | null;
};

interface Props {
    mode: 'create' | 'edit';
    initial: TrainerFormInitial;
    programTypes: SelectOption[];
    trainingLevels: SelectOption[];
}

type FormPayload = {
    name: string;
    email: string;
    program_type_id: number | '';
    training_level_id: number | '';
    session_price: string | number;
    certifications: string;
    achievements: string;
    availability: string;
    status: 'active' | 'inactive';
    image: File | null;
    remove_image: boolean;
    _method?: string;
};

export default function TrainerForm({ mode, initial, programTypes, trainingLevels }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(initial.image_url ?? null);

    const { data, setData, post, processing, errors, progress } = useForm<FormPayload>({
        name: initial.name ?? '',
        email: initial.email ?? '',
        program_type_id: initial.program_type_id ?? '',
        training_level_id: initial.training_level_id ?? '',
        session_price: initial.session_price ?? '',
        certifications: initial.certifications ?? '',
        achievements: initial.achievements ?? '',
        availability: initial.availability || '',
        status: initial.status ?? 'active',
        image: null,
        remove_image: false,
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
        const url = mode === 'create' ? '/trainers' : `/trainers/${initial.id}`;
        post(url, {
            forceFormData: true,
            onError: () => toast.error('Please fix the errors and try again.'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                    </div>
                    <CardDescription>Basic contact details for the trainer.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Full Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter trainer's full name"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="trainer@example.com"
                                required
                            />
                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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

            {/* Trainer Image */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Trainer Image</CardTitle>
                    </div>
                    <CardDescription>Upload a profile picture for the trainer (optional).</CardDescription>
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
                                    className="h-[140px] w-[140px] rounded-full border object-cover"
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

            {/* Training Details */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Training Details</CardTitle>
                    </div>
                    <CardDescription>Specify the program type, level, and session pricing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="program_type_id">
                                Training Type Offer <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.program_type_id ? String(data.program_type_id) : ''}
                                onValueChange={(v) => setData('program_type_id', Number(v))}
                            >
                                <SelectTrigger><SelectValue placeholder="Select program type" /></SelectTrigger>
                                <SelectContent>
                                    {programTypes.map((t) => (
                                        <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.program_type_id && (
                                <p className="text-sm text-red-600">{errors.program_type_id}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="training_level_id">
                                Training Level <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.training_level_id ? String(data.training_level_id) : ''}
                                onValueChange={(v) => setData('training_level_id', Number(v))}
                            >
                                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                                <SelectContent>
                                    {trainingLevels.map((l) => (
                                        <SelectItem key={l.id} value={String(l.id)}>{l.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.training_level_id && (
                                <p className="text-sm text-red-600">{errors.training_level_id}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="session_price">
                                Book Session Price <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="session_price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.session_price}
                                    onChange={(e) => setData('session_price', e.target.value)}
                                    placeholder="0.00"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            {errors.session_price && (
                                <p className="text-sm text-red-600">{errors.session_price}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Certifications & Achievements */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Certifications & Achievements</CardTitle>
                    </div>
                    <CardDescription>List the trainer's qualifications and notable accomplishments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="certifications">
                            Certifications <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="certifications"
                            value={data.certifications}
                            onChange={(e) => setData('certifications', e.target.value)}
                            placeholder="List certifications (e.g., AWS Certified, Google Cloud Professional...)"
                            rows={3}
                            className="min-h-[100px]"
                            required
                        />
                        {errors.certifications && (
                            <p className="text-sm text-red-600">{errors.certifications}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="achievements">
                            Achievements <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="achievements"
                            value={data.achievements}
                            onChange={(e) => setData('achievements', e.target.value)}
                            placeholder="List notable achievements and accomplishments"
                            rows={3}
                            className="min-h-[100px]"
                            required
                        />
                        {errors.achievements && (
                            <p className="text-sm text-red-600">{errors.achievements}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Availability */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Availability</CardTitle>
                    </div>
                    <CardDescription>Set the trainer's current availability status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-w-sm space-y-2">
                        <Label htmlFor="availability">
                            Availability <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            value={data.availability}
                            onValueChange={(v) => setData('availability', v)}
                        >
                            <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="unavailable">Unavailable</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.availability && (
                            <p className="text-sm text-red-600">{errors.availability}</p>
                        )}
                    </div>
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
                    {processing ? 'Saving...' : mode === 'create' ? 'Create Trainer' : 'Update Trainer'}
                </Button>
            </div>
        </form>
    );
}
