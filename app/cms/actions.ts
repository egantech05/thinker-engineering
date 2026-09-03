"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/cms/login");
}

export async function signOutToWebsite() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}

export async function generateAdminInviteLink(_prevState: unknown, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authorized" };
    }

    const email = String(formData.get("email") || "").trim();

    if (!email) {
        return { error: "Email is required" };
    }

    const admin = createAdminClient();

    const { data, error } = await admin.auth.admin.generateLink({
        type: "invite",
        email,
    });

    if (error) {
        return { error: error.message };
    }

    const tokenHash = data.properties?.hashed_token;

    if (!tokenHash) {
        return { error: "Could not generate invite link" };
    }

    const link = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?token_hash=${tokenHash}&type=invite&next=/cms/set-password`;

    return { link };
}