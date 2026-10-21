#!/usr/bin/env python3
"""
Automated Sitemap Generator with Google News XML Extension
Discovers all static routes, extracts metadata, and generates:
1. sitemap.xml (standard + Google News protocol)
2. robots.txt
"""

import os
import re
import datetime
from pathlib import Path

BASE_URL = "https://whatisinnewstoday.com"
REPO_ROOT = Path(__file__).resolve().parent.parent

EXCLUDE_DIRS = {'.git', 'next-app', 'standalone-preview', 'node_modules', '.gemini'}

def extract_meta(html_path):
    try:
        with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(3000)
            
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        title = title_match.group(1).strip() if title_match else "What Is In News Today"
        title = re.sub(r'\s*\|\s*What Is In News Today.*$', '', title).strip()
        
        # Clean title for XML
        title = title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
        
        # Determine last modified time from file or default to current date
        mtime = os.path.getmtime(html_path)
        dt = datetime.datetime.fromtimestamp(mtime, tz=datetime.timezone.utc)
        iso_date = dt.strftime('%Y-%m-%dT%H:%M:%S+00:00')
        return title, iso_date
    except Exception as e:
        return "What Is In News Today", datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%S+00:00')

def find_routes():
    routes = []
    
    for root, dirs, files in os.walk(REPO_ROOT):
        # Exclude internal / build dirs
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        if 'index.html' in files:
            rel_dir = os.path.relpath(root, REPO_ROOT)
            html_file = os.path.join(root, 'index.html')
            title, lastmod = extract_meta(html_file)
            
            if rel_dir == '.':
                path = '/'
                priority = '1.0'
                changefreq = 'hourly'
                is_news = False
            else:
                path = f'/{rel_dir.replace(os.sep, "/")}/'
                if path.startswith('/news/') or path.startswith('/health/'):
                    priority = '0.9'
                    changefreq = 'hourly'
                    is_news = True
                elif path.startswith('/top-10/'):
                    priority = '0.8'
                    changefreq = 'hourly'
                    is_news = False
                else:
                    priority = '0.6'
                    changefreq = 'daily'
                    is_news = False
                    
            routes.append({
                'loc': f"{BASE_URL}{path}",
                'path': path,
                'title': title,
                'lastmod': lastmod,
                'priority': priority,
                'changefreq': changefreq,
                'is_news': is_news
            })
            
    # Sort routes: homepage first, then news, then top-10, then rest
    def sort_key(r):
        if r['path'] == '/': return (0, r['path'])
        if r['path'].startswith('/news/'): return (1, r['path'])
        if r['path'].startswith('/health/'): return (2, r['path'])
        if r['path'].startswith('/top-10/'): return (3, r['path'])
        return (4, r['path'])
        
    routes.sort(key=sort_key)
    return routes

def generate_sitemap(routes):
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        '  <!-- Generated automatically by WhatIsInNewsToday Autopilot -->'
    ]
    
    for r in routes:
        xml_lines.append('  <url>')
        xml_lines.append(f"    <loc>{r['loc']}</loc>")
        xml_lines.append(f"    <lastmod>{r['lastmod']}</lastmod>")
        xml_lines.append(f"    <changefreq>{r['changefreq']}</changefreq>")
        xml_lines.append(f"    <priority>{r['priority']}</priority>")
        
        # Featured image for all pages
        xml_lines.append('    <image:image>')
        xml_lines.append(f"      <image:loc>{BASE_URL}/assets/og-featured.png</image:loc>")
        xml_lines.append(f"      <image:title>{r['title']}</image:title>")
        xml_lines.append('    </image:image>')
        
        # Google News XML extension for rapid indexing
        if r['is_news']:
            xml_lines.append('    <news:news>')
            xml_lines.append('      <news:publication>')
            xml_lines.append('        <news:name>What Is In News Today</news:name>')
            xml_lines.append('        <news:language>en</news:language>')
            xml_lines.append('      </news:publication>')
            xml_lines.append(f"      <news:publication_date>{r['lastmod']}</news:publication_date>")
            xml_lines.append(f"      <news:title>{r['title']}</news:title>")
            xml_lines.append('    </news:news>')
            
        xml_lines.append('  </url>')
        
    xml_lines.append('</urlset>')
    
    sitemap_path = REPO_ROOT / 'sitemap.xml'
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml_lines) + '\n')
        
    print(f"Generated {sitemap_path} with {len(routes)} verified routes.")

def generate_robots():
    robots_content = f"""# Robots.txt for WhatIsInNewsToday.com
User-agent: *
Allow: /
Disallow: /scripts/
Disallow: /data/

# Accelerated indexing sitemap
Sitemap: {BASE_URL}/sitemap.xml
"""
    robots_path = REPO_ROOT / 'robots.txt'
    with open(robots_path, 'w', encoding='utf-8') as f:
        f.write(robots_content)
    print(f"Generated {robots_path}")

if __name__ == '__main__':
    routes = find_routes()
    generate_sitemap(routes)
    generate_robots()
