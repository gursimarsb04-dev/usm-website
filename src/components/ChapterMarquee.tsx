// Proof of scale you can feel: chapter names scrolling under the hero.
// Pure CSS animation; pauses for prefers-reduced-motion.
const chapters = [
  'USC', 'UCSB', 'UC Irvine', 'UCLA', 'San José State', 'UC Davis', 'Berkeley',
  'Rutgers', 'Columbia', 'Stony Brook', 'UMich', 'UIC', 'UT Austin',
  'Fresno State', 'Sac State', 'UC Riverside', 'CSU East Bay',
];

export default function ChapterMarquee() {
  const row = [...chapters, ...chapters]; // duplicate for seamless loop
  return (
    <div className="bg-teal-ink py-4 overflow-hidden border-y border-gold/20" aria-label="USM chapters across the country">
      <div className="marquee flex gap-10 whitespace-nowrap w-max">
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-10 text-white/60 font-display text-sm tracking-widest uppercase">
            {c}
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-gold/60" aria-hidden />
          </span>
        ))}
        <span className="text-gold font-display text-sm tracking-widest uppercase">+ 30 more campuses</span>
      </div>
    </div>
  );
}
