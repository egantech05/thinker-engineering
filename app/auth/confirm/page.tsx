import { redirect } from "next/navigation";
import { confirmInvite } from "./actions";

export default async function ConfirmPage({
    searchParams,
}: {
    searchParams: Promise<{ token_hash?: string; type?: string; next?: string }>;
}) {
    const { token_hash, type, next } = await searchParams;

    if (!token_hash || !type) {
        redirect("/cms/login?error=invalid_or_expired_link");
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <form action={confirmInvite} className="w-full max-w-sm space-y-4 p-8 text-center">
                <input type="hidden" name="token_hash" value={token_hash} />
                <input type="hidden" name="type" value={type} />
                <input type="hidden" name="next" value={next ?? "/cms"} />
                <h1 className="text-xl font-medium text-white">Confirm your invite</h1>
                <p className="text-sm text-white/60">
                    Click below to continue and set your password.
                </p>
                <button
                    type="submit"
                    className="w-full rounded bg-gold px-3 py-2 text-black font-medium"
                >
                    Continue
                </button>
            </form>
        </div>
    );
}