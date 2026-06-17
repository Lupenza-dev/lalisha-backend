import { Head } from '@inertiajs/react';
import { ArrowLeft, PackageSearch } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useFlashToast } from '@/hooks/use-flash-toast';
import ShopProductForm, { type SelectOption } from '@/components/shop/ShopProductForm';
import PageHeader from '@/components/page-header';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Shop Products', href: '/shop-products' },
    { title: 'Edit', href: '#' },
];

interface ProductProp {
    id: number;
    product_category_id: number;
    name: string;
    description: string;
    price: string | number;
    has_offer: boolean;
    offer_price: string | number | null;
    image_url: string | null;
    status: 'active' | 'inactive';
}

interface Props {
    product: ProductProp;
    productCategories: SelectOption[];
}

export default function ShopProductEdit({ product, productCategories }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Shop Product" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title={`Edit Product — ${product.name}`}
                    description="Update product details, pricing, or replace the image."
                    icon={PackageSearch}
                    actions={
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    }
                />

                <ShopProductForm
                    mode="edit"
                    initial={{
                        id: product.id,
                        product_category_id: product.product_category_id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        has_offer: product.has_offer,
                        offer_price: product.offer_price,
                        image_url: product.image_url,
                        status: product.status,
                    }}
                    productCategories={productCategories}
                />
            </div>
        </AppLayout>
    );
}
