"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { InsightBlock, InsightType } from "@/lib/insights";

export type InsightFormInput = {
    slug: string;
    type: InsightType;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
    body: InsightBlock[];
    status: "draft" | "published";
};

export async function createInsight(input: InsightFormInput) {
    const supabase = await createClient();
    const { error } = await supabase.from("insights").insert(input);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/cms");
    redirect("/cms");
}

export async function updateInsight(
    originalSlug: string,
    input: InsightFormInput
) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("insights")
        .update(input)
        .eq("slug", originalSlug);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/cms");
    redirect("/cms");
}

export async function deleteInsight(slug: string) {
    const supabase = await createClient();
    await supabase.from("insights").delete().eq("slug", slug);
    revalidatePath("/cms");
    redirect("/cms");
}