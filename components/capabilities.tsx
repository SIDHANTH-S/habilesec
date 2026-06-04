'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, BookOpen, Lock, Terminal, ArrowRight } from 'lucide-react';

const capabilities = [
  {
    id: 'compliance',
    title: 'Continuous Compliance',
    subtitle: 'ISO 27001, SOC 2, and GDPR, automated.',
    icon: <Lock className="w-6 h-6" />,
    accent: '#0077B6',
    content:
      'Transform compliance from a point-in-time audit into a continuous state. Our platform automates evidence collection, maps controls across frameworks, and provides real-time readiness scoring. Eliminate the spreadsheet burden and approach auditors with absolute certainty.',
    metrics: ['80% faster audits', 'Continuous monitoring', 'Automated evidence collection'],
  },
  {
    id: 'engineering',
    title: 'Security Engineering',
    subtitle: 'Defensible architectures by design.',
    icon: <Terminal className="w-6 h-6" />,
    accent: '#0096C7',
    content:
      'Build resilient cloud environments from day one. We embed security into your infrastructure, utilizing Infrastructure as Code (IaC) scanning, container security, and zero-trust principles. Stop reacting to vulnerabilities and start engineering them out.',
    metrics: ['Zero-trust architecture', 'Shift-left security', 'Automated remediation'],
  },
  {
    id: 'governance',
    title: 'AI Governance & Privacy',
    subtitle: 'Harness AI safely and legally.',
    icon: <BookOpen className="w-6 h-6" />,
    accent: '#00B4D8',
    content:
      'Navigate the complex web of global AI regulations (like the EU AI Act) and privacy laws. We implement robust data governance, model risk management, and privacy-preserving technologies to ensure your innovation does not outpace your compliance.',
    metrics: ['EU AI Act Readiness', 'Data mapping', 'Algorithmic bias testing'],
  },
  {
    id: 'risk',
    title: 'Executive Risk Advisory',
    subtitle: 'Board-level strategic guidance.',
    icon: <ShieldAlert className="w-6 h-6" />,
    accent: '#023E8A',
    content:
      'Translate technical risk into business impact. Our vCISO services provide programmatic security leadership, board reporting, and strategic roadmaps. Align your security investments with business objectives and regulatory demands.',
    metrics: ['Quantifiable risk metrics', 'Board-ready reporting', 'Strategic roadmapping'],
  },
];

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen lg:h-screen flex flex-col justify-center py-20 lg:py-0 bg-white border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full h-full flex flex-col justify-center">

        <div className="flex flex-col items-center text-center mb-12 lg:mb-14 lg:mt-14">
          <h2
            id="capabilities-title-anchor"
            className="text-4xl md:text-6xl font-display text-primary mb-6"
          >
            Operationalize Security.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            We move beyond traditional consulting by embedding our expertise into your workflows
            through the Tanikkai platform. Capability, not just capacity.
          </p>
        </div>

        {/* Card Row */}
        <div
          className="flex flex-col lg:flex-row gap-3 w-full lg:h-[500px] lg:flex-1 lg:min-h-0 lg:items-stretch"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {capabilities.map((cap, idx) => {
            const isActive = hoveredIndex === idx;

            return (
              <motion.div
                key={cap.id}
                layout
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(isActive ? null : idx)}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                }}
                className={`relative overflow-hidden cursor-pointer rounded-2xl border transition-colors duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'flex-none h-[460px] sm:h-[380px] lg:h-full lg:flex-[3.5] bg-white border-primary/20 shadow-xl'
                    : 'flex-none h-[90px] lg:h-full lg:flex-[0.7] bg-surface border-outline-variant/30 hover:border-outline-variant/60 hover:bg-surface-container-low'
                }`}
              >
                {/* Accent top bar — always present, subtle when collapsed */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${cap.accent}, transparent)`,
                    opacity: isActive ? 1 : 0.4,
                  }}
                />

                <AnimatePresence mode="popLayout">
                  {isActive ? (
                    /* ── Expanded ── */
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="h-full flex flex-col justify-center items-center text-center w-full space-y-6 md:space-y-8 p-6 md:p-8"
                    >
                      <div className="space-y-4 md:space-y-5 flex flex-col items-center">
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                          style={{ backgroundColor: cap.accent }}
                        >
                          {cap.icon}
                        </div>

                        {/* Title + subtitle */}
                        <div>
                          <h3 className="text-2xl md:text-4xl font-display text-primary font-bold">
                            {cap.title}
                          </h3>
                          <p className="text-sm md:text-base font-semibold text-secondary mt-2">
                            {cap.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: 0.08 }}
                          className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl"
                        >
                          {cap.content}
                        </motion.p>

                        {/* Metrics */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: 0.15 }}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl"
                        >
                          {cap.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-center gap-2 p-3 bg-surface-container-low/50 border border-outline-variant/20 rounded-xl"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: cap.accent }}
                              />
                              <span className="text-xs text-on-surface-variant font-mono font-medium leading-tight">
                                {metric}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      </div>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.22 }}
                        className="pt-2"
                      >
                        <button
                          className="flex items-center gap-2 font-bold tracking-widest uppercase text-xs transition-colors group"
                          style={{ color: cap.accent }}
                        >
                          Explore Module{' '}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    /* ── Collapsed ── */
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="h-full flex lg:flex-col items-center lg:items-start justify-between w-full p-5 md:p-6"
                    >
                      {/* Desktop collapsed */}
                      <div className="hidden lg:flex flex-col items-start gap-6 w-full h-full justify-between">
                        <div
                          className="p-2.5 rounded-xl text-white"
                          style={{ backgroundColor: `${cap.accent}22`, color: cap.accent }}
                        >
                          {cap.icon}
                        </div>

                        {/* Vertical title */}
                        <div className="flex-1 flex items-center justify-center w-full py-4 overflow-hidden">
                          <h3
                            className="font-display font-semibold text-lg text-primary/80 whitespace-nowrap select-none tracking-wide"
                            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
                          >
                            {cap.title}
                          </h3>
                        </div>

                        <span className="font-mono text-sm font-semibold text-primary/25 w-full text-left">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Mobile collapsed */}
                      <div className="flex lg:hidden items-center justify-between w-full h-full">
                        <div className="flex items-center gap-4">
                          <div
                            className="p-2.5 rounded-xl"
                            style={{ backgroundColor: `${cap.accent}18`, color: cap.accent }}
                          >
                            {cap.icon}
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-primary text-base">{cap.title}</h3>
                            <p className="text-xs text-on-surface-variant/70 line-clamp-1">
                              {cap.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-semibold text-primary/25">
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
