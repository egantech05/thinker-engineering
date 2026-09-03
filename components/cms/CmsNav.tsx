import Link from "next/link";

export default function CmsNav({ active }: { active: "insights" | "experience" | "logos" }) {
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
        </nav>
    );
}