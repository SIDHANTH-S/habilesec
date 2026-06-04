'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Check } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Framework {
  id: string;
  src: string;
  alt: string;
  label: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  features: string[];
  outcome: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: 'iso27001',
    src: 'https://habilesec.com/static/media/ISO%2027001.1292b81bc3640c672614.png',
    alt: 'ISO 27001',
    label: 'ISO 27001',
    title: 'ISO 27001',
    subtitle: 'Information Security Management',
    badge: 'Global Standard',
    description:
      'Global standard for managing information security risks and protecting sensitive data through systematic risk assessment and treatment.',
    features: ['Risk Assessment & Treatment', 'Control Framework Design', 'Certification Support'],
    outcome: 'Achieve certification readiness with a structured, audit-ready security program.',
  },
  {
    id: 'soc2',
    src: 'https://habilesec.com/static/media/Soc2.da182ba3e2be89879df3.png',
    alt: 'SOC 2',
    label: 'SOC 2',
    title: 'SOC 2',
    subtitle: 'Trust Service Criteria',
    badge: 'Industry Standard',
    description:
      'Demonstrates secure handling of customer data through rigorous operational controls across security, availability, and privacy principles.',
    features: ['Control Design & Testing', 'Evidence Collection', 'Audit Readiness'],
    outcome: 'Accelerate enterprise sales cycles with trusted third-party validation.',
  },
  {
    id: 'iso42001',
    src: 'https://habilesec.com/static/media/ISO%2042001.6a01f51eb6e86ed5f324.png',
    alt: 'ISO 42001',
    label: 'ISO 42001',
    title: 'ISO 42001',
    subtitle: 'AI Management System',
    badge: 'Emerging Standard',
    description:
      'Framework for responsible AI development, deployment, and governance ensuring ethical AI practices and alignment with evolving regulations.',
    features: ['AI Governance Framework', 'Model Risk Management', 'Board-Level Oversight'],
    outcome: 'Deploy AI responsibly while maintaining full stakeholder confidence.',
  },
  {
    id: 'gdpr',
    src: 'https://habilesec.com/static/media/GDPR.0f425626f1ff36f782e9.png',
    alt: 'GDPR',
    label: 'GDPR',
    title: 'GDPR',
    subtitle: 'EU General Data Protection Regulation',
    badge: 'Legal Requirement',
    description:
      'Privacy-first data governance for organizations processing EU citizen data, encompassing comprehensive data protection rights and obligations.',
    features: [
      'Data Mapping & Classification',
      'Privacy Impact Assessments',
      'Subject Rights Management',
    ],
    outcome: 'Secure EU market access while avoiding substantial regulatory penalties.',
  },
  {
    id: 'iso27701',
    src: 'https://habilesec.com/static/media/ISO%2027701.9b723ac5a98e9fa7bd64.png',
    alt: 'ISO 27701',
    label: 'ISO 27701',
    title: 'ISO 27701',
    subtitle: 'Privacy Information Management',
    badge: 'Global Standard',
    description:
      'Extension to ISO 27001 providing comprehensive privacy and data protection management, bridging security and privacy governance into a unified system.',
    features: ['Privacy Governance', 'PII Processing Controls', 'Multi-Jurisdiction Compliance'],
    outcome: 'Unify security and privacy with global compliance coverage.',
  },
  {
    id: 'dpdpa',
    src: 'https://habilesec.com/static/media/DPDPA.9cd629de45bfac7cdee9.png',
    alt: 'DPDPA',
    label: 'DPDPA',
    title: 'DPDPA',
    subtitle: 'Digital Personal Data Protection Act',
    badge: 'India Framework',
    description:
      "India's comprehensive framework for digital data privacy establishing obligations for data fiduciaries and enforceable rights for data principals.",
    features: [
      'Data Fiduciary Obligations',
      'Consent Management',
      'Data Principal Rights',
    ],
    outcome: 'Achieve India market readiness with full regulatory compliance.',
  },
];

// ─── Hand-drawn underline paths ───────────────────────────────────────────────
const UNDERLINE_PATHS = [
  'M5 8 Q40 4 85 9 Q130 14 155 6',
  'M5 10 Q45 8 80 11 Q120 13 155 8',
  'M5 6 Q35 12 90 8 Q140 5 155 10',
  'M5 9 Q50 6 85 12 Q125 8 155 11',
  'M5 7 Q40 10 80 6 Q130 11 155 8',
  'M5 11 Q45 6 85 10 Q120 12 155 7',
];

// ─── Constants ────────────────────────────────────────────────────────────────
const N = FRAMEWORKS.length;
const BASE_RADIUS = 290;      // orbit radius at Phase 2 peak
const ITEM_W = 252;
const ITEM_H = 176;
const PERSPECTIVE = 1500;
const TILT = -4;

// ─── Phase boundaries ─────────────────────────────────────────────────────────
const P1_END = 0.27;          // scatter → orbit complete
const P3_START = 0.73;        // orbit → collapse begins
const P3_COLLAPSE_END = 0.88; // arc fully formed
const P4_END = 1.0;           // title fully visible, cards gone

// ─── FIX 4: Scatter points within visible viewport range ─────────────────────
// Was: x: ±880, y: ±480 — far outside any viewport, user never sees them
// Now: contained within ≈ ±420 × ±320, cards visibly "fly in"
const SCATTER: Array<{ x: number; y: number; z: number }> = [
  { x: -380, y: -160, z: -80 },
  { x:  340, y: -200, z: -120 },
  { x: -160, y: -300, z:  100 },
  { x:  380, y:  120, z: -140 },
  { x: -300, y:  200, z: -60  },
  { x:  160, y:  260, z:  120 },
];

// ─── Arc positions — wide enough to frame the title (not crowd it) ────────────
// UPGRADE: 220 → 360. At ITEM_W=252, radius 220 caused overlap.
// 360 gives each card ~120px clearance from its neighbours at 6 items × 240°.
// y-compression 0.55 (was 0.65) flattens to a crown shape, not a full ellipse.
const ARC_RADIUS = 360;
const STACK_POSITIONS = FRAMEWORKS.map((_, i) => {
  const angle = (-120 + (240 / (N - 1)) * i) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * ARC_RADIUS,
    y: Math.sin(angle) * ARC_RADIUS * 0.55, // flattened crown, not full ellipse
  };
});

// ─── Easing functions ─────────────────────────────────────────────────────────
const easeOutQuart  = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 4);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeInCubic   = (t: number) => t * t * t;
const lerp          = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── Card state ───────────────────────────────────────────────────────────────
interface CardState {
  x: number;
  y: number;
  z: number;
  opacity: number;
  scale: number;
  isActive: boolean;
  motionBlur: number;   // UPGRADE 3: CSS blur px, high during P1 entry, zero at orbit
}

function computeCardState(
  index: number,
  progress: number,
  orbitRotationDeg: number,
  orbitRadius: number,
): CardState {
  const angleStep    = 360 / N;
  const orbitAngleDeg = ((angleStep * index + orbitRotationDeg) % 360 + 360) % 360;
  const orbitAngleRad = (orbitAngleDeg * Math.PI) / 180;

  const ox = orbitRadius * Math.sin(orbitAngleRad);
  const oz = orbitRadius * Math.cos(orbitAngleRad);

  // frontness: 0 = directly behind, 1 = directly in front
  const frontness = (Math.cos(orbitAngleRad) + 1) / 2;
  const isActive  = frontness > 0.88;

  // ── UPGRADE 2: Depth parallax factor ──────────────────────────────────────
  // Front cards (frontness≈1) → depthFactor 1.4  (move full distance, feel closer)
  // Rear  cards (frontness≈0) → depthFactor 0.6  (move less, feel farther → deeper 3D)
  // Applied to arc displacement in Phase 3 so rear cards reach arc faster.
  const depthFactor = 0.6 + frontness * 0.8;

  // ── Phase 1: Scatter → Orbit ───────────────────────────────────────────────
  if (progress <= P1_END) {
    // Stagger: each card travels at a different speed (not different delay window).
    // t=0 → all cards start moving immediately, later cards just arrive slower.
    const STAGGER_OFFSET = 0.10;
    const rawT      = progress / P1_END;
    const t_scatter = easeOutQuart(
      Math.max(0, Math.min(1, rawT * 1.35 - index * STAGGER_OFFSET))
    );

    const s = SCATTER[index];

    // UPGRADE 3: Motion blur — decays as (1-t)² so it's intense at start,
    // zero once the card locks into orbit. Max 1.2px — subtle, not distracting.
    const motionBlur = (1 - t_scatter) * (1 - t_scatter) * 1.2;

    return {
      x:          lerp(s.x, ox,  t_scatter),
      y:          lerp(s.y, 0,   t_scatter),
      z:          lerp(s.z, oz,  t_scatter),
      opacity:    lerp(0,   0.35 + frontness * 0.65, t_scatter),
      scale:      lerp(0.6, 0.88 + frontness * 0.14, t_scatter),
      isActive:   false,
      motionBlur,
    };
  }

  // ── Phase 2: Pure orbit ────────────────────────────────────────────────────
  if (progress < P3_START) {
    return {
      x:          ox,
      y:          0,
      z:          oz,
      opacity:    0.35 + frontness * 0.65,
      scale:      0.88 + frontness * 0.14,
      isActive,
      motionBlur: 0,
    };
  }

  // ── Phase 3: Orbit morphs → Crown arc (no singularity) ────────────────────
  //
  // UPGRADE 1 — O → o → (  not  O → · → (
  //
  // The orbit radius floor is FLOOR_RADIUS = 80px. Cards NEVER collapse
  // to a point. Instead the circle squashes (x narrows, y stretches)
  // continuously into a crown arc.
  //
  // Rotation is also deliberately slowed: the multiplier lerps 1.0 → 0.25
  // over Phase 3 so the orbit decelerates like a machine winding down.
  // (Rotation slowdown is handled in the scroll handler via rotationMult;
  //  here we just receive the already-slowed orbitRotationDeg.)
  //
  // p3: [0,1] within Phase 3
  const p3    = Math.min(1, (progress - P3_START) / (P3_COLLAPSE_END - P3_START));
  const tMorph = easeInOutCubic(p3);

  const arcPos  = STACK_POSITIONS[index];

  // Horizontal x: orbit x → arc x, depth-scaled so rear cards move more aggressively
  const morphedX = lerp(ox,  arcPos.x * depthFactor, tMorph);

  // Vertical y: 0 → arc y, also depth-scaled
  const morphedY = lerp(0,   arcPos.y * depthFactor, tMorph);

  // Z depth: orbit z → blueprint depth
  const morphedZ = lerp(oz, -140, tMorph);

  // Scale: gentle shrink as cards settle into crown positions
  const morphedScale = lerp(0.88 + frontness * 0.14, 0.68, tMorph);

  // Opacity: hold full opacity until 65% through Phase 3, then fade to
  // a blueprint ghost at 0.08 — outlines remain, cards become structural.
  const FADE_START   = 0.65;
  const cardOpacity  = p3 < FADE_START
    ? 0.35 + frontness * 0.65
    : lerp(
        0.35 + frontness * 0.65,
        0.08,
        easeInCubic((p3 - FADE_START) / (1 - FADE_START))
      );

  return {
    x:          morphedX,
    y:          morphedY,
    z:          morphedZ,
    opacity:    cardOpacity,
    scale:      morphedScale,
    isActive:   false,
    motionBlur: 0,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ComplianceOrbitProps {
  className?: string;
}

export default function ScrollDrivenCarousel({ className }: ComplianceOrbitProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollProgress = useMotionValue(0);
  const rawRotation    = useMotionValue(0);
  const springRotation = useSpring(rawRotation, {
    stiffness: 60,
    damping:   18,
    mass:      1.2,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [progressVal, setProgressVal] = useState(0);
  const [cardStates,  setCardStates]  = useState<CardState[]>(() =>
    FRAMEWORKS.map((_, i) => computeCardState(i, 0, 0, BASE_RADIUS))
  );

  // Breathing orbit radius — subtle ±12px pulse during Phase 2
  const getOrbitRadius = useCallback((progress: number, rot: number) => {
    const breathPhase = rot * 0.05; // tie breathing loosely to rotation
    const breathing   = Math.sin(breathPhase) * 10;

    // During P3 collapse, radius shrinks — but computeCardState handles this
    // internally. Here we only return the "nominal" base for Phase 2.
    if (progress >= P3_START) return BASE_RADIUS; // not used in Phase 3
    return BASE_RADIUS + breathing;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect      = sectionRef.current.getBoundingClientRect();
      const sectionH  = sectionRef.current.offsetHeight;
      const winH      = window.innerHeight;
      const scrolled  = -rect.top;
      const maxScroll = sectionH - winH;
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      scrollProgress.set(progress);
      setProgressVal(progress);

      if (progress > P1_END && progress < P3_START) {
        const p2 = (progress - P1_END) / (P3_START - P1_END);
        rawRotation.set(p2 * 360);
      } else if (progress >= P3_START) {
        // UPGRADE 1 (part 2): Rotation slowdown during Phase 3.
        // The orbit was spinning at full speed. As Phase 3 begins, it
        // decelerates: multiplier goes 1.0 → 0.25 so it feels like a
        // machine coming to rest before the arc locks in place.
        const p3         = Math.min(1, (progress - P3_START) / (P3_COLLAPSE_END - P3_START));
        const rotMult    = lerp(1.0, 0.25, easeInOutCubic(p3));
        const p2AtP3End  = 1.0; // rotation value when Phase 2 ended
        rawRotation.set(p2AtP3End * 360 * rotMult);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress, rawRotation]);

  // rAF loop — update card positions every frame
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const progress = scrollProgress.get();
      const rot      = springRotation.get();
      const radius   = getOrbitRadius(progress, rot);
      const states   = FRAMEWORKS.map((_, i) =>
        computeCardState(i, progress, rot, radius)
      );
      setCardStates(states);

      // Determine front card by closest to 0° (front of orbit)
      const angleStep = 360 / N;
      let minDelta = Infinity;
      let frontIdx = 0;
      for (let i = 0; i < N; i++) {
        const angle = ((angleStep * i + rot) % 360 + 360) % 360;
        const delta = Math.min(angle, 360 - angle);
        if (delta < minDelta) { minDelta = delta; frontIdx = i; }
      }
      setActiveIndex(frontIdx);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgress, springRotation, getOrbitRadius]);

  const activeFramework = FRAMEWORKS[activeIndex];

  // ── Derived visibility values ──────────────────────────────────────────────
  const isPhase1 = progressVal <= P1_END;
  const isPhase3 = progressVal >= P3_START;

  const leftOpacity = isPhase1
    ? easeOutQuart(progressVal / P1_END)
    : isPhase3
    ? 1 - easeInOutCubic((progressVal - P3_START) / (1 - P3_START))
    : 1;

  // Title emerges as cards dissolve
  const titleProgress = progressVal >= P3_START
    ? Math.min(1, (progressVal - P3_START) / (P3_COLLAPSE_END - P3_START))
    : 0;
  const titleScale   = lerp(0.85, 1,   easeInCubic(titleProgress));
  const titleOpacity = lerp(0,    1,   titleProgress);
  const titleBlur    = lerp(8,    0,   titleProgress);
  const glowOpacity  = Math.min(1, titleProgress * 2);

  // ── Variants ───────────────────────────────────────────────────────────────
  const contentVariants = {
    enter:  { opacity: 0, y: 24, filter: 'blur(4px)' },
    center: { opacity: 1, y:  0, filter: 'blur(0px)' },
    exit:   { opacity: 0, y: -16, filter: 'blur(4px)' },
  };

  return (
    <section
      ref={sectionRef}
      className={`relative ${className ?? ''}`}
      style={{
        height: '420vh',
        background:
          'linear-gradient(180deg, #ffffff 0%, #f0f6ff 45%, #e8f1fc 60%, #f0f6ff 75%, #ffffff 100%)',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* Ambient radial glow */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 60% 50% at 65% 50%, rgba(0,88,190,0.055) 0%, transparent 70%)',
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 xl:gap-20 items-center">

            {/* ── Left panel ──────────────────────────────────────────────── */}
            <div
              className="space-y-7 z-10"
              style={{ opacity: leftOpacity, transition: 'none' }}
            >
              <div>
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#0058BE', boxShadow: '0 0 0 3px rgba(0,88,190,0.15)' }}
                  />
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase' as const, color: '#0058BE',
                  }}>
                    Global Standards
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600,
                  lineHeight: 1.22, color: '#0b1f3a', letterSpacing: '-0.02em',
                  maxWidth: 480,
                }}>
                  Navigate complex compliance requirements through a single integrated partner.
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
                  className="space-y-6"
                >
                  <div style={{ borderLeft: '3px solid #0058BE', paddingLeft: 20 }}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700,
                        lineHeight: 1, color: '#0b1f3a', letterSpacing: '-0.03em',
                      }}>
                        {activeFramework.title}
                      </h3>
                      <span style={{
                        fontSize: 11, fontWeight: 500,
                        fontFamily: 'ui-monospace, monospace',
                        color: '#6b8aaa', letterSpacing: '0.04em',
                      }}>
                        {String(activeIndex + 1).padStart(2, '0')} /{' '}
                        {String(N).padStart(2, '0')}
                      </span>
                    </div>

                    <p style={{ fontSize: 15, fontWeight: 600, color: '#3a5f8a', marginBottom: 12, lineHeight: 1.4 }}>
                      {activeFramework.subtitle}
                    </p>

                    <p style={{ fontSize: 14, color: '#4a6582', lineHeight: 1.7, maxWidth: 440 }}>
                      {activeFramework.description}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {activeFramework.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%',
                          background: 'rgba(0,88,190,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 2,
                        }}>
                          <Check size={10} color="#0058BE" strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#3a5060', lineHeight: 1.5 }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: 'rgba(240,246,255,0.8)',
                    border: '1px solid rgba(0,88,190,0.12)',
                    borderRadius: 12, padding: '14px 18px',
                  }}>
                    <p style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
                      textTransform: 'uppercase' as const, color: '#0058BE', marginBottom: 8,
                    }}>
                      Outcome
                    </p>
                    <p style={{ fontSize: 13, color: '#2d4a6a', lineHeight: 1.6 }}>
                      {activeFramework.outcome}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-1">
                <div className="flex items-center gap-2.5">
                  {FRAMEWORKS.map((_, idx) => (
                    <div key={idx} style={{
                      height: 3, borderRadius: 2,
                      background: idx === activeIndex ? '#0058BE' : 'rgba(0,88,190,0.2)',
                      width: idx === activeIndex ? 36 : 16,
                      transition: 'width 0.4s ease, background 0.4s ease',
                    }} />
                  ))}
                </div>
                <p style={{
                  fontSize: 10, color: '#7a96b0', marginTop: 12,
                  fontWeight: 500, letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                }}>
                  Scroll to explore {N} frameworks
                </p>
              </div>
            </div>

            {/* ── Right: 3D orbit ─────────────────────────────────────────── */}
            <div className="relative flex justify-center items-center">
              <div style={{
                position: 'relative', width: '100%', maxWidth: 580, height: 480,
                perspective: PERSPECTIVE, perspectiveOrigin: '50% 50%',
              }}>
                <div style={{
                  width: '100%', height: '100%', position: 'relative',
                  transformStyle: 'preserve-3d',
                }}>
                  {FRAMEWORKS.map((fw, i) => {
                    const state = cardStates[i];
                    const shadow = state.isActive
                      ? `0 2px 0 rgba(255,255,255,0.8) inset,
                         0 32px 80px rgba(0,88,190,0.3),
                         0 8px 24px rgba(0,88,190,0.18),
                         0 0 0 1px rgba(0,88,190,0.22)`
                      : `0 2px 0 rgba(255,255,255,0.8) inset,
                         0 20px 60px rgba(0,0,0,0.12),
                         0 4px 16px rgba(0,0,0,0.07),
                         0 0 0 1px rgba(200,220,240,0.6)`;

                    return (
                      <div
                        key={fw.id}
                        style={{
                          position: 'absolute',
                          left: '50%', top: '50%',
                          width: ITEM_W, height: ITEM_H,
                          marginLeft: -ITEM_W / 2, marginTop: -ITEM_H / 2,
                          transform: `
                            translate3d(${state.x}px, ${state.y}px, ${state.z}px)
                            rotateX(${TILT}deg)
                            scale(${state.scale})
                          `,
                          opacity: state.opacity,
                          // UPGRADE 3: motion blur during Phase 1 entry.
                          // state.motionBlur is 0 in all phases except Phase 1.
                          // CSS blur(0px) is hardware-accelerated no-op, zero cost.
                          filter: state.motionBlur > 0.05
                            ? `blur(${state.motionBlur.toFixed(2)}px)`
                            : undefined,
                          borderRadius: 16, overflow: 'hidden',
                          background: 'rgba(255,255,255,0.93)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: shadow,
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'space-between',
                          padding: '16px 14px 13px',
                          willChange: 'transform, opacity, filter',
                          pointerEvents: 'none',
                          zIndex: state.isActive ? 10 : 1,
                        }}
                      >
                        {/* Glass highlight */}
                        <div style={{
                          position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%)',
                        }} />

                        {/* Active accent stripe */}
                        {state.isActive && (
                          <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 2.5,
                            background: 'linear-gradient(90deg, transparent, #0058BE, transparent)',
                            borderRadius: '16px 16px 0 0',
                          }} />
                        )}

                        {/* Label */}
                        <div style={{
                          position: 'relative', zIndex: 1, fontSize: 9.5, fontWeight: 700,
                          letterSpacing: '0.13em', textTransform: 'uppercase' as const,
                          color: '#1a2e4a', opacity: 0.45,
                        }}>
                          {fw.label}
                        </div>

                        {/* Badge image */}
                        <div style={{
                          flex: 1, width: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          position: 'relative', zIndex: 1,
                        }}>
                          <img
                            src={fw.src} alt={fw.alt} draggable={false}
                            style={{
                              maxWidth: '68%', maxHeight: '68%', objectFit: 'contain',
                              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.09))',
                            }}
                          />
                        </div>

                        {/* Underline + title */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          gap: 6, position: 'relative', zIndex: 1,
                        }}>
                          {state.isActive && (
                            <svg width={160} height={24} viewBox="0 0 160 24">
                              <path d={UNDERLINE_PATHS[i]} stroke="#0058BE" strokeWidth={0.8}
                                fill="none" opacity={0.3} />
                              <motion.path
                                d={UNDERLINE_PATHS[i]} stroke="#0058BE" strokeWidth={1.8}
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                              />
                            </svg>
                          )}
                          <p style={{
                            fontSize: 10, fontWeight: 700, textAlign: 'center',
                            color: '#0b1f3a', opacity: state.isActive ? 1 : 0.5,
                            letterSpacing: '0.04em', transition: 'opacity 0.3s ease',
                          }}>
                            {fw.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Expanding glow as cards dissolve */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width:  180 + titleProgress * 60,
                  height: 180 + titleProgress * 60,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(0,88,190,${0.15 * glowOpacity}) 0%, transparent 70%)`,
                  opacity: glowOpacity,
                  pointerEvents: 'none', zIndex: 3, transition: 'none',
                }} />

                {/* Centre title — emerges from glow, Phase 3 only */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: `translate(-50%, -50%) scale(${titleScale})`,
                  textAlign: 'center',
                  opacity: titleOpacity,
                  filter: `blur(${titleBlur}px)`,
                  pointerEvents: 'none', zIndex: 5, transition: 'none',
                }}>
                  <p style={{
                    fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const, color: '#0058BE', lineHeight: 1.5,
                  }}>
                    One Integrated<br />Compliance Program
                  </p>
                </div>

                {/* Subtle ambient glow during Phase 2 orbit */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 140, height: 140, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,88,190,0.08) 0%, transparent 70%)',
                  opacity: progressVal > P1_END && progressVal < P3_START ? 0.7 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none', zIndex: 2,
                }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}