"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/sections/HeroSection";
import SpecialistSection from "@/components/home/sections/SpecialistSection";
import OperationsSection from "@/components/home/sections/OperationsSection";
import ServicesSection from "@/components/home/sections/ServicesSection";
import ExperienceSection from "@/components/home/sections/ExperienceSection";
import InsightsSection from "@/components/home/sections/InsightsSection";
import LocationSection from "@/components/home/sections/LocationSection";
import ContactSection from "@/components/home/sections/ContactSection";
import PartnershipSection from "@/components/home/sections/PartnershipSection";

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