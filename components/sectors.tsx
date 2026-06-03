'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Landmark, HeartPulse, Cpu, Box } from 'lucide-react';

const industries = [
  {
    icon: <Landmark />,
    name: 'Financial Services',
    desc: 'Navigate DORA, GLBA, and NYDFS with automated continuous controls monitoring.',
    tags: ['DORA', 'GLBA']
  },
  {
    icon: <HeartPulse />,
    name: 'Healthcare & Life Sciences',
    desc: 'Protect PHI and ensure HIPAA and HITRUST compliance across complex supply chains.',
    tags: ['HIPAA', 'HITRUST']
  },
  {
    icon: <Cpu />,
    name: 'Technology & SaaS',
    desc: 'Fast-track SOC 2 and ISO 27001 to unblock enterprise sales cycles.',
    tags: ['SOC 2', 'ISO 27001']
  },
  {
    icon: <Box />,
    name: 'Critical Infrastructure',
    desc: 'Align OT/IT environments with NIS2 frameworks and zero-trust principles.',
    tags: ['NIS2', 'Zero-Trust']
  }
];

export default function Sectors() {
  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="mb-20">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Sector Intelligence</p>
          <h2 className="text-4xl md:text-6xl font-display text-primary max-w-2xl leading-tight">
            Vertical-specific risk posture.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-none bg-white border border-outline-variant/30 group hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <div className="w-12 h-12 rounded-none bg-surface-container-low border border-outline-variant/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {React.cloneElement(industry.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{industry.name}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">{industry.desc}</p>
              </div>
              
              <div className="flex gap-2 mt-8">
                {industry.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1.5 rounded-none bg-surface border border-outline-variant/30 text-on-surface-variant font-bold text-xs font-mono group-hover:border-primary/30 group-hover:text-primary transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
