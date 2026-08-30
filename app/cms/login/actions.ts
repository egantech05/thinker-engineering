"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key: string) {
    const now = Date.now();
    const record = attempts.get(key);
    if (!record || now > record.resetAt) {
        attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }
    record.count += 1;
    return record.count > MAX_ATTEMPTS;
}

export async function login(formData: FormData) {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    if (isRateLimited(email.toLowerCase())) {
        redirect("/cms/login?error=too_many_attempts");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        redirect("/cms/login?error=invalid_credentials");
    }

    redirect("/cms");
}