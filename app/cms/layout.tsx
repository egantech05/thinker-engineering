import Logo from "@/components/Logo";
import type { ReactNode } from "react";
import { signOutToWebsite, signOut } from "@/app/cms/actions";
import { LogOut } from "lucide-react";

export default function CmsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
            <header className="flex items-center justify-between border-b border-white/10 px-8 py-4">
                <div className="flex items-center gap-3">
                    <Logo variant="icon" className="h-8 w-auto" />
                    <span className="text-lg font-medium tracking-wide">Content Management System</span>
                </div>
                <div className="flex items-center gap-2">
                    <form action={signOutToWebsite}>
                        <button
                            type="submit"
                            className="rounded border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
                        >
                            Website
                        </button>
                    </form>
                    <form action={signOut}>
                        <button
                            type="submit"
                            aria-label="Log out"
                            title="Log out"
                            className="rounded border border-white/20 p-2 text-white hover:bg-white/10"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </header>
            <div className="flex flex-1 flex-col p-8">{children}</div>
        </div>
    );
}