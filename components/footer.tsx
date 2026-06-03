import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface pt-24 pb-12 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 flex items-center justify-center p-[2px] rounded-sm bg-primary text-white group-hover:bg-secondary transition-colors duration-300">
                 <Shield className="w-4 h-4" />
              </div>
              <span className="text-xl font-display font-bold text-primary">HabileSec</span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              The Digital Trust Platform for Modern Enterprises. Security strategy and continuous compliance powered by Tanikkai OS.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6 font-bold">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Tanikkai OS</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Continuous Monitoring</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6 font-bold">Capabilities</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">ISO 27001</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">SOC 2</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">AI Governance</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">vCISO Advisory</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 lg:border-l border-outline-variant/30 lg:pl-8 mt-8 lg:mt-0">
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6 font-bold">Firm</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Partners</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-outline-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant">© 2026 HabileSec. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Security Trust Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
