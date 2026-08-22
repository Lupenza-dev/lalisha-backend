import CustomDataTable from '@/components/CustomDataTable';
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { formatTZS } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { ReceiptText } from 'lucide-react';
import { useMemo } from 'react';

type OrderRow = {
    id: number;
    order_number: string;
    source: 'cart' | 'program';
    total_quantity: number;
    total: string | number;
    payment_method: string;
    phone_number: string | null;
    status: 'pending' | 'paid' | 'failed' | 'cancelled';
    created_at: string;
    user: { id: number; name: string; email: string };
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Orders', href: '/orders' }];

export default function OrdersIndex({ orders }: { orders: OrderRow[] }) {
    const columns = useMemo<ColumnDef<OrderRow>[]>(() => [
        { accessorKey: 'order_number', header: 'Order', cell: ({ row }) => <span className="font-medium">{row.original.order_number}</span> },
        { id: 'customer', header: 'Customer', cell: ({ row }) => <div><p>{row.original.user.name}</p><p className="text-xs text-muted-foreground">{row.original.user.email}</p></div> },
        { accessorKey: 'source', header: 'Source', cell: ({ row }) => <span className="capitalize">{row.original.source}</span> },
        { accessorKey: 'total_quantity', header: 'Items' },
        { accessorKey: 'total', header: 'Total', cell: ({ row }) => <span>{formatTZS(row.original.total)}</span> },
        { accessorKey: 'payment_method', header: 'Payment', cell: ({ row }) => <span className="uppercase">{row.original.payment_method}</span> },
        { accessorKey: 'phone_number', header: 'Phone', cell: ({ row }) => <span>{row.original.phone_number ?? '—'}</span> },
        { accessorKey: 'status', header: 'Status', cell: ({ row }) => <Badge variant={row.original.status === 'paid' ? 'default' : 'secondary'} className="capitalize">{row.original.status}</Badge> },
        { accessorKey: 'created_at', header: 'Created', cell: ({ row }) => <span>{new Date(row.original.created_at).toLocaleString()}</span> },
    ], []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader title="Orders" description={`Mobile checkout submissions — ${orders.length} orders`} icon={ReceiptText} />
                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <CustomDataTable columns={columns} data={orders} searchPlaceholder="Search order number..." searchColumn="order_number" />
                </div>
            </div>
        </AppLayout>
    );
}
