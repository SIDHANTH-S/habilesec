'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [textComplete, setTextComplete] = useState(false);

  useEffect(() => {
    // Text animation completes after ~1.5s
    const textTimer = setTimeout(() => {
      setTextComplete(true);
    }, 1500);

    // Reveal animation (move up) after text completes
    const revealTimer = setTimeout(() => {
      setIsLoading(false);
      // Emit event to signal preloader completion
      window.dispatchEvent(new CustomEvent('preloaderComplete'));
    }, 2000);

    // Mark content as ready for animation after preloader exits
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 2400);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(revealTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const text = "HabileSec";

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: 'blur(10px)',
              scale: 1
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.96, -0.02, 0.38, 1.01]
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            style={{ fontFamily: 'var(--font-display, serif)' }}
          >
            <div className="relative">
              {/* Character-by-character text animation */}
              <div className="flex items-center justify-center gap-1">
                {text.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      opacity: 0.001,
                      y: 60,
                      filter: 'blur(10px)'
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)'
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.9,
                      type: 'spring',
                      bounce: 0
                    }}
                    className="text-5xl italic font-semibold text-primary"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* Progress indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: textComplete ? '100%' : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="h-0.5 bg-primary/20 mt-6 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: textComplete ? '0%' : '-100%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="h-full bg-primary"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - only visible after preloader */}
      <div style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.3s' }}>
        {children}
      </div>
    </>
  );
}
