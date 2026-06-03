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
  const [activeTab, setActiveTab] = useState(capabilities[0].id);

  return (
    <section className="py-32 bg-white relative border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display text-primary mb-6">
            Operationalize Security.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            We move beyond traditional consulting by embedding our expertise into your workflows through the Tanikkai platform. Capability, not just capacity.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Navigation List */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={`text-left p-6 transition-all duration-300 border-l-[3px] rounded-none ${
                  activeTab === cap.id 
                    ? 'bg-surface border-primary' 
                    : 'bg-transparent border-transparent hover:bg-surface-container-low hover:border-outline-variant/50'
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 ${activeTab === cap.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {cap.icon}
                  </div>
                  <h3 className={`font-semibold ${activeTab === cap.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {cap.title}
                  </h3>
                </div>
                <p className={`text-sm pl-14 hidden md:block ${activeTab === cap.id ? 'text-on-surface-variant' : 'text-outline-variant'}`}>{cap.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Content Viewer */}
          <div className="lg:w-2/3 h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              {capabilities.map((cap) => (
                cap.id === activeTab && (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 md:p-12 bg-white border border-outline-variant/30 shadow-md h-full flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-3xl md:text-4xl font-display text-primary mb-6">{cap.title}</h3>
                      <p className="text-on-surface-variant leading-relaxed text-lg mb-8">
                        {cap.content}
                      </p>
                      
                      <div className="grid sm:grid-cols-3 gap-4 mb-8">
                         {cap.metrics.map((metric, i) => (
                           <div key={i} className="flex flex-col gap-2 p-4 bg-surface border border-outline-variant/30">
                             <div className="w-1.5 h-1.5 min-w-[6px] rounded-none bg-primary" />
                             <span className="text-sm text-on-surface-variant font-mono font-medium leading-tight">{metric}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                    
                    <div>
                      <button className="flex items-center gap-2 text-primary hover:text-secondary font-bold tracking-wide uppercase text-xs transition-colors group">
                        Explore Module <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
