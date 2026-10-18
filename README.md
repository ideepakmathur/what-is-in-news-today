# WhatIsInNewsToday.com 🗞️⚡

> The AI-Powered 3-Minute Daily Intelligence Engine & Noise-Free News Portal.

---

## 📁 Project Structure

```
whatisinnewstoday/
├── MONETIZATION_PLAYBOOK.md   <-- Step-by-step roadmap to $10k/month revenue
├── next-app/                  <-- Full-stack Next.js App Router + TypeScript + Tailwind
│   ├── app/
│   │   ├── api/ask/route.ts   <-- AI news search & citation engine
│   │   ├── api/feed/route.ts  <-- News wire endpoint with category filters
│   │   ├── api/subscribe/     <-- Newsletter capture endpoint (Beehiiv ready)
│   │   ├── layout.tsx         <-- SEO metadata & OpenGraph tags for domain
│   │   ├── page.tsx           <-- Home page assembling search, feed, audio, pro modal
│   │   └── globals.css
│   ├── components/            <-- Modular UI (Header, AskNewsBar, Cards, AudioPlayer, etc.)
│   ├── lib/                   <-- Types and curated news data / query engine
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── standalone-preview/        <-- Zero-dependency instant browser app
    ├── index.html             <-- Interactive live prototype (Tailwind + Lucide CDN)
    └── app.js                 <-- Client-side AI simulation, TTS speech reader, & state
```

---

## 🚀 How to Run

### Option 1: Instant Standalone Preview (No npm or Node install needed!)

You can test and demo the entire interactive experience right away:

```bash
cd whatisinnewstoday/standalone-preview
python3 -m http.server 3000
```
Then open: **`http://localhost:3000`** in your browser.

- Test the **"Ask AI"** query input (e.g. click *"⚡ AI & Tech Breakthroughs"* or type any question).
- Test the **60s Audio Briefing** player with speed toggles (1x, 1.25x, 1.5x) using your browser's speech engine.
- Test the **Category filters**, **"View debate"** expander, and **Newsletter signup**.
- Inspect the **Sponsorship banner** and **Pro Membership modal**.

---

### Option 2: Deploy Production Next.js App to Vercel / Hostinger

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for whatisinnewstoday.com"
   ```
2. In [Vercel](https://vercel.com) (or your preferred host):
   - Import your repository.
   - Set the root directory to `whatisinnewstoday/next-app`.
   - Add environment variables (optional for live AI grounding):
     - `GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com)
     - `BEEHIIV_API_KEY` & `BEEHIIV_PUBLICATION_ID`: For newsletter sync.
   - Click **Deploy**.
3. Point your domain `whatisinnewstoday.com` to the project:
   - Add **A Record:** `@` -> `76.76.21.21`
   - Add **CNAME Record:** `www` -> `cname.vercel-dns.com`

---

## 💰 Monetization Summary

Read [`MONETIZATION_PLAYBOOK.md`](file:///Users/deepakmathur/Workplace/SearchOptiMark/whatisinnewstoday/MONETIZATION_PLAYBOOK.md) for full economics:
1. **Daily Morning Newsletter:** 5,000–15,000 subscribers generating **$3,000–$10,000/month** via sponsored slots ($40–$70 CPM).
2. **NewsToday Pro Subscription ($9/month):** WhatsApp/Telegram 7 AM audio briefing bot + personalized topic radars.
3. **Native Category Sponsors & Affiliates:** Industry takeovers (e.g. AI, Fintech) and contextual tools.
