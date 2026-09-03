import { createClient } from "@/lib/supabase/server";

export type LogoCategory = "trusted_by" | "certification" | "partnership";

export type Logo = {
    id: string;
    category: LogoCategory;
    name: string;
    image: string;
    created_at: string;
};

export async function getLogos(category: LogoCategory): Promise<Logo[]> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("logos")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: true });

    return (data ?? []) as Logo[];
}