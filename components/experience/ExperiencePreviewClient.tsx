"use client";

import { useEffect, useState } from "react";
import ExperienceArticle from "./ExperienceArticle";
import type { Experience } from "@/lib/experiences";
import type { NavItem } from "@/lib/nav";

export default function ExperiencePreviewClient({ navItems }: { navItems: NavItem[] }) {
    const [study, setStudy] = useState<Experience | null | undefined>(undefined);

    useEffect(() => {
        const raw = sessionStorage.getItem("experience-preview");
        setStudy(raw ? (JSON.parse(raw) as Experience) : null);
    }, []);

    if (study === undefined) return null;

    if (!study) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
                <p>No preview data found. Go back to the CMS and click Preview again.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="sticky top-0 z-[60] flex items-center justify-between bg-gold px-6 py-2 text-sm font-medium text-black">
                <span>Preview mode — unsaved changes, not visible to visitors</span>
                <button
                    type="button"
                    onClick={() => window.close()}
                    className="rounded border border-black/30 px-3 py-1 hover:bg-black/10"
                >
                    Close preview
                </button>
            </div>
            <ExperienceArticle study={study} related={[]} navItems={navItems} />
        </div>
    );
}