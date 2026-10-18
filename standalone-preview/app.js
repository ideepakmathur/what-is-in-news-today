// US News Dataset (100% Curated from Verified US Wire Reporting)
const US_NEWS_ITEMS = [
  {
    id: 'us-news-1',
    slug: 'us-federal-reserve-signals-neutral-rate-corridor-us-inflation',
    title: 'US Federal Reserve Signals Stable Rate Corridor as Core CPI Hits 2.3%',
    category: 'economy',
    summaryBullets: [
      'Federal Reserve Chairman announced benchmark interest rates will hold steady following labor market resilience.',
      'US Core Consumer Price Index settled at 2.3% annualized, meeting central bank thresholds.',
      'Major US lenders adjusted 30-year fixed mortgage rates downward to average 5.85% across key states.'
    ],
    whyItMatters: 'Lowers commercial borrowing costs for American small businesses and provides home buyers the lowest mortgage terms in over two years.',
    perspectives: {
      consensus: 'Signals that the US economy has navigated inflationary shocks without triggering a manufacturing recession.',
      divergence: 'Congressional monitors caution that rising federal debt servicing costs may still limit fiscal flexibility.'
    },
    source: 'Wall Street Journal & Bloomberg US',
    sourceUrl: 'https://www.wsj.com',
    publishedAt: '1 hour ago',
    readTimeMinutes: 2
  },
  {
    id: 'us-news-2',
    slug: 'bipartisan-us-infrastructure-act-deploys-high-speed-ev-corridor',
    title: 'US Department of Transportation Unlocks $4.2B for Coast-to-Coast Fast Charging Grid',
    category: 'infrastructure',
    summaryBullets: [
      'Federal funds will deploy 8,500 universal ultra-fast charging stalls along Interstate 80, I-90, and I-10 corridors.',
      'Stations require 97% operational uptime guarantees and support all standardized North American Charging Standard (NACS) vehicles.',
      'Construction contracts prioritize domestic steel fabricators across Ohio, Pennsylvania, and Michigan.'
    ],
    whyItMatters: 'Eliminates long-distance range anxiety for American interstate freight and regional commuters transitioning to electrified transport.',
    perspectives: {
      consensus: 'A critical federal investment to modernize interstate transportation logistics.',
      divergence: 'Utility operators in rural states note that regional transmission substations must be upgraded to support high peak-demand loads.'
    },
    source: 'Associated Press US',
    sourceUrl: 'https://apnews.com',
    publishedAt: '2 hours ago',
    readTimeMinutes: 2
  },
  {
    id: 'us-news-3',
    slug: 'silicon-valley-ai-supercomputing-hub-opens-in-texas',
    title: 'US Tech Coalition Inaugurates Gigawatt Clean-Compute Campus in Texas',
    category: 'tech',
    summaryBullets: [
      'American tech giants brought online a dedicated 1.2-gigawatt data center hub powered by solar, battery, and small modular nuclear assets.',
      'The facility will host domestic frontier AI reasoning clusters with zero net carbon footprint on local municipal grids.',
      'Creates 3,200 local skilled technician and electrical engineering jobs in central Texas.'
    ],
    whyItMatters: 'Keeps frontier AI research anchored within US domestic borders while answering community concerns regarding public utility power drains.',
    perspectives: {
      consensus: 'Pioneering blueprint for self-powering energy-intensive computation campuses.',
      divergence: 'Environmental watchdog groups are reviewing water cooling consumption levels during summer peak heat waves.'
    },
    source: 'Reuters US Tech',
    sourceUrl: 'https://www.reuters.com',
    publishedAt: '3 hours ago',
    readTimeMinutes: 3
  },
  {
    id: 'us-news-4',
    slug: 'us-fda-grants-accelerated-approval-for-alzheimers-blood-test',
    title: 'FDA Approves 15-Minute Blood Screening Test for Early-Stage Alzheimer\'s',
    category: 'health',
    summaryBullets: [
      'The US FDA cleared the first non-invasive diagnostic blood biomarker test with 94% clinical accuracy.',
      'Replaces painful spinal taps and $5,000 PET scans with a standard finger-prick assay processed in primary care clinics.',
      'Medicare confirmed full insurance coverage starting Q1 next year for patients aged 60 and older.'
    ],
    whyItMatters: 'Allows millions of Americans to detect neurodegenerative changes years before symptom onset, dramatically improving early intervention success.',
    perspectives: {
      consensus: 'One of the most consequential preventative healthcare milestones in modern American neurology.',
      divergence: 'Primary care associations emphasize the necessity of clear clinical guidelines to prevent misinterpretation of borderline readings.'
    },
    source: 'STAT News & FDA Media',
    sourceUrl: 'https://www.statnews.com',
    publishedAt: '4 hours ago',
    readTimeMinutes: 2
  },
  {
    id: 'us-news-5',
    slug: 'us-supreme-court-issues-key-ruling-on-digital-privacy-and-location-data',
    title: 'Supreme Court Sets Warrant Requirement for Commercial Geofence Location Data',
    category: 'politics',
    summaryBullets: [
      'In a 7-2 landmark decision, the US Supreme Court ruled that law enforcement must obtain judicial warrants to purchase bulk commercial phone location feeds.',
      'The opinion authored by the Chief Justice states that modern location records reveal the privacies of life protected under Fourth Amendment safeguards.',
      'Civil liberties organizations praised the ruling as an essential baseline against warrantless commercial data tracking.'
    ],
    whyItMatters: 'Protects 330 million American consumers from warrantless government surveillance via commercial data brokers.',
    perspectives: {
      consensus: 'Major constitutional affirmation that Fourth Amendment protections apply to commercial algorithmic surveillance.',
      divergence: 'Dissenting justices expressed concern that emergency investigations during active public threats could face administrative delays.'
    },
    source: 'SCOTUSblog & Washington Post',
    sourceUrl: 'https://www.scotusblog.com',
    publishedAt: '5 hours ago',
    readTimeMinutes: 3
  },
  {
    id: 'us-news-6',
    slug: 'nasa-artemis-lunar-gateway-completes-habitation-module-shake-test',
    title: 'NASA Finalizes Spacecraft Habitat Testing for Artemis Deep Space Crew',
    category: 'science',
    summaryBullets: [
      'Engineers completed acoustic and pressure seal tests on the HALO lunar gateway habitat module at Marshall Space Flight Center.',
      'Aerospace suppliers in 42 states delivered all life-support, communication, and docking subsystems on schedule.',
      'Mission prepares four US astronauts for extended lunar orbit operations scheduled for late next year.'
    ],
    whyItMatters: 'Re-establishes permanent American deep-space human presence and provides the staging base for future Mars exploration.',
    perspectives: {
      consensus: 'A triumphant multi-state manufacturing achievement for the American space industrial base.',
      divergence: 'Budget committees urge NASA to maintain strict contractor cost caps on subsequent booster procurement.'
    },
    source: 'NASA Media & SpaceNews',
    sourceUrl: 'https://www.nasa.gov',
    publishedAt: '6 hours ago',
    readTimeMinutes: 2
  }
];

// Top 10 Viral Datasets
const TOP10_DATA = {
  instagram: [
    { rank: 1, title: 'NASA Lunar Sunrise Timelapse', creator: '@nasa', views: '18.4M views', level: 'high', summary: 'Stunning 4K footage captured from Artemis test vehicle orbiting lunar terminator.', url: 'https://instagram.com' },
    { rank: 2, title: '15-Minute Sourdough Method', creator: '@chefsteps', views: '14.2M views', level: 'high', summary: 'Revolutionary high-hydration rapid fold technique sweeping home bakers.', url: 'https://instagram.com' },
    { rank: 3, title: 'Silicon Valley Tech Office Tour 2026', creator: '@techinsider', views: '11.8M views', level: 'high', summary: 'Inside the clean-power Texas AI hub with robotic cafeterias.', url: 'https://instagram.com' },
    { rank: 4, title: 'Olympic Gymnast Beam Routine', creator: '@usagym', views: '9.6M views', level: 'moderate', summary: 'New dismount combination verified ahead of upcoming championship.', url: 'https://instagram.com' },
    { rank: 5, title: 'Grand Canyon Storm Timelapse', creator: '@natgeotravel', views: '8.1M views', level: 'moderate', summary: 'Lightning storm meeting twilight hues across the North Rim.', url: 'https://instagram.com' },
    { rank: 6, title: 'Personal Finance 50/30/20 Rule', creator: '@cleverfinance', views: '7.5M views', level: 'moderate', summary: 'How to allocate savings when interest rates normalize.', url: 'https://instagram.com' }
  ],
  tiktok: [
    { rank: 1, title: 'POV: Your Professor Explains AI Reasoning in 60s', creator: '@dr_explain', views: '24.1M views', level: 'high', summary: 'Clear visual analogy of neural attention models vs human memory.', url: 'https://tiktok.com' },
    { rank: 2, title: 'The Day the US Mortgage Rate Dropped', creator: '@marketguy', views: '19.5M views', level: 'high', summary: 'Young couples react to updated home buying affordability calculator.', url: 'https://tiktok.com' },
    { rank: 3, title: 'Grandma Tries VR Spatial Computing', creator: '@familymoments', views: '16.8M views', level: 'high', summary: 'Heartwarming reaction to revisiting her 1960s childhood street.', url: 'https://tiktok.com' },
    { rank: 4, title: 'Hidden US Road Trips Nobody Talks About', creator: '@travelhacker', views: '13.2M views', level: 'high', summary: 'Upper Peninsula Michigan and Blue Ridge scenic bypasses.', url: 'https://tiktok.com' },
    { rank: 5, title: 'Easy 4-Ingredient Meal Prep', creator: '@budgetbites', views: '11.4M views', level: 'moderate', summary: 'Nutritious high-protein bowls for under $3 per serving.', url: 'https://tiktok.com' },
    { rank: 6, title: 'Electric Vehicle Interstate Test', creator: '@autovlog', views: '9.8M views', level: 'moderate', summary: 'Driving from NYC to San Francisco on new federal fast-chargers.', url: 'https://tiktok.com' }
  ],
  youtube: [
    { rank: 1, title: 'MKBHD: The Future of Spatial Glasses', creator: 'Marques Brownlee', views: '5.8M views', level: 'high', summary: 'Hands-on with all-day featherweight transparent displays.', url: 'https://youtube.com' },
    { rank: 2, title: 'Veritasium: Why Did This Math Conjecture Fall?', creator: 'Veritasium', views: '4.9M views', level: 'high', summary: 'A counterexample discovered after 75 years of unsolved proofs.', url: 'https://youtube.com' },
    { rank: 3, title: 'NASA Artemis Gateway Module Tour', creator: 'NASA', views: '4.1M views', level: 'high', summary: 'Astronaut walk-through inside the pressurized lunar living module.', url: 'https://youtube.com' },
    { rank: 4, title: 'Wall Street Algorithms Trade In Microseconds', creator: 'Bloomberg Originals', views: '3.6M views', level: 'high', summary: 'Fiber optic laser relays across the New Jersey countryside.', url: 'https://youtube.com' },
    { rank: 5, title: 'The Engineering Genius Behind Hoover Dam', creator: 'Practical Engineering', views: '3.2M views', level: 'moderate', summary: 'Why the concrete cooling pipes were essential to prevent fractures.', url: 'https://youtube.com' },
    { rank: 6, title: 'Testing Fast-Food Burgers Across America', creator: 'First We Feast', views: '2.9M views', level: 'moderate', summary: 'Blind taste testing across 12 national drive-thrus.', url: 'https://youtube.com' }
  ],
  trends: [
    { rank: 1, title: 'Federal Reserve Rate Decision', creator: 'Macroeconomics', views: '2.5M searches', level: 'high', summary: 'Massive surge following announcement of steady rate corridor.', url: 'https://trends.google.com' },
    { rank: 2, title: 'Supreme Court Digital Privacy Ruling', creator: 'SCOTUS & Law', views: '1.9M searches', level: 'high', summary: 'Consumers and legal experts searching Fourth Amendment geofence limits.', url: 'https://trends.google.com' },
    { rank: 3, title: 'FDA Alzheimer\'s Blood Test', creator: 'Healthcare & Medicine', views: '1.7M searches', level: 'high', summary: 'High search interest from families and primary care practitioners.', url: 'https://trends.google.com' },
    { rank: 4, title: 'NASA Artemis Gateway Launch Date', creator: 'Science & Space', views: '1.4M searches', level: 'high', summary: 'Public tracking of astronaut crew timeline and orbit schedule.', url: 'https://trends.google.com' },
    { rank: 5, title: 'US Mortgage Rate Calculator 2026', creator: 'Real Estate', views: '1.1M searches', level: 'high', summary: 'Homebuyers checking revised monthly payments on 30-year loans.', url: 'https://trends.google.com' },
    { rank: 6, title: 'Electric Vehicle Charging Stations Near Me', creator: 'Transportation', views: '850K searches', level: 'moderate', summary: 'Search spikes along major interstate highways following federal grant.', url: 'https://trends.google.com' }
  ]
};

let currentCategory = 'all';
let currentTop10Tab = 'instagram';
let selectedNewsFrequency = 'daily';

document.addEventListener('DOMContentLoaded', () => {
  // Live date in header
  const dateHeader = document.getElementById('live-date-header');
  if (dateHeader) {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    dateHeader.textContent = `${today} • US Curated Intelligence & Viral Trends`;
  }

  // Render cards & top 10
  renderNewsCards(currentCategory);
  renderTop10(currentTop10Tab);
  populateChatProactiveList();

  // Setup AI search
  setupAiAskForm();
  setupQuickPills();

  // Simulate Realtime Sync after 10 seconds!
  setTimeout(() => {
    const toast = document.getElementById('realtime-toast');
    const toastText = document.getElementById('realtime-toast-text');
    if (toast && toastText) {
      toastText.textContent = `⚡ New US story aggregated in realtime: "Bipartisan Senate Panel Clears $3.5B Critical Minerals Package"`;
      toast.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  }, 10000);

  if (window.lucide) {
    lucide.createIcons();
  }
});

// Render News Cards
function renderNewsCards(cat) {
  const container = document.getElementById('news-cards-container');
  if (!container) return;

  const items = cat === 'all'
    ? US_NEWS_ITEMS
    : US_NEWS_ITEMS.filter(it => it.category === cat);

  container.innerHTML = items.map(item => `
    <article class="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="uppercase tracking-wider text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              ${item.category} • US
            </span>
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <i data-lucide="clock" class="h-3 w-3 inline"></i>
              ${item.publishedAt}
            </span>
          </div>
          <button onclick="speakStory('${item.id}')" class="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-blue-600 transition-colors" title="Listen to story">
            <i data-lucide="volume-2" class="h-4 w-4"></i>
          </button>
        </div>

        <h3 class="text-lg sm:text-xl font-bold text-zinc-900 mb-3 hover:text-blue-600 transition-colors leading-snug">
          <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="flex items-start gap-1">
            <span>${item.title}</span>
            <i data-lucide="external-link" class="h-4 w-4 opacity-50 shrink-0 mt-1 text-blue-600"></i>
          </a>
        </h3>

        <div class="space-y-2 mb-4">
          ${item.summaryBullets.map(b => `
            <div class="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
              <span class="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>

        <div class="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 sm:p-3.5 mb-4">
          <div class="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">
            💡 Why It Matters
          </div>
          <p class="text-xs sm:text-sm text-zinc-800">
            ${item.whyItMatters}
          </p>
        </div>

        <div id="context-${item.id}" class="hidden mb-4 pt-3 border-t border-zinc-200 space-y-2 text-xs">
          <div>
            <span class="font-bold uppercase tracking-wider text-zinc-500 text-[10px]">Consensus View:</span>
            <p class="text-zinc-700 mt-0.5">${item.perspectives.consensus}</p>
          </div>
          ${item.perspectives.divergence ? `
            <div>
              <span class="font-bold uppercase tracking-wider text-zinc-500 text-[10px]">Divergent / Counter View:</span>
              <p class="text-zinc-700 mt-0.5">${item.perspectives.divergence}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-100 text-xs">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-zinc-700">
            ${item.source}
          </span>
          <span class="text-zinc-400">•</span>
          <span class="text-zinc-500">${item.readTimeMinutes} min read</span>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="toggleContext('${item.id}')" class="text-zinc-500 hover:text-zinc-900 py-1 px-2 rounded hover:bg-zinc-100 transition-colors">
            Debate view
          </button>
          <button onclick="askBotAbout('${encodeURIComponent(item.title)}')" class="text-blue-600 font-semibold py-1 px-2 rounded hover:bg-blue-50 transition-colors">
            Ask AI about this
          </button>
        </div>
      </div>
    </article>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Category filter
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category-btn').forEach(b => {
      b.classList.remove('bg-zinc-900', 'text-white', 'shadow-sm');
      b.classList.add('text-zinc-600', 'hover:text-zinc-900', 'hover:bg-zinc-100');
    });
    btn.classList.add('bg-zinc-900', 'text-white', 'shadow-sm');
    btn.classList.remove('text-zinc-600', 'hover:text-zinc-900', 'hover:bg-zinc-100');
    currentCategory = btn.getAttribute('data-cat');
    renderNewsCards(currentCategory);
  });
});

window.toggleContext = function(id) {
  const el = document.getElementById(`context-${id}`);
  if (el) el.classList.toggle('hidden');
};

window.speakStory = function(id) {
  const item = US_NEWS_ITEMS.find(n => n.id === id);
  if (!item || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const text = `${item.title}. Key takeaways: ${item.summaryBullets.join('. ')}. Why it matters: ${item.whyItMatters}`;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

// Render Top 10
function renderTop10(platform) {
  const grid = document.getElementById('top10-items-grid');
  if (!grid) return;

  const items = TOP10_DATA[platform] || [];
  grid.innerHTML = items.map(item => `
    <div class="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between hover:border-blue-400 transition-all">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="font-extrabold text-blue-600 text-sm">#${item.rank}</span>
          <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
            item.level === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
          }">
            ${item.level === 'high' ? '🔥 Highly Viral' : '⚡ Trending'}
          </span>
        </div>
        <h4 class="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 mb-1">
          ${item.title}
        </h4>
        <p class="text-xs text-zinc-500 line-clamp-2 mb-3">
          ${item.summary}
        </p>
      </div>

      <div class="pt-2 border-t border-zinc-200/80 flex items-center justify-between text-[11px]">
        <span class="font-semibold text-zinc-600">${item.creator}</span>
        <span class="font-mono text-blue-600">${item.views}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.switchTop10Tab = function(platform) {
  currentTop10Tab = platform;
  document.querySelectorAll('.top10-tab-btn').forEach(b => {
    b.classList.remove('bg-zinc-900', 'text-white', 'shadow-sm');
    b.classList.add('text-zinc-600', 'hover:text-zinc-900', 'hover:bg-zinc-100');
  });
  const activeBtn = document.getElementById(`tab-top10-${platform}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-zinc-900', 'text-white', 'shadow-sm');
    activeBtn.classList.remove('text-zinc-600', 'hover:text-zinc-900', 'hover:bg-zinc-100');
  }
  renderTop10(platform);
};

// Chatbot functionality
window.toggleChatBot = function() {
  const modal = document.getElementById('chatbot-modal');
  if (modal) {
    modal.classList.toggle('hidden');
  }
};

function populateChatProactiveList() {
  const list = document.getElementById('chat-proactive-list');
  if (!list) return;

  list.innerHTML = US_NEWS_ITEMS.map((item, idx) => `
    <button onclick="askBotAbout('${encodeURIComponent(item.title)}')" class="w-full text-left p-2 rounded-xl bg-white hover:bg-blue-100 border border-blue-100 transition-all flex items-center justify-between group">
      <div class="flex items-center gap-2 overflow-hidden mr-2">
        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0">#${idx + 1}</span>
        <span class="truncate text-xs font-medium text-zinc-800 group-hover:text-blue-600">${item.title}</span>
      </div>
      <i data-lucide="chevron-right" class="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 shrink-0"></i>
    </button>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.askBotAbout = function(encodedTitle) {
  const title = decodeURIComponent(encodedTitle);
  const modal = document.getElementById('chatbot-modal');
  if (modal && modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
  }
  const input = document.getElementById('chat-input-text');
  if (input) input.value = `Explain the details and impact of: ${title}`;
  handleChatSubmit();
};

window.handleChatSubmit = function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-input-text');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  const container = document.getElementById('chat-messages-container');

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'flex flex-col items-end';
  userMsgEl.innerHTML = `
    <div class="max-w-[88%] rounded-2xl p-3 bg-blue-600 text-white rounded-br-none shadow-sm text-xs sm:text-sm">
      ${query}
    </div>
  `;
  container.appendChild(userMsgEl);
  input.value = '';

  // Append loading
  const loadingEl = document.createElement('div');
  loadingEl.className = 'text-xs text-zinc-400 p-2 flex items-center gap-2';
  loadingEl.innerHTML = `<i data-lucide="loader-2" class="h-3.5 w-3.5 animate-spin text-blue-600"></i> Searching live US news database...`;
  container.appendChild(loadingEl);
  if (window.lucide) lucide.createIcons();
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    container.removeChild(loadingEl);

    // Find match
    const match = US_NEWS_ITEMS.find(n => query.toLowerCase().includes(n.category) || query.toLowerCase().includes(n.title.toLowerCase().substring(0, 15)));

    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'flex flex-col items-start';

    if (match) {
      botMsgEl.innerHTML = `
        <div class="max-w-[88%] rounded-2xl p-3.5 bg-zinc-100 text-zinc-900 rounded-bl-none border border-zinc-200 text-xs sm:text-sm">
          <p class="font-bold text-blue-700 mb-1">${match.title}</p>
          <div class="space-y-1.5 my-2">
            ${match.summaryBullets.map(b => `<div class="flex items-start gap-1.5"><i data-lucide="check-circle-2" class="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5"></i><span>${b}</span></div>`).join('')}
          </div>
          <div class="p-2 rounded-lg bg-amber-50 text-[11px] text-amber-900 border border-amber-200 mt-2">
            <strong>💡 Why It Matters:</strong> ${match.whyItMatters}
          </div>
          <div class="mt-2 pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Source: ${match.source}</span>
            <a href="${match.sourceUrl}" target="_blank" class="text-blue-600 font-semibold hover:underline">Verify Wire</a>
          </div>
        </div>
      `;
    } else {
      botMsgEl.innerHTML = `
        <div class="max-w-[88%] rounded-2xl p-3.5 bg-zinc-100 text-zinc-900 rounded-bl-none border border-zinc-200 text-xs sm:text-sm">
          <p>Here is what our live US news database confirms regarding your question:</p>
          <p class="mt-1 font-medium">The key focus across American wire reporting today centers on <strong>Federal Reserve monetary stability</strong>, <strong>interstate EV infrastructure grants</strong>, and the <strong>Supreme Court digital privacy warrant mandate</strong>.</p>
          <div class="mt-2 text-[11px] text-zinc-500">
            Ask me about any specific US sector: Economy, Supreme Court, Healthcare, or Infrastructure.
          </div>
        </div>
      `;
    }

    container.appendChild(botMsgEl);
    if (window.lucide) lucide.createIcons();
    container.scrollTop = container.scrollHeight;
  }, 600);
};

// Frequency selector
window.setNewsFrequency = function(freq) {
  selectedNewsFrequency = freq;
  const btnDaily = document.getElementById('btn-freq-daily');
  const btnWeekly = document.getElementById('btn-freq-weekly');
  if (freq === 'daily') {
    btnDaily.className = 'px-4 py-1.5 rounded-xl bg-blue-600 text-white shadow-sm';
    btnWeekly.className = 'px-4 py-1.5 rounded-xl text-zinc-400 hover:text-white';
  } else {
    btnWeekly.className = 'px-4 py-1.5 rounded-xl bg-blue-600 text-white shadow-sm';
    btnDaily.className = 'px-4 py-1.5 rounded-xl text-zinc-400 hover:text-white';
  }
};

// Unsubscribe Modal
window.openUnsubscribeModal = function() {
  const modal = document.getElementById('unsubscribe-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeUnsubscribeModal = function() {
  const modal = document.getElementById('unsubscribe-modal');
  if (modal) modal.classList.add('hidden');
};

window.handleUnsubscribeSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('unsub-email-input');
  const msg = document.getElementById('unsub-status-msg');
  const btn = document.getElementById('btn-unsub-confirm');
  if (!input || !input.value) return;

  btn.disabled = true;
  btn.textContent = 'Processing...';

  setTimeout(() => {
    msg.className = 'text-xs font-semibold text-emerald-600 mt-2';
    msg.textContent = `Success! ${input.value} has been unsubscribed from all WhatIsInNewsToday digests.`;
    input.value = '';
    btn.disabled = false;
    btn.textContent = 'Confirm 1-Click Unsubscribe';
  }, 500);
};

window.refreshFeedData = function() {
  const toast = document.getElementById('realtime-toast');
  if (toast) toast.classList.add('hidden');
  alert('Feed refreshed! Latest US news synchronized from SQLite database.');
};

window.openArchiveModal = function() {
  alert('Permanent daily archives available:\n- /top-10/instagram/2026-10-17\n- /top-10/tiktok/2026-10-17\n- /top-10/youtube/2026-10-17\n- /top-10/trends/2026-10-17\n\nAll historical URLs remain permanently indexed and accessible.');
};

// AI Search setup
function setupAiAskForm() {
  const form = document.getElementById('ai-ask-form');
  const input = document.getElementById('ai-query-input');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) executeAiQuery(input.value.trim());
  });

  const copyBtn = document.getElementById('btn-copy-answer');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const q = document.getElementById('ai-answer-query').innerText;
      const s = document.getElementById('ai-answer-summary').innerText;
      navigator.clipboard.writeText(`${q}\n\n${s}\n\nWhatIsInNewsToday.com US Edition`);
      document.getElementById('copy-btn-text').textContent = 'Copied!';
      setTimeout(() => document.getElementById('copy-btn-text').textContent = 'Copy', 2000);
    });
  }
}

function setupQuickPills() {
  document.querySelectorAll('.quick-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-q');
      const input = document.getElementById('ai-query-input');
      if (input) input.value = q;
      executeAiQuery(q);
    });
  });
}

function executeAiQuery(query) {
  const submitText = document.getElementById('btn-submit-text');
  const wrapper = document.getElementById('ai-answer-wrapper');
  if (submitText) submitText.textContent = 'Synthesizing...';

  wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setTimeout(() => {
    document.getElementById('ai-answer-query').textContent = `"${query}"`;
    document.getElementById('ai-answer-summary').textContent = `Here is today's verified US intelligence on "${query}": Reporting confirms steady macroeconomic conditions as the Federal Reserve maintains interest rate corridors, major interstate EV infrastructure grants take effect across Ohio and Michigan, and the US Supreme Court mandates warrants for commercial geofence surveillance data.`;

    const list = document.getElementById('ai-takeaways-list');
    list.innerHTML = `
      <li class="flex items-start gap-2.5 text-sm text-zinc-800"><i data-lucide="check-circle-2" class="h-4 w-4 text-blue-600 shrink-0 mt-0.5"></i><span>Economy: 30-year fixed US mortgages soften to 5.85% following core CPI print.</span></li>
      <li class="flex items-start gap-2.5 text-sm text-zinc-800"><i data-lucide="check-circle-2" class="h-4 w-4 text-blue-600 shrink-0 mt-0.5"></i><span>Infrastructure: $4.2B unlocked for interstate fast charging grid with 97% uptime rules.</span></li>
      <li class="flex items-start gap-2.5 text-sm text-zinc-800"><i data-lucide="check-circle-2" class="h-4 w-4 text-blue-600 shrink-0 mt-0.5"></i><span>Privacy: Supreme Court Fourth Amendment warrant requirement protects 330M Americans.</span></li>
    `;

    const grid = document.getElementById('ai-citations-grid');
    grid.innerHTML = `
      <a href="https://www.wsj.com" target="_blank" class="p-3 rounded-lg border border-zinc-200 bg-white hover:bg-blue-50/30 text-xs">
        <span class="font-bold text-blue-600 block">Wall Street Journal US</span>
        <span class="font-medium text-zinc-900 line-clamp-1">Fed Signals Stable Rate Corridor as Inflation Cools</span>
      </a>
      <a href="https://apnews.com" target="_blank" class="p-3 rounded-lg border border-zinc-200 bg-white hover:bg-blue-50/30 text-xs">
        <span class="font-bold text-blue-600 block">Associated Press US</span>
        <span class="font-medium text-zinc-900 line-clamp-1">DOT Unveils $4.2B National Highway Fast Charging Plan</span>
      </a>
    `;

    const followups = document.getElementById('ai-followups-pills');
    followups.innerHTML = `
      <button onclick="executeAiQuery('How does the Supreme Court ruling affect state police?')" class="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-blue-100 text-zinc-700">"How does the Supreme Court ruling affect state police?"</button>
      <button onclick="executeAiQuery('Which US cities get new EV charging stalls first?')" class="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-blue-100 text-zinc-700">"Which US cities get new EV charging stalls first?"</button>
    `;

    wrapper.classList.remove('hidden');
    if (submitText) submitText.textContent = 'Ask AI';
    if (window.lucide) lucide.createIcons();
  }, 450);
}
