"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Leader } from "@/lib/leaders";
import type { NavItem } from "@/lib/nav";

function LeaderDetailSection({ leader, zIndex }: { leader: Leader; zIndex: number }) {
    return (
        <section
            id={`leader-${leader.key}`}
            style={{ zIndex }}
            className="sticky top-0 h-screen flex items-center px-6 md:px-16 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        >
            <div className="max-w-6xl mx-auto w-full relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-xs mb-10 md:mb-0 md:absolute md:top-0 md:right-0"
                >
                    <Quote size={28} className="rotate-180 text-gold mb-2" />
                    <p className="text-lg leading-snug text-white/90">{leader.quote}</p>
                    <Quote size={28} className="text-gold mt-2 ml-auto" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative h-[420px] md:h-[560px] w-full max-w-md mx-auto"
                >
                    <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-contain object-bottom"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="relative z-10 -mt-12 md:-mt-16"
                >
                    <p className="text-sm text-mist">{leader.title}</p>
                    <p className="text-3xl md:text-5xl font-semibold uppercase">{leader.name}</p>
                </motion.div>
            </div>
        </section>
    );
}

export default function LeadershipClient({ leaders, navItems }: { leaders: Leader[]; navItems: NavItem[] }) {
    const scrollToLeader = (key: string) => {
        document.getElementById(`leader-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <Header navItems={navItems} />
            <main>
                <section
                    id="leadership-top"
                    style={{ zIndex: 0 }}
                    className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-16 pt-32 pb-20 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
                >
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-4xl md:text-5xl font-medium mb-16"
                        >
                            Minds Behind
                            <br />
                            Thinker Engineering
                        </motion.h1>

                        <div className="flex items-end justify-center">
                            {leaders.map((leader, i) => (
                                <motion.div
                                    key={leader.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 1, delay: i * 0.25, ease: "easeOut" }}
                                    className={`flex flex-col items-center ${i === 0 ? "-mr-16 md:-mr-24" : ""
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => scrollToLeader(leader.key)}
                                        aria-label={`View ${leader.name}`}
                                        className={`relative h-[300px] w-[240px] md:h-[440px] md:w-[340px] cursor-pointer transition-transform hover:scale-[1.03] ${i === 0 ? "z-10" : "z-0"
                                            }`}
                                    >
                                        <Image
                                            src={leader.image}
                                            alt={leader.name}
                                            fill
                                            className="object-contain object-bottom"
                                        />
                                    </button>
                                    <div className="mt-4 text-center">
                                        <p className="text-lg md:text-xl font-semibold uppercase">{leader.name}</p>
                                        <p className="text-sm text-mist">{leader.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {leaders.map((leader, i) => (
                    <LeaderDetailSection key={leader.key} leader={leader} zIndex={i + 1} />
                ))}
            </main>
            <Footer />
        </>
    );
}