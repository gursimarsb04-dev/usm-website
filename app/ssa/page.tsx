import { client } from "@/sanity/client";
import { allSSAsQuery } from "@/sanity/queries";
import SSADirectory from "@/components/SSADirectory";

export const revalidate = 3600;

export default async function SSAPage() {
  const ssas = await client.fetch(allSSAsQuery) || [];
  
  const regions = Array.from(new Set(ssas.map((s: any) => s.region).filter(Boolean))).sort() as string[];
  const states = Array.from(new Set(ssas.map((s: any) => s.state).filter(Boolean))).sort() as string[];

  return (
    <div className="flex flex-col w-full bg-warm-white min-h-[100dvh]">
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 bg-navy text-white relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-6 text-center items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">Directory</span>
          <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter text-white leading-[1.05]">
            Find Your Community
          </h1>
          <p className="font-body text-xl text-white/80 max-w-2xl">
            Explore {ssas.length} active Sikh Student Associations across {states.length} states. Connect with your local chapter or get resources to start one.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SSADirectory ssas={ssas} regions={regions} states={states} />
        </div>
      </section>
    </div>
  );
}
