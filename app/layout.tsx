import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-warm-white text-slate-body antialiased selection:bg-saffron selection:text-navy">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-saffron focus:text-navy font-medium rounded-br-lg"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main-content" className="min-h-screen flex flex-col pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
