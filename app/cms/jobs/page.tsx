import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import CmsNav from "@/components/cms/CmsNav";

export default async function CmsJobsPage() {
    const supabase = await createClient();

    const { data: jobs, error } = await supabase
        .from("jobs")
        .select("key, title, department, location, status, sort_order")
        .order("sort_order", { ascending: true });

    return (
        <>
            <CmsNav active="jobs" />

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">Careers</h1>
                <Link
                    href="/cms/jobs/new"
                    className="rounded bg-gold px-4 py-2 text-black font-medium"
                >
                    New Job
                </Link>
            </div>

            {error && (
                <p className="text-red-400 mb-4">Couldn&apos;t load jobs: {error.message}</p>
            )}

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/20 text-sm text-white/60">
                        <th className="py-2 pr-4">Order</th>
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Department</th>
                        <th className="py-2 pr-4">Location</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {jobs?.map((job) => (
                        <tr key={job.key} className="border-b border-white/10">
                            <td className="py-3 pr-4 text-white/50">{job.sort_order}</td>
                            <td className="py-3 pr-4">{job.title}</td>
                            <td className="py-3 pr-4 text-white/70">{job.department}</td>
                            <td className="py-3 pr-4 text-white/70">{job.location}</td>
                            <td className="py-3 pr-4">
                                <span
                                    className={
                                        job.status === "published" ? "text-green-400" : "text-yellow-400"
                                    }
                                >
                                    {job.status}
                                </span>
                            </td>
                            <td className="py-3 pr-4">
                                <Link
                                    href={`/cms/jobs/${job.key}/edit`}
                                    aria-label="Edit"
                                    title="Edit"
                                    className="text-gold hover:text-gold/80"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {jobs?.length === 0 && (
                        <tr>
                            <td colSpan={6} className="py-6 text-center text-white/50">
                                No jobs yet. Create your first one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}