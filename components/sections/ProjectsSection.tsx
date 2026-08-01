"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function ProjectCard({
    project: p,
    index,
    hasAppeared,
}: {
    project: Project;
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
        <div className="shrink-0 w-40 md:w-56 snap-start">
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 30, damping: 30 }}
                whileHover={{ scale: 1.06, y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="cursor-default"
            >
                <div className="font-bold mb-3 text-center">{p.year}</div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg shadow-black/0 transition-shadow duration-300 hover:shadow-black/50">
                    {p.background && (
                        <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.12 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Image
                                src={p.background}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(160deg, ${p.color}99, #050505e6)`,
                        }}
                    />
                    {p.logo && (
                        <div className="absolute inset-0 flex items-center justify-center p-10">
                            <div className="relative w-1/2 h-1/2">
                                <Image
                                    src={p.logo}
                                    alt={p.partner}
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-xs text-mist mt-3">
                    {p.description}
                </p>
            </motion.div>
        </div>
    );
}

export default function ProjectsSection() {
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
        <section ref={sectionRef} id="projects" className="snap-section flex items-center bg-ink/60 md:bg-transparent px-6 md:px-16 py-24">
            <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-medium text-white mb-14 text-center"
                >
                    Projects
                </motion.h2>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                    >
                        {projects.map((p, i) => (
                            <ProjectCard
                                key={`${p.year}-${p.partner}-${i}`}
                                project={p}
                                index={i}
                                hasAppeared={hasAppeared}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => scrollByAmount(-1)}
                        aria-label="Previous projects"
                        className="absolute left-0 md:-left-4 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center md:backdrop-blur-sm"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scrollByAmount(1)}
                        aria-label="Next projects"
                        className="absolute right-0 md:-right-4 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center md:backdrop-blur-sm"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}