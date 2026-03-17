import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const baseConfig = {
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-01-01",
};

const realClient = createClient({ ...baseConfig, useCdn: true, token: process.env.SANITY_API_TOKEN });
const realPreviewClient = createClient({ ...baseConfig, useCdn: false, token: process.env.SANITY_API_TOKEN });

// When Sanity isn't configured, return a mock client that returns empty data
const mockFetch = async () => [];
const mockClient = { fetch: mockFetch } as unknown as typeof realClient;

export const client = projectId ? realClient : mockClient;
export const previewClient = projectId ? realPreviewClient : mockClient;
