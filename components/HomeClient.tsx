"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import SpecialistSection from "@/components/sections/SpecialistSection";
import OperationsSection from "@/components/sections/OperationsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import InsightsSection from "@/components/sections/InsightsSection";
import LocationSection from "@/components/sections/LocationSection";
import ContactSection from "@/components/sections/ContactSection";
import PartnershipSection from "@/components/sections/PartnershipSection";

type Partner = { name: string; src: string };

export default function HomeClient({
    partners,
    certifications,
    partnership,
}: {
    partners: Partner[];
    certifications: Partner[];
    partnership: Partner[];
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
                        <PartnershipSection partnership={partnership} />
                        <OperationsSection certifications={certifications} />
                        <ServicesSection />
                        <ExperienceSection />
                        <InsightsSection />
                        <LocationSection />
                        <ContactSection />
                    </>
                )}
            </main>
        </>
    );
}