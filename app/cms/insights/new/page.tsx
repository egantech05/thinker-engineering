"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InsightForm from "@/components/cms/InsightForm";
import { createInsight } from "../actions";

export default function NewInsightPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/cms"
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <h1 className="text-2xl font-medium text-white mb-8">New Article</h1>
            <InsightForm onSave={createInsight} />
        </div>
    );
}