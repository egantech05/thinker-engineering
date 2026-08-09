"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLoadingComplete } from "@/components/LoadingScreen";
import { stats } from "@/lib/data";
import Counter from "@/components/Counter";

type Partner = { name: string; src: string };

export default function HeroSection({
    partners,
    scrollRef,
}: {
    partners: Partner[];
    scrollRef: React.RefObject<HTMLElement | null>;
}) {
    const heroRef = useRef<HTMLElement>(null);
    const loaded = useLoadingComplete();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        container: scrollRef,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, 500]);

    return (
        <section ref={heroRef} className="snap-section relative h-[160vh] bg-ink">
            {/* Single sticky wrapper — pins in place while the taller section scrolls past */}
            <div className="sticky top-0 h-screen flex flex-col justify-between px-4 md:px-8 pt-24 pb-8">
                <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden">
                    <Image
                        src="/images/hero-ceiling.png"
                        alt="Data center ceiling infrastructure"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue via-blue-dark to-blue-dark mix-blend-color opacity-40" />

                    {/* Text overlay — absolutely positioned on top of the image, moves down independently via scroll */}
                    <motion.div
                        style={{ y: textY }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    >
                        <motion.h1
                            initial="hidden"
                            animate={loaded ? "visible" : "hidden"}
                            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                            className="max-w-4xl text-4xl md:text-6xl font-medium leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                        >
                            <motion.span
                                className="block"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                                }}
                            >
                                Transforming Digitalization
                            </motion.span>
                            <motion.span
                                className="block"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                                }}
                            >
                                Into Resilient Infrastructure
                            </motion.span>
                        </motion.h1>
                        <motion.div
                            className="flex gap-10 md:gap-20 mt-14"
                            initial={{ opacity: 0, y: 16 }}
                            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                        >
                            {stats.map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className="text-2xl md:text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                        <Counter value={s.value} />
                                    </div>
                                    <div className="text-gold text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Trusted partnership — stays part of the pinned background */}
                <div className="pt-8">
                    <div style={{ maxWidth: "896px", width: "100%", margin: "0 auto" }}>
                        <p className="text-sm font-semibold mb-4">Trusted Partnership</p>
                    </div>
                    {partners.length > 0 && (
                        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                            <div className="flex w-max animate-marquee">
                                {Array.from({ length: 6 }).flatMap((_, setIndex) =>
                                    partners.map((p, i) => (
                                        <div
                                            key={`${p.name}-${setIndex}-${i}`}
                                            className="flex items-center shrink-0 px-8 md:px-12"
                                        >
                                            <Image
                                                src={p.src}
                                                alt={p.name}
                                                width={100}
                                                height={40}
                                                loading="eager"
                                                className="h-6 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}