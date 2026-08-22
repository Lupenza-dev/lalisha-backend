import { useMemo } from 'react';
import { formatTZS } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, MoreHorizontal, Plus, Trash2, User, Users } from 'lucide-react';
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
    { title: 'Trainers', href: '/trainers' },
];

type TrainerRow = {
    id: number;
    name: string;
    email: string;
    image_url: string | null;
    session_price: string | number;
    availability: 'available' | 'unavailable';
    status: 'active' | 'inactive';
    program_type: { id: number; name: string } | null;
    training_level: { id: number; name: string } | null;
};

interface Props {
    items: TrainerRow[];
}

export default function Trainer({ items }: Props) {
    useFlashToast();

    const handleDelete = (item: TrainerRow) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete trainer "${item.name}"? This cannot be undone.`,
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
            router.delete(`/trainers/${item.id}`, {
                preserveScroll: true,
                onError: () => toast.error('Failed to delete. Please try again.'),
            });
        });
    };

    const columns = useMemo<ColumnDef<TrainerRow>[]>(
        () => [
            {
                id: 'image',
                header: '',
                cell: ({ row }) => (
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                        {row.original.image_url ? (
                            <img
                                src={row.original.image_url}
                                alt={row.original.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <User className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                ),
            },
            {
                accessorKey: 'name',
                header: 'Name',
                cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                id: 'program_type',
                header: 'Training Type',
                cell: ({ row }) => <span>{row.original.program_type?.name ?? '—'}</span>,
            },
            {
                id: 'training_level',
                header: 'Level',
                cell: ({ row }) => <span>{row.original.training_level?.name ?? '—'}</span>,
            },
            {
                accessorKey: 'session_price',
                header: 'Session Price',
                cell: ({ row }) => <span>{formatTZS(row.original.session_price)}</span>,
            },
            {
                accessorKey: 'availability',
                header: 'Availability',
                cell: ({ row }) => (
                    <Badge variant={row.original.availability === 'available' ? 'default' : 'secondary'}>
                        {row.original.availability}
                    </Badge>
                ),
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
                                    <Link href={`/trainers/${item.id}/edit`}>
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
            <Head title="Trainers" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title="Trainers"
                    description={`Manage all your trainers and their availability — ${items.length} total`}
                    icon={Users}
                    actions={
                        <>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Link href="/trainers/create">
                                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Trainer
                                </Button>
                            </Link>
                        </>
                    }
                />

                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <CustomDataTable
                        columns={columns}
                        data={items}
                        searchPlaceholder="Search trainers..."
                        searchColumn="name"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
