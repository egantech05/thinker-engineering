import type { Metadata } from "next";
import InsightsListing from "@/components/insights/InsightsListing";
import { createClient } from "@/lib/supabase/server";
import type { Insight } from "@/lib/insights";
import { getNavItems } from "@/lib/nav";

export const metadata: Metadata = {
    title: "Insights | Thinker Engineering",
    description:
        "Articles, guides and company news on designing, auditing and operating mission critical data center facilities.",
};

export const revalidate = 60;

export default async function InsightsPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;
    const initialType =
        type === "article" || type === "news" ? type : "all";

    const supabase = await createClient();
    const { data } = await supabase
        .from("insights")
        .select("*")
        .eq("status", "published")
        .order("date", { ascending: false });

    const navItems = await getNavItems();
    return (
        <InsightsListing
            navItems={navItems}
            initialType={initialType}
            items={(data ?? []) as Insight[]}
        />
    );
}