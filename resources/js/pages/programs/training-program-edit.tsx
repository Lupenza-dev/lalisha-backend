import { Head } from '@inertiajs/react';
import { ArrowLeft, FilePen } from 'lucide-react';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useFlashToast } from '@/hooks/use-flash-toast';
import TrainingProgramForm, {
    type ExistingClip,
    type SelectOption,
} from '@/components/programs/TrainingProgramForm';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Training Programs', href: '/training-programs' },
    { title: 'Edit', href: '#' },
];

interface ProgramProp {
    id: number;
    time_type: 'weekly' | 'monthly' | 'days';
    program_category_id: number;
    program_type_id: number;
    description: string;
    price: string | number;
    benefit: string;
    cover_image_url: string | null;
    clips: ExistingClip[];
}

interface Props {
    program: ProgramProp;
    programCategories: SelectOption[];
    programTypes: SelectOption[];
}

export default function TrainingProgramEdit({ program, programCategories, programTypes }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Training Program" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title={`Edit Program #${program.id}`}
                    description="Update details, replace the cover image, or manage clips."
                    icon={FilePen}
                    actions={
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    }
                />

                <TrainingProgramForm
                    mode="edit"
                    initial={{
                        id: program.id,
                        time_type: program.time_type,
                        program_category_id: program.program_category_id,
                        program_type_id: program.program_type_id,
                        description: program.description,
                        price: program.price,
                        benefit: program.benefit,
                        cover_image_url: program.cover_image_url,
                        clips: program.clips,
                    }}
                    programCategories={programCategories}
                    programTypes={programTypes}
                />
            </div>
        </AppLayout>
    );
}
