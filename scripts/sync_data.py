import sqlite3
import json
import os

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "whatisinnewstoday.db"))
JSON_OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "next-app", "data", "seed.json"))

def export_db_to_json():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Fetch news articles
    cursor.execute("SELECT * FROM news_articles ORDER BY created_at DESC")
    articles = []
    for row in cursor.fetchall():
        d = dict(row)
        d["summaryBullets"] = json.loads(d["summary_bullets"])
        d["perspectives"] = {
            "consensus": d["perspectives_consensus"],
            "divergence": d["perspectives_divergence"]
        }
        d["tags"] = json.loads(d["tags"])
        d["whyItMatters"] = d["why_it_matters"]
        d["sourceUrl"] = d["source_url"]
        d["publishedAt"] = d["published_at"]
        d["readTimeMinutes"] = d["read_time_minutes"]
        articles.append(d)

    # Fetch top 10 entries
    cursor.execute("SELECT * FROM top10_entries ORDER BY date DESC, rank ASC")
    top10_records = [dict(row) for row in cursor.fetchall()]

    # Group top10 by platform and date
    top10_grouped = {}
    for r in top10_records:
        plat = r["platform"]
        dt = r["date"]
        if plat not in top10_grouped:
            top10_grouped[plat] = {}
        if dt not in top10_grouped[plat]:
            top10_grouped[plat][dt] = []
        top10_grouped[plat][dt].append(r)

    # Fetch subscribers count & sample tokens
    cursor.execute("SELECT count(*) as count FROM subscribers WHERE status = 'active'")
    sub_count = cursor.fetchone()["count"]

    conn.close()

    payload = {
        "articles": articles,
        "top10": top10_grouped,
        "activeSubscribersCount": sub_count,
        "lastSyncedAt": os.popen("date -u +'%Y-%m-%dT%H:%M:%SZ'").read().strip()
    }

    os.makedirs(os.path.dirname(JSON_OUT), exist_ok=True)
    with open(JSON_OUT, "w") as f:
        json.dump(payload, f, indent=2)

    print(f"Exported {len(articles)} articles and top10 archives to {JSON_OUT}")

if __name__ == "__main__":
    export_db_to_json()
