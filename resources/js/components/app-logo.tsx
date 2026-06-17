import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm ring-1 ring-white/10">
                <AppLogoIcon className="size-5 fill-current text-white" />
            </div>
            <div className="ml-1.5 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-base font-bold text-transparent dark:from-indigo-300 dark:to-purple-300">
                    Lalisha
                </span>
                <span className="truncate text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    Admin Panel
                </span>
            </div>
        </>
    );
}
