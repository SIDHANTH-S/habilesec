'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import CircularCarousel from './circular-carousel';

export default function Hero() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".hero-title .line", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      }, "-=0.4")
      .from(".hero-desc", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(".hero-actions", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(".hero-dashboard", {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8");

    }, comp);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden hero-gradient border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        <div className="lg:w-1/2 flex flex-col items-start text-left">
          <div className="hero-badge inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
            Institutional Advisory &amp; Analytics
          </div>

          <h1 className="hero-title text-5xl lg:text-7xl xl:text-8xl font-display text-primary leading-[1.05]">
            <div className="line overflow-hidden">Confidence for</div>
            <div className="line overflow-hidden">the decisions</div>
            <div className="line overflow-hidden">that matter most.</div>
          </h1>

          <p className="hero-desc mt-8 text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Navigate cybersecurity, compliance, privacy, and AI governance through a single advisory and intelligence partner. From certification execution to global regulatory strategy.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-none text-md font-medium hover:shadow-lg hover:bg-primary/95 transition-all flex items-center gap-2 cursor-pointer shadow-md">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border border-outline-variant text-primary px-8 py-4 rounded-none text-md font-medium hover:bg-surface-container-low transition-all cursor-pointer">
              Explore Firm Capabilities
            </button>
          </div>
        </div>

        {/* Circular Carousel */}
        <div className="hero-dashboard lg:w-1/2 w-full relative z-20" style={{ height: 560 }}>
          <CircularCarousel
            radius={300}
            itemWidth={260}
            itemHeight={180}
            perspective={1400}
            rotationSpeed={0.15}
            tiltAngle={-12}
            images={[
              { src: 'https://habilesec.com/static/media/DPDPA.9cd629de45bfac7cdee9.png', alt: 'DPDPA', label: 'DPDPA' },
              { src: 'https://habilesec.com/static/media/GDPR.0f425626f1ff36f782e9.png', alt: 'GDPR', label: 'GDPR' },
              { src: 'https://habilesec.com/static/media/ISO%2042001.6a01f51eb6e86ed5f324.png', alt: 'ISO 42001', label: 'ISO 42001' },
              { src: 'https://habilesec.com/static/media/ISO%2027001.1292b81bc3640c672614.png', alt: 'ISO 27001', label: 'ISO 27001' },
              { src: 'https://habilesec.com/static/media/ISO%2027701.9b723ac5a98e9fa7bd64.png', alt: 'ISO 27701', label: 'ISO 27701' },
              { src: 'https://habilesec.com/static/media/Soc2.da182ba3e2be89879df3.png', alt: 'SOC 2', label: 'SOC 2' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
