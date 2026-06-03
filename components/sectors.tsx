'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

/* ─── Data ────────────────────────────────────────────────────────── */
const sectors = [
  { img: '/BFSI.png',          name: 'Banking & Financial Services', short: 'BFSI',   tags: ['DORA', 'GLBA', 'RBI'] },
  { img: '/GOVERNMENT.png',    name: 'Government & Defence',         short: 'GOV',    tags: ['CMMC', 'FedRAMP', 'NCSC'] },
  { img: '/HEALTHCARE.png',    name: 'Healthcare & Life Sciences',   short: 'HEALTH', tags: ['HIPAA', 'HITRUST', 'DISHA'] },
  { img: '/MANUFACTURING.png', name: 'Manufacturing & Industry 4.0', short: 'MFG',    tags: ['IEC 62443', 'NIS2', 'OT/IT'] },
  { img: '/RETAIL.png',        name: 'Retail & E-Commerce',          short: 'RETAIL', tags: ['PCI DSS', 'GDPR', 'DPDPA'] },
  { img: '/TECHNOLOGY.png',    name: 'Technology & SaaS',            short: 'TECH',   tags: ['SOC 2', 'ISO 27001', 'CSA STAR'] },
];

// Per-card roll direction & magnitude as they fly outward
const ROLL_DEG = [-360, 360, -360, 360, -360, 360];

/* ─── Easing ──────────────────────────────────────────────────────── */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/* ─── Component ───────────────────────────────────────────────────── */
export default function Sectors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  // Geometry updated from window size (client-only)
  const [geo, setGeo] = useState({ radius: 280, card: 210 });

  const updateGeo = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const small = Math.min(w, h);
    setGeo({
      radius: Math.max(200, small * 0.36),   // scatter radius in px
      card:   Math.max(180, small * 0.26),   // square card side in px
    });
  }, []);

  useEffect(() => {
    updateGeo();
    window.addEventListener('resize', updateGeo);
    return () => window.removeEventListener('resize', updateGeo);
  }, [updateGeo]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        if (!section) return;
        const rect        = section.getBoundingClientRect();
        const totalScroll = section.offsetHeight - window.innerHeight;
        if (totalScroll <= 0) return;
        // Animation window: 8% → 75% of total scroll travel
        const raw     = -rect.top / totalScroll;
        const clamped = Math.max(0, Math.min(1, (raw - 0.08) / 0.62));
        setProgress(clamped);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const N = sectors.length;

  // Center text: fades + scales in after ~40% scatter progress
  const textP   = easeOutQuart(Math.max(0, Math.min(1, (progress - 0.42) * 3.2)));
  // Top heading: fades out as center text appears
  const headingP = Math.max(0, 1 - easeInOutCubic(Math.min(1, progress * 2.4)));

  return (
    <section
      ref={sectionRef}
      style={{ height: '380vh', position: 'relative', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────── */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh', background: 'hsl(220 30% 98%)' }}
      >
        {/* Ambient radial glow */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(190,185,255,0.20) 0%, transparent 70%)',
          }}
        />

        {/* ── Section heading (fades out as scatter starts) ─────────── */}
        <div
          style={{
            position: 'absolute', top: 48, left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center', zIndex: 30, pointerEvents: 'none',
            opacity: headingP,
          }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'hsl(220 60% 45%)', margin: '0 0 12px',
          }}>
            Sector Intelligence
          </p>
          <h2 style={{
            fontFamily: '"Inter Display", "Inter", sans-serif',
            fontSize: 'clamp(34px, 4.5vw, 64px)',
            fontWeight: 700, lineHeight: 1.08,
            color: 'rgb(12, 18, 38)',
            letterSpacing: '-0.025em', margin: '0 0 14px',
          }}>
            Vertical-specific<br />risk intelligence.
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: 15,
            color: 'rgb(80, 90, 110)', lineHeight: 1.6, margin: 0,
            opacity: progress < 0.04 ? 1 : Math.max(0, 1 - progress * 14),
          }}>
            Scroll to explore the sectors we serve
          </p>
        </div>

        {/* ── Scatter stage ────────────────────────────────────────────
             All cards are absolutely centered; transform drives position  */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >

          {/* ── CENTER TEXT — pops in once cards have scattered ──────── */}
          <div
            style={{
              position: 'absolute', zIndex: 25,
              textAlign: 'center', pointerEvents: 'none',
              opacity: textP,
              transform: `scale(${0.72 + textP * 0.28}) translateY(${(1 - textP) * 22}px)`,
              maxWidth: 360, padding: '0 20px',
            }}
          >

            <h3 style={{
              fontFamily: '"Inter Display", "Inter", sans-serif',
              fontSize: 'clamp(26px, 3.2vw, 44px)',
              fontWeight: 700, lineHeight: 1.12,
              color: 'rgb(12, 18, 38)',
              letterSpacing: '-0.02em', margin: '0 0 16px',
            }}>
              Sector Expertise
            </h3>

            <p style={{
              fontFamily: '"Inter", sans-serif', fontSize: 14,
              color: 'rgb(85, 95, 115)', lineHeight: 1.65, margin: 0,
            }}>
              Deep expertise across highly regulated sectors.
            </p>
          </div>

          {/* ── CARDS ─────────────────────────────────────────────────── */}
          {sectors.map((sector, i) => {
            // Evenly spaced radial angles starting from top (−90°)
            const angle = (i / N) * 2 * Math.PI - Math.PI / 2;

            // Per-card stagger: cards fan out sequentially
            const staggerOffset = (i / N) * 0.20;
            const cp = easeInOutCubic(
              Math.max(0, Math.min(1, (progress - staggerOffset) / (1 - staggerOffset * 0.6)))
            );

            // ── Real pixel translation along radial angle (elliptical: wider X) ──
            const tx = Math.cos(angle) * geo.radius * cp * 1.4;
            const ty = Math.sin(angle) * geo.radius * cp;

            // ── Roll: card tumbles as it flies outward ──
            const roll = ROLL_DEG[i] * cp;

            // ── z-index: top card visible while stacked; each owns its layer once scattered ──
            const isTopCard = i === N - 1;
            const zIdx      = isTopCard && cp < 0.05 ? 20 : 8 + i;

            // ── Pointer events: only top card interactive while stacked ──
            const isScattered   = cp > 0.18;
            const ptrEvents: React.CSSProperties['pointerEvents'] =
              (isTopCard || isScattered) ? 'auto' : 'none';

            // ── Card label fades in as the card settles ──
            const labelOpacity = Math.max(0, Math.min(1, (cp - 0.55) * 4));

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width:  geo.card,
                  height: geo.card,   // square
                  borderRadius: 24,
                  overflow: 'hidden',
                  // Radial scatter + roll
                  transform: `translate(${tx}px, ${ty}px) rotate(${roll}deg)`,
                  boxShadow: cp > 0.08
                    ? '0 22px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10)'
                    : '0 6px 20px rgba(0,0,0,0.12)',
                  zIndex: zIdx,
                  pointerEvents: ptrEvents,
                  cursor: isScattered ? 'pointer' : 'default',
                  willChange: 'transform',
                  // Smooth transition only on box-shadow; transform is scroll-driven
                  transition: 'box-shadow 0.3s',
                }}
              >
                {/* Photo */}
                <img
                  src={sector.img}
                  alt={sector.name}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Gradient for text legibility */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,12,28,0.82) 0%, rgba(8,12,28,0) 52%)',
                  borderRadius: 'inherit',
                }} />

                {/* Card label — fades in once card has settled */}
                <div style={{
                  position: 'absolute', bottom: 14, left: 14, right: 14,
                  opacity: labelOpacity,
                  transform: `translateY(${(1 - labelOpacity) * 8}px)`,
                  transition: 'none',
                }}>
                  <p style={{
                    fontFamily: '"Inter", sans-serif', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.13em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)', margin: '0 0 3px',
                  }}>
                    {sector.short}
                  </p>
                  <p style={{
                    fontFamily: '"Inter", sans-serif', fontSize: 12,
                    fontWeight: 600, color: '#fff', margin: '0 0 7px', lineHeight: 1.25,
                  }}>
                    {sector.name}
                  </p>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {sector.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 8, fontWeight: 700, letterSpacing: '0.08em',
                        textTransform: 'uppercase', padding: '2px 6px', borderRadius: 99,
                        background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)',
                        color: '#fff', border: '1px solid rgba(255,255,255,0.24)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top-left shine */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)',
                  borderRadius: 'inherit',
                }} />
              </div>
            );
          })}
        </div>

        {/* ── Scroll nudge ─────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: progress < 0.04 ? 1 : Math.max(0, 1 - progress * 18),
          pointerEvents: 'none', zIndex: 30,
        }}>
          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: 9,
            fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'hsl(220 60% 48%)', margin: 0,
          }}>
            Scroll
          </p>
          <div style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, hsl(220 60% 48%), transparent)',
            animation: 'scrollNudge 1.6s ease-in-out infinite',
          }} />
        </div>

        {/* ── Progress bar ─────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, background: 'rgba(0,0,0,0.05)', zIndex: 30,
        }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, hsl(220 60% 52%), hsl(260 70% 66%))',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollNudge {
          0%, 100% { opacity: 0.3; transform: scaleY(0.4); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
