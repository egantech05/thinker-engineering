"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { serviceDetails, type ServiceDetail } from "@/lib/services";
import { contact } from "@/lib/data";

export default function ServiceClient({ service }: { service: ServiceDetail }) {
    const otherServices = serviceDetails.filter((s) => s.key !== service.key);

    return (
        <>
            <Header />
            <main>
                {/* ---------------- Hero ---------------- */}
                <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden bg-ink">


                    <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />

                    {/* Legibility overlays — bottom fade carries the image into the page background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05030a] via-[#05030a]/75 to-[#05030a]/25" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#05030a]/90 via-[#05030a]/45 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05030a]/85 to-transparent" />

                    <div className="relative z-10 w-full px-6 md:px-16 pt-40 pb-16 md:pb-24">
                        <div className="max-w-6xl mx-auto w-full">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5"
                            >
                                Our Services
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                                className="text-5xl md:text-8xl font-bold tracking-tight mb-4"
                            >
                                {service.acronym}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                                className="text-xl md:text-3xl font-medium text-white mb-5 max-w-3xl"
                            >
                                {service.title}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                                className="text-mist leading-relaxed max-w-2xl"
                            >
                                {service.tagline}
                            </motion.p>
                        </div>
                    </div>
                </section>


                {/* ---------------- Overview ---------------- */}
                <section className="px-6 md:px-16 pt-16 md:pt-24 pb-20 md:pb-28">
                    <div className="max-w-3xl mx-auto w-full">
                        {service.overview.map((paragraph, i) => (

                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                                className="text-lg md:text-xl leading-relaxed text-white/80 mb-6 last:mb-0"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </section>

                {/* ---------------- Capabilities ---------------- */}
                <section className="px-6 md:px-16 pb-20 md:pb-28">
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-3xl md:text-4xl font-medium mb-10 pb-5 border-b border-white/10"
                        >
                            What we deliver
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-5">
                            {service.capabilities.map((capability, i) => (
                                <motion.div
                                    key={capability.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: "easeOut" }}
                                    className="rounded-2xl bg-gradient-to-br from-panel/80 via-panel/40 to-blue-dark/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 transition-colors duration-300 hover:border-gold/40"
                                >
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">
                                        {capability.title}
                                    </h3>
                                    <p className="text-sm text-mist leading-relaxed">
                                        {capability.description}
                                    </p>

                                    {capability.items && (
                                        <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                                            {capability.items.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex gap-3 text-sm text-white/80 leading-relaxed"
                                                >
                                                    <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------- Outcomes ---------------- */}
                <section className="px-6 md:px-16 pb-20 md:pb-28">
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                            {service.outcomes.map((outcome, i) => (
                                <motion.div
                                    key={outcome.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="border-t-2 border-gold/50 pt-5"
                                >
                                    <p className="text-lg font-semibold mb-2">{outcome.label}</p>
                                    <p className="text-sm text-mist leading-relaxed">
                                        {outcome.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------- CTA ---------------- */}
                <section className="px-6 md:px-16 pb-20 md:pb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="max-w-6xl mx-auto w-full rounded-3xl bg-white/10 md:bg-white/5 md:backdrop-blur-sm border border-white/10 p-10 md:p-14 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-medium mb-4">
                            Let&apos;s talk about your {service.acronym} requirements
                        </h2>
                        <p className="text-mist leading-relaxed max-w-xl mx-auto mb-8">
                            Tell us what you are planning and we will advise on scope, approach and
                            what it realistically takes to deliver.
                        </p>

                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-full bg-gold hover:bg-gold-light text-ink text-sm font-semibold px-7 py-3 transition-colors"
                        >
                            Get in touch
                        </Link>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mist">
                            <a
                                href={`mailto:${contact.email}`}
                                className="hover:text-white transition-colors"
                            >
                                {contact.email}
                            </a>
                            <a
                                href={`tel:${contact.phones[0].replace(/\s+/g, "")}`}
                                className="hover:text-white transition-colors"
                            >
                                {contact.phones[0]}
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* ---------------- Other services ---------------- */}
                <section className="px-6 md:px-16 pb-28 md:pb-36">
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="text-xs font-semibold tracking-[0.2em] uppercase text-mist mb-6 pb-4 border-b border-white/10"
                        >
                            Other Services
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {otherServices.map((other, i) => (
                                <motion.div
                                    key={other.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                                >
                                    <Link
                                        href={`/services/${other.key}`}
                                        className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-gold/40 hover:bg-white/[0.07] transition-colors"
                                    >
                                        <span className="text-2xl font-bold tracking-tight mb-2">
                                            {other.acronym}
                                        </span>
                                        <span className="text-sm text-mist leading-snug flex-1">
                                            {other.title}
                                        </span>
                                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all duration-300">
                                            View
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
