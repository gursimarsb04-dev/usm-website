import { Metadata } from "next";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your generous donation to United Sikh Movement.",
};

export default async function DonateThankYouPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  let donationAmount: string | null = null;

  if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
      if (session.amount_total) {
        donationAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "usd",
        }).format(session.amount_total / 100);
      }
    } catch {
      // Session not found or expired
    }
  }

  return (
    <section data-section="thank-you">
      <h1>Thank You for Your Generosity</h1>
      {donationAmount && <p>Your donation of {donationAmount} makes a difference.</p>}
      <p>
        A tax receipt has been sent to your email. Your support funds events,
        mentorship, and resources for Sikh students across America.
      </p>

      <nav data-section="share">
        <p>Spread the word:</p>
        <a href="https://twitter.com/intent/tweet?text=I%20just%20donated%20to%20United%20Sikh%20Movement%21&url=https://unitedsikh.org/donate" target="_blank" rel="noopener noreferrer">Share on X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://unitedsikh.org/donate" target="_blank" rel="noopener noreferrer">Share on Facebook</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://unitedsikh.org/donate" target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
      </nav>

      <nav data-section="next-actions">
        <a href="/ssa">Find an SSA</a>
        <a href="/events">Upcoming Events</a>
        <a href="/">Back to Home</a>
      </nav>
    </section>
  );
}
