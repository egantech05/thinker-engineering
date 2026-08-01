"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SpecialistSection from "@/components/sections/SpecialistSection";
import OperationsSection from "@/components/sections/OperationsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
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
    // Whole parallax range: Specialist + Operations + Solutions, driven by
    // a single scroll value so the pause-then-move motion is one
    // continuous curve (no handoff between separate scroll listeners).
    const leadRef = useRef<HTMLDivElement>(null);
    // Just Specialist — measured (not estimated) to find exactly where the
    // pause ends and the move begins (i.e. right as Operations starts).
    const pauseRef = useRef<HTMLDivElement>(null);
    const bufferRef = useRef<HTMLDivElement>(null);
    // Drives Contact's slide-up reveal over the now-frozen Location.
    const bufferRef2 = useRef<HTMLDivElement>(null);

    // Fraction of leadRef's total scroll distance covered by the pause.
    // Measured live so it stays accurate across breakpoints/content changes.
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
    // Static through Specialist (pauseFraction), then one continuous
    // parallax move across all of Operations, freezing once it ends —
    // fully settled at -50% before Solutions is even reached.
    const y = useTransform(leadProgress, [0, pauseFraction, 1], ["0%", "0%", "-50%"]);

    const { scrollYProgress: bufferProgress } = useScroll({
        target: bufferRef,
        container: scrollRef,
        offset: ["start end", "start start"],
    });
    const locationY = useTransform(bufferProgress, [0, 1], ["100%", "0%"]);

    const { scrollYProgress: bufferProgress2 } = useScroll({
        target: bufferRef2,
        container: scrollRef,
        offset: ["start end", "start start"],
    });
    const contactY = useTransform(bufferProgress2, [0, 1], ["100%", "0%"]);

    return (
        <div className="flex flex-col">
            <SpecialistSection />
            <OperationsSection certifications={certifications} />
            <SolutionsSection />
            <ProjectsSection />
            <LocationSection />
            <ContactSection />
        </div>
    );
}