import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExperienceArticle from "@/components/experience/ExperienceArticle";
import { caseStudies, getCaseStudy } from "@/lib/experiences";

export function generateStaticParams() {
    return caseStudies.map((study) => ({ slug: study.key }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);

    if (!study) {
        return { title: "Project Not Found | Thinker Engineering" };
    }

    return {
        title: `${study.sector} Case Study | Thinker Engineering`,
        description: study.title,
    };
}

export default async function ExperiencePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const study = getCaseStudy(slug);

    if (!study) {
        notFound();
    }

    return <ExperienceArticle study={study} />;
}
