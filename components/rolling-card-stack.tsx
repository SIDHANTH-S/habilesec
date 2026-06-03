'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Brain, BarChart3, Lock, ArrowRight, Sparkles } from 'lucide-react';

/* ─────────────────────────────────────────────
   SVG INTELLIGENCE MODULES
───────────────────────────────────────────── */

function ComplianceVisual({ accentHex }: { accentHex: string }) {
  const text = '#0a2540';
  const textSub = '#3a5f8a';
  const bg = '#f8fafc';
  const border = '#dde5ef';

  const frameworks = [
    { label: 'ISO 27001', x: 32 },
    { label: 'SOC 2', x: 100 },
    { label: 'ISO 27701', x: 168 },
    { label: 'ISO 42001', x: 236 },
  ];

  return (
    <svg viewBox="0 0 300 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background grid suggestion */}
      {[0, 1, 2].map(i => (
        <line key={`hg-${i}`} x1="0" y1={40 + i * 36} x2="300" y2={40 + i * 36}
          stroke="#e8eef5" strokeWidth="0.5" />
      ))}

      {/* Framework source nodes */}
      {frameworks.map((fw, i) => (
        <g key={fw.label}>
          <rect x={fw.x - 28} y="6" width="58" height="20" rx="10"
            fill={`${accentHex}10`} stroke={accentHex} strokeWidth="1.2" />
          <text x={fw.x} y="20" fill={text} fontSize="7.5" fontWeight="700" textAnchor="middle">{fw.label}</text>
        </g>
      ))}

      {/* Converging lines to Unified Control Library */}
      {frameworks.map((fw, i) => (
        <line key={`ln-${i}`} x1={fw.x} y1="26" x2="150" y2="60"
          stroke={accentHex} strokeWidth="1" strokeDasharray="3 2" opacity="0.35" />
      ))}

      {/* Unified Control Library hub */}
      <rect x="72" y="60" width="156" height="28" rx="14"
        fill={`${accentHex}15`} stroke={accentHex} strokeWidth="1.8" />
      <text x="150" y="74" fill={text} fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="0.2">
        Unified Control Library
      </text>
      <text x="150" y="83" fill={textSub} fontSize="6.5" fontWeight="600" textAnchor="middle" letterSpacing="0.3">
        CENTRALISED GOVERNANCE
      </text>

      {/* Lines down to Audit Readiness */}
      <line x1="110" y1="88" x2="90" y2="108" stroke={accentHex} strokeWidth="1.2" opacity="0.4" />
      <line x1="150" y1="88" x2="150" y2="108" stroke={accentHex} strokeWidth="1.2" opacity="0.4" />
      <line x1="190" y1="88" x2="210" y2="108" stroke={accentHex} strokeWidth="1.2" opacity="0.4" />

      {/* Output nodes */}
      {[
        { label: 'Evidence', sub: 'Mapping', cx: 72 },
        { label: 'Control', sub: 'Testing', cx: 150 },
        { label: 'Audit', sub: 'Readiness', cx: 228 },
      ].map(n => (
        <g key={n.label}>
          <rect x={n.cx - 32} y="108" width="64" height="28" rx="5"
            fill={bg} stroke={border} strokeWidth="1" />
          <text x={n.cx} y="120" fill={text} fontSize="8" fontWeight="700" textAnchor="middle">{n.label}</text>
          <text x={n.cx} y="130" fill={textSub} fontSize="6.5" textAnchor="middle">{n.sub}</text>
        </g>
      ))}

    </svg>
  );
}

function PrivacyVisual({ accentHex }: { accentHex: string }) {
  const text = '#0a2540';
  const textSub = '#3a5f8a';
  const bg = '#f8fafc';
  const border = '#dde5ef';

  const jurisdictions = [
    { label: 'EU / GDPR', x: 26 },
    { label: 'India / DPDPA', x: 86 },
    { label: 'US / CCPA', x: 150 },
    { label: 'Brazil / LGPD', x: 216 },
    { label: 'APAC', x: 276 },
  ];

  return (
    <svg viewBox="0 0 300 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background faint globe arcs */}
      <ellipse cx="150" cy="74" rx="130" ry="60" stroke="#e8eef5" strokeWidth="0.6" fill="none" />
      <ellipse cx="150" cy="74" rx="80" ry="60" stroke="#e8eef5" strokeWidth="0.6" fill="none" />

      {/* Jurisdiction nodes */}
      {jurisdictions.map((j) => (
        <g key={j.label}>
          <rect x={j.x - 26} y="4" width="52" height="18" rx="9"
            fill={`${accentHex}0e`} stroke={`${accentHex}50`} strokeWidth="1" />
          <text x={j.x} y="16.5" fill={text} fontSize="6.5" fontWeight="700" textAnchor="middle">{j.label}</text>
        </g>
      ))}

      {/* Lines from jurisdictions to hub */}
      {jurisdictions.map((j) => (
        <line key={`jl-${j.label}`} x1={j.x} y1="22" x2="150" y2="64"
          stroke={accentHex} strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
      ))}

      {/* Central Privacy Governance hub */}
      <circle cx="150" cy="74" r="24" fill={`${accentHex}12`} stroke={accentHex} strokeWidth="2" />
      <text x="150" y="71" fill={text} fontSize="8.5" fontWeight="800" textAnchor="middle">Privacy</text>
      <text x="150" y="82" fill={text} fontSize="8.5" fontWeight="800" textAnchor="middle">Programme</text>

      {/* Output capability pillars */}
      {[
        { label: 'Data Transfer', sub: 'Governance', x: 40 },
        { label: 'Cross-Border', sub: 'Compliance', x: 150 },
        { label: 'Risk &', sub: 'Oversight', x: 260 },
      ].map(p => (
        <g key={p.label}>
          <line x1="150" y1="98" x2={p.x} y2="108" stroke={accentHex} strokeWidth="1" opacity="0.35" />
          <rect x={p.x - 36} y="108" width="72" height="28" rx="5" fill={bg} stroke={border} strokeWidth="1" />
          <text x={p.x} y="120" fill={text} fontSize="8" fontWeight="700" textAnchor="middle">{p.label}</text>
          <text x={p.x} y="130" fill={textSub} fontSize="6.5" textAnchor="middle">{p.sub}</text>
        </g>
      ))}

    </svg>
  );
}

function AIVisual({ accentHex }: { accentHex: string }) {
  const text = '#0a2540';
  const textSub = '#3a5f8a';
  const bg = '#f8fafc';
  const border = '#dde5ef';

  const layers = [
    { label: 'Board Oversight', sub: 'Accountability & Direction', y: 12, w: 160, fill: `${accentHex}18`, stroke: accentHex, sw: 1.8 },
    { label: 'AI Governance', sub: 'Strategy & Principles', y: 44, w: 190, fill: bg, stroke: border, sw: 1 },
    { label: 'Model Controls', sub: 'Testing & Validation', y: 76, w: 220, fill: `${accentHex}08`, stroke: border, sw: 1 },
    { label: 'Deployment Assurance', sub: 'Monitoring & Compliance', y: 108, w: 240, fill: bg, stroke: border, sw: 1 },
  ];

  return (
    <svg viewBox="0 0 300 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {layers.map((l, i) => (
        <g key={l.label}>
          <rect
            x={(300 - l.w) / 2} y={l.y}
            width={l.w} height="28"
            rx="5"
            fill={l.fill} stroke={l.stroke} strokeWidth={l.sw}
          />
          <text x="150" y={l.y + 11} fill={text} fontSize="8.5" fontWeight="800" textAnchor="middle">{l.label}</text>
          <text x="150" y={l.y + 22} fill={textSub} fontSize="6.5" textAnchor="middle">{l.sub}</text>
          {i < layers.length - 1 && (
            <>
              <line x1="150" y1={l.y + 28} x2="150" y2={l.y + 34}
                stroke={accentHex} strokeWidth="1.5" opacity="0.5" />
              <polygon
                points={`150,${l.y + 36} 147,${l.y + 30} 153,${l.y + 30}`}
                fill={accentHex} opacity="0.5"
              />
            </>
          )}
        </g>
      ))}

      {/* Monitoring feedback arc */}
      <path d="M 255 124 Q 285 74 255 20" stroke={accentHex} strokeWidth="1.2"
        strokeDasharray="3 2" fill="none" opacity="0.35" />
      <text x="288" y="74" fill={textSub} fontSize="5.5" fontWeight="700" textAnchor="middle"
        transform="rotate(90 288 74)">CONTINUOUS MONITORING</text>
    </svg>
  );
}

function RegulatoryVisual({ accentHex }: { accentHex: string }) {
  const text = '#0a2540';
  const textSub = '#3a5f8a';
  const bg = '#f8fafc';
  const border = '#dde5ef';

  const sources = [
    { label: 'EU AI Act', x: 26 },
    { label: 'GDPR', x: 82 },
    { label: 'DPDPA', x: 150 },
    { label: 'SEC Cyber', x: 218 },
    { label: 'NIS2', x: 274 },
  ];

  return (
    <svg viewBox="0 0 300 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Source regulation nodes */}
      {sources.map(s => (
        <g key={s.label}>
          <rect x={s.x - 26} y="4" width="52" height="18" rx="4"
            fill={`${accentHex}0d`} stroke={`${accentHex}45`} strokeWidth="1" />
          <text x={s.x} y="16.5" fill={text} fontSize="7" fontWeight="700" textAnchor="middle">{s.label}</text>
        </g>
      ))}

      {/* Converging flows */}
      {sources.map(s => (
        <line key={`fl-${s.label}`} x1={s.x} y1="22" x2="150" y2="54"
          stroke={accentHex} strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
      ))}

      {/* Intelligence Engine */}
      <rect x="88" y="54" width="124" height="30" rx="15"
        fill={`${accentHex}14`} stroke={accentHex} strokeWidth="2" />
      <text x="150" y="67" fill={text} fontSize="9" fontWeight="800" textAnchor="middle">Regulatory Intelligence</text>
      <text x="150" y="78" fill={textSub} fontSize="6.5" fontWeight="600" textAnchor="middle" letterSpacing="0.3">ENGINE</text>

      {/* Output streams */}
      {[
        { label: 'Strategic', sub: 'Insight Briefs', x: 44 },
        { label: 'Compliance', sub: 'Action Planning', x: 150 },
        { label: 'Risk', sub: 'Governance', x: 256 },
      ].map(o => (
        <g key={o.label}>
          <line x1="150" y1="84" x2={o.x} y2="100" stroke={accentHex} strokeWidth="1.2" opacity="0.35" />
          <rect x={o.x - 36} y="100" width="72" height="30" rx="5" fill={bg} stroke={border} strokeWidth="1" />
          <text x={o.x} y="113" fill={text} fontSize="8" fontWeight="700" textAnchor="middle">{o.label}</text>
          <text x={o.x} y="124" fill={textSub} fontSize="6.5" textAnchor="middle">{o.sub}</text>
        </g>
      ))}

    </svg>
  );
}

function CyberVisual({ accentHex }: { accentHex: string }) {
  const text = '#0a2540';
  const textSub = '#3a5f8a';
  const bg = '#f8fafc';
  const border = '#dde5ef';

  const phases = [
    { label: 'Identify', x: 28 },
    { label: 'Assess', x: 90 },
    { label: 'Treat', x: 152 },
    { label: 'Monitor', x: 214 },
    { label: 'Report', x: 272 },
  ];

  return (
    <svg viewBox="0 0 300 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lifecycle phases */}
      {phases.map((p, i) => (
        <g key={p.label}>
          <rect x={p.x - 26} y="6" width="54" height="24" rx="5"
            fill={i === 0 ? `${accentHex}18` : bg}
            stroke={i === 0 ? accentHex : border}
            strokeWidth={i === 0 ? 1.8 : 1} />
          <text x={p.x} y="22" fill={text} fontSize="8.5" fontWeight="700" textAnchor="middle">{p.label}</text>
          {i < phases.length - 1 && (
            <>
              <line x1={p.x + 28} y1="18" x2={p.x + 34} y2="18"
                stroke={accentHex} strokeWidth="1.2" opacity="0.5" />
              <polygon
                points={`${p.x + 36},18 ${p.x + 31},15 ${p.x + 31},21`}
                fill={accentHex} opacity="0.5"
              />
            </>
          )}
        </g>
      ))}

      {/* Continuous feedback arc */}
      <path d="M 246 30 Q 150 52 54 30"
        stroke={accentHex} strokeWidth="1.2" strokeDasharray="3 2" fill="none" opacity="0.4" />
      <text x="150" y="58" fill={textSub} fontSize="6.5" fontWeight="700" textAnchor="middle" opacity="0.9">
        CONTINUOUS RISK GOVERNANCE
      </text>

      {/* Governance structure */}
      <rect x="8" y="66" width="284" height="52" rx="6" fill={bg} stroke={border} strokeWidth="1" />

      {/* Dividers */}
      <line x1="104" y1="72" x2="104" y2="112" stroke={border} strokeWidth="0.8" />
      <line x1="200" y1="72" x2="200" y2="112" stroke={border} strokeWidth="0.8" />

      {[
        { title: 'Threats & Assets', body: 'Inventory, classification', body2: 'and dependency mapping', cx: 56 },
        { title: 'Control Effectiveness', body: 'Assessment, testing', body2: 'and governance oversight', cx: 152 },
        { title: 'Board Reporting', body: 'Risk posture, treatment', body2: 'plans and accountability', cx: 250 },
      ].map(col => (
        <g key={col.title}>
          <text x={col.cx} y="82" fill={text} fontSize="7.5" fontWeight="800" textAnchor="middle">{col.title}</text>
          <text x={col.cx} y="95" fill={textSub} fontSize="6.5" textAnchor="middle">{col.body}</text>
          <text x={col.cx} y="106" fill={textSub} fontSize="6.5" textAnchor="middle">{col.body2}</text>
        </g>
      ))}
    </svg>
  );
}

function CardVisual({ type, accentHex }: { type: string; accentHex: string }) {
  if (type === 'compliance') return <ComplianceVisual accentHex={accentHex} />;
  if (type === 'privacy') return <PrivacyVisual accentHex={accentHex} />;
  if (type === 'ai') return <AIVisual accentHex={accentHex} />;
  if (type === 'regulatory') return <RegulatoryVisual accentHex={accentHex} />;
  return <CyberVisual accentHex={accentHex} />;
}

/* ─────────────────────────────────────────────
   PILLAR DATA
───────────────────────────────────────────── */

const PILLARS = [
  {
    id: 'compliance',
    title: 'Compliance & Certification',
    subtitle: 'Unified control frameworks that align multiple standards into integrated certification programmes.',
    icon: ShieldCheck,
    accentHex: '#0058BE',
    contentLabel: 'Frameworks unified',
    contentItems: ['ISO 27001', 'SOC 2', 'ISO 42001'],
    outcome: 'Single control library mapped across multiple frameworks.',
    metrics: [
      { label: 'Control Mapping', value: 'Unified' },
      { label: 'Certification Model', value: 'Multi-Framework' },
    ],
    visual: 'compliance',
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Protection',
    subtitle: 'Global privacy governance networks designed for cross-border data stewardship and regulatory alignment.',
    icon: Lock,
    accentHex: '#0077B6',
    contentLabel: 'Jurisdictions covered',
    contentItems: ['GDPR', 'DPDPA', 'CCPA'],
    outcome: 'Unified governance for global privacy obligations.',
    metrics: [
      { label: 'Coverage', value: 'Global' },
      { label: 'Governance', value: 'Continuous' },
    ],
    visual: 'privacy',
  },
  {
    id: 'ai',
    title: 'AI Governance',
    subtitle: 'Governance architectures for responsible AI adoption, from board oversight to model risk controls.',
    icon: Brain,
    accentHex: '#0096C7',
    contentLabel: 'Governance layers',
    contentItems: ['Board Oversight', 'AI Governance', 'Model Controls', 'Deployment Assurance'],
    outcome: 'Board-level accountability across the AI lifecycle.',
    metrics: [
      { label: 'Lifecycle', value: 'End-to-End' },
      { label: 'Oversight', value: 'Board-Level' },
    ],
    visual: 'ai',
  },
  {
    id: 'regulatory',
    title: 'Regulatory Intelligence',
    subtitle: 'Global regulatory monitoring networks that translate legal change into strategic compliance intelligence.',
    icon: Globe,
    accentHex: '#0096C7',
    contentLabel: 'Coverage areas',
    contentItems: ['EU AI Act', 'GDPR', 'DPDPA', 'NIS2'],
    outcome: 'Strategic intelligence framework for proactive compliance.',
    metrics: [
      { label: 'Intelligence Model', value: 'Continuous' },
      { label: 'Response', value: 'Proactive' },
    ],
    visual: 'regulatory',
  },
  {
    id: 'cyber',
    title: 'Cyber Risk & Security',
    subtitle: 'Risk management governance for continuous identification, assessment, and treatment of cyber threats.',
    icon: BarChart3,
    accentHex: '#023E8A',
    contentLabel: 'Risk lifecycle',
    contentItems: ['Identify', 'Assess', 'Treat', 'Monitor'],
    outcome: 'Structured governance for continuous risk management.',
    metrics: [
      { label: 'Approach', value: 'Risk-Based' },
      { label: 'Reporting', value: 'Executive' },
    ],
    visual: 'cyber',
  },
];

/* ─────────────────────────────────────────────
   STACK CONFIG
───────────────────────────────────────────── */

const STACK_SLOTS = [
  { widthFactor: 0.70, yOffset: -150 },
  { widthFactor: 0.80, yOffset: -100 },
  { widthFactor: 0.90, yOffset: -50 },
  { widthFactor: 1.00, yOffset: 0 },
];

const SPRING = { type: 'spring' as const, bounce: 0.18, duration: 0.45 };

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function RollingCardStack() {
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const textColor = '#0a2540';

  const handleAdvance = () => {
    setOrder(prev => {
      const next = [...prev];
      const front = next.pop()!;
      next.unshift(front);
      return next;
    });
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-end" style={{ minHeight: 500 }}>
      <div className="relative w-full" style={{ height: 450 }}>
        {order.map((pillarIdx, stackPos) => {
          const slotIdx = stackPos - (order.length - 4);
          const isVisible = slotIdx >= 0;
          const slot = isVisible ? STACK_SLOTS[slotIdx] : STACK_SLOTS[0];
          const isFront = slotIdx === 3;
          const pillar = PILLARS[pillarIdx];
          const Icon = pillar.icon;

          return (
            <motion.div
              key={pillarIdx}
              layout
              layoutId={`card-${pillarIdx}`}
              animate={{
                width: `${slot.widthFactor * 100}%`,
                y: slot.yOffset,
                opacity: isVisible ? 1 : 0,
                zIndex: isVisible ? slotIdx + 1 : 0,
              }}
              transition={SPRING}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                x: '-50%',
                maxWidth: 700,
                cursor: isVisible ? 'pointer' : 'default',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              onClick={() => {
                if (isFront) {
                  handleAdvance();
                } else {
                  setOrder(prev => {
                    const idx = prev.indexOf(pillarIdx);
                    return [...prev.slice(idx + 1), ...prev.slice(0, idx + 1)];
                  });
                }
              }}
              whileHover={isVisible ? { y: slot.yOffset - 5 } : undefined}
              className="select-none"
            >
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col"
                style={{
                  background: '#ffffff',
                  boxShadow: isFront
                    ? `0 20px 60px rgba(0,0,0,0.08)`
                    : '0 4px 14px rgba(0,0,0,0.04)',
                  border: `1px solid ${isFront ? `${pillar.accentHex}18` : '#e2e8f0'}`,
                  height: 400,
                }}
              >

                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 flex-shrink-0 border-b"
                  style={{
                    borderColor: '#f0f4f8',
                    background: '#fafbfc',
                    minHeight: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${pillar.accentHex}14` }}
                    >
                      <Icon size={14} style={{ color: pillar.accentHex }} />
                    </div>
                    <p className="text-[13px] font-semibold leading-tight tracking-tight" style={{ color: textColor }}>
                      {pillar.title}
                    </p>
                  </div>
                  {isFront && (
                    <div
                      className="flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase"
                      style={{ color: pillar.accentHex, opacity: 0.8 }}
                    >
                      Explore <ArrowRight size={11} />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 px-5 pt-3 pb-4 gap-3 overflow-hidden">

                  {/* Subtitle */}
                  <p
                    className="text-[11.5px] leading-snug flex-shrink-0"
                    style={{
                      color: '#3a5f8a',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {pillar.subtitle}
                  </p>

                  {/* SVG Intelligence Module */}
                  <div
                    className="w-full rounded-xl overflow-hidden flex-shrink-0"
                    style={{
                      height: 140,
                      background: '#f8fafc',
                      border: '1px solid #e8eef5',
                      padding: '6px 8px',
                    }}
                  >
                    <CardVisual type={pillar.visual} accentHex={pillar.accentHex} />
                  </div>

                  {/* Content items */}
                  <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                    {pillar.contentItems.map(item => (
                      <span
                        key={item}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-medium"
                        style={{
                          background: `${pillar.accentHex}0d`,
                          color: pillar.accentHex,
                          border: `1px solid ${pillar.accentHex}22`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Key Outcome */}
                  <div
                    className="flex-shrink-0 rounded-lg px-3 py-2"
                    style={{
                      background: `${pillar.accentHex}07`,
                      borderLeft: `3px solid ${pillar.accentHex}60`,
                    }}
                  >
                    <p
                      className="text-[10px] leading-relaxed"
                      style={{
                        color: '#3a5f8a',
                      }}
                    >
                      {pillar.outcome}
                    </p>
                  </div>

                  {/* Metrics footer */}
                  <div
                    className="grid grid-cols-2 gap-4 pt-3 border-t flex-shrink-0 mt-auto"
                    style={{ borderColor: '#f0f4f8' }}
                  >
                    {pillar.metrics.map(m => (
                      <div key={m.label}>
                        <p className="text-[13px] font-bold leading-none tracking-tight" style={{ color: textColor }}>
                          {m.value}
                        </p>
                        <p className="text-[8.5px] font-semibold uppercase tracking-widest mt-1" style={{ color: '#94a3b8' }}>
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {PILLARS.map((_, i) => {
          const frontPillarIdx = order[order.length - 1];
          const isActive = i === frontPillarIdx;
          return (
            <motion.div
              key={i}
              animate={{ width: isActive ? 22 : 5, opacity: isActive ? 1 : 0.28 }}
              transition={SPRING}
              className="h-[3px] rounded-full"
              style={{ background: isActive ? PILLARS[frontPillarIdx].accentHex : '#b0bec5' }}
            />
          );
        })}
      </div>
    </div>
  );
}
