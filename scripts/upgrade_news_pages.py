#!/usr/bin/env python3
"""
Batch upgrade news pages to include:
1. Universal OpenGraph / Twitter meta tags pointing to /assets/og-featured.png
2. Schema.org NewsArticle JSON-LD
3. Skip-to-content accessibility link
4. Top utilities bar with Theme Switcher & Preferred Sources buttons
5. Category navigation with Health Hub
6. Dark mode styling classes
7. Footer Preferred Sources badge and #preferred-modal
8. /assets/site.js inclusion
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
NEWS_DIR = REPO_ROOT / 'news'

PAGES = [
    {
        'dir': 'us-federal-reserve-signals-neutral-rate-corridor',
        'category': 'Economy',
        'badge_color': 'bg-emerald-600',
        'headline': 'Federal Reserve Signals Neutral Rate Corridor as Core Inflation Settles at 2.3%',
        'description': 'Federal Reserve governors confirmed policy rates will remain steady following resilient domestic job creation and 2.3% annualized core CPI readings.'
    },
    {
        'dir': 'bipartisan-us-infrastructure-act-ev-corridor',
        'category': 'Infrastructure',
        'badge_color': 'bg-blue-600',
        'headline': 'DOT Unveils $4.2B Interstate Corridor Allocation for 8,500 Ultra-Fast EV Stalls',
        'description': 'Federal grants will install heavy-duty universal fast chargers along Interstate 80, I-90, and I-10 corridors with 97% uptime mandates.'
    },
    {
        'dir': 'silicon-valley-ai-supercomputing-hub-texas',
        'category': 'Technology',
        'badge_color': 'bg-indigo-600',
        'headline': 'Consortium Powers Up 1.2-Gigawatt Clean Compute Data Center Hub in Texas',
        'description': 'Hyperscale joint venture connects dedicated solar, battery, and SMR nuclear capacity to power AI workloads without municipal grid load.'
    },
    {
        'dir': 'us-fda-grants-accelerated-approval-alzheimers',
        'category': 'Health',
        'badge_color': 'bg-purple-600',
        'headline': 'FDA Clears 15-Minute Blood Diagnostic for Early-Stage Alzheimer\'s Biomarkers',
        'description': 'FDA approved the first non-invasive finger-prick assay demonstrating 94% diagnostic precision in clinical trials, eliminating spinal taps.'
    },
    {
        'dir': 'us-supreme-court-issues-digital-privacy-ruling',
        'category': 'Politics',
        'badge_color': 'bg-rose-600',
        'headline': 'Supreme Court Mandates Fourth Amendment Warrants for Commercial Geofence Tracking',
        'description': 'In a 7-2 ruling, SCOTUS declares warrantless commercial purchases of bulk location feeds unconstitutional, closing data-broker loopholes.'
    },
    {
        'dir': 'nasa-artemis-lunar-gateway-habitat',
        'category': 'Science',
        'badge_color': 'bg-amber-600',
        'headline': 'NASA Completes Acoustic and Environmental Seals on Artemis Lunar Gateway Habitat',
        'description': 'Astronaut quarters for lunar orbit operations pass pressure verification tests at Kennedy Space Center ahead of 2028 deployment.'
    }
]

PREFERRED_MODAL_HTML = '''
  <!-- Preferred Source Modal -->
  <div id="preferred-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 sm:p-7 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <i data-lucide="star" class="h-5 w-5 fill-amber-500 text-amber-500"></i>
          <h3 class="font-bold text-base text-zinc-950 dark:text-white">Add as Preferred Source</h3>
        </div>
        <button onclick="closePreferredSourceModal()" class="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 text-zinc-500">
          <i data-lucide="x" class="h-4 w-4"></i>
        </button>
      </div>
      <p class="text-xs text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
        Follow WhatIsInNewsToday on your preferred reader or aggregator:
      </p>

      <div class="space-y-2.5 text-xs">
        <a href="https://news.google.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors">
          <div class="flex items-center gap-2.5">
            <span class="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">G</span>
            <span class="font-semibold text-zinc-900 dark:text-white">Follow on Google News</span>
          </div>
          <i data-lucide="external-link" class="h-3.5 w-3.5 text-zinc-400"></i>
        </a>
        <button onclick="bookmarkCurrentPage()" class="w-full flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors text-left">
          <div class="flex items-center gap-2.5">
            <span class="h-7 w-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">★</span>
            <span class="font-semibold text-zinc-900 dark:text-white">Bookmark (Cmd+D / Ctrl+D)</span>
          </div>
          <span id="bookmark-status" class="text-[11px] text-zinc-400">Save</span>
        </button>
      </div>
    </div>
  </div>
'''

for item in PAGES:
    page_path = NEWS_DIR / item['dir'] / 'index.html'
    if not page_path.exists():
        continue
    
    with open(page_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update OpenGraph and Schema
    schema_markup = f'''  <!-- OpenGraph & Social Cards -->
  <meta property="og:title" content="{item['headline']} | What Is In News Today">
  <meta property="og:description" content="{item['description']}">
  <meta property="og:image" content="https://whatisinnewstoday.com/assets/og-featured.png">
  <meta property="og:url" content="https://whatisinnewstoday.com/news/{item['dir']}/">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://whatisinnewstoday.com/assets/og-featured.png">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "{item['headline']}",
    "image": ["https://whatisinnewstoday.com/assets/og-featured.png"],
    "datePublished": "2026-10-21T06:00:00+00:00",
    "dateModified": "2026-10-21T06:30:00+00:00",
    "author": {{
      "@type": "Organization",
      "name": "What Is In News Today Editorial Wire"
    }},
    "publisher": {{
      "@type": "NewsMediaOrganization",
      "name": "What Is In News Today",
      "url": "https://whatisinnewstoday.com",
      "logo": "https://whatisinnewstoday.com/assets/og-featured.png"
    }},
    "mainEntityOfPage": "https://whatisinnewstoday.com/news/{item['dir']}/"
  }}
  </script>
'''
    if '<!-- OpenGraph' not in html:
        html = re.sub(r'(<link rel="canonical"[^>]*>)', r'\1\n' + schema_markup, html)

    # 2. Body class
    html = re.sub(r'<body class="[^"]*"', '<body class="bg-[#F8F9FA] dark:bg-[#0B0F17] text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-zinc-900 selection:text-white"', html)

    # 3. Accessibility skip link
    skip_link = '<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">Skip to main content</a>\n'
    if 'Skip to main content' not in html:
        html = re.sub(r'(<body[^>]*>)', r'\1\n  ' + skip_link, html)

    # 4. Top Utilities Bar
    top_bar = f'''  <!-- Top Utilities Bar -->
  <div class="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0E131F] text-xs text-zinc-600 dark:text-zinc-400 py-1.5 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full {item['badge_color']} text-white font-bold text-[10px] uppercase">
          {item['category']}
        </span>
        <span class="font-medium text-zinc-700 dark:text-zinc-300">Verified Wire Report</span>
        <span class="text-zinc-300 dark:text-zinc-700">•</span>
        <span class="font-mono-numbers text-zinc-500 dark:text-zinc-400">Published Today</span>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="openPreferredSourceModal()" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold text-[11px] hover:bg-amber-100 transition-colors">
          <i data-lucide="star" class="h-3 w-3 fill-amber-500 text-amber-500"></i>
          <span>Add to Preferred Sources</span>
        </button>
        <button onclick="toggleTheme()" class="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-stone-100 transition-colors" aria-label="Toggle dark mode">
          <i data-lucide="moon" id="theme-icon" class="h-3.5 w-3.5"></i>
        </button>
        <a href="/" class="hover:text-zinc-900 dark:hover:text-white transition-colors">← Back to Wire</a>
      </div>
    </div>
  </div>'''

    html = re.sub(r'<!-- Top Utilities Bar -->.*?</div>\s*</div>\s*</div>', top_bar, html, flags=re.DOTALL)

    # 5. Header dark styles
    html = re.sub(r'<header class="border-b border-zinc-200 bg-white[^"]*"', '<header class="border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0E131F]/95 sticky top-0 z-30 shadow-sm backdrop-blur-md"', html)
    html = re.sub(r'text-zinc-950 group-hover:text-blue-700', 'text-zinc-950 dark:text-white group-hover:text-blue-700', html)

    # 6. Main tag id="main-content"
    html = re.sub(r'<main class="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10 w-full">', '<main id="main-content" class="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10 w-full">', html)
    html = re.sub(r'<article class="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-sm">', '<article class="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-sm">', html)

    # 7. Footer replacement
    footer_html = f'''  <!-- Primary Footer (No US Edition label) -->
  <footer class="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0E131F] mt-16 py-12 text-xs text-zinc-600 dark:text-zinc-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
        <div class="md:col-span-1">
          <a href="/" class="font-editorial text-xl font-bold text-zinc-950 dark:text-white mb-2 block">
            WHAT IS IN NEWS TODAY
          </a>
          <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mb-4">
            Noise-free, verified daily news intelligence, Smart Brevity summaries, and top 10 viral reels across social platforms.
          </p>
          <button onclick="openPreferredSourceModal()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold text-xs hover:bg-amber-100 transition-colors">
            <i data-lucide="star" class="h-3.5 w-3.5 fill-amber-500 text-amber-500"></i>
            <span>Add to Preferred Sources</span>
          </button>
        </div>

        <div>
          <h5 class="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">Health &amp; Medicine</h5>
          <ul class="space-y-2">
            <li><a href="/health/" class="text-purple-700 dark:text-purple-400 font-bold hover:underline">Health Hub</a></li>
            <li><a href="/health/mental-health/" class="hover:text-zinc-950 dark:hover:text-white">Mental Health</a></li>
            <li><a href="/health/addictions/" class="hover:text-zinc-950 dark:hover:text-white">Addictions &amp; Recovery</a></li>
            <li><a href="/health/detox/" class="hover:text-zinc-950 dark:hover:text-white">Medical Detox</a></li>
            <li><a href="/health/intervention/" class="hover:text-zinc-950 dark:hover:text-white">Intervention Protocols</a></li>
            <li><a href="/health/psychiatry/" class="hover:text-zinc-950 dark:hover:text-white">Clinical Psychiatry</a></li>
          </ul>
        </div>

        <div>
          <h5 class="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">Top 10 Rankings</h5>
          <ul class="space-y-2">
            <li><a href="/top-10/" class="hover:text-zinc-950 dark:hover:text-white">Top 10 Directory</a></li>
            <li><a href="/top-10/instagram/" class="hover:text-zinc-950 dark:hover:text-white">Instagram Reels</a></li>
            <li><a href="/top-10/tiktok/" class="hover:text-zinc-950 dark:hover:text-white">TikTok Viral</a></li>
            <li><a href="/top-10/youtube/" class="hover:text-zinc-950 dark:hover:text-white">YouTube Shorts</a></li>
            <li><a href="/top-10/trends/" class="hover:text-zinc-950 dark:hover:text-white">Search Trends</a></li>
            <li><a href="/top-10/archive/" class="hover:text-zinc-950 dark:hover:text-white text-blue-700 font-semibold">Browse Archives</a></li>
          </ul>
        </div>

        <div>
          <h5 class="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">Policies &amp; Preferences</h5>
          <ul class="space-y-2">
            <li><a href="/editorial/" class="hover:text-zinc-950 dark:hover:text-white font-medium">Editorial Standards &amp; Ethics</a></li>
            <li><a href="/privacy/" class="hover:text-zinc-950 dark:hover:text-white">Privacy &amp; Cookie Policy</a></li>
            <li><a href="/sponsor/" class="hover:text-zinc-950 dark:hover:text-white">Advertising &amp; Media Kit</a></li>
            <li><a href="/unsubscribe/" class="text-rose-600 hover:text-rose-700 font-semibold">Unsubscribe / Email Settings</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
        <p>© 2026 WhatIsInNewsToday.com. All rights reserved.</p>
        <p class="font-mono-numbers">Auto-refreshed silently every 30 minutes • Zero clickbait</p>
      </div>
    </div>
  </footer>

{PREFERRED_MODAL_HTML}

  <script src="/assets/site.js"></script>
</body>
</html>'''

    html = re.sub(r'<!-- Primary Footer.*$', footer_html, html, flags=re.DOTALL)

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Upgraded {item['dir']}/index.html")

print("All news pages upgraded successfully.")
