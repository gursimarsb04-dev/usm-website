// ⚠️ TODO(USM): REVIEW BEFORE PUBLISH.
//
// This is factual content about Sikhi written for a general (largely non-Sikh)
// audience searching Google. It is deliberately conservative — widely-accepted
// basics only, no contested theological interpretation, no numbers that would
// need a citation to defend. Even so, USM has had accuracy complaints before,
// so **Harsimran / the USM team must review this text before it is promoted**
// (linked from nav, or used as a Google Ads landing page).
//
// Content lives here as structured data rather than in JSX so it can be read
// and edited in one place, and so the page and its FAQ structured data stay in
// sync automatically.

export type GuideSection = {
  /** URL fragment — keep stable, these get linked/bookmarked. */
  id: string;
  /** Phrased as the question people actually type into Google. */
  heading: string;
  paragraphs: string[];
};

export const SIKHI_101_TITLE = 'Sikhi 101: A Plain-Language Introduction to Sikhism';

export const SIKHI_101_INTRO =
  'Sikhi (also called Sikhism) is one of the world’s major religions, with roughly 25–30 million followers worldwide. This guide answers the questions people most often ask — written plainly, without assuming any background.';

export const sikhi101Sections: GuideSection[] = [
  {
    id: 'what-is-sikhism',
    heading: 'What is Sikhism?',
    paragraphs: [
      'Sikhi is a religion that began in the Punjab region of South Asia in the late 15th century with Guru Nanak Sahib. It is monotheistic: Sikhs believe in one universal, formless Divine present in all of creation.',
      'Sikh teaching emphasizes remembering the Divine, earning an honest living, and sharing with others. It also affirms the fundamental equality of all people — a teaching expressed in practices like langar, the free community kitchen open to anyone regardless of background.',
      'Sikhi was shaped by ten living Gurus. The scripture, Guru Granth Sahib Ji, is regarded by Sikhs as the eternal Guru and is treated with corresponding reverence.',
    ],
  },
  {
    id: 'why-do-sikhs-wear-turbans',
    heading: 'Why do Sikhs wear turbans?',
    paragraphs: [
      'The turban (dastaar) is an article of faith, not a cultural accessory or a fashion choice. It covers uncut hair (kesh) and is worn as a visible commitment to Sikh identity and values.',
      'For many Sikhs the turban carries meanings of dignity, responsibility, and equality — historically it was worn by rulers and nobility, and Sikh Gurus encouraged all Sikhs to wear it regardless of social standing.',
      'Both Sikh men and Sikh women may wear a turban. Removing it in public is understood as a serious violation of a Sikh’s religious practice.',
    ],
  },
  {
    id: 'five-ks',
    heading: 'What are the Five Ks?',
    paragraphs: [
      'The Five Ks are five articles of faith worn by initiated (Amritdhari) Sikhs. Each begins with the letter "K" in Punjabi.',
      'They are: kesh (uncut hair), kangha (a small wooden comb), kara (a steel bracelet), kachhera (a specific undergarment), and kirpan (a small ceremonial sword).',
      'The kirpan is frequently misunderstood. It is a religious article symbolizing a duty to stand against injustice and defend the vulnerable — not a weapon, and it is worn as a matter of religious obligation.',
    ],
  },
  {
    id: 'what-is-the-khalsa',
    heading: 'What is the Khalsa?',
    paragraphs: [
      'The Khalsa is the community of initiated Sikhs, established in 1699 by Guru Gobind Singh Ji, the tenth Guru.',
      'Sikhs who take Amrit (the Sikh initiation ceremony) commit to a defined code of conduct, which includes wearing the Five Ks and maintaining daily prayer.',
      'Not every Sikh is initiated into the Khalsa. Sikhs practice across a spectrum, and identity is not limited to those who have taken Amrit.',
    ],
  },
  {
    id: 'sikh-vs-muslim',
    heading: 'Sikh or Muslim? Clearing up a common misidentification',
    paragraphs: [
      'Sikhi and Islam are separate, distinct religions with different scriptures, founders, and practices. Sikhi began in Punjab in the late 15th century with Guru Nanak Sahib; Islam began in 7th-century Arabia.',
      'Sikhs are frequently misidentified as Muslim because of the turban and beard. This misidentification has real consequences: Sikhs in North America have been targeted in hate crimes by attackers who mistook them for Muslims.',
      'To be clear on the principle: violence targeting anyone based on faith or appearance is wrong, whether the target is Sikh, Muslim, or of any other background. Correcting the confusion is about accuracy, not about deflecting harm onto another community.',
      'Practical note: a person wearing a turban in North America is statistically most likely to be Sikh, as the great majority of turban-wearers in the region are Sikh.',
    ],
  },
  {
    id: 'sikhi-on-campus',
    heading: 'Sikhi on campus',
    paragraphs: [
      'Sikh Student Associations (SSAs) are student-run organizations that give Sikh students community on campus — through discussion, seva (service), events, and shared practice.',
      'United Sikh Movement supports SSA chapters across North America with funding, mentorship, leadership training, and a national network connecting chapters to each other.',
      'If you are a student looking for a chapter, or want to start one where none exists, both paths are open below.',
    ],
  },
];
