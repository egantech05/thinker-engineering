"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function setPassword(formData: FormData) {
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password.length < 8) {
        redirect("/cms/set-password?error=too_short");
    }

    if (password !== confirmPassword) {
        redirect("/cms/set-password?error=mismatch");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        redirect("/cms/set-password?error=update_failed");
    }

    redirect("/cms");
}