import CustomDataTable from '@/components/CustomDataTable';
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { formatTZS } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { CalendarCheck } from 'lucide-react';
import { useMemo } from 'react';

type BookingRow = {
    id: number;
    booking_number: string;
    scheduled_at: string;
    session_price: string | number;
    notes: string | null;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    user: { id: number; name: string; email: string };
    trainer: { id: number; name: string };
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Trainer Bookings', href: '/trainer-bookings' }];

export default function TrainerBookingsIndex({ bookings }: { bookings: BookingRow[] }) {
    const columns = useMemo<ColumnDef<BookingRow>[]>(() => [
        { accessorKey: 'booking_number', header: 'Booking', cell: ({ row }) => <span className="font-medium">{row.original.booking_number}</span> },
        { id: 'customer', header: 'Customer', cell: ({ row }) => <div><p>{row.original.user.name}</p><p className="text-xs text-muted-foreground">{row.original.user.email}</p></div> },
        { id: 'trainer', header: 'Trainer', cell: ({ row }) => row.original.trainer.name },
        { accessorKey: 'scheduled_at', header: 'Session time', cell: ({ row }) => new Date(row.original.scheduled_at).toLocaleString() },
        { accessorKey: 'session_price', header: 'Price', cell: ({ row }) => formatTZS(row.original.session_price) },
        { accessorKey: 'notes', header: 'Notes', cell: ({ row }) => <span className="line-clamp-2 max-w-xs">{row.original.notes ?? '—'}</span> },
        { accessorKey: 'status', header: 'Status', cell: ({ row }) => <Badge variant={row.original.status === 'confirmed' || row.original.status === 'completed' ? 'default' : 'secondary'} className="capitalize">{row.original.status}</Badge> },
    ], []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Trainer Bookings" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader title="Trainer Bookings" description={`Mobile trainer session requests — ${bookings.length} bookings`} icon={CalendarCheck} />
                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <CustomDataTable columns={columns} data={bookings} searchPlaceholder="Search booking number..." searchColumn="booking_number" />
                </div>
            </div>
        </AppLayout>
    );
}
