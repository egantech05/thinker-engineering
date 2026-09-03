import { login } from "./actions";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;

    const errorMessages: Record<string, string> = {
        invalid_credentials: "Incorrect email or password.",
        too_many_attempts: "Too many attempts. Try again in a few minutes.",
    };

    return (
        <div className="flex flex-1 items-center justify-center">
            <form action={login} className="w-full max-w-sm space-y-4 p-8">
                <h1 className="text-xl font-medium text-white">CMS Login</h1>
                {error && (
                    <p className="text-sm text-red-400">
                        {errorMessages[error] ?? "Something went wrong."}
                    </p>
                )}
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white"
                />
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white"
                />
                <button
                    type="submit"
                    className="w-full rounded bg-gold px-3 py-2 text-black font-medium"
                >
                    Log in
                </button>
            </form>
        </div>
    );
}