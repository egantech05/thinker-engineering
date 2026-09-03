import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CmsNav from "@/components/cms/CmsNav";
import { Pencil } from "lucide-react";

export default async function CmsDashboard() {
    const supabase = await createClient();

    const { data: insights, error } = await supabase
        .from("insights")
        .select("id, slug, title, category, status, date")
        .order("date", { ascending: false });

    return (
        <>
            <CmsNav active="insights" />

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">Insights</h1>
                <Link
                    href="/cms/insights/new"
                    className="rounded bg-gold px-4 py-2 text-black font-medium"
                >
                    New Article
                </Link>
            </div>

            {error && (
                <p className="text-red-400 mb-4">
                    Couldn&apos;t load articles: {error.message}
                </p>
            )}

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/20 text-sm text-white/60">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Category</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Date</th>
                        <th className="py-2 pr-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {insights?.map((item) => (
                        <tr key={item.id} className="border-b border-white/10">
                            <td className="py-3 pr-4">{item.title}</td>
                            <td className="py-3 pr-4 text-white/70">{item.category}</td>
                            <td className="py-3 pr-4">
                                <span
                                    className={
                                        item.status === "published"
                                            ? "text-green-400"
                                            : "text-yellow-400"
                                    }
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="py-3 pr-4 text-white/70">{item.date}</td>
                            <td className="py-3 pr-4">
                                <Link
                                    href={`/cms/insights/${item.slug}/edit`}
                                    aria-label="Edit"
                                    title="Edit"
                                    className="text-gold hover:text-gold/80"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {insights?.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-6 text-center text-white/50">
                                No articles yet. Create your first one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}