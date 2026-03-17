import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export async function GET() {
  try {
    const settings = await client.fetch(siteSettingsQuery);
    const goal = settings?.donationGoal || 0;

    const stripe = getStripe();
    let total = 0;
    const charges = await stripe.charges.list({ limit: 100 });

    for (const charge of charges.data) {
      if (charge.paid && !charge.refunded) {
        total += charge.amount;
      }
    }

    return NextResponse.json(
      { total, goal, currency: "usd" as const },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } }
    );
  } catch (error) {
    console.error("Donation progress error:", error);
    return NextResponse.json({ total: 0, goal: 0, currency: "usd" as const }, { status: 500 });
  }
}
