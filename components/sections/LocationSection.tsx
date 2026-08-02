"use client";

import Image from "next/image";
import { locations } from "@/lib/data";
import ScrollHint from "@/components/ScrollHint";

export default function LocationSection() {
    return (
        <section id="location" className="snap-section flex items-center bg-gradient-to-b from-black from-10% to-blue-dark/50 px-6 md:px-16 py-24">
            <div className="max-w-6xl mx-auto w-full px-8 py-10 md:px-14 md:py-14">
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-12 text-center">
                    Location
                </h2>

                <div className="grid md:grid-cols-[1.3fr_auto] gap-10 items-center">
                    <div className="relative aspect-[16/10] w-full">
                        <Image
                            src="/images/malaysia-map.svg"
                            alt="Map showing Thinker Engineering office locations"
                            fill
                            className="object-contain opacity-90"
                        />
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-80">
                        {locations.map((loc) => (
                            <div
                                key={loc.label}
                                className="group flex gap-3 md:gap-4 rounded-2xl bg-white/10 md:bg-white/5 md:backdrop-blur-sm p-4 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/10 hover:shadow-lg hover:shadow-black/30"
                            >
                                <span
                                    className={`mt-1.5 h-3 w-3 rounded-full shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 ${loc.color === "blue" ? "bg-blue" : "bg-gold"
                                        }`}
                                />
                                <div>
                                    <h3 className="font-semibold text-lg mb-1.5">{loc.label}</h3>
                                    <p className="text-sm text-mist leading-relaxed">{loc.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ScrollHint />
        </section>
    );
}