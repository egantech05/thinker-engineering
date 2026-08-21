"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, FileText, Upload, X } from "lucide-react";
import { jobs } from "@/lib/jobs";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const inputClass =
    "w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30";
const labelClass = "block text-xs font-semibold tracking-wider text-mist uppercase mb-2";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ApplicationForm({
    position,
    onPositionChange,
}: {
    position: string;
    onPositionChange: (value: string) => void;
}) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        note: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        const ext = selected.name.slice(selected.name.lastIndexOf(".")).toLowerCase();
        if (!ACCEPTED_EXTENSIONS.includes(ext)) {
            setError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
            resetFileInput();
            return;
        }
        if (selected.size > MAX_FILE_BYTES) {
            setError("That file is too large. Maximum size is 5 MB.");
            resetFileInput();
            return;
        }

        setError(null);
        setFile(selected);
    };

    const clearFile = () => {
        setFile(null);
        resetFileInput();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setError("Please attach your CV before submitting.");
            return;
        }
        setError(null);

        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("phone", form.phone);
        data.append("portfolio", form.portfolio);
        data.append("note", form.note);
        data.append("position", position || "General Application");
        data.append("cv", file);

        // ---------------------------------------------------------------
        // TODO: BACKEND NOT WIRED YET. Nothing leaves the browser.
        // When Resend is ready, replace the two lines below with:
        //   const res = await fetch("/api/career", { method: "POST", body: data });
        // (and make handleSubmit async, plus add a "submitting" state).
        // ---------------------------------------------------------------
        console.log("Career application captured locally:", [...data.entries()]);
        setSubmitted(true);
    };

    const startOver = () => {
        setForm({ name: "", email: "", phone: "", portfolio: "", note: "" });
        onPositionChange("");
        clearFile();
        setSubmitted(false);
    };

    return (
        <section id="apply" className="px-6 md:px-16 pb-28 md:pb-36 scroll-mt-28">
            <div className="max-w-3xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-medium">Submit your CV</h2>
                    <p className="mt-4 text-mist leading-relaxed max-w-xl mx-auto">
                        Apply for a listed role, or send us a general application and we will
                        keep you in mind as new positions open up.
                    </p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="rounded-3xl bg-white/10 md:bg-white/5 md:backdrop-blur-sm border border-white/10 p-8 md:p-12 text-center"
                    >
                        <CheckCircle2 size={44} className="text-gold mx-auto mb-5" />
                        <h3 className="text-2xl font-semibold mb-3">
                            Thank you, {form.name.split(" ")[0] || "there"}
                        </h3>
                        <p className="text-mist leading-relaxed max-w-md mx-auto">
                            Your application for{" "}
                            <span className="text-white">{position || "a general role"}</span>{" "}
                            has been recorded. Our team reviews every submission and will reach
                            out if there is a fit.
                        </p>

                        {/* DEV NOTICE — delete this block once /api/career is live */}
                        <p className="mt-6 mx-auto max-w-md rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-xs text-gold-light">
                            Demo only: no backend is connected yet, so nothing was actually sent.
                            The payload was logged to the browser console.
                        </p>

                        <button
                            type="button"
                            onClick={startOver}
                            className="mt-8 text-sm text-mist hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
                        >
                            Submit another application
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                        }}
                        onSubmit={handleSubmit}
                        className="rounded-3xl bg-white/10 md:bg-white/5 md:backdrop-blur-sm border border-white/10 p-8 md:p-10 space-y-5"
                    >
                        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="phone" className={labelClass}>
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+60 12 345 6789"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="position" className={labelClass}>
                                    Position
                                </label>
                                <select
                                    id="position"
                                    name="position"
                                    value={position}
                                    onChange={(e) => onPositionChange(e.target.value)}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" className="bg-panel text-white">
                                        General Application
                                    </option>
                                    {jobs.map((job) => (
                                        <option
                                            key={job.key}
                                            value={job.title}
                                            className="bg-panel text-white"
                                        >
                                            {job.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <label htmlFor="portfolio" className={labelClass}>
                                LinkedIn or portfolio <span className="normal-case">(optional)</span>
                            </label>
                            <input
                                id="portfolio"
                                name="portfolio"
                                type="url"
                                value={form.portfolio}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/yourname"
                                className={inputClass}
                            />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <label htmlFor="note" className={labelClass}>
                                Tell us about yourself <span className="normal-case">(optional)</span>
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                rows={4}
                                value={form.note}
                                onChange={handleChange}
                                placeholder="A short note on your experience and why you are interested."
                                className={inputClass}
                            />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <p className={labelClass}>Resume / CV</p>
                            <input
                                ref={fileInputRef}
                                id="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {file ? (
                                <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/10 px-4 py-3">
                                    <FileText size={18} className="text-gold shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm truncate">{file.name}</p>
                                        <p className="text-xs text-mist">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        aria-label="Remove attached file"
                                        className="shrink-0 rounded p-1 text-mist hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="cv"
                                    className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-white/20 hover:border-white/40 bg-white/5 px-4 py-8 cursor-pointer transition-colors"
                                >
                                    <Upload size={20} className="text-mist" />
                                    <span className="text-sm">Click to upload your CV</span>
                                    <span className="text-xs text-mist">PDF or Word, up to 5 MB</span>
                                </label>
                            )}
                        </motion.div>

                        {error && (
                            <p className="text-sm text-red-400" role="alert">
                                {error}
                            </p>
                        )}

                        <motion.button
                            variants={fadeUp}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="w-full rounded-full bg-gold hover:bg-gold-light text-ink py-3.5 font-semibold text-sm transition-colors cursor-pointer"
                        >
                            Submit application
                        </motion.button>

                        <p className="text-xs text-mist text-center">
                            By submitting, you consent to Thinker Engineering storing your details
                            for recruitment purposes.
                        </p>
                    </motion.form>
                )}
            </div>
        </section>
    );
}
