import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thinker Engineering | Data Center Consultancy",
  description:
    "Transforming digitalization into resilient infrastructure. Data center design, audit, execution and maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ink text-white antialiased">{children}</body>
    </html>
  );
}