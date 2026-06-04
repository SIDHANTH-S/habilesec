'use client';

import React from 'react';
import { useLayoutEffect, useRef, useState , useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import RollingCardStack from './rolling-card-stack';
import { RotatingHeadline, ScrollText } from './typography';

export default function Hero() {
  const comp = useRef(null);
  const [metricsInView, setMetricsInView] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Listen for preloader completion
  useEffect(() => {
    const handlePreloaderComplete = () => setPreloaderComplete(true);
    window.addEventListener('preloaderComplete', handlePreloaderComplete);
    
    // Fallback: if no event received after 2 seconds, assume preloader is done
    const fallback = setTimeout(() => {
      setPreloaderComplete(true);
    }, 2000);

    return () => {
      window.removeEventListener('preloaderComplete', handlePreloaderComplete);
      clearTimeout(fallback);
    };
  }, []);

  useLayoutEffect(() => {
    // Only start animations after preloader is complete
    if (!preloaderComplete) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-badge', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' })
        .from('.hero-title .line', { opacity: 0, y: 36, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .from('.hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-actions', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-stat', { opacity: 0, y: 10, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, '-=0.4')
        .from('.hero-dashboard', { opacity: 0, y: 40, duration: 1.1, ease: 'power4.out' }, '-=0.9')
        .add(() => setMetricsInView(true), '-=0.8');
    }, comp);
    return () => ctx.revert();
  }, [preloaderComplete]);

  return (
    <section
      ref={comp}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-gray-100 pt-30 sm:pt-20 lg:pt-10"
      style={{
        background: 'linear-gradient(160deg, #F0F6FF 0%, #FFFFFF 45%, #EAF3FF 100%)',
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,88,190,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,88,190,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} 
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 75% 50%, rgba(0,119,182,0.035) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 w-full relative z-10 py-12 sm:py-16 lg:py-8 lg:min-h-screen flex flex-col lg:flex-row items-center gap-16 lg:gap-0">

        {/* ── Left: Copy ── */}
        <div className="lg:w-[60%] flex flex-col items-start text-left lg:pr-10 lg:h-full lg:justify-center">

          {/* Badge — specific, not abstract */}
          <div className="hero-badge inline-flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0058BE', boxShadow: '0 0 8px #0058BE88' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: '#0058BE' }}>
              Cybersecurity · GRC · Privacy · AI Governance
            </span>
          </div>

          {/* Headline — gradient on the most meaningful line */}
          <h1
            className="hero-title font-display text-[#0A1628] leading-[1.06] mb-6"
            style={{ fontSize: 'clamp(34px, 4.8vw, 60px)', letterSpacing: '-0.025em' }}
          >
            <div className="line overflow-hidden">Secure your</div>
            <div className="line overflow-hidden">
              <RotatingHeadline 
                words={['Operations.', 'Compliance.', 'Privacy.', 'AI Governance.', 'Digital Trust.']} 
                interval={4000}
                className="text-[#0A1628]"
              />
            </div>
            <div
              className="line overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #0058BE 0%, #0096C7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Prove it to the world.
            </div>
          </h1>

          {/* Description — one sharp paragraph */}
          <p
            className="hero-desc text-gray-500 leading-relaxed mb-4 max-w-xl"
            style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.75 }}
          >
            Cybersecurity, compliance, privacy, and AI governance delivered by one accountable team.
            From ISO 27001 and SOC 2 to AI governance and secure product delivery, we help organisations
            reduce risk, achieve certification, and build trust.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            {[
              { value: '100+', label: 'Global clients' },
              { value: '40+',  label: 'Certifications delivered' },
              { value: '15+',  label: 'Years of practice' },
              { value: '6',    label: 'Industries served' },
            ].map(stat => (
              <div key={stat.label} className="hero-stat flex flex-col">
                <span className="text-xl font-bold leading-none" style={{ color: '#0058BE' }}>
                  <ScrollText value={stat.value} inView={metricsInView} />
                </span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-1 font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="hero-differentiator mb-4 max-w-xl rounded-xl border border-[#023E8A1f] bg-white/70 px-4 py-3 shadow-[0_10px_30px_rgba(2,62,138,0.06)] backdrop-blur-sm">
            <p className="text-sm font-semibold" style={{ color: '#023E8A' }}>
              One team from assessment to certification.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              No handoffs. No separate consultants and implementers.
            </p>
          </div>

          

          <p className="hero-trust text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-2">
            Trusted across highly regulated and security-sensitive industries
          </p>

          <div className="hero-actions flex flex-wrap gap-4 mb-4">
            <button
              className="flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,88,190,0.45)]"
              style={{
                background: 'linear-gradient(135deg, #0A1628 0%, #0058BE 100%)',
                boxShadow: '0 4px 20px rgba(0,88,190,0.30)',
              }}
            >
              Speak With an Advisor
              <ArrowRight size={15} />
            </button>
            <button
              className="px-7 py-3.5 text-sm font-semibold rounded-lg border transition-all duration-200 hover:bg-blue-50"
              style={{ color: '#0A1628', borderColor: '#d1dce8' }}
            >
              Explore Capabilities
            </button>
          </div>
        </div>

        {/* ── Right: Rolling Card Stack ── */}
        <div className="hero-dashboard lg:w-[40%] w-full lg:h-full flex items-start justify-center lg:pt-0 lg:pb-0">
          <div className="w-full" style={{ maxWidth: 680 }}>
            <RollingCardStack />
          </div>
        </div>

      </div>
    </section>
  );
}