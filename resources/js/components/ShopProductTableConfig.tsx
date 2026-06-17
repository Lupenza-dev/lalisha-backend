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

export type ShopProduct = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: string;
    has_offer: boolean;
    offer_price: string | null;
    status: 'active' | 'inactive';
    created_at: string;
};

export const shopProductColumns: ColumnDef<ShopProduct>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue('name')}</div>;
        },
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            return <div>${row.getValue('price')}</div>;
        },
    },
    {
        accessorKey: 'has_offer',
        header: 'Offer',
        cell: ({ row }) => {
            const hasOffer = row.getValue('has_offer') as boolean;
            return (
                <Badge variant={hasOffer ? 'default' : 'secondary'}>
                    {hasOffer ? 'Yes' : 'No'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'offer_price',
        header: 'Offer Price',
        cell: ({ row }) => {
            const offerPrice = row.getValue('offer_price') as string | null;
            return <div>{offerPrice ? `$${offerPrice}` : '—'}</div>;
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
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

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
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit product
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const sampleShopProducts: ShopProduct[] = [
    {
        id: '1',
        name: 'React Masterclass eBook',
        category: 'Digital',
        description: 'Comprehensive guide to mastering React',
        price: '29.99',
        has_offer: true,
        offer_price: '19.99',
        status: 'active',
        created_at: '2024-02-10T10:00:00Z',
    },
    {
        id: '2',
        name: 'Laravel T-Shirt',
        category: 'Merchandise',
        description: 'Official Laravel branded t-shirt',
        price: '24.99',
        has_offer: false,
        offer_price: null,
        status: 'active',
        created_at: '2024-02-12T14:30:00Z',
    },
    {
        id: '3',
        name: 'DevOps Toolkit Bundle',
        category: 'Digital',
        description: 'Collection of DevOps tools and templates',
        price: '49.99',
        has_offer: true,
        offer_price: '39.99',
        status: 'inactive',
        created_at: '2024-02-15T09:15:00Z',
    },
    {
        id: '4',
        name: 'Coding Bootcamp Access Pass',
        category: 'Subscription',
        description: '12-month access to all coding bootcamps',
        price: '199.99',
        has_offer: false,
        offer_price: null,
        status: 'active',
        created_at: '2024-02-18T16:45:00Z',
    },
];
