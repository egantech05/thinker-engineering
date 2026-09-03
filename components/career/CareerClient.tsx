"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, ChevronDown, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { jobs } from "@/lib/jobs";
import ApplicationForm from "@/components/career/ApplicationForm";
import type { NavItem } from "@/lib/nav";

export default function CareerClient({ navItems }: { navItems: NavItem[] }) {
    const [openJob, setOpenJob] = useState<string | null>(null);
    const [position, setPosition] = useState("");

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleApply = (title: string) => {
        setPosition(title);
        scrollTo("apply");
    };

    return (
        <>
            <Header navItems={navItems} />
            <main>
                {/* ---------------- Hero ---------------- */}
                <section className="px-6 md:px-16 pt-32 md:pt-44 pb-20 md:pb-28">
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5"
                        >
                            Careers
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-medium leading-tight max-w-3xl"
                        >
                            Build the infrastructure
                            <br />
                            behind everything digital
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
                            className="mt-8 max-w-xl text-mist leading-relaxed"
                        >
                            We design, audit and maintain the mission-critical facilities our clients
                            depend on. If you care about work that has to stay up no matter what, we
                            would like to hear from you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            className="mt-10 flex flex-wrap items-center gap-4"
                        >
                            <button
                                type="button"
                                onClick={() => scrollTo("openings")}
                                className="bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full px-6 py-3 transition-colors"
                            >
                                View open roles
                            </button>
                            <button
                                type="button"
                                onClick={() => handleApply("")}
                                className="text-sm text-mist hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
                            >
                                Or submit your CV
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* ---------------- Open positions ---------------- */}
                <section id="openings" className="px-6 md:px-16 pb-24 md:pb-32 scroll-mt-28">
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-end justify-between gap-6 mb-10 pb-5 border-b border-white/10"
                        >
                            <h2 className="text-3xl md:text-4xl font-medium">Open Positions</h2>
                            <p className="text-sm text-mist shrink-0">
                                {jobs.length} {jobs.length === 1 ? "role" : "roles"}
                            </p>
                        </motion.div>

                        <div className="flex flex-col gap-4">
                            {jobs.map((job, i) => {
                                const isOpen = openJob === job.key;

                                return (
                                    <motion.div
                                        key={job.key}
                                        id={`job-${job.key}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                                        className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden scroll-mt-28"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenJob(isOpen ? null : job.key)}
                                            aria-expanded={isOpen}
                                            aria-controls={`job-panel-${job.key}`}
                                            className="w-full text-left px-6 md:px-8 py-6 flex items-start justify-between gap-6 hover:bg-white/[0.03] transition-colors cursor-pointer"
                                        >
                                            <div className="min-w-0">
                                                <h3 className="text-xl md:text-2xl font-semibold">{job.title}</h3>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Building2 size={14} className="shrink-0" />
                                                        {job.department}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MapPin size={14} className="shrink-0" />
                                                        {job.location}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Briefcase size={14} className="shrink-0" />
                                                        {job.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronDown
                                                size={20}
                                                className={`shrink-0 mt-1 text-mist transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div
                                                id={`job-panel-${job.key}`}
                                                className="px-6 md:px-8 pb-8 border-t border-white/10 pt-6"
                                            >
                                                <p className="text-mist leading-relaxed max-w-3xl">
                                                    {job.summary}
                                                </p>

                                                <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-12">
                                                    <div>
                                                        <p className="text-xs font-semibold tracking-wider text-mist uppercase mb-4">
                                                            What you&apos;ll do
                                                        </p>
                                                        <ul className="space-y-3">
                                                            {job.responsibilities.map((item) => (
                                                                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                                                                    <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs font-semibold tracking-wider text-mist uppercase mb-4">
                                                            What you&apos;ll bring
                                                        </p>
                                                        <ul className="space-y-3">
                                                            {job.requirements.map((item) => (
                                                                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                                                                    <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleApply(job.title)}
                                                    className="mt-8 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full px-6 py-2.5 transition-colors"
                                                >
                                                    Apply for this role
                                                </button>
                                            </div>
                                        )}

                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                <ApplicationForm position={position} onPositionChange={setPosition} />

            </main>
            <Footer />
        </>
    );
}
