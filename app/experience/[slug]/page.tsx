import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExperienceArticle from "@/components/experience/ExperienceArticle";
import { createClient } from "@/lib/supabase/server";
import type { Experience } from "@/lib/experiences";
import { getNavItems } from "@/lib/nav";

export const revalidate = 60;

async function getPublishedExperience(key: string): Promise<Experience | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("experiences")
        .select("*")
        .eq("key", key)
        .eq("status", "published")
        .single();

    return (data as Experience) ?? null;
}

async function getRelatedExperiences(item: Experience, limit = 3): Promise<Experience[]> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("experiences")
        .select("*")
        .eq("status", "published")
        .neq("key", item.key)
        .order("date", { ascending: false });

    const all = (data ?? []) as Experience[];
    const sameSector = all.filter((i) => i.sector === item.sector);
    const rest = all.filter((i) => i.sector !== item.sector);

    return [...sameSector, ...rest].slice(0, limit);
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const study = await getPublishedExperience(slug);

    if (!study) {
        return { title: "Project Not Found | Thinker Engineering" };
    }

    return {
        title: `${study.sector} Case Study | Thinker Engineering`,
        description: study.title,
    };
}

export default async function ExperiencePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const study = await getPublishedExperience(slug);

    if (!study) {
        notFound();
    }

    const related = await getRelatedExperiences(study);
    const navItems = await getNavItems();

    return <ExperienceArticle study={study} related={related} navItems={navItems} />;
}