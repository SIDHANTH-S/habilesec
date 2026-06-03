'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center p-[2px] rounded-sm bg-primary text-white group-hover:bg-secondary transition-colors duration-300">
             <Shield className="w-4 h-4" />
          </div>
          <span className="font-display font-medium text-xl tracking-tight text-primary">HabileSec</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <NavItem label="Platform" hasDropdown />
          <NavItem label="Capabilities" hasDropdown />
          <NavItem label="Intelligence" />
          <NavItem label="Firm" hasDropdown />
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* <button className="h-10 px-6 rounded-none bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Engage
          </button> */}
        </div>

        <button 
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 overflow-hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-4">
              <MobileNavItem label="Platform" />
              <MobileNavItem label="Capabilities" />
              <MobileNavItem label="Intelligence" />
              <MobileNavItem label="Firm" />
              {/* <div className="border-t border-outline-variant/30 pt-4 mt-2 flex flex-col gap-4">
                <button className="w-full h-10 rounded-none bg-primary text-white text-sm font-medium shadow-sm">
                  Engage
                </button>
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavItem({ label, hasDropdown }: { label: string; hasDropdown?: boolean }) {
  return (
    <div className="flex items-center gap-1 cursor-pointer group">
      <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">{label}</span>
      {hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-outline-variant group-hover:text-primary transition-colors" />}
    </div>
  );
}

function MobileNavItem({ label }: { label: string }) {
  return (
    <div className="text-lg font-medium text-primary py-2">{label}</div>
  );
}
