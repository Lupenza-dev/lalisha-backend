import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-purple-200/70">
                <AppLogoIcon className="size-9" />
            </div>
            <div className="ml-1.5 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate bg-gradient-to-r from-[#662199] to-[#7dbd2b] bg-clip-text text-base font-bold text-transparent">
                    Lalisha
                </span>
                <span className="text-muted-foreground truncate text-[11px] font-medium tracking-wide uppercase">Admin Panel</span>
            </div>
        </>
    );
}
