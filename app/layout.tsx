import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "United Sikh Movement",
    template: "%s | United Sikh Movement",
  },
  description:
    "America's largest Sikh student network. Connecting Sikh student organizations across the country to build unity, mentorship, and spiritual grounding.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "United Sikh Movement",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-saffron focus:text-navy"
        >
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
