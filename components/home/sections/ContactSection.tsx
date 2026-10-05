"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import { contact } from "@/lib/data";

export default function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        website: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (status !== "idle" && status !== "sending") setStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setErrorMsg(data.error ?? "Something went wrong. Please try again.");
                setStatus("error");
                return;
            }

            setForm({ name: "", email: "", phone: "", company: "", message: "", website: "" });
            setStatus("sent");
        } catch {
            setErrorMsg("Network error. Please check your connection and try again.");
            setStatus("error");
        }
    };

    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    };
    const inputClass =
        "w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30";

    return (
        <section id="contact" className="snap-section flex flex-col justify-between px-6 md:px-16 pt-28 pb-0">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-start flex-1">
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
                    className="text-4xl md:text-6xl font-medium text-gold leading-tight"
                >
                    Let&apos;s talk
                    <br />
                    about
                    <br />
                    your project
                </motion.h2>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
                    }}
                    className="rounded-3xl bg-white/10 md:bg-white/5 md:backdrop-blur-sm border border-white/10 p-8 md:p-10"
                >
                    <motion.h3
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                        }}
                        className="text-2xl font-semibold mb-2 text-center"
                    >
                        Contact Us
                    </motion.h3>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                        }}
                        className="text-sm text-mist text-center mb-1"
                    >
                        {contact.email}
                    </motion.p>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                        }}
                        className="text-sm text-mist text-center mb-6"
                    >
                        {contact.phones.join("  |  ")}
                    </motion.p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Honeypot — hidden from real users */}
                        <input
                            type="text"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="hidden"
                        />

                        <motion.input
                            variants={fieldVariants}
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className={inputClass}
                        />
                        <motion.input
                            variants={fieldVariants}
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={inputClass}
                        />
                        <motion.input
                            variants={fieldVariants}
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={inputClass}
                        />
                        <motion.input
                            variants={fieldVariants}
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company"
                            className={inputClass}
                        />
                        <motion.textarea
                            variants={fieldVariants}
                            name="message"
                            required
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Message"
                            rows={4}
                            className={inputClass}
                        />
                        <motion.button
                            variants={fieldVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full rounded-full bg-white/10 hover:bg-white/20 py-3 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "sending" ? "Sending..." : "Submit"}
                        </motion.button>

                        {status === "sent" && (
                            <p className="text-sm text-center text-gold" role="status">
                                Thank you! Your message has been sent. We&apos;ll be in touch soon.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-sm text-center text-red-400" role="alert">
                                {errorMsg}
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>

            <div className="mt-24 -mx-6 md:-mx-16">
                <Footer />
            </div>
        </section>
    );
}