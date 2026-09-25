// Client-side conversion tracking for GA4 + Google Ads (Ad Grants requires
// conversion tracking, and Smart Bidding optimizes toward these events).
// No-ops when the gtag snippet isn't loaded (IDs unset, or blocked by the
// visitor's browser) — tracking must never break a signup.
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackSignup(source: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'sign_up', { method: 'newsletter', source });
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL;
  if (adsId && label) window.gtag('event', 'conversion', { send_to: `${adsId}/${label}` });
}
