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
import type { Insight } from "@/lib/insights";
import type { Experience } from "@/lib/experiences";
import type { NavItem } from "@/lib/nav";

type Partner = { name: string; src: string };

export default function HomeClient({
    navItems,
    partners,
    certifications,
    partnership,
    insights,
    experiences,
}: {
    navItems: NavItem[];
    partners: Partner[];
    certifications: Partner[];
    partnership: Partner[];
    insights: Insight[];
    experiences: Experience[];
}) {
    const scrollRef = useRef<HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const id = window.location.hash.slice(1);
        if (!id) return;

        const timer = setTimeout(() => {
            const target = document.getElementById(id);
            const container = scrollRef.current;
            if (!target || !container) return;

            const top =
                target.getBoundingClientRect().top -
                container.getBoundingClientRect().top +
                container.scrollTop;

            container.scrollTo({ top, behavior: "smooth" });
        }, 300);

        return () => clearTimeout(timer);
    }, [mounted]);

    return (
        <>
            <Header scrollRef={scrollRef} navItems={navItems} />
            <main ref={scrollRef} className="scroll-container relative">
                {mounted && (
                    <>
                        <HeroSection partners={partners} scrollRef={scrollRef} />
                        <SpecialistSection />
                        <PartnershipSection partnership={partnership} />
                        <OperationsSection certifications={certifications} />
                        <ServicesSection />
                        <ExperienceSection experiences={experiences} />
                        <InsightsSection insights={insights} />
                        <LocationSection />
                        <ContactSection />
                    </>
                )}
            </main>
        </>
    );
}