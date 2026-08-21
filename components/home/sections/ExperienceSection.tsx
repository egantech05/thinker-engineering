"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/lib/data";
import { hasCaseStudy } from "@/lib/experiences";


type Experience = (typeof experiences)[number];



const tintClasses: Record<string, string> = {
    gold: "bg-gradient-to-t from-gold/85 via-gold/30 to-transparent mix-blend-color",
    blue: "bg-gradient-to-t from-blue/90 via-blue/35 to-transparent mix-blend-color",
};

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
            className="group relative overflow-hidden row-span-2"
        >
            {hasCaseStudy(exp.key) && (
                <Link
                    href={`/experience/${exp.key}`}
                    aria-label={`Read the ${exp.title} case study`}
                    className="absolute inset-0 z-10"
                />
            )}

            <div
                className="absolute inset-0"

                style={{
                    maskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
                }}
            >
                <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className={`absolute inset-0 ${tintClasses[exp.tint]}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-end p-4 md:p-5 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white font-semibold text-sm md:text-base leading-snug">
                    {exp.title}
                </h3>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 bg-ink/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm md:text-base leading-snug mb-2">
                    {exp.title}
                </h3>
                <p className="text-mist text-xs md:text-sm leading-relaxed mb-3 line-clamp-5">
                    {exp.description}
                </p>
                {hasCaseStudy(exp.key) && (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold w-fit group-hover:gap-2 transition-all duration-300">
                        Read more
                        <ArrowUpRight size={16} />
                    </span>
                )}

            </div>
        </motion.div>
    );
}





export default function ExperienceSection() {
    const sectionRef = useRef(null);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="snap-section flex items-center bg-ink/60 md:bg-transparent px-6 md:px-16 py-24"
        >
            <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-medium text-white leading-tight text-center mb-10"
                >
                    Our Experience
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[150px] gap-0 lg:[grid-auto-flow:dense]">
                    <div aria-hidden className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                    <div aria-hidden className="hidden lg:block lg:col-start-3 lg:row-start-1" />
                    {experiences.map((exp, i) => (
                        <ExperienceCard key={exp.title} exp={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}