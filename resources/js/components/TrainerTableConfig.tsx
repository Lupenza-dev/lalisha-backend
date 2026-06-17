import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Trainer = {
    id: string;
    name: string;
    email: string;
    training_type: string;
    training_level: string;
    session_price: string;
    availability: 'available' | 'unavailable';
    created_at: string;
};

export const trainerColumns: ColumnDef<Trainer>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue('name')}</div>;
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'training_type',
        header: 'Training Type',
    },
    {
        accessorKey: 'training_level',
        header: 'Level',
        cell: ({ row }) => {
            return (
                <Badge variant="outline">
                    {row.getValue('training_level')}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'session_price',
        header: 'Session Price',
        cell: ({ row }) => {
            return <div>${row.getValue('session_price')}</div>;
        },
    },
    {
        accessorKey: 'availability',
        header: 'Availability',
        cell: ({ row }) => {
            const availability = row.getValue('availability') as string;
            return (
                <Badge variant={availability === 'available' ? 'default' : 'secondary'}>
                    {availability}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const trainer = row.original;

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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(trainer.id)}
                        >
                            Copy trainer ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit trainer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete trainer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const sampleTrainers: Trainer[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        training_type: 'Web Development',
        training_level: 'Advanced',
        session_price: '75.00',
        availability: 'available',
        created_at: '2024-03-01T10:00:00Z',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        training_type: 'Data Science',
        training_level: 'Intermediate',
        session_price: '60.00',
        availability: 'available',
        created_at: '2024-03-05T14:30:00Z',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        training_type: 'Mobile Development',
        training_level: 'Beginner',
        session_price: '45.00',
        availability: 'unavailable',
        created_at: '2024-03-10T09:15:00Z',
    },
    {
        id: '4',
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        training_type: 'DevOps',
        training_level: 'Advanced',
        session_price: '90.00',
        availability: 'available',
        created_at: '2024-03-15T16:45:00Z',
    },
];
