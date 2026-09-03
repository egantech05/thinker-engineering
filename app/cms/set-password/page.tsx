import { setPassword } from "./actions";

export default async function SetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;

    const errorMessages: Record<string, string> = {
        too_short: "Password must be at least 8 characters.",
        mismatch: "Passwords do not match.",
        update_failed: "Something went wrong. Try the invite link again.",
    };

    return (
        <div className="flex flex-1 items-center justify-center">
            <form action={setPassword} className="w-full max-w-sm space-y-4 p-8">
                <h1 className="text-xl font-medium text-white">Set your password</h1>
                {error && (
                    <p className="text-sm text-red-400">
                        {errorMessages[error] ?? "Something went wrong."}
                    </p>
                )}
                <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="New password"
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white"
                />
                <input
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder="Confirm password"
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white"
                />
                <button
                    type="submit"
                    className="w-full rounded bg-gold px-3 py-2 text-black font-medium"
                >
                    Set password
                </button>
            </form>
        </div>
    );
}