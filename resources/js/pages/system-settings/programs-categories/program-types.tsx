import { FormEventHandler } from 'react';
import AppCard from '@/components/ui/appCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Cog, FolderOpen, Layers, Award, GraduationCap, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from '@/components/CustomDataTable';
import { programCategoryColumns, sampleProgramCategories } from '@/components/CustomDataTableExample';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Program Types',
        href: '/program-types',
    },
];

export default function ProgramTypes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // TODO: Add API call to save the program category
        setIsModalOpen(false);
        setFormData({ name: '', description: '' });
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Program Types" />
            <div className="flex items-center justify-between py-4 px-4">
                <Button variant="outline" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Program Type</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add Program Type</DialogTitle>
                            <DialogDescription>
                                Create a new program category to organize your programs.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange('name')}
                                        placeholder="Enter category name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={handleInputChange('description')}
                                        className="min-h-[100px]"
                                        placeholder="Enter category description"
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Type</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="px-6">
                <CustomDataTable 
                    columns={programCategoryColumns}
                    data={sampleProgramCategories}
                    searchPlaceholder="Search Types..."
                    searchColumn="name"
                />
            </div>

        </AppLayout>
    );
}
