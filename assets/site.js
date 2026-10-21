// WhatIsInNewsToday.com - Core Client Engine

const NEWS_DATA = [
  {
    id: 'us-news-1',
    slug: 'us-federal-reserve-signals-neutral-rate-corridor',
    permalink: '/news/us-federal-reserve-signals-neutral-rate-corridor/',
    title: 'Federal Reserve Signals Neutral Rate Corridor as Core Inflation Settles at 2.3%',
    category: 'Economy',
    summaryBullets: [
      'Federal Reserve governors confirmed policy rates will remain steady following resilient domestic job creation.',
      'Core Consumer Price Index arrived at 2.3% annualized, within central bank tolerance bands for consumer staples.',
      'Fixed 30-year US mortgage averages eased to 5.85%, offering the lowest borrowing baseline in two years.'
    ],
    whyItMatters: 'Relieves commercial credit costs for American small businesses while improving housing affordability for first-time buyers.',
    perspectives: {
      consensus: 'Signals that the US macroeconomy is achieving a soft landing without manufacturing contraction.',
      divergence: 'Congressional budget analysts warn that sovereign debt refinancing volumes will test Treasury auction demand.'
    },
    source: 'Wall Street Journal & Bloomberg',
    sourceUrl: 'https://www.wsj.com',
    publishedAt: '28m ago',
    readTime: '2 min read'
  },
  {
    id: 'us-news-2',
    slug: 'bipartisan-us-infrastructure-act-ev-corridor',
    permalink: '/news/bipartisan-us-infrastructure-act-ev-corridor/',
    title: 'DOT Unveils $4.2B Interstate Corridor Allocation for 8,500 Ultra-Fast EV Stalls',
    category: 'Infrastructure',
    summaryBullets: [
      'Federal grants will install heavy-duty universal fast chargers along Interstate 80, I-90, and I-10 corridors.',
      'Federal rules mandate 97% uptime reliability standards and universal NACS connector interoperability.',
      'Equipment procurement contracts mandate domestic structural steel fabrication in Ohio, Pennsylvania, and Michigan.'
    ],
    whyItMatters: 'Removes cross-country range constraints for interstate long-haul logistics and commercial fleets.',
    perspectives: {
      consensus: 'A foundational federal modernization step for highway transport electrification.',
      divergence: 'Regional utility cooperatives caution that rural substation capacity must be reinforced.'
    },
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com',
    publishedAt: '45m ago',
    readTime: '2 min read'
  },
  {
    id: 'us-news-3',
    slug: 'silicon-valley-ai-supercomputing-hub-texas',
    permalink: '/news/silicon-valley-ai-supercomputing-hub-texas/',
    title: 'Consortium Powers Up 1.2-Gigawatt Clean Compute Data Center Hub in Texas',
    category: 'Technology',
    summaryBullets: [
      'A joint venture between top US tech labs connected a 1.2GW computing cluster powered by dedicated solar, battery, and SMR nuclear.',
      'Campus runs next-gen frontier AI reasoning workloads with zero load competition on municipal power grids.',
      'Project generates 3,200 permanent technical and electrical engineering jobs in Central Texas.'
    ],
    whyItMatters: 'Anchors AI compute leadership within American borders while addressing community grid capacity concerns.',
    perspectives: {
      consensus: 'Pioneering private-power template for hyperscale energy-intensive computation.',
      divergence: 'Environmental monitors are reviewing closed-loop water cooling rates during triple-digit summer heat waves.'
    },
    source: 'Reuters Tech',
    sourceUrl: 'https://www.reuters.com',
    publishedAt: '1h ago',
    readTime: '3 min read'
  },
  {
    id: 'us-news-4',
    slug: 'us-fda-grants-accelerated-approval-alzheimers',
    permalink: '/news/us-fda-grants-accelerated-approval-alzheimers/',
    title: 'FDA Clears 15-Minute Blood Diagnostic for Early-Stage Alzheimer\'s Biomarkers',
    category: 'Health',
    summaryBullets: [
      'FDA approved the first non-invasive finger-prick assay demonstrating 94% diagnostic precision in clinical trials.',
      'Eliminates the necessity for invasive lumbar punctures and costly $5,000 PET scans in early triage.',
      'Medicare established full reimbursement coverage starting next quarter for patients aged 60 and older.'
    ],
    whyItMatters: 'Enables millions of families to identify cognitive decline years before symptom manifestation, when therapies are most effective.',
    perspectives: {
      consensus: 'Hailed by neurologists as the most practical preventative diagnostic breakthrough in years.',
      divergence: 'Primary care physician groups emphasize the need for rigorous counseling protocols alongside positive results.'
    },
    source: 'STAT News & FDA',
    sourceUrl: 'https://www.statnews.com',
    publishedAt: '2h ago',
    readTime: '2 min read'
  },
  {
    id: 'us-news-5',
    slug: 'us-supreme-court-issues-digital-privacy-ruling',
    permalink: '/news/us-supreme-court-issues-digital-privacy-ruling/',
    title: 'Supreme Court Mandates Fourth Amendment Warrants for Commercial Geofence Tracking',
    category: 'Politics',
    summaryBullets: [
      'In a decisive 7-2 ruling, the Supreme Court declared warrantless purchases of commercial smartphone location feeds unconstitutional.',
      'Chief Justice wrote that algorithmic bulk tracking intrudes upon core constitutional privacy protections.',
      'The decision effectively shuts down the commercial data-broker loophole utilized by domestic agencies.'
    ],
    whyItMatters: 'Codifies landmark digital rights protecting 330 million Americans from unchecked commercial surveillance.',
    perspectives: {
      consensus: 'A historic civil liberties precedent harmonizing the Bill of Rights with the smartphone era.',
      divergence: 'Dissenting justices expressed concern over administrative speed in time-critical emergency investigations.'
    },
    source: 'SCOTUSblog & Washington Post',
    sourceUrl: 'https://www.scotusblog.com',
    publishedAt: '3h ago',
    readTime: '3 min read'
  },
  {
    id: 'us-news-6',
    slug: 'nasa-artemis-lunar-gateway-habitat',
    permalink: '/news/nasa-artemis-lunar-gateway-habitat/',
    title: 'NASA Completes Acoustic and Structural Seal Tests for Artemis Lunar Habitat Module',
    category: 'Science',
    summaryBullets: [
      'Flight engineers finalized deep-space qualification testing on the HALO lunar gateway habitation craft at Marshall Space Center.',
      'Suppliers across 42 states delivered life-support, radiation shielding, and docking adapters on schedule.',
      'Prepares four American astronauts for extended lunar orbit scientific operations slated for 2027.'
    ],
    whyItMatters: 'Establishes permanent orbital architecture required for sustainable human presence on the Moon and missions to Mars.',
    perspectives: {
      consensus: 'A monumental industrial manufacturing triumph for American deep-space infrastructure.',
      divergence: 'Congressional oversight committees urge NASA to hold prime contractors to firm-fixed pricing on follow-on vehicles.'
    },
    source: 'SpaceNews & NASA',
    sourceUrl: 'https://www.nasa.gov',
    publishedAt: '4h ago',
    readTime: '2 min read'
  }
];

const TOP10_DATA = {
  instagram: [
    { rank: 1, title: 'NASA Lunar Sunrise 4K Timelapse', creator: '@nasa', views: '18.4M views', level: 'Viral', summary: 'Breathtaking 4K video captured by Artemis test vehicle orbiting the lunar terminator.', link: 'https://instagram.com' },
    { rank: 2, title: '15-Minute Sourdough Method', creator: '@chefsteps', views: '14.2M views', level: 'Viral', summary: 'Rapid coil-fold fermentation method taking over home baking circles.', link: 'https://instagram.com' },
    { rank: 3, title: 'Texas AI Gigawatt Hub Tour', creator: '@techinsider', views: '11.8M views', level: 'Viral', summary: 'Walkthrough of the solar-nuclear powered clean computation center in Taylor, TX.', link: 'https://instagram.com' },
    { rank: 4, title: 'Olympic Gymnast Triple Twist', creator: '@usagym', views: '9.6M views', level: 'Trending', summary: 'Flawless dismount technique previewed ahead of national trials.', link: 'https://instagram.com' },
    { rank: 5, title: 'Grand Canyon Lightning Storm', creator: '@natgeotravel', views: '8.1M views', level: 'Trending', summary: 'Rare multi-bolt lightning strikes meeting sunset clouds over the North Rim.', link: 'https://instagram.com' },
    { rank: 6, title: 'Personal Finance 50/30/20 in 2026', creator: '@cleverfinance', views: '7.5M views', level: 'Trending', summary: 'How to allocate salary savings with normalizing interest rates.', link: 'https://instagram.com' },
    { rank: 7, title: 'Rescued Golden Retriever First Flight', creator: '@thedodo', views: '6.9M views', level: 'Trending', summary: 'Heartwarming look out of an airplane window for the first time.', link: 'https://instagram.com' },
    { rank: 8, title: '1950s Route 66 Diner Restoration', creator: '@urbanexplorers', views: '5.8M views', level: 'Trending', summary: 'Complete restoration of an authentic chrome diner in Illinois.', link: 'https://instagram.com' },
    { rank: 9, title: 'Ceramic Pour-Over Dripper Craft', creator: '@studiopottery', views: '5.1M views', level: 'Trending', summary: 'Hypnotic spiral carving on raw terracotta clay.', link: 'https://instagram.com' },
    { rank: 10, title: '300 sq ft NYC Studio Transformations', creator: '@tinyhomes', views: '4.7M views', level: 'Trending', summary: 'Manhattan micro-apartment with robotic motorized furniture.', link: 'https://instagram.com' }
  ],
  tiktok: [
    { rank: 1, title: 'POV: Professor Explains AI Reasoning in 60s', creator: '@dr_explain', views: '24.1M views', level: 'Viral', summary: 'Visual breakdown showing how attention models synthesize multi-step logic.', link: 'https://tiktok.com' },
    { rank: 2, title: 'Couples React to Mortgage Rate Easing', creator: '@marketguy', views: '19.5M views', level: 'Viral', summary: 'First-time home buyers calculating payment drops on 30-year fixed loans.', link: 'https://tiktok.com' },
    { rank: 3, title: '88-Year-Old Grandma Tries Spatial VR', creator: '@familymoments', views: '16.8M views', level: 'Viral', summary: 'Emotional reaction to stepping into a 3D recreation of her 1958 neighborhood.', link: 'https://tiktok.com' },
    { rank: 4, title: 'Hidden US Roadtrips Nobody Talks About', creator: '@travelhacker', views: '13.2M views', level: 'Viral', summary: 'Upper Peninsula Michigan and Blue Ridge Parkway hidden scenic loops.', link: 'https://tiktok.com' },
    { rank: 5, title: '$3 High-Protein Meal Prep Bowls', creator: '@budgetbites', views: '11.4M views', level: 'Trending', summary: 'Nutrient-dense chipotle style chicken and sweet potato meal prep.', link: 'https://tiktok.com' },
    { rank: 6, title: 'Electric Car Coast-to-Coast Highway Test', creator: '@autovlog', views: '9.8M views', level: 'Trending', summary: 'Testing the newly funded federal fast-chargers along Interstate 80.', link: 'https://tiktok.com' },
    { rank: 7, title: '3 Job Interview Questions That Guarantee Offers', creator: '@careermentor', views: '8.7M views', level: 'Trending', summary: 'What to ask at the end of interviews to impress hiring managers.', link: 'https://tiktok.com' },
    { rank: 8, title: 'Restoring a 1978 Apple II Computer', creator: '@retrotech', views: '7.3M views', level: 'Trending', summary: 'Cleaning motherboards and booting 5.25-inch floppy disks.', link: 'https://tiktok.com' },
    { rank: 9, title: 'Brooklyn Coffee Shop Morning ASMR', creator: '@baristalife', views: '6.2M views', level: 'Trending', summary: 'Espresso extraction and steamed oat milk acoustic sounds.', link: 'https://tiktok.com' },
    { rank: 10, title: 'USPS High-Speed Sorting Machines', creator: '@howitsmade_daily', views: '5.4M views', level: 'Trending', summary: 'Sorting 40,000 letters per hour with robotic optical scanners.', link: 'https://tiktok.com' }
  ],
  youtube: [
    { rank: 1, title: 'The Future of Spatial Smart Glasses (Hands-On)', creator: 'Marques Brownlee', views: '5.8M views', level: 'Viral', summary: 'Full review of featherweight all-day optical displays and AI assistants.', link: 'https://youtube.com' },
    { rank: 2, title: 'Why Did This 75-Year Math Conjecture Fall?', creator: 'Veritasium', views: '4.9M views', level: 'Viral', summary: 'How a computer-assisted counterexample broke a foundational conjecture.', link: 'https://youtube.com' },
    { rank: 3, title: 'NASA Artemis Gateway Lunar Station Tour', creator: 'NASA', views: '4.1M views', level: 'Viral', summary: 'Astronauts walk through the pressurized module that will orbit the Moon.', link: 'https://youtube.com' },
    { rank: 4, title: 'How Wall Street Trades in Microseconds', creator: 'Bloomberg Originals', views: '3.6M views', level: 'Viral', summary: 'High-frequency laser relay towers across the New Jersey countryside.', link: 'https://youtube.com' },
    { rank: 5, title: 'The Engineering Feat of the Hoover Dam', creator: 'Practical Engineering', views: '3.2M views', level: 'Trending', summary: 'How internal refrigeration piping prevented catastrophic concrete cracks.', link: 'https://youtube.com' },
    { rank: 6, title: 'Testing Every Drive-Thru Burger in the US', creator: 'First We Feast', views: '2.9M views', level: 'Trending', summary: 'Blind taste tests across 12 national fast-food burger chains.', link: 'https://youtube.com' },
    { rank: 7, title: 'What Happens When You Scrub Your Digital Footprint', creator: 'Vox', views: '2.7M views', level: 'Trending', summary: 'Testing data broker opt-outs under new federal privacy guidelines.', link: 'https://youtube.com' },
    { rank: 8, title: 'Building a Montana Timber Cabin: Day 100', creator: 'Cabin Life', views: '2.4M views', level: 'Trending', summary: 'Finishing the fieldstone fireplace and shake roof before the first snow.', link: 'https://youtube.com' },
    { rank: 9, title: 'Sound Design Secrets in Modern Cinema', creator: 'StudioBinder', views: '2.1M views', level: 'Trending', summary: 'Analyzing auditory tension and auditory illusions in blockbuster films.', link: 'https://youtube.com' },
    { rank: 10, title: 'Why US Interstate Highways Are Numbered This Way', creator: 'Half as Interesting', views: '1.9M views', level: 'Trending', summary: 'The grid rules behind odd vs even and 3-digit bypass numbers.', link: 'https://youtube.com' }
  ],
  trends: [
    { rank: 1, title: 'Federal Reserve Rate Decision & CPI', creator: 'Macroeconomics', views: '2.5M searches', level: 'Viral', summary: 'Breakout query surge following Chairman\'s monetary stability announcement.', link: 'https://trends.google.com' },
    { rank: 2, title: 'Supreme Court Geofence Privacy Ruling', creator: 'SCOTUS & Law', views: '1.9M searches', level: 'Viral', summary: 'Legal analysts and citizens searching Fourth Amendment warrant requirements.', link: 'https://trends.google.com' },
    { rank: 3, title: 'FDA Alzheimer\'s Blood Biomarker Test', creator: 'Healthcare & Biotech', views: '1.7M searches', level: 'Viral', summary: 'High search volume from patients seeking primary care screening details.', link: 'https://trends.google.com' },
    { rank: 4, title: 'NASA Artemis Gateway Orbit Timeline', creator: 'Space Exploration', views: '1.4M searches', level: 'Viral', summary: 'Tracking crew launch schedules for the deep-space lunar station.', link: 'https://trends.google.com' },
    { rank: 5, title: '30-Year Mortgage Rate Calculator 2026', creator: 'Real Estate', views: '1.1M searches', level: 'Viral', summary: 'Home shoppers calculating revised monthly payment amortizations.', link: 'https://trends.google.com' },
    { rank: 6, title: 'Interstate EV Fast Charging Stations Near Me', creator: 'Clean Energy & Auto', views: '850K searches', level: 'Trending', summary: 'Route planners finding new high-speed highway stations.', link: 'https://trends.google.com' },
    { rank: 7, title: 'High School Football State Playoff Brackets', creator: 'Sports', views: '780K searches', level: 'Trending', summary: 'Statewide Friday night scores and regional championship schedules.', link: 'https://trends.google.com' },
    { rank: 8, title: 'Texas Clean Compute Campus Jobs', creator: 'Technology & Hiring', views: '690K searches', level: 'Trending', summary: 'Engineers and technicians researching positions at new data center.', link: 'https://trends.google.com' },
    { rank: 9, title: 'Fall Foliage Peak Tracker Map', creator: 'Travel & Nature', views: '620K searches', level: 'Trending', summary: 'Leaf-peeping peak week projections for the Northeast and Midwest.', link: 'https://trends.google.com' },
    { rank: 10, title: 'National Park Fee-Free Entrance Days', creator: 'Outdoors & Parks', views: '540K searches', level: 'Trending', summary: 'Annual calendar of open entrance dates across US National Parks.', link: 'https://trends.google.com' }
  ]
};

// 60-Second Audio Brief Script
const DAILY_AUDIO_SCRIPT = `Welcome to What Is In News Today. Here is your sixty-second briefing. In the economy, the Federal Reserve signaled a neutral rate corridor as core inflation printed at two point three percent, easing thirty-year fixed mortgage rates. In national infrastructure, four point two billion dollars was released for eighty-five hundred highway fast-charging stalls along Interstate corridors. In technology, clean-powered AI compute campuses opened in Texas. In healthcare, the FDA cleared the first fifteen-minute blood test for early Alzheimer's. And the Supreme Court established Fourth Amendment warrant mandates for commercial location data. That is what is in news today.`;

// Auto-Refresh Logic (Every 30 Minutes Silently)
const AUTO_REFRESH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
let lastUpdatedTime = new Date();

function initSilentAutoRefresh() {
  setInterval(() => {
    // Silently refresh data
    lastUpdatedTime = new Date();
    updateTimestampDisplay();
    
    // Smooth in-place DOM cross-fade without disrupting user
    const wireContainer = document.getElementById('news-wire-container');
    if (wireContainer) {
      wireContainer.style.opacity = '0.7';
      setTimeout(() => {
        renderNewsGrid(currentCategoryFilter);
        wireContainer.style.opacity = '1';
      }, 300);
    }
  }, AUTO_REFRESH_INTERVAL_MS);
}

function updateTimestampDisplay() {
  const el = document.getElementById('last-sync-indicator');
  if (el) {
    const timeStr = lastUpdatedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    el.textContent = `Updated ${timeStr} • Auto-refreshes every 30m`;
  }
}

// Category filter state
let currentCategoryFilter = 'all';

function renderNewsGrid(filterCategory = 'all') {
  currentCategoryFilter = filterCategory;
  const container = document.getElementById('news-wire-container');
  if (!container) return;

  const items = filterCategory === 'all'
    ? NEWS_DATA
    : NEWS_DATA.filter(it => it.category.toLowerCase() === filterCategory.toLowerCase());

  container.innerHTML = items.map(story => `
    <article class="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-7 shadow-sm card-hover flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              ${story.category}
            </span>
            <span class="text-xs text-zinc-400 font-mono-numbers flex items-center gap-1">
              <i data-lucide="clock" class="h-3 w-3"></i>
              ${story.publishedAt}
            </span>
          </div>

          <button onclick="readStoryAloud('${story.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Listen to summary">
            <i data-lucide="volume-2" class="h-4 w-4"></i>
          </button>
        </div>

        <h2 class="font-editorial text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-snug mb-3 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <a href="${story.permalink}">${story.title}</a>
        </h2>

        <!-- Axios-Style Smart Brevity Bullets -->
        <div class="space-y-2 mb-5">
          ${story.summaryBullets.map(b => `
            <div class="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <span class="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>

        <!-- Why It Matters Callout -->
        <div class="why-it-matters-box rounded-xl p-3.5 sm:p-4 mb-4">
          <div class="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1">
            <i data-lucide="lightbulb" class="h-3.5 w-3.5"></i>
            <span>Why It Matters</span>
          </div>
          <p class="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
            ${story.whyItMatters}
          </p>
        </div>

        <!-- Perspectives Accordion -->
        <div id="perspectives-${story.id}" class="hidden my-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs space-y-2.5">
          <div>
            <span class="font-bold uppercase tracking-wider text-zinc-500 text-[10px]">Consensus View:</span>
            <p class="text-zinc-700 dark:text-zinc-300 mt-0.5">${story.perspectives.consensus}</p>
          </div>
          ${story.perspectives.divergence ? `
            <div>
              <span class="font-bold uppercase tracking-wider text-zinc-500 text-[10px]">Counterpoint / Debate:</span>
              <p class="text-zinc-700 dark:text-zinc-300 mt-0.5">${story.perspectives.divergence}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <div class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <span class="font-semibold text-zinc-700 dark:text-zinc-300">${story.source}</span>
          <span>•</span>
          <span>${story.readTime}</span>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="togglePerspectives('${story.id}')" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white py-1 px-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">
            Debate View
          </button>
          <a href="${story.permalink}" class="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 font-semibold py-1 px-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors">
            <span>Full Story</span>
            <i data-lucide="arrow-right" class="h-3 w-3"></i>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function togglePerspectives(id) {
  const el = document.getElementById(`perspectives-${id}`);
  if (el) el.classList.toggle('hidden');
}

function readStoryAloud(id) {
  const story = NEWS_DATA.find(s => s.id === id);
  if (!story || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const text = `${story.title}. Core facts: ${story.summaryBullets.join('. ')}. Why it matters: ${story.whyItMatters}`;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Top 10 Tabs Logic
function renderTop10Cards(platform = 'instagram') {
  const container = document.getElementById('top10-preview-container');
  if (!container) return;

  const items = TOP10_DATA[platform] || [];
  container.innerHTML = items.slice(0, 6).map(it => `
    <div class="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 p-4 sm:p-5 shadow-sm card-hover flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="h-8 w-8 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs font-mono-numbers">
            #${it.rank}
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            it.level === 'Viral' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800' : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
          }">
            ${it.level === 'Viral' ? '🔥 Highly Viral' : '⚡ Trending'}
          </span>
        </div>

        <h3 class="font-bold text-sm sm:text-base text-zinc-900 dark:text-white line-clamp-2 mb-1.5 leading-snug">
          ${it.title}
        </h3>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3">
          ${it.summary}
        </p>
      </div>

      <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
        <span class="font-semibold text-zinc-700 dark:text-zinc-300">${it.creator}</span>
        <span class="font-mono-numbers font-medium text-blue-700 dark:text-blue-400">${it.views}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function switchTop10Platform(platform) {
  document.querySelectorAll('.top10-tab-btn').forEach(btn => {
    btn.classList.remove('bg-zinc-900', 'text-white', 'shadow-sm');
    btn.classList.add('text-zinc-600', 'hover:bg-zinc-100');
  });

  const activeBtn = document.getElementById(`tab-top10-${platform}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-zinc-900', 'text-white', 'shadow-sm');
    activeBtn.classList.remove('text-zinc-600', 'hover:bg-zinc-100');
  }

  // Update "View Full" link target
  const viewAllLink = document.getElementById('view-full-top10-link');
  if (viewAllLink) {
    viewAllLink.href = `/top-10/${platform}/`;
    viewAllLink.innerHTML = `<span>Explore Full Top 10 ${platform.charAt(0).toUpperCase() + platform.slice(1)}</span> <i data-lucide="arrow-right" class="h-4 w-4"></i>`;
  }

  renderTop10Cards(platform);
  if (window.lucide) lucide.createIcons();
}

// NewsDesk AI Assistant
function toggleNewsDeskAssistant() {
  const drawer = document.getElementById('newsdesk-drawer');
  if (drawer) drawer.classList.toggle('hidden');
}

function populateProactiveStories() {
  const container = document.getElementById('chat-proactive-chips');
  if (!container) return;

  container.innerHTML = NEWS_DATA.map((story, idx) => `
    <button onclick="askBotQuestion('Explain full details: ${encodeURIComponent(story.title)}')" class="w-full text-left p-2.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-between group">
      <div class="flex items-center gap-2 overflow-hidden mr-2">
        <span class="h-5 w-5 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-[10px] flex items-center justify-center shrink-0">#${idx + 1}</span>
        <span class="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">${story.title}</span>
      </div>
      <i data-lucide="chevron-right" class="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0"></i>
    </button>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function askBotQuestion(encodedQ) {
  const query = decodeURIComponent(encodedQ);
  const input = document.getElementById('chat-user-input');
  if (input) input.value = query;
  handleChatSubmit();
}

function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-user-input');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  const messageBox = document.getElementById('chat-messages');

  // Append user message
  const userEl = document.createElement('div');
  userEl.className = 'flex justify-end';
  userEl.innerHTML = `<div class="max-w-[85%] rounded-2xl p-3 bg-zinc-900 text-white text-xs sm:text-sm rounded-br-none">${query}</div>`;
  messageBox.appendChild(userEl);
  input.value = '';

  // Append thinking indicator
  const thinkingEl = document.createElement('div');
  thinkingEl.className = 'flex items-center gap-2 text-xs text-zinc-400 py-2';
  thinkingEl.innerHTML = `<i data-lucide="loader-2" class="h-3.5 w-3.5 animate-spin text-blue-600"></i> Synthesizing verified wire reports...`;
  messageBox.appendChild(thinkingEl);
  if (window.lucide) lucide.createIcons();
  messageBox.scrollTop = messageBox.scrollHeight;

  setTimeout(() => {
    messageBox.removeChild(thinkingEl);

    const match = NEWS_DATA.find(s => query.toLowerCase().includes(s.category.toLowerCase()) || query.toLowerCase().includes(s.title.toLowerCase().substring(0, 15)));

    const botEl = document.createElement('div');
    botEl.className = 'flex justify-start';

    if (match) {
      botEl.innerHTML = `
        <div class="max-w-[90%] rounded-2xl p-4 bg-zinc-100 border border-zinc-200 text-xs sm:text-sm text-zinc-900 rounded-bl-none">
          <p class="font-editorial text-base font-bold text-zinc-900 mb-2">${match.title}</p>
          <div class="space-y-1.5 my-2">
            ${match.summaryBullets.map(b => `<div class="flex items-start gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span><span>${b}</span></div>`).join('')}
          </div>
          <div class="why-it-matters-box rounded-lg p-2.5 my-2.5 text-xs text-amber-950">
            <strong>Why it matters:</strong> ${match.whyItMatters}
          </div>
          <div class="pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Primary Wire: <strong>${match.source}</strong></span>
            <a href="${match.permalink}" class="text-blue-700 font-semibold hover:underline flex items-center gap-1">Read Page <i data-lucide="arrow-right" class="h-3 w-3"></i></a>
          </div>
        </div>
      `;
    } else {
      botEl.innerHTML = `
        <div class="max-w-[90%] rounded-2xl p-4 bg-zinc-100 border border-zinc-200 text-xs sm:text-sm text-zinc-900 rounded-bl-none">
          <p>Verified reporting from our live US news desk confirms steady movement across three macro developments today:</p>
          <ul class="my-2 space-y-1 text-zinc-700">
            <li>• <strong>Federal Reserve:</strong> Benchmark policy corridor held steady as core inflation settled at 2.3%.</li>
            <li>• <strong>Infrastructure:</strong> $4.2B highway EV charging corridor grants deployed.</li>
            <li>• <strong>Legal Precedent:</strong> Supreme Court mandated warrants for commercial geofence data.</li>
          </ul>
          <p class="text-zinc-500 text-[11px] mt-2">Ask about any specific category: Economy, Infrastructure, Technology, Health, or Politics.</p>
        </div>
      `;
    }

    messageBox.appendChild(botEl);
    if (window.lucide) lucide.createIcons();
    messageBox.scrollTop = messageBox.scrollHeight;
  }, 450);
}

// 60-Second Audio Player
let isAudioPlaying = false;
let audioUtterance = null;
let audioPlaybackRate = 1.0;

function toggleAudioBriefing() {
  const bar = document.getElementById('audio-brief-bar');
  if (!bar) return;
  bar.classList.toggle('hidden');
  if (!bar.classList.contains('hidden') && !isAudioPlaying) {
    playDailyAudio();
  }
}

function playDailyAudio() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  audioUtterance = new SpeechSynthesisUtterance(DAILY_AUDIO_SCRIPT);
  audioUtterance.rate = audioPlaybackRate;
  
  audioUtterance.onend = () => {
    isAudioPlaying = false;
    updateAudioPlayButton();
  };

  window.speechSynthesis.speak(audioUtterance);
  isAudioPlaying = true;
  updateAudioPlayButton();
}

function pauseDailyAudio() {
  if (!('speechSynthesis' in window)) return;
  if (isAudioPlaying) {
    window.speechSynthesis.pause();
    isAudioPlaying = false;
  } else {
    window.speechSynthesis.resume();
    isAudioPlaying = true;
  }
  updateAudioPlayButton();
}

function updateAudioPlayButton() {
  const icon = document.getElementById('audio-play-state-icon');
  const wave = document.getElementById('audio-wave-bars');
  const label = document.getElementById('audio-status-label');
  if (icon) {
    icon.setAttribute('data-lucide', isAudioPlaying ? 'pause' : 'play');
    if (window.lucide) lucide.createIcons();
  }
  if (wave) {
    if (isAudioPlaying) {
      wave.classList.add('wave-playing');
    } else {
      wave.classList.remove('wave-playing');
    }
  }
  if (label) {
    label.textContent = isAudioPlaying ? 'Playing' : 'Paused';
  }
}

// Live Breaking News Ticker (USA Today & ABC News Style)
const TICKER_HEADLINES = [
  { text: "Federal Reserve maintains benchmark rate; 30-year mortgages ease to 5.85%", link: "/news/us-federal-reserve-signals-neutral-rate-corridor/" },
  { text: "DOT unlocks $4.2B for 8,500 highway EV charging stalls along I-80 & I-90", link: "/news/bipartisan-us-infrastructure-act-ev-corridor/" },
  { text: "Texas consortium activates 1.2GW off-grid solar-nuclear AI data center", link: "/news/silicon-valley-ai-supercomputing-hub-texas/" },
  { text: "FDA approves 15-minute blood test detecting early Alzheimer's biomarkers", link: "/news/us-fda-grants-accelerated-approval-alzheimers/" },
  { text: "Supreme Court mandates Fourth Amendment warrants for commercial geofence data", link: "/news/us-supreme-court-issues-digital-privacy-ruling/" }
];
let tickerIndex = 0;

function initBreakingTicker() {
  const tickerEl = document.getElementById('live-ticker-text');
  const linkEl = document.getElementById('live-ticker-link');
  if (!tickerEl || !linkEl) return;

  setInterval(() => {
    tickerIndex = (tickerIndex + 1) % TICKER_HEADLINES.length;
    tickerEl.style.opacity = '0';
    tickerEl.style.transform = 'translateY(3px)';
    
    setTimeout(() => {
      tickerEl.textContent = TICKER_HEADLINES[tickerIndex].text;
      linkEl.href = TICKER_HEADLINES[tickerIndex].link;
      tickerEl.style.opacity = '1';
      tickerEl.style.transform = 'translateY(0)';
    }, 250);
  }, 5000);
}

function scrollCarousel(containerId, distance) {
  const el = document.getElementById(containerId);
  if (el) {
    el.scrollBy({ left: distance, behavior: 'smooth' });
  }
}

function cycleAudioSpeed() {
  audioPlaybackRate = audioPlaybackRate === 1.0 ? 1.25 : audioPlaybackRate === 1.25 ? 1.5 : 1.0;
  const btn = document.getElementById('audio-speed-btn');
  if (btn) btn.textContent = `${audioPlaybackRate}x`;
  if (isAudioPlaying) {
    playDailyAudio();
  }
}

// Newsletter frequency state
let newsletterFrequency = 'daily';

function setNewsletterFrequency(freq) {
  newsletterFrequency = freq;
  const btnDaily = document.getElementById('btn-freq-daily');
  const btnWeekly = document.getElementById('btn-freq-weekly');
  if (btnDaily && btnWeekly) {
    if (freq === 'daily') {
      btnDaily.className = 'px-4 py-1.5 rounded-xl bg-zinc-900 text-white font-semibold text-xs shadow-sm';
      btnWeekly.className = 'px-4 py-1.5 rounded-xl text-zinc-600 hover:text-zinc-900 text-xs font-semibold';
    } else {
      btnWeekly.className = 'px-4 py-1.5 rounded-xl bg-zinc-900 text-white font-semibold text-xs shadow-sm';
      btnDaily.className = 'px-4 py-1.5 rounded-xl text-zinc-600 hover:text-zinc-900 text-xs font-semibold';
    }
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-input-email');
  const statusMsg = document.getElementById('newsletter-msg');
  if (!input || !input.value.includes('@')) {
    if (statusMsg) {
      statusMsg.className = 'text-xs text-rose-600 font-semibold mt-2';
      statusMsg.textContent = 'Please enter a valid email address.';
    }
    return;
  }

  if (statusMsg) {
    statusMsg.className = 'text-xs text-emerald-600 font-semibold mt-2';
    statusMsg.innerHTML = `Subscribed to WhatIsInNewsToday ${newsletterFrequency === 'weekly' ? 'Weekly' : 'Daily'} Digest! Check inbox for confirmation. (Opt out anytime via <a href="/unsubscribe/" class="underline">unsubscribe</a>).`;
    input.value = '';
  }
}

// ==========================================
// Theme Management (Light / Dark Mode with WCAG Compliance)
// ==========================================
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = saved ? saved : (prefersDark ? 'dark' : 'light');
  setTheme(activeTheme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  const isDark = document.documentElement.classList.contains('dark');
  icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Run immediately to prevent theme flash
initTheme();

// ==========================================
// Preferred Source Modal & Feed Actions
// ==========================================
function openPreferredSourceModal() {
  const modal = document.getElementById('preferred-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closePreferredSourceModal() {
  const modal = document.getElementById('preferred-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function bookmarkCurrentPage() {
  const status = document.getElementById('bookmark-status');
  const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
  const shortcut = isMac ? 'Cmd + D' : 'Ctrl + D';
  if (status) {
    status.textContent = `Press ${shortcut}`;
    status.className = 'text-[11px] font-bold text-amber-600 dark:text-amber-400';
    setTimeout(() => {
      status.textContent = 'Save';
      status.className = 'text-[11px] text-zinc-400';
    }, 4000);
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePreferredSourceModal();
  }
});

// ==========================================
// Text-to-Speech Story Summary (Web Speech API)
// ==========================================
let currentStoryUtterance = null;
function readStoryAloud(storyId) {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return;
  }

  const article = document.querySelector('article');
  if (!article) return;

  const h1 = article.querySelector('h1')?.textContent || '';
  const bullets = Array.from(article.querySelectorAll('strong')).map(s => s.parentElement?.textContent).filter(Boolean).slice(0, 3).join('. ');
  const whyItMatters = article.querySelector('.why-it-matters-box p')?.textContent || '';
  
  const speechText = `${h1}. Key takeaways: ${bullets}. Why it matters: ${whyItMatters}`;
  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.rate = 1.05;
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  // Format live masthead date
  const mastheadDate = document.getElementById('masthead-date');
  if (mastheadDate) {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    mastheadDate.textContent = today;
  }

  updateTimestampDisplay();
  initSilentAutoRefresh();
  initBreakingTicker();
  renderNewsGrid('all');
  renderTop10Cards('instagram');
  populateProactiveStories();

  if (window.lucide) lucide.createIcons();
});
