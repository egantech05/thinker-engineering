"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { NavItem } from "@/lib/nav";
import type { Experience, ExperienceBlock } from "@/lib/experiences";
import { contact } from "@/lib/data";

function Block({ block }: { block: ExperienceBlock }) {
    switch (block.kind) {
        case "heading":
            return (
                <h2 className="text-2xl md:text-3xl font-medium mt-12 mb-5 first:mt-0">
                    {block.text}
                </h2>
            );
        case "paragraph":
            return (
                <p className="text-base md:text-lg leading-relaxed text-white/80 mb-6">
                    {block.text}
                </p>
            );
        case "list":
            return (
                <ul className="space-y-3 mb-6">
                    {block.items.map((item) => (
                        <li
                            key={item}
                            className="flex gap-4 text-base leading-relaxed text-white/80"
                        >
                            <span className="mt-2.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "quote":
            return (
                <blockquote className="border-l-2 border-gold pl-6 my-10">
                    <p className="text-xl md:text-2xl leading-relaxed text-white/90">
                        {block.text}
                    </p>
                    {block.attribution && (
                        <footer className="text-sm text-mist mt-4">
                            {block.attribution}
                        </footer>
                    )}
                </blockquote>
            );
        case "image":
            return (
                <figure className="my-10">
                    <Image
                        src={block.src}
                        alt={block.alt ?? ""}
                        width={1200}
                        height={675}
                        className="w-full rounded-lg object-cover"
                    />
                    {block.caption && (
                        <figcaption className="text-sm text-mist mt-3">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        default:
            return null;
    }
}

export default function ExperienceArticle({
    study,
    related,
    navItems,
}: {
    study: Experience;
    related: Experience[];
    navItems: NavItem[];
}) {
    const router = useRouter();
    const hasContent = Boolean(study.body && study.body.length > 0);

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <>
            <Header navItems={navItems} />
            <main className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
                <article>
                    {/* ---------------- Article head ---------------- */}
                    <header className="px-6 md:px-16 pt-32 md:pt-44 pb-12 md:pb-16">
                        <div className="max-w-3xl mx-auto w-full">
                            <motion.button
                                type="button"
                                onClick={handleBack}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="group inline-flex items-center gap-2 text-sm text-mist hover:text-white transition-colors mb-8 cursor-pointer"
                            >
                                <ArrowLeft
                                    size={16}
                                    className="transition-transform duration-300 group-hover:-translate-x-1"
                                />
                                Back
                            </motion.button>

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
                                        {study.project_type}
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
                            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={study.image}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-cover scale-[1.02]"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* ---------------- Body ---------------- */}
                    <div className="px-6 md:px-16 pb-20 md:pb-28">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="max-w-3xl mx-auto w-full"
                        >
                            {hasContent ? (
                                study.body.map((block, i) => <Block key={i} block={block} />)
                            ) : (
                                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 md:p-12 text-center">
                                    <p className="text-lg font-medium mb-3">
                                        This case study is being prepared
                                    </p>
                                    <p className="text-sm text-mist max-w-md mx-auto leading-relaxed mb-7">
                                        The full write up is not published yet. If this topic is
                                        relevant to something you are planning, our team is happy
                                        to discuss it directly in the meantime.
                                    </p>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="inline-flex items-center justify-center rounded-full bg-gold hover:bg-gold-light text-ink text-sm font-semibold px-6 py-2.5 transition-colors"
                                    >
                                        Talk to our team
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </article >

                {/* ---------------- More projects ---------------- */}
                {
                    related.length > 0 && (
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
                                    {related.map((other, i) => (
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
                    )
                }
            </main >
            <Footer />
        </>
    );
}