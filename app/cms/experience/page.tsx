import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CmsNav from "@/components/cms/CmsNav";
import { Pencil } from "lucide-react";

export default async function CmsExperiencePage() {
    const supabase = await createClient();

    const { data: experiences, error } = await supabase
        .from("experiences")
        .select("key, title, sector, status, date")
        .order("date", { ascending: false });

    return (
        <>
            <CmsNav active="experience" />

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">Experience</h1>
                <Link
                    href="/cms/experience/new"
                    className="rounded bg-gold px-4 py-2 text-black font-medium"
                >
                    New Experience
                </Link>
            </div>

            {error && (
                <p className="text-red-400 mb-4">
                    Couldn&apos;t load experience entries: {error.message}
                </p>
            )}

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/20 text-sm text-white/60">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Sector</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Date</th>
                        <th className="py-2 pr-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences?.map((item) => (
                        <tr key={item.key} className="border-b border-white/10">
                            <td className="py-3 pr-4">{item.title}</td>
                            <td className="py-3 pr-4 text-white/70">{item.sector}</td>
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
                                    href={`/cms/experience/${item.key}/edit`}
                                    aria-label="Edit"
                                    title="Edit"
                                    className="text-gold hover:text-gold/80"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {experiences?.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-6 text-center text-white/50">
                                No experience entries yet. Create your first one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}