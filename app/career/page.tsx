import type { Metadata } from "next";
import CareerClient from "@/components/career/CareerClient";

export const metadata: Metadata = {
    title: "Career | Thinker Engineering",
    description:
        "Join Thinker Engineering. Explore open roles in data center engineering, IT infrastructure and managed services, or submit your CV for future opportunities.",
};

export default function CareerPage() {
    return <CareerClient />;
}
