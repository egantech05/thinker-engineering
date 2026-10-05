import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(apiKey);

export const EMAIL_FROM =
    process.env.RESEND_FROM_EMAIL ?? "Thinker Engineering Website <noreply@thinker.digital>";

export const EMAIL_TO = {
    contact: process.env.CONTACT_TO_EMAIL ?? "sales@thinker.digital",
    career: process.env.CAREER_TO_EMAIL ?? "sales@thinker.digital",
};

export function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function emailRows(rows: [label: string, value: string][]) {
    const body = rows
        .filter(([, value]) => value.trim() !== "")
        .map(
            ([label, value]) => `
            <tr>
                <td style="padding:8px 16px 8px 0;color:#6b7280;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
                <td style="padding:8px 0;color:#111827;white-space:pre-wrap;">${escapeHtml(value)}</td>
            </tr>`
        )
        .join("");

    return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${body}</table>`;
}