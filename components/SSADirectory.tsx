"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass, CaretDown, Users, CalendarBlank } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/image";
import { getSSAConnectUrl } from "@/lib/utils";

export default function SSADirectory({ ssas, regions, states }: { ssas: any[], regions: string[], states: string[] }) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");

  const filteredSSAs = useMemo(() => {
    return ssas.filter((ssa) => {
      const matchSearch = ssa.university.toLowerCase().includes(search.toLowerCase()) || (ssa.name && ssa.name.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = regionFilter === "All" || ssa.region === regionFilter;
      const matchState = stateFilter === "All" || ssa.state === stateFilter;
      return matchSearch && matchRegion && matchState;
    });
  }, [ssas, search, regionFilter, stateFilter]);

  return (
    <div className="flex flex-col gap-12">
      {/* Filter Bar */}
      <div className="sticky top-28 z-30 bg-white/70 backdrop-blur-xl border border-off-white shadow-sm p-4 rounded-[2rem] flex flex-col md:flex-row gap-4">
        
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray w-5 h-5" />
          <input
            type="text"
            placeholder="Search by university name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy/5 rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-saffron transition-all border border-transparent focus:border-saffron/20 font-medium"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1 md:flex-none md:w-48">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-navy/5 rounded-full pl-5 pr-10 py-3 outline-none appearance-none focus:ring-2 focus:ring-saffron transition-all cursor-pointer font-medium"
            >
              <option value="All">All Regions</option>
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <CaretDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy pointer-events-none w-4 h-4" />
          </div>

          <div className="relative flex-1 md:flex-none md:w-48">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full bg-navy/5 rounded-full pl-5 pr-10 py-3 outline-none appearance-none focus:ring-2 focus:ring-saffron transition-all cursor-pointer font-medium"
            >
              <option value="All">All States</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <CaretDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy pointer-events-none w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredSSAs.length > 0 ? (
            filteredSSAs.map((ssa, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                key={ssa._id}
                className="group bg-navy/5 ring-1 ring-black/5 p-1.5 rounded-[2rem] flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] p-6 md:p-8 flex flex-col h-full relative overflow-hidden">
                  
                  {/* Decorative background circle */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-saffron/5 rounded-full blur-2xl group-hover:bg-saffron/10 transition-colors" />

                  <div className="flex items-start gap-4 mb-6 relative z-10">
                    {ssa.logo ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-warm-white border border-off-white shrink-0">
                        <Image
                          src={urlFor(ssa.logo).width(128).height(128).url()}
                          alt={ssa.university}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center shrink-0 font-display font-semibold text-xl">
                        {ssa.university.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-semibold text-xl md:text-2xl text-navy leading-tight mb-1">
                        {ssa.university}
                      </h3>
                      <p className="text-sm text-warm-gray flex items-center gap-1.5">
                        {ssa.city}, {ssa.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    <span className="rounded-full px-3 py-1 bg-navy/5 text-navy text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {ssa.memberCount || "50+"} Members
                    </span>
                    <span className="rounded-full px-3 py-1 bg-saffron/10 text-saffron text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5">
                      <CalendarBlank className="w-3.5 h-3.5" />
                      Est. {ssa.foundedYear || "2020"}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 relative z-10">
                    <Link
                      href={`/ssa/${ssa.slug?.current || ssa.slug}`}
                      className="w-full py-3 rounded-full border border-off-white text-navy font-medium text-center hover:border-navy hover:bg-navy/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                    >
                      View Details
                    </Link>
                    <a
                      href={getSSAConnectUrl(ssa)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-full bg-saffron text-navy font-medium text-center hover:bg-saffron-light active:scale-[0.98] transition-all outline-none focus-visible:ring-2 focus-visible:ring-navy"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-navy/5 rounded-[2rem] border border-dashed border-warm-gray/30"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Users className="w-8 h-8 text-warm-gray" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-navy mb-2">No SSAs found in this area yet</h3>
              <p className="text-slate-body max-w-md mb-6">
                There doesn't seem to be a registered Sikh Student Association matching your current filters.
              </p>
              <a
                href="mailto:contact@unitedsikhmovement.org"
                className="bg-navy text-white px-6 py-3 rounded-full font-medium hover:bg-navy-deep transition-all"
              >
                Want to start one?
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
