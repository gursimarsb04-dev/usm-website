import Link from "next/link";

export default function NotFound() {
  return (
    <section data-section="not-found">
      <h1>Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <nav>
        <Link href="/">Go Home</Link>
        <Link href="/ssa">Find an SSA</Link>
        <Link href="/events">Browse Events</Link>
      </nav>
    </section>
  );
}
