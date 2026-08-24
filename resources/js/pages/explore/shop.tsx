import CatalogHero from '@/components/explore/catalog-hero';
import CatalogLayout from '@/components/explore/catalog-layout';
import CatalogPagination from '@/components/explore/catalog-pagination';
import { type SharedData } from '@/types';
import { type PaginatedData, type SelectOption } from '@/types/catalog';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PackageOpen, Search, ShoppingBag, Tag, X } from 'lucide-react';
import { type FormEvent, useState } from 'react';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    has_offer: boolean;
    offer_price: number | null;
    image_url: string | null;
    product_category: string | null;
};

type Props = {
    products: PaginatedData<Product>;
    categories: SelectOption[];
    filters: {
        search: string;
        category: number | null;
        offers: boolean;
    };
};

const formatPrice = (value: number) => `TZS ${new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(value)}`;

export default function Shop({ products, categories, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category?.toString() ?? '');
    const [offers, setOffers] = useState(filters.offers);
    const accountHref = auth.user ? route('dashboard') : route('register');
    const hasFilters = filters.search !== '' || filters.category !== null || filters.offers;

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            route('explore.shop'),
            { search: search || undefined, category: category || undefined, offers: offers ? 1 : undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <CatalogLayout active="shop">
            <Head title="Fitness shop">
                <meta
                    name="description"
                    content="Browse active Lalisha FitZone fitness equipment, nutrition, apparel, recovery products, and offers."
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700,800&family=space-grotesk:500,600,700" rel="stylesheet" />
            </Head>

            <CatalogHero
                section="Shop"
                eyebrow="THE FITNESS SHOP"
                title="Equipment and essentials for active routines."
                description="Browse training equipment, nutrition, apparel, and recovery products selected for every part of your routine."
                count={products.total}
                countLabel="Shop essentials"
                icon={ShoppingBag}
                tone="lime"
            />

            <section className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
                <form
                    onSubmit={applyFilters}
                    className="grid gap-3 rounded-[24px] border border-[#e6dce9] bg-white p-4 shadow-[0_12px_35px_rgba(53,27,67,0.07)] md:grid-cols-[1fr_230px_190px_auto]"
                >
                    <label className="flex items-center gap-3 rounded-2xl bg-[#f7f2f9] px-4">
                        <Search className="size-4 text-[#8a5aa6]" />
                        <span className="sr-only">Search shop products</span>
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search products"
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
                    <label className="flex h-12 cursor-pointer items-center gap-3 rounded-2xl border border-[#e7dfea] bg-white px-4 text-sm font-bold text-[#5e5165]">
                        <input
                            type="checkbox"
                            checked={offers}
                            onChange={(event) => setOffers(event.target.checked)}
                            className="size-4 accent-[#662199]"
                        />{' '}
                        Offers only
                    </label>
                    <button
                        type="submit"
                        className="h-12 rounded-2xl bg-[#662199] px-6 text-sm font-extrabold text-white transition hover:bg-[#54157f] focus-visible:ring-2 focus-visible:ring-[#662199] focus-visible:ring-offset-2"
                    >
                        Browse shop
                    </button>
                </form>

                <div className="mt-10 flex items-end justify-between gap-5">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.17em] text-[#8a5aa6]">SHOP COLLECTION</p>
                        <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#24142b]">Everything around your next session</h2>
                    </div>
                    {hasFilters ? (
                        <Link href={route('explore.shop')} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#662199]">
                            <X className="size-4" /> Clear filters
                        </Link>
                    ) : null}
                </div>

                {products.data.length > 0 ? (
                    <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.data.map((product) => {
                            const currentPrice = product.has_offer && product.offer_price !== null ? product.offer_price : product.price;
                            const discount =
                                product.has_offer && product.offer_price !== null && product.price > 0
                                    ? Math.round(((product.price - product.offer_price) / product.price) * 100)
                                    : 0;

                            return (
                                <article
                                    key={product.id}
                                    className="group overflow-hidden rounded-[24px] border border-[#e7dcea] bg-white shadow-[0_14px_32px_rgba(53,27,67,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(53,27,67,0.14)]"
                                >
                                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#ede4f1]">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt=""
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute size-48 rounded-full bg-white/65" />
                                                <PackageOpen className="relative size-20 text-[#662199]" strokeWidth={1.15} />
                                            </>
                                        )}
                                        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-2 text-[9px] font-extrabold tracking-[0.08em] text-[#662199] uppercase shadow-sm">
                                            {product.product_category ?? 'Fitness gear'}
                                        </span>
                                        {discount > 0 ? (
                                            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#ddfc64] px-3 py-2 text-[9px] font-black text-[#283009]">
                                                <Tag className="size-3" /> {discount}% OFF
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-xl font-black tracking-[-0.03em] text-[#211726]">{product.name}</h3>
                                        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 font-medium text-[#7c7181]">
                                            {product.description}
                                        </p>
                                        <div className="mt-5 flex items-end border-t border-[#ece4ef] pt-5">
                                            <div>
                                                <p className="text-[8px] font-extrabold tracking-[0.1em] text-[#9a8f9f]">PRICE</p>
                                                <p className="mt-1 text-lg font-black text-[#211726]">{formatPrice(currentPrice)}</p>
                                                {discount > 0 ? (
                                                    <p className="mt-1 text-[10px] font-bold text-[#9a8f9f] line-through">
                                                        {formatPrice(product.price)}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <Link
                                                href={accountHref}
                                                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#662199] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#54157f]"
                                            >
                                                <ShoppingBag className="size-4" /> Add to cart
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-[28px] border border-dashed border-[#d9c9df] bg-white text-center">
                        <PackageOpen className="size-10 text-[#8a5aa6]" />
                        <h3 className="mt-4 text-xl font-black text-[#2a1931]">No products match those filters</h3>
                        <p className="mt-2 text-sm font-medium text-[#7c7181]">Try another category or include products without offers.</p>
                    </div>
                )}

                <CatalogPagination pagination={products} />
            </section>
        </CatalogLayout>
    );
}
