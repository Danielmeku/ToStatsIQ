import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StatQuest Mini App",
  description: "Scenario-based statistical reasoning from basic stats to trade-offs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <main className="mx-auto max-w-xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
