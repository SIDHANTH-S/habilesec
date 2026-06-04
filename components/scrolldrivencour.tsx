'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

export interface CarouselImage {
  src: string;
  alt?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  features?: string[];
  outcomes?: string[];
}

interface ScrollDrivenCarouselProps {
  images?: CarouselImage[];
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
  perspective?: number;
  tiltAngle?: number;
}

const defaultImages: CarouselImage[] = [
  {
    src: 'https://habilesec.com/static/media/ISO%2027001.1292b81bc3640c672614.png',
    alt: 'ISO 27001',
    label: 'ISO 27001',
    title: 'ISO 27001',
    subtitle: 'Information Security Management System',
    badge: 'Global Standard',
    description:
      'Global standard for managing information security risks and protecting sensitive data through systematic risk assessment.',
    features: ['Risk Assessment & Treatment', 'Control Framework Design', 'Certification Support'],
    outcomes: ['Achieve certification readiness with a structured security program'],
  },
  {
    src: 'https://habilesec.com/static/media/Soc2.da182ba3e2be89879df3.png',
    alt: 'SOC 2',
    label: 'SOC 2',
    title: 'SOC 2',
    subtitle: 'Trust Service Criteria',
    badge: 'Industry Standard',
    description:
      'Demonstrates secure handling of customer data through rigorous operational controls across security, availability, and privacy.',
    features: ['Control Design & Testing', 'Evidence Collection', 'Audit Readiness'],
    outcomes: ['Accelerate enterprise sales cycles with third-party validation'],
  },
  {
    src: 'https://habilesec.com/static/media/ISO%2042001.6a01f51eb6e86ed5f324.png',
    alt: 'ISO 42001',
    label: 'ISO 42001',
    title: 'ISO 42001',
    subtitle: 'AI Management System',
    badge: 'Emerging Standard',
    description:
      'Framework for responsible AI development, deployment, and governance at scale ensuring ethical AI practices and regulatory alignment.',
    features: ['AI Governance Framework', 'Model Risk Management', 'Board-Level Oversight'],
    outcomes: ['Deploy AI responsibly while maintaining stakeholder confidence'],
  },
  {
    src: 'https://habilesec.com/static/media/GDPR.0f425626f1ff36f782e9.png',
    alt: 'GDPR',
    label: 'GDPR',
    title: 'GDPR',
    subtitle: 'EU General Data Protection Regulation',
    badge: 'Legal Requirement',
    description:
      'Privacy-first data governance for organizations processing EU citizen data with comprehensive data protection rights.',
    features: [
      'Data Mapping & Classification',
      'Privacy Impact Assessments',
      'Subject Rights Management',
    ],
    outcomes: ['Secure EU market access while avoiding substantial penalties'],
  },
  {
    src: 'https://habilesec.com/static/media/ISO%2027701.9b723ac5a98e9fa7bd64.png',
    alt: 'ISO 27701',
    label: 'ISO 27701',
    title: 'ISO 27701',
    subtitle: 'Privacy Information Management',
    badge: 'Global Standard',
    description:
      'Extension to ISO 27001 for comprehensive privacy and data protection management bridging security and privacy governance.',
    features: ['Privacy Governance', 'PII Processing Controls', 'Multi-Jurisdiction Compliance'],
    outcomes: ['Unify security and privacy with global compliance coverage'],
  },
  {
    src: 'https://habilesec.com/static/media/DPDPA.9cd629de45bfac7cdee9.png',
    alt: 'DPDPA',
    label: 'DPDPA',
    title: 'DPDPA',
    subtitle: 'Digital Personal Data Protection Act',
    badge: 'India Framework',
    description:
      "India's comprehensive framework for digital data privacy establishing obligations for data fiduciaries and rights for data principals.",
    features: ['Data Fiduciary Obligations', 'Consent Management', 'Data Principal Rights'],
    outcomes: ['Achieve India market readiness with regulatory compliance'],
  },
];

export default function ScrollDrivenCarousel({
  images,
  radius = 280,
  itemWidth = 260,
  itemHeight = 180,
  perspective = 1400,
  tiltAngle = -4,
}: ScrollDrivenCarouselProps) {
  const resolvedImages = images || defaultImages;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // ── Smooth rotation via Framer spring ───────────────────────────
  // rawRotation holds the target value; spring follows it smoothly
  const rawRotation = useMotionValue(0);
  const rotation = useSpring(rawRotation, {
    stiffness: 80,   // lower = dreamier, higher = snappier
    damping: 20,     // higher = less bounce
    mass: 1,
  });

  // Keep a stable ref to resolvedImages.length for the scroll handler
  const N = resolvedImages.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionStart = window.scrollY + rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress =
        (window.scrollY - sectionStart) / (sectionHeight - windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Set the TARGET rotation — spring handles the smoothing
      rawRotation.set(clampedProgress * 220);

      // Active card index (still needs state for left panel content)
      const progressPerCard = 1 / N;
      const zoneIndex = Math.min(
        N - 1,
        Math.floor(clampedProgress / progressPerCard)
      );
      setActiveCardIndex(zoneIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [N, rawRotation]);

  const angleStep = 360 / N;

  // getFrontness now reads from the spring MotionValue
  // Called only during render to compute opacity/scale per card
  const getFrontness = useCallback(
    (i: number) => {
      const rot = rotation.get();
      const angle = ((angleStep * i + rot) % 360 + 360) % 360;
      return (Math.cos((angle * Math.PI) / 180) + 1) / 2;
    },
    [angleStep, rotation]
  );

  const activeCard = resolvedImages[activeCardIndex];

  const contentVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh]"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 50%, #FFFFFF 100%)',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left panel — unchanged ───────────────────────────── */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    style={{ boxShadow: '0 0 8px #0058BE88' }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                    Global Standards
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display text-primary leading-tight">
                  Navigate complex compliance requirements through a single integrated partner.
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCardIndex}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="border-l-4 border-primary pl-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-4xl md:text-5xl font-display text-primary leading-tight">
                        {activeCard.title}
                      </h3>
                      <span className="text-sm font-mono text-on-surface-variant/60">
                        {String(activeCardIndex + 1).padStart(2, '0')} /{' '}
                        {String(resolvedImages.length).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-on-surface-variant mb-4">
                      {activeCard.subtitle}
                    </p>
                    <p className="text-base text-on-surface-variant leading-relaxed">
                      {activeCard.description}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {activeCard.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-on-surface-variant">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/20">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                      Outcome
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {activeCard.outcomes?.[0]}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2">
                <div className="flex items-center gap-3">
                  {resolvedImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        idx === activeCardIndex
                          ? 'w-12 bg-primary'
                          : 'w-6 bg-outline-variant/40'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant mt-4 uppercase tracking-wider">
                  Scroll to explore {resolvedImages.length} frameworks
                </p>
              </div>
            </div>

            {/* ── Right: 3D orbit — rotation now driven by spring ──── */}
            <div className="relative flex justify-center items-center">
              <div
                className="relative"
                style={{ width: '100%', maxWidth: 600, height: 500, perspective }}
              >
                {/*
                  KEY CHANGE:
                  - Plain div → motion.div
                  - transform string removed
                  - rotateY receives the spring MotionValue directly
                  - NO CSS transition (was causing the 100ms stutter)
                  - willChange stays for GPU promotion
                */}
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                    rotateY: rotation,       // ← spring MotionValue, frame-perfect
                    willChange: 'transform',
                    // NO transition property here — that was the lag
                  }}
                >
                  {resolvedImages.map((img, i) => {
                    const frontness = getFrontness(i);
                    const cardOpacity = 0.35 + frontness * 0.65;
                    const cardScale = 0.88 + frontness * 0.14;
                    const isActive = i === activeCardIndex;

                    return (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: itemWidth,
                          height: itemHeight,
                          marginLeft: -itemWidth / 2,
                          marginTop: -itemHeight / 2,
                          transform: `rotateY(${angleStep * i}deg) translateZ(${radius}px) rotateX(${tiltAngle}deg) scale(${cardScale})`,
                          opacity: cardOpacity,
                          // NO transition here — removed the opacity/shadow stutter
                          borderRadius: 16,
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.92)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: isActive
                            ? `0 2px 0 rgba(255,255,255,0.8) inset,
                               0 30px 80px rgba(0,88,190,0.28),
                               0 8px 24px rgba(0,88,190,0.15),
                               0 0 0 1px rgba(0,88,190,0.2)`
                            : `0 2px 0 rgba(255,255,255,0.8) inset,
                               0 20px 60px rgba(0,0,0,0.15),
                               0 4px 16px rgba(0,0,0,0.08),
                               0 0 0 1px rgba(255,255,255,0.5)`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px 12px 12px',
                          willChange: 'transform, opacity',
                        }}
                      >
                        {/* Glass highlight */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)',
                            borderRadius: 16,
                            pointerEvents: 'none',
                            zIndex: 2,
                          }}
                        />

                        {/* Label */}
                        <div
                          style={{
                            position: 'relative',
                            zIndex: 1,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#1a2e4a',
                            opacity: 0.55,
                            fontFamily: 'inherit',
                          }}
                        >
                          {img.label}
                        </div>

                        {/* Badge image */}
                        <div
                          style={{
                            flex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          <img
                            src={img.src}
                            alt={img.alt ?? ''}
                            draggable={false}
                            style={{
                              maxWidth: '70%',
                              maxHeight: '70%',
                              objectFit: 'contain',
                              pointerEvents: 'none',
                              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))',
                            }}
                          />
                        </div>

                        {/* Subtitle + badge */}
                        <div
                          className="flex flex-col items-center gap-1"
                          style={{ position: 'relative', zIndex: 1 }}
                        >
                          <div
                            style={{
                              fontSize: 8.5,
                              fontWeight: 600,
                              textAlign: 'center',
                              color: '#3a5f8a',
                              opacity: 0.7,
                              fontFamily: 'inherit',
                              lineHeight: 1.3,
                              maxWidth: '90%',
                            }}
                          >
                            {img.subtitle}
                          </div>
                          <div
                            style={{
                              fontSize: 7,
                              fontWeight: 700,
                              textAlign: 'center',
                              color: '#0058BE',
                              opacity: 0.5,
                              fontFamily: 'inherit',
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                            }}
                          >
                            {img.badge}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}