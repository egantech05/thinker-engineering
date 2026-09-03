import { createClient } from "@/lib/supabase/server";

export type NavSubItem = {
    label: string;
    href: string;
    description?: string;
};

export type NavItem = {
    label: string;
    href?: string;
    subItems?: NavSubItem[];
};

export async function getNavItems(): Promise<NavItem[]> {
    const supabase = await createClient();

    const { data: services } = await supabase
        .from("services")
        .select("key, title, tagline")
        .eq("status", "published")
        .order("sort_order");

    return [
        {
            label: "Company",
            subItems: [
                { label: "About Us", href: "/#specialist" },
                { label: "Leadership", href: "/leadership" },
                { label: "Career", href: "/career" },
            ],
        },
        {
            label: "Service",
            subItems: (services ?? []).map((s) => ({
                label: s.title,
                href: `/services/${s.key}`,
                description: s.tagline ?? undefined,
            })),
        },
        {
            label: "Experience",
            href: "/experience",
        },
        {
            label: "Insights",
            subItems: [
                { label: "Articles", href: "/insights?type=article" },
                { label: "Company News", href: "/insights?type=news" },
            ],
        },
        { label: "Location", href: "/#location" },
    ];
}