import { Metadata } from "next";
import { client } from "@/sanity/client";
import { allSSAsQuery } from "@/sanity/queries";
import type { SSA } from "@/types";

export const metadata: Metadata = {
  title: "Find an SSA",
  description: "Find a Sikh Student Association near you. Browse SSAs across the country by region, state, or school name.",
};

export const revalidate = 3600;

export default async function SSADirectoryPage() {
  const ssas = await client.fetch<SSA[]>(allSSAsQuery);
  const regions = [...new Set(ssas.map((s) => s.region))].sort();
  const states = [...new Set(ssas.map((s) => s.state))].sort();

  return (
    <>
      <section data-section="ssa-header">
        <h1>Find an SSA</h1>
        <p>Connect with a Sikh Student Association at your school or in your area.</p>
      </section>

      {/*
        SSADirectory Client Component — receives all data as props for client-side filtering.
        Antigravity will build this component with filter UI and grid layout.
        Props: { ssas: SSA[], regions: string[], states: string[] }
      */}

      <section data-section="ssa-grid">
        {ssas.length === 0 ? (
          <div data-empty-state>
            <p>No SSAs found. Want to start one?</p>
            <a href="mailto:contact@unitedsikh.org">Contact USM</a>
          </div>
        ) : (
          ssas.map((ssa) => (
            <a key={ssa._id} href={`/ssa/${ssa.slug.current}`} data-ssa-card>
              <span>{ssa.name}</span>
              <span>{ssa.university}</span>
              <span>{ssa.city}, {ssa.state}</span>
              {ssa.memberCount && <span>{ssa.memberCount} members</span>}
            </a>
          ))
        )}
      </section>
    </>
  );
}
