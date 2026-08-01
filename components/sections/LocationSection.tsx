"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { locations } from "@/lib/data";

export default function LocationSection() {
    return (
        <section id="location" className="snap-section flex items-center px-6 md:px-16 py-24">
            <div className="max-w-6xl mx-auto w-full px-8 py-10 md:px-14 md:py-14">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-medium text-white mb-12 text-center"
                >
                    Location
                </motion.h2>

                <div className="grid md:grid-cols-[1.3fr_auto] gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative aspect-[16/10] w-full"
                    >
                        <Image
                            src="/images/malaysia-map.svg"
                            alt="Map showing Thinker Engineering office locations"
                            fill
                            className="object-contain opacity-90"
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
                        }}
                        className="flex flex-col gap-5 w-full md:w-80"
                    >
                        {locations.map((loc) => (
                            <motion.div
                                key={loc.label}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                                }}
                                className="group flex gap-4 rounded-2xl bg-white/10 md:bg-white/5 md:backdrop-blur-sm p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/10 hover:shadow-lg hover:shadow-black/30"
                            >
                                <span
                                    className={`mt-1.5 h-3 w-3 rounded-full shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 ${loc.color === "blue" ? "bg-blue" : "bg-gold"
                                        }`}
                                />
                                <div>
                                    <h3 className="font-semibold text-lg mb-1.5">{loc.label}</h3>
                                    <p className="text-sm text-mist leading-relaxed">{loc.address}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}