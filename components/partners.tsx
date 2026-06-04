'use client';

import React, { useState, startTransition, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ClipPathReveal } from './typography';

/* ─────────────────────────────────────────────
   Partner data
───────────────────────────────────────────── */
const partners = [
  'Aexpro',
  'Auriseg',
  'TechMaple',
  'BUSOFT',
  'Infocom IT',
  'CHAKRAX',
  'KIRSHI',
  'peaq labs',
  'REACH GRC',
  'Aspirelens',
];

/* ─────────────────────────────────────────────
   AppleGlassBox — ported from the Framer module
   https://framer.com/m/AppleGlassStack-1H0xTm.js
   
   Recreates the liquid-glass hover effect:
   • Backdrop blur glass layer
   • Shine sweep across the card on hover
   • Lift + subtle mouse-tracking tilt
   • Hairline stroke border
───────────────────────────────────────────── */
interface GlassBoxProps {
  label: string;
  index: number;
}

function GlassBox({ label, index }: GlassBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    startTransition(() => setMousePos({ x, y }));
  };

  const handleMouseLeave = () => {
    startTransition(() => {
      setIsHovered(false);
      setMousePos({ x: 0, y: 0 });
    });
  };

  return (
    <div style={{ perspective: '1000px', flexShrink: 0 }}>
      <motion.div
        onMouseEnter={() => startTransition(() => setIsHovered(true))}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        animate={{
          y: isHovered ? -8 : 0,
          x: isHovered ? mousePos.x * 10 : 0,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '160px',
          height: '64px',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Glass fill layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10, 22, 40, 0.06)',
            borderRadius: '16px',
          }}
        />

        {/* Shine sweep */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.32) 49.5%, rgba(255,255,255,0.32) 50.5%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Hairline stroke border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(10, 22, 40, 0.12)',
            borderRadius: '16px',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '0 20px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontWeight: 600,
              fontSize: '15px',
              letterSpacing: '-0.02em',
              color: isHovered ? '#0077B6' : '#0A1628',
              whiteSpace: 'nowrap',
              transition: 'color 0.25s ease',
              userSelect: 'none',
            }}
          >
            {label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function Partners() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Duplicate list for seamless infinite loop
  const doubled = [...partners, ...partners];

  return (
    <section ref={ref} className="py-14 border-y border-outline-variant/30 bg-surface overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10">

        {/* Label */}
        <div className="md:w-1/4 shrink-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            Strategic Ecosystem
          </p>
          <p className="text-sm text-on-surface-variant mt-2">
            <ClipPathReveal inView={inView}>
              Trusted by leading enterprises &amp; auditors
            </ClipPathReveal>
          </p>
        </div>

        {/* Marquee — fades at edges */}
        <div className="relative w-full overflow-x-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 36, repeat: Infinity }}
            /* Pause on hover of the whole track */
            whileHover={{ animationPlayState: 'paused' } as never}
            className="flex items-center gap-4 min-w-max"
            style={{ willChange: 'transform' }}
          >
            {doubled.map((partner, index) => (
              <GlassBox key={`${partner}-${index}`} label={partner} index={index} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
