"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

const LoadingContext = createContext(false);
export function useLoadingComplete() {
    return useContext(LoadingContext);
}

const MIN_DURATION = 3000; // ms - bar always takes at least this long to visually fill
const RAMP_CAP = 92;       // % reached by the end of MIN_DURATION if not finishing yet
const FINISH_DURATION = 500; // ms - smooth top-up from RAMP_CAP to 100%

const SLOW_POINT = 80;   // % where the bar visibly starts to decelerate
const FAST_PHASE = 0.4;  // fraction of MIN_DURATION spent climbing to SLOW_POINT

function easeOutQuad(t: number) {
    return 1 - (1 - t) * (1 - t);
}

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function computeRampProgress(t: number) {
    if (t < FAST_PHASE) {
        // Quick, steady climb up to SLOW_POINT
        const localT = t / FAST_PHASE;
        return SLOW_POINT * easeOutQuad(localT);
    }
    // Deceleration only happens after SLOW_POINT, crawling toward RAMP_CAP
    const localT = (t - FAST_PHASE) / (1 - FAST_PHASE);
    return SLOW_POINT + (RAMP_CAP - SLOW_POINT) * easeOutCubic(localT);
}

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);
    const [reveal, setReveal] = useState(false);

    const startTimeRef = useRef(Date.now());
    const readyRef = useRef(false);
    const finishingRef = useRef(false);
    const frameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        document.documentElement.style.overflow = "hidden";

        const handleLoad = () => {
            readyRef.current = true;
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        const tick = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;

            if (!finishingRef.current) {
                const minElapsed = elapsed >= MIN_DURATION;

                if (readyRef.current && minElapsed) {

                    finishingRef.current = true;
                    startTimeRef.current = now;
                } else {

                    const t = Math.min(1, elapsed / MIN_DURATION);
                    setProgress(computeRampProgress(t));
                    frameRef.current = requestAnimationFrame(tick);
                    return;
                }
            }

            const finishElapsed = now - startTimeRef.current;
            const t = Math.min(1, finishElapsed / FINISH_DURATION);
            setProgress(RAMP_CAP + (100 - RAMP_CAP) * easeOutCubic(t));

            if (t >= 1) {
                setFading(true);
                setReveal(true);
                document.documentElement.style.overflow = "";
                window.setTimeout(() => setVisible(false), 600);
                return;
            }
            frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("load", handleLoad);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            document.documentElement.style.overflow = "";
        };
    }, []);

    return (
        <>
            {visible && (
                <div
                    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black transition-opacity duration-500 ease-out ${fading ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                >
                    <Image
                        src="/images/logo-thinker.svg"
                        alt="Thinker Engineering"
                        width={180}
                        height={34}
                        priority
                        className="w-36 md:w-44 h-auto"
                    />
                    <div className="w-48 md:w-64 h-[2px] bg-white/15 overflow-hidden rounded-full">
                        <div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-white text-sm tabular-nums tracking-wide">
                        {Math.round(progress)}%
                    </span>
                </div>
            )}
            <LoadingContext.Provider value={reveal}>{children}</LoadingContext.Provider>
        </>
    );
}