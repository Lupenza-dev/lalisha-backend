import { useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, MoreHorizontal, Plus, ShoppingBag, Trash2 } from 'lucide-react';
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
    { title: 'Shop Products', href: '/shop-products' },
];

type ProductRow = {
    id: number;
    name: string;
    description: string;
    price: string | number;
    has_offer: boolean;
    offer_price: string | number | null;
    status: 'active' | 'inactive';
    product_category: { id: number; name: string } | null;
    created_at: string;
};

interface Props {
    items: ProductRow[];
}

export default function ShopProduct({ items }: Props) {
    useFlashToast();

    const handleDelete = (item: ProductRow) => {
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
            router.delete(`/shop-products/${item.id}`, {
                preserveScroll: true,
                onError: () => toast.error('Failed to delete. Please try again.'),
            });
        });
    };

    const columns = useMemo<ColumnDef<ProductRow>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
            },
            {
                id: 'category',
                header: 'Category',
                cell: ({ row }) => <span>{row.original.product_category?.name ?? '—'}</span>,
            },
            {
                accessorKey: 'price',
                header: 'Price',
                cell: ({ row }) => <span>${Number(row.original.price).toFixed(2)}</span>,
            },
            {
                id: 'offer',
                header: 'Offer',
                cell: ({ row }) =>
                    row.original.has_offer ? (
                        <span className="text-green-600">
                            ${Number(row.original.offer_price ?? 0).toFixed(2)}
                        </span>
                    ) : (
                        <span className="text-muted-foreground">—</span>
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
                                    <Link href={`/shop-products/${item.id}/edit`}>
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
            <Head title="Shop Products" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title="Shop Products"
                    description={`Manage your storefront catalog — ${items.length} products`}
                    icon={ShoppingBag}
                    actions={
                        <>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Link href="/shop-products/create">
                                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </Button>
                            </Link>
                        </>
                    }
                />

                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <CustomDataTable
                        columns={columns}
                        data={items}
                        searchPlaceholder="Search shop products..."
                        searchColumn="name"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
