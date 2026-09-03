import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightArticle from "@/components/insights/InsightArticle";
import { createClient } from "@/lib/supabase/server";
import type { Insight } from "@/lib/insights";
import { getNavItems } from "@/lib/nav";

export const revalidate = 60;

async function getPublishedInsight(slug: string): Promise<Insight | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("insights")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    return (data as Insight) ?? null;
}

async function getRelatedInsights(item: Insight, limit = 3): Promise<Insight[]> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("insights")
        .select("*")
        .eq("status", "published")
        .neq("slug", item.slug)
        .order("date", { ascending: false });

    const all = (data ?? []) as Insight[];
    const sameCategory = all.filter((i) => i.category === item.category);
    const rest = all.filter((i) => i.category !== item.category);

    return [...sameCategory, ...rest].slice(0, limit);
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = await getPublishedInsight(slug);

    if (!item) {
        return { title: "Not Found | Thinker Engineering" };
    }

    return {
        title: `${item.title} | Thinker Engineering`,
        description: item.excerpt,
    };
}

export default async function InsightPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = await getPublishedInsight(slug);

    if (!item) {
        notFound();
    }

    const related = await getRelatedInsights(item);
    const navItems = await getNavItems();

    return <InsightArticle item={item} related={related} navItems={navItems} />;
}   