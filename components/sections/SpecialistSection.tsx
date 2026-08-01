"use client";

import { motion } from "framer-motion";
import { pillars } from "@/lib/data";

export default function SpecialistSection() {
    return (
        <section
            id="specialist"
            className="snap-section flex items-center bg-ink/60 md:bg-transparent px-4 md:px-8 py-12 md:py-24"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
                className="max-w-6xl mx-auto w-full rounded-2xl md:rounded-3xl bg-black/40 backdrop-blur-sm p-8 md:p-14 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/40"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-5xl font-medium mb-6"
                >
                    We are data center specialist
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 3, delay: 0.15, ease: "easeOut" }}
                    className="text-sm sm:text-base text-mist max-w-2xl mb-16 leading-relaxed"
                >
                    Whether you&apos;re a startup or an enterprise, we help you plan
                    smarter and run reliably. From initial consultation and product
                    selection to project execution and ongoing maintenance, we&apos;re
                    with you at every stage of your infrastructure&apos;s lifecycle.
                </motion.p>

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
                            className="max-w-6xl mx-auto w-full rounded-2xl md:rounded-3xl bg-black/60 md:bg-black/40 md:backdrop-blur-sm p-8 md:p-14 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/40"
                        >
                            <h3 className="text-gold text-lg sm:text-xl md:text-2xl font-semibold mb-3 leading-snug">
                                {p.title}
                            </h3>
                            <p className="text-sm text-mist leading-relaxed">{p.body}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}