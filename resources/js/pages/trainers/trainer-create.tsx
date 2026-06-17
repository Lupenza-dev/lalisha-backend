import { Head } from '@inertiajs/react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useFlashToast } from '@/hooks/use-flash-toast';
import TrainerForm, { type SelectOption } from '@/components/trainers/TrainerForm';
import PageHeader from '@/components/page-header';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Trainers', href: '/trainers' },
    { title: 'Create', href: '/trainers/create' },
];

interface Props {
    programTypes: SelectOption[];
    trainingLevels: SelectOption[];
}

export default function TrainerCreate({ programTypes, trainingLevels }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Trainer" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title="Create Trainer"
                    description="Fill in the details below to register a new trainer."
                    icon={UserPlus}
                    actions={
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    }
                />

                <TrainerForm
                    mode="create"
                    initial={{
                        name: '',
                        email: '',
                        program_type_id: '',
                        training_level_id: '',
                        session_price: '',
                        certifications: '',
                        achievements: '',
                        availability: '',
                    }}
                    programTypes={programTypes}
                    trainingLevels={trainingLevels}
                />
            </div>
        </AppLayout>
    );
}
