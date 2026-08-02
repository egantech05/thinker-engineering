"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { contact } from "@/lib/data";

export default function ContactSection() {
    return (
        <section id="contact" className="snap-section flex flex-col justify-between bg-gradient-to-b from-black from-10% to-blue-dark/50 px-6 md:px-16 pt-28 pb-0">
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

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <motion.input
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                            }}
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30"
                        />
                        <motion.input
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                            }}
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30"
                        />
                        <motion.input
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                            }}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30"
                        />
                        <motion.input
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                            }}
                            type="text"
                            placeholder="Company"
                            className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30"
                        />
                        <motion.textarea
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                            }}
                            placeholder="Message"
                            rows={4}
                            className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-mist text-sm border border-white/10 focus:outline-none focus:border-white/30"
                        />
                        <motion.button
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full rounded-full bg-white/10 hover:bg-white/20 py-3 font-semibold text-sm transition-colors"
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </section>
    );
}