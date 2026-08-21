import type { Metadata } from "next";
import LeadershipClient from "@/components/leadership/LeadershipClient";

export const metadata: Metadata = {
    title: "Leadership | Thinker Engineering",
    description:
        "Meet the leadership team driving Thinker Engineering's data center and IT infrastructure consultancy.",
};

export default function LeadershipPage() {
    return <LeadershipClient />;
}