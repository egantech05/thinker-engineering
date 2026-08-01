"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { lifecycle } from "@/lib/data";

type Cert = { name: string; src: string };

// tuning for the "take turns" pulse loop on Design / Audit / Execution / Maintenance
const PULSE_DURATION = 0.5;
const PAUSE_BETWEEN = 0.7;
const TURN_LENGTH = PULSE_DURATION + PAUSE_BETWEEN;

// entrance timing for the list items (must match the values used below)
const ENTRANCE_DURATION = 0.6;
const ENTRANCE_STAGGER = 0.15;
const LIST_LENGTH = 4; // Design, Audit, Execution, Maintenance

// pulse loop starts only once the LAST list item has fully finished appearing,
// plus a small breathing-room buffer
const LOOP_START_DELAY = 1 +
    ENTRANCE_DURATION + (LIST_LENGTH - 1) * ENTRANCE_STAGGER + 0.4;

export default function OperationsSection({ certifications }: { certifications: Cert[] }) {
    const totalLoop = TURN_LENGTH * lifecycle.length;

    return (
        <section className="snap-section flex px-6 md:px-16 py-24">
            <div style={{ maxWidth: "896px", width: "100%", margin: "0 auto" }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-medium mb-10 text-white"
                >
                    Empowering Reliable
                    <br />
                    Data Center Operations
                </motion.h2>

                <div className="mx-auto w-fit flex flex-col md:flex-row">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        whileHover={{ scale: 1.03 }}
                        className="relative w-full md:w-[480px] h-[240px] md:h-[400px] shrink-0 rounded-lg overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Image
                                src="/images/datacenter-corridor.jpg"
                                alt="Data center server corridor"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    <div className="flex flex-col justify-center px-8 md:px-12 py-8">
                        <ul className="space-y-1">
                            {lifecycle.map((step, index) => (
                                <motion.li
                                    key={step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                    whileHover={{ color: "#ffcb05", x: 4 }}
                                    className="text-3xl md:text-4xl font-medium cursor-default"
                                >
                                    <motion.span
                                        className="inline-block"
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{
                                            duration: PULSE_DURATION,
                                            delay: LOOP_START_DELAY + index * TURN_LENGTH,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        {step}
                                    </motion.span>
                                </motion.li>
                            ))}
                        </ul>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            className="text-mist text-sm mt-4"
                        >
                            We support every data center life-cycle
                        </motion.p>
                    </div>
                </div>

                {/* Certified Professionals — left un-animated as requested */}
                <div className="mt-16">
                    <p className="text-sm font-semibold mb-4">Certified Professionals</p>
                </div>

                {certifications.length > 0 && (
                    <div className="relative left-1/2 -mx-[50vw] w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div className="flex w-max animate-marquee">
                            {Array.from({ length: 6 }).flatMap((_, setIndex) =>
                                certifications.map((c, i) => (
                                    <div
                                        key={`${c.name}-${setIndex}-${i}`}
                                        className="flex items-center shrink-0 px-8 md:px-12"
                                    >
                                        <Image
                                            src={c.src}
                                            alt={c.name}
                                            width={100}
                                            height={20}
                                            loading="eager"
                                            className="h-6 md:h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}