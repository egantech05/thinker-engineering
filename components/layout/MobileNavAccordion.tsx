"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/nav";

export default function MobileNavAccordion({
    items,
    onAnchorClick,
    onNavigate,
}: {
    items: NavItem[];
    onAnchorClick: (id: string) => void;
    onNavigate: () => void;
}) {
    const [openLabel, setOpenLabel] = useState<string | null>(null);

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
        onNavigate();
    };

    return (
        <div className="flex flex-col gap-1">
            {items.map((item) => {
                if (!item.subItems || item.subItems.length === 0) {
                    return (
                        <Link
                            key={item.label}
                            href={item.href ?? "#"}
                            onClick={(e) => handleLinkClick(e, item.href ?? "")}
                            className="text-mist hover:text-white transition-colors py-2"
                        >
                            {item.label}
                        </Link>
                    );
                }

                const isOpen = openLabel === item.label;

                return (
                    <div key={item.label}>
                        <button
                            type="button"
                            onClick={() => setOpenLabel(isOpen ? null : item.label)}
                            className="w-full flex items-center justify-between text-mist hover:text-white transition-colors py-2"
                            aria-expanded={isOpen}
                        >
                            {item.label}
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {isOpen && (
                            <div className="flex flex-col gap-1 pl-4 pb-2">
                                {item.subItems.map((sub) => (
                                    <Link
                                        key={sub.href}
                                        href={sub.href}
                                        onClick={(e) => handleLinkClick(e, sub.href)}
                                        className="text-sm text-mist/80 hover:text-white transition-colors py-1.5"
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}