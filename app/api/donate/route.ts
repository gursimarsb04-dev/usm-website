import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, frequency, donorEmail } = body;

    if (!amount || typeof amount !== "number" || amount < 1 || amount > 50_000) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!["one-time", "monthly"].includes(frequency)) {
      return NextResponse.json({ error: "Invalid frequency" }, { status: 400 });
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (frequency === "monthly") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: donorEmail || undefined,
        line_items: [
          {
            price_data: {
              currency: "usd",
              recurring: { interval: "month" },
              product_data: { name: "Monthly Donation to United Sikh Movement" },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/donate`,
      });

      return NextResponse.json({ url: session.url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: donorEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Donation to United Sikh Movement" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
