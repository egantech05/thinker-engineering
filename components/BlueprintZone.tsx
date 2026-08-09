"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SpecialistSection from "@/components/sections/SpecialistSection";
import OperationsSection from "@/components/sections/OperationsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import InsightsSection from "@/components/sections/InsightsSection";
import LocationSection from "@/components/sections/LocationSection";
import ContactSection from "@/components/sections/ContactSection";
type Cert = { name: string; src: string };

export default function BlueprintZone({
    scrollRef,
    certifications,
}: {
    scrollRef: React.RefObject<HTMLElement | null>;
    certifications: Cert[];
}) {
    const leadRef = useRef<HTMLDivElement>(null);
    const pauseRef = useRef<HTMLDivElement>(null);
    const bufferRef = useRef<HTMLDivElement>(null);

    const [pauseFraction, setPauseFraction] = useState(0.5);

    useEffect(() => {
        const measure = () => {
            const leadHeight = leadRef.current?.offsetHeight ?? 0;
            const pauseHeight = pauseRef.current?.offsetHeight ?? 0;
            if (leadHeight > 0) {
                setPauseFraction(pauseHeight / leadHeight);
            }
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (leadRef.current) ro.observe(leadRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    const { scrollYProgress: leadProgress } = useScroll({
        target: leadRef,
        container: scrollRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(leadProgress, [0, pauseFraction, 1], ["0%", "0%", "-50%"]);

    // Drives Location's slide-up reveal. Location's own sticky scope is
    // limited to the inner 200vh wrapper below (so it un-pins right as
    // Contact begins) — the shared gradient background's sticky scope is
    // the full outer "lc" zone (Location + Contact), so it never resets.
    const { scrollYProgress: bufferProgress } = useScroll({
        target: bufferRef,
        container: scrollRef,
        offset: ["start end", "start start"],
    });
    const locationY = useTransform(bufferProgress, [0, 1], ["100%", "0%"]);

    return (
        <div
            className="relative grid"
            style={{ gridTemplateAreas: '"stack"', gridTemplateColumns: "minmax(0, 1fr)" }}
        >
            <div
                className="sticky top-0 h-screen overflow-hidden"
                style={{ gridArea: "stack" }}
            >
                <motion.div style={{ y }} className="absolute right-0 top-0 w-full md:w-[65%] h-[200vh]">
                    <Image
                        src="/images/blueprint-bg.png"
                        alt=""
                        fill
                        className="object-cover object-right opacity-50"
                        aria-hidden
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
            </div>

            <div className="flex flex-col min-w-0" style={{ gridArea: "stack" }}>
                <div ref={leadRef} className="flex flex-col">
                    <div ref={pauseRef}>
                        <SpecialistSection />
                    </div>
                    <OperationsSection certifications={certifications} />
                </div>
                <SolutionsSection />

                <div id="projects-wrapper" className="relative h-[200vh]">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ProjectsSection />
                    </div>
                </div>

                <InsightsSection />

                {/* Location + Contact zone — ONE shared sticky gradient spans
                    both, so the background never resets/seams between them. */}
                <div
                    className="relative grid"
                    style={{ gridTemplateAreas: '"lc"', gridTemplateColumns: "minmax(0, 1fr)" }}
                >
                    <div
                        className="sticky top-0 h-screen bg-gradient-to-b from-black from-10% to-blue-dark/50"
                        style={{ gridArea: "lc" }}
                        aria-hidden
                    />

                    <div style={{ gridArea: "lc" }}>
                        {/* Location — reveal + dwell, scoped to this 200vh box
                            only, so it un-pins right as Contact begins. */}
                        <div
                            className="relative grid"
                            style={{ gridTemplateAreas: '"loc"', gridTemplateColumns: "minmax(0, 1fr)" }}
                        >
                            <div ref={bufferRef} style={{ gridArea: "loc" }} className="h-screen" aria-hidden />
                            <motion.div
                                id="location-buffer"
                                style={{ y: locationY, gridArea: "loc" }}
                                className="sticky top-0 h-screen z-10 overflow-hidden"
                            >
                                <LocationSection />
                            </motion.div>
                        </div>

                        {/* Contact — normal document-flow scroll over the
                            still-pinned shared gradient. */}
                        <div id="contact-buffer">
                            <ContactSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}