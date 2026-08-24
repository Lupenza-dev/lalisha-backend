import CatalogHero from '@/components/explore/catalog-hero';
import CatalogLayout from '@/components/explore/catalog-layout';
import CatalogPagination from '@/components/explore/catalog-pagination';
import { type SharedData } from '@/types';
import { type PaginatedData, type SelectOption } from '@/types/catalog';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, Clock3, Dumbbell, PlayCircle, Search, X } from 'lucide-react';
import { type FormEvent, useState } from 'react';

type Program = {
    id: number;
    name: string;
    time_type: string;
    description: string;
    benefit: string;
    price: number;
    clips_count: number;
    cover_image_url: string | null;
    program_category: string | null;
    program_type: string | null;
};

type Props = {
    programs: PaginatedData<Program>;
    categories: SelectOption[];
    programTypes: SelectOption[];
    filters: {
        search: string;
        category: number | null;
        type: number | null;
    };
};

const formatPrice = (value: number) => `TZS ${new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(value)}`;
const formatTimeType = (value: string) => value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function Programs({ programs, categories, programTypes, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category?.toString() ?? '');
    const [type, setType] = useState(filters.type?.toString() ?? '');
    const accountHref = auth.user ? route('dashboard') : route('register');
    const hasFilters = filters.search !== '' || filters.category !== null || filters.type !== null;

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            route('explore.programs'),
            { search: search || undefined, category: category || undefined, type: type || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <CatalogLayout active="programs">
            <Head title="Training programs">
                <meta name="description" content="Explore active Lalisha FitZone training programs by goal, category, format, and price." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700,800&family=space-grotesk:500,600,700" rel="stylesheet" />
            </Head>

            <CatalogHero
                section="Programs"
                eyebrow="TRAIN WITH A CLEAR GOAL"
                title="Training programs built around progress."
                description="Compare formats, benefits, session libraries, and prices before choosing the program that fits your routine."
                count={programs.total}
                countLabel="Active programs"
                icon={Dumbbell}
                tone="dark"
            />

            <section className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
                <form
                    onSubmit={applyFilters}
                    className="grid gap-3 rounded-[24px] border border-[#e6dce9] bg-white p-4 shadow-[0_12px_35px_rgba(53,27,67,0.07)] md:grid-cols-[1fr_220px_220px_auto]"
                >
                    <label className="flex items-center gap-3 rounded-2xl bg-[#f7f2f9] px-4">
                        <Search className="size-4 text-[#8a5aa6]" />
                        <span className="sr-only">Search programs</span>
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by goal or benefit"
                            className="h-12 w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#a69aaa]"
                        />
                    </label>
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="h-12 rounded-2xl border border-[#e7dfea] bg-white px-4 text-sm font-bold text-[#5e5165] outline-none focus:border-[#662199]"
                    >
                        <option value="">All categories</option>
                        {categories.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
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
                    <button
                        type="submit"
                        className="h-12 rounded-2xl bg-[#662199] px-6 text-sm font-extrabold text-white transition hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                    >
                        Find programs
                    </button>
                </form>

                <div className="mt-10 flex items-end justify-between gap-5">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.17em] text-[#8a5aa6]">PROGRAM LIBRARY</p>
                        <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#24142b]">{programs.total} ways to move forward</h2>
                    </div>
                    {hasFilters ? (
                        <Link href={route('explore.programs')} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#662199]">
                            <X className="size-4" /> Clear filters
                        </Link>
                    ) : null}
                </div>

                {programs.data.length > 0 ? (
                    <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {programs.data.map((program, index) => (
                            <article
                                key={program.id}
                                className="group overflow-hidden rounded-[26px] border border-[#e8dfea] bg-white shadow-[0_14px_34px_rgba(53,27,67,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(53,27,67,0.14)]"
                            >
                                <div className="relative h-72 overflow-hidden bg-[#4a285a]">
                                    {program.cover_image_url ? (
                                        <img
                                            src={program.cover_image_url}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_75%_20%,#8e3cc9_0,transparent_28%),linear-gradient(145deg,#6b2490,#291630)]">
                                            <Dumbbell className="size-20 text-white/45" strokeWidth={1.2} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/10 via-transparent to-[#160b1b]/95 p-5">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="flex size-10 items-center justify-center rounded-full bg-[#ddfc64] text-[10px] font-black text-[#211726]">
                                                {String((programs.from ?? 1) + index).padStart(2, '0')}
                                            </span>
                                            <span className="rounded-full bg-white/90 px-3 py-2 text-[9px] font-black tracking-[0.08em] text-[#4f1e68] uppercase">
                                                {program.program_type ?? 'Training'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#ddfc64] uppercase">
                                                {program.program_category ?? 'Fitness'}
                                            </p>
                                            <h3 className="mt-2 text-3xl leading-[1.02] font-black tracking-[-0.045em] text-white">{program.name}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1 bg-[#ddfc64]" />
                                <div className="p-5">
                                    <p className="line-clamp-2 min-h-12 text-sm leading-6 font-medium text-[#776b7c]">{program.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3eaf8] px-3 py-2 text-[10px] font-extrabold text-[#662199]">
                                            <Clock3 className="size-3.5" /> {formatTimeType(program.time_type)}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f7dc] px-3 py-2 text-[10px] font-extrabold text-[#5f7b16]">
                                            <PlayCircle className="size-3.5" /> {program.clips_count} sessions
                                        </span>
                                    </div>
                                    <div className="mt-5 flex items-center border-t border-[#ece4ef] pt-5">
                                        <div>
                                            <p className="text-[8px] font-extrabold tracking-[0.12em] text-[#9a8f9f]">PROGRAM PRICE</p>
                                            <p className="mt-1 text-lg font-black text-[#211726]">{formatPrice(program.price)}</p>
                                        </div>
                                        <Link
                                            href={accountHref}
                                            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#662199] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#54157f]"
                                        >
                                            Choose program <ArrowRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-[28px] border border-dashed border-[#d9c9df] bg-white text-center">
                        <Dumbbell className="size-10 text-[#8a5aa6]" />
                        <h3 className="mt-4 text-xl font-black text-[#2a1931]">No programs match those filters</h3>
                        <p className="mt-2 text-sm font-medium text-[#7c7181]">Clear the filters to return to the full program library.</p>
                    </div>
                )}

                <CatalogPagination pagination={programs} />
            </section>
        </CatalogLayout>
    );
}
