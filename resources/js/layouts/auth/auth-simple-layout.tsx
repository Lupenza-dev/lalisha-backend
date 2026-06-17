import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 md:p-10 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-500/20"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl dark:bg-purple-500/20"
            />

            <div className="relative w-full max-w-md">
                <div className="rounded-2xl border border-white/40 bg-white/70 p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/30">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="group flex flex-col items-center gap-3 font-medium">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20 transition-transform group-hover:scale-105">
                                    <AppLogoIcon className="size-6 fill-current text-white" />
                                </div>
                                <div className="flex flex-col items-center leading-none">
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent dark:from-indigo-300 dark:to-purple-300">
                                        Lalisha
                                    </span>
                                    <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                        Admin Panel
                                    </span>
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-1.5 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
                                <p className="text-muted-foreground text-sm">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Lalisha. All rights reserved.
                </p>
            </div>
        </div>
    );
}
