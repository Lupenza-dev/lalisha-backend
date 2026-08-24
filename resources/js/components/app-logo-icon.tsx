import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function AppLogoIcon({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span className={cn('relative inline-block shrink-0 overflow-hidden bg-white', className)} {...props}>
            <img src="/images/lalisha_logo.jpeg" alt="" aria-hidden="true" className="absolute -top-[42%] -left-[24%] w-[353%] max-w-none" />
        </span>
    );
}
