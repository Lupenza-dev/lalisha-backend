import { useMemo, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import AppLayout from '@/layouts/app-layout';
import { useFlashToast } from '@/hooks/use-flash-toast';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomDataTable from '@/components/CustomDataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowLeft, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

export type SystemSettingItem = {
    id: number;
    name: string;
    description: string | null;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
};

interface ResourceManagerProps {
    title: string; // e.g. "Program Categories"
    singular: string; // e.g. "Program Category"
    resource: string; // route base, e.g. "program-categories"
    items: SystemSettingItem[];
}

type FormState = {
    name: string;
    description: string;
    status: 'active' | 'inactive';
};

const emptyForm: FormState = { name: '', description: '', status: 'active' };

export default function ResourceManager({ title, singular, resource, items }: ResourceManagerProps) {
    useFlashToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<SystemSettingItem | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<FormState>(emptyForm);

    const breadcrumbs: BreadcrumbItem[] = [
        { title, href: `/${resource}` },
    ];

    const openCreate = () => {
        setEditing(null);
        reset();
        clearErrors();
        setData(emptyForm);
        setIsModalOpen(true);
    };

    const openEdit = (item: SystemSettingItem) => {
        setEditing(item);
        clearErrors();
        setData({
            name: item.name,
            description: item.description ?? '',
            status: item.status,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            put(`/${resource}/${editing.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditing(null);
                    reset();
                },
                onError: () => {
                    toast.error('Please fix the errors and try again.');
                },
            });
        } else {
            post(`/${resource}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
                onError: () => {
                    toast.error('Please fix the errors and try again.');
                },
            });
        }
    };

    const handleDelete = (item: SystemSettingItem) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete "${item.name}"? This cannot be undone.`,
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
            router.delete(`/${resource}/${item.id}`, {
                preserveScroll: true,
                onError: () => toast.error('Failed to delete. Please try again.'),
            });
        });
    };

    const columns = useMemo<ColumnDef<SystemSettingItem>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                cell: ({ row }) => {
                    const description = row.getValue('description') as string | null;
                    return (
                        <div className="max-w-[300px] truncate" title={description ?? ''}>
                            {description || 'No description'}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.getValue('status') as string;
                    return (
                        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                            {status}
                        </Badge>
                    );
                },
            },
            {
                accessorKey: 'created_at',
                header: 'Created',
                cell: ({ row }) => {
                    const date = new Date(row.getValue('created_at'));
                    return <div>{date.toLocaleDateString()}</div>;
                },
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
                                <DropdownMenuItem onClick={() => openEdit(item)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [resource],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex items-center justify-between py-4 px-4">
                <Button variant="outline" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Dialog
                    open={isModalOpen}
                    onOpenChange={(open) => {
                        setIsModalOpen(open);
                        if (!open) {
                            setEditing(null);
                            clearErrors();
                            reset();
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button onClick={openCreate}>Add {singular}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? `Edit ${singular}` : `Add ${singular}`}
                            </DialogTitle>
                            <DialogDescription>
                                {editing
                                    ? `Update the details for this ${singular.toLowerCase()}.`
                                    : `Create a new ${singular.toLowerCase()}.`}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder={`Enter ${singular.toLowerCase()} name`}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="min-h-[100px]"
                                        placeholder={`Enter ${singular.toLowerCase()} description`}
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value as 'active' | 'inactive')
                                        }
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Saving...'
                                        : editing
                                          ? 'Update'
                                          : `Save ${singular}`}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="px-6">
                <CustomDataTable
                    columns={columns}
                    data={items}
                    searchPlaceholder={`Search ${title.toLowerCase()}...`}
                    searchColumn="name"
                />
            </div>
        </AppLayout>
    );
}
