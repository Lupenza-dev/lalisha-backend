import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Cog, FolderOpen, Layers, Award, GraduationCap, Package, ArrowLeft, Upload, Clock, DollarSign, Star } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Training Programs',
        href: '/training-programs',
    },
];

export default function TrainingProgramCreate() {
    const [formData, setFormData] = useState({
        time_type: '',
        program_category: '',
        program_type: '',
        description: '',
        price: '',
        benefit: '',
        cover_image: null
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // TODO: Add API call to save training program
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                cover_image: e.target.files[0]
            }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Training Program" />
            <div className="px-6 py-4">
               
                <div className="flex items-center justify-between py-4 px-4">
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>
            </div>
            <div className="px-6 pb-6">
                 <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Training Program</h1>
                    <p className="text-gray-600 mb-6">Fill in the details below to create a new training program.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Time Type */}
                        <div className="space-y-2">
                            <Label htmlFor="time_type">
                                Time Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.time_type} onValueChange={(value) => handleInputChange('time_type')({ target: { value } } as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="days">Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Program Category */}
                        <div className="space-y-2">
                            <Label htmlFor="program_category">
                                Program Category <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.program_category} onValueChange={(value) => handleInputChange('program_category')({ target: { value } } as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select program category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web-development">Web Development</SelectItem>
                                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                    <SelectItem value="data-science">Data Science</SelectItem>
                                    <SelectItem value="devops">DevOps</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Program Type */}
                        <div className="space-y-2">
                            <Label htmlFor="program_type">
                                Program Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.program_type} onValueChange={(value) => handleInputChange('program_type')({ target: { value } } as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select program type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="offline">Offline</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Price <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleInputChange('price')}
                                    placeholder="0.00"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            placeholder="Enter training program description"
                            rows={4}
                            className="min-h-[120px]"
                            required
                        />
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                        <Label htmlFor="benefit">
                            Benefits <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="benefit"
                            value={formData.benefit}
                            onChange={handleInputChange('benefit')}
                            placeholder="List the benefits of this training program"
                            rows={3}
                            className="min-h-[100px]"
                            required
                        />
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <Label htmlFor="cover_image">
                            Cover Image
                        </Label>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <Input
                                    id="cover_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="cursor-pointer"
                                />
                            </div>
                            {formData.cover_image && (
                                <div className="flex items-center space-x-2">
                                    <img 
                                        src={URL.createObjectURL(formData.cover_image)} 
                                        alt="Cover preview" 
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                    <span className="text-sm text-gray-500">Preview</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button type="submit" className="px-8">
                            Create Training Program
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
