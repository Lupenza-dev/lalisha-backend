import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Cog, LayoutGrid, ShoppingBag, UserRound } from 'lucide-react';
import AppLogo from './app-logo';

const overviewItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const operationsItems: NavItem[] = [
    {
        title: 'Training Programs',
        url: '/training-programs',
        icon: BookOpen,
    },
    {
        title: 'Shop Products',
        url: '/shop-products',
        icon: ShoppingBag,
    },
    {
        title: 'Trainers',
        url: '/trainers',
        icon: UserRound,
    },
];

const settingsItems: NavItem[] = [
    {
        title: 'System Settings',
        url: '/system-settings',
        icon: Cog,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-sidebar-border/60">
            <SidebarHeader className="border-b border-sidebar-border/40 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={overviewItems} label="Overview" />
                <NavMain items={operationsItems} label="Operations" />
                <NavMain items={settingsItems} label="Configuration" />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/40">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
