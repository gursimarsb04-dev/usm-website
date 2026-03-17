import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "United Sikh Movement | Empowering Sikh Youth",
  description:
    "United Sikh Movement (USM) is a nonprofit dedicated to empowering Sikh youth through leadership development, community service, and professional growth. Connect with 39 university chapters (SSAs) across North America.",
  keywords:
    "United Sikh Movement, USM, Sikh youth, leadership, community service, SSA, Safal Summit, Camp Kudrat",
  authors: [{ name: "United Sikh Movement" }],
  openGraph: {
    title: "United Sikh Movement | Empowering Sikh Youth",
    description:
      "Empowering Sikh youth through leadership development, community service, and professional growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
