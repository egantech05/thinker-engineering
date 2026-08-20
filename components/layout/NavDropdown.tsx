"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/nav";

export default function NavDropdown({
    item,
    isActive,
    onEnter,
    onLeave,
    onAnchorClick,
}: {
    item: NavItem;
    isActive: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onAnchorClick: (id: string) => void;
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

    if (!item.subItems || item.subItems.length === 0) {
        return (
            <Link
                href={item.href ?? "#"}
                onClick={(e) => handleLinkClick(e, item.href ?? "")}
                className="hover:text-white transition-colors"
            >
                {item.label}
            </Link>
        );
    }

    return (
        <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button
                type="button"
                className="flex items-center gap-1 hover:text-white transition-colors"
                aria-expanded={isActive}
            >
                {item.label}
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                />
            </button>
        </div>
    );
}