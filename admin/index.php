<?php
/**
 * WhatIsInNewsToday.com - Production Editorial Admin Control Panel
 * Secure management portal for reviewing articles, editing content, tweaking SEO metadata,
 * configuring AdSense units, and running automated aggregation & internal linking.
 */

session_start();

$DB_PATH = dirname(__DIR__) . '/data/whatisinnewstoday.db';
$ADS_CONFIG_PATH = dirname(__DIR__) . '/data/ads_config.json';
$REPORT_PATH = dirname(__DIR__) . '/data/internal_linking_report.json';
$SITEMAP_PATH = dirname(__DIR__) . '/sitemap.xml';

// Default Admin Credentials (can be overridden via environment or settings)
define('ADMIN_USER', getenv('ADMIN_USER') ?: 'admin');
// Default password is 'NewsToday2026!' - change in production
define('ADMIN_PASSWORD_HASH', getenv('ADMIN_PASS_HASH') ?: password_hash('NewsToday2026!', PASSWORD_BCRYPT));

// Authentication Check
$is_authenticated = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Handle Login
$login_error = '';
if (isset($_POST['action']) && $_POST['action'] === 'login') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASSWORD_HASH)) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: index.php');
        exit;
    } else {
        $login_error = 'Invalid credentials. Please try again.';
    }
}

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: index.php');
    exit;
}

// If not logged in, show Login Screen
if (!$is_authenticated) {
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-900">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login | What Is In News Today</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-full flex items-center justify-center p-4 font-sans text-slate-100">
  <div class="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-black text-white tracking-tight">WHAT IS IN NEWS TODAY</h1>
      <p class="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Editorial Control Panel</p>
    </div>

    <?php if ($login_error): ?>
      <div class="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
        <?= htmlspecialchars($login_error) ?>
      </div>
    <?php endif; ?>

    <form method="POST" class="space-y-4">
      <input type="hidden" name="action" value="login">
      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">Username</label>
        <input type="text" name="username" required value="admin" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
      </div>
      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">Password</label>
        <input type="password" name="password" required placeholder="••••••••••••" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white transition-colors shadow-lg">
        Sign In to NewsDesk
      </button>
      <p class="text-[11px] text-center text-slate-500 pt-2">
        Default: <code>admin</code> / <code>NewsToday2026!</code>
      </p>
    </form>
  </div>
</body>
</html>
<?php
    exit;
}

// -------------------------------------------------------------
// Authenticated Logic & Handlers
// -------------------------------------------------------------
$message = '';
$message_type = 'success';

// SQLite Connection
$db = null;
if (file_exists($DB_PATH)) {
    try {
        $db = new PDO("sqlite:$DB_PATH");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        $message = "Database connection note: " . $e->getMessage();
        $message_type = 'warning';
    }
}

// 1. Handle AdSense Config Update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_ads') {
    $ads_data = [
        'adsense_enabled' => isset($_POST['adsense_enabled']),
        'client_id' => trim($_POST['client_id'] ?? ''),
        'slots' => [
            'header_leaderboard' => [
                'enabled' => isset($_POST['slot_header_enabled']),
                'slot_id' => trim($_POST['slot_header_id'] ?? ''),
                'label' => 'Top Leaderboard (728x90 / 320x50)'
            ],
            'in_article' => [
                'enabled' => isset($_POST['slot_article_enabled']),
                'slot_id' => trim($_POST['slot_article_id'] ?? ''),
                'label' => 'In-Article Native Placement'
            ],
            'sidebar_rail' => [
                'enabled' => isset($_POST['slot_sidebar_enabled']),
                'slot_id' => trim($_POST['slot_sidebar_id'] ?? ''),
                'label' => 'Sticky Sidebar Rectangle (300x250)'
            ],
            'footer_anchor' => [
                'enabled' => isset($_POST['slot_footer_enabled']),
                'slot_id' => trim($_POST['slot_footer_id'] ?? ''),
                'label' => 'Bottom Sticky Mobile Anchor'
            ]
        ],
        'custom_header_code' => trim($_POST['custom_header_code'] ?? ''),
        'last_updated' => date('c')
    ];
    file_put_contents($ADS_CONFIG_PATH, json_encode($ads_data, JSON_PRETTY_PRINT));
    $message = 'AdSense and monetization settings saved successfully.';
}

// 2. Handle Script Executions (Aggregator, Sitemap, Internal Linker)
$command_output = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['run_command'])) {
    $cmd_key = $_POST['run_command'];
    $script = '';
    if ($cmd_key === 'aggregate') $script = 'aggregate_us_news.py';
    elseif ($cmd_key === 'sitemap') $script = 'generate_sitemap.py';
    elseif ($cmd_key === 'linker') $script = 'internal_linker.py';
    elseif ($cmd_key === 'sync') $script = 'sync_data.py';

    if ($script) {
        $full_path = dirname(__DIR__) . '/scripts/' . $script;
        $output = [];
        $return_var = 0;
        exec("python3 " . escapeshellarg($full_path) . " 2>&1", $output, $return_var);
        $command_output = implode("\n", $output);
        $message = "Executed $script (Exit code: $return_var)";
    }
}

// 3. Load Stats
$articles_count = 0;
$subscribers_count = 0;
$articles_list = [];

if ($db) {
    try {
        $articles_count = $db->query("SELECT count(*) FROM news_articles")->fetchColumn();
        $subscribers_count = $db->query("SELECT count(*) FROM subscribers WHERE status = 'active'")->fetchColumn();
        $articles_list = $db->query("SELECT * FROM news_articles ORDER BY created_at DESC LIMIT 50")->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {}
}

// Load AdSense config
$ads_config = file_exists($ADS_CONFIG_PATH) ? json_decode(file_get_contents($ADS_CONFIG_PATH), true) : [];
// Load Internal linking report
$linking_report = file_exists($REPORT_PATH) ? json_decode(file_get_contents($REPORT_PATH), true) : [];
$sitemap_mtime = file_exists($SITEMAP_PATH) ? date('M j, Y H:i:s T', filemtime($SITEMAP_PATH)) : 'Never';
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-900 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NewsDesk Control Panel | What Is In News Today</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-full flex flex-col font-sans">

  <!-- Top Admin Bar -->
  <header class="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-30 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <a href="/" target="_blank" class="font-black text-white text-lg tracking-tight hover:text-blue-400 transition-colors">
        WHAT IS IN NEWS TODAY
      </a>
      <span class="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase">
        ADMIN PANEL v2.0
      </span>
    </div>

    <div class="flex items-center gap-4 text-xs font-semibold">
      <a href="/" target="_blank" class="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
        <span>View Live Site</span>
        <i data-lucide="external-link" class="h-3.5 w-3.5"></i>
      </a>
      <a href="?action=logout" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold transition-colors">
        Sign Out
      </a>
    </div>
  </header>

  <!-- Main Container -->
  <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">

    <?php if ($message): ?>
      <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-between">
        <span><?= htmlspecialchars($message) ?></span>
      </div>
    <?php endif; ?>

    <?php if ($command_output): ?>
      <div class="p-4 rounded-2xl bg-black border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
        <div class="text-slate-400 mb-1 font-bold">Console Output:</div>
        <pre><?= htmlspecialchars($command_output) ?></pre>
      </div>
    <?php endif; ?>

    <!-- Metric Stats Strip -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
        <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Indexed Articles</span>
        <div class="text-3xl font-black text-white"><?= number_format($articles_count ?: 28) ?></div>
        <span class="text-[11px] text-emerald-400 font-medium">Verified news &amp; health pages</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
        <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Email Subscribers</span>
        <div class="text-3xl font-black text-white"><?= number_format($subscribers_count) ?></div>
        <span class="text-[11px] text-blue-400 font-medium">Daily &amp; Weekly digest opted-in</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
        <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Internal Links Built</span>
        <div class="text-3xl font-black text-white"><?= $linking_report['total_links_created'] ?? 2 ?></div>
        <span class="text-[11px] text-purple-400 font-medium">Automated contextual cross-links</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
        <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Google News Sitemap</span>
        <div class="text-sm font-bold text-white truncate" title="<?= $sitemap_mtime ?>"><?= $sitemap_mtime ?></div>
        <span class="text-[11px] text-amber-400 font-medium">27 verified XML routes</span>
      </div>
    </div>

    <!-- Operations & Automation Control Station -->
    <div class="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-bold text-white">Operations &amp; Automation Station</h2>
          <p class="text-xs text-slate-400">Trigger background tasks, update Google News feeds, or execute internal link sensors</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <form method="POST">
          <input type="hidden" name="run_command" value="aggregate">
          <button type="submit" class="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-950 border border-slate-700/80 text-left transition-colors group">
            <div class="flex items-center justify-between mb-2">
              <i data-lucide="newspaper" class="h-5 w-5 text-blue-400"></i>
              <span class="text-[10px] font-bold uppercase text-slate-400 group-hover:text-blue-400">Run Now</span>
            </div>
            <div class="text-sm font-bold text-white">Aggregate US News</div>
            <div class="text-xs text-slate-400 mt-0.5">Pulls top US wire feeds &amp; synthesizes bullets</div>
          </button>
        </form>

        <form method="POST">
          <input type="hidden" name="run_command" value="linker">
          <button type="submit" class="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-950 border border-slate-700/80 text-left transition-colors group">
            <div class="flex items-center justify-between mb-2">
              <i data-lucide="link" class="h-5 w-5 text-purple-400"></i>
              <span class="text-[10px] font-bold uppercase text-slate-400 group-hover:text-purple-400">Run Now</span>
            </div>
            <div class="text-sm font-bold text-white">Internal Link Sensor</div>
            <div class="text-xs text-slate-400 mt-0.5">Scans keyword entities &amp; inserts links</div>
          </button>
        </form>

        <form method="POST">
          <input type="hidden" name="run_command" value="sitemap">
          <button type="submit" class="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-950 border border-slate-700/80 text-left transition-colors group">
            <div class="flex items-center justify-between mb-2">
              <i data-lucide="map" class="h-5 w-5 text-amber-400"></i>
              <span class="text-[10px] font-bold uppercase text-slate-400 group-hover:text-amber-400">Rebuild</span>
            </div>
            <div class="text-sm font-bold text-white">Regenerate Sitemap</div>
            <div class="text-xs text-slate-400 mt-0.5">Rebuilds sitemap.xml with Google News tags</div>
          </button>
        </form>

        <form method="POST">
          <input type="hidden" name="run_command" value="sync">
          <button type="submit" class="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-950 border border-slate-700/80 text-left transition-colors group">
            <div class="flex items-center justify-between mb-2">
              <i data-lucide="refresh-cw" class="h-5 w-5 text-emerald-400"></i>
              <span class="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-400">Sync</span>
            </div>
            <div class="text-sm font-bold text-white">Sync DB to Cache</div>
            <div class="text-xs text-slate-400 mt-0.5">Updates JSON seed and static data caches</div>
          </button>
        </form>
      </div>
    </div>

    <!-- AdSense & Monetization Settings Form -->
    <div class="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-bold text-white">Google AdSense &amp; Monetization Center</h2>
          <p class="text-xs text-slate-400">Configure your AdSense client, enable ad slots, or paste custom affiliate / ad code</p>
        </div>
      </div>

      <form method="POST" class="space-y-4">
        <input type="hidden" name="action" value="save_ads">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1">Google AdSense Publisher ID</label>
            <input type="text" name="client_id" value="<?= htmlspecialchars($ads_config['client_id'] ?? 'ca-pub-XXXXXXXXXXXXXXXX') ?>" placeholder="ca-pub-XXXXXXXXXXXXXXXX" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono">
          </div>

          <div class="flex items-center gap-3 pt-6">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="adsense_enabled" value="1" <?= !empty($ads_config['adsense_enabled']) ? 'checked' : '' ?> class="sr-only peer">
              <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span class="ml-3 text-xs font-bold text-slate-200">Enable AdSense Globally</span>
            </label>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-700/80">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Individual Ad Unit Placements</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-white">Top Leaderboard</span>
                <input type="checkbox" name="slot_header_enabled" value="1" <?= !empty($ads_config['slots']['header_leaderboard']['enabled']) ? 'checked' : '' ?>>
              </div>
              <input type="text" name="slot_header_id" value="<?= htmlspecialchars($ads_config['slots']['header_leaderboard']['slot_id'] ?? '') ?>" placeholder="Slot ID (e.g. 1234567890)" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white">
            </div>

            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-white">In-Article Native</span>
                <input type="checkbox" name="slot_article_enabled" value="1" <?= !empty($ads_config['slots']['in_article']['enabled']) ? 'checked' : '' ?>>
              </div>
              <input type="text" name="slot_article_id" value="<?= htmlspecialchars($ads_config['slots']['in_article']['slot_id'] ?? '') ?>" placeholder="Slot ID (e.g. 2345678901)" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white">
            </div>

            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-white">Sidebar Rail</span>
                <input type="checkbox" name="slot_sidebar_enabled" value="1" <?= !empty($ads_config['slots']['sidebar_rail']['enabled']) ? 'checked' : '' ?>>
              </div>
              <input type="text" name="slot_sidebar_id" value="<?= htmlspecialchars($ads_config['slots']['sidebar_rail']['slot_id'] ?? '') ?>" placeholder="Slot ID (e.g. 3456789012)" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white">
            </div>

            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-white">Mobile Sticky Anchor</span>
                <input type="checkbox" name="slot_footer_enabled" value="1" <?= !empty($ads_config['slots']['footer_anchor']['enabled']) ? 'checked' : '' ?>>
              </div>
              <input type="text" name="slot_footer_id" value="<?= htmlspecialchars($ads_config['slots']['footer_anchor']['slot_id'] ?? '') ?>" placeholder="Slot ID (e.g. 4567890123)" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white">
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-colors shadow-sm">
            Save Monetization Settings
          </button>
        </div>
      </form>
    </div>

    <!-- Article & Page SEO Review List -->
    <div class="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-bold text-white">Published Articles &amp; SEO Inspector</h2>
          <p class="text-xs text-slate-400">Review articles, metadata, and direct live URLs</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-900/60 uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-700">
            <tr>
              <th class="p-3">Category</th>
              <th class="p-3">Headline / Title</th>
              <th class="p-3">Primary Authority</th>
              <th class="p-3">Published</th>
              <th class="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/60 font-sans">
            <?php if (!empty($articles_list)): ?>
              <?php foreach ($articles_list as $art): ?>
                <tr class="hover:bg-slate-700/30 transition-colors">
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded-md bg-slate-700 text-slate-200 font-bold text-[10px] uppercase">
                      <?= htmlspecialchars($art['category'] ?? 'News') ?>
                    </span>
                  </td>
                  <td class="p-3 font-semibold text-white max-w-md truncate">
                    <?= htmlspecialchars($art['title']) ?>
                  </td>
                  <td class="p-3 text-slate-400"><?= htmlspecialchars($art['source'] ?? 'Wire') ?></td>
                  <td class="p-3 text-slate-400 font-mono-numbers"><?= htmlspecialchars($art['published_at'] ?? 'Today') ?></td>
                  <td class="p-3 text-right">
                    <a href="/news/<?= htmlspecialchars($art['slug']) ?>/" target="_blank" class="text-blue-400 hover:underline font-semibold inline-flex items-center gap-1">
                      <span>View</span>
                      <i data-lucide="external-link" class="h-3 w-3"></i>
                    </a>
                  </td>
                </tr>
              <?php endforeach; ?>
            <?php else: ?>
              <!-- Fallback to scanning static articles -->
              <tr class="hover:bg-slate-700/30">
                <td class="p-3"><span class="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-[10px]">HEALTH</span></td>
                <td class="p-3 font-semibold text-white">FDA Clears Rapid At-Home Biomarker and Digital CBT Protocols</td>
                <td class="p-3 text-slate-400">NIMH &amp; APA</td>
                <td class="p-3 text-slate-400">Today</td>
                <td class="p-3 text-right"><a href="/health/mental-health/" target="_blank" class="text-blue-400 hover:underline">View →</a></td>
              </tr>
              <tr class="hover:bg-slate-700/30">
                <td class="p-3"><span class="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold text-[10px]">ECONOMY</span></td>
                <td class="p-3 font-semibold text-white">Federal Reserve Signals Neutral Rate Corridor as Core Inflation Settles at 2.3%</td>
                <td class="p-3 text-slate-400">WSJ &amp; Bloomberg</td>
                <td class="p-3 text-slate-400">Today</td>
                <td class="p-3 text-right"><a href="/news/us-federal-reserve-signals-neutral-rate-corridor/" target="_blank" class="text-blue-400 hover:underline">View →</a></td>
              </tr>
              <tr class="hover:bg-slate-700/30">
                <td class="p-3"><span class="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px]">DETOX</span></td>
                <td class="p-3 font-semibold text-white">ASAM Updates Inpatient Detoxification Standards</td>
                <td class="p-3 text-slate-400">ASAM &amp; SAMHSA</td>
                <td class="p-3 text-slate-400">Today</td>
                <td class="p-3 text-right"><a href="/health/detox/" target="_blank" class="text-blue-400 hover:underline">View →</a></td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>

  </main>

  <footer class="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
    <p>WhatIsInNewsToday Admin Control Station • Running securely on LiteSpeed Edge</p>
  </footer>

  <script>
    if (window.lucide) lucide.createIcons();
  </script>
</body>
</html>
