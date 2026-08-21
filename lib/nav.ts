import { services, experiences } from "@/lib/data";
import { hasCaseStudy } from "@/lib/experiences";

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
        subItems: experiences
            .filter((e) => hasCaseStudy(e.key))
            .map((e) => ({
                label: e.title,
                href: `/experience/${e.key}`,
            })),
    },

    {
        label: "Insights",
        subItems: [
            { label: "Articles", href: "/insights?type=article" },
            { label: "Company News", href: "/insights?type=news" },
        ],
    },

    {
        label: "Location",
        href: "/#location",
    },
];