import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InsightForm from "@/components/cms/InsightForm";
import { updateInsight, type InsightFormInput } from "../../actions";

export default async function EditInsightPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("insights")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!data) {
        notFound();
    }

    async function save(input: InsightFormInput) {
        "use server";
        return updateInsight(slug, input);
    }

    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/cms"
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <h1 className="text-2xl font-medium text-white mb-8">Edit Article</h1>
            <InsightForm initial={data} onSave={save} />
        </div>
    );
}