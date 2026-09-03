import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceClient from "@/components/services/ServiceClient";
import { serviceDetails, getServiceDetail } from "@/lib/services";
import { getNavItems } from "@/lib/nav";

export function generateStaticParams() {
    return serviceDetails.map((service) => ({ slug: service.key }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceDetail(slug);

    if (!service) {
        return { title: "Service Not Found | Thinker Engineering" };
    }

    return {
        title: `${service.title} | Thinker Engineering`,
        description: service.tagline,
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = getServiceDetail(slug);

    if (!service) {
        notFound();
    }

    const navItems = await getNavItems();

    return <ServiceClient service={service} navItems={navItems} />;
}
