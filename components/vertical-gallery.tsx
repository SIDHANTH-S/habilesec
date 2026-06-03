'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface VerticalGalleryProps {
  images?: GalleryImage[];
}

const defaultImages: GalleryImage[] = [
  { src: '/hero/AIGOV.png', alt: 'AI Governance', width: 1254, height: 1254 },
  { src: '/hero/Cyber.png', alt: 'Cybersecurity', width: 1536, height: 1024 },
  { src: '/hero/DPDA.png', alt: 'Data Protection', width: 2048, height: 2048 },
  { src: '/hero/GDPR.png', alt: 'GDPR Compliance', width: 1305, height: 1205 },
  { src: '/hero/Industry.png', alt: 'Industry Standards', width: 1536, height: 1024 },
  { src: '/hero/ISO42.png', alt: 'ISO 42001', width: 1784, height: 1847 },
  { src: '/hero/REG.png', alt: 'Regulatory Framework', width: 965, height: 1477 },
  { src: '/hero/SOC2.png', alt: 'SOC 2', width: 1402, height: 1122 },
];

interface MasonryColumn {
  images: Array<GalleryImage & { calculatedHeight: number }>;
  totalHeight: number;
}

export default function VerticalGallery({ images }: VerticalGalleryProps) {
  const resolvedImages = images || defaultImages;
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<[MasonryColumn, MasonryColumn] | null>(null);

  // Fixed column width for aspect ratio calculations (will be responsive in CSS)
  const COLUMN_WIDTH = 400;

  useEffect(() => {
    // Calculate masonry layout
    const calculateMasonryLayout = () => {
      const col1: MasonryColumn = { images: [], totalHeight: 0 };
      const col2: MasonryColumn = { images: [], totalHeight: 0 };

      // Duplicate images for infinite scroll
      const duplicatedImages = [...resolvedImages, ...resolvedImages];

      duplicatedImages.forEach((img) => {
        // Calculate rendered height based on aspect ratio
        const aspectRatio = (img.width || 800) / (img.height || 600);
        const calculatedHeight = COLUMN_WIDTH / aspectRatio;

        // Place in shortest column for balance
        const targetColumn = col1.totalHeight <= col2.totalHeight ? col1 : col2;
        targetColumn.images.push({ ...img, calculatedHeight });
        targetColumn.totalHeight += calculatedHeight + 12; // Add gap spacing
      });

      setColumns([col1, col2]);
    };

    calculateMasonryLayout();
  }, [resolvedImages]);

  useEffect(() => {
    if (!columns) return;

    // Smooth infinite scroll animation
    const animateColumn = (element: HTMLElement, duration: number) => {
      if (!element) return;
      
      let scrollPosition = 0;
      let lastTime = Date.now();
      let animationFrameId: number;
      
      const smoothAnimate = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Calculate speed to complete full cycle in 'duration' milliseconds
        const speed = (element.scrollHeight / 2) / (duration / 1000);
        scrollPosition += (speed * deltaTime) / 1000;
        
        const maxScroll = element.scrollHeight / 2;
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        element.style.transform = `translateY(-${scrollPosition}px)`;
        animationFrameId = requestAnimationFrame(smoothAnimate);
      };
      
      animationFrameId = requestAnimationFrame(smoothAnimate);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    };

    const cleanup1 = column1Ref.current ? animateColumn(column1Ref.current, 45000) : undefined;
    const cleanup2 = column2Ref.current ? animateColumn(column2Ref.current, 52000) : undefined;

    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, [columns]);

  if (!columns) {
    return <div className="relative w-full h-full overflow-hidden" />;
  }

  const [col1, col2] = columns;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Top gradient mask to fade images under navbar */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background via-background/60 to-transparent z-10 pointer-events-none" />
      
      {/* Gallery columns container - extends beyond visible area */}
      <div className="absolute inset-0 -top-12 -bottom-12 flex gap-[10px] md:gap-3 pr-0">
        {/* Column 1 - Desktop only */}
        <div className="hidden md:flex flex-col flex-1 overflow-hidden">
          <div ref={column1Ref} className="flex flex-col gap-[10px] md:gap-3 pt-24">
            {col1.images.map((img, idx) => (
              <div
                key={`col1-${idx}`}
                className="relative overflow-hidden rounded-[20px] group w-full"
                style={{
                  aspectRatio: `${img.width || 800} / ${img.height || 600}`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt || ''}
                  fill
                  className="object-contain transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                  style={{
                    transform: 'scale(1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.filter = 'brightness(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 - Always visible, offset for editorial layout */}
        <div className="flex flex-col flex-1 overflow-hidden mt-0 md:mt-24">
          <div ref={column2Ref} className="flex flex-col gap-[10px] md:gap-3 pt-24 md:pt-0">
            {col2.images.map((img, idx) => (
              <div
                key={`col2-${idx}`}
                className="relative overflow-hidden rounded-[20px] group w-full"
                style={{
                  aspectRatio: `${img.width || 800} / ${img.height || 600}`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt || ''}
                  fill
                  className="object-contain transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                  style={{
                    transform: 'scale(1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.filter = 'brightness(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
