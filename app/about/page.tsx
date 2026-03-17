import Image from "next/image";
import { client } from "@/sanity/client";
import { teamMembersQuery, faqsQuery } from "@/sanity/queries";
import TeamMemberCard from "@/components/TeamMemberCard";
import FAQAccordion from "@/components/FAQAccordion";

export const revalidate = 3600;

export default async function AboutPage() {
  const [teamMembers, faqs] = await Promise.all([
    client.fetch(teamMembersQuery) || [],
    client.fetch(faqsQuery) || []
  ]);

  // Group team members by group
  const groupedTeam = teamMembers.reduce((acc: any, member: any) => {
    const group = member.group || "Team";
    if (!acc[group]) acc[group] = [];
    acc[group].push(member);
    return acc;
  }, {});

  const groupOrder = ["Executive Board", "Regional Leads", "Advisors", "Team"];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-8 md:gap-12">
          <div className="max-w-4xl">
            <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter text-white leading-[1.05] mb-6">
              Empowering the Next Generation of Sikh Leaders.
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              We believe you don't have to choose between your career and your identity. Our mission is to provide the mentorship, resources, and spiritual grounding to help Sikh students excel.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story / Timeline */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-navy">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-32 self-start">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">Our Story</span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              From a vision in California to a nationwide movement.
            </h2>
            <p className="text-slate-body text-lg leading-relaxed">
              United Sikh Movement (USM) started with a simple realization: Sikh college students were navigating difficult academic and professional paths alone, often compromising their spiritual roots to fit in. We built this community to change that.
            </p>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-navy/10">
            {/* Timeline Items */}
            {[
              { year: "2016", title: "The Foundation", desc: "A small group of Sikh students in California came together to support each other's academic journeys while staying connected to Sikhi." },
              { year: "2018", title: "Regional Expansion", desc: "The model proved successful. SSAs across the West Coast began adopting the USM framework for mentorship and community building." },
              { year: "2020", title: "Going National", desc: "USM officially becomes a 501(c)(3) nonprofit, expanding programs to the Midwest, East Coast, and South, connecting thousands." },
              { year: "Today", title: "America's Largest Network", desc: "Supporting over 75+ active Sikh Student Associations with specialized mentorship rings, retreats, and leadership pipelines." }
            ].map((item, i) => (
              <div key={i} className="relative pl-16 pb-16 last:pb-0">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-cream border-4 border-navy/10 flex items-center justify-center shrink-0 shadow-sm z-10 transition-colors hover:border-saffron hover:bg-saffron/5">
                  <div className="w-3 h-3 rounded-full bg-saffron" />
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <span className="font-mono text-saffron font-bold text-xl">{item.year}</span>
                  <h3 className="font-display font-semibold text-2xl text-navy">{item.title}</h3>
                  <p className="text-slate-body leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-warm-white">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-20">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">Leadership</span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              Meet the Team
            </h2>
            <p className="text-slate-body text-lg">
              Dedicated professionals and students working together to build resources and opportunities for the next generation.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {groupOrder.map((group) => {
              const members = groupedTeam[group];
              if (!members || members.length === 0) return null;

              return (
                <div key={group} className="flex flex-col gap-10">
                  <h3 className="font-display font-medium text-3xl text-navy border-b border-off-white pb-4">
                    {group}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {members.map((member: any) => (
                      <TeamMemberCard key={member._id} member={member} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">Got Questions?</span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
