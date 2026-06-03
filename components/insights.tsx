'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';

const articles = [
  {
    category: 'Report',
    title: 'The State of AI Governance 2026',
    date: 'Jun 01, 2026',
    readTime: '12 min read'
  },
  {
    category: 'Briefing',
    title: 'DORA Compliance: Critical Timelines for EU Financial Institutions',
    date: 'May 28, 2026',
    readTime: '5 min read'
  },
  {
    category: 'Engineering',
    title: 'Automating Evidence Collection in Multi-Cloud AWS/GCP Environments',
    date: 'May 15, 2026',
    readTime: '8 min read'
  }
];

export default function Insights() {
  return (
    <section className="py-32 bg-white border-t border-outline-variant/30 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-display text-primary mb-4">
              Intelligence &amp; Publications.
            </h2>
            <p className="text-on-surface-variant text-lg">Executive briefings, research, and technical guides.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold uppercase text-primary hover:text-secondary transition-colors group tracking-widest">
            View All Publications <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="h-48 w-full rounded-none bg-surface border border-outline-variant/30 mb-6 flex items-center justify-center group-hover:border-primary/50 transition-colors overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileText className="w-8 h-8 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold text-primary uppercase">{article.category}</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span className="text-xs font-mono font-bold text-on-surface-variant">{article.readTime}</span>
              </div>
              <h3 className="text-2xl font-display text-primary mb-2 group-hover:text-secondary transition-colors leading-snug flex-1">
                {article.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-mono mt-4 font-bold uppercase tracking-widest">{article.date}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
