'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AutoCoverHeading } from './typography';

const capabilities = [
  {
    id: 'compliance',
    title: 'Continuous Compliance',
    subtitle: 'ISO 27001, SOC 2, and GDPR, automated.',
    content:
      'Transform compliance from a point-in-time audit into a continuous state. Our platform automates evidence collection, maps controls across frameworks, and provides real-time readiness scoring.',
    image: 'https://framerusercontent.com/images/5C4IhXJld0XIolzDwV5ZkqemITA.png',
  },
  {
    id: 'engineering',
    title: 'Security Engineering',
    subtitle: 'Defensible architectures by design.',
    content:
      'Build resilient cloud environments from day one. We embed security into your infrastructure, utilizing Infrastructure as Code (IaC) scanning, container security, and zero-trust principles.',
    image: 'https://framerusercontent.com/images/vi0Em3tMxs7tnTJJaqPP306YhLI.png',
  },
  {
    id: 'governance',
    title: 'AI Governance & Privacy',
    subtitle: 'Harness AI safely and legally.',
    content:
      'Navigate the complex web of global AI regulations (like the EU AI Act) and privacy laws. We implement robust data governance, model risk management, and privacy-preserving technologies.',
    image: 'https://framerusercontent.com/images/5jfsr0jbrZlyWGfCeHgyo4VEkk.png',
  },
  {
    id: 'risk',
    title: 'Executive Risk Advisory',
    subtitle: 'Board-level strategic guidance.',
    content:
      'Translate technical risk into business impact. Our vCISO services provide programmatic security leadership, board reporting, and strategic roadmaps.',
    image: 'https://framerusercontent.com/images/kzyEjJMCrp8gUXCk8ttGqafiJcM.png',
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

        {/* Spotlight Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:h-[500px] lg:flex-1 lg:min-h-0">
          {capabilities.map((cap, idx) => {
            const isActive = hoveredIndex === idx;

            return (
              <motion.div
                key={cap.id}
                layout
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                }}
                className="relative overflow-hidden rounded-3xl cursor-pointer"
                style={{
                  filter: isActive ? 'saturate(1)' : 'saturate(0)',
                  transition: 'filter 0.3s ease',
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${cap.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* Overlay Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Text Content */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display, serif)' }}>
                    {cap.title.split(' ').map((word, i) => {
                      const isKeyword = ['Compliance', 'Engineering', 'Governance', 'Advisory'].includes(word);
                      return isKeyword ? (
                        <AutoCoverHeading key={i} className="text-white">{word}</AutoCoverHeading>
                      ) : (
                        <span key={i} className="text-white">{word} </span>
                      );
                    })}
                  </h3>
                  <p className="text-sm text-white/90" style={{ fontFamily: 'var(--font-display, serif)' }}>
                    {cap.content}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
