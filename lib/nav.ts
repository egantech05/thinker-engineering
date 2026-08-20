import { services, experiences } from "@/lib/data";

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

export const navItems: NavItem[] = [
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
        subItems: services.map((s) => ({
            label: s.title,
            href: `/services/${s.key}`,
            description: s.description,
        })),
    },
    {
        label: "Experience",
        subItems: experiences.map((e) => ({
            label: e.title,
            href: `/#experience-${e.key}`,
        })),
    },
    {
        label: "Insights",
        href: "/#insights",
    },
    {
        label: "Location",
        href: "/#location",
    },
];