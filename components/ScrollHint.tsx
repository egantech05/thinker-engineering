"use client";

import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
    return (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 animate-pulse pointer-events-none select-none z-15">
            <span className="text-xs md:text-sm font-medium tracking-wide">
                Keep scrolling
            </span>
            <ChevronDown size={20} className="animate-bounce" />
        </div>
    );
}