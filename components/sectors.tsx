'use client';

import React, { useRef, useEffect, useState, useCallback, startTransition } from 'react';

/* ─── Data ────────────────────────────────────────────────────────── */
const sectors = [
  { img: '/BFSI.png',          name: 'Banking & Financial Services', short: 'BFSI',   tags: ['DORA', 'GLBA', 'RBI'] },
  { img: '/GOVERNMENT.png',    name: 'Government & Defence',         short: 'GOV',    tags: ['CMMC', 'FedRAMP', 'NCSC'] },
  { img: '/HEALTHCARE.png',    name: 'Healthcare & Life Sciences',   short: 'HEALTH', tags: ['HIPAA', 'HITRUST', 'DISHA'] },
  { img: '/MANUFACTURING.png', name: 'Manufacturing & Industry 4.0', short: 'MFG',    tags: ['IEC 62443', 'NIS2', 'OT/IT'] },
  { img: '/RETAIL.png',        name: 'Retail & E-Commerce',          short: 'RETAIL', tags: ['PCI DSS', 'GDPR', 'DPDPA'] },
  { img: '/TECHNOLOGY.png',    name: 'Technology & SaaS',            short: 'TECH',   tags: ['SOC 2', 'ISO 27001', 'CSA STAR'] },
];

const ROLL_DEG = [-360, 360, -360, 360, -360, 360];

/* ─── Easing ──────────────────────────────────────────────────────── */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/* ─── Neural Network Canvas ───────────────────────────────────────
   Floating nodes connected by fading edges. Hub nodes pulse gently.
   Colors drawn from the ocean-blue design token palette.
─────────────────────────────────────────────────────────────────── */
function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const NODE_COUNT   = 52;
    const CONNECT_DIST = 175;   // px – max edge length
    const CENTER_PULL  = 0.008; // spring strength toward home

    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      bx: number; by: number;  // home position
      r: number;               // radius
      isHub: boolean;          // larger, brighter node
      pulse: number;           // 0..1 phase for pulse ring
    };

    let nodes: Node[] = [];
    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const build = () => {
      nodes = [];
      // 6 hub nodes roughly where cards orbit
      const N = 6;
      for (let i = 0; i < N; i++) {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const rx = w * 0.28, ry = h * 0.26;
        const bx = w / 2 + Math.cos(angle) * rx;
        const by = h / 2 + Math.sin(angle) * ry;
        nodes.push({
          x: bx, y: by, bx, by,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 4.5, isHub: true, pulse: Math.random(),
        });
      }
      // Regular floating nodes
      for (let i = 0; i < NODE_COUNT - N; i++) {
        const bx = w * 0.06 + Math.random() * w * 0.88;
        const by = h * 0.06 + Math.random() * h * 0.88;
        nodes.push({
          x: bx, y: by, bx, by,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          r: 1.6 + Math.random() * 1.2,
          isHub: false, pulse: Math.random(),
        });
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const n of nodes) {
        n.vx += (n.bx - n.x) * CENTER_PULL;
        n.vy += (n.by - n.y) * CENTER_PULL;
        n.vx *= 0.982;
        n.vy *= 0.982;
        n.x  += n.vx;
        n.y  += n.vy;
        n.pulse = (n.pulse + 0.004) % 1;
      }

      // Draw edges
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx   = nodes[a].x - nodes[b].x;
          const dy   = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;

          const proximity = 1 - dist / CONNECT_DIST;
          const isHubEdge = nodes[a].isHub || nodes[b].isHub;
          const alpha = proximity * (isHubEdge ? 0.38 : 0.14);

          // Gradient edge: hub colour → regular colour
          const grad = ctx.createLinearGradient(
            nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y
          );
          grad.addColorStop(0, `rgba(0, 119, 182, ${alpha})`);
          grad.addColorStop(1, `rgba(0, 180, 216, ${alpha * 0.6})`);

          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = isHubEdge ? 0.9 : 0.5;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        if (n.isHub) {
          // Pulse ring
          const pr = n.pulse;
          const ringR = n.r + pr * 18;
          const ringA = (1 - pr) * 0.22;
          ctx.beginPath();
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 119, 182, ${ringA})`;
          ctx.lineWidth   = 1;
          ctx.stroke();

          // Glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
          glow.addColorStop(0, 'rgba(0, 150, 199, 0.55)');
          glow.addColorStop(1, 'rgba(0, 119, 182, 0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.isHub
          ? 'rgba(0, 119, 182, 0.80)'
          : 'rgba(0, 150, 200, 0.35)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const handleResize = () => { resize(); build(); };
    resize(); build();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}

/* ─── Apple Glass Card ─────────────────────────────────────────────
   Ported from framer.com/m/AppleGlassStack-1H0xTm.js
   Each card owns its hover + mouse-position state so the shine
   sweep and lift/tilt run independently per card.
─────────────────────────────────────────────────────────────────── */
interface SectorGlassCardProps {
  sector: typeof sectors[0];
  labelOpacity: number;
  isScattered: boolean;
  cardSize: number;
}

function SectorGlassCard({ sector, labelOpacity, isScattered }: SectorGlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    startTransition(() => setMousePos({ x, y }));
  };

  const handleMouseLeave = () => {
    startTransition(() => {
      setIsHovered(false);
      setMousePos({ x: 0, y: 0 });
    });
  };

  /* Gentle scale-only hover — expands slightly in all directions */
  const tiltX  = isHovered ? mousePos.y * 6  : 0;
  const tiltY  = isHovered ? mousePos.x * -6 : 0;
  const scaleV = isHovered && isScattered ? 1.04 : 1;

  return (
    <div
      style={{ width: '100%', height: '100%', perspective: '900px', borderRadius: 24, overflow: 'hidden' }}
      onMouseEnter={() => isScattered && startTransition(() => setIsHovered(true))}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          position: 'relative',
          width: '100%', height: '100%',
          borderRadius: 24,
          overflow: 'hidden',
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scaleV})`,
          transition: 'transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94)',
          willChange: 'transform',
          cursor: isScattered ? 'pointer' : 'default',
          boxShadow: isHovered
            ? '0 32px 80px rgba(0, 119, 182, 0.40), 0 8px 24px rgba(0, 119, 182, 0.22)'
            : '0 22px 60px rgba(0, 119, 182, 0.28), 0 4px 16px rgba(0, 119, 182, 0.14)',
        }}
      >
        {/* Photo */}
        <img
          src={sector.img}
          alt={sector.name}
          draggable={false}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: isHovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />


        {/* Hover glass overlay — appears on hover only, no blur, no color shift */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: isHovered ? 'rgba(0, 119, 182, 0.06)' : 'transparent',
          borderRadius: 'inherit',
          transition: 'background-color 0.3s ease',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Bottom gradient — only covers label area, leaves most of image original */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,12,28,0.82) 0%, rgba(8,12,28,0.50) 30%, transparent 58%)',
          borderRadius: 'inherit',
          zIndex: 2,
        }} />

        {/* Shine sweep — left→right on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 49.5%, rgba(255,255,255,0.28) 50.5%, transparent 100%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: isHovered ? 'transform 0.72s cubic-bezier(0.25,0.1,0.25,1)' : 'none',
          zIndex: 3,
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }} />

        {/* Top-left ambient sheen (always visible) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 48%)',
          borderRadius: 'inherit',
          zIndex: 4, pointerEvents: 'none',
        }} />

        {/* Hairline stroke border */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: 'inherit',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* Card label */}
        <div style={{
          position: 'absolute', bottom: 20, left: 18, right: 18,
          opacity: labelOpacity,
          transform: `translateY(${(1 - labelOpacity) * 8}px)`,
          transition: 'none',
          zIndex: 6,
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
            fontWeight: 600, color: '#fff', margin: '0 0 9px', lineHeight: 1.25,
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
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────── */
export default function Sectors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [geo, setGeo] = useState({ radius: 280, card: 210 });

  const updateGeo = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const small = Math.min(w, h);
    setGeo({
      radius: Math.max(200, small * 0.36),
      card:   Math.max(180, small * 0.26),
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
        const raw     = -rect.top / totalScroll;
        const clamped = Math.max(0, Math.min(1, (raw - 0.08) / 0.62));
        setProgress(clamped);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const N        = sectors.length;
  const textP    = easeOutQuart(Math.max(0, Math.min(1, (progress - 0.42) * 3.2)));
  const headingP = Math.max(0, 1 - easeInOutCubic(Math.min(1, progress * 2.4)));

  return (
    <section
      ref={sectionRef}
      style={{ height: '380vh', position: 'relative', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh', background: 'hsl(220 30% 98%)' }}
      >
        {/* Neural network background */}
        <NeuralNetworkCanvas />

        {/* Ambient radial glow — sits on top of canvas */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(0,119,182,0.06) 0%, transparent 70%)',
        }} />

        {/* Section heading — fades out as cards scatter */}
        <div style={{
          position: 'absolute', top: 48, left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center', zIndex: 30, pointerEvents: 'none',
          opacity: headingP,
        }}>
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
            letterSpacing: '-0.025em', margin: 0,
          }}>
            Vertical-specific<br />risk intelligence.
          </h2>
        </div>

        {/* Scatter stage */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>

          {/* Center text — pops in after cards have settled */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            zIndex: 25,
            textAlign: 'center', pointerEvents: 'none',
            opacity: textP,
            transform: `translateX(-50%) translateY(calc(-50% + ${(1 - textP) * 22}px)) scale(${0.72 + textP * 0.28})`,
            maxWidth: 360, padding: '0 20px',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display), "Playfair Display", serif',
              fontSize: 'clamp(26px, 3.2vw, 44px)',
              fontWeight: 700, lineHeight: 1.12,
              color: 'rgb(12, 18, 38)',
              letterSpacing: '-0.01em', margin: '0 0 16px',
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

          {/* Cards */}
          {sectors.map((sector, i) => {
            const angle         = (i / N) * 2 * Math.PI - Math.PI / 2;
            const staggerOffset = (i / N) * 0.20;
            const cp = easeInOutCubic(
              Math.max(0, Math.min(1, (progress - staggerOffset) / (1 - staggerOffset * 0.6)))
            );

            const tx   = Math.cos(angle) * geo.radius * cp * 1.4;
            const ty   = Math.sin(angle) * geo.radius * cp * 0.78;
            const roll = ROLL_DEG[i] * cp;

            const isTopCard   = i === N - 1;
            const zIdx        = isTopCard && cp < 0.05 ? 20 : 8 + i;
            const isScattered = cp > 0.18;
            const ptrEvents: React.CSSProperties['pointerEvents'] =
              (isTopCard || isScattered) ? 'auto' : 'none';
            const labelOpacity = Math.max(0, Math.min(1, (cp - 0.55) * 4));

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width:  geo.card,
                  height: geo.card,
                  /* Outer shell: scroll-driven radial position only */
                  transform: `translate(${tx}px, ${ty}px) rotate(${roll}deg)`,
                  zIndex: zIdx,
                  pointerEvents: ptrEvents,
                  willChange: 'transform',
                }}
              >
                <SectorGlassCard
                  sector={sector}
                  labelOpacity={labelOpacity}
                  isScattered={isScattered}
                  cardSize={geo.card}
                />
              </div>
            );
          })}
        </div>

        {/* Scroll nudge */}
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

        {/* Progress bar */}
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
