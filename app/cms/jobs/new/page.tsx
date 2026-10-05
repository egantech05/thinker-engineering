"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobForm from "@/components/cms/JobForm";
import { createJob } from "../actions";

export default function NewJobPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/cms/jobs"
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <h1 className="text-2xl font-medium text-white mb-8">New Job</h1>
            <JobForm onSave={createJob} />
        </div>
    );
}