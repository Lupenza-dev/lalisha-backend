import { Head } from '@inertiajs/react';
import { ArrowLeft, PackagePlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useFlashToast } from '@/hooks/use-flash-toast';
import ShopProductForm, { type SelectOption } from '@/components/shop/ShopProductForm';
import PageHeader from '@/components/page-header';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Shop Products', href: '/shop-products' },
    { title: 'Create', href: '/shop-products/create' },
];

interface Props {
    productCategories: SelectOption[];
}

export default function ShopProductCreate({ productCategories }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Shop Product" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    title="Create Shop Product"
                    description="Fill in the details below to add a new product to your shop."
                    icon={PackagePlus}
                    actions={
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    }
                />

                <ShopProductForm
                    mode="create"
                    initial={{
                        product_category_id: '',
                        name: '',
                        description: '',
                        price: '',
                        has_offer: false,
                        offer_price: '',
                    }}
                    productCategories={productCategories}
                />
            </div>
        </AppLayout>
    );
}
