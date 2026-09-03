"use client";

import { useEffect, useState } from "react";
import InsightArticle from "./InsightArticle";
import type { Insight } from "@/lib/insights";
import type { NavItem } from "@/lib/nav";

export default function InsightPreviewClient({ navItems }: { navItems: NavItem[] }) {
    const [item, setItem] = useState<Insight | null | undefined>(undefined);

    useEffect(() => {
        const raw = sessionStorage.getItem("insight-preview");
        setItem(raw ? (JSON.parse(raw) as Insight) : null);
    }, []);

    if (item === undefined) return null;

    if (!item) {
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
            <InsightArticle item={item} related={[]} navItems={navItems} />
        </div>
    );
}