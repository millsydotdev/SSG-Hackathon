import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s — SSG-Hackathon",
    default: "SSG-Hackathon — Collaborative Hackathon Platform",
  },
  description:
    "An invite-only collaborative workstation for hackathon teams. Manage participation, planning, development, submission, and judging.",
  icons: {
    icon: "/logo-192.png",
    apple: "/logo-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="text-body-sm font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
