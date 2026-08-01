"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import BlueprintZone from "@/components/BlueprintZone";

type Partner = { name: string; src: string };

export default function HomeClient({
    partners,
    certifications,
}: {
    partners: Partner[];
    certifications: Partner[];
}) {
    const scrollRef = useRef<HTMLElement>(null);

    return (
        <>
            <Header scrollRef={scrollRef} />
            <main ref={scrollRef} className="scroll-container overflow-x-hidden">
                <HeroSection partners={partners} scrollRef={scrollRef} />
                <BlueprintZone scrollRef={scrollRef} certifications={certifications} />
            </main>
        </>
    );
}