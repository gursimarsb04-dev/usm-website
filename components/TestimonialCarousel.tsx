"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react";
import { urlFor } from "@/sanity/image";

export default function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="overflow-hidden py-12 -mx-4 px-4 md:-mx-12 md:px-12">
      <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
          className="flex gap-6 md:gap-8 w-max pr-12"
        >
          {testimonials.map((t) => (
            <motion.div 
              key={t._id || t.quote}
              className="w-[85vw] md:w-[450px] shrink-0 bg-navy/5 ring-1 ring-black/5 p-1.5 rounded-[2rem]"
            >
              <div className="bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] p-8 md:p-10 h-full flex flex-col">
                <Quotes weight="fill" className="w-10 h-10 text-saffron/30 mb-6" />
                <p className="text-lg md:text-xl text-navy leading-relaxed font-medium mb-10 flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  {t.authorPhoto ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image 
                        src={urlFor(t.authorPhoto).width(112).height(112).url()} 
                        alt={t.authorName} 
                        width={56} 
                        height={56} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                      <span className="font-display font-semibold text-navy">{t.authorName?.charAt(0) || "U"}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-semibold text-navy text-lg leading-tight">{t.authorName}</h4>
                    <p className="text-sm text-warm-gray">
                      {t.authorRole}
                      {t.ssa?.name ? ` • ${t.ssa.name}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
