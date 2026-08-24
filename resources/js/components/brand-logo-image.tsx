import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function BrandLogoImage({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('relative h-12 w-48 shrink-0 overflow-hidden', className)} {...props}>
            <img
                src="/images/lalisha_logo.jpeg"
                alt="Lalisha — Your Fitness Corner"
                className="absolute top-1/2 left-0 w-full max-w-none -translate-y-1/2"
            />
        </div>
    );
}
