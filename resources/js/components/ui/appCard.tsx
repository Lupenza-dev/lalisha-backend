import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface AppCardProps {
    icon: LucideIcon;
    title: string;
    subtitle?: string;
    link?: string;
    className?: string;
    onClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
    icon: Icon,
    title,
    subtitle,
    link,
    className,
    onClick,
}) => {
    const CardContent = (
        <div
            className={cn(
                'group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300',
                'hover:-translate-y-0.5 hover:border-indigo-300/60 hover:shadow-lg hover:shadow-indigo-500/5',
                'dark:hover:border-indigo-500/40 dark:hover:shadow-indigo-500/10',
                'cursor-pointer',
                className,
            )}
            onClick={onClick}
        >
            {/* Subtle gradient overlay on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/[0.04] group-hover:via-purple-500/[0.04] group-hover:to-pink-500/[0.04] group-hover:opacity-100" />

            <div className="relative shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 ring-1 ring-indigo-500/20 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white group-hover:ring-indigo-500/40 dark:text-indigo-300">
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            <div className="relative min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                    {title}
                </h3>
                {subtitle && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{subtitle}</p>
                )}
            </div>

            {link && (
                <div className="relative shrink-0">
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" />
                </div>
            )}
        </div>
    );

    if (link) {
        return (
            <Link href={link} className="block">
                {CardContent}
            </Link>
        );
    }

    return CardContent;
};

export default AppCard;