import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface NavMainProps {
    items: NavItem[];
    label?: string;
}

export function NavMain({ items = [], label = 'Platform' }: NavMainProps) {
    const page = usePage();

    const isActive = (url: string) => {
        if (url === '/') {
            return page.url === '/';
        }
        return page.url === url || page.url.startsWith(`${url}/`);
    };

    return (
        <SidebarGroup className="px-2 py-2">
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1.5">
                {items.map((item) => {
                    const active = isActive(item.url);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={item.title}
                                className="group/menu-item relative h-10 py-2.5 font-medium transition-colors data-[active=true]:bg-gradient-to-r data-[active=true]:from-indigo-500/10 data-[active=true]:to-purple-500/10 data-[active=true]:text-indigo-700 dark:data-[active=true]:text-indigo-300"
                            >
                                <Link href={item.url} prefetch>
                                    {active && (
                                        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                                    )}
                                    {item.icon && (
                                        <item.icon
                                            className={
                                                active
                                                    ? 'text-indigo-600 dark:text-indigo-300'
                                                    : 'text-muted-foreground group-hover/menu-item:text-foreground'
                                            }
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
