import { NewsItem, AiNewsAnswer, Category } from './types';

export const INITIAL_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Next-Generation Reasoning AI Models Slash Latency by 40% in Enterprise Rollouts',
    category: 'tech',
    summaryBullets: [
      'Leading AI research labs deployed new distillation architectures that reduce inference latency by 40% while preserving benchmark reasoning accuracy.',
      'Open-weights versions enable developers to run high-throughput intelligence on standard cloud instances without high-end GPU clusters.',
      'Major enterprise SaaS vendors announced immediate adoption across customer support, code synthesis, and automated document verification.'
    ],
    whyItMatters: 'Lowers the operating cost of intelligent software by nearly half, accelerating commercial AI agent deployments across small and mid-sized businesses.',
    perspectives: {
      consensus: 'Major engineering leap for production cost-efficiency and on-device capabilities.',
      divergence: 'Infrastructure providers caution that rapid model churn may complicate long-term stability and security auditing.'
    },
    source: 'TechCrunch & AI Index',
    sourceUrl: 'https://news.ycombinator.com',
    publishedAt: '2 hours ago',
    readTimeMinutes: 2,
    sentiment: 'positive',
    tags: ['AI', 'Computing', 'Enterprise Tech', 'Open Source'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-2',
    title: 'Global Semiconductor Consortium Unveils 1.4nm Pilot Fab Architecture',
    category: 'tech',
    summaryBullets: [
      'International chip consortium finalized blueprint specifications for next-generation High-NA Extreme Ultraviolet (EUV) production lines.',
      'The architecture promises a 25% energy consumption reduction per compute cycle compared to contemporary 3nm node designs.',
      'Pilot production test runs are slated for late 2027 with commercial volume anticipated for 2028.'
    ],
    whyItMatters: 'Essential for maintaining compute scaling in data centers grappling with skyrocketing energy and cooling bottlenecks.',
    perspectives: {
      consensus: 'Technological confirmation that Moore\'s law scaling continues through optical and materials engineering.',
      divergence: 'Industry analysts highlight rising tool costs and wafer yield risks for smaller fabrication foundries.'
    },
    source: 'Reuters Business',
    sourceUrl: 'https://www.reuters.com',
    publishedAt: '3 hours ago',
    readTimeMinutes: 2,
    sentiment: 'positive',
    tags: ['Hardware', 'Semiconductors', 'Energy Efficiency'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-3',
    title: 'Global Markets Rally as Central Banks Signal Balanced Inflation Corridors',
    category: 'markets',
    summaryBullets: [
      'Broad equity indices gained across Tokyo, Frankfurt, and New York as core consumer price index prints arrived within forecast bands.',
      'Treasury yield volatility reached a four-month low following signals of steady monetary policy and manageable credit liquidity.',
      'Commodity markets remained stable, with crude holding near baseline ranges despite seasonal freight rebalancing.'
    ],
    whyItMatters: 'Provides businesses and retail investors clearer visibility into borrowing costs, supporting corporate hiring and debt refinancing plans.',
    perspectives: {
      consensus: 'Soft-landing scenarios gain traction among institutional portfolio managers.',
      divergence: 'Fixed income strategists warn that sticky service-sector wages may cap aggressive rate cuts.'
    },
    source: 'Financial Times & Bloomberg',
    sourceUrl: 'https://www.bloomberg.com',
    publishedAt: '4 hours ago',
    readTimeMinutes: 2,
    sentiment: 'positive',
    tags: ['Economy', 'Equities', 'Monetary Policy', 'Inflation'],
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-4',
    title: 'Multilateral Climate Treaty Finalizes Direct Clean Hydrogen Transit Grid Framework',
    category: 'world',
    summaryBullets: [
      'Twenty-four nations signed off on harmonized regulatory certifications for maritime and pipeline transport of green hydrogen derivatives.',
      'The agreement establishes international carbon intensity verification standards to prevent greenwashing in industrial imports.',
      'Funding guarantees totaling $12 billion were unlocked for cross-border terminal infrastructure in key port corridors.'
    ],
    whyItMatters: 'Overcomes the main barrier to clean energy export markets by creating enforceable, bankable carbon credits and safety protocols.',
    perspectives: {
      consensus: 'A foundational framework enabling heavy industries (steel, fertilizer, shipping) to decarbonize competitively.',
      divergence: 'Developing economies emphasize the need for stronger technology transfer and lower financing interest rates.'
    },
    source: 'Associated Press & UN News',
    sourceUrl: 'https://apnews.com',
    publishedAt: '5 hours ago',
    readTimeMinutes: 3,
    sentiment: 'neutral',
    tags: ['Energy', 'Geopolitics', 'Hydrogen', 'Global Trade'],
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-5',
    title: 'Targeted Immunotherapy Trial Demonstrates 82% Remission in Refractory Lymphoma',
    category: 'science',
    summaryBullets: [
      'Phase 2 clinical trial results published in the New England Journal of Medicine reveal unprecedented response rates using dual-antigen engineered T-cells.',
      'Adverse neurological reactions were minimized through a novel automated release-switch molecule that prevents systemic cytokine storms.',
      'Regulatory health authorities granted expedited review designations for broader multi-center trials in early 2027.'
    ],
    whyItMatters: 'Offers a viable curative pathway for patients who exhausted standard chemotherapy and first-generation CAR-T therapies.',
    perspectives: {
      consensus: 'One of the most promising oncology breakthroughs of the decade with improved safety markers.',
      divergence: 'Manufacturing complexity and prohibitive per-patient treatment costs remain challenges for universal healthcare systems.'
    },
    source: 'NEJM & Nature Medicine',
    sourceUrl: 'https://www.nature.com',
    publishedAt: '6 hours ago',
    readTimeMinutes: 3,
    sentiment: 'positive',
    tags: ['Medicine', 'Oncology', 'Biotech', 'Genetics'],
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-6',
    title: 'Streaming & Gaming Convergence: Interactive Live Formats Surge by 65% in 2026',
    category: 'culture',
    summaryBullets: [
      'Audience metrics indicate massive migration toward real-time participatory entertainment, blending live spectator streaming with responsive narrative decision-making.',
      'Independent game studios and creators report a 3x higher subscriber retention compared to static video on-demand catalogs.',
      'Major film studios announced interactive episodic pilots leveraging spatial 3D engines for multi-device viewers.'
    ],
    whyItMatters: 'Signals a generational shift from passive media consumption to co-created entertainment, redefining media monetization models.',
    perspectives: {
      consensus: 'Interactive media is capturing younger demographic attention faster than linear television or legacy streaming.',
      divergence: 'Traditional creators raise concerns regarding higher production budgets and unpredictable creative control.'
    },
    source: 'Variety & The Verge',
    sourceUrl: 'https://www.theverge.com',
    publishedAt: '7 hours ago',
    readTimeMinutes: 2,
    sentiment: 'neutral',
    tags: ['Entertainment', 'Gaming', 'Digital Media', 'Creator Economy'],
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80'
  }
];

export function generateAiNewsAnswer(query: string): AiNewsAnswer {
  const cleanQ = query.trim().toLowerCase();

  if (cleanQ.includes('ai') || cleanQ.includes('tech') || cleanQ.includes('model') || cleanQ.includes('reasoning')) {
    return {
      query,
      summary: 'Today\'s primary technology headline is the release of next-gen distilled reasoning AI architectures that reduce operational latency by 40% while matching top benchmark accuracy. Concurrently, semiconductor consortia finalized specs for 1.4nm High-NA EUV chip architectures aimed at solving hyperscale data center power constraints.',
      keyTakeaways: [
        'AI inference costs and latency drop significantly with new distillation techniques.',
        '1.4nm semiconductor roadmap aims to mitigate data center power bottlenecks by 2028.',
        'Cloud SaaS giants are actively rolling out automated verification and coding agents.'
      ],
      citations: [
        {
          id: 1,
          source: 'TechCrunch',
          title: 'Distillation Breakthroughs Make Frontier AI Models 40% Faster',
          url: 'https://techcrunch.com',
          snippet: '...slashed memory overhead and latency without degrading multi-step reasoning capabilities.',
          timeAgo: '2h ago'
        },
        {
          id: 2,
          source: 'Reuters Tech',
          title: 'High-NA EUV Specs Approved for 1.4nm Production Lines',
          url: 'https://reuters.com',
          snippet: '...a 25% energy reduction per compute cycle designed specifically for heavy AI workloads.',
          timeAgo: '3h ago'
        }
      ],
      relatedQueries: [
        'How does this affect enterprise cloud software pricing?',
        'When will 1.4nm chips enter consumer devices?',
        'Which open-weights models support the new distillation?'
      ],
      confidence: 0.98,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  if (cleanQ.includes('market') || cleanQ.includes('stock') || cleanQ.includes('economy') || cleanQ.includes('inflation') || cleanQ.includes('fed') || cleanQ.includes('rate')) {
    return {
      query,
      summary: 'Global financial markets witnessed a synchronized rally across US, European, and Asian bourses today. Softer volatility indices and balanced inflation data fostered investor confidence that central banks can maintain predictable monetary policy trajectories without destabilizing employment numbers.',
      keyTakeaways: [
        'Equities advanced with broad market breadth led by cyclical and tech sectors.',
        'Treasury yields stabilized near 4-month volatility lows.',
        'Corporate debt refinancing environments showed marked improvement in investor demand.'
      ],
      citations: [
        {
          id: 1,
          source: 'Bloomberg Markets',
          title: 'Global Equities Advance on Calm Inflation Signals',
          url: 'https://bloomberg.com',
          snippet: '...volatility gauges receded as institutional capital re-entered growth sectors.',
          timeAgo: '4h ago'
        },
        {
          id: 2,
          source: 'Financial Times',
          title: 'Central Bank Corridors Bolster Cross-Border Liquidity',
          url: 'https://ft.com',
          snippet: '...markets pricing in extended stability across key interest rate benchmarks.',
          timeAgo: '4h ago'
        }
      ],
      relatedQueries: [
        'What are analysts projecting for the next quarterly GDP release?',
        'How are tech earnings impacting the S&P 500 rally?',
        'What is happening in commodity and energy markets?'
      ],
      confidence: 0.96,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  if (cleanQ.includes('science') || cleanQ.includes('health') || cleanQ.includes('cancer') || cleanQ.includes('medical') || cleanQ.includes('trial')) {
    return {
      query,
      summary: 'The top scientific milestone today is an 82% remission rate reported in a Phase 2 trial of next-generation dual-antigen CAR-T immunotherapy for refractory lymphoma. The therapy utilizes a biological safety-switch to curb cytokine release syndrome, paving the way for faster regulatory review.',
      keyTakeaways: [
        '82% complete or partial response in late-stage lymphoma patients.',
        'Novel molecular switch dramatically curtails severe neurological side effects.',
        'Fast-track regulatory review granted for expanded multi-center trials in 2027.'
      ],
      citations: [
        {
          id: 1,
          source: 'Nature Medicine',
          title: 'Safety-Switch T-Cell Therapy Reaches Critical Remission Milestone',
          url: 'https://nature.com',
          snippet: '...eliminating tumor burden while suppressing uncontrolled cytokine escalation.',
          timeAgo: '6h ago'
        },
        {
          id: 2,
          source: 'NEJM Briefing',
          title: 'Phase II Dual-Antigen Clinical Data in Blood Cancers',
          url: 'https://nejm.org',
          snippet: '...unprecedented durability observed across diverse patient cohorts.',
          timeAgo: '6h ago'
        }
      ],
      relatedQueries: [
        'How soon could this therapy receive standard FDA approval?',
        'What makes dual-antigen targeting superior to first-gen CAR-T?',
        'What other cancer types are being tested with this switch mechanism?'
      ],
      confidence: 0.97,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  // Default universal daily news briefing synthesis
  return {
    query,
    summary: `Here is today's verified pulse on "${query}": The day is marked by three primary cross-cutting themes: technological acceleration with 40% faster reasoning AI architectures, financial market stability following predictable macroeconomic data, and international multilateral progress on clean energy logistics standards.`,
    keyTakeaways: [
      'Technology: Next-gen AI reasoning distillation drops cloud latency by 40%.',
      'Finance: Global indices rally as treasury volatility reaches multi-month lows.',
      'Geopolitics & Energy: 24-nation clean hydrogen logistics framework signed.',
      'Medicine: Immunotherapy trials mark 82% remission in refractory cases.'
    ],
    citations: [
      {
        id: 1,
        source: 'Associated Press Wire',
        title: 'Daily Global Brief: Today\'s Top Five Developments',
        url: 'https://apnews.com',
        snippet: '...cross-sector advancements in energy, technology, and health dominate headlines today.',
        timeAgo: '1h ago'
      },
      {
        id: 2,
        source: 'Reuters World',
        title: 'Global Overview: Economic Confidence and Innovation Corridors',
        url: 'https://reuters.com',
        snippet: '...investor and institutional sentiment strengthened amidst cooperative policy moves.',
        timeAgo: '2h ago'
      }
    ],
    relatedQueries: [
      'Summarize today\'s tech and AI news in 3 bullets',
      'What are the biggest stock market movers today?',
      'Tell me about today\'s medical and climate breakthroughs'
    ],
    confidence: 0.95,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
