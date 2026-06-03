'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface CarouselImage {
  src: string;
  alt?: string;
  label?: string;
}

interface CircularCarouselProps {
  images?: CarouselImage[];
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
  perspective?: number;
  rotationSpeed?: number;
  tiltAngle?: number;
  style?: React.CSSProperties;
}

const defaultImages: CarouselImage[] = [
  { src: 'https://habilesec.com/static/media/DPDPA.9cd629de45bfac7cdee9.png', alt: 'DPDPA', label: 'DPDPA' },
  { src: 'https://habilesec.com/static/media/GDPR.0f425626f1ff36f782e9.png', alt: 'GDPR', label: 'GDPR' },
  { src: 'https://habilesec.com/static/media/ISO%2042001.6a01f51eb6e86ed5f324.png', alt: 'ISO 42001', label: 'ISO 42001' },
  { src: 'https://habilesec.com/static/media/ISO%2027001.1292b81bc3640c672614.png', alt: 'ISO 27001', label: 'ISO 27001' },
  { src: 'https://habilesec.com/static/media/ISO%2027701.9b723ac5a98e9fa7bd64.png', alt: 'ISO 27701', label: 'ISO 27701' },
  { src: 'https://habilesec.com/static/media/Soc2.da182ba3e2be89879df3.png', alt: 'SOC 2', label: 'SOC 2' },
];

export default function CircularCarousel({
  images,
  radius = 300,
  itemWidth = 260,
  itemHeight = 180,
  perspective = 1400,
  rotationSpeed = 0.15,
  tiltAngle = -12,
  style,
}: CircularCarouselProps) {
  const resolvedImages = !images || images.length === 0 ? defaultImages : images;

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const autoRaf = useRef<number | null>(null);
  const inertiaRaf = useRef<number | null>(null);

  // -------- POINTER DRAG --------
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      dragging.current = true;
      setIsDragging(true);
      lastX.current = e.clientX;
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      velocity.current = dx * 0.6;
      setRotation((r) => r + dx * 0.6);
    }
    function onPointerUp() {
      dragging.current = false;
      setIsDragging(false);
    }
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // -------- INERTIA --------
  useEffect(() => {
    function animate() {
      if (!dragging.current && Math.abs(velocity.current) > 0.01) {
        setRotation((r) => r + velocity.current);
        velocity.current *= 0.92;
      }
      inertiaRaf.current = requestAnimationFrame(animate);
    }
    inertiaRaf.current = requestAnimationFrame(animate);
    return () => {
      if (inertiaRaf.current) cancelAnimationFrame(inertiaRaf.current);
    };
  }, []);

  // -------- AUTO ROTATE --------
  useEffect(() => {
    function auto() {
      if (!dragging.current) {
        setRotation((r) => r + rotationSpeed);
      }
      autoRaf.current = requestAnimationFrame(auto);
    }
    autoRaf.current = requestAnimationFrame(auto);
    return () => {
      if (autoRaf.current) cancelAnimationFrame(autoRaf.current);
    };
  }, [rotationSpeed]);

  const N = resolvedImages.length;
  const angleStep = 360 / N;

  // Compute normalised "frontness" (1 = facing viewer, 0 = facing away)
  const getFrontness = (i: number) => {
    const angle = ((angleStep * i + rotation) % 360 + 360) % 360;
    // angle ~0° means front, ~180° means back
    return (Math.cos((angle * Math.PI) / 180) + 1) / 2;
  };

  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        perspective,
        overflow: 'visible',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {resolvedImages.map((img, i) => {
          const frontness = getFrontness(i);
          // Cards at the front are fully opaque & slightly larger; back cards fade & shrink
          const cardOpacity = 0.35 + frontness * 0.65;
          const cardScale = 0.88 + frontness * 0.14;

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
                transition: 'opacity 0.05s linear',
                borderRadius: 20,
                overflow: 'hidden',
                // Layered glassmorphism card
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: `
                  0 2px 0 rgba(255,255,255,0.8) inset,
                  0 20px 60px rgba(0,0,0,0.22),
                  0 4px 16px rgba(0,0,0,0.10),
                  0 0 0 1px rgba(255,255,255,0.5)
                `,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                padding: '28px 24px 18px',
              }}
            >
              {/* Shine overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)',
                  borderRadius: 20,
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Logo */}
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
                    maxWidth: '75%',
                    maxHeight: '75%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))',
                  }}
                />
              </div>

              {/* Label */}
              {img.label && (
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#1a2e4a',
                    opacity: 0.55,
                    marginTop: 4,
                    fontFamily: 'inherit',
                  }}
                >
                  {img.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
