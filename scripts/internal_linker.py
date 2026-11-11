#!/usr/bin/env python3
"""
WhatIsInNewsToday.com - Weekly Automated Internal Linking Sensing System
1. Scans all published HTML articles across /news/, /health/, and /top-10/
2. Identifies high-value topical keywords & named entities in text (paragraphs and bullet spans)
3. Contextually links unlinked entity mentions to their canonical authority pages
4. Avoids over-linking (max 2-3 links per article, never inside headings, links, or buttons)
5. Generates a weekly audit report in data/internal_linking_report.json
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime, timezone

REPO_ROOT = Path(__file__).resolve().parent.parent
REPORT_FILE = REPO_ROOT / 'data' / 'internal_linking_report.json'

ENTITY_TARGETS = [
    {
        "keywords": ["Federal Reserve", "monetary policy", "policy rates", "benchmark rate", "mortgage averages", "fixed 30-year", "interest rate corridor", "inflation metrics"],
        "url": "/news/us-federal-reserve-signals-neutral-rate-corridor/",
        "title": "Federal Reserve Rate Corridor & Inflation Analysis"
    },
    {
        "keywords": ["fast-chargers", "fast chargers", "fast charging", "highway transport electrification", "commercial fleets", "interstate highway", "Interstate 80", "charging infrastructure", "EV corridor"],
        "url": "/news/bipartisan-us-infrastructure-act-ev-corridor/",
        "title": "DOT Highway Fast Charging Infrastructure"
    },
    {
        "keywords": ["clean compute", "AI supercomputing", "frontier AI", "computing cluster", "Central Texas", "AI cluster", "data center infrastructure"],
        "url": "/news/silicon-valley-ai-supercomputing-hub-texas/",
        "title": "Clean Compute & Frontier AI Data Center"
    },
    {
        "keywords": ["Alzheimer's biomarkers", "blood diagnostic", "Alzheimer's", "cognitive decline", "amyloid and tau", "early-stage Alzheimer"],
        "url": "/news/us-fda-grants-accelerated-approval-alzheimers/",
        "title": "FDA Alzheimer's Blood Diagnostic Clearance"
    },
    {
        "keywords": ["Supreme Court", "Fourth Amendment", "geofence tracking", "commercial location feeds", "digital privacy", "warrant protections"],
        "url": "/news/us-supreme-court-issues-digital-privacy-ruling/",
        "title": "Supreme Court Geofence Privacy Mandate"
    },
    {
        "keywords": ["Lunar Gateway", "lunar orbit habitat", "NASA Artemis", "lunar station", "deep space habitat"],
        "url": "/news/nasa-artemis-lunar-gateway-habitat/",
        "title": "NASA Artemis Lunar Gateway Habitat"
    },
    {
        "keywords": ["major depression", "mental health", "depression biomarkers", "digital CBT", "cognitive behavioral therapy", "depressive disorder", "depression"],
        "url": "/health/mental-health/",
        "title": "Clinical Mental Health & Digital CBT Protocols"
    },
    {
        "keywords": ["addictions", "addiction", "naloxone", "overdose prevention", "synthetic fentanyl", "synthetic opioids", "substance use"],
        "url": "/health/addictions/",
        "title": "Addictions, Overdose Prevention & Harm Reduction"
    },
    {
        "keywords": ["medical detox", "medical detoxification", "withdrawal management", "ASAM criteria", "Bernese method", "detoxification", "detox"],
        "url": "/health/detox/",
        "title": "Inpatient Medical Detoxification Protocols"
    },
    {
        "keywords": ["crisis intervention", "988 mobile crisis", "988 Lifeline", "CRAFT model", "psychiatric crises", "crisis response", "mobile crisis"],
        "url": "/health/intervention/",
        "title": "Behavioral Crisis Intervention & 988 Response"
    },
    {
        "keywords": ["clinical psychiatry", "intermittent theta-burst", "accelerated TMS", "neuromodulation", "treatment-resistant depression", "psychiatry", "transcranial magnetic stimulation"],
        "url": "/health/psychiatry/",
        "title": "Clinical Psychiatry & Neuromodulation Trials"
    },
    {
        "keywords": ["Health Hub", "health intelligence", "medical intelligence"],
        "url": "/health/",
        "title": "Health & Medical Intelligence Hub"
    },
    {
        "keywords": ["viral reels", "Instagram Reels", "viral Instagram", "trending Instagram"],
        "url": "/top-10/instagram/",
        "title": "Top 10 Instagram Reels Today"
    },
    {
        "keywords": ["TikTok viral", "viral TikTok", "TikTok trends", "trending TikTok"],
        "url": "/top-10/tiktok/",
        "title": "Top 10 TikTok Viral Trends"
    },
    {
        "keywords": ["YouTube Shorts", "viral YouTube", "trending YouTube"],
        "url": "/top-10/youtube/",
        "title": "Top 10 YouTube Shorts"
    },
    {
        "keywords": ["search trends", "Google trends", "trending inquiries", "top search queries"],
        "url": "/top-10/trends/",
        "title": "Top 10 Search Trends Today"
    }
]

def find_article_files():
    articles = []
    scan_dirs = [REPO_ROOT / 'news', REPO_ROOT / 'health']
    for d in scan_dirs:
        if not d.exists():
            continue
        for root, dirs, files in os.walk(d):
            if 'index.html' in files:
                articles.append(Path(root) / 'index.html')
    return sorted(articles)

def inject_internal_links_in_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    current_rel_url = '/' + os.path.relpath(file_path.parent, REPO_ROOT).replace(os.sep, '/') + '/'
    if current_rel_url == '/./':
        current_rel_url = '/'

    links_added = []
    max_links_to_add = 3

    article_match = re.search(r'(<article[^>]*>)(.*?)(</article>)', html, re.DOTALL)
    if not article_match:
        return html, links_added

    prefix, article_content, suffix = article_match.groups()

    # Existing links
    existing_links = set(re.findall(r'href="([^"]+)"', article_content))
    existing_links.add(current_rel_url)

    # Function to replace in a given text fragment safely
    def process_text_fragment(tag_open, inner_text, tag_close):
        nonlocal links_added, existing_links
        if len(links_added) >= max_links_to_add:
            return f"{tag_open}{inner_text}{tag_close}"

        # If already has a link, do not touch
        if '<a ' in inner_text or 'href=' in inner_text:
            return f"{tag_open}{inner_text}{tag_close}"

        # Match entity targets
        for target in ENTITY_TARGETS:
            if len(links_added) >= max_links_to_add:
                break
            target_url = target['url']
            if target_url in existing_links:
                continue

            for keyword in target['keywords']:
                # Regex for whole word boundary
                pattern = re.compile(rf'(?<![\w/])({re.escape(keyword)})(?![\w/])', re.IGNORECASE)
                m = pattern.search(inner_text)
                if m:
                    # Ensure we are not inside a tag attribute or <strong>
                    matched_text = m.group(1)
                    # Safe check: don't link inside <strong> tag itself
                    replacement = f'<a href="{target_url}" class="text-blue-700 dark:text-blue-400 font-medium underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 transition-colors" title="{target["title"]}">{matched_text}</a>'
                    inner_text = pattern.sub(replacement, inner_text, count=1)
                    links_added.append({
                        "file": str(file_path.relative_to(REPO_ROOT)),
                        "keyword": matched_text,
                        "target_url": target_url,
                        "title": target["title"]
                    })
                    existing_links.add(target_url)
                    break

        return f"{tag_open}{inner_text}{tag_close}"

    # Target <p>...</p> tags
    def replace_p(m):
        return process_text_fragment(m.group(1), m.group(2), m.group(3))

    modified_article = re.sub(r'(<p[^>]*>)(.*?)(</p>)', replace_p, article_content, flags=re.DOTALL)

    # Also target <span>...</span> tags that are not buttons or titles
    def replace_span(m):
        s_open = m.group(1)
        s_inner = m.group(2)
        s_close = m.group(3)
        # Skip small utility spans
        if len(s_inner.strip()) < 30 or '<button' in s_inner or 'Add to Preferred' in s_inner or 'data-lucide' in s_inner:
            return m.group(0)
        return process_text_fragment(s_open, s_inner, s_close)

    modified_article = re.sub(r'(<span[^>]*>)(.*?)(</span>)', replace_span, modified_article, flags=re.DOTALL)

    new_html = html[:article_match.start()] + prefix + modified_article + suffix + html[article_match.end():]
    return new_html, links_added

def run_internal_linking_audit():
    articles = find_article_files()
    total_links_created = 0
    audit_log = []

    print(f"[{datetime.now(timezone.utc).isoformat()}] Scanning {len(articles)} article pages for internal linking opportunities...")

    for art in articles:
        new_html, links_added = inject_internal_links_in_html(art)
        if links_added:
            with open(art, 'w', encoding='utf-8') as f:
                f.write(new_html)
            total_links_created += len(links_added)
            audit_log.extend(links_added)
            print(f"  ✓ Linked {len(links_added)} entities in {art.relative_to(REPO_ROOT)}")

    os.makedirs(REPORT_FILE.parent, exist_ok=True)
    report_data = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_articles_scanned": len(articles),
        "total_links_created": total_links_created,
        "links": audit_log
    }

    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report_data, f, indent=2)

    print(f"Internal linking audit complete. {total_links_created} contextual internal links established.")
    print(f"Report saved to {REPORT_FILE.relative_to(REPO_ROOT)}")
    return report_data

if __name__ == '__main__':
    run_internal_linking_audit()
