import type { Metadata } from "next";
import CareerClient from "@/components/career/CareerClient";
import { getNavItems } from "@/lib/nav";

export const metadata: Metadata = {
    title: "Career | Thinker Engineering",
    description:
        "Join Thinker Engineering. Explore open roles in data center engineering, IT infrastructure and managed services, or submit your CV for future opportunities.",
};

export default async function CareerPage() {
    const navItems = await getNavItems();
    return <CareerClient navItems={navItems} />;
}