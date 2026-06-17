import AppCard from '@/components/ui/appCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Award, Cog, FolderOpen, GraduationCap, Layers, Package } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'System Settings', href: '/system-settings' },
];

export default function SystemSetting() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Settings" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page header */}
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                        <Cog className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
                        <p className="text-sm text-muted-foreground">
                            Configure taxonomies and reference data used across the platform.
                        </p>
                    </div>
                </div>

                {/* Settings grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AppCard
                        icon={FolderOpen}
                        title="Program Category"
                        subtitle="Manage program categories"
                        link="/program-categories"
                    />
                    <AppCard
                        icon={Package}
                        title="Product Category"
                        subtitle="Manage product categories"
                        link="/product-categories"
                    />
                    <AppCard
                        icon={Layers}
                        title="Program Type"
                        subtitle="Manage program types"
                        link="/program-types"
                    />
                    <AppCard
                        icon={GraduationCap}
                        title="Training Level"
                        subtitle="Manage training levels"
                        link="/training-levels"
                    />
                    <AppCard
                        icon={Award}
                        title="Training Certificate"
                        subtitle="Manage training certificates"
                        link="/training-certificates"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
