import sqlite3
import json
import os
import uuid
from datetime import datetime, timedelta

DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
os.makedirs(DB_DIR, exist_ok=True)
DB_PATH = os.path.join(DB_DIR, "whatisinnewstoday.db")

def init_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. News Articles Table (US News Focus)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS news_articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        country TEXT DEFAULT 'US',
        summary_bullets TEXT NOT NULL,
        why_it_matters TEXT NOT NULL,
        perspectives_consensus TEXT NOT NULL,
        perspectives_divergence TEXT,
        source TEXT NOT NULL,
        source_url TEXT NOT NULL,
        published_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        read_time_minutes INTEGER DEFAULT 2,
        tags TEXT NOT NULL
    );
    """)

    # 2. Subscribers Table (Daily/Weekly & 1-click unsubscribe)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        frequency TEXT DEFAULT 'daily',
        status TEXT DEFAULT 'active',
        token TEXT UNIQUE NOT NULL,
        subscribed_at TEXT NOT NULL,
        unsubscribed_at TEXT
    );
    """)

    # 3. Top 10 Viral Reels & Trends Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS top10_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT NOT NULL,
        date TEXT NOT NULL,
        rank INTEGER NOT NULL,
        title TEXT NOT NULL,
        creator TEXT,
        views_or_volume TEXT,
        external_url TEXT NOT NULL,
        thumbnail_url TEXT,
        trend_level TEXT DEFAULT 'high',
        summary TEXT,
        created_at TEXT NOT NULL,
        UNIQUE(platform, date, rank)
    );
    """)

    # 4. Realtime Audit / Sync Events Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS realtime_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    conn.commit()

    # Seed Sample US News
    today_str = datetime.now().strftime("%Y-%m-%d")
    yesterday_str = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    us_articles = [
        {
            "id": "us-news-1",
            "slug": "us-federal-reserve-signals-neutral-rate-corridor-us-inflation",
            "title": "US Federal Reserve Signals Stable Rate Corridor as Core CPI Hits 2.3%",
            "category": "economy",
            "country": "US",
            "summary_bullets": [
                "Federal Reserve Chairman announced that benchmark interest rates will remain steady following labor market resilience.",
                "US Core Consumer Price Index settled at 2.3% annualized, meeting the central bank's comfort threshold for consumer staples.",
                "Major US retail lenders adjusted 30-year fixed mortgage rates downward to average 5.85% across key metropolitan zones."
            ],
            "why_it_matters": "Lowers commercial borrowing costs for American small businesses and provides prospective home buyers the lowest mortgage terms in over two years.",
            "perspectives_consensus": "Signals that the US economy has navigated inflationary shocks without triggering a manufacturing recession.",
            "perspectives_divergence": "Independent congressional fiscal monitors warn that rising federal debt servicing costs may still limit fiscal flexibility.",
            "source": "Wall Street Journal & Bloomberg US",
            "sourceUrl": "https://www.wsj.com",
            "published_at": "1 hour ago",
            "created_at": datetime.now().isoformat(),
            "read_time_minutes": 2,
            "tags": ["US Economy", "Federal Reserve", "Inflation", "Mortgage Rates"]
        },
        {
            "id": "us-news-2",
            "slug": "bipartisan-us-infrastructure-act-deploys-high-speed-ev-corridor",
            "title": "US Department of Transportation Unlocks $4.2B for Coast-to-Coast Fast Charging Grid",
            "category": "infrastructure",
            "country": "US",
            "summary_bullets": [
                "Bipartisan infrastructure funds will install 8,500 universal ultra-fast charging stalls along Interstate 80, I-90, and I-10 corridors.",
                "Stations require 97% operational uptime guarantees and support all standardized North American Charging Standard (NACS) vehicles.",
                "Construction contracts prioritize domestic steel fabricators across Ohio, Pennsylvania, and Michigan."
            ],
            "why_it_matters": "Eliminates long-distance range anxiety for American interstate freight and regional commuters transitioning to electrified transport.",
            "perspectives_consensus": "A critical federal investment to modernize interstate transportation logistics.",
            "perspectives_divergence": "Utility operators in rural states note that regional transmission substations must be upgraded to support high peak-demand loads.",
            "source": "Associated Press US",
            "sourceUrl": "https://apnews.com",
            "published_at": "2 hours ago",
            "created_at": datetime.now().isoformat(),
            "read_time_minutes": 2,
            "tags": ["US Infrastructure", "Clean Energy", "Automotive", "Interstate"]
        },
        {
            "id": "us-news-3",
            "slug": "silicon-valley-ai-supercomputing-hub-opens-in-texas",
            "title": "US Tech Coalition Inaugurates Gigawatt Clean-Compute Campus in Texas",
            "category": "tech",
            "country": "US",
            "summary_bullets": [
                "A consortium of American tech giants brought online a dedicated 1.2-gigawatt data center hub powered by solar, battery, and small modular nuclear assets.",
                "The facility will host domestic frontier AI reasoning clusters with zero net carbon footprint on local municipal grids.",
                "Creates 3,200 local skilled technician and electrical engineering jobs in central Texas."
            ],
            "why_it_matters": "Keeps frontier AI research anchored within US domestic borders while answering community concerns regarding public utility power drains.",
            "perspectives_consensus": "Pioneering blueprint for self-powering energy-intensive computation campuses.",
            "perspectives_divergence": "Environmental watchdog groups are reviewing water cooling consumption levels during summer peak heat waves.",
            "source": "Reuters US Tech",
            "sourceUrl": "https://www.reuters.com",
            "published_at": "3 hours ago",
            "created_at": datetime.now().isoformat(),
            "read_time_minutes": 3,
            "tags": ["AI", "Silicon Valley", "Texas", "Clean Energy", "Computing"]
        },
        {
            "id": "us-news-4",
            "slug": "us-fda-grants-accelerated-approval-for-alzheimers-blood-test",
            "title": "FDA Approves 15-Minute Blood Screening Test for Early-Stage Alzheimer's",
            "category": "health",
            "country": "US",
            "summary_bullets": [
                "The US Food and Drug Administration cleared the first non-invasive diagnostic blood biomarker test with 94% clinical accuracy.",
                "Replaces painful spinal taps and $5,000 PET scans with a standard finger-prick assay processed in primary care clinics.",
                "Medicare confirmed full insurance coverage starting Q1 next year for patients aged 60 and older."
            ],
            "why_it_matters": "Allows millions of Americans to detect neurodegenerative changes years before symptom onset, dramatically improving early intervention success.",
            "perspectives_consensus": "One of the most consequential preventative healthcare milestones in modern American neurology.",
            "perspectives_divergence": "Primary care associations emphasize the necessity of clear clinical guidelines to prevent misinterpretation of borderline readings.",
            "source": "STAT News & FDA Media",
            "sourceUrl": "https://www.statnews.com",
            "published_at": "4 hours ago",
            "created_at": datetime.now().isoformat(),
            "read_time_minutes": 2,
            "tags": ["FDA", "Healthcare", "Alzheimers", "Medicare", "US Health"]
        },
        {
            "id": "us-news-5",
            "slug": "us-supreme-court-issues-key-ruling-on-digital-privacy-and-location-data",
            "title": "Supreme Court Sets Warrant Requirement for Commercial Geofence Location Data",
            "category": "politics",
            "country": "US",
            "summary_bullets": [
                "In a 7-2 landmark decision, the US Supreme Court ruled that law enforcement agencies must obtain judicial Fourth Amendment warrants to purchase bulk commercial phone location feeds.",
                "The opinion authored by the Chief Justice states that modern smartphone location records reveal the privacies of life protected under constitutional safeguards.",
                "Civil liberties organizations and tech privacy advocates praised the ruling as a crucial digital rights baseline."
            ],
            "why_it_matters": "Shuts down the unregulated commercial data-broker loophole, protecting 330 million American consumers from warrantless government surveillance.",
            "perspectives_consensus": "Major constitutional affirmation that Fourth Amendment protections apply to commercial algorithmic surveillance.",
            "perspectives_divergence": "Dissenting justices expressed concern that emergency investigations during active public threats could face administrative delays.",
            "source": "SCOTUSblog & Washington Post",
            "sourceUrl": "https://www.scotusblog.com",
            "published_at": "5 hours ago",
            "created_at": datetime.now().isoformat(),
            "read_time_minutes": 3,
            "tags": ["Supreme Court", "US Politics", "Fourth Amendment", "Privacy", "Digital Rights"]
        },
        {
            "id": "us-news-6",
            "slug": "nasa-artemis-lunar-gateway-completes-habitation-module-shake-test",
            "title": "NASA Finalizes Spacecraft Habitat Testing for Artemis Deep Space Crew",
            "category": "science",
            "country": "US",
            "summary_bullets": [
                "Engineers at Marshall Space Flight Center completed acoustic and pressure seal tests on the HALO lunar gateway habitat.",
                "American aerospace suppliers in 42 states delivered all primary life-support, communication, and docking subsystems on schedule.",
                "Mission prepares four US astronauts for extended lunar orbit operations scheduled for late next year."
            ],
            "why_it_matters": "Re-establishes permanent American deep-space human presence and establishes the staging base for future Mars exploration.",
            "perspectives_consensus": "A triumphant multi-state manufacturing achievement for the American space industrial base.",
            "perspectives_divergence": "Budget committees in Congress urge NASA to maintain strict contractor cost caps on subsequent heavy booster procurement.",
            "source": "NASA Media & SpaceNews",
            "sourceUrl": "https://www.nasa.gov",
            "published_at": "6 hours ago",
            "created_at": datetime.now().isoformat(),
            "read_time_minutes": 2,
            "tags": ["NASA", "Artemis", "Space Exploration", "US Science"]
        }
    ]

    for art in us_articles:
        cursor.execute("""
        INSERT OR REPLACE INTO news_articles 
        (id, slug, title, category, country, summary_bullets, why_it_matters, perspectives_consensus, perspectives_divergence, source, source_url, published_at, created_at, read_time_minutes, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            art["id"],
            art["slug"],
            art["title"],
            art["category"],
            art["country"],
            json.dumps(art["summary_bullets"]),
            art["why_it_matters"],
            art["perspectives_consensus"],
            art.get("perspectives_divergence", ""),
            art["source"],
            art["sourceUrl"],
            art["published_at"],
            art["created_at"],
            art["read_time_minutes"],
            json.dumps(art["tags"])
        ))

    # Seed Top 10 for Today & Yesterday for Instagram, TikTok, YouTube, and Search Trends
    platforms_data = {
        "instagram": [
            ("NASA Lunar Sunrise Timelapse", "@nasa", "18.4M views", "https://instagram.com/p/nasa_sunrise", "high", "Stunning 4K footage captured from Artemis test vehicle orbiting lunar terminator."),
            ("15-Minute Sourdough Method", "@chefsteps", "14.2M views", "https://instagram.com/p/sourdough_fast", "high", "Revolutionary high-hydration rapid fold technique sweeping home bakers."),
            ("Silicon Valley Tech Office Tour 2026", "@techinsider", "11.8M views", "https://instagram.com/p/future_office", "high", "Inside the clean-power Texas AI hub with robotic cafeterias."),
            ("Olympic Gymnast Beam Routine", "@usagym", "9.6M views", "https://instagram.com/p/gym_drill", "moderate", "New dismount combination verified ahead of upcoming championship."),
            ("Grand Canyon Storm Timelapse", "@natgeotravel", "8.1M views", "https://instagram.com/p/canyon_storm", "moderate", "Lightning storm meeting twilight hues across the North Rim."),
            ("Personal Finance 50/30/20 Breakdown", "@cleverfinance", "7.5M views", "https://instagram.com/p/money_rules", "moderate", "How to allocate savings when interest rates normalize."),
            ("Rescue Dog First Flight Reaction", "@thedodo", "6.9M views", "https://instagram.com/p/flying_pup", "moderate", "Golden retriever looks out airplane window for the first time."),
            ("Retro US Diner Restoration", "@urbanexplorers", "5.8M views", "https://instagram.com/p/retro_diner", "moderate", "1950s route 66 diner restored to mint condition in Illinois."),
            ("Ceramic Coffee Mug Throwing", "@studiopottery", "5.1M views", "https://instagram.com/p/clay_craft", "moderate", "Hypnotic spiral trimming process on potter's wheel."),
            ("Micro-Apartment Transforming Furniture", "@tinyhomes", "4.7M views", "https://instagram.com/p/nyc_studio", "moderate", "300 sq ft Manhattan apartment that changes into 4 rooms.")
        ],
        "tiktok": [
            ("POV: Your Professor Explains AI Reasoning in 60s", "@dr_explain", "24.1M views", "https://tiktok.com/@dr_explain/video/1", "high", "Clear visual analogy of neural attention models vs human memory."),
            ("The Day the US Mortgage Rate Dropped", "@marketguy", "19.5M views", "https://tiktok.com/@marketguy/video/2", "high", "Young couples react to updated home buying affordability calculator."),
            ("Grandma Tries VR Spatial Computing", "@familymoments", "16.8M views", "https://tiktok.com/@familymoments/video/3", "high", "Heartwarming reaction to revisiting her 1960s childhood street."),
            ("Hidden US Road Trips Nobody Talks About", "@travelhacker", "13.2M views", "https://tiktok.com/@travelhacker/video/4", "high", "Upper Peninsula Michigan and Blue Ridge scenic bypasses."),
            ("Easy 4-Ingredient Meal Prep", "@budgetbites", "11.4M views", "https://tiktok.com/@budgetbites/video/5", "moderate", "Nutritious high-protein bowls for under $3 per serving."),
            ("Electric Vehicle Charging Test Coast to Coast", "@autovlog", "9.8M views", "https://tiktok.com/@autovlog/video/6", "moderate", "Driving from NYC to San Francisco on new federal fast-chargers."),
            ("Interview Tips for College Graduates 2026", "@careermentor", "8.7M views", "https://tiktok.com/@careermentor/video/7", "moderate", "3 questions to ask at the end of an interview to stand out."),
            ("Restoring a 1978 Apple II Computer", "@retrotech", "7.3M views", "https://tiktok.com/@retrotech/video/8", "moderate", "Cleaning motherboards and booting up vintage VisiCalc."),
            ("Coffee Shop Morning Routine Sound ASMR", "@baristalife", "6.2M views", "https://tiktok.com/@baristalife/video/9", "moderate", "Espresso grind and milk steaming soundscape in Brooklyn."),
            ("US Postal Service Behind the Scenes Sorting", "@howitsmade_daily", "5.4M views", "https://tiktok.com/@howitsmade_daily/video/10", "moderate", "High-speed laser barcode sorting of 40,000 letters per minute.")
        ],
        "youtube": [
            ("MKBHD: The Future of Spatial Glasses", "Marques Brownlee", "5.8M views", "https://youtube.com/shorts/glasses_demo", "high", "Hands-on with all-day featherweight transparent displays."),
            ("Veritasium: Why Did This Math Conjecture Fall?", "Veritasium", "4.9M views", "https://youtube.com/shorts/math_proof", "high", "A counterexample discovered after 75 years of unsolved proofs."),
            ("NASA Artemis Gateway Module Tour", "NASA", "4.1M views", "https://youtube.com/shorts/lunar_tour", "high", "Astronaut walk-through inside the pressurized lunar living module."),
            ("How Wall Street Algorithms Trade In Microseconds", "Bloomberg Originals", "3.6M views", "https://youtube.com/shorts/hft_trading", "high", "Fiber optic laser relays across the New Jersey countryside."),
            ("The Engineering Genius Behind the Hoover Dam", "Practical Engineering", "3.2M views", "https://youtube.com/shorts/dam_concrete", "moderate", "Why the concrete cooling pipes were essential to prevent fractures."),
            ("Testing Every Fast-Food Burger in America", "First We Feast", "2.9M views", "https://youtube.com/shorts/burger_test", "moderate", "Blind taste testing across 12 national drive-thrus."),
            ("What Happens When You Delete Your Digital Footprint", "Vox", "2.7M views", "https://youtube.com/shorts/privacy_test", "moderate", "Testing data broker removal services under the new federal privacy law."),
            ("Building a Cabin in the Montana Woods: Day 100", "Cabin Life", "2.4M views", "https://youtube.com/shorts/montana_roof", "moderate", "Completing the stone chimney and cedar shingle roof before winter."),
            ("Sound Design in Christopher Nolan Movies", "StudioBinder", "2.1M views", "https://youtube.com/shorts/sound_mix", "moderate", "The technique of using the Shepard tone to create endless tension."),
            ("How US Interstate Highways Are Numbered", "Half as Interesting", "1.9M views", "https://youtube.com/shorts/highway_code", "moderate", "Why odd numbers run north-south and even numbers run east-west.")
        ],
        "trends": [
            ("Federal Reserve Rate Decision", "Macroeconomics", "2.5M searches", "https://trends.google.com/trends/explore?q=Federal+Reserve", "high", "Massive surge following announcement of steady rate corridor."),
            ("Supreme Court Digital Privacy Ruling", "SCOTUS & Law", "1.9M searches", "https://trends.google.com/trends/explore?q=Supreme+Court+Privacy", "high", "Consumers and legal experts searching Fourth Amendment geofence limits."),
            ("FDA Alzheimer's Blood Test", "Healthcare & Medicine", "1.7M searches", "https://trends.google.com/trends/explore?q=Alzheimers+Blood+Test", "high", "High search interest from families and primary care practitioners."),
            ("NASA Artemis Gateway Launch Date", "Science & Space", "1.4M searches", "https://trends.google.com/trends/explore?q=NASA+Artemis+Gateway", "high", "Public tracking of astronaut crew timeline and orbit schedule."),
            ("US Mortgage Rate Calculator 2026", "Real Estate", "1.1M searches", "https://trends.google.com/trends/explore?q=Mortgage+Rates", "high", "Homebuyers checking revised monthly payments on 30-year loans."),
            ("Electric Vehicle Charging Stations Near Me", "Transportation", "850K searches", "https://trends.google.com/trends/explore?q=EV+Chargers", "moderate", "Search spikes along major interstate highways following federal grant."),
            ("High School Football Playoff Standings", "Sports", "780K searches", "https://trends.google.com/trends/explore?q=High+School+Football", "moderate", "Statewide Friday night lights results and regional tournament brackets."),
            ("Texas Clean Compute Data Center Hub", "Technology", "690K searches", "https://trends.google.com/trends/explore?q=Texas+Clean+Compute", "moderate", "Investors and engineers exploring green power infrastructure."),
            ("Fall Foliage Peak Map New England", "Travel & Nature", "620K searches", "https://trends.google.com/trends/explore?q=Fall+Foliage+Map", "moderate", "Peak color tracker for Vermont, New Hampshire, and upstate New York."),
            ("National Park Free Admission Dates", "Recreation", "540K searches", "https://trends.google.com/trends/explore?q=National+Park+Free+Days", "moderate", "Annual calendar of public fee-free days across US national parks.")
        ]
    }

    # Insert Today's records
    for platform, items in platforms_data.items():
        for idx, item in enumerate(items, 1):
            cursor.execute("""
            INSERT OR REPLACE INTO top10_entries
            (platform, date, rank, title, creator, views_or_volume, external_url, trend_level, summary, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                platform,
                today_str,
                idx,
                item[0],
                item[1],
                item[2],
                item[3],
                item[4],
                item[5],
                datetime.now().isoformat()
            ))

    # Also Insert Yesterday's records for historical archive testing!
    for platform, items in platforms_data.items():
        for idx, item in enumerate(items, 1):
            # Slightly modified rank / metric for archive realism
            past_title = f"[Yesterday] {item[0]}"
            cursor.execute("""
            INSERT OR REPLACE INTO top10_entries
            (platform, date, rank, title, creator, views_or_volume, external_url, trend_level, summary, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                platform,
                yesterday_str,
                idx,
                past_title,
                item[1],
                item[2],
                item[3],
                item[4],
                item[5],
                (datetime.now() - timedelta(days=1)).isoformat()
            ))

    # Seed Sample Subscriber for testing unsubscribe flow
    sample_token = str(uuid.uuid4())
    cursor.execute("""
    INSERT OR REPLACE INTO subscribers (email, frequency, status, token, subscribed_at)
    VALUES (?, ?, ?, ?, ?)
    """, ("reader@example.com", "daily", "active", sample_token, datetime.now().isoformat()))

    conn.commit()
    conn.close()
    print(f"Database successfully initialized and seeded at: {DB_PATH}")

if __name__ == "__main__":
    init_database()
