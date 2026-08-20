import Logo from "@/components/Logo";
import { contact } from "@/lib/data";

const exploreLinks = [
    { label: "Specialist", href: "#specialist" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Insights", href: "#insights" },
    { label: "Location", href: "#location" },
];

export default function Footer() {
    return (
        <footer className="mt-24 -mx-6 md:-mx-16 bg-[#050913] text-white text-sm">
            <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">
                    <div>
                        <Logo className="h-16 w-auto mb-6" />
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.linkedin.com/company/thinker-engineering"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold tracking-wider text-mist uppercase mb-4 pb-2 border-b border-white/10">
                            Get in Touch
                        </p>
                        <ul className="space-y-3">
                            <li>
                                <a href="#contact" className="font-semibold hover:text-gold transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-mist hover:text-white transition-colors"
                                >
                                    {contact.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${contact.phones[0].replace(/\s+/g, "")}`}
                                    className="text-mist hover:text-white transition-colors"
                                >
                                    {contact.phones[0]}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs font-semibold tracking-wider text-mist uppercase mb-4 pb-2 border-b border-white/10">
                            Explore
                        </p>
                        <ul className="space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-mist hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div className="max-w-6xl mx-auto px-6 md:px-16 py-6 text-xs text-mist">
                    © {new Date().getFullYear()} Thinker Engineering. All rights reserved.
                </div>
            </div>
        </footer>
    );
}