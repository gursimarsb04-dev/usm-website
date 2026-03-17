import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, talks, and insights from the United Sikh Movement community.",
};

export default function BlogPage() {
  return (
    <section data-section="blog-coming-soon">
      <h1>Blog</h1>
      <p>Coming soon. Follow us on social media for the latest updates.</p>
      <a href="/">Back to Home</a>
    </section>
  );
}
