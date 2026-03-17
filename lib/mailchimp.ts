const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID!;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;

interface SubscribeParams {
  email: string;
  firstName?: string;
}

export async function subscribeToMailchimp({ email, firstName }: SubscribeParams) {
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      merge_fields: firstName ? { FNAME: firstName } : {},
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    if (data.title === "Member Exists") {
      return { success: false, error: "Already subscribed" };
    }
    return { success: false, error: "Subscription failed" };
  }

  return { success: true };
}
