'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] opacity-30" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <p className="text-xs font-bold text-white uppercase tracking-widest mb-6 opacity-80">Next Steps</p>
        <h2 className="text-5xl md:text-7xl font-display text-white mb-6">
          Architect your trust posture.
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Schedule an executive briefing to see how HabileSec can align your security initiatives with strategic business growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="h-14 px-8 rounded-none bg-white text-primary font-bold hover:bg-white/90 transition-colors w-full sm:w-auto text-sm flex items-center justify-center gap-2 uppercase tracking-wide">
            Schedule Briefing <ArrowRight className="w-5 h-5" />
          </button>
          <button className="h-14 px-8 rounded-none bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 transition-colors w-full sm:w-auto text-sm uppercase tracking-wide">
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
