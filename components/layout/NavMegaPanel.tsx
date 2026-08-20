"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "@/lib/nav";

function chunk<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export default function NavMegaPanel({
    item,
    onAnchorClick,
    onEnter,
    onLeave,
}: {
    item: NavItem | null;
    onAnchorClick: (id: string) => void;
    onEnter: () => void;
    onLeave: () => void;
}) {
    const handleLinkClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        if (href.startsWith("/#")) {
            const id = href.slice(2);
            if (document.getElementById(id)) {
                e.preventDefault();
                onAnchorClick(id);
            }
        }
    };

    const subItems = item?.subItems ?? [];
    const perColumn = subItems.length > 5 ? Math.ceil(subItems.length / 2) : subItems.length;
    const columnsData = chunk(subItems, perColumn || 1);

    return (
        <AnimatePresence>
            {item && subItems.length > 0 && (
                <motion.div
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0"
                >
                    <div className="rounded-b-2xl border border-t-0 border-white/10 bg-[#050913]/95 backdrop-blur-lg shadow-lg shadow-black/40 px-6 md:px-10 py-6">
                        <div className="flex flex-wrap gap-x-16 gap-y-1">
                            {columnsData.map((col, ci) => (
                                <div key={ci} className="flex flex-col gap-1 min-w-[240px]">
                                    {col.map((sub) => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            onClick={(e) => handleLinkClick(e, sub.href)}
                                            className="block rounded-lg px-3 py-2 hover:bg-white/5 transition-colors"
                                        >
                                            <span className="block text-sm font-medium text-white">
                                                {sub.label}
                                            </span>
                                            {sub.description && (
                                                <span className="block text-xs text-mist mt-0.5 line-clamp-2">
                                                    {sub.description}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}