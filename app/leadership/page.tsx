import type { Metadata } from "next";
import LeadershipClient from "@/components/leadership/LeadershipClient";
import { leaders } from "@/lib/leaders";
import { getNavItems } from "@/lib/nav";

export const metadata: Metadata = {
    title: "Leadership | Thinker Engineering",
    description:
        "Meet the leadership team driving Thinker Engineering's data center and IT infrastructure consultancy.",
};

export default async function LeadershipPage() {
    const navItems = await getNavItems();

    return <LeadershipClient leaders={leaders} navItems={navItems} />;
}