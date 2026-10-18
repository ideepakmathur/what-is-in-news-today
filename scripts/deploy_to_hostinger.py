#!/usr/bin/env python3
"""
Hostinger Git Deployment Automation Script
Connects the GitHub repository to whatisinnewstoday.com on Hostinger
and triggers automated deployment.
"""

import urllib.request
import urllib.error
import json
import ssl
import sys

HOSTINGER_API_BASE = "https://developers.hostinger.com"
TOKEN = "7VnTVVvuBguohqbZcynxEI12DRd8l8SyE37rPBlLfebb376d"
USERNAME = "u971630663"
DOMAIN = "whatisinnewstoday.com"
DEFAULT_REPO_URL = "https://github.com/ideepakmathur/whatisinnewstoday.git"

def make_request(path, method="GET", body=None):
    ctx = ssl._create_unverified_context()
    url = f"{HOSTINGER_API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "WhatIsInNewsToday-Deployer/1.0"
    }

    data = json.dumps(body).encode('utf-8') if body else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            raw = resp.read().decode('utf-8')
            return resp.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as he:
        err_msg = he.read().decode('utf-8')
        return he.code, {"error": err_msg}
    except Exception as e:
        return 500, {"error": str(e)}

def deploy_repository(repo_url=DEFAULT_REPO_URL, branch="main"):
    print(f"Connecting {repo_url} (branch: {branch}) to {DOMAIN} on Hostinger...")
    
    # 1. Check existing repositories on Hostinger
    status, repos = make_request(f"/api/hosting/v1/accounts/{USERNAME}/websites/{DOMAIN}/git/repositories")
    print(f"Current repositories on Hostinger: {repos}")

    # 2. Add or Deploy repository
    payload = {
        "repository_url": repo_url,
        "branch": branch,
        "directory": ""
    }

    status, resp = make_request(
        f"/api/hosting/v1/accounts/{USERNAME}/websites/{DOMAIN}/git/repositories",
        method="POST",
        body=payload
    )

    print(f"Deploy response [{status}]: {resp}")

    # 3. Fetch Auto-Deploy Webhook Settings
    status, webhook_info = make_request(f"/api/hosting/v1/accounts/{USERNAME}/websites/{DOMAIN}/git/auto-deployments/settings")
    print(f"Auto-Deploy Settings [{status}]: {webhook_info}")

    return resp

if __name__ == "__main__":
    repo_arg = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_REPO_URL
    deploy_repository(repo_arg)
