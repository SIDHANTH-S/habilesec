'use client';

import React from 'react';
import { motion } from 'motion/react';

const partners = [
  "Aexpro", "Auriseg", "TechMaple", "BUSOFT", "Infocom IT", 
  "CHAKRAX", "KIRSHI", "peaq labs", "REACH GRC", "Aspirelens"
];

export default function Partners() {
  return (
    <section className="py-12 border-y border-outline-variant/30 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/4 shrink-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            Strategic Ecosystem
          </p>
          <p className="text-sm text-on-surface-variant mt-2">Trusted by leading enterprises &amp; auditors</p>
        </div>
        
        {/* Infinite scrolling marquee effect */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex items-center gap-16 min-w-max"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <span className="text-2xl font-display font-medium text-primary/50 transition-colors hover:text-primary">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
