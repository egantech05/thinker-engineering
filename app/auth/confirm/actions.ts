"use server";

import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function confirmInvite(formData: FormData) {
    const token_hash = String(formData.get("token_hash") || "");
    const type = formData.get("type") as EmailOtpType | null;
    const next = String(formData.get("next") || "/cms");

    if (!token_hash || !type) {
        redirect("/cms/login?error=invalid_or_expired_link");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (error) {
        redirect("/cms/login?error=invalid_or_expired_link");
    }

    redirect(next);
}