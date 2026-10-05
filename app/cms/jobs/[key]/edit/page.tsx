import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import JobForm from "@/components/cms/JobForm";
import { updateJob, deleteJob, type JobFormInput } from "../../actions";

export default async function EditJobPage({
    params,
}: {
    params: Promise<{ key: string }>;
}) {
    const { key } = await params;
    const supabase = await createClient();

    const { data } = await supabase.from("jobs").select("*").eq("key", key).single();

    if (!data) {
        notFound();
    }

    async function save(input: JobFormInput) {
        "use server";
        return updateJob(key, input);
    }

    async function remove() {
        "use server";
        return deleteJob(key);
    }

    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/cms/jobs"
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <h1 className="text-2xl font-medium text-white mb-8">Edit Job</h1>
            <JobForm initial={data} onSave={save} onDelete={remove} />
        </div>
    );
}