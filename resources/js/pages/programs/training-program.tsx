import { useMemo } from 'react';
import { formatTZS } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Dumbbell, Edit, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import PageHeader from '@/components/page-header';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomDataTable from '@/components/CustomDataTable';
import { useFlashToast } from '@/hooks/use-flash-toast';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Training Programs', href: '/training-programs' },
];

type ProgramRow = {
    id: number;
    name: string;
    time_type: string;
    price: string | number;
    status: 'active' | 'inactive';
    clips_count: number;
    created_at: string;
    program_category: { id: number; name: string } | null;
    program_type: { id: number; name: string } | null;
};

interface Props {
    items: ProgramRow[];
}

export default function TrainingProgram({ items }: Props) {
    useFlashToast();

    const handleDelete = (item: ProgramRow) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${item.name}? This will also remove its clips. This cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            router.delete(`/training-programs/${item.id}`, {
                preserveScroll: true,
                onError: () => toast.error('Failed to delete. Please try again.'),
            });
        });
    };

    const columns = useMemo<ColumnDef<ProgramRow>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
            },
            {
                id: 'category',
                header: 'Category',
                cell: ({ row }) => <span>{row.original.program_category?.name ?? '—'}</span>,
            },
            {
                id: 'type',
                header: 'Type',
                cell: ({ row }) => <span>{row.original.program_type?.name ?? '—'}</span>,
            },
            {
                accessorKey: 'time_type',
                header: 'Time Type',
                cell: ({ row }) => <span className="capitalize">{row.original.time_type}</span>,
            },
            {
                accessorKey: 'price',
                header: 'Price',
                cell: ({ row }) => <span>{formatTZS(row.original.price)}</span>,
            },
            {
                accessorKey: 'clips_count',
                header: 'Clips',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => (
                    <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
                        {row.original.status}
                    </Badge>
                ),
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const item = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/training-programs/${item.id}/edit`}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDelete(item)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Training Programs" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title="Training Programs"
                    description={`Build and publish workout programs — ${items.length} programs`}
                    icon={Dumbbell}
                    actions={
                        <>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Link href="/training-programs/create">
                                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Program
                                </Button>
                            </Link>
                        </>
                    }
                />

                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <CustomDataTable
                        columns={columns}
                        data={items}
                        searchPlaceholder="Search training programs..."
                        searchColumn="name"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
