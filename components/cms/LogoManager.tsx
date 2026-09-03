"use client";

import { useState, useTransition } from "react";
import ImageUploader from "./ImageUploader";
import { addLogo, deleteLogo } from "@/app/cms/logos/actions";
import type { Logo, LogoCategory } from "@/lib/logos";

export default function LogoManager({
    category,
    title,
    initialLogos,
}: {
    category: LogoCategory;
    title: string;
    initialLogos: Logo[];
}) {
    const [logos, setLogos] = useState(initialLogos);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    function handleAdd() {
        if (!image) {
            setError("Upload an image first.");
            return;
        }
        setError(null);
        startTransition(async () => {
            const result = await addLogo(category, name, image);
            if (result?.error) {
                setError(result.error);
                return;
            }
            if (result?.logo) {
                setLogos((prev) => [...prev, result.logo]);
            }
            setName("");
            setImage("");
        });
    }

    function handleDelete(id: string, logoName: string) {
        if (!window.confirm(`Remove "${logoName || "this logo"}"? This can't be undone.`)) {
            return;
        }
        setLogos((prev) => prev.filter((l) => l.id !== id));
        startTransition(async () => {
            await deleteLogo(id);
        });
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">{title}</h2>

            <div className="flex flex-wrap gap-4">
                {logos.map((logo) => (
                    <div
                        key={logo.id}
                        className="relative flex h-14 shrink-0 items-center justify-center rounded border border-white/10 p-3"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.image} alt={logo.name} className="h-full w-auto object-contain" />
                        <button
                            type="button"
                            onClick={() => handleDelete(logo.id, logo.name)}
                            className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs text-white hover:bg-red-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {logos.length === 0 && <p className="text-sm text-white/40">No logos yet.</p>}
            </div>

            <div className="h-28 w-28">
                <ImageUploader
                    value={image}
                    onChange={setImage}
                    accept="image/png,image/svg+xml"
                    showUrlInput={false}
                    dragAndDrop
                    compact
                />
            </div>

            {image && (
                <div className="flex flex-wrap items-end gap-3 rounded border border-white/10 p-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm text-white/60">Name (optional)</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded border border-white/20 bg-transparent px-3 py-2 text-white"
                        />
                    </label>
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={isPending}
                        className="rounded bg-gold px-4 py-2 font-medium text-black disabled:opacity-50"
                    >
                        {isPending ? "Adding..." : "Add logo"}
                    </button>
                </div>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
}