import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support United Sikh Movement. Your tax-deductible donation funds events, mentorship programs, and resources for Sikh students nationwide.",
};

export default function DonatePage() {
  return (
    <>
      <section data-section="donate-header">
        <h1>Support the Movement</h1>
        <p>
          Your donation funds events, mentorship programs, and resources for
          Sikh student organizations across America. United Sikh Movement is a
          501(c)(3) nonprofit — all donations are tax-deductible.
        </p>
      </section>

      <section data-section="donate-form">
        {/* DonationForm Client Component — Antigravity will build
            Preset amounts: $25, $50, $100, $250 + custom
            One-time / Monthly toggle
            POSTs to /api/donate, redirects to Stripe Checkout URL
            Donation progress bar fetches from /api/donation-progress */}
      </section>

      <section data-section="tax-info">
        <p>
          United Sikh Movement is a registered 501(c)(3) nonprofit organization.
          All donations are tax-deductible to the extent allowed by law.
          You will receive a receipt via email for your records.
        </p>
      </section>
    </>
  );
}
