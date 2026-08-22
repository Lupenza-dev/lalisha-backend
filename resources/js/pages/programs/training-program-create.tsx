import { Head } from '@inertiajs/react';
import { ArrowLeft, FilePlus } from 'lucide-react';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useFlashToast } from '@/hooks/use-flash-toast';
import TrainingProgramForm, {
    type SelectOption,
} from '@/components/programs/TrainingProgramForm';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Training Programs', href: '/training-programs' },
    { title: 'Create', href: '/training-programs/create' },
];

interface Props {
    programCategories: SelectOption[];
    programTypes: SelectOption[];
}

export default function TrainingProgramCreate({ programCategories, programTypes }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Training Program" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title="Create Training Program"
                    description="Fill in the details below to create a new training program."
                    icon={FilePlus}
                    actions={
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    }
                />

                <TrainingProgramForm
                    mode="create"
                    initial={{
                        name: '',
                        time_type: '',
                        program_category_id: '',
                        program_type_id: '',
                        description: '',
                        price: '',
                        benefit: '',
                    }}
                    programCategories={programCategories}
                    programTypes={programTypes}
                />
            </div>
        </AppLayout>
    );
}
