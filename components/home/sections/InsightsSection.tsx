"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { insights, formatInsightDate, type Insight } from "@/lib/insights";



function InsightCard({
    item,
    index,
    hasAppeared,
}: {
    item: Insight;
    index: number;
    hasAppeared: boolean;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!hasAppeared) return;
        const timer = setTimeout(() => setVisible(true), (0.7 + index * 0.15) * 1000);
        return () => clearTimeout(timer);
    }, [hasAppeared, index]);

    return (
        <div className="shrink-0 w-64 md:w-80 snap-start">
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 30, damping: 30 }}
            >
                <Link href={`/insights/${item.slug}`} className="block group">

                    <motion.div
                        whileHover={{ scale: 1.03, y: -6 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg shadow-black/0 transition-shadow duration-300 hover:shadow-black/50"
                    >
                        {item.image && (
                            <motion.div
                                className="absolute inset-0"
                                whileHover={{ scale: 1.12 }}
                                transition={{ duration: 0.1, ease: "easeOut" }}
                            >
                                <Image src={item.image} alt="" fill className="object-cover" />
                            </motion.div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                        <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wide bg-gold text-ink font-semibold px-2.5 py-1 rounded-full">
                            {item.category}
                        </span>
                    </motion.div>

                    <div className="mt-4">
                        <p className="text-xs text-mist">{formatInsightDate(item.date)}</p>

                        <h3 className="text-base font-medium text-white mt-1 leading-snug group-hover:text-gold transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-xs text-mist mt-2 line-clamp-2">{item.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-gold mt-3">
                            Read more <ArrowUpRight size={13} />
                        </span>
                    </div>
                </Link>
            </motion.div>

        </div>
    );
}

export default function InsightsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef(null);
    const hasAppeared = useInView(sectionRef, { once: true, amount: 0.2 });

    const scrollByAmount = (dir: 1 | -1) => {
        const el = scrollRef.current;
        if (!el) return;
        const first = el.children[0] as HTMLElement | undefined;
        const second = el.children[1] as HTMLElement | undefined;
        const step = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    return (
        <section ref={sectionRef} id="insights" className="snap-section flex items-center bg-ink/60 md:bg-transparent px-6 md:px-16 py-24">
            <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-medium text-white mb-14 text-center"
                >
                    Insights
                </motion.h2>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                    >
                        {insights.map((item, i) => (
                            <InsightCard
                                key={item.slug}
                                item={item}
                                index={i}
                                hasAppeared={hasAppeared}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => scrollByAmount(-1)}
                        aria-label="Previous insights"
                        className="absolute left-0 md:-left-4 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center md:backdrop-blur-sm"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scrollByAmount(1)}
                        aria-label="Next insights"
                        className="absolute right-0 md:-right-4 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center md:backdrop-blur-sm"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}