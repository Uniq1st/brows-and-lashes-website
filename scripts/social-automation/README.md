# UniqSwek Social Media Automation

Auto-posts to Instagram and Google Business Profile twice daily. Claude generates captions, your photos get a branded overlay, GitHub Actions posts everything automatically.

---

## What Gets Posted

| Where | What | When |
|---|---|---|
| @browsandlashesnyc (Instagram) | Branded photo + caption + hashtags | 9am + 6pm ET daily |
| @eyebrowshapenyc (Instagram) | Branded photo + caption + hashtags | 9am + 6pm ET daily |
| Google Business (UES) | Caption + photo + Book Now button | 9am + 6pm ET daily |
| Google Business (Ridgewood) | Caption + photo + Book Now button | 9am + 6pm ET daily |

---

## Setup — Do This Once (takes about 1 hour total)

### Step 1 — Add Your Photos (5 minutes)

Drop your before/after photos into these folders:
```
content/photos/ues/          ← for Brows & Lashes posts
content/photos/ridgewood/    ← for Eyebrow Shape posts
```

Supported formats: JPG, JPEG, PNG, WEBP  
Recommended: at least 10–15 photos per folder (the script picks randomly)  
Best photos: before/afters, service close-ups, studio shots

---

### Step 2 — Set Up Meta Developer App for Instagram (20 minutes)

Instagram requires a developer app to auto-post.

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click **My Apps → Create App**
3. Choose **"Business"** type
4. Add product: **Instagram Graph API**
5. Under Instagram → **API Setup with Instagram Login**:
   - Add your Instagram account (@browsandlashesnyc)
   - Grant permission: `instagram_basic`, `instagram_content_publish`
6. Generate a **long-lived access token** (valid 60 days — you'll need to refresh it)
7. Find your **Instagram User ID**:
   ```
   https://graph.instagram.com/me?fields=id,username&access_token=YOUR_TOKEN
   ```
8. Repeat for @eyebrowshapenyc (second app or same app with second account)

**Save these values:**
- `META_UES_IG_USER_ID` — the numeric ID for @browsandlashesnyc
- `META_UES_ACCESS_TOKEN` — the long-lived token for UES
- `META_RIDGEWOOD_IG_USER_ID` — numeric ID for @eyebrowshapenyc
- `META_RIDGEWOOD_ACCESS_TOKEN` — token for Ridgewood

> **Token refresh:** Long-lived tokens expire in 60 days. Set a calendar reminder to refresh them, or set up a separate GitHub Action to auto-refresh (ask Claude to build this).

---

### Step 3 — Set Up Cloudinary for Image Hosting (10 minutes)

Instagram requires images to be hosted at a public URL. Cloudinary gives you free hosting.

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. From the dashboard, copy:
   - Cloud Name
   - API Key  
   - API Secret
3. Go to **Settings → Upload → Upload Presets**
4. Click **Add upload preset**
5. Name it exactly: `uniqswek_social`
6. Set **Signing mode**: `Unsigned`
7. Save

**Save these values:**
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

---

### Step 4 — Set Up Google Business Profile API (20 minutes)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project: "UniqSwek Social"
3. Enable the **Business Profile API** (search for it in API Library)
4. Go to **IAM & Admin → Service Accounts → Create Service Account**
   - Name: "social-poster"
   - Role: Owner (for now)
5. Click on the service account → **Keys → Add Key → JSON**
6. Download the JSON file — this is your `GOOGLE_SERVICE_ACCOUNT_JSON`
7. Find your Location Names:
   - Go to [business.google.com](https://business.google.com)
   - Note: your location IDs look like `accounts/123456789/locations/987654321`
   - You can find them via the API Explorer or ask Claude to help

**Save these values:**
- `GOOGLE_SERVICE_ACCOUNT_JSON` — the entire contents of the downloaded JSON file
- `GOOGLE_UES_LOCATION_NAME` — `accounts/{id}/locations/{id}` for UES
- `GOOGLE_RIDGEWOOD_LOCATION_NAME` — `accounts/{id}/locations/{id}` for Ridgewood

---

### Step 5 — Add Secrets to GitHub (5 minutes)

1. Go to your GitHub repo: [github.com/yourusername/brows-and-lashes-website](https://github.com)
2. Click **Settings → Secrets and variables → Actions → New repository secret**
3. Add each of these secrets:

| Secret Name | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard |
| `META_UES_IG_USER_ID` | Step 2 above |
| `META_UES_ACCESS_TOKEN` | Step 2 above |
| `META_RIDGEWOOD_IG_USER_ID` | Step 2 above |
| `META_RIDGEWOOD_ACCESS_TOKEN` | Step 2 above |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Step 4 above (paste entire JSON) |
| `GOOGLE_UES_LOCATION_NAME` | Step 4 above |
| `GOOGLE_RIDGEWOOD_LOCATION_NAME` | Step 4 above |

---

### Step 6 — Test It (5 minutes)

**Local test (dry run):**
```bash
cd ~/brows-and-lashes-website/scripts/social-automation
npm install
node test-connection.mjs    # Check all credentials
DRY_RUN=true node run-daily.mjs ues   # Preview caption without posting
```

**GitHub Actions test:**
1. Push your changes to GitHub
2. Go to **GitHub → Actions → Social Media Auto-Post**
3. Click **Run workflow**
4. Set `dry_run: true` for a preview run
5. Check the output — if captions look good, run again with `dry_run: false`

---

## Ongoing: Adding New Photos

Just drop photos into `content/photos/ues/` or `content/photos/ridgewood/` and push.
The automation picks randomly from whatever's there.

**Best practices:**
- Add 3–5 new photos per week (rotate fresh content)
- Name them descriptively: `brow-threading-april.jpg`, `lash-set-fullset.jpg`
- Include: before/afters, studio shots, service close-ups, team shots

---

## Customizing Captions

Edit `config.mjs` to change:
- `WEEKLY_THEMES` — what service to feature each day
- `HASHTAGS` — the hashtag pools
- `FALLBACK_CAPTIONS` — backup captions if Claude is unavailable

---

## Triggering Manually

From GitHub → Actions → Social Media Auto-Post → Run workflow:
- Choose `ues`, `ridgewood`, or `both`
- Set `dry_run: true` to preview without posting

Or from your terminal:
```bash
cd scripts/social-automation
node run-daily.mjs ues       # Post for UES
node run-daily.mjs ridgewood # Post for Ridgewood
node run-daily.mjs both      # Post for both
```

---

## Costs

| Service | Cost |
|---|---|
| Claude (Haiku model) | ~$0.01 per caption — basically free |
| Cloudinary | Free (up to 25GB storage, 25GB bandwidth/month) |
| Meta Graph API | Free |
| Google Business Profile API | Free |
| GitHub Actions | Free (2,000 minutes/month included) |
| **Total** | **$0/month** (until very high volume) |
