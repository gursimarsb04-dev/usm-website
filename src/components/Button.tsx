import Link from 'next/link';

const styles = {
  gold: 'bg-gold text-teal-ink hover:bg-gold-deep',
  teal: 'bg-teal text-white hover:bg-teal-ink',
  ghost: 'border-2 border-teal text-teal hover:bg-teal hover:text-white',
};

export default function Button({ href, children, variant = 'gold', className = '', target, rel }:
  { href: string; children: React.ReactNode; variant?: keyof typeof styles; className?: string; target?: string; rel?: string }) {
  return (
    <Link href={href} target={target} rel={rel}
      className={`inline-block rounded-full px-7 py-3 font-display font-semibold transition-colors ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
