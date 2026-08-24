import CatalogHero from '@/components/explore/catalog-hero';
import CatalogLayout from '@/components/explore/catalog-layout';
import CatalogPagination from '@/components/explore/catalog-pagination';
import { type SharedData } from '@/types';
import { type PaginatedData, type SelectOption } from '@/types/catalog';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Award, CalendarDays, CheckCircle2, Medal, Search, UserRound, UsersRound, X } from 'lucide-react';
import { type FormEvent, useState } from 'react';

type Trainer = {
    id: number;
    name: string;
    about: string | null;
    image_url: string | null;
    program_type: string | null;
    training_level: string | null;
    session_price: number;
    certifications: string;
    availability: 'available' | 'unavailable';
};

type Props = {
    trainers: PaginatedData<Trainer>;
    programTypes: SelectOption[];
    trainingLevels: SelectOption[];
    filters: {
        search: string;
        type: number | null;
        level: number | null;
        availability: string;
    };
};

const formatPrice = (value: number) => `TZS ${new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(value)}`;

export default function Trainers({ trainers, programTypes, trainingLevels, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters.search);
    const [type, setType] = useState(filters.type?.toString() ?? '');
    const [level, setLevel] = useState(filters.level?.toString() ?? '');
    const [availability, setAvailability] = useState(filters.availability);
    const accountHref = auth.user ? route('dashboard') : route('register');
    const hasFilters = filters.search !== '' || filters.type !== null || filters.level !== null || filters.availability !== '';

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            route('explore.trainers'),
            { search: search || undefined, type: type || undefined, level: level || undefined, availability: availability || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <CatalogLayout active="trainers">
            <Head title="Expert trainers">
                <meta
                    name="description"
                    content="Meet active Lalisha FitZone trainers and compare coaching format, level, availability, and session price."
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700,800&family=space-grotesk:500,600,700" rel="stylesheet" />
            </Head>

            <CatalogHero
                section="Trainers"
                eyebrow="COACHING ROSTER"
                title="Find the coach who fits your pace."
                description="Compare coaching formats, experience levels, credentials, availability, and session prices in one clear roster."
                count={trainers.total}
                countLabel="Active coaches"
                icon={Award}
                tone="light"
            />

            <section className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
                <form
                    onSubmit={applyFilters}
                    className="grid gap-3 rounded-[24px] border border-[#e6dce9] bg-white p-4 shadow-[0_12px_35px_rgba(53,27,67,0.07)] md:grid-cols-2 xl:grid-cols-[1fr_190px_190px_180px_auto]"
                >
                    <label className="flex items-center gap-3 rounded-2xl bg-[#f7f2f9] px-4">
                        <Search className="size-4 text-[#8a5aa6]" />
                        <span className="sr-only">Search trainers</span>
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search name or expertise"
                            className="h-12 w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#a69aaa]"
                        />
                    </label>
                    <select
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        className="h-12 rounded-2xl border border-[#e7dfea] bg-white px-4 text-sm font-bold text-[#5e5165] outline-none focus:border-[#662199]"
                    >
                        <option value="">All formats</option>
                        {programTypes.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={level}
                        onChange={(event) => setLevel(event.target.value)}
                        className="h-12 rounded-2xl border border-[#e7dfea] bg-white px-4 text-sm font-bold text-[#5e5165] outline-none focus:border-[#662199]"
                    >
                        <option value="">All levels</option>
                        {trainingLevels.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={availability}
                        onChange={(event) => setAvailability(event.target.value)}
                        className="h-12 rounded-2xl border border-[#e7dfea] bg-white px-4 text-sm font-bold text-[#5e5165] outline-none focus:border-[#662199]"
                    >
                        <option value="">Any availability</option>
                        <option value="available">Available now</option>
                        <option value="unavailable">Currently unavailable</option>
                    </select>
                    <button
                        type="submit"
                        className="h-12 rounded-2xl bg-[#662199] px-6 text-sm font-extrabold text-white transition hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                    >
                        Find trainers
                    </button>
                </form>

                <div className="mt-10 flex items-end justify-between gap-5">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.17em] text-[#8a5aa6]">TRAINER DIRECTORY</p>
                        <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#24142b]">Coaching built around people</h2>
                    </div>
                    {hasFilters ? (
                        <Link href={route('explore.trainers')} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#662199]">
                            <X className="size-4" /> Clear filters
                        </Link>
                    ) : null}
                </div>

                {trainers.data.length > 0 ? (
                    <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {trainers.data.map((trainer) => {
                            const certifications = trainer.certifications
                                .split(',')
                                .map((item) => item.trim())
                                .filter(Boolean)
                                .slice(0, 2);

                            return (
                                <article
                                    key={trainer.id}
                                    className="group overflow-hidden rounded-[26px] border border-[#e8dfea] bg-white shadow-[0_14px_34px_rgba(53,27,67,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(53,27,67,0.14)]"
                                >
                                    <div className="relative h-72 overflow-hidden bg-[#4a285a]">
                                        {trainer.image_url ? (
                                            <img
                                                src={trainer.image_url}
                                                alt=""
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#7f359f,#321a3d)]">
                                                <UserRound className="size-24 text-white/55" strokeWidth={1.1} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent to-[#160b1b]/95 p-5">
                                            <span
                                                className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-[9px] font-black tracking-[0.12em] text-white ${trainer.availability === 'available' ? 'bg-[#1a191c]/75' : 'bg-[#661f35]/85'}`}
                                            >
                                                <span
                                                    className={`size-2 rounded-full ${trainer.availability === 'available' ? 'bg-[#ddfc64]' : 'bg-[#ff9cab]'}`}
                                                />{' '}
                                                {trainer.availability === 'available' ? 'AVAILABLE' : 'BOOKED OUT'}
                                            </span>
                                            <div>
                                                <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#ddfc64] uppercase">
                                                    {trainer.program_type ?? 'Personal training'}
                                                </p>
                                                <h3 className="mt-2 text-3xl font-black tracking-[-0.045em] text-white">{trainer.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-1 bg-[#ddfc64]" />
                                    <div className="p-5">
                                        <div className="flex items-center gap-3">
                                            <span className="flex size-11 items-center justify-center rounded-xl bg-[#f3eaf8] text-[#662199]">
                                                <Medal className="size-5" />
                                            </span>
                                            <div>
                                                <p className="text-[8px] font-extrabold tracking-[0.1em] text-[#9a8f9f]">TRAINING LEVEL</p>
                                                <p className="mt-1 text-sm font-extrabold text-[#302735]">{trainer.training_level ?? 'All levels'}</p>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <p className="text-[8px] font-extrabold tracking-[0.1em] text-[#9a8f9f]">PER SESSION</p>
                                                <p className="mt-1 text-base font-black text-[#211726]">{formatPrice(trainer.session_price)}</p>
                                            </div>
                                        </div>
                                        <p className="mt-5 line-clamp-2 min-h-12 text-sm leading-6 font-medium text-[#776b7c]">
                                            {trainer.about || 'Focused coaching designed around your current level, schedule, and training goals.'}
                                        </p>
                                        {certifications.length > 0 ? (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {certifications.map((certification) => (
                                                    <span
                                                        key={certification}
                                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f7dc] px-3 py-2 text-[9px] font-extrabold text-[#5f6e30]"
                                                    >
                                                        <CheckCircle2 className="size-3.5" /> {certification}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : null}
                                        <div className="mt-5 flex items-center border-t border-[#ece4ef] pt-5">
                                            <span className="text-xs font-semibold text-[#7c7181]">Profile & availability</span>
                                            <Link
                                                href={accountHref}
                                                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#662199] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#54157f]"
                                            >
                                                <CalendarDays className="size-4" /> Book session
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-[28px] border border-dashed border-[#d9c9df] bg-white text-center">
                        <UsersRound className="size-10 text-[#8a5aa6]" />
                        <h3 className="mt-4 text-xl font-black text-[#2a1931]">No trainers match those filters</h3>
                        <p className="mt-2 text-sm font-medium text-[#7c7181]">Try another format, level, or availability option.</p>
                    </div>
                )}

                <CatalogPagination pagination={trainers} />
            </section>
        </CatalogLayout>
    );
}
