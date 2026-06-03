import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Partners from '@/components/partners';
import Capabilities from '@/components/capabilities';
import CyberFramework from '@/components/cyber-framework';
import Platform from '@/components/platform';
import GlobalMap from '@/components/global-map';
import Sectors from '@/components/sectors';
import Insights from '@/components/insights';
import CTA from '@/components/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <Hero />
        <Partners />
        <Capabilities />
        <CyberFramework />
        <Platform />
        <GlobalMap />
        <Sectors />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
