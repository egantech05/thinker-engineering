"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Header({
    scrollRef,
}: {
    scrollRef: React.RefObject<HTMLElement | null>;
}) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => setScrolled(el.scrollTop > 40);
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [scrollRef]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
            px-6 md:px-10 py-4 transition-colors duration-300
            ${scrolled ? "bg-ink/20 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}
        >
            <div className="flex items-center gap-3">
                <Image
                    src="/images/logo-thinker.svg"
                    alt="Thinker Engineering"
                    width={160}
                    height={32}
                    priority
                    className="h-7 md:h-8"
                    style={{ width: "auto" }}
                />
            </div>
            {/*
            <nav className="hidden md:flex items-center gap-8 text-sm text-mist">
                <a href="#specialist" className="hover:text-white transition-colors">Services</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#location" className="hover:text-white transition-colors">Location</a>
            </nav>
            */}

            <div className="flex items-center gap-3">
                <a
                    href="https://www.linkedin.com/company/thinker-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hidden sm:flex h-8 w-8 items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
                    </svg>
                </a>
                <a
                    href="#contact"
                    className="hidden sm:inline-block bg-gold hover:bg-gold-light text-ink font-semibold text-sm px-5 py-2 rounded-full transition-colors"
                >
                    Contact Us
                </a>
                <button className="md:hidden p-2" aria-label="Menu">
                    <Menu size={22} />
                </button>
            </div >
        </header >
    );
}