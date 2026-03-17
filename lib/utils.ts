export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function getSSAConnectUrl(ssa: {
  websiteUrl?: string;
  contactEmail?: string;
}): string {
  if (ssa.websiteUrl) return ssa.websiteUrl;
  if (ssa.contactEmail) return `mailto:${ssa.contactEmail}`;
  return "#";
}

export function getSSAJoinUrl(ssa: {
  websiteUrl?: string;
  instagramUrl?: string;
  contactEmail?: string;
}): string {
  if (ssa.websiteUrl) return ssa.websiteUrl;
  if (ssa.instagramUrl) return ssa.instagramUrl;
  if (ssa.contactEmail) return `mailto:${ssa.contactEmail}`;
  return "#";
}
