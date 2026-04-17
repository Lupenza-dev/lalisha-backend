import AppCard from '@/components/ui/appCard';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Cog, FolderOpen, Layers, Award, GraduationCap, Package, ArrowLeft } from 'lucide-react';
import CustomDataTable from '@/components/CustomDataTable';
import { programCategoryColumns, sampleProgramCategories } from '@/components/CustomDataTableExample';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Training Programs',
        href: '/training-programs',
    },
];

export default function TrainingProgram() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Training Programs" />
            <div className="flex items-center justify-between py-4 px-4">
                <Button variant="outline" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Link href="/training-programs/create">
                    <Button>Add Training Program</Button>
                </Link>
            </div>
            <div className="px-6">
                <CustomDataTable 
                    columns={programCategoryColumns}
                    data={sampleProgramCategories}
                    searchPlaceholder="Search training programs..."
                    searchColumn="name"
                />
            </div>

        </AppLayout>
    );
}
