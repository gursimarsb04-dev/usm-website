import type { Metadata } from 'next';
import { Bricolage_Grotesque, Albert_Sans } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Albert_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: { default: 'United Sikh Movement', template: '%s · United Sikh Movement' },
  description:
    "America's largest Sikh student network — helping Sikh youth excel professionally, personally, and spiritually across 40 active chapters nationwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ScrollProgress />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
