"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { caseStudies, type ExperienceCaseStudy } from "@/lib/experiences";

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-medium mb-6"
        >
            {children}
        </motion.h2>
    );
}

function Paragraphs({ items }: { items: string[] }) {
    return (
        <div className="space-y-5">
            {items.map((text, i) => (
                <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                    className="text-base md:text-lg leading-relaxed text-white/80"
                >
                    {text}
                </motion.p>
            ))}
        </div>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3.5">
            {items.map((item, i) => (
                <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.05, ease: "easeOut" }}
                    className="flex gap-4 text-base leading-relaxed text-white/80"
                >
                    <span className="mt-2.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                    <span>{item}</span>
                </motion.li>
            ))}
        </ul>
    );
}

export default function ExperienceArticle({ study }: { study: ExperienceCaseStudy }) {
    const others = caseStudies.filter((s) => s.key !== study.key).slice(0, 3);

    return (
        <>
            <Header />
            <main className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
                <article>
                    {/* ---------------- Article head ---------------- */}
                    <header className="px-6 md:px-16 pt-32 md:pt-44 pb-12 md:pb-16">
                        <div className="max-w-3xl mx-auto w-full">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6"
                            >
                                {study.sector}
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                                className="text-3xl md:text-5xl font-medium leading-tight mb-10"
                            >
                                {study.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                                className="grid sm:grid-cols-2 gap-6 sm:gap-10 border-t border-white/10 pt-6"
                            >
                                <div>
                                    <p className="text-xs font-semibold tracking-wider uppercase text-mist mb-2">
                                        Project
                                    </p>
                                    <p className="text-sm text-white/90 leading-relaxed">
                                        {study.projectType}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold tracking-wider uppercase text-mist mb-2">
                                        Client
                                    </p>
                                    <p className="text-sm text-white/90 leading-relaxed">
                                        {study.client}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </header>

                    {/* ---------------- Featured image ---------------- */}
                    <div className="px-6 md:px-16 mb-14 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="max-w-5xl mx-auto relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src={study.image}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 1024px"
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* ---------------- Body ---------------- */}
                    <div className="px-6 md:px-16 pb-20 md:pb-28">
                        <div className="max-w-3xl mx-auto w-full space-y-14 md:space-y-20">
                            <section>
                                <SectionHeading>Project Requirement</SectionHeading>
                                <Paragraphs items={study.requirement} />
                            </section>

                            <section>
                                <SectionHeading>Our Scope</SectionHeading>
                                <BulletList items={study.scope} />
                            </section>

                            <section>
                                <SectionHeading>Key Challenge</SectionHeading>
                                <Paragraphs items={study.challenge} />
                            </section>

                            <section>
                                <SectionHeading>Our Approach</SectionHeading>
                                <Paragraphs items={study.approach} />
                            </section>

                            <section>
                                <SectionHeading>Outcome</SectionHeading>

                                {study.outcomeStats && (
                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {study.outcomeStats.map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                                                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                            >
                                                <p className="text-3xl md:text-4xl font-bold text-gold mb-2 tracking-tight">
                                                    {stat.value}
                                                </p>
                                                <p className="text-sm text-mist leading-relaxed">
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                <BulletList items={study.outcomes} />
                            </section>

                            <motion.aside
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
                            >
                                <p className="text-xs font-semibold tracking-wider uppercase text-mist mb-3">
                                    Confidentiality Note
                                </p>
                                <p className="text-sm text-mist leading-relaxed">
                                    {study.confidentiality}
                                </p>
                            </motion.aside>
                        </div>
                    </div>
                </article>

                {/* ---------------- More projects ---------------- */}
                <section className="px-6 md:px-16 pb-28 md:pb-36">
                    <div className="max-w-5xl mx-auto w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-xs font-semibold tracking-[0.2em] uppercase text-mist mb-6 pb-4 border-b border-white/10"
                        >
                            More Projects
                        </motion.h2>

                        <div className="grid md:grid-cols-3 gap-4">
                            {others.map((other, i) => (
                                <motion.div
                                    key={other.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                                >
                                    <Link
                                        href={`/experience/${other.key}`}
                                        className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-gold/40 hover:bg-white/[0.07] transition-colors"
                                    >
                                        <span className="text-xs font-semibold tracking-wider uppercase text-gold mb-3">
                                            {other.sector}
                                        </span>
                                        <span className="text-base font-medium leading-snug flex-1">
                                            {other.title}
                                        </span>
                                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all duration-300">
                                            Read
                                            <ArrowUpRight size={16} />
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
