import { Head } from '@inertiajs/react';
import { ArrowLeft, UserPen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useFlashToast } from '@/hooks/use-flash-toast';
import TrainerForm, { type SelectOption } from '@/components/trainers/TrainerForm';
import PageHeader from '@/components/page-header';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Trainers', href: '/trainers' },
    { title: 'Edit', href: '#' },
];

interface TrainerProp {
    id: number;
    name: string;
    email: string;
    program_type_id: number;
    training_level_id: number;
    session_price: string | number;
    certifications: string;
    achievements: string;
    availability: 'available' | 'unavailable';
    status: 'active' | 'inactive';
    image_url: string | null;
}

interface Props {
    trainer: TrainerProp;
    programTypes: SelectOption[];
    trainingLevels: SelectOption[];
}

export default function TrainerEdit({ trainer, programTypes, trainingLevels }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Trainer" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title={`Edit Trainer — ${trainer.name}`}
                    description="Update trainer details, image, or availability."
                    icon={UserPen}
                    actions={
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    }
                />

                <TrainerForm
                    mode="edit"
                    initial={{
                        id: trainer.id,
                        name: trainer.name,
                        email: trainer.email,
                        program_type_id: trainer.program_type_id,
                        training_level_id: trainer.training_level_id,
                        session_price: trainer.session_price,
                        certifications: trainer.certifications,
                        achievements: trainer.achievements,
                        availability: trainer.availability,
                        status: trainer.status,
                        image_url: trainer.image_url,
                    }}
                    programTypes={programTypes}
                    trainingLevels={trainingLevels}
                />
            </div>
        </AppLayout>
    );
}
