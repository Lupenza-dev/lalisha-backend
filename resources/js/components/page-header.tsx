import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    actions?: ReactNode;
    className?: string;
}

export default function PageHeader({ title, description, icon: Icon, actions, className }: PageHeaderProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5 shadow-sm dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/10"
            />
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    {Icon && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/30 ring-1 ring-white/20">
                            <Icon className="h-5 w-5" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-indigo-300 dark:to-purple-300 sm:text-2xl">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                </div>
                {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
        </div>
    );
}
