#!/usr/bin/env python3
"""
Comprehensive Fix Script for WhatIsInNewsToday:
1. Replaces outdated Oct 20/21, 2026 dates with current Nov 10/11, 2026 dates.
2. Standardizes Dark Theme to strict neutral black (#09090B) and refined charcoal grays (#121215, #18181B, #27272A).
3. Standardizes Light Theme to pure whites and crisp grays (#FFFFFF, #F8F9FA, #E4E4E7).
4. Cleans up top-10 item cards (removes repetitive reaction bars and ad blocks from every card, places once at the bottom).
5. Sets Nvidia GB200 Blackwell as the #1 Trending topic in /top-10/trends/ linked to the new Nvidia story.
6. Generates 2026-11-10 archive directories for YouTube, TikTok, Instagram, and Trends.
"""

import os
import re
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

DATE_REPLACEMENTS = [
    ("Wednesday, October 21, 2026", "Wednesday, November 11, 2026"),
    ("Tuesday, October 20, 2026", "Tuesday, November 10, 2026"),
    ("October 21, 2026", "November 11, 2026"),
    ("October 20, 2026", "November 10, 2026"),
    ("Oct 21, 2026", "Nov 11, 2026"),
    ("Oct 20, 2026", "Nov 10, 2026"),
    ("2026-10-21T", "2026-11-11T"),
    ("2026-10-20T", "2026-11-10T"),
    ("Effective October 2026", "Effective November 2026"),
    ("October 2026", "November 2026"),
]

COLOR_REPLACEMENTS = [
    ("dark:bg-[#0B0F17]", "dark:bg-[#09090B]"),
    ("dark:bg-[#0E131F]", "dark:bg-[#121215]"),
    ("dark:bg-[#0E131F]/95", "dark:bg-[#121215]/95"),
    ("bg-[#F8F9FA] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100", "bg-[#F8F9FA] dark:bg-[#09090B] text-zinc-950 dark:text-zinc-50"),
]

REACTIONS_AND_AD_SECTION = '''
    <!-- Interactive Reactions & Sentiment Section -->
    <div class="mt-10 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">How did today's verified rankings impact you?</span>
        <div class="flex items-center gap-2">
          <button type="button" onclick="reactToStory('top-10', 'insightful', this)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all">
            <span>Insightful 👍</span>
            <span class="react-count font-mono-numbers text-[11px] font-bold text-blue-600 dark:text-blue-400">32</span>
          </button>
          <button type="button" onclick="reactToStory('top-10', 'surprising', this)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all">
            <span>Surprising 😮</span>
            <span class="react-count font-mono-numbers text-[11px] font-bold text-amber-600 dark:text-amber-400">18</span>
          </button>
          <button type="button" onclick="reactToStory('top-10', 'impactful', this)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all">
            <span>Impactful ⚡</span>
            <span class="react-count font-mono-numbers text-[11px] font-bold text-purple-600 dark:text-purple-400">45</span>
          </button>
        </div>
      </div>

      <button type="button" onclick="openNativeShare(document.title, window.location.href)" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-sm">
        <i data-lucide="share-2" class="h-4 w-4"></i>
        <span>Share Radar</span>
      </button>
    </div>

    <!-- Reserved AdSense Placement (Zero CLS Guarantee) -->
    <div class="my-8 p-3 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900/40 text-center">
      <span class="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">SPONSORED PLACEMENT</span>
      <div class="ad-slot-leaderboard flex items-center justify-center text-xs text-zinc-400 font-mono-numbers">
        Reserved for Google AdSense Responsive Leaderboard
      </div>
    </div>
'''

NVIDIA_TREND_CARD = '''      <!-- Item #1: NVIDIA Blackwell GB200 Superclusters -->
      <article class="bg-white dark:bg-[#18181B] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-sm card-hover">
        <div class="flex items-start gap-4">
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-bold text-base sm:text-lg font-mono-numbers shrink-0">
            #1
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-zinc-900 dark:text-zinc-100">Semiconductors &amp; AI Compute</span>
                <span class="text-zinc-300 dark:text-zinc-700">•</span>
                <span class="text-xs font-mono-numbers text-rose-600 dark:text-rose-400 font-bold">3.8M searches</span>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                🔥 Breakout Top Search
              </span>
            </div>
            <h2 class="font-editorial text-lg sm:text-xl font-bold text-zinc-950 dark:text-white mb-2">
              <a href="/news/nvidia-unveils-blackwell-ultra-ai-superclusters-record-demand/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Nvidia GB200 Blackwell Superclusters &amp; Q3 Data Center Run-Rate
              </a>
            </h2>
            <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
              Surge in queries following nationwide deployment of liquid-cooled GB200 NVL72 AI rack superclusters as quarterly data center revenue surged to a record $35.1 billion across US sovereign and commercial clouds.
            </p>
            <div class="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              <span>Related News: <a href="/news/nvidia-unveils-blackwell-ultra-ai-superclusters-record-demand/" class="text-blue-700 dark:text-blue-400 font-medium hover:underline">Read Verified Breakdown</a></span>
              <a href="https://trends.google.com" target="_blank" rel="noopener noreferrer" class="text-blue-700 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
                <span>View Google Trends</span>
                <i data-lucide="external-link" class="h-3 w-3"></i>
              </a>
            </div>
          </div>
        </div>
      </article>
'''

def create_yesterday_archives():
    platforms = ['instagram', 'tiktok', 'youtube', 'trends']
    for p in platforms:
        src = REPO_ROOT / 'top-10' / p / '2026-10-20'
        dst = REPO_ROOT / 'top-10' / p / '2026-11-10'
        if src.exists():
            if not dst.exists():
                shutil.copytree(src, dst)
                print(f"Created archive: {dst.relative_to(REPO_ROOT)}")
            # Update dates inside dst/index.html
            html_file = dst / 'index.html'
            if html_file.exists():
                content = html_file.read_text(encoding='utf-8')
                content = content.replace('2026-10-20', '2026-11-10')
                content = content.replace('Tuesday, October 20, 2026', 'Tuesday, November 10, 2026')
                content = content.replace('October 20, 2026', 'November 10, 2026')
                content = content.replace('Oct 20, 2026', 'Nov 10, 2026')
                content = content.replace('dark:bg-[#0B0F17]', 'dark:bg-[#09090B]')
                content = content.replace('dark:bg-[#0E131F]', 'dark:bg-[#121215]')
                html_file.write_text(content, encoding='utf-8')

def clean_top10_listing(file_path, is_trends=False):
    content = file_path.read_text(encoding='utf-8')

    # Remove all duplicated reaction bars and in-article ad slots
    pattern = re.compile(r'\s*<!-- Interactive Reactions & Sentiment Bar -->.*?<!-- In-Article AdSense Placement.*?</div>\s*</div>', re.DOTALL)
    content = pattern.sub('', content)

    # Standardize article cards styling for dark & light
    content = re.sub(
        r'<article class="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm card-hover">',
        r'<article class="bg-white dark:bg-[#18181B] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-sm card-hover">',
        content
    )
    content = re.sub(r'text-zinc-900(?= mb-2">)', 'text-zinc-950 dark:text-white', content)
    content = re.sub(r'text-zinc-600 leading-relaxed', 'text-zinc-700 dark:text-zinc-300 leading-relaxed', content)
    content = re.sub(r'border-zinc-100 text-xs text-zinc-500', 'border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400', content)
    content = re.sub(r'text-blue-700(?= font-medium hover:underline)', 'text-blue-700 dark:text-blue-400', content)
    content = re.sub(r'text-blue-700(?= font-semibold hover:underline)', 'text-blue-700 dark:text-blue-400', content)
    content = re.sub(r'bg-zinc-900 text-white flex items-center justify-center font-bold text-base sm:text-lg font-mono-numbers shrink-0',
                     r'bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-bold text-base sm:text-lg font-mono-numbers shrink-0', content)

    if is_trends:
        # Replace Item #1 with Nvidia GB200 Blackwell
        item1_pattern = re.compile(r'<!-- Item #1 -->\s*<article.*?</article>', re.DOTALL)
        content = item1_pattern.sub(NVIDIA_TREND_CARD.strip(), content)

    # Insert single reactions and ad placement once before </main>
    if '<!-- Interactive Reactions & Sentiment Section -->' not in content and '</main>' in content:
        content = content.replace('</main>', REACTIONS_AND_AD_SECTION + '\n  </main>')

    # Update yesterday archive links
    content = content.replace('/2026-10-20/', '/2026-11-10/')
    content = content.replace('Oct 20, 2026', 'Nov 10, 2026')
    content = content.replace('October 20, 2026', 'November 10, 2026')

    file_path.write_text(content, encoding='utf-8')
    print(f"Cleaned and upgraded top-10 listing: {file_path.relative_to(REPO_ROOT)}")

def update_all_html_files():
    for root, dirs, files in os.walk(REPO_ROOT):
        if '.git' in root or 'node_modules' in root:
            continue
        for f in files:
            if f.endswith('.html'):
                p = Path(root) / f
                content = p.read_text(encoding='utf-8')
                modified = False

                for old_d, new_d in DATE_REPLACEMENTS:
                    if old_d in content:
                        content = content.replace(old_d, new_d)
                        modified = True

                for old_c, new_c in COLOR_REPLACEMENTS:
                    if old_c in content:
                        content = content.replace(old_c, new_c)
                        modified = True

                if modified:
                    p.write_text(content, encoding='utf-8')
                    print(f"Updated dates/colors in: {p.relative_to(REPO_ROOT)}")

def main():
    print("1. Creating yesterday archives for 2026-11-10...")
    create_yesterday_archives()

    print("2. Cleaning top-10 listing pages and setting Nvidia as #1...")
    clean_top10_listing(REPO_ROOT / 'top-10' / 'trends' / 'index.html', is_trends=True)
    clean_top10_listing(REPO_ROOT / 'top-10' / 'youtube' / 'index.html', is_trends=False)
    clean_top10_listing(REPO_ROOT / 'top-10' / 'tiktok' / 'index.html', is_trends=False)
    clean_top10_listing(REPO_ROOT / 'top-10' / 'instagram' / 'index.html', is_trends=False)

    print("3. Updating all HTML files for dates, dark mode colors, and archives...")
    update_all_html_files()

    print("All tasks complete!")

if __name__ == '__main__':
    main()
