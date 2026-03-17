"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section data-section="error">
      <h1>Something went wrong</h1>
      <p>We&apos;re sorry — something unexpected happened. Please try again.</p>
      <button onClick={() => reset()}>Try Again</button>
      <a href="/">Go Home</a>
    </section>
  );
}
