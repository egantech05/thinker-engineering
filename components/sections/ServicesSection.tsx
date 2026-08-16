"use client";

import { useRef } from "react";
import Link from "next/link";
import type { ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import {
    Building2, Network, Headset, Cloud, ShoppingCart,
    ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/data";


const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
    Building2, Network, Headset, Cloud, ShoppingCart,
};

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
    const Icon = icons[service.icon];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl bg-gradient-to-br from-panel/80 via-panel/40 to-blue-dark/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 flex flex-col justify-between min-h-[280px] transition-colors duration-300 hover:border-gold/40"
        >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_24px_2px_rgba(234,179,8,0.15)] pointer-events-none" />

            <div className="flex items-start">
                <Icon size={22} className="text-gold" />
            </div>

            <div className="mt-8">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {service.acronym}
                </h3>
                <p className="text-sm md:text-base font-medium text-white/90 mb-3">
                    {service.title}
                </p>
                <p className="text-sm text-mist leading-relaxed mb-6">
                    {service.description}
                </p>
            </div>

            <Link
                href={service.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:gap-2 transition-all duration-300 w-fit"
            >
                Discover more
                <ArrowUpRight size={16} />
            </Link>
        </motion.div>
    );
}

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const hasAppeared = useInView(sectionRef, { once: true, amount: 0.2 });

    const [dcec, inc, msp, cds, dcps] = services;

    return (
        <section
            id="services"
            ref={sectionRef}
            className="snap-section flex items-center bg-ink/60 md:bg-transparent px-6 md:px-16 py-24"
        >
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center p-6 md:p-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-3">
                            Infrastructure Solutions Built to Perform
                        </h2>
                        <p className="text-sm text-mist mb-6">
                            Engineering, consultancy, and support across the full data center lifecycle.
                        </p>
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full bg-gold text-ink text-sm font-semibold px-5 py-2.5 w-fit hover:bg-gold/90 transition-colors"
                        >
                            Get Your Free Strategy Call
                        </Link>
                    </motion.div>

                    <ServiceCard service={dcec} index={0} />
                    <ServiceCard service={inc} index={1} />

                    <ServiceCard service={msp} index={2} />
                    <ServiceCard service={cds} index={3} />
                    <ServiceCard service={dcps} index={4} />
                </div>
            </div>
        </section>
    );
}