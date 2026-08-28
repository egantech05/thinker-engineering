"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Cert = { name: string; src: string };

export default function OperationsSection({ certifications }: { certifications: Cert[] }) {
    return (
        <section className="snap-section relative min-h-screen flex flex-col justify-between px-6 md:px-16 py-16 overflow-hidden">
            <Image
                src="/images/datacenter.gif"
                alt="Data center operations"
                fill
                unoptimized
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue via-blue-dark to-blue-dark mix-blend-color opacity-30" />

            <div className="relative z-10 flex-1 flex flex-col justify-center" style={{ maxWidth: "896px", width: "100%", margin: "0 auto" }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-medium mb-6 text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                >
                    Empowering Reliable
                    <br />
                    Data Center Operations
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="text-white/90 text-lg md:text-2xl font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                >
                    We support every data center life-cycle
                </motion.p>
            </div>

            <div className="relative z-10" style={{ maxWidth: "896px", width: "100%", margin: "0 auto" }}>
                <p className="text-sm font-semibold mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    Certified Professionals
                </p>
            </div>

            {certifications.length > 0 && (
                <div className="relative z-10 left-1/2 -mx-[50vw] w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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
                                        height={40}
                                        loading="eager"
                                        className="h-6 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}