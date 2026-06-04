import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/preloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'HabileSec | Global Regulatory Intelligence & Trust Platform',
  description: 'Navigate cybersecurity, compliance, privacy, and AI governance through a single advisory and intelligence partner.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body selection:bg-surface-container-low selection:text-primary">
        <Preloader>
          {children}
        </Preloader>
      </body>
    </html>
  );
}
