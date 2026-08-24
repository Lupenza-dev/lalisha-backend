import { type PaginatedData } from '@/types/catalog';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CatalogPagination<T>({ pagination }: { pagination: PaginatedData<T> }) {
    if (pagination.last_page <= 1) {
        return null;
    }

    return (
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e7dfea] pt-7 sm:flex-row">
            <p className="text-xs font-bold text-[#817386]">
                Showing {pagination.from}–{pagination.to} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
                {pagination.prev_page_url ? (
                    <Link
                        href={pagination.prev_page_url}
                        preserveScroll
                        className="inline-flex items-center gap-2 rounded-full border border-[#dcd1e1] bg-white px-4 py-2.5 text-xs font-extrabold text-[#4f3f57] hover:border-[#b99bc7]"
                    >
                        <ArrowLeft className="size-4" /> Previous
                    </Link>
                ) : null}
                <span className="px-3 text-xs font-extrabold text-[#6d6073]">
                    {pagination.current_page} / {pagination.last_page}
                </span>
                {pagination.next_page_url ? (
                    <Link
                        href={pagination.next_page_url}
                        preserveScroll
                        className="inline-flex items-center gap-2 rounded-full bg-[#291630] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#662199]"
                    >
                        Next <ArrowRight className="size-4" />
                    </Link>
                ) : null}
            </div>
        </div>
    );
}
