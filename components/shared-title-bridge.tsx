'use client';

import React, { useEffect, useRef, useCallback } from 'react';

// ─── Phase constants (must match scroll-driven-carousel.tsx) ─────────────────
const P3_TITLE_START  = 0.82;
const P3_COLLAPSE_END = 0.88;
const P4_END          = 1.0;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp    = (a: number, b: number, t: number) => a + (b - a) * t;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeInCubic = (t: number) => t * t * t;

const easeOutQuart = (t: number) => 1 - Math.pow(clamp01(1 - t), 4);

// ─── Snapshot captured when carousel progress reaches 1.0 ────────────────────
interface Snapshot {
  /** Visual center X of the carousel title in viewport coords */
  cx: number;
  /** Visual center Y of the carousel title in viewport coords */
  cy: number;
  /** Bridge element's natural offsetHeight (no transforms) */
  bridgeH: number;
  /** Carousel title's getBCR height at snapshot moment (includes carousel scale) */
  originH: number;
  /** capEl center Y at the moment of Mode-2 entry */
  capStartY: number;
  /**
   * capEl center Y at which the bridge finishes traveling and cross-fades.
   * Measured as winH * 0.38 so it works across viewport sizes.
   */
  capEndY: number;
  /**
   * Scale at travelT=1.0 so the bridge font matches the capabilities h2 font.
   * = capFontPx / bridgeFontPx  (handles text-4xl vs text-6xl breakpoint)
   */
  endScale: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SharedTitleBridge
//
// Mounts a position:fixed text element that:
//  • MODE 1 (carousel active): mirrors #carousel-title-origin position & opacity
//  • MODE 2 (post-carousel):   travels from the snapshot position toward
//                              #capabilities-title-anchor, then cross-fades
//
// Requires:
//  • [data-carousel-section] on the carousel <section>
//  • id="carousel-title-origin" on the carousel's floating title div
//    (that div should have opacity:0 so only the bridge renders the text)
//  • id="capabilities-title-anchor" on the capabilities <h2>
// ─────────────────────────────────────────────────────────────────────────────
export default function SharedTitleBridge() {
  const bridgeRef   = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<Snapshot | null>(null);

  // Cached natural height of the bridge element (reset on resize)
  const bridgeHRef = useRef<number>(72);

  // ── Measure bridge natural height once and on resize ─────────────────────
  useEffect(() => {
    const measure = () => {
      if (bridgeRef.current) {
        bridgeHRef.current = bridgeRef.current.offsetHeight || 72;
      }
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ── Core update — runs on every scroll frame ──────────────────────────────
  const update = useCallback(() => {
    const bridge = bridgeRef.current;
    if (!bridge) return;

    const carouselSection = document.querySelector(
      '[data-carousel-section]',
    ) as HTMLElement | null;
    const originEl = document.getElementById(
      'carousel-title-origin',
    ) as HTMLElement | null;
    const capEl = document.getElementById(
      'capabilities-title-anchor',
    ) as HTMLElement | null;

    // If any anchor missing, hide bridge and bail
    if (!carouselSection || !originEl || !capEl) {
      bridge.style.opacity = '0';
      return;
    }

    const winH = window.innerHeight;

    // ── Derive carousel scroll progress (replicates carousel's own formula) ─
    const carouselRect = carouselSection.getBoundingClientRect();
    const sectionH     = carouselSection.offsetHeight;
    const rawProgress  = -carouselRect.top / Math.max(1, sectionH - winH);
    const progress     = clamp01(rawProgress);

    // Carousel's internal title emergence / phase values
    const titleProgress = progress >= P3_TITLE_START
      ? clamp01((progress - P3_TITLE_START) / (P3_COLLAPSE_END - P3_TITLE_START))
      : 0;

    const titlePhase = progress >= P3_COLLAPSE_END
      ? clamp01((progress - P3_COLLAPSE_END) / (P4_END - P3_COLLAPSE_END))
      : 0;

    // ── Bridge completely inactive ────────────────────────────────────────────
    if (titleProgress <= 0) {
      bridge.style.opacity = '0';
      snapshotRef.current  = null;
      capEl.style.opacity  = '';
      return;
    }

    // ══════════════════════════════════════════════════════════════════════════
    // MODE 1  —  Carousel still scrolling (progress < 1.0)
    // Bridge mirrors #carousel-title-origin position & opacity exactly.
    // ══════════════════════════════════════════════════════════════════════════
    if (progress < 1.0) {
      snapshotRef.current = null; // reset so Mode-2 always gets a fresh snapshot

      const oRect  = originEl.getBoundingClientRect();
      const oCX    = oRect.left + oRect.width  / 2;
      const oCY    = oRect.top  + oRect.height / 2;
      const bridgeH = bridgeHRef.current || 1;

      // Scale bridge so its visual size matches the carousel title
      // oRect.height already includes the carousel's CSS scale() transform
      const scaleToMatch = oRect.height / bridgeH;

      // Replicate carousel's titleOpacity
      const opacity = titlePhase > 0.7
        ? lerp(1, 0, (titlePhase - 0.7) / 0.3)
        : lerp(0, 1, easeInCubic(titleProgress));

      // Replicate carousel's titleBlur
      const blurPx = titlePhase > 0.7
        ? lerp(0, 4, (titlePhase - 0.7) / 0.3)
        : lerp(6, 0, titleProgress);

      // Suppress capabilities h2 while bridge is live
      if (opacity > 0.04) capEl.style.opacity = '0';
      else                 capEl.style.opacity = '';

      bridge.style.left      = `${oCX}px`;
      bridge.style.top       = `${oCY}px`;
      bridge.style.transform = `translate(-50%, -50%) scale(${scaleToMatch.toFixed(4)})`;
      bridge.style.opacity   = opacity.toFixed(4);
      bridge.style.filter    = blurPx > 0.08 ? `blur(${blurPx.toFixed(2)}px)` : '';
      return;
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Snapshot  —  taken once at the carousel → capabilities handoff
    // ══════════════════════════════════════════════════════════════════════════
    if (!snapshotRef.current) {
      const oRect    = originEl.getBoundingClientRect();
      const capRect  = capEl.getBoundingClientRect();
      const capCYNow = capRect.top + capRect.height / 2;

      // If the user deep-linked to the capabilities section (h2 already on screen),
      // skip the bridge entirely so we don't fight its natural render.
      if (capCYNow < winH * 0.78) {
        bridge.style.opacity = '0';
        capEl.style.opacity  = '';
        return;
      }

      // Compute per-breakpoint endScale so bridge exactly matches cap h2 font
      const capFontPx    = parseFloat(window.getComputedStyle(capEl).fontSize)    || 60;
      const bridgeFontPx = parseFloat(window.getComputedStyle(bridge).fontSize)   || 60;
      const endScale     = capFontPx / bridgeFontPx;

      snapshotRef.current = {
        cx:        oRect.left + oRect.width  / 2,
        cy:        oRect.top  + oRect.height / 2,
        bridgeH:   bridgeHRef.current || 1,
        originH:   oRect.height,  // visual height incl. carousel's scale(1.4)
        capStartY: capCYNow,
        capEndY:   winH * 0.38,   // merge when cap h2 centre is 38% from viewport top
        endScale,
      };
    }

    // ══════════════════════════════════════════════════════════════════════════
    // MODE 2  —  Bridge travels from carousel snapshot → capabilities h2
    // ══════════════════════════════════════════════════════════════════════════
    const snap    = snapshotRef.current;
    const capRect = capEl.getBoundingClientRect();
    const capCX   = capRect.left + capRect.width  / 2;
    const capCY   = capRect.top  + capRect.height / 2;

    // rawT: 0 when cap is at its entry position, 1 when at the merge position
    const denom = snap.capStartY - snap.capEndY;
    const rawT  = denom > 0 ? clamp01((snap.capStartY - capCY) / denom) : 0;
    const easedT = easeInOutCubic(rawT);

    // ── Position ──────────────────────────────────────────────────────────────
    const bridgeX = lerp(snap.cx, capCX, easedT);
    const bridgeY = lerp(snap.cy, capCY, easedT);

    // ── Scale ─────────────────────────────────────────────────────────────────
    // startScale: makes bridge appear same size as the carousel title at its peak (scale 1.4)
    // endScale:   makes bridge appear same size as the capabilities h2
    const startScale  = snap.bridgeH > 0 ? snap.originH / snap.bridgeH : 1;
    const bridgeScale = lerp(startScale, snap.endScale, easedT);

    // ── Cross-fade: bridge out / cap h2 in ───────────────────────────────────
    let bridgeOpacity: number;
    let capOpacity:    number;

    if (rawT >= 0.85) {
      const fadeT    = (rawT - 0.85) / 0.15;
      bridgeOpacity  = lerp(1, 0, fadeT);
      capOpacity     = easeOutQuart(fadeT);
    } else {
      bridgeOpacity = 1;
      capOpacity    = 0;
    }

    // Soft dissolve blur as the text "merges"
    const blurPx = rawT > 0.88 ? lerp(0, 2.5, (rawT - 0.88) / 0.12) : 0;

    bridge.style.left      = `${bridgeX.toFixed(2)}px`;
    bridge.style.top       = `${bridgeY.toFixed(2)}px`;
    bridge.style.transform = `translate(-50%, -50%) scale(${bridgeScale.toFixed(4)})`;
    bridge.style.opacity   = bridgeOpacity.toFixed(4);
    bridge.style.filter    = blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : '';
    capEl.style.opacity    = capOpacity.toFixed(4);

    // Fully merged — hand off completely and clean up
    if (rawT >= 1.0) {
      bridge.style.opacity = '0';
      capEl.style.opacity  = '';
    }
  }, []);

  // ── Wire scroll + resize listeners ───────────────────────────────────────
  useEffect(() => {
    const onScroll = () => update();
    const onResize = () => {
      snapshotRef.current = null;
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    update(); // run once on mount to set initial state

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      // Ensure capabilities h2 is always visible on unmount
      const capEl = document.getElementById('capabilities-title-anchor');
      if (capEl) capEl.style.opacity = '';
    };
  }, [update]);

  // ── The fixed overlay element ─────────────────────────────────────────────
  return (
    <div
      ref={bridgeRef}
      aria-hidden="true"
      style={{
        // Positioning — updated imperatively in update()
        position:      'fixed',
        left:          0,
        top:           0,
        margin:        0,
        padding:       0,

        // Initially invisible; opacity driven imperatively
        opacity:       0,
        pointerEvents: 'none',
        zIndex:        9999,

        // Typography — matches capabilities h2 (Playfair Display, text-6xl equiv)
        fontFamily:    'var(--font-display), serif',
        // Fixed size so scale() math is deterministic across breakpoints.
        // endScale compensates for text-4xl (mobile) vs text-6xl (desktop).
        fontSize:      '3.75rem',
        fontWeight:    700,
        letterSpacing: '-0.02em',
        color:         '#0A1628',
        lineHeight:    1.2,

        // Performance
        willChange:      'transform, opacity, filter',
        transformOrigin: 'center center',
        whiteSpace:      'nowrap',
        userSelect:      'none',
        boxSizing:       'border-box',
      }}
    >
      Operationalize Security.
    </div>
  );
}
