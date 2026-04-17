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

// Example data type
export type ProgramCategory = {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
};

// Example columns definition
export const programCategoryColumns: ColumnDef<ProgramCategory>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue('name')}</div>;
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.getValue('description') as string;
            return (
                <div className="max-w-[200px] truncate" title={description}>
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
            const category = row.original;

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
                            onClick={() => navigator.clipboard.writeText(category.id)}
                        >
                            Copy category ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit category
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// Example data
export const sampleProgramCategories: ProgramCategory[] = [
    {
        id: '1',
        name: 'Web Development',
        description: 'Categories related to web programming and development',
        status: 'active',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
    },
    {
        id: '2',
        name: 'Mobile Development',
        description: 'iOS and Android app development categories',
        status: 'active',
        created_at: '2024-01-16T14:20:00Z',
        updated_at: '2024-01-16T14:20:00Z',
    },
    {
        id: '3',
        name: 'Data Science',
        description: 'Machine learning, AI, and data analysis categories',
        status: 'inactive',
        created_at: '2024-01-17T09:15:00Z',
        updated_at: '2024-01-17T09:15:00Z',
    },
    {
        id: '4',
        name: 'DevOps',
        description: 'Infrastructure, deployment, and operations categories',
        status: 'active',
        created_at: '2024-01-18T16:45:00Z',
        updated_at: '2024-01-18T16:45:00Z',
    },
    {
        id: '5',
        name: 'UI/UX Design',
        description: 'User interface and user experience design categories',
        status: 'active',
        created_at: '2024-01-19T11:30:00Z',
        updated_at: '2024-01-19T11:30:00Z',
    },
];
