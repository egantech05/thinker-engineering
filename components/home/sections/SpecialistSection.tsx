"use client";

import { motion } from "framer-motion";
import { pillars } from "@/lib/data";
import Image from "next/image";

export default function SpecialistSection() {
    return (
        <section
            id="specialist"
            className="flex items-center bg-ink/60 md:bg-transparent px-4 md:px-8 pt-12 md:pt-24 pb-0 md:pb-2"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
                className="max-w-6xl lg:max-w-7xl 2xl:max-w-[1600px] mx-auto w-full pt-8 md:pt-14 px-8 md:px-14 pb-0"
            >
                <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-medium"
                    >
                        We are data center specialist
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 3, delay: 0.15, ease: "easeOut" }}
                        className="text-sm sm:text-base text-mist leading-relaxed"
                    >
                        Whether you&apos;re a startup or an enterprise, we help you plan
                        smarter and run reliably. From initial consultation and product
                        selection to project execution and ongoing maintenance, we&apos;re
                        with you at every stage of your infrastructure&apos;s lifecycle.
                    </motion.p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.5, delayChildren: 0.5 } },
                    }}
                    className="grid md:grid-cols-3 gap-6 md:gap-8"
                >
                    {pillars.map((p) => (
                        <motion.div
                            key={p.title}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                            }}
                            whileHover={{ scale: 1.04, y: -6 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative overflow-hidden flex flex-col justify-end max-w-6xl mx-auto w-full min-h-[300px] md:min-h-[360px] rounded-2xl md:rounded-3xl p-8 md:p-14 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/40"
                        >
                            <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-black/30" />
                            <div className="relative z-10">
                                <h3 className="text-gold text-lg sm:text-xl md:text-2xl font-semibold mb-3 leading-snug">
                                    {p.title}
                                </h3>
                                <p className="text-sm text-mist leading-relaxed">{p.body}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}