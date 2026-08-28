"use client";

import Image from "next/image";

type Partner = { name: string; src: string };

export default function PartnershipSection({ partnership }: { partnership: Partner[] }) {
    if (partnership.length === 0) return null;

    return (
        <section className="px-4 md:px-8 pt-0 md:pt-2 pb-12 md:pb-16">
            <div className="max-w-6xl lg:max-w-7xl 2xl:max-w-[1600px] mx-auto w-full pt-0 px-8 md:px-14 pb-8 md:pb-14">
                <div className="rounded-2xl md:rounded-3xl bg-black/40 backdrop-blur-sm p-8 md:p-14">
                    <p className="text-center text-sm font-semibold mb-8">
                        Trusted Partnership
                    </p>
                    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div className="flex w-max animate-marquee">
                            {Array.from({ length: 6 }).flatMap((_, setIndex) =>
                                partnership.map((p, i) => (
                                    <div
                                        key={`${p.name}-${setIndex}-${i}`}
                                        className="flex items-center shrink-0 px-8 md:px-12"
                                    >
                                        <Image
                                            src={p.src}
                                            alt={p.name}
                                            width={100}
                                            height={40}
                                            className="h-6 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}