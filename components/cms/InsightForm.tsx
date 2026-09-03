"use client";

import { useState, useTransition, type FormEvent } from "react";
import type { InsightBlock } from "@/lib/insights";
import type { InsightFormInput } from "@/app/cms/insights/actions";
import ImageUploader from "./ImageUploader";
import { ChevronDown } from "lucide-react";
type BlockKind = InsightBlock["kind"];

function emptyBlock(kind: BlockKind): InsightBlock {
    switch (kind) {
        case "paragraph":
            return { kind: "paragraph", text: "" };
        case "heading":
            return { kind: "heading", text: "" };
        case "list":
            return { kind: "list", items: [""] };
        case "quote":
            return { kind: "quote", text: "", attribution: "" };
        case "image":
            return { kind: "image", src: "", alt: "", caption: "" };
    }
}

type Props = {
    initial?: Partial<InsightFormInput>;
    onSave: (data: InsightFormInput) => Promise<{ error?: string } | void>;
};

export default function InsightForm({ initial, onSave }: Props) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [type, setType] = useState<"article" | "news">(initial?.type ?? "article");
    const [category, setCategory] = useState(initial?.category ?? "");
    const [date, setDate] = useState(
        initial?.date ?? new Date().toISOString().slice(0, 10)
    );
    const [title, setTitle] = useState(initial?.title ?? "");
    const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
    const [image, setImage] = useState(initial?.image ?? "");
    const [status, setStatus] = useState<"draft" | "published">(
        initial?.status ?? "draft"
    );
    const [blocks, setBlocks] = useState<InsightBlock[]>(initial?.body ?? []);

    function addBlock(kind: BlockKind) {
        setBlocks((prev) => [...prev, emptyBlock(kind)]);
    }

    function updateBlock(index: number, next: InsightBlock) {
        setBlocks((prev) => prev.map((b, i) => (i === index ? next : b)));
    }

    function removeBlock(index: number) {
        setBlocks((prev) => prev.filter((_, i) => i !== index));
    }

    function moveBlock(index: number, direction: -1 | 1) {
        setBlocks((prev) => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    }

    function handlePreview() {
        const payload = {
            slug: slug || "preview",
            type,
            category,
            date,
            title,
            excerpt,
            image,
            status,
            body: blocks,
        };
        sessionStorage.setItem("insight-preview", JSON.stringify(payload));
        window.open("/insights/preview", "_blank");
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
            const result = await onSave({
                slug,
                type,
                category,
                date,
                title,
                excerpt,
                image,
                status,
                body: blocks,
            });
            if (result?.error) {
                setError(result.error);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 text-white">
            {error && <p className="text-red-400">{error}</p>}

            <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Title</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Slug</span>
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        disabled={Boolean(initial)}
                        className="rounded border border-white/20 bg-transparent px-3 py-2 disabled:opacity-50"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Category</span>
                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Date</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Type</span>
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as "article" | "news")}
                            className="w-full rounded border border-white/20 bg-transparent px-3 py-2 pr-8 appearance-none cursor-pointer"
                        >
                            <option value="article">Article</option>
                            <option value="news">Company News</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    </div>
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Status</span>
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as "draft" | "published")
                            }
                            className="w-full rounded border border-white/20 bg-transparent px-3 py-2 pr-8 appearance-none cursor-pointer"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    </div>
                </label>
            </div>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-white/60">Short Description</span>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                    rows={2}
                    className="rounded border border-white/20 bg-transparent px-3 py-2"
                />
            </label>

            <ImageUploader label="Cover image" value={image} onChange={setImage} showUrlInput={false} />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Article body</h2>
                    <div className="flex gap-2 text-sm">
                        {(["paragraph", "heading", "list", "quote", "image"] as BlockKind[]).map(
                            (kind) => (
                                <button
                                    key={kind}
                                    type="button"
                                    onClick={() => addBlock(kind)}
                                    className="rounded border border-white/20 px-2 py-1 hover:bg-white/10"
                                >
                                    + {kind}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {blocks.map((block, index) => (
                    <BlockEditor
                        key={index}
                        block={block}
                        onChange={(next) => updateBlock(index, next)}
                        onRemove={() => removeBlock(index)}
                        onMoveUp={() => moveBlock(index, -1)}
                        onMoveDown={() => moveBlock(index, 1)}
                    />
                ))}
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded bg-gold px-4 py-2 text-black font-medium disabled:opacity-50"
                >
                    {isPending ? "Saving..." : "Save"}
                </button>
                <button
                    type="button"
                    onClick={handlePreview}
                    className="rounded border border-white/20 px-4 py-2 font-medium hover:bg-white/10"
                >
                    Preview
                </button>
            </div>
        </form>
    );
}

function BlockEditor({
    block,
    onChange,
    onRemove,
    onMoveUp,
    onMoveDown,
}: {
    block: InsightBlock;
    onChange: (next: InsightBlock) => void;
    onRemove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}) {
    return (
        <div className="rounded border border-white/10 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-white/50">
                <span className="uppercase tracking-wide">{block.kind}</span>
                <div className="flex gap-2">
                    <button type="button" onClick={onMoveUp} className="hover:text-white">
                        ↑
                    </button>
                    <button type="button" onClick={onMoveDown} className="hover:text-white">
                        ↓
                    </button>
                    <button type="button" onClick={onRemove} className="hover:text-red-400">
                        Remove
                    </button>
                </div>
            </div>

            {block.kind === "paragraph" && (
                <textarea
                    value={block.text}
                    onChange={(e) => onChange({ ...block, text: e.target.value })}
                    rows={3}
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
                />
            )}

            {block.kind === "heading" && (
                <input
                    value={block.text}
                    onChange={(e) => onChange({ ...block, text: e.target.value })}
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
                />
            )}

            {block.kind === "quote" && (
                <div className="space-y-2">
                    <textarea
                        value={block.text}
                        onChange={(e) => onChange({ ...block, text: e.target.value })}
                        rows={2}
                        placeholder="Quote text"
                        className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                    <input
                        value={block.attribution ?? ""}
                        onChange={(e) =>
                            onChange({ ...block, attribution: e.target.value })
                        }
                        placeholder="Attribution (optional)"
                        className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                </div>
            )}

            {block.kind === "list" && (
                <div className="space-y-2">
                    {block.items.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                value={item}
                                onChange={(e) => {
                                    const items = [...block.items];
                                    items[i] = e.target.value;
                                    onChange({ ...block, items });
                                }}
                                className="flex-1 rounded border border-white/20 bg-transparent px-3 py-2"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const items = block.items.filter((_, idx) => idx !== i);
                                    onChange({ ...block, items });
                                }}
                                className="text-white/50 hover:text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => onChange({ ...block, items: [...block.items, ""] })}
                        className="text-sm text-gold hover:underline"
                    >
                        + item
                    </button>
                </div>
            )}

            {block.kind === "image" && (
                <div className="space-y-2">
                    <ImageUploader value={block.src} onChange={(src) => onChange({ ...block, src })} />
                    <input
                        value={block.alt ?? ""}
                        onChange={(e) => onChange({ ...block, alt: e.target.value })}
                        placeholder="Alt text"
                        className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                    <input
                        value={block.caption ?? ""}
                        onChange={(e) => onChange({ ...block, caption: e.target.value })}
                        placeholder="Caption (optional)"
                        className="w-full rounded border border-white/20 bg-transparent px-3 py-2"
                    />
                </div>
            )}
        </div>
    );
}