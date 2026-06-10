// Signature element: a phulkari-inspired diamond lattice, used sparingly
// as a section divider band. Low opacity, never decoration overload.
export default function Phulkari({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`overflow-hidden ${className}`}>
      <svg width="100%" height="28" preserveAspectRatio="none">
        <defs>
          <pattern id="phulkari" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M14 2 L26 14 L14 26 L2 14 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 9 L19 14 L14 19 L9 14 Z" fill="currentColor" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="28" fill="url(#phulkari)" />
      </svg>
    </div>
  );
}
