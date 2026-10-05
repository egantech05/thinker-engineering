"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/jobs";

export type JobFormInput = Omit<Job, never>;

function clean(input: JobFormInput): JobFormInput {
    return {
        ...input,
        key: input.key.trim(),
        title: input.title.trim(),
        department: input.department.trim(),
        location: input.location.trim(),
        summary: input.summary.trim(),
        responsibilities: input.responsibilities.map((s) => s.trim()).filter(Boolean),
        requirements: input.requirements.map((s) => s.trim()).filter(Boolean),
        sort_order: Number.isFinite(input.sort_order) ? input.sort_order : 0,
    };
}

function revalidateJobs() {
    revalidatePath("/cms/jobs");
    revalidatePath("/career");
}

export async function createJob(input: JobFormInput) {
    const supabase = await createClient();
    const { error } = await supabase.from("jobs").insert(clean(input));

    if (error) {
        return { error: error.message };
    }

    revalidateJobs();
    redirect("/cms/jobs");
}

export async function updateJob(originalKey: string, input: JobFormInput) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("jobs")
        .update({ ...clean(input), updated_at: new Date().toISOString() })
        .eq("key", originalKey);

    if (error) {
        return { error: error.message };
    }

    revalidateJobs();
    redirect("/cms/jobs");
}

export async function deleteJob(key: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("jobs").delete().eq("key", key);

    if (error) {
        return { error: error.message };
    }

    revalidateJobs();
    redirect("/cms/jobs");
}