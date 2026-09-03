"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Logo, LogoCategory } from "@/lib/logos";

export async function addLogo(category: LogoCategory, name: string, image: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("logos")
        .insert({ category, name, image })
        .select()
        .single();

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/cms/logos");
    revalidatePath("/");
    return { logo: data as Logo };
}

export async function deleteLogo(id: string) {
    const supabase = await createClient();
    await supabase.from("logos").delete().eq("id", id);
    revalidatePath("/cms/logos");
    revalidatePath("/");
}