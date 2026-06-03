'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, BookOpen, Lock, Terminal, ArrowRight } from 'lucide-react';

const capabilities = [
  {
    id: 'compliance',
    title: 'Continuous Compliance',
    subtitle: 'ISO 27001, SOC 2, and GDPR, automated.',
    icon: <Lock className="w-6 h-6" />,
    content: 'Transform compliance from a point-in-time audit into a continuous state. Our platform automates evidence collection, maps controls across frameworks, and provides real-time readiness scoring. Eliminate the spreadsheet burden and approach auditors with absolute certainty.',
    metrics: ['80% faster audits', 'Continuous monitoring', 'Automated evidence collection']
  }, 
  {
    id: 'engineering',
    title: 'Security Engineering',
    subtitle: 'Defensible architectures by design.',
    icon: <Terminal className="w-6 h-6" />,
    content: 'Build resilient cloud environments from day one. We embed security into your infrastructure, utilizing Infrastructure as Code (IaC) scanning, container security, and zero-trust principles. Stop reacting to vulnerabilities and start engineering them out.',
    metrics: ['Zero-trust architecture', 'Shift-left security', 'Automated remediation']
  },
  {
    id: 'governance',
    title: 'AI Governance & Privacy',
    subtitle: 'Harness AI safely and legally.',
    icon: <BookOpen className="w-6 h-6" />,
    content: 'Navigate the complex web of global AI regulations (like the EU AI Act) and privacy laws. We implement robust data governance, model risk management, and privacy-preserving technologies to ensure your innovation does not outpace your compliance.',
    metrics: ['EU AI Act Readiness', 'Data mapping', 'Algorithmic bias testing']
  },
  {
    id: 'risk',
    title: 'Executive Risk Advisory',
    subtitle: 'Board-level strategic guidance.',
    icon: <ShieldAlert className="w-6 h-6" />,
    content: 'Translate technical risk into business impact. Our vCISO services provide programmatic security leadership, board reporting, and strategic roadmaps. Align your security investments with business objectives and regulatory demands.',
    metrics: ['Quantifiable risk metrics', 'Board-ready reporting', 'Strategic roadmapping']
  }
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveringStack, setIsHoveringStack] = useState(false);

  // Auto-advance timing state (default 5s)
  const [advanceMs, setAdvanceMs] = useState(5000);

  // Auto-advance slider. Recreate interval on advanceMs, activeIndex, or hovering state change.
  useEffect(() => {
    if (isHoveringStack) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % capabilities.length);
    }, advanceMs) as unknown as number;
    return () => window.clearInterval(id);
  }, [advanceMs, activeIndex, isHoveringStack]);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen lg:h-screen flex flex-col justify-center py-20 lg:py-0 bg-white border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full h-full flex flex-col justify-center">

        <div className="flex flex-col items-center text-center mb-12 lg:mb-14 lg:mt-14">
          <h2 className="text-4xl md:text-6xl font-display text-primary mb-6">
            Operationalize Security.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            We move beyond traditional consulting by embedding our expertise into your workflows through the Tanikkai platform. Capability, not just capacity.
          </p>
        </div>

        {/* Fluid Card Stack Container */}
        <div 
          className="flex flex-col lg:flex-row gap-6 w-full lg:h-[500px] lg:flex-1 lg:min-h-0 lg:items-stretch"
          onMouseEnter={() => setIsHoveringStack(true)}
          onMouseLeave={() => setIsHoveringStack(false)}
        >
          {capabilities.map((cap, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={cap.id}
                layout
                onClick={() => {
                  setActiveIndex(idx);
                  // Extend auto-advance duration on manual interaction
                  setAdvanceMs(10000);
                  setTimeout(() => setAdvanceMs(5000), 10000);
                }}
                onMouseEnter={() => {
                  setActiveIndex(idx);
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                }}
                className={`relative overflow-hidden cursor-pointer rounded-2xl border transition-all duration-500 p-6 md:p-8 flex flex-col justify-between ${
                  isActive
                    ? 'flex-none h-[460px] sm:h-[380px] lg:h-full lg:flex-[3.5] bg-white border-primary shadow-xl ring-1 ring-primary/5'
                    : 'flex-none h-[90px] lg:h-full lg:flex-[0.7] bg-surface border-outline-variant/30 hover:border-outline-variant/60 hover:bg-surface-container-low'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isActive ? (
                    // Expanded State Card Content
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between w-full"
                    >
                      <div className="space-y-4 md:space-y-6">
                        {/* Top Row: Icon and Index */}
                        <div className="flex items-center justify-between">
                          <div className="p-3 bg-primary/5 text-primary rounded-xl">
                            {cap.icon}
                          </div>
                          <span className="font-mono text-sm font-semibold text-primary/40">
                            0{idx + 1}
                          </span>
                        </div>

                        {/* Title and Subtitle */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display text-primary font-bold">
                            {cap.title}
                          </h3>
                          <p className="text-sm font-semibold text-secondary mt-1">
                            {cap.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl">
                          {cap.content}
                        </p>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {cap.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 bg-surface-container-low/50 border border-outline-variant/20 rounded-xl"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="text-xs text-on-surface-variant font-mono font-medium leading-tight">
                                {metric}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Explore CTA */}
                      <div className="pt-4 lg:pt-0">
                        <button className="flex items-center gap-2 text-primary hover:text-secondary font-bold tracking-wide uppercase text-xs transition-colors group">
                          Explore Module <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    // Collapsed State Card Content
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex lg:flex-col items-center lg:items-start justify-between w-full"
                    >
                      {/* Desktop Collapsed View */}
                      <div className="hidden lg:flex flex-col items-start gap-6 w-full h-full justify-between">
                        <div className="p-2.5 bg-transparent text-on-surface-variant/70 rounded-lg">
                          {cap.icon}
                        </div>

                        {/* Vertical rotated title */}
                        <div className="flex-1 flex items-center justify-center w-full py-4 overflow-hidden">
                          <span className="font-display font-semibold text-lg text-primary/80 whitespace-nowrap rotate-180 [writing-mode:vertical-lr] select-none tracking-wide">
                            {cap.title}
                          </span>
                        </div>

                        <span className="font-mono text-sm font-semibold text-primary/30 w-full text-left pl-2">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Mobile Collapsed View */}
                      <div className="flex lg:hidden items-center justify-between w-full h-full">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-primary/5 text-primary rounded-xl">
                            {cap.icon}
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-primary text-base">
                              {cap.title}
                            </h3>
                            <p className="text-xs text-on-surface-variant/70 line-clamp-1">
                              {cap.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-semibold text-primary/30">
                          0{idx + 1}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
