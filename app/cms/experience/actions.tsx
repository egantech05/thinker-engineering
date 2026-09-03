"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ExperienceBlock } from "@/lib/experiences";

export type ExperienceFormInput = {
    key: string;
    sector: string;
    title: string;
    project_type: string;
    client: string;
    image: string;
    date: string;
    body: ExperienceBlock[];
    status: "draft" | "published";
};

export async function createExperience(input: ExperienceFormInput) {
    const supabase = await createClient();
    const { error } = await supabase.from("experiences").insert(input);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/cms/experience");
    redirect("/cms/experience");
}

export async function updateExperience(
    originalKey: string,
    input: ExperienceFormInput
) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("experiences")
        .update(input)
        .eq("key", originalKey);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/cms/experience");
    redirect("/cms/experience");
}

export async function deleteExperience(key: string) {
    const supabase = await createClient();
    await supabase.from("experiences").delete().eq("key", key);
    revalidatePath("/cms/experience");
    redirect("/cms/experience");
}