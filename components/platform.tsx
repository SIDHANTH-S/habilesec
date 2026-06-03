'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Shield, Fingerprint, Network, Binary } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Continuous Telemetry",
    desc: "Ingests data from cloud providers to monitor configurations against control frameworks automatically."
  },
  {
    title: "Unified Evidence",
    desc: "A single irrefutable source of truth for auditors across SOC 2, ISO 27001, and HIPAA."
  },
  {
    title: "AI Risk Profiling",
    desc: "Map your emerging GenAI use cases against the EU AI Act and NIST AI RMF."
  }
];

export default function Platform() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
      
      tl.from(".plat-badge", { opacity: 0, y: 20, duration: 0.6 })
        .from(".plat-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.2")
        .from(".plat-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".plat-feature", { 
          opacity: 0, 
          y: 20, 
          duration: 0.5, 
          stagger: 0.15 
        }, "-=0.2")
        .from(".plat-ui", {
          opacity: 0,
          scale: 0.95,
          y: 40,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-surface relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <div className="plat-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white border border-outline-variant/30 mb-8 shadow-sm">
              <Binary className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">The Tanikkai OS Engine</span>
            </div>
            
            <h2 className="plat-title text-4xl md:text-6xl font-display text-primary mb-6 leading-tight">
              A command center for digital trust.
            </h2>
            <p className="plat-desc text-lg text-on-surface-variant mb-10 leading-relaxed">
              Stop managing compliance in disconnected spreadsheets. Tanikkai OS provides a unified, programmable interface for your entire security posture, marrying expert advisory with continuous autonomous monitoring.
            </p>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <div key={i} className="plat-feature flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-none border border-outline-variant/30 bg-white text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-primary font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="plat-ui lg:w-1/2 w-full">
            <div className="rounded-none border border-outline-variant/30 bg-surface-container-lowest p-2 shadow-xl relative mt-8 lg:mt-0">
              {/* Fake UI dots */}
              <div className="flex gap-2 px-3 py-2 border-b border-outline-variant/30 mb-4 bg-surface-container-low">
                 <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/50" />
                 <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/50" />
                 <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/50" />
              </div>
              
              <div className="space-y-4 p-4">
                {/* Mock Policy Card */}
                 <div className="p-5 rounded-none border border-outline-variant/30 bg-white shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-none bg-surface-container-low border border-outline-variant/20 flex items-center justify-center">
                          <Fingerprint className="w-6 h-6 text-primary" />
                       </div>
                       <div>
                         <h5 className="text-sm font-bold text-primary">Identity Provider Sync</h5>
                         <p className="text-xs text-on-surface-variant font-mono mt-1">Control: AC-02 (NIST)</p>
                       </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-none bg-green-50 text-green-700 border border-green-200 text-xs font-mono font-bold uppercase">Passing</div>
                 </div>

                 {/* Mock Infrastructure Card */}
                 <div className="p-5 rounded-none border border-outline-variant/30 bg-white shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-none bg-surface-container-low border border-outline-variant/20 flex items-center justify-center">
                          <Network className="w-6 h-6 text-primary" />
                       </div>
                       <div>
                         <h5 className="text-sm font-bold text-primary">Cloud Asset Scans</h5>
                         <p className="text-xs text-on-surface-variant font-mono mt-1">AWS • GCP • Azure</p>
                       </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-none bg-green-50 text-green-700 border border-green-200 text-xs font-mono font-bold uppercase">Passing</div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
