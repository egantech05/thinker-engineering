"use client";

import { useEffect, useRef, useState } from "react";
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <Header scrollRef={scrollRef} />
            <main ref={scrollRef} className="scroll-container">
                <HeroSection partners={partners} scrollRef={scrollRef} />
                {mounted && (
                    <BlueprintZone scrollRef={scrollRef} certifications={certifications} />
                )}
            </main>
        </>
    );
}