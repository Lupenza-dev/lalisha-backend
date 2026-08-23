import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CalendarCheck,
    Check,
    ChevronRight,
    Dumbbell,
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

const features = [
    {
        icon: Dumbbell,
        eyebrow: 'PROGRAMS',
        title: 'Training built around a real goal.',
        description: 'Explore focused programs, understand the benefits, and choose the format that fits your routine.',
        accent: 'bg-[#e8dcff]',
        iconColor: 'text-[#662199]',
    },
    {
        icon: UserRound,
        eyebrow: 'TRAINERS',
        title: 'A coach who matches your pace.',
        description: 'Compare specialties, levels, session prices, and availability before requesting your session.',
        accent: 'bg-[#e6f5b7]',
        iconColor: 'text-[#536d0d]',
    },
    {
        icon: ShoppingBag,
        eyebrow: 'FITNESS SHOP',
        title: 'The essentials that keep you moving.',
        description: 'Order training products in the same place you manage programs, bookings, and checkout.',
        accent: 'bg-[#ffe3d6]',
        iconColor: 'text-[#a8451d]',
    },
];

const journey = [
    { step: '01', title: 'Choose your lane', text: 'Browse programs by training category and goal.' },
    { step: '02', title: 'Add expert support', text: 'Book an available trainer for the time you prefer.' },
    { step: '03', title: 'Keep everything together', text: 'Track orders and session requests from your profile.' },
];

function BrandMark() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative flex size-11 items-center justify-center rounded-[15px] bg-[#2a1731] text-white shadow-[0_8px_22px_rgba(51,21,67,0.2)]">
                <Dumbbell className="size-5" strokeWidth={2.4} />
                <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-[#fbf9fc] bg-[#d9f55a]" />
            </div>
            <div>
                <p className="text-[17px] leading-none font-extrabold tracking-[-0.03em] text-[#24152b]">Lalisha</p>
                <p className="mt-1 text-[9px] font-extrabold tracking-[0.22em] text-[#8c7c94]">FITZONE</p>
            </div>
        </div>
    );
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

export default function Welcome() {
    const { auth, platformStats } = usePage<SharedData & { platformStats: PlatformStats }>().props;
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
                <header className="relative z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
                    <Link href={route('home')} aria-label="Lalisha FitZone home">
                        <BrandMark />
                    </Link>
                    <nav className="flex items-center gap-2 sm:gap-3" aria-label="Account navigation">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-full bg-[#2a1731] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#662199] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                            >
                                Dashboard <ArrowRight className="size-4" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-full px-4 py-3 text-xs font-extrabold text-[#4f3f57] transition hover:bg-[#efe8f2] focus-visible:ring-2 focus-visible:ring-[#662199]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#2a1731] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#662199] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                                >
                                    Join FitZone <ArrowRight className="size-4" />
                                </Link>
                            </>
                        )}
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
                                    href="#experience"
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

                    <section id="experience" className="border-y border-[#e8e0ec] bg-white py-24 sm:py-28">
                        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                            <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                                <div>
                                    <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#8b5ba2]">THE FITZONE SYSTEM</p>
                                    <h2
                                        className="mt-4 max-w-[500px] text-4xl leading-[1.02] font-bold tracking-[-0.055em] text-[#24142b] sm:text-5xl"
                                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                        Everything around your next move.
                                    </h2>
                                </div>
                                <p className="max-w-[600px] text-base leading-7 font-medium text-[#776b7c] lg:justify-self-end">
                                    Lalisha connects discovery, coaching, and checkout so your fitness plan does not get scattered across different
                                    apps and conversations.
                                </p>
                            </div>

                            <div className="mt-14 grid gap-5 lg:grid-cols-3">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <article
                                            key={feature.title}
                                            className="group relative overflow-hidden rounded-[28px] border border-[#e8e0ec] bg-[#fcfafc] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#cfb9da] hover:shadow-[0_20px_50px_rgba(58,30,71,0.1)] sm:p-8"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div
                                                    className={`flex size-12 items-center justify-center rounded-2xl ${feature.accent} ${feature.iconColor}`}
                                                >
                                                    <Icon className="size-5" />
                                                </div>
                                                <span className="text-xs font-extrabold text-[#c0b2c6]">0{index + 1}</span>
                                            </div>
                                            <p className="mt-10 text-[9px] font-extrabold tracking-[0.18em] text-[#91779d]">{feature.eyebrow}</p>
                                            <h3 className="mt-3 max-w-[320px] text-2xl leading-tight font-extrabold tracking-[-0.04em] text-[#2a1931]">
                                                {feature.title}
                                            </h3>
                                            <p className="mt-4 text-sm leading-7 font-medium text-[#776b7c]">{feature.description}</p>
                                            <div className="mt-7 flex items-center gap-2 text-xs font-extrabold text-[#662199]">
                                                Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

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
