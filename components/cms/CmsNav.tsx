import Link from "next/link";
import { Settings } from "lucide-react";

export default function CmsNav({ active }: { active: "insights" | "experience" | "logos" | "admins" }) {
    return (
        <nav className="mb-8 flex gap-4 text-sm">
            <Link
                href="/cms"
                className={active === "insights" ? "text-gold" : "text-white/60 hover:text-white"}
            >
                Insights
            </Link>
            <Link
                href="/cms/experience"
                className={active === "experience" ? "text-gold" : "text-white/60 hover:text-white"}
            >
                Experience
            </Link>
            <Link
                href="/cms/logos"
                className={active === "logos" ? "text-gold" : "text-white/60 hover:text-white"}
            >
                Logos
            </Link>
            <Link
                href="/cms/admins"
                className={
                    "ml-auto " + (active === "admins" ? "text-gold" : "text-white/60 hover:text-white")
                }
            >
                <Settings className="h-4 w-4" />
            </Link>
        </nav>

    );
}