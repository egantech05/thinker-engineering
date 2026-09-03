"use client";

import { useRef, useState, type DragEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
    showUrlInput?: boolean;
    dragAndDrop?: boolean;
    compact?: boolean;
};

export default function ImageUploader({
    value,
    onChange,
    label,
    accept = "image/*",
    showUrlInput = true,
    dragAndDrop = false,
    compact = false,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function isAccepted(file: File) {
        const types = accept.split(",").map((t) => t.trim()).filter(Boolean);
        if (types.length === 0 || types.includes("image/*")) return true;
        return types.some((type) => {
            if (type.endsWith("/*")) return file.type.startsWith(type.replace("/*", "/"));
            if (type.startsWith(".")) return file.name.toLowerCase().endsWith(type.toLowerCase());
            return file.type === type;
        });
    }

    async function handleFile(file: File) {
        if (!isAccepted(file)) {
            setError(`File type not allowed. Accepted: ${accept}`);
            return;
        }

        setError(null);
        setIsUploading(true);

        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
            .from("thinker-images")
            .upload(path, file, { upsert: false });

        if (uploadError) {
            setError(uploadError.message);
            setIsUploading(false);
            return;
        }

        const { data } = supabase.storage
            .from("thinker-images")
            .getPublicUrl(path);

        onChange(data.publicUrl);
        setIsUploading(false);
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    }

    const fileInput = (
        <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
            }}
        />
    );

    if (compact) {
        return (
            <div className="relative h-full w-full">
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed p-2 text-center transition-colors ${isDragging ? "border-gold bg-gold/5" : "border-white/20"
                        }`}
                >
                    {fileInput}
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={value} alt="" className="max-h-full max-w-full object-contain" />
                    ) : isUploading ? (
                        <span className="text-xs text-white/50">Uploading…</span>
                    ) : (
                        <span className="text-3xl leading-none text-white/40">+</span>
                    )}
                </div>
                {error && (
                    <p className="absolute left-0 top-full z-10 mt-1 w-40 text-xs text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {label && <span className="text-sm text-white/60">{label}</span>}

            {value && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={value}
                    alt=""
                    className="h-32 w-full max-w-xs rounded object-cover border border-white/10"
                />
            )}

            {dragAndDrop ? (
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-2 rounded border border-dashed px-4 py-6 text-center transition-colors ${isDragging ? "border-gold bg-gold/5" : "border-white/20"
                        }`}
                >
                    {fileInput}
                    <p className="text-sm text-white/50">Drag and drop an image here, or</p>
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={isUploading}
                        className="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 disabled:opacity-50"
                    >
                        {isUploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    {fileInput}
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={isUploading}
                        className="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 disabled:opacity-50"
                    >
                        {isUploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
                    </button>
                    {showUrlInput && (
                        <input
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="or paste a URL"
                            className="flex-1 rounded border border-white/20 bg-transparent px-3 py-1.5 text-sm"
                        />
                    )}
                </div>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
}