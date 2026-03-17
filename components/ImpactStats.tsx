"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="text-5xl md:text-7xl font-mono text-saffron font-bold mb-4 tracking-tighter"
      >
        {count.toLocaleString()}+
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-white/80 font-display font-medium text-lg md:text-xl uppercase tracking-widest"
      >
        {label}
      </motion.div>
    </div>
  );
}

export default function ImpactStats({ ssaCount, eventCount, stateCount }: { ssaCount: number, eventCount: number, stateCount: number }) {
  return (
    <div className="w-full bg-navy py-24 md:py-32 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
        <Counter value={ssaCount || 75} label="Active SSAs" />
        <Counter value={eventCount || 200} label="Annual Events" />
        <Counter value={stateCount || 25} label="States Reached" />
      </div>
    </div>
  );
}
