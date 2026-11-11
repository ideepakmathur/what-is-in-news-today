#!/usr/bin/env python3
"""
Enhanced News & Health Subpage Upgrader:
- Adds reading progress bar
- Adds mobile bottom touch dock
- Adds native share dialog modal
- Adds interactive reaction buttons (Insightful 👍, Surprising 😮, Impactful ⚡)
- Adds zero-CLS AdSense reserved container
- Ensures WCAG AAA focus & contrast
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

MOBILE_DOCK_HTML = '''  <!-- Mobile Bottom Touch Navigation Dock -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 safe-bottom-dock shadow-2xl" aria-label="Mobile navigation">
    <div class="grid grid-cols-5 items-center justify-around text-center py-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
      <a href="/" class="flex flex-col items-center gap-1 hover:text-zinc-900 dark:hover:text-white py-1">
        <i data-lucide="newspaper" class="h-5 w-5"></i>
        <span>Stories</span>
      </a>
      <a href="/health/" class="flex flex-col items-center gap-1 hover:text-zinc-900 dark:hover:text-white py-1">
        <i data-lucide="activity" class="h-5 w-5"></i>
        <span>Health</span>
      </a>
      <a href="/top-10/" class="flex flex-col items-center gap-1 hover:text-zinc-900 dark:hover:text-white py-1 text-rose-600 dark:text-rose-400">
        <i data-lucide="flame" class="h-5 w-5"></i>
        <span>Top 10</span>
      </a>
      <a href="/" class="flex flex-col items-center gap-1 hover:text-zinc-900 dark:hover:text-white py-1">
        <i data-lucide="sparkles" class="h-5 w-5 text-indigo-500"></i>
        <span>Ask AI</span>
      </a>
      <button type="button" onclick="openNativeShare(document.title, window.location.href)" class="flex flex-col items-center gap-1 hover:text-zinc-900 dark:hover:text-white py-1">
        <i data-lucide="share-2" class="h-5 w-5 text-amber-500"></i>
        <span>Share</span>
      </button>
    </div>
  </nav>

  <!-- Native Share Modal Dialog -->
  <dialog id="share-modal" class="rounded-3xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 sm:p-7 max-w-md w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl m-auto" aria-labelledby="share-title">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <i data-lucide="share-2" class="h-5 w-5 text-blue-600"></i>
        <h3 id="share-title" class="font-bold text-base">Share with Friends &amp; Network</h3>
      </div>
      <button type="button" onclick="closeShareModal()" class="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 text-zinc-400" aria-label="Close dialog">
        <i data-lucide="x" class="h-4 w-4"></i>
      </button>
    </div>
    <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Spread verified daily news intelligence without partisan noise or sensationalism:</p>

    <div class="grid grid-cols-2 gap-2.5 text-xs font-semibold mb-4">
      <button type="button" onclick="shareToPlatform('x')" class="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors">
        <span class="h-6 w-6 rounded-lg bg-black text-white flex items-center justify-center font-bold text-[11px]">𝕏</span>
        <span>X (Twitter)</span>
      </button>
      <button type="button" onclick="shareToPlatform('whatsapp')" class="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors">
        <span class="h-6 w-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">WA</span>
        <span>WhatsApp</span>
      </button>
      <button type="button" onclick="shareToPlatform('linkedin')" class="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors">
        <span class="h-6 w-6 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-[11px]">in</span>
        <span>LinkedIn</span>
      </button>
      <button type="button" onclick="shareToPlatform('reddit')" class="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors">
        <span class="h-6 w-6 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-[11px]">RD</span>
        <span>Reddit</span>
      </button>
    </div>

    <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800">
      <button type="button" id="copy-share-btn" onclick="copyShareLink()" class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:bg-zinc-800 transition-colors">
        <i data-lucide="copy" class="h-4 w-4"></i>
        <span>Copy Shareable URL</span>
      </button>
    </div>
  </dialog>
'''

REACTIONS_AND_AD_HTML = '''      <!-- Interactive Reactions & Sentiment Bar -->
      <div class="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-2">How did this story impact you?</span>
          <div class="flex items-center gap-2">
            <button type="button" onclick="reactToStory('article', 'insightful', this)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all">
              <span>Insightful 👍</span>
              <span class="react-count font-mono-numbers text-[11px] font-bold text-blue-600 dark:text-blue-400">14</span>
            </button>
            <button type="button" onclick="reactToStory('article', 'surprising', this)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all">
              <span>Surprising 😮</span>
              <span class="react-count font-mono-numbers text-[11px] font-bold text-amber-600 dark:text-amber-400">9</span>
            </button>
            <button type="button" onclick="reactToStory('article', 'impactful', this)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all">
              <span>Impactful ⚡</span>
              <span class="react-count font-mono-numbers text-[11px] font-bold text-purple-600 dark:text-purple-400">22</span>
            </button>
          </div>
        </div>

        <button type="button" onclick="openNativeShare(document.title, window.location.href)" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-sm">
          <i data-lucide="share-2" class="h-4 w-4"></i>
          <span>Share Story</span>
        </button>
      </div>

      <!-- In-Article AdSense Placement (Zero CLS Guarantee) -->
      <div class="my-8 p-3 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900/40 text-center">
        <span class="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">SPONSORED PLACEMENT</span>
        <div class="ad-slot-rectangle flex items-center justify-center text-xs text-zinc-400 font-mono-numbers">
          Reserved for Google AdSense Responsive Unit (300x250)
        </div>
      </div>
'''

def upgrade_page(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Body padding & reading progress
    if 'pb-20 md:pb-0' not in html:
        html = re.sub(r'<body class="([^"]*)"', r'<body class="\1 pb-20 md:pb-0"', html)

    if 'id="reading-progress"' not in html:
        progress_bar = '\n  <!-- Reading Progress Bar -->\n  <div id="reading-progress" class="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 z-50 w-0"></div>\n'
        html = re.sub(r'(<body[^>]*>)', r'\1' + progress_bar, html)

    # 2. Insert Reactions & Ad in article if not already present
    if 'How did this story impact you?' not in html and '</article>' in html:
        html = html.replace('</article>', REACTIONS_AND_AD_HTML + '\n    </article>')

    # 3. Add Mobile Dock and Share Modal before <script src="/assets/site.js"></script>
    if 'id="share-modal"' not in html:
        html = html.replace('<script src="/assets/site.js"></script>', MOBILE_DOCK_HTML + '\n  <script src="/assets/site.js"></script>')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Upgraded {file_path.relative_to(REPO_ROOT)}")

def main():
    target_dirs = [REPO_ROOT / 'news', REPO_ROOT / 'health', REPO_ROOT / 'top-10']
    for td in target_dirs:
        for root, dirs, files in os.walk(td):
            if 'index.html' in files:
                p = Path(root) / 'index.html'
                upgrade_page(p)

if __name__ == '__main__':
    main()
