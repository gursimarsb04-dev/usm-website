import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { upcomingEventsQuery, pastEventsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 600;

export default async function EventsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const isPast = searchParams.tab === "past";
  
  const events = await client.fetch(isPast ? pastEventsQuery : upcomingEventsQuery) || [];

  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">Community Hub</span>
          <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter text-white leading-[1.05]">
            USM Events
          </h1>
          <p className="font-body text-xl text-white/80 max-w-2xl">
            Join retreats, workshops, and social gatherings across the country.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-12 bg-warm-white flex-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-off-white pb-4">
            <Link 
              href="/events" 
              className={`text-lg font-medium transition-colors ${!isPast ? "text-navy border-b-[3px] border-navy pb-[17px] -mb-[19px]" : "text-warm-gray hover:text-navy"}`}
            >
              Upcoming
            </Link>
            <Link 
              href="/events?tab=past" 
              className={`text-lg font-medium transition-colors ${isPast ? "text-navy border-b-[3px] border-navy pb-[17px] -mb-[19px]" : "text-warm-gray hover:text-navy"}`}
            >
              Past
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? events.map((e: any) => (
               <div key={e._id} className="group bg-navy/5 ring-1 ring-black/5 p-1.5 rounded-[2rem] flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col h-full overflow-hidden">
                  <div className="aspect-[16/9] w-full bg-warm-gray/20 relative overflow-hidden">
                    {e.coverImage ? (
                      <Image src={urlFor(e.coverImage).width(600).height(340).url()} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                       <Image src={`https://picsum.photos/seed/${e._id}/600/340`} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-navy flex items-center gap-1.5 shadow-sm">
                       <CalendarBlank weight="bold" />
                       {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron mb-3">{e.eventType}</span>
                    <h3 className="font-display font-semibold text-2xl text-navy mb-3 line-clamp-2 leading-tight">{e.title}</h3>
                    {e.hostedBy && (
                      <p className="text-sm font-medium text-navy/70 mb-4">Hosted by {e.hostedBy.name}</p>
                    )}
                    <div className="text-sm text-warm-gray flex items-center gap-2 mt-auto">
                      <MapPin weight="fill" className="text-warm-gray/70 w-4 h-4 shrink-0" />
                      <span className="line-clamp-1">{e.location}</span>
                    </div>
                    <a href={e.eventbriteUrl || `/events/${e.slug?.current || e.slug}`} className="mt-8 w-full py-3.5 rounded-full border border-off-white text-navy font-medium text-center hover:border-navy hover:bg-navy/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-saffron">
                      {isPast ? "View Recap" : "Details & Registration"}
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-24 flex flex-col items-center text-center bg-navy/5 rounded-[2rem] border border-dashed border-warm-gray/30">
                <CalendarBlank className="w-12 h-12 text-warm-gray mb-4" />
                <h3 className="font-display font-semibold text-2xl text-navy mb-2">No {isPast ? "past" : "upcoming"} events found</h3>
                <p className="text-slate-body">Check back later or join our newsletter to stay updated.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
