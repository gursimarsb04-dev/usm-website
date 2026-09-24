// Loads gtag.js for GA4 and/or Google Ads when their IDs are configured.
// Both are public IDs (NEXT_PUBLIC_*), so this renders nothing until someone
// sets them in Vercel — no tracking happens by default.
import Script from 'next/script';

export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const ids = [ga, ads].filter(Boolean) as string[];
  if (!ids.length) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${ids
          .map((id) => `gtag('config',${JSON.stringify(id)});`)
          .join('')}`}
      </Script>
    </>
  );
}
