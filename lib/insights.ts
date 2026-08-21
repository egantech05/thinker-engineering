export type InsightType = "article" | "news";

export type InsightBlock =
    | { kind: "paragraph"; text: string }
    | { kind: "heading"; text: string }
    | { kind: "list"; items: string[] }
    | { kind: "quote"; text: string; attribution?: string };

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

export const insights: Insight[] = [
    {
        slug: "data-center-cooling-trends-2026",
        type: "article",
        category: "Industry Trends",
        date: "2026-06-15",
        title: "Precision Cooling Trends Shaping Malaysia's Data Centers in 2026",
        excerpt:
            "Liquid cooling adoption is accelerating as rack densities climb. Here's what operators in Malaysia need to plan for.",
        image: "/images/solutions/cooling.png",
    },
    {
        slug: "tvra-compliance-guide",
        type: "article",
        category: "Guides",
        date: "2026-05-02",
        title: "A Practical Guide to TVRA Compliance for Colocation Facilities",
        excerpt:
            "What a Threat Vulnerability Risk Assessment actually covers, and how to prepare your facility for one.",
        image: "/images/projects/project3.jpg",
    },
    {
        slug: "ups-maintenance-checklist",
        type: "article",
        category: "Best Practices",
        date: "2026-03-20",
        title: "UPS Maintenance Checklist Every Facility Manager Should Follow",
        excerpt:
            "Preventive maintenance schedules that keep your power redundancy from becoming a single point of failure.",
        image: "/images/solutions/ups.png",
    },
    {
        slug: "fire-suppression-standards",
        type: "article",
        category: "Compliance",
        date: "2026-02-11",
        title: "Clean Agent Fire Suppression and What's Changing in Regional Standards",
        excerpt:
            "A look at how fire safety codes for critical facilities are evolving across Southeast Asia.",
        image: "/images/solutions/fire.png",
    },
    {
        slug: "dcim-monitoring-roi",
        type: "article",
        category: "Technology",
        date: "2026-01-28",
        title: "Measuring the ROI of Real-Time DCIM Monitoring",
        excerpt:
            "Facilities that moved to 24/7 environmental monitoring report fewer unplanned outages. Here's the data.",
        image: "/images/solutions/monitor.png",
    },
    {
        slug: "structured-cabling-best-practices",
        type: "article",
        category: "Best Practices",
        date: "2025-12-09",
        title: "Structured Cabling Best Practices for High-Density Racks",
        excerpt:
            "Fiber and copper layout decisions made early save hours of troubleshooting later.",
        image: "/images/solutions/cable.png",
    },
    {
        slug: "security-access-control-2026",
        type: "article",
        category: "Security",
        date: "2025-11-14",
        title: "Biometric Access Control and Raising the Bar for Facility Security",
        excerpt:
            "Layered physical security is no longer optional for Tier III and above facilities.",
        image: "/images/solutions/security.png",
    },
    {
        slug: "colocation-expansion-checklist",
        type: "article",
        category: "Guides",
        date: "2025-10-30",
        title: "A Facility Manager's Checklist Before a Colocation Expansion",
        excerpt:
            "The risk assessment steps most teams skip, and end up paying for later.",
        image: "/images/projects/project5.jpg",
    },
    {
        slug: "sustainable-data-center-design",
        type: "article",
        category: "Industry Trends",
        date: "2025-09-18",
        title: "Designing for Sustainability Without Compromising Uptime",
        excerpt:
            "Energy-efficient cooling and power design choices that don't trade off reliability.",
        image: "/images/projects/project1.jpg",
    },
];

export const insightTypeLabels: Record<InsightType, string> = {
    article: "Articles",
    news: "Company News",
};

export function sortedInsights(type?: InsightType): Insight[] {
    const pool = type ? insights.filter((item) => item.type === type) : insights;
    return [...pool].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getInsight(slug: string): Insight | undefined {
    return insights.find((item) => item.slug === slug);
}

export function hasBody(slug: string): boolean {
    const item = getInsight(slug);
    return Boolean(item?.body && item.body.length > 0);
}

export function relatedInsights(slug: string, limit = 3): Insight[] {
    const current = getInsight(slug);
    if (!current) return sortedInsights().slice(0, limit);

    const sameCategory = sortedInsights().filter(
        (item) => item.slug !== slug && item.category === current.category
    );
    const rest = sortedInsights().filter(
        (item) => item.slug !== slug && item.category !== current.category
    );

    return [...sameCategory, ...rest].slice(0, limit);
}

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatInsightDate(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

