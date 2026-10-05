import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO, emailRows, isValidEmail } from "@/lib/email";

export const runtime = "nodejs";

type ContactPayload = {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    message?: string;
    website?: string; // honeypot — real users never fill this in
};

const LIMITS = { name: 100, email: 200, phone: 40, company: 150, message: 5000 };

export async function POST(request: Request) {
    let body: ContactPayload;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: pretend it worked so bots don't retry
    if (body.website) {
        return NextResponse.json({ ok: true });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const company = (body.company ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Please fill in your name, email and message." },
            { status: 400 }
        );
    }
    if (!isValidEmail(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (
        name.length > LIMITS.name ||
        email.length > LIMITS.email ||
        phone.length > LIMITS.phone ||
        company.length > LIMITS.company ||
        message.length > LIMITS.message
    ) {
        return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO.contact,
        replyTo: email,
        subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
        html: `
            <h2 style="font-family:Arial,sans-serif;color:#111827;">New website enquiry</h2>
            ${emailRows([
            ["Name", name],
            ["Email", email],
            ["Phone", phone],
            ["Company", company],
            ["Message", message],
        ])}
        `,
        text: [
            `Name: ${name}`,
            `Email: ${email}`,
            ...(phone ? [`Phone: ${phone}`] : []),
            ...(company ? [`Company: ${company}`] : []),
            "",
            message,
        ].join("\n"),
    });

    if (error) {
        console.error("Resend contact error:", error);
        return NextResponse.json(
            { error: "Sorry, we couldn't send your message. Please try again or email us directly." },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}