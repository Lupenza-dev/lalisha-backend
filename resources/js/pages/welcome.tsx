import BrandLogoImage from '@/components/brand-logo-image';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CalendarCheck,
    CalendarDays,
    Check,
    ChevronRight,
    Clock3,
    Medal,
    MoveUpRight,
    Package,
    Play,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    UserRound,
} from 'lucide-react';

type PlatformStats = {
    programs: number;
    trainers: number;
    products: number;
};

type FeaturedProgram = {
    id: number;
    name: string;
    time_type: string;
    description: string;
    price: number;
    cover_image_url: string | null;
    program_category: string | null;
    program_type: string | null;
};

type FeaturedTrainer = {
    id: number;
    name: string;
    image_url: string | null;
    program_type: string | null;
    training_level: string | null;
    session_price: number;
    availability: string;
};

type FeaturedProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    has_offer: boolean;
    offer_price: number | null;
    image_url: string | null;
    product_category: string | null;
};

type WelcomeProps = SharedData & {
    platformStats: PlatformStats;
    featuredPrograms: FeaturedProgram[];
    featuredTrainers: FeaturedTrainer[];
    featuredProducts: FeaturedProduct[];
};

const journey = [
    { step: '01', title: 'Choose your lane', text: 'Browse programs by training category and goal.' },
    { step: '02', title: 'Add expert support', text: 'Book an available trainer for the time you prefer.' },
    { step: '03', title: 'Keep everything together', text: 'Track orders and session requests from your profile.' },
];

const catalogueNavigation = [
    { label: 'Programs', routeName: 'explore.programs' },
    { label: 'Trainers', routeName: 'explore.trainers' },
    { label: 'Shop', routeName: 'explore.shop' },
];

function BrandMark() {
    return <BrandLogoImage className="h-12 w-48 sm:h-14 sm:w-56" />;
}

function formatPrice(value: number): string {
    return `TZS ${new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(value)}`;
}

function formatTimeType(value: string): string {
    return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function HeroTrainingLane({ stats }: { stats: PlatformStats }) {
    const liveStats = [
        { value: stats.programs, label: 'active programs' },
        { value: stats.trainers, label: 'expert trainers' },
        { value: stats.products, label: 'shop essentials' },
    ];

    return (
        <div className="relative mx-auto w-full max-w-[610px] lg:mr-0">
            <div className="absolute -top-7 -right-3 size-28 rounded-full border border-[#662199]/15 sm:-right-8 sm:size-40" />
            <div className="absolute -right-5 -bottom-8 size-24 rounded-full bg-[#d9f55a] blur-[1px] sm:-right-12 sm:size-32" />
            <div className="relative overflow-hidden rounded-[32px] bg-[#2a1731] p-5 text-white shadow-[0_32px_80px_rgba(45,20,57,0.28)] sm:p-7">
                <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px] opacity-20" />
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2">
                        <span className="size-2 rounded-full bg-[#d9f55a] motion-safe:animate-pulse" />
                        <span className="text-[9px] font-extrabold tracking-[0.18em] text-white/80">YOUR TRAINING LANE</span>
                    </div>
                    <span className="text-xs font-semibold text-white/50">FIT / 24</span>
                </div>

                <div className="relative mt-8 grid gap-4 sm:grid-cols-[1.08fr_.92fr]">
                    <div className="flex min-h-[330px] flex-col justify-between rounded-[24px] bg-[#6b2490] p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.18em] text-white/60">NEXT MOVE</p>
                                <p className="mt-2 max-w-[220px] text-3xl leading-[1.03] font-bold tracking-[-0.05em]">Build strength that stays.</p>
                            </div>
                            <div className="flex size-11 items-center justify-center rounded-full bg-[#d9f55a] text-[#231329]">
                                <Play className="ml-0.5 size-4 fill-current" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-4 flex items-end gap-1.5">
                                {[42, 66, 50, 88, 58, 78, 100, 64, 82, 48, 70, 92].map((height, index) => (
                                    <span
                                        key={`${height}-${index}`}
                                        className="w-full rounded-full bg-white/25"
                                        style={{
                                            height: `${height * 0.55}px`,
                                            opacity: index === 6 ? 1 : undefined,
                                            backgroundColor: index === 6 ? '#d9f55a' : undefined,
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between border-t border-white/15 pt-4">
                                <div>
                                    <p className="text-[9px] font-bold tracking-widest text-white/50">FORMAT</p>
                                    <p className="mt-1 text-sm font-bold">Guided program</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold tracking-widest text-white/50">PACE</p>
                                    <p className="mt-1 text-sm font-bold">Your own</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-[24px] bg-[#f4eff7] p-5 text-[#28162f]">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-extrabold tracking-[0.16em] text-[#8d7598]">COACHING</span>
                                <UserRound className="size-4 text-[#662199]" />
                            </div>
                            <p className="mt-8 text-xl leading-tight font-extrabold tracking-[-0.04em]">Book the right trainer.</p>
                            <div className="mt-5 flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {['SJ', 'MK', 'AD'].map((initials, index) => (
                                        <span
                                            key={initials}
                                            className="flex size-8 items-center justify-center rounded-full border-2 border-[#f4eff7] bg-[#2a1731] text-[8px] font-extrabold text-white"
                                            style={{ backgroundColor: index === 1 ? '#7f359f' : undefined }}
                                        >
                                            {initials}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-[10px] font-bold text-[#74647c]">Available coaches</span>
                            </div>
                        </div>

                        <div className="rounded-[24px] bg-[#d9f55a] p-5 text-[#263007]">
                            <div className="flex items-center justify-between">
                                <CalendarCheck className="size-5" />
                                <MoveUpRight className="size-4" />
                            </div>
                            <p className="mt-5 text-[10px] font-extrabold tracking-[0.16em]">ONE PROFILE</p>
                            <p className="mt-2 text-lg leading-tight font-extrabold tracking-[-0.03em]">Orders and bookings, always visible.</p>
                        </div>
                    </div>
                </div>

                <div className="relative mt-5 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-5">
                    {liveStats.map((item) => (
                        <div key={item.label} className="px-3 first:pl-0 last:pr-0">
                            <p className="text-xl font-extrabold text-white">{item.value}</p>
                            <p className="mt-1 text-[9px] font-bold tracking-wide text-white/45 uppercase">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProgramsShowcase({ programs, actionHref }: { programs: FeaturedProgram[]; actionHref: string }) {
    return (
        <section id="programs" className="border-y border-[#e8e0ec] bg-white py-20 sm:py-28">
            <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#8a5aa6]">BUILT FOR YOUR GOAL</p>
                        <h2
                            className="mt-3 max-w-[620px] text-4xl leading-[1.02] font-bold tracking-[-0.055em] text-[#24142b] sm:text-5xl"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Featured training programs.
                        </h2>
                    </div>
                    <Link href={actionHref} className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#662199]">
                        See your full training space <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {programs.length > 0 ? (
                    <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-5 lg:grid lg:grid-cols-4 lg:overflow-visible">
                        {programs.map((program, index) => (
                            <Link
                                key={program.id}
                                href={actionHref}
                                aria-label={`Explore ${program.name}`}
                                className="group w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-[#e9e1ed] bg-white shadow-[0_16px_35px_rgba(53,27,67,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(53,27,67,0.16)] sm:w-[320px] lg:w-auto lg:max-w-none"
                            >
                                <div className="relative h-64 overflow-hidden bg-[#4a285a]">
                                    {program.cover_image_url ? (
                                        <img
                                            src={program.cover_image_url}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,#8e3cc9_0,transparent_28%),linear-gradient(145deg,#6b2490,#291630)]">
                                            <div className="absolute -right-7 -bottom-7 size-40 rounded-full border-[28px] border-white/8" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/5 via-transparent to-[#170b1f]/90 p-5">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="flex size-9 items-center justify-center rounded-full bg-[#ddfc64] text-[10px] font-black text-[#211726]">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.08em] text-[#4f1e68] uppercase">
                                                {program.program_type ?? 'Training'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#ddfc64] uppercase">
                                                {program.program_category ?? 'Fitness'}
                                            </p>
                                            <h3 className="mt-2 text-2xl leading-tight font-black tracking-[-0.04em] text-white">{program.name}</h3>
                                            <p className="mt-2 line-clamp-2 text-xs leading-5 font-medium text-white/70">{program.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1 bg-[#ddfc64]" />
                                <div className="flex min-h-20 items-center gap-3 px-4 py-4">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#776b7d]">
                                        <Clock3 className="size-4 text-[#662199]" /> {formatTimeType(program.time_type)}
                                    </span>
                                    <div className="ml-auto text-right">
                                        <p className="text-[8px] font-extrabold tracking-[0.12em] text-[#9a8f9f]">FROM</p>
                                        <p className="mt-1 text-sm font-black text-[#211726]">{formatPrice(program.price)}</p>
                                    </div>
                                    <span className="flex size-9 items-center justify-center rounded-full bg-[#662199] text-white">
                                        <ArrowRight className="size-4" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 rounded-[24px] bg-[#f7f1fa] px-6 py-12 text-center text-sm font-bold text-[#756b79]">
                        New training programs are being prepared.
                    </div>
                )}
            </div>
        </section>
    );
}

function TrainersShowcase({ trainers, actionHref }: { trainers: FeaturedTrainer[]; actionHref: string }) {
    return (
        <section id="trainers" className="bg-[#291630] py-20 text-white sm:py-28">
            <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#ddfc64]">COACHING ROSTER</p>
                        <h2
                            className="mt-3 max-w-[620px] text-4xl leading-[1.02] font-bold tracking-[-0.055em] sm:text-5xl"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Meet your next trainer.
                        </h2>
                    </div>
                    <Link href={actionHref} className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#ddfc64]">
                        Find your coach <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {trainers.length > 0 ? (
                    <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-5 lg:grid lg:grid-cols-4 lg:overflow-visible">
                        {trainers.map((trainer) => (
                            <Link
                                key={trainer.id}
                                href={actionHref}
                                aria-label={`View ${trainer.name}`}
                                className="group w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-white text-[#211726] shadow-[0_18px_45px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 sm:w-[320px] lg:w-auto lg:max-w-none"
                            >
                                <div className="relative h-60 overflow-hidden bg-[#4a285a]">
                                    {trainer.image_url ? (
                                        <img
                                            src={trainer.image_url}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#7f359f,#321a3d)]">
                                            <UserRound className="size-20 text-white/55" strokeWidth={1.25} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent to-[#160b1b]/95 p-5">
                                        <span className="flex w-fit items-center gap-2 rounded-full bg-[#1a191c]/75 px-3 py-2 text-[9px] font-black tracking-[0.12em]">
                                            <span className="size-2 rounded-full bg-[#ddfc64]" /> AVAILABLE
                                        </span>
                                        <div>
                                            <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#ddfc64] uppercase">
                                                {trainer.program_type ?? 'Personal training'}
                                            </p>
                                            <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">{trainer.name}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1 bg-[#ddfc64]" />
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-10 items-center justify-center rounded-xl bg-[#f3eaf8] text-[#662199]">
                                            <Medal className="size-5" />
                                        </span>
                                        <div>
                                            <p className="text-[8px] font-extrabold tracking-[0.1em] text-[#9a8f9f]">TRAINING LEVEL</p>
                                            <p className="mt-1 text-sm font-extrabold">{trainer.training_level ?? 'All levels'}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <p className="text-[8px] font-extrabold tracking-[0.1em] text-[#9a8f9f]">PER SESSION</p>
                                            <p className="mt-1 text-sm font-black">{formatPrice(trainer.session_price)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center border-t border-[#e8e0ec] pt-4">
                                        <span className="text-xs font-semibold text-[#7c7181]">Profile & availability</span>
                                        <span className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#662199] px-3 py-2 text-xs font-extrabold text-white">
                                            <CalendarDays className="size-4" /> Book
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 rounded-[24px] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm font-bold text-white/60">
                        Trainer availability will appear here soon.
                    </div>
                )}
            </div>
        </section>
    );
}

function ProductsShowcase({ products, actionHref }: { products: FeaturedProduct[]; actionHref: string }) {
    return (
        <section id="shop" className="bg-[#f6f1f8] py-20 sm:py-28">
            <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#8a5aa6]">FITNESS SHOP</p>
                        <h2
                            className="mt-3 max-w-[620px] text-4xl leading-[1.02] font-bold tracking-[-0.055em] text-[#24142b] sm:text-5xl"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Essentials for every session.
                        </h2>
                    </div>
                    <Link href={actionHref} className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#662199]">
                        Open the fitness shop <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {products.length > 0 ? (
                    <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-5 lg:grid lg:grid-cols-4 lg:overflow-visible">
                        {products.map((product) => {
                            const currentPrice = product.has_offer && product.offer_price !== null ? product.offer_price : product.price;

                            return (
                                <Link
                                    key={product.id}
                                    href={actionHref}
                                    aria-label={`Shop ${product.name}`}
                                    className="group w-[78vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-[#e7dcea] bg-white shadow-[0_15px_32px_rgba(53,27,67,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(53,27,67,0.14)] sm:w-[300px] lg:w-auto lg:max-w-none"
                                >
                                    <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#ede4f1]">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt=""
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute size-44 rounded-full bg-white/65" />
                                                <ShoppingBag className="relative size-16 text-[#662199]" strokeWidth={1.35} />
                                            </>
                                        )}
                                        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-[9px] font-extrabold tracking-[0.08em] text-[#662199] uppercase shadow-sm">
                                            {product.product_category ?? 'Fitness gear'}
                                        </span>
                                        {product.has_offer && product.offer_price !== null ? (
                                            <span className="absolute top-4 right-4 rounded-full bg-[#ddfc64] px-3 py-1.5 text-[9px] font-black tracking-[0.08em] text-[#283009]">
                                                OFFER
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-black tracking-[-0.025em] text-[#211726]">{product.name}</h3>
                                        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 font-medium text-[#7c7181]">
                                            {product.description}
                                        </p>
                                        <div className="mt-5 flex items-end gap-3 border-t border-[#ece4ef] pt-4">
                                            <div>
                                                <p className="text-[8px] font-extrabold tracking-[0.1em] text-[#9a8f9f]">PRICE</p>
                                                <p className="mt-1 text-base font-black text-[#211726]">{formatPrice(currentPrice)}</p>
                                                {product.has_offer && product.offer_price !== null ? (
                                                    <p className="mt-1 text-[10px] font-bold text-[#9a8f9f] line-through">
                                                        {formatPrice(product.price)}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <span className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#662199] px-3 py-2.5 text-xs font-extrabold text-white">
                                                <ShoppingBag className="size-4" /> Shop
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-10 rounded-[24px] bg-white px-6 py-12 text-center text-sm font-bold text-[#756b79]">
                        Shop products will appear here soon.
                    </div>
                )}
            </div>
        </section>
    );
}

export default function Welcome() {
    const { auth, platformStats, featuredPrograms, featuredTrainers, featuredProducts } = usePage<WelcomeProps>().props;
    const primaryHref = auth.user ? route('dashboard') : route('register');
    const primaryLabel = auth.user ? 'Open dashboard' : 'Create account';

    return (
        <>
            <Head title="Train with direction">
                <meta
                    name="description"
                    content="Lalisha FitZone brings training programs, expert trainers, fitness products, bookings, and checkout together."
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700,800&family=space-grotesk:500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen overflow-x-hidden bg-[#fbf9fc] text-[#281a2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <header className="relative z-30 border-b border-[#e8e0ec] bg-white/95 backdrop-blur">
                    <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
                        <Link href={route('home')} aria-label="Lalisha FitZone home">
                            <BrandLogoImage className="h-11 w-44 sm:w-48" />
                        </Link>

                        <nav className="hidden items-center rounded-full bg-[#f4eff7] p-1 md:flex" aria-label="Catalogue navigation">
                            {catalogueNavigation.map((item) => (
                                <Link
                                    key={item.routeName}
                                    href={route(item.routeName)}
                                    prefetch
                                    className="rounded-full px-5 py-2.5 text-xs font-extrabold text-[#716477] transition hover:bg-white hover:text-[#662199] hover:shadow-sm"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Account navigation">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#291630] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#662199] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                                >
                                    Dashboard <ArrowRight className="size-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hidden rounded-full px-4 py-3 text-xs font-extrabold text-[#4f3f57] transition hover:bg-[#efe8f2] focus-visible:ring-2 focus-visible:ring-[#662199] sm:block"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#662199] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                                    >
                                        Join FitZone <ArrowRight className="size-4" />
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>

                    <nav className="flex justify-center gap-1 border-t border-[#eee7f1] px-4 py-2 md:hidden" aria-label="Mobile catalogue navigation">
                        {catalogueNavigation.map((item) => (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName)}
                                className="rounded-full px-4 py-2 text-[11px] font-extrabold text-[#716477] transition hover:bg-[#f4eff7] hover:text-[#662199]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                <main>
                    <section className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 pt-10 pb-24 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-12 lg:pt-16 lg:pb-32">
                        <div className="relative z-10 max-w-[650px]">
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dbcce2] bg-white px-3 py-2 shadow-sm">
                                <Sparkles className="size-3.5 text-[#662199]" />
                                <span className="text-[10px] font-extrabold tracking-[0.16em] text-[#755b81]">FITNESS, WITHOUT THE GUESSWORK</span>
                            </div>
                            <h1
                                className="text-[clamp(3.5rem,7vw,7.2rem)] leading-[0.88] font-bold tracking-[-0.07em] text-[#24142b]"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Train with <span className="text-[#662199]">direction.</span>
                            </h1>
                            <p className="mt-8 max-w-[560px] text-base leading-8 font-medium text-[#74687a] sm:text-lg">
                                Discover focused programs, book expert trainers, and get the fitness essentials you need—all from one connected
                                FitZone experience.
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={primaryHref}
                                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#662199] px-7 py-4 text-sm font-extrabold text-white shadow-[0_14px_35px_rgba(102,33,153,0.25)] transition hover:-translate-y-0.5 hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                                >
                                    {primaryLabel}
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <a
                                    href="#programs"
                                    className="inline-flex items-center justify-center gap-3 rounded-full border border-[#dcd1e1] bg-white px-7 py-4 text-sm font-extrabold text-[#3e2d46] transition hover:border-[#b99bc7] hover:bg-[#f7f1f9] focus-visible:ring-2 focus-visible:ring-[#662199]"
                                >
                                    Explore the platform <ChevronRight className="size-4" />
                                </a>
                            </div>
                            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#6d6073]">
                                {['Bearer-secured account', 'Transparent pricing', 'Bookings in one place'].map((item) => (
                                    <span key={item} className="flex items-center gap-2">
                                        <span className="flex size-5 items-center justify-center rounded-full bg-[#edf7cb] text-[#536d0d]">
                                            <Check className="size-3" />
                                        </span>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <HeroTrainingLane stats={platformStats} />
                    </section>

                    <ProgramsShowcase programs={featuredPrograms} actionHref={route('explore.programs')} />
                    <TrainersShowcase trainers={featuredTrainers} actionHref={route('explore.trainers')} />
                    <ProductsShowcase products={featuredProducts} actionHref={route('explore.shop')} />

                    <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
                        <div className="overflow-hidden rounded-[36px] bg-[#2a1731] text-white shadow-[0_28px_70px_rgba(45,20,57,0.2)]">
                            <div className="grid lg:grid-cols-[.8fr_1.2fr]">
                                <div className="relative overflow-hidden border-b border-white/10 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-14">
                                    <div className="absolute -right-20 -bottom-28 size-72 rounded-full border-[40px] border-[#d9f55a]/10" />
                                    <CalendarCheck className="size-9 text-[#d9f55a]" />
                                    <p className="mt-14 text-[10px] font-extrabold tracking-[0.2em] text-[#d9f55a]">FROM INTEREST TO ACTION</p>
                                    <h2
                                        className="mt-4 text-4xl leading-[1.02] font-bold tracking-[-0.055em] sm:text-5xl"
                                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                        Your fitness journey, clearly connected.
                                    </h2>
                                    <p className="mt-6 max-w-[450px] text-sm leading-7 font-medium text-white/60">
                                        Choose a goal, get the right support, and see what happens next without losing track of payments or session
                                        requests.
                                    </p>
                                </div>
                                <div className="p-8 sm:p-12 lg:p-14">
                                    {journey.map((item, index) => (
                                        <div
                                            key={item.step}
                                            className={`grid grid-cols-[45px_1fr] gap-5 ${index !== journey.length - 1 ? 'mb-8 border-b border-white/10 pb-8' : ''}`}
                                        >
                                            <span className="flex size-11 items-center justify-center rounded-full border border-white/15 text-[10px] font-extrabold text-[#d9f55a]">
                                                {item.step}
                                            </span>
                                            <div>
                                                <h3 className="text-lg font-extrabold">{item.title}</h3>
                                                <p className="mt-2 text-sm leading-6 font-medium text-white/55">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
                        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center text-center">
                            <div className="flex items-center gap-3 text-[#662199]">
                                <ShieldCheck className="size-5" />
                                <span className="text-[10px] font-extrabold tracking-[0.18em]">READY WHEN YOU ARE</span>
                            </div>
                            <h2
                                className="mt-5 max-w-[850px] text-4xl leading-[1.02] font-bold tracking-[-0.06em] text-[#24142b] sm:text-6xl"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Make your next workout a decision, not a guess.
                            </h2>
                            <p className="mt-6 max-w-[600px] text-base leading-7 font-medium text-[#776b7c]">
                                Join Lalisha FitZone and bring programs, trainers, shopping, orders, and bookings into one simple routine.
                            </p>
                            <Link
                                href={primaryHref}
                                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#662199] px-8 py-4 text-sm font-extrabold text-white shadow-[0_14px_35px_rgba(102,33,153,0.25)] transition hover:-translate-y-0.5 hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                            >
                                {primaryLabel}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-[#e7dfea] bg-white">
                    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
                        <BrandMark />
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#817386]">
                            <span className="flex items-center gap-2">
                                <BarChart3 className="size-4 text-[#662199]" />
                                Connected fitness management
                            </span>
                            <span className="flex items-center gap-2">
                                <Package className="size-4 text-[#662199]" />
                                Programs, trainers & shop
                            </span>
                        </div>
                        <p className="text-xs font-semibold text-[#9a8fa0]">© {new Date().getFullYear()} Lalisha FitZone</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
