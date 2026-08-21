"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import NavDropdown from "@/components/layout/NavDropdown";
import { navItems } from "@/lib/nav";
import MobileNavAccordion from "@/components/layout/MobileNavAccordion";
import NavMegaPanel from "@/components/layout/NavMegaPanel";
import Link from "next/link";

export default function Header({
    scrollRef,
}: {
    scrollRef?: React.RefObject<HTMLElement | null>;
}) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleDropdownEnter = (label: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveDropdown(label);
    };
    const handleDropdownLeave = () => {
        closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
    };
    const handlePanelEnter = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    };

    useEffect(() => {
        const el = scrollRef?.current;
        if (el) {
            const onScroll = () => setScrolled(el.scrollTop > 40);
            el.addEventListener("scroll", onScroll, { passive: true });
            return () => el.removeEventListener("scroll", onScroll);
        }
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollRef]);

    const scrollToBuffer = (id: string) => {
        const buffer = document.getElementById(id);
        if (!buffer) return;
        const container = scrollRef?.current;
        if (container) {
            const target =
                buffer.getBoundingClientRect().top -
                container.getBoundingClientRect().top +
                container.scrollTop;
            container.scrollTo({ top: target, behavior: "smooth" });
        } else {
            buffer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                <div
                    className={`relative w-full flex items-center justify-between transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
${scrolled
                            ? "max-w-6xl mt-3 mx-4 md:mx-6 px-5 md:px-8 py-3 rounded-2xl bg-ink/35 backdrop-blur-lg border border-white/10 shadow-lg shadow-black/20"
                            : "max-w-[1800px] mt-0 mx-0 px-6 md:px-10 py-4 bg-transparent"
                        }`}
                >
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (scrollRef?.current) {
                                e.preventDefault();
                                scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        className="flex items-center gap-3 h-8"
                        aria-label="Go to homepage"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={scrolled ? "icon" : "full"}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 16 }}
                                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            >
                                <Logo variant={scrolled ? "icon" : "full"} className="h-7 md:h-8 w-auto" />
                            </motion.div>
                        </AnimatePresence>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm text-mist">
                        {navItems.map((item) => (
                            <NavDropdown
                                key={item.label}
                                item={item}
                                isActive={activeDropdown === item.label}
                                onEnter={() => handleDropdownEnter(item.label)}
                                onLeave={handleDropdownLeave}
                                onAnchorClick={scrollToBuffer}
                            />
                        ))}
                    </nav>

                    <NavMegaPanel
                        item={navItems.find((i) => i.label === activeDropdown) ?? null}
                        onAnchorClick={scrollToBuffer}
                        onEnter={handlePanelEnter}
                        onLeave={handleDropdownLeave}
                    />


                    <div className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "gap-2" : "gap-3"}`}>
                        <a
                            href="https://www.linkedin.com/company/thinker-engineering"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className={`hidden sm:flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                            ${scrolled ? "h-7 w-7" : "h-8 w-8"}`}
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
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToBuffer("contact-buffer");
                            }}
                            className={`hidden sm:inline-block bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${scrolled ? "px-3.5 py-1.5" : "px-5 py-2"}`}
                        >
                            Contact Us
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="md:hidden p-2"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </header>

            {mobileOpen && (
                <div className="md:hidden fixed top-[64px] left-0 right-0 z-40 bg-ink/95 backdrop-blur-md border-b border-white/10 px-6 py-6 flex flex-col gap-4">
                    <MobileNavAccordion
                        items={navItems}
                        onAnchorClick={scrollToBuffer}
                        onNavigate={() => setMobileOpen(false)}
                    />

                    <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToBuffer("contact");
                                setMobileOpen(false);
                            }}
                            className="text-mist hover:text-white transition-colors"
                        >
                            Contact Us
                        </a>
                        <a

                            href="https://www.linkedin.com/company/thinker-engineering"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-mist hover:text-white transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div >
            )
            }
        </>
    );
}