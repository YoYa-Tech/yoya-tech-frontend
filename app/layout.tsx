import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollRevealProvider } from "@/components/ui/scroll-reveal-provider";

export const metadata: Metadata = {
  title: "Kuru Labs | Software, Web, Automation & AI in Addis Ababa",
  description:
    "Kuru Labs builds websites, web and mobile apps, workflow automation and AI agents for startups and growing businesses, from Addis Ababa, Ethiopia.",
  keywords: [
    "Software Engineering Addis Ababa",
    "Web Development Ethiopia",
    "Workflow Automation",
    "AI Agents",
    "Next.js Development",
    "Flutter Apps",
  ],
  authors: [{ name: "Kuru Labs" }],
  icons: {
    icon: "/kuru/images/mark-green.svg",
    shortcut: "/kuru/images/mark-green.svg",
    apple: "/kuru/images/mark-green.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/kuru/images/mark-green.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-bg-canvas text-text-secondary antialiased selection:bg-accent selection:text-black">
        <ScrollRevealProvider>
          {children}
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
