import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ExperienceForm from "@/components/cms/ExperienceForm";
import { updateExperience, type ExperienceFormInput } from "../../actions";

export default async function EditExperiencePage({
    params,
}: {
    params: Promise<{ key: string }>;
}) {
    const { key } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("experiences")
        .select("*")
        .eq("key", key)
        .single();

    if (!data) {
        notFound();
    }

    async function save(input: ExperienceFormInput) {
        "use server";
        return updateExperience(key, input);
    }

    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/cms/experience"
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <h1 className="text-2xl font-medium text-white mb-8">Edit Experience</h1>
            <ExperienceForm initial={data} onSave={save} />
        </div>
    );
}