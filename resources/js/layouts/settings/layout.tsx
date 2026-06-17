import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Palette, ShieldCheck, UserRound } from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'Profile',
        description: 'Update your personal information',
        url: '/settings/profile',
        icon: UserRound,
    },
    {
        title: 'Password',
        description: 'Manage your account password',
        url: '/settings/password',
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        description: 'Customize your interface',
        url: '/settings/appearance',
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 shadow-sm dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40">
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-indigo-300 dark:to-purple-300">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your profile, security, and personal preferences.
                </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                <aside className="w-full lg:w-64 lg:shrink-0">
                    <nav className="flex flex-col gap-1.5">
                        {sidebarNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPath === item.url;
                            return (
                                <Link
                                    key={item.url}
                                    href={item.url}
                                    prefetch
                                    className={cn(
                                        'group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm transition-all',
                                        isActive
                                            ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 text-foreground shadow-sm dark:border-indigo-900/50 dark:from-indigo-950/40 dark:to-purple-950/40'
                                            : 'hover:border-border hover:bg-muted/60',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                                            isActive
                                                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow'
                                                : 'bg-muted text-muted-foreground group-hover:bg-background',
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="flex flex-col leading-tight">
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-xs text-muted-foreground">{item.description}</span>
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <Separator className="lg:hidden" />

                <div className="flex-1 min-w-0">
                    <section className="max-w-2xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
