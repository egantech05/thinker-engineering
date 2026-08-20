"use client";

import { useEffect, useState } from "react";
import { useLoadingComplete } from "@/components/layout/LoadingScreen";
export default function Counter({
    value,
    duration = 1.5,
}: {
    value: string;
    duration?: number;
}) {
    // splits "80+" into target number 80 and suffix "+"
    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : "";

    const [count, setCount] = useState(0);
    const ready = useLoadingComplete();

    useEffect(() => {
        if (!ready) return;

        let start: number | null = null;
        let frame: number;

        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / (duration * 1000), 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
                frame = requestAnimationFrame(step);
            }
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [ready, target, duration]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}