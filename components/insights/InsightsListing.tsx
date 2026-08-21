"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    sortedInsights,
    insightTypeLabels,
    formatInsightDate,
    type Insight,
    type InsightType,
} from "@/lib/insights";

type Tab = InsightType | "all";

const TABS: { value: Tab; label: string }[] = [
    { value: "all", label: "All" },
    { value: "article", label: insightTypeLabels.article },
    { value: "news", label: insightTypeLabels.news },
];


function FeaturedCard({ item }: { item: Insight }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <Link
                href={`/insights/${item.slug}`}
                className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-gold/40 transition-colors"
            >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] overflow-hidden bg-ink">


                    <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover scale-[1.02] transition-transform duration-500 group-hover:scale-105"

                        priority
                    />
                </div>

                <div className="flex flex-col justify-center p-7 md:p-10">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-[11px] uppercase tracking-wide bg-gold text-ink font-semibold px-2.5 py-1 rounded-full">
                            {item.category}
                        </span>
                        <span className="text-xs text-mist">
                            {formatInsightDate(item.date)}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-medium leading-snug mb-4 group-hover:text-gold transition-colors">
                        {item.title}
                    </h2>
                    <p className="text-mist leading-relaxed mb-6">{item.excerpt}</p>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold w-fit group-hover:gap-2 transition-all duration-300">
                        Read more
                        <ArrowUpRight size={16} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

function InsightCard({ item, index }: { item: Insight; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
        >
            <Link
                href={`/insights/${item.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-gold/40 transition-colors"
            >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">

                    <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover scale-[1.02] transition-transform duration-500 group-hover:scale-105"

                    />
                    <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wide bg-gold text-ink font-semibold px-2.5 py-1 rounded-full">
                        {item.category}
                    </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                    <p className="text-xs text-mist mb-2">
                        {formatInsightDate(item.date)}
                    </p>
                    <h3 className="text-lg font-medium leading-snug mb-3 group-hover:text-gold transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-mist leading-relaxed line-clamp-3 flex-1">
                        {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold w-fit group-hover:gap-2 transition-all duration-300">
                        Read more
                        <ArrowUpRight size={16} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function InsightsListing({ initialType }: { initialType: Tab }) {
    const [activeTab, setActiveTab] = useState<Tab>(initialType);

    const items = sortedInsights(activeTab === "all" ? undefined : activeTab);
    const [featured, ...rest] = items;

    return (
        <>
            <Header />
            <main className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
                <section className="px-6 md:px-16 pt-32 md:pt-44 pb-12 md:pb-16">
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5"
                        >
                            Insights
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-medium leading-tight mb-6"
                        >
                            Articles and company news
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                            className="text-mist leading-relaxed max-w-2xl"
                        >
                            Practical guidance, industry observations and updates from the team
                            on designing, auditing and operating mission critical facilities.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                            className="mt-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-5"
                        >
                            {TABS.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setActiveTab(tab.value)}
                                    aria-pressed={activeTab === tab.value}
                                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${activeTab === tab.value
                                        ? "bg-gold text-ink"
                                        : "bg-white/5 text-mist hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="px-6 md:px-16 pb-28 md:pb-36">
                    <div className="max-w-6xl mx-auto w-full">
                        {items.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-20 px-6 text-center">
                                <p className="text-lg font-medium mb-2">Nothing here yet</p>
                                <p className="text-sm text-mist max-w-md mx-auto leading-relaxed">
                                    There are no entries in this section at the moment. Check back
                                    soon or browse the other categories.
                                </p>
                            </div>
                        ) : (
                            <>
                                <FeaturedCard key={featured.slug} item={featured} />

                                {rest.length > 0 && (
                                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {rest.map((item, i) => (
                                            <InsightCard key={item.slug} item={item} index={i} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
