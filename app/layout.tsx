import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollRevealProvider } from "@/components/ui/scroll-reveal-provider";

export const metadata: Metadata = {
  title: "YoYa Tech | Software, Web, Automation & AI in Addis Ababa & Rome",
  description:
    "YoYa Tech builds websites, web and mobile apps, workflow automation and AI agents for startups and growing businesses, operating from Addis Ababa and Rome.",
  keywords: [
    "Software Engineering Addis Ababa",
    "Software Engineering Rome",
    "Web Development Ethiopia",
    "Workflow Automation",
    "AI Agents",
    "Next.js Development",
    "Flutter Apps",
  ],
  authors: [{ name: "YoYa Tech" }],
  icons: {
    icon: "/yoya_tech_logos/SVG/onlylogo.svg",
    shortcut: "/yoya_tech_logos/SVG/onlylogo.svg",
    apple: "/yoya_tech_logos/PNG/onlylogo.png",
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
    <html lang="en" className="dark scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/yoya_tech_logos/SVG/onlylogo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&display=swap" rel="stylesheet" />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('vv-theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-bg-canvas text-text-secondary antialiased selection:bg-accent selection:text-black">
        <ScrollRevealProvider>
          {children}
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
