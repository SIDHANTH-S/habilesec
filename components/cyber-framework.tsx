'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Map, Gavel, Construction, ShieldQuestion, Verified, Activity, TrendingUp } from 'lucide-react';

const drawers = [
  {
    number: '01',
    title: 'Assess & Plan',
    bg: '#E8EDF5',
    panels: [
      {
        icon: BarChart,
        subheading: 'Evaluate Current Posture',
        body: 'We conduct a comprehensive review of your existing security posture — mapping controls, identifying gaps, and benchmarking against ISO 27001, NIST, and SOC 2 to surface real risk.',
      },
      {
        icon: Map,
        subheading: 'Develop the Strategic Roadmap',
        body: 'Findings translate into a structured, prioritised remediation roadmap aligned with your business objectives and risk appetite — sequenced for maximum impact and feasibility.',
      },
      {
        icon: Gavel,
        subheading: 'Establish Policies & Oversight',
        body: 'We design governance structures — information security policies, risk committees, and accountability frameworks — giving leadership clear visibility and control over the cyber programme.',
      },
    ],
  },
  {
    number: '02',
    title: 'Build & Secure',
    bg: '#C9D5E8',
    panels: [
      {
        icon: Construction,
        subheading: 'Implement Secure Architectures',
        body: 'Our engineers embed security from the ground up — designing zero-trust network architectures, hardened cloud environments, and resilient infrastructure that withstands sophisticated attacks.',
      },
      {
        icon: ShieldQuestion,
        subheading: 'Deploy Defensive Controls',
        body: 'We deploy layered defences across identity, endpoint, data, and application layers. Penetration testing and red-team exercises continuously validate the effectiveness of every control.',
      },
      {
        icon: Verified,
        subheading: 'Achieve Compliance Standards',
        body: 'From ISO 27001 and SOC 2 to GDPR, DPDPA, and ISO 42001, we manage the full certification lifecycle — evidence collection, auditor liaison, and gap remediation.',
      },
    ],
  },
  {
    number: '03',
    title: 'Monitor & Respond',
    bg: '#8FA8D1',
    panels: [
      {
        icon: Activity,
        subheading: 'Continuous Threat Detection',
        body: 'Our 24/7 monitoring services leverage SIEM, UEBA, and threat-intelligence feeds to detect anomalies in real time, triaged by experienced analysts who separate genuine threats from noise.',
      },
      {
        icon: TrendingUp,
        subheading: 'Rapid Incident Containment',
        body: 'Our incident-response retainers ensure swift containment, forensic investigation, and regulatory notification support — minimising dwell time and limiting financial and reputational impact.',
      },
      {
        icon: BarChart,
        subheading: 'Resilient Business Continuity',
        body: 'We design and test business continuity and disaster-recovery plans that restore operations quickly, meeting RTO and RPO commitments critical to your customers and regulators.',
      },
    ],
  },
  {
    number: '04',
    title: 'Optimise & Scale',
    bg: '#0A1628',
    panels: [
      {
        icon: TrendingUp,
        subheading: 'Refine and Improve Processes',
        body: 'Security is not a destination. We run continuous improvement cycles — reviewing metrics, tuning controls, and incorporating lessons learned to steadily raise your security maturity.',
      },
      {
        icon: Map,
        subheading: 'Grow Without Compromise',
        body: 'As your organisation expands into new markets or acquires entities, we ensure your security programme scales alongside with jurisdiction-specific regulatory guidance.',
      },
      {
        icon: ShieldQuestion,
        subheading: 'Ongoing Strategic Partnership',
        body: 'Retained CISO-as-a-Service and board advisory engagements provide leadership-level cyber counsel that keeps your strategy ahead of an evolving threat landscape.',
      },
    ],
  },
];

function getTextColor(bg: string) {
  return bg === '#0A1628' ? 'rgb(255,255,255)' : 'rgb(28, 28, 28)';
}

// Animated chevron that bobs when idle
function ChevronIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 16, height: 16, display: 'block' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

interface DrawerItem {
  number: string;
  title: string;
  bg: string;
  panels: { icon: React.ElementType; subheading: string; body: string }[];
}

function ExpandableDrawer({
  drawer,
  isOpen,
  isLast,
  onToggle,
  entryDelay,
}: {
  drawer: DrawerItem;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
  entryDelay: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

  const textColor = getTextColor(drawer.bg);
  const isDark = drawer.bg === '#0A1628';
  const chevronColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(28,28,28,0.5)';

  return (
    <>
      <style>{`
        @keyframes drawerEnter {
          0%   { transform: translateY(6px); opacity: 0.6; }
          60%  { transform: translateY(-2px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes chevronBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(3px); }
        }
        @keyframes drawerPanelIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
      `}</style>

      <div
        style={{
          borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.10)',
          animation: `drawerEnter 0.55s cubic-bezier(0.44, 0, 0.16, 1) ${entryDelay}s both`,
        }}
      >
        {/* ── Header ── */}
        <button
          onClick={onToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-expanded={isOpen}
          style={{
            position: 'relative',
            width: '100%',
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 80px 0 40px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
            background: 'transparent',
          }}
        >
          {/* Solid background colour — slides right when open */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: drawer.bg,
              transform: isOpen ? 'translateX(80%)' : 'translateX(0)',
              transition: 'transform 0.55s cubic-bezier(0.44, 0, 0.16, 1)',
            }}
          />

          {/* Hover wave sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: hovered && !isOpen ? '100%' : '0%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.08) 100%)',
              transition: hovered ? 'width 0.35s cubic-bezier(0.44, 0, 0.16, 1)' : 'width 0.2s ease-out',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Bottom shimmer line on hover */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 2,
              width: hovered && !isOpen ? '100%' : isOpen ? '100%' : '0%',
              background: isOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.45)',
              transition: 'width 0.35s cubic-bezier(0.44, 0, 0.16, 1)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />

          {/* Title */}
          <span
            style={{
              position: 'relative',
              zIndex: 2,
              fontFamily: '"Inter Display", "Inter", sans-serif',
              fontSize: 35,
              fontWeight: 600,
              lineHeight: 1,
              color: isOpen ? 'rgb(28,28,28)' : textColor,
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
              textAlign: 'left',
            }}
          >
            {drawer.title}
          </span>

          {/* Number — peeks up on hover */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              height: '100%',
              paddingTop: hovered && !isOpen ? '0px' : '35px',
              transition: 'padding-top 0.35s cubic-bezier(0.44, 0, 0.16, 1)',
              opacity: isOpen ? 0 : 1,
            }}
          >
            <span
              style={{
                fontFamily: '"Oswald", sans-serif',
                fontSize: 98,
                fontWeight: 400,
                lineHeight: 1,
                color: 'rgb(255, 255, 255)',
                userSelect: 'none',
                WebkitTextStroke: isDark ? undefined : '1px rgba(0,0,0,0.12)',
              }}
            >
              {drawer.number}
            </span>
          </div>

          {/* Chevron — bobs when idle, rotates when open */}
          <div
            style={{
              position: 'absolute',
              right: 28,
              top: '50%',
              transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)',
              transition: 'transform 0.45s cubic-bezier(0.44, 0, 0.16, 1)',
              zIndex: 3,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                animation: !isOpen ? 'chevronBob 2s ease-in-out infinite' : 'none',
              }}
            >
              <ChevronIcon color={chevronColor} />
            </div>
          </div>
        </button>

        {/* ── Expanded content ── */}
        <div
          style={{
            height,
            overflow: 'hidden',
            transition: 'height 0.55s cubic-bezier(0.44, 0, 0.16, 1)',
          }}
        >
          <div
            ref={contentRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              background: '#fff',
              borderTop: `3px solid ${drawer.bg}`,
            }}
          >
            {drawer.panels.map((panel, pi) => {
              const Icon = panel.icon;
              return (
                <div
                  key={pi}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: '52px 50px',
                    borderRight: pi < drawer.panels.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    opacity: 0,
                    transform: 'translateY(14px)',
                    animation: isOpen
                      ? `drawerPanelIn 0.5s cubic-bezier(0.44, 0, 0.16, 1) ${0.12 + pi * 0.09}s forwards`
                      : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: drawer.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      opacity: 0.85,
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: isDark ? '#fff' : 'rgb(28,28,28)' }} />
                  </div>
                  <h4
                    style={{
                      fontFamily: '"Apfel Grotezk", "Inter", sans-serif',
                      fontSize: 22,
                      fontWeight: 500,
                      color: 'rgb(18,18,18)',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {panel.subheading}
                  </h4>
                  <p
                    style={{
                      fontFamily: '"Apfel Grotezk", "Inter", sans-serif',
                      fontSize: 16,
                      lineHeight: 1.65,
                      color: '#4B5563',
                      margin: 0,
                    }}
                  >
                    {panel.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function CyberFramework() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="py-24 bg-white border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16">
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 23, fontWeight: 900, color: 'rgba(28,28,28,0.65)', marginBottom: 8 }}>
            0–4
          </p>
          <h2 style={{ fontFamily: '"Inter Display", "Inter", sans-serif', fontSize: 'clamp(48px, 6vw, 85px)', fontWeight: 600, lineHeight: 1, color: 'rgb(28,28,28)', margin: '0 0 20px' }}>
            The Cyber Transformation Framework
          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 20, fontWeight: 500, color: 'rgb(28,28,28)', maxWidth: 680, lineHeight: 1.5, margin: 0 }}>
            A structured, end-to-end methodology that takes organisations from initial assessment through continuous optimisation — covering every dimension of modern cybersecurity.
          </p>
        </div>

        <div style={{ borderRadius: '0 0 45px 45px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 40px rgba(0,0,0,0.07)' }}>
          {drawers.map((drawer, i) => (
            <ExpandableDrawer
              key={i}
              drawer={drawer}
              isOpen={openIndex === i}
              isLast={i === drawers.length - 1}
              onToggle={() => toggle(i)}
              entryDelay={0.05 + i * 0.09}
            />
          ))}
        </div>

      </div>
    </section>
  );
}