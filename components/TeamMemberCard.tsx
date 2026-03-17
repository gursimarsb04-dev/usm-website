"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { LinkedinLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";

export default function TeamMemberCard({ member }: { member: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotX = -((y - centerY) / centerY) * 8; 
    const rotY = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-[1000px] h-full">
      <motion.div
        ref={cardRef}
        className="group relative bg-navy/5 ring-1 ring-black/5 p-1.5 rounded-[2rem] h-full transition-shadow hover:shadow-xl hover:-translate-y-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className="bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col items-center p-8 h-full relative overflow-hidden"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Decorative halo that tracks movement */}
          <motion.div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-saffron/10 rounded-full blur-[40px] z-0"
            animate={{ x: rotateY * -1.5, y: rotateX * -1.5 }}
          />

          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 relative z-10 border-[4px] border-white shadow-md">
            {member.photo ? (
              <Image
                src={urlFor(member.photo).width(256).height(256).url()}
                alt={member.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-navy text-white flex items-center justify-center font-display font-semibold text-4xl">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="text-center relative z-10 flex flex-col items-center flex-1 w-full">
            <h3 className="font-display font-semibold text-xl text-navy mb-1">{member.name}</h3>
            <p className="text-warm-gray text-sm mb-4 leading-normal px-2">{member.role}</p>
            
            {member.linkedinUrl && (
              <a 
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto p-2 rounded-full bg-navy/5 text-navy hover:bg-saffron hover:text-navy transition-colors outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              >
                <LinkedinLogo weight="fill" className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
