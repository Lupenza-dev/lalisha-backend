import { Link } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

type CatalogHeroProps = {
    section: string;
    eyebrow: string;
    title: ReactNode;
    description: string;
    count: number;
    countLabel: string;
    icon: LucideIcon;
    tone?: 'dark' | 'light' | 'lime';
};

const tones = {
    dark: {
        section: 'border-white/10 bg-[#291630] text-white',
        breadcrumb: 'text-white/50',
        current: 'text-white/85',
        eyebrow: 'text-[#ddfc64]',
        description: 'text-white/60',
        icon: 'bg-[#ddfc64] text-[#291630]',
        count: 'border-white/12 bg-white/8',
        countValue: 'text-[#ddfc64]',
        countLabel: 'text-white/50',
    },
    light: {
        section: 'border-[#e2d7e7] bg-[#f1eaf4] text-[#24142b]',
        breadcrumb: 'text-[#918496]',
        current: 'text-[#5e5165]',
        eyebrow: 'text-[#662199]',
        description: 'text-[#74687a]',
        icon: 'bg-[#662199] text-white',
        count: 'border-[#d8c9de] bg-white/75',
        countValue: 'text-[#662199]',
        countLabel: 'text-[#85788a]',
    },
    lime: {
        section: 'border-[#dce8ae] bg-[#f4f8e6] text-[#24142b]',
        breadcrumb: 'text-[#7d8660]',
        current: 'text-[#4c542f]',
        eyebrow: 'text-[#5d721b]',
        description: 'text-[#68704f]',
        icon: 'bg-[#291630] text-[#ddfc64]',
        count: 'border-[#d7e29d] bg-white/75',
        countValue: 'text-[#4f6412]',
        countLabel: 'text-[#7d8660]',
    },
};

export default function CatalogHero({ section, eyebrow, title, description, count, countLabel, icon: Icon, tone = 'light' }: CatalogHeroProps) {
    const colors = tones[tone];

    return (
        <section className={`relative overflow-hidden border-b ${colors.section}`}>
            <div className="absolute inset-y-0 right-0 w-1 bg-[#ddfc64]" />
            <div className="mx-auto w-full max-w-[1440px] px-5 py-9 sm:px-8 sm:py-11 lg:px-12">
                <nav className={`flex items-center gap-1.5 text-[11px] font-bold ${colors.breadcrumb}`} aria-label="Breadcrumb">
                    <Link href={route('home')} className="transition hover:text-[#8e3cc9]">
                        Home
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <span className={colors.current} aria-current="page">
                        {section}
                    </span>
                </nav>

                <div className="mt-6 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                    <div className="flex max-w-[850px] items-start gap-4 sm:gap-5">
                        <span className={`mt-1 flex size-11 shrink-0 items-center justify-center rounded-2xl sm:size-12 ${colors.icon}`}>
                            <Icon className="size-5" />
                        </span>
                        <div>
                            <p className={`text-[9px] font-extrabold tracking-[0.18em] ${colors.eyebrow}`}>{eyebrow}</p>
                            <h1
                                className="mt-2 text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-4xl lg:text-5xl"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                {title}
                            </h1>
                            <p className={`mt-3 max-w-[720px] text-sm leading-6 font-medium sm:text-base ${colors.description}`}>{description}</p>
                        </div>
                    </div>

                    <div className={`flex min-w-44 items-center gap-3 rounded-2xl border px-4 py-3.5 ${colors.count}`}>
                        <span className={`text-3xl font-black tracking-[-0.04em] ${colors.countValue}`}>{count}</span>
                        <span className={`max-w-24 text-[9px] leading-4 font-extrabold tracking-[0.1em] uppercase ${colors.countLabel}`}>
                            {countLabel}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
