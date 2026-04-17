import AppCard from '@/components/ui/appCard';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Cog, FolderOpen, Layers, Award, GraduationCap, Package } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'System Settings',
        href: '/system-settings',
    },
];

export default function SystemSetting() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <AppCard icon={FolderOpen} title="Program Category" subtitle='Manage program categories' link="/program-categories" />
                    <AppCard icon={Package} title="Product Category" subtitle='Manage product categories' link="/product-categories" />
                    <AppCard icon={Layers} title="Program Type" subtitle='Manage program types' link="/program-types" />
                    <AppCard icon={GraduationCap} title="Training Level" subtitle='Manage training levels' link="/training-levels" />
                    <AppCard icon={Award} title="Training Certificate" subtitle='Manage training certificates' link="/training-certificates" />
                    {/* <AppCard icon={Package} title="Product Subcategory" subtitle='Manage product subcategories' link="/product-subcategories" /> */}
              </div>
            </div>
        </AppLayout>
    );
}
