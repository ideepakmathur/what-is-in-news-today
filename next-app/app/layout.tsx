import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'What Is In News Today | AI-Powered 3-Minute Daily Intelligence & Verified Facts',
  description: 'What is in news today? Ask any breaking news question, get objective 3-bullet summaries, cited sources, and a 60-second audio briefing without noise or bias.',
  keywords: [
    'what is in news today',
    'today news',
    'breaking news today',
    'daily news summary',
    'ai news engine',
    'neutral news digest',
    'latest news updates'
  ],
  authors: [{ name: 'WhatIsInNewsToday Team' }],
  openGraph: {
    title: 'What Is In News Today | Verified 3-Minute Daily Intelligence',
    description: 'Ask any question about today’s breaking news. Get cited, noise-free 3-bullet answers.',
    url: 'https://whatisinnewstoday.com',
    siteName: 'WhatIsInNewsToday.com',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is In News Today | AI-Powered Daily Intelligence',
    description: 'Noise-free, citation-backed daily news summaries in 3 minutes.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
