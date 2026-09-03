import type { Metadata } from "next";
import ExperienceListing from "@/components/experience/ExperienceListing";
import { createClient } from "@/lib/supabase/server";
import type { Experience } from "@/lib/experiences";
import { getNavItems } from "@/lib/nav";

export const metadata: Metadata = {
    title: "Experience | Thinker Engineering",
    description:
        "Case studies from data center design, audit and operations projects delivered by our team.",
};

export const revalidate = 60;

export default async function ExperiencePage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("experiences")
        .select("*")
        .eq("status", "published")
        .order("date", { ascending: false });

    const navItems = await getNavItems();

    return (
        <ExperienceListing
            navItems={navItems}
            items={(data ?? []) as Experience[]}
        />
    );
}