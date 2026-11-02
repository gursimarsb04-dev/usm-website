// Client-side GA4 / Google Ads event tracking (Ad Grants requires conversion
// tracking, and Smart Bidding optimizes toward these events).
// Every call no-ops when gtag isn't loaded (blocked by the visitor's browser,
// or during local dev without the tag) — tracking must never break a form.
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  // Beacon transport so outbound-link events survive the page unloading.
  window.gtag('event', event, { ...params, transport_type: 'beacon' });
}

/** Newsletter form success (footer, /contact, blog posts). */
export function trackSignup(source: string) {
  track('newsletter_signup', { form_location: source });
  // Kept for the existing Google Ads conversion import, which was set up on
  // GA4's standard `sign_up` event. Remove once Ads imports newsletter_signup.
  track('sign_up', { method: 'newsletter', source });
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL;
  if (adsId && label && window.gtag) window.gtag('event', 'conversion', { send_to: `${adsId}/${label}` });
}
