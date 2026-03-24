import type { SanityImage } from "@/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Only create the image builder when Sanity is configured
let builder: any = null;

if (projectId) {
  // Dynamic import to avoid module-level crash when projectId is missing
  const imageUrlBuilder = require("@sanity/image-url").default;
  const { createClient } = require("next-sanity");
  const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true });
  builder = imageUrlBuilder(client);
}

export function urlFor(source: SanityImage) {
  if (!builder) {
    // Return a dummy builder that produces placeholder images
    return {
      width: () => ({ height: () => ({ url: () => "https://picsum.photos/600/400" }) }),
      height: () => ({ url: () => "https://picsum.photos/600/400" }),
      url: () => "https://picsum.photos/600/400",
      image: () => ({ url: () => "https://picsum.photos/600/400" }),
    } as any;
  }
  return builder.image(source);
}
