import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Mock client for when Sanity isn't configured — returns empty data
const mockFetch = async () => [];
const mockClient = { fetch: mockFetch } as any;

function buildClient(useCdn: boolean) {
  if (!projectId) return mockClient;
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn,
    token: process.env.SANITY_API_TOKEN,
  });
}

export const client = buildClient(true);
export const previewClient = buildClient(false);
