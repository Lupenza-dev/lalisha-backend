import { Head, Link } from '@inertiajs/react';
import { formatTZS } from '@/lib/utils';
import {
    ArrowUpRight,
    BookOpen,
    FolderOpen,
    type LucideIcon,
    Package,
    ShoppingBag,
    Sparkles,
    UserCheck,
    UserRound,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface Stats {
    training_programs: number;
    shop_products: number;
    trainers: number;
    available_trainers: number;
    program_categories: number;
    product_categories: number;
}

interface TrainerRow {
    id: number;
    name: string;
    email: string;
    image_url: string | null;
    program_type: string | null;
    training_level: string | null;
    availability: 'available' | 'unavailable';
}

interface ProgramRow {
    id: number;
    name: string;
    price: number;
    time_type: string;
    program_category: string | null;
    program_type: string | null;
}

interface Props {
    stats: Stats;
    latestTrainers: TrainerRow[];
    latestPrograms: ProgramRow[];
}

interface StatCardConfig {
    label: string;
    value: number;
    hint?: string;
    icon: LucideIcon;
    href: string;
    gradient: string;
    iconBg: string;
}

export default function Dashboard({ stats, latestTrainers, latestPrograms }: Props) {
    const statCards: StatCardConfig[] = [
        {
            label: 'Training Programs',
            value: stats.training_programs,
            hint: 'Active in catalog',
            icon: BookOpen,
            href: '/training-programs',
            gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
            iconBg: 'from-indigo-500 to-indigo-600',
        },
        {
            label: 'Shop Products',
            value: stats.shop_products,
            hint: 'Listed in shop',
            icon: ShoppingBag,
            href: '/shop-products',
            gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
            iconBg: 'from-emerald-500 to-emerald-600',
        },
        {
            label: 'Trainers',
            value: stats.trainers,
            hint: `${stats.available_trainers} available now`,
            icon: UserRound,
            href: '/trainers',
            gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
            iconBg: 'from-purple-500 to-purple-600',
        },
        {
            label: 'Available Trainers',
            value: stats.available_trainers,
            hint: `of ${stats.trainers} total`,
            icon: UserCheck,
            href: '/trainers',
            gradient: 'from-pink-500/10 via-pink-500/5 to-transparent',
            iconBg: 'from-pink-500 to-pink-600',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Hero / welcome banner */}
                <div className="relative overflow-hidden rounded-2xl border border-indigo-200/40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg dark:border-indigo-500/30">
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
                                <p className="mt-1 text-sm text-white/85">
                                    Here's an overview of your training platform today.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/training-programs/create">
                                <Button variant="secondary" size="sm" className="bg-white text-indigo-700 hover:bg-white/90">
                                    New Program
                                </Button>
                            </Link>
                            <Link href="/trainers/create">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                                >
                                    New Trainer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link key={card.label} href={card.href} className="group">
                                <Card className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                                    <div
                                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                                    />
                                    <CardContent className="relative p-5">
                                        <div className="flex items-start justify-between">
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.iconBg} text-white shadow-sm`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                                {card.label}
                                            </p>
                                            <p className="mt-1 text-3xl font-bold tracking-tight">{card.value}</p>
                                            {card.hint && (
                                                <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Two-column: trainers + programs */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Latest trainers */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <div>
                                <CardTitle className="text-base font-semibold">Latest Trainers</CardTitle>
                                <CardDescription>Recently added team members</CardDescription>
                            </div>
                            <Link href="/trainers">
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                                    View all
                                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {latestTrainers.length === 0 && (
                                <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
                                    No trainers yet.
                                </p>
                            )}
                            {latestTrainers.map((trainer) => (
                                <Link
                                    key={trainer.id}
                                    href={`/trainers/${trainer.id}/edit`}
                                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/60"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                                        {trainer.image_url ? (
                                            <img
                                                src={trainer.image_url}
                                                alt={trainer.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <UserRound className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{trainer.name}</p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {trainer.program_type ?? '—'} • {trainer.training_level ?? '—'}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={trainer.availability === 'available' ? 'default' : 'secondary'}
                                        className="shrink-0"
                                    >
                                        {trainer.availability}
                                    </Badge>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Latest programs */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <div>
                                <CardTitle className="text-base font-semibold">Latest Training Programs</CardTitle>
                                <CardDescription>Recently created programs</CardDescription>
                            </div>
                            <Link href="/training-programs">
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                                    View all
                                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {latestPrograms.length === 0 && (
                                <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
                                    No training programs yet.
                                </p>
                            )}
                            {latestPrograms.map((program) => (
                                <Link
                                    key={program.id}
                                    href={`/training-programs/${program.id}/edit`}
                                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/60"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-purple-500/15 text-indigo-600 dark:text-indigo-300">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {program.name}
                                        </p>
                                        <p className="text-xs capitalize text-muted-foreground">
                                            {program.program_category ?? '—'} • {program.program_type ?? '—'} • {program.time_type}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-sm font-semibold">
                                        {formatTZS(program.price)}
                                    </span>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Taxonomy quick stats */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold">Catalog Taxonomy</CardTitle>
                        <CardDescription>Reference data powering programs and products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <Link
                                href="/program-categories"
                                className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all hover:border-indigo-300 hover:shadow-sm"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                                    <FolderOpen className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-xs text-muted-foreground">Program Categories</p>
                                    <p className="text-lg font-semibold">{stats.program_categories}</p>
                                </div>
                            </Link>
                            <Link
                                href="/product-categories"
                                className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all hover:border-emerald-300 hover:shadow-sm"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                                    <Package className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-xs text-muted-foreground">Product Categories</p>
                                    <p className="text-lg font-semibold">{stats.product_categories}</p>
                                </div>
                            </Link>
                            <Link
                                href="/system-settings"
                                className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all hover:border-purple-300 hover:shadow-sm md:col-span-2"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">Manage all taxonomies</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        Categories, types, levels, certificates
                                    </p>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
