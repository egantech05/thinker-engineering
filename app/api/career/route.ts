import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO, emailRows, isValidEmail } from "@/lib/email";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 4 * 1024 * 1024; // stay under Vercel's 4.5 MB request limit
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const LIMITS = { name: 100, email: 200, phone: 40, portfolio: 300, position: 150, note: 5000 };

function field(data: FormData, key: string) {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
}

function safeFilename(original: string, applicant: string) {
    const ext = original.slice(original.lastIndexOf(".")).toLowerCase();
    const base = applicant
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 50);
    return `CV-${base || "applicant"}${ext}`;
}

export async function POST(request: Request) {
    let data: FormData;
    try {
        data = await request.formData();
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot
    if (field(data, "website")) {
        return NextResponse.json({ ok: true });
    }

    const name = field(data, "name");
    const email = field(data, "email");
    const phone = field(data, "phone");
    const portfolio = field(data, "portfolio");
    const position = field(data, "position") || "General Application";
    const note = field(data, "note");
    const cv = data.get("cv");

    if (!name || !email || !phone) {
        return NextResponse.json(
            { error: "Please fill in your name, email and phone number." },
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
        portfolio.length > LIMITS.portfolio ||
        position.length > LIMITS.position ||
        note.length > LIMITS.note
    ) {
        return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }

    if (!(cv instanceof File) || cv.size === 0) {
        return NextResponse.json({ error: "Please attach your CV." }, { status: 400 });
    }
    const ext = cv.name.slice(cv.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
            { error: "Please upload a PDF or Word document (.pdf, .doc, .docx)." },
            { status: 400 }
        );
    }
    if (cv.size > MAX_FILE_BYTES) {
        return NextResponse.json(
            { error: "That file is too large. Maximum size is 4 MB." },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await cv.arrayBuffer());

    const { error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO.career,
        replyTo: email,
        subject: `Job application: ${position} — ${name}`,
        html: `
            <h2 style="font-family:Arial,sans-serif;color:#111827;">New job application</h2>
            ${emailRows([
            ["Position", position],
            ["Name", name],
            ["Email", email],
            ["Phone", phone],
            ["LinkedIn / Portfolio", portfolio],
            ["About", note],
        ])}
            <p style="font-family:Arial,sans-serif;font-size:13px;color:#6b7280;margin-top:16px;">
                CV attached: ${cv.name.replace(/[<>&"']/g, "")}
            </p>
        `,
        text: [
            `Position: ${position}`,
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            ...(portfolio ? [`LinkedIn / Portfolio: ${portfolio}`] : []),
            ...(note ? ["", note] : []),
            "",
            `CV attached: ${cv.name}`,
        ].join("\n"),
        attachments: [
            {
                filename: safeFilename(cv.name, name),
                content: buffer,
            },
        ],
    });

    if (error) {
        console.error("Resend career error:", error);
        return NextResponse.json(
            { error: "Sorry, we couldn't submit your application. Please try again later." },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}