import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/layout/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://thinker.digital"),
  title: "Thinker Engineering | Data Center Consultancy",
  description: "Powering The Future of Data Centers",
  openGraph: {
    title: "Thinker Engineering | Data Center Consultancy",
    description: "Powering The Future of Data Centers",
    url: "https://thinker.digital",
    siteName: "Thinker Engineering",
    locale: "en_MY",
    type: "website",
  },
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