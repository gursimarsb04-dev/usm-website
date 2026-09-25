// Loads gtag.js for GA4 (always) and Google Ads (when its ID is configured).
// Both are public IDs, safe to ship in client code.
import Script from 'next/script';

export default function Analytics() {
  // USM's GA4 property; env var overrides (e.g. to point previews elsewhere).
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-YNXL23V85V';
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
