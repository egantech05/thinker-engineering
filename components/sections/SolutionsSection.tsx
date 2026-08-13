"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
    Zap, Droplets, Camera, Share2, Monitor, FlameKindling, Server,
    ChevronLeft, ChevronRight,
} from "lucide-react";
import { services } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
    Zap, Droplets, Camera, Share2, Monitor, FlameKindling, Server,
};


const N = services.length;

const wrap = (i: number) => ((i % N) + N) % N;

const shortestDiff = (from: number, to: number) => {
    let diff = (to - from) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    return diff;
};

const RADIUS = Math.floor((N - 1) / 2);
const BASE_SPACING = 160;
const SPACING_DECAY = 0.9;

const offsetForDistance = (distance: number) => {
    const dir = Math.sign(distance);
    const steps = Math.abs(distance);
    let x = 0;
    let step = BASE_SPACING;
    for (let i = 0; i < steps; i++) {
        x += step;
        step *= SPACING_DECAY;
    }
    return dir * x;
};

export default function SolutionsSection() {
    const sectionRef = useRef(null);
    const hasAppeared = useInView(sectionRef, { once: true, amount: 0.3 });

    const [active, setActive] = useState(() =>
        services.findIndex((s) => s.key === "complete")
    );
    const current = services[wrap(active)];

    const go = (dir: 1 | -1) => setActive((a) => a + dir);
    const jumpTo = (targetIndex: number) =>
        setActive((a) => a + shortestDiff(wrap(a), targetIndex));

    const slots = Array.from(
        { length: RADIUS * 2 + 1 },
        (_, idx) => active - RADIUS + idx
    );

    return (
        <section id="solutions" ref={sectionRef} className="snap-section flex flex-col items-center justify-center bg-ink/60 md:bg-transparent px-6 md:px-16 py-24">
            <AnimatePresence mode="wait">
                <motion.h2
                    key={current.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl md:text-5xl font-medium mb-10 text-center"
                >
                    {current.headline ?? current.title}
                </motion.h2>
            </AnimatePresence>

            <div className="relative w-full flex justify-center items-start h-[520px] md:h-[680px] overflow-hidden pt-2 md:pt-4">
                <button
                    onClick={() => go(-1)}
                    aria-label="Previous service"
                    className="absolute inset-y-0 left-0 w-1/2 z-20 cursor-pointer"
                />
                <button
                    onClick={() => go(1)}
                    aria-label="Next service"
                    className="absolute inset-y-0 right-0 w-1/2 z-20 cursor-pointer"
                />

                {slots.map((pos, slotIndex) => {
                    const service = services[wrap(pos)];
                    const Icon = icons[service.icon];
                    const distance = pos - active;
                    const isActive = distance === 0;
                    const absDist = Math.abs(distance);

                    const restingState = {
                        x: offsetForDistance(distance),
                        scale: isActive ? 1 : Math.max(0.4, 1 - absDist * 0.05),
                        opacity: 1,
                        zIndex: 10 - absDist,
                    };

                    return (
                        <motion.div
                            key={pos}
                            initial={{ x: offsetForDistance(distance), scale: 0.7, opacity: 0 }}
                            animate={hasAppeared ? restingState : { x: offsetForDistance(distance), scale: 0.7, opacity: 0 }}
                            exit={{ x: offsetForDistance(distance), opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute flex flex-col items-center"
                        >
                            <div
                                className={`relative w-[260px] md:w-[380px] h-[360px] md:h-[460px] rounded-2xl overflow-hidden transition-shadow duration-500 ${isActive
                                    ? "shadow-[0_0_16px_3px_rgba(234,179,8,0.45)]"
                                    : "shadow-2xl"
                                    }`}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    sizes="380px"
                                    className="object-cover"
                                    priority={isActive}
                                />

                                <div className="absolute inset-0 bg-[#eab308]/50 mix-blend-color" />

                                {isActive ? (
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                                ) : (
                                    <div className="absolute inset-0 bg-ink/70" />
                                )}

                                {isActive && (
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        {service.description && (
                                            <p className="text-white text-base md:text-lg mb-3">
                                                {service.description}
                                            </p>
                                        )}
                                        {service.bullets && (
                                            <ul className="space-y-1 text-sm text-mist">
                                                {service.bullets.map((b) => (
                                                    <li key={b}>{b}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}


                                {isActive && (
                                    <>
                                        <button
                                            onClick={() => go(-1)}
                                            aria-label="Previous service"
                                            className="absolute inset-y-0 left-0 w-1/2 z-10 cursor-pointer"
                                        />
                                        <button
                                            onClick={() => go(1)}
                                            aria-label="Next service"
                                            className="absolute inset-y-0 right-0 w-1/2 z-10 cursor-pointer"
                                        />
                                    </>
                                )}
                            </div>

                            <button
                                onClick={() => jumpTo(wrap(pos))}
                                className={`mt-16 flex flex-col items-center gap-2 text-xs transition-colors
                                ${isActive ? "text-[#eab308]" : "text-mist hover:text-white"}`}
                            >

                                <Icon size={22} />
                                <span className="max-w-[6rem] text-center">{service.title}</span>
                            </button>
                        </motion.div>
                    );
                })}

                <div className="absolute right-4 md:right-12 bottom-0 md:bottom-2 z-20 flex items-center gap-2">
                    <button
                        onClick={() => go(-1)}
                        aria-label="Previous service"
                        className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center md:backdrop-blur-sm"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => go(1)}
                        aria-label="Next service"
                        className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center md:backdrop-blur-sm"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}