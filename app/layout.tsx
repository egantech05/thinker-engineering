import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/layout/LoadingScreen";

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
      <body className="bg-gradient-to-b from-black from-10% to-blue-dark/50 text-white antialiased">
        <LoadingScreen>{children}</LoadingScreen>
      </body>
    </html>
  );
}