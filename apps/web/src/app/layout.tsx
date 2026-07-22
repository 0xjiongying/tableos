import type { CSSProperties } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TableOS",
    template: "%s · TableOS",
  },
  description:
    "Quiet technology for the world’s finest tables — reservations, held funds, and settlement for premium dining.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={
        {
          "--tos-font-sans": "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
          "--tos-font-mono": "var(--font-geist-mono), ui-monospace, monospace",
        } as CSSProperties
      }
    >
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
