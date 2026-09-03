"use client";

import { useActionState, useState } from "react";
import { generateAdminInviteLink } from "@/app/cms/actions";

type State = { error?: string; link?: string };

export default function AdminInviteForm() {
    const [state, formAction, isPending] = useActionState<State, FormData>(
        generateAdminInviteLink,
        {}
    );
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        if (!state.link) return;
        await navigator.clipboard.writeText(state.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="max-w-lg space-y-6">
            <form action={formAction} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="New admin's email"
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded bg-gold px-4 py-2 text-black font-medium disabled:opacity-50"
                >
                    {isPending ? "Generating..." : "Generate invite link"}
                </button>
            </form>

            {state.error && <p className="text-sm text-red-400">{state.error}</p>}

            {state.link && (
                <div className="space-y-2">
                    <p className="text-sm text-white/60">
                        Send this link to the new admin. It only works once.
                    </p>
                    <div className="flex gap-2">
                        <input
                            readOnly
                            value={state.link}
                            onFocus={(e) => e.target.select()}
                            className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white"
                        />
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="shrink-0 rounded border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}