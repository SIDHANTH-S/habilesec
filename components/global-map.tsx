'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Search, Globe, Scale, BrainCircuit, RefreshCcw, X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MilitaryMap from '@/components/military-map';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalMap() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState<'data' | 'ai'>('data');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
      
      tl.from(".map-title", { opacity: 0, y: 30, duration: 0.8 })
        .from(".map-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".map-container", { opacity: 0, scale: 0.95, y: 40, duration: 1, ease: "power3.out" }, "-=0.2");

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-surface border-y border-outline-variant/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <p className="map-title text-xs font-bold text-primary uppercase tracking-widest mb-4">Global Intelligence</p>
          <h2 className="map-title text-4xl md:text-5xl font-display text-primary mb-6">Global Regulatory Command Center</h2>
          <p className="map-desc text-lg text-on-surface-variant max-w-2xl mx-auto font-body">Navigate 60+ countries with live regulatory maturity indicators and jurisdiction-specific insights.</p>
        </div>
        
        <div className="map-container w-full max-w-6xl mx-auto bg-white border border-outline-variant/30 rounded-none shadow-xl overflow-hidden flex flex-col relative">
          
          {/* UI Header */}
          <div className="border-b border-outline-variant/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-lowest">
            <div className="flex items-center gap-2 bg-background p-1 border border-outline-variant/30">
              <button 
                onClick={() => {setActiveTab('data'); setSelectedCountry(null);}}
                className={`px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors ${activeTab === 'data' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}>
                Data Protection
              </button>
              <button 
                onClick={() => {setActiveTab('ai'); setSelectedCountry(null);}}
                className={`px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors ${activeTab === 'ai' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}>
                AI Regulations
              </button>
            </div>
          </div>
          
          {/* Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 p-5 border-b border-outline-variant/20 bg-white">
            <div className="flex items-center gap-3">
              <Globe className="text-primary w-4 h-4" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">60+ Countries</span>
            </div>
            <div className="flex items-center gap-3">
              <Scale className="text-primary w-4 h-4" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">160+ Regulations</span>
            </div>
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-primary w-4 h-4" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">48+ AI Frameworks</span>
            </div>
            
          </div>
          
          {/* Map Visual */}
          <div className="relative w-full bg-background flex flex-col items-center justify-center border-t border-outline-variant/20 h-[500px] md:h-[600px] overflow-hidden">
            <div className="absolute inset-0">
               <MilitaryMap 
                  header={{ show: false, title: "", subtitle: "", titleColor: "", subtitleColor: "" }}
                  mapStyle={{
                    oceanColor: "transparent",
                    landFill: "#E2E8F0",
                    landStroke: "#CBD5E1",
                    strokeWidth: 0.5,
                    hoverColor: "#CBD5E1",
                    disabledColor: "#0f172a"
                  }}
                  layout={{ cornerRadius: 0, padding: 0, showBorder: false, borderColor: "transparent" }}
                  grid={{ show: true, color: "#CBD5E1", opacity: 0.5 }}
                  tooltip={{ show: true, background: "rgba(15, 23, 42, 0.95)", textColor: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.1)" }}
                  markers={[
                    { label: "India", description: "DPDPA Active - Comprehensive setup", latitude: 20.5937, longitude: 78.9629, color: "#0ea5e9" },
                    { label: "Brussels", description: "EU GDPR & AI Act", latitude: 50.8503, longitude: 4.3517, color: "#0ea5e9" },
                    { label: "Singapore", description: "PDPA Active", latitude: 1.3521, longitude: 103.8198, color: "#0ea5e9" },
                    { label: "Washington DC", description: "USA State-level Frameworks", latitude: 38.9072, longitude: -77.0369, color: "#0ea5e9" },
                    { label: "Brasília", description: "Brazil LGPD Active", latitude: -15.7938, longitude: -47.8827, color: "#0ea5e9" },
                    { label: "Tokyo", description: "Japan APPI Active", latitude: 35.6762, longitude: 139.6503, color: "#0ea5e9" },
                    { label: "London", description: "UK GDPR & Sectoral Laws", latitude: 51.5074, longitude: -0.1278, color: "#0ea5e9" }
                  ]}
                  countries={[
                    { code: "IND", name: "India", enabled: true },
                    { code: "FRA", name: "France", enabled: true },
                    { code: "DEU", name: "Germany", enabled: true },
                    { code: "ITA", name: "Italy", enabled: true },
                    { code: "ESP", name: "Spain", enabled: true },
                    { code: "NLD", name: "Netherlands", enabled: true },
                    { code: "POL", name: "Poland", enabled: true },
                    { code: "SWE", name: "Sweden", enabled: true },
                    { code: "SGP", name: "Singapore", enabled: true },
                    { code: "USA", name: "United States", enabled: true },
                    { code: "BRA", name: "Brazil", enabled: true },
                    { code: "JPN", name: "Japan", enabled: true },
                    { code: "GBR", name: "United Kingdom", enabled: true },
                    { code: "AUS", name: "Australia", enabled: true },
                    { code: "CAN", name: "Canada", enabled: true }
                  ]}
               />
            </div>
            
            {/* Drawer Overlay for India */}
            {selectedCountry === 'India' && (
              <div className="absolute inset-y-0 right-0 w-full md:w-[400px] bg-white border-l border-outline-variant/30 shadow-2xl z-10 flex flex-col transition-transform duration-300">
                <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
                  <h3 className="text-3xl font-display text-primary">India</h3>
                  <button onClick={() => setSelectedCountry(null)} className="text-on-surface-variant hover:text-primary cursor-pointer w-8 h-8 flex items-center justify-center bg-surface border border-outline-variant/30">
                    <X className="w-4 h-4"/>
                  </button>
                </div>
                <div className="p-8 flex-grow overflow-y-auto bg-white text-left">
                  <div className="mb-8">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Framework</span>
                    <p className="text-xl font-bold text-primary mb-1">DPDPA</p>
                    <p className="text-sm text-on-surface-variant">Digital Personal Data Protection Act</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Scope</span>
                    <p className="text-sm font-medium text-primary">Comprehensive</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Status</span>
                    <div className="flex items-center gap-3 mt-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 w-max">
                      <span className="w-2 h-2 bg-green-500 rounded-none"></span>
                      <p className="text-xs font-bold uppercase tracking-widest">Active</p>
                    </div>
                  </div>
                  <div className="mb-10">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Last Updated</span>
                    <p className="text-sm font-medium text-primary">May 2026</p>
                  </div>
                  
                  <div className="mb-10 p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-none">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block">Related Frameworks</span>
                    <ul className="space-y-3 mb-6">
                      <li className="text-xs font-mono text-primary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span> RBI Cyber Security
                      </li>
                      <li className="text-xs font-mono text-primary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span> CERT-In Directives
                      </li>
                      <li className="text-xs font-mono text-primary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span> DPDPA
                      </li>
                    </ul>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block pt-2 border-t border-outline-variant/20">Applicable Industries</span>
                    <ul className="space-y-3">
                      <li className="text-xs font-mono text-primary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-none"></span> BFSI
                      </li>
                      <li className="text-xs font-mono text-primary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-none"></span> Healthcare
                      </li>
                      <li className="text-xs font-mono text-primary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-none"></span> SaaS
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-primary text-white rounded-none">
                    <p className="text-sm font-bold uppercase tracking-widest mb-3 opacity-90">Need guidance?</p>
                    <button className="text-sm text-secondary hover:text-white font-bold flex items-center gap-2 cursor-pointer transition-colors group">
                      Talk to our privacy team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
