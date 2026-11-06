import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Voter App | Zero Paper Waste Election Platform",
  description: "Eliminating roadside paper election waste by providing citizens with digital access to verified candidate affidavits, manifestos, and side-by-side policy comparisons.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
