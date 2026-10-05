"use client";

import { useState, useTransition, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { JOB_TYPES, type JobStatus } from "@/lib/jobs";
import type { JobFormInput } from "@/app/cms/jobs/actions";

type Props = {
    initial?: Partial<JobFormInput>;
    onSave: (data: JobFormInput) => Promise<{ error?: string } | void>;
    onDelete?: () => Promise<{ error?: string } | void>;
};

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function JobForm({ initial, onSave, onDelete }: Props) {
    const isEdit = Boolean(initial);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState(initial?.title ?? "");
    const [key, setKey] = useState(initial?.key ?? "");
    const [keyTouched, setKeyTouched] = useState(isEdit);
    const [department, setDepartment] = useState(initial?.department ?? "");
    const [location, setLocation] = useState(initial?.location ?? "");
    const [type, setType] = useState(initial?.type ?? JOB_TYPES[0]);
    const [status, setStatus] = useState<JobStatus>(initial?.status ?? "draft");
    const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
    const [summary, setSummary] = useState(initial?.summary ?? "");
    const [responsibilities, setResponsibilities] = useState<string[]>(
        initial?.responsibilities?.length ? initial.responsibilities : [""]
    );
    const [requirements, setRequirements] = useState<string[]>(
        initial?.requirements?.length ? initial.requirements : [""]
    );

    function handleTitleChange(value: string) {
        setTitle(value);
        if (!keyTouched) setKey(slugify(value));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
            const result = await onSave({
                key,
                title,
                department,
                location,
                type,
                status,
                sort_order: sortOrder,
                summary,
                responsibilities,
                requirements,
            });
            if (result?.error) setError(result.error);
        });
    }

    function handleDelete() {
        if (!onDelete) return;
        if (!window.confirm(`Delete "${title || "this job"}"? This can't be undone.`)) return;
        setError(null);
        startTransition(async () => {
            const result = await onDelete();
            if (result?.error) setError(result.error);
        });
    }

    const inputClass = "rounded border border-white/20 bg-transparent px-3 py-2";

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 text-white">
            {error && <p className="text-red-400">{error}</p>}

            <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Job title</span>
                    <input
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        required
                        className={inputClass}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Slug</span>
                    <input
                        value={key}
                        onChange={(e) => {
                            setKeyTouched(true);
                            setKey(slugify(e.target.value));
                        }}
                        required
                        disabled={isEdit}
                        className={`${inputClass} disabled:opacity-50`}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Department</span>
                    <input
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                        className={inputClass}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Location</span>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        placeholder="e.g. Cyberjaya, Selangor"
                        className={inputClass}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Employment type</span>
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className={`w-full ${inputClass} pr-8 appearance-none cursor-pointer`}
                        >
                            {JOB_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    </div>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm text-white/60">Status</span>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as JobStatus)}
                                className={`w-full ${inputClass} pr-8 appearance-none cursor-pointer`}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                        </div>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm text-white/60">Order</span>
                        <input
                            type="number"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(Number(e.target.value))}
                            className={inputClass}
                        />
                    </label>
                </div>
            </div>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-white/60">Summary</span>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                    required
                    className={inputClass}
                />
            </label>

            <ListEditor
                label="What you'll do (responsibilities)"
                items={responsibilities}
                onChange={setResponsibilities}
            />
            <ListEditor
                label="What you'll bring (requirements)"
                items={requirements}
                onChange={setRequirements}
            />

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded bg-gold px-4 py-2 text-black font-medium disabled:opacity-50"
                >
                    {isPending ? "Saving..." : "Save"}
                </button>
                {onDelete && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="ml-auto rounded border border-red-400/40 px-4 py-2 text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}

function ListEditor({
    label,
    items,
    onChange,
}: {
    label: string;
    items: string[];
    onChange: (next: string[]) => void;
}) {
    function update(index: number, value: string) {
        onChange(items.map((item, i) => (i === index ? value : item)));
    }

    function remove(index: number) {
        onChange(items.filter((_, i) => i !== index));
    }

    function move(index: number, direction: -1 | 1) {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    }

    return (
        <div className="space-y-2">
            <span className="text-sm text-white/60">{label}</span>
            {items.map((item, i) => (
                <div key={i} className="flex gap-2">
                    <textarea
                        value={item}
                        onChange={(e) => update(i, e.target.value)}
                        rows={2}
                        className="flex-1 rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                    <div className="flex flex-col justify-center gap-1 text-xs text-white/50">
                        <button type="button" onClick={() => move(i, -1)} className="hover:text-white">
                            ↑
                        </button>
                        <button type="button" onClick={() => move(i, 1)} className="hover:text-white">
                            ↓
                        </button>
                        <button type="button" onClick={() => remove(i)} className="hover:text-red-400">
                            ✕
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => onChange([...items, ""])}
                className="text-sm text-gold hover:underline"
            >
                + item
            </button>
        </div>
    );
}