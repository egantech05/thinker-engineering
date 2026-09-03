"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ExperienceForm from "@/components/cms/ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/cms/experience"
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <h1 className="text-2xl font-medium text-white mb-8">New Experience</h1>
            <ExperienceForm onSave={createExperience} />
        </div>
    );
}