import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightArticle from "@/components/insights/InsightArticle";
import { insights, getInsight } from "@/lib/insights";

export function generateStaticParams() {
    return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = getInsight(slug);

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
    const item = getInsight(slug);

    if (!item) {
        notFound();
    }

    return <InsightArticle item={item} />;
}
