import type { Metadata } from "next";
import InsightsListing from "@/components/insights/InsightsListing";

export const metadata: Metadata = {
    title: "Insights | Thinker Engineering",
    description:
        "Articles, guides and company news on designing, auditing and operating mission critical data center facilities.",
};

export default async function InsightsPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;
    const initialType =
        type === "article" || type === "news" ? type : "all";

    return <InsightsListing initialType={initialType} />;
}
