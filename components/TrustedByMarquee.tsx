"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";

export default function TrustedByMarquee({ logos }: { logos: any[] }) {
  if (!logos || logos.length === 0) return null;

  // Duplicate logos array for smooth infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-12 border-y border-off-white bg-white/50">
      <div className="max-w-[1400px] mx-auto mb-8 px-6 md:px-12 text-center">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-warm-gray font-medium">Trusted By</h4>
      </div>
      <div className="flex relative items-center gap-12 sm:gap-20">
        <motion.div
          className="flex items-center gap-12 sm:gap-20 whitespace-nowrap"
          animate={{ x: "-33.33%" }} // Shift by exactly one set for seamless
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedLogos.map((logo, i) => (
            <div key={`${logo._key || i}-${i}`} className="w-32 md:w-40 shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={urlFor(logo).width(320).url()}
                alt="Partner Logo"
                width={160}
                height={80}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
