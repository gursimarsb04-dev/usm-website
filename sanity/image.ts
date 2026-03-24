import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import type { SanityImage } from "@/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

let _builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getBuilder() {
  if (!_builder && projectId) {
    _builder = imageUrlBuilder(client as any);
  }
  return _builder;
}

export function urlFor(source: SanityImage) {
  const builder = getBuilder();
  if (!builder) {
    // Fallback proxy that returns placeholder URLs for any chain
    const placeholder = "https://picsum.photos/600/400";
    const chain: any = new Proxy({}, {
      get: (_target, prop) => {
        if (prop === "url") return () => placeholder;
        return () => chain;
      },
    });
    return chain;
  }
  return builder.image(source);
}
