#!/usr/bin/env python3
"""
Batch upgrade all remaining pages (top-10 platforms, editorial, privacy, sponsor, unsubscribe) with:
1. Universal OpenGraph & Twitter tags pointing to /assets/og-featured.png
2. Skip to main content link
3. Dark mode body class
4. Top utilities bar with Theme Switcher & Preferred Sources buttons
5. Footer with Preferred Sources badge & modal
6. /assets/site.js inclusion
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

TARGET_PATHS = [
    REPO_ROOT / 'top-10' / 'instagram' / 'index.html',
    REPO_ROOT / 'top-10' / 'tiktok' / 'index.html',
    REPO_ROOT / 'top-10' / 'youtube' / 'index.html',
    REPO_ROOT / 'top-10' / 'trends' / 'index.html',
    REPO_ROOT / 'top-10' / 'archive' / 'index.html',
    REPO_ROOT / 'editorial' / 'index.html',
    REPO_ROOT / 'privacy' / 'index.html',
    REPO_ROOT / 'sponsor' / 'index.html',
    REPO_ROOT / 'unsubscribe' / 'index.html',
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

FOOTER_HTML = f'''  <!-- Primary Footer (No US Edition label) -->
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

for p in TARGET_PATHS:
    if not p.exists():
        continue
    with open(p, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. OpenGraph
    if 'og:image' not in html:
        title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
        t = title_match.group(1) if title_match else 'What Is In News Today'
        og_block = f'''  <!-- OpenGraph & Social Cards -->
  <meta property="og:title" content="{t}">
  <meta property="og:description" content="Noise-free daily news intelligence and verified top 10 trends.">
  <meta property="og:image" content="https://whatisinnewstoday.com/assets/og-featured.png">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://whatisinnewstoday.com/assets/og-featured.png">
'''
        html = re.sub(r'(<link rel="canonical"[^>]*>)', r'\1\n' + og_block, html)

    # 2. Body class
    html = re.sub(r'<body class="[^"]*"', '<body class="bg-[#F8F9FA] dark:bg-[#0B0F17] text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-zinc-900 selection:text-white"', html)

    # 3. Skip link
    if 'Skip to main content' not in html:
        html = re.sub(r'(<body[^>]*>)', r'\1\n  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">Skip to main content</a>', html)

    # 4. Main tag id="main-content"
    if '<main id="main-content"' not in html:
        html = re.sub(r'<main\s+class="', '<main id="main-content" class="', html)

    # 5. Top utilities bar with Theme Switcher and Preferred Sources
    if 'toggleTheme()' not in html:
        top_bar_btn = '''        <div class="flex items-center gap-2.5">
          <button onclick="openPreferredSourceModal()" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold text-[11px] hover:bg-amber-100 transition-colors">
            <i data-lucide="star" class="h-3 w-3 fill-amber-500 text-amber-500"></i>
            <span>Add to Preferred Sources</span>
          </button>
          <button onclick="toggleTheme()" class="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-stone-100 transition-colors" aria-label="Toggle dark mode">
            <i data-lucide="moon" id="theme-icon" class="h-3.5 w-3.5"></i>
          </button>
        </div>'''
        html = re.sub(r'(<div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-[^"]*">\s*<div[^>]*>.*?</div>\s*<div[^>]*>)', r'\1\n' + top_bar_btn + '\n', html, flags=re.DOTALL)

    # 6. Replace Footer
    html = re.sub(r'<!-- Primary Footer.*$', FOOTER_HTML, html, flags=re.DOTALL)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Upgraded {p.relative_to(REPO_ROOT)}")

print("All remaining pages upgraded.")
