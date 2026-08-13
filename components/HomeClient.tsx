"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import SpecialistSection from "@/components/sections/SpecialistSection";
import OperationsSection from "@/components/sections/OperationsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import InsightsSection from "@/components/sections/InsightsSection";
import LocationSection from "@/components/sections/LocationSection";
import ContactSection from "@/components/sections/ContactSection";

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
                {mounted && (
                    <>
                        <HeroSection partners={partners} scrollRef={scrollRef} />
                        <SpecialistSection />
                        <OperationsSection certifications={certifications} />
                        <SolutionsSection />
                        <ProjectsSection />
                        <InsightsSection />
                        <LocationSection />
                        <ContactSection />
                    </>
                )}
            </main>
        </>
    );
}