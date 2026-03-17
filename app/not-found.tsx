import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-navy flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-saffron/10 flex items-center justify-center mb-8">
        <MagnifyingGlass weight="bold" className="w-10 h-10 text-saffron" />
      </div>
      <h1 className="font-display font-semibold text-7xl md:text-9xl tracking-tighter text-white mb-6">
        404
      </h1>
      <h2 className="font-display font-medium text-2xl md:text-3xl text-saffron mb-4">
        Page not found
      </h2>
      <p className="text-white/80 text-lg max-w-md mb-10">
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 rounded-full bg-saffron text-navy font-medium hover:bg-saffron-light transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/ssa"
          className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors hidden sm:block"
        >
          Find an SSA
        </Link>
      </div>
    </div>
  );
}
