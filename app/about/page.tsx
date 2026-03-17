import { Metadata } from "next";
import { client } from "@/sanity/client";
import { teamMembersQuery, faqsQuery } from "@/sanity/queries";
import type { TeamMember, FAQ } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about United Sikh Movement — our mission, story, and the team behind America's largest Sikh student network.",
};

export const revalidate = 3600;

export default async function AboutPage() {
  const [teamMembers, faqs] = await Promise.all([
    client.fetch<TeamMember[]>(teamMembersQuery),
    client.fetch<FAQ[]>(faqsQuery),
  ]);

  const groups = teamMembers.reduce<Record<string, TeamMember[]>>((acc, member) => {
    const group = member.group || "Team";
    if (!acc[group]) acc[group] = [];
    acc[group].push(member);
    return acc;
  }, {});

  const faqCategories = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <>
      <section data-section="origin-story">
        <h1>Our Story</h1>
      </section>

      <section data-section="mission">
        <h2>Our Mission</h2>
        <p>
          Sikh students don&apos;t have to choose between success and spirituality.
          They need mentorship from Sikhs across fields like tech, finance, consulting,
          and medicine, alongside spiritual grounding that makes their identity a strength.
        </p>
      </section>

      <section data-section="team">
        {Object.entries(groups).map(([groupName, members]) => (
          <div key={groupName} data-team-group={groupName}>
            <h3>{groupName}</h3>
            {members.map((member) => (
              <div key={member._id} data-team-member>
                <span>{member.name}</span>
                <span>{member.role}</span>
                <p>{member.bio}</p>
                {member.linkedinUrl && <a href={member.linkedinUrl}>LinkedIn</a>}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section data-section="faq">
        {Object.entries(faqCategories).map(([category, items]) => (
          <div key={category} data-faq-category={category}>
            <h3>{category}</h3>
            {items.map((faq) => (
              <details key={faq._id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
