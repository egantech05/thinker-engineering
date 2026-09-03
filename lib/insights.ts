export type InsightType = "article" | "news";

export type InsightBlock =
    | { kind: "paragraph"; text: string }
    | { kind: "heading"; text: string }
    | { kind: "list"; items: string[] }
    | { kind: "quote"; text: string; attribution?: string }
    | { kind: "image"; src: string; alt?: string; caption?: string };

export type Insight = {
    slug: string;
    type: InsightType;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
    body?: InsightBlock[];
};

export const insightTypeLabels: Record<InsightType, string> = {
    article: "Articles",
    news: "Company News",
};

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatInsightDate(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}