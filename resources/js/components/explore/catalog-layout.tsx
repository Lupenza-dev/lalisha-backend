import BrandLogoImage from '@/components/brand-logo-image';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Package } from 'lucide-react';
import { type ReactNode } from 'react';

type CatalogLayoutProps = {
    active: 'programs' | 'trainers' | 'shop';
    children: ReactNode;
};

const navigation = [
    { key: 'programs', label: 'Programs', routeName: 'explore.programs' },
    { key: 'trainers', label: 'Trainers', routeName: 'explore.trainers' },
    { key: 'shop', label: 'Shop', routeName: 'explore.shop' },
] as const;

export default function CatalogLayout({ active, children }: CatalogLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#fbf9fc] text-[#281a2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <header className="relative z-30 border-b border-[#e8e0ec] bg-white/95 backdrop-blur">
                <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
                    <Link href={route('home')} aria-label="Lalisha FitZone home">
                        <BrandLogoImage className="h-11 w-44 sm:w-48" />
                    </Link>

                    <nav className="hidden items-center rounded-full bg-[#f4eff7] p-1 md:flex" aria-label="Catalogue navigation">
                        {navigation.map((item) => (
                            <Link
                                key={item.key}
                                href={route(item.routeName)}
                                prefetch
                                className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition ${
                                    active === item.key ? 'bg-[#291630] text-white shadow-sm' : 'text-[#716477] hover:text-[#662199]'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center gap-2 rounded-full bg-[#291630] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#662199] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                        >
                            Dashboard <ArrowRight className="size-4" />
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href={route('login')}
                                className="hidden px-3 py-2 text-xs font-extrabold text-[#65576c] hover:text-[#662199] sm:block"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center gap-2 rounded-full bg-[#662199] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                            >
                                Join FitZone <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    )}
                </div>

                <nav className="flex justify-center gap-1 border-t border-[#eee7f1] px-4 py-2 md:hidden" aria-label="Mobile catalogue navigation">
                    {navigation.map((item) => (
                        <Link
                            key={item.key}
                            href={route(item.routeName)}
                            className={`rounded-full px-4 py-2 text-[11px] font-extrabold ${active === item.key ? 'bg-[#291630] text-white' : 'text-[#716477]'}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </header>

            <main>{children}</main>

            <footer className="border-t border-[#e7dfea] bg-white">
                <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
                    <BrandLogoImage className="h-10 w-40" />
                    <span className="flex items-center gap-2 text-xs font-bold text-[#817386]">
                        <Package className="size-4 text-[#662199]" /> Programs, trainers & fitness essentials
                    </span>
                    <p className="text-xs font-semibold text-[#9a8fa0]">© {new Date().getFullYear()} Lalisha FitZone</p>
                </div>
            </footer>
        </div>
    );
}
