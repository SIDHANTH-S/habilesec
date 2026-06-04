'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate, useInView } from 'motion/react';

// ============================================
// RotatingHeadline - Hero Section
// Slow transition, fade + vertical motion only
// ============================================
interface RotatingHeadlineProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function RotatingHeadline({ words, className = '', interval = 3500 }: RotatingHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline-block relative ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : -20,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute left-0 top-0 w-full"
          style={{
            fontFamily: 'var(--font-display, serif)',
          }}
        >
          {word}
        </motion.span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  );
}

// ============================================
// ScrollText - Hero Metrics
// Numbers count upward, fade into view, trigger once
// ============================================
interface ScrollTextProps {
  value: string;
  className?: string;
  inView?: boolean;
}

export function ScrollText({ value, className = '', inView = true }: ScrollTextProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[\d]/g, '');

    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(`${Math.floor(current)}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {displayValue}
    </motion.span>
  );
}

// ============================================
// ClipPathReveal - Strategic Ecosystem
// Single reveal on viewport entry, no repeating
// ============================================
interface ClipPathRevealProps {
  children: React.ReactNode;
  className?: string;
  inView?: boolean;
}

export function ClipPathReveal({ children, className = '', inView = true }: ClipPathRevealProps) {
  return (
    <motion.span
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// AutoCoverHeading - Capabilities Keywords
// Subtle hover effect on keywords only
// ============================================
interface AutoCoverHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function AutoCoverHeading({ children, className = '' }: AutoCoverHeadingProps) {
  return (
    <motion.span
      whileHover={{ color: '#0096C7' }}
      transition={{ duration: 0.3 }}
      className={`inline-block cursor-default ${className}`}
      style={{
        fontFamily: 'var(--font-display, serif)',
      }}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// MotionColourText - Cyber Framework
// Subtle blue → cyan accent on active stage
// ============================================
interface MotionColourTextProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export function MotionColourText({ children, isActive, className = '' }: MotionColourTextProps) {
  return (
    <motion.span
      animate={{
        color: isActive ? '#00B4D8' : '#0A1628',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={className}
      style={{
        fontFamily: 'var(--font-display, serif)',
      }}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// RotatingText - Tanikkai OS Engine
// Rotate every 3-4 seconds, fade transition only
// ============================================
interface RotatingTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function RotatingText({ words, className = '', interval = 3500 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, display: 'none' }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            display: index === currentIndex ? 'inline' : 'none',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            fontFamily: 'var(--font-display, serif)',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ============================================
// MagnetText - Sector Intelligence
// Very low magnet strength, desktop only
// ============================================
interface MagnetTextProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagnetText({ children, className = '', strength = 10 }: MagnetTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX / strength);
    y.set(mouseY / strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isDesktop) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// AnimatedTextHeading - Final CTA
// Hover activated, blue → cyan shift
// ============================================
interface AnimatedTextHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedTextHeading({ children, className = '' }: AnimatedTextHeadingProps) {
  return (
    <motion.span
      whileHover={{ color: '#00B4D8' }}
      transition={{ duration: 0.3 }}
      className={`inline-block cursor-default ${className}`}
      style={{
        fontFamily: 'var(--font-display, serif)',
      }}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// TextFlow - Astra-style text flow for navbars
// Text elements animate smoothly from bottom and merge into header
// ============================================
interface TextFlowProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  inView?: boolean;
}

export function TextFlow({ children, className = '', delay = 0, duration = 0.8, inView = true }: TextFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: inView && isInView ? 0 : 60, opacity: inView && isInView ? 1 : 0 }}
        transition={{ 
          duration, 
          delay,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
