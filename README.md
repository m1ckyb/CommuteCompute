# Commute Compute

**Smart transit dashboard for Australian commuters**

A free, open-source e-ink dashboard that shows your personalised journey to work — including real-time train/tram/bus departures, walking times, weather, and whether you have time for coffee.

![License](https://img.shields.io/badge/license-AGPL--3.0-blue)
![Platform](https://img.shields.io/badge/platform-Vercel%20%7C%20Render-black)
![Status](https://img.shields.io/badge/status-production-green)

---

## ✨ Features

- **Multi-modal journeys** — Train + Tram + Bus + Walking, all calculated automatically
- **Real-time departures** — Live GTFS-RT data from Transport Victoria
- **SmartCommute™ engine** — Calculates optimal departure time based on your arrival goal
- **CoffeeDecision™** — Tells you if you have time to grab coffee on the way
- **8 Australian states** — Works with fallback timetables even without API keys
- **Zero-config** — No server environment variables needed; all config via Setup Wizard
- **E-ink optimised** — 1-bit rendering for crisp display on TRMNL devices

---

## 🔒 Security

**After deploying, you MUST configure admin authentication:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `ADMIN_PASSWORD` with a strong password:
   ```bash
   openssl rand -base64 24
   ```
3. Redeploy for changes to take effect

**Security features:**

- All `/api/admin/*` endpoints require authentication
- Fail-secure: admin panel disabled if password not configured
- API keys stored in Vercel KV, never in source code
- XSS sanitization on all user input
- Rate limiting on all endpoints
- Security headers (CSP, X-Frame-Options, etc.)

See [DEVELOPMENT-RULES.md](DEVELOPMENT-RULES.md) Section 17 for full security requirements.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     COMMUTE COMPUTE SYSTEM                          │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐  │
│  │ TRMNL OG    │    │ TRMNL Mini  │    │ Kindle (PW3/4/5/11)    │  │
│  │ 800×480     │    │ 600×448     │    │ Various resolutions     │  │
│  │ CCFirm™     │    │ CCFirm™     │    │ KUAL Launcher           │  │
│  └──────┬──────┘    └──────┬──────┘    └───────────┬─────────────┘  │
│         │                  │                       │                │
│         └──────────────────┼───────────────────────┘                │
│                            │                                        │
│                            ▼                                        │
│              ┌─────────────────────────────┐                        │
│              │   Your Vercel/Render Server │                        │
│              │   (Zero-Config Serverless)  │                        │
│              └──────────────┬──────────────┘                        │
│                             │                                       │
│              ┌──────────────┼──────────────┐                        │
│              ▼              ▼              ▼                        │
│    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│    │ Transport   │  │ BOM Weather │  │ Google      │               │
│    │ Victoria    │  │ (Free)      │  │ Places      │               │
│    │ OpenData    │  │             │  │ (Optional)  │               │
│    └─────────────┘  └─────────────┘  └─────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Supported Devices

| Device | Resolution | Status | Firmware |
|--------|------------|--------|----------|
| TRMNL OG | 800×480 | ✅ Primary | CCFirm™ 7.1.0 |
| TRMNL Mini | 600×448 | ✅ Supported | CCFirm™ 7.1.0 |
| Kindle PW3 | 1072×1448 | ✅ Supported | KUAL Launcher |
| Kindle PW4 | 1072×1448 | ✅ Supported | KUAL Launcher |
| Kindle PW5 | 1236×1648 | ✅ Supported | KUAL Launcher |
| Kindle 11 | 1072×1448 | ✅ Supported | KUAL Launcher |

> ⚠️ **TRMNL devices require CCFirm™ custom firmware.**
> Do NOT use stock TRMNL firmware — it connects to usetrmnl.com, not your server.
> See [DEVELOPMENT-RULES.md](DEVELOPMENT-RULES.md) Section 5 for flashing instructions.

---

## 🚀 Quick Start

### 1. Fork & Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/angusbergman17-cpu/CommuteCompute)

Or deploy to Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### 2. Configure Security

In your hosting dashboard, set environment variable:
```
ADMIN_PASSWORD = [your strong password]
```

### 3. Run Setup Wizard

Visit `https://your-app.vercel.app/setup-wizard.html` and configure:
- Home & work addresses
- Preferred cafe
- Transit API key (optional — works without it)

### 4. Flash Your Device

For TRMNL devices:
```bash
cd firmware
pio run -e ccfirm-trmnl-7.1.0 -t upload
```

---

## 🎨 CCDash™ V12 Dashboard Layout

The dashboard displays your complete journey at a glance:

```
┌────────────────────────────────────────────────────────────────────────┐
│ HEADER (0-94px)                                                        │
│ [Location]  [Time 12hr] [AM/PM]  [Day Date]         [Weather]          │
├────────────────────────────────────────────────────────────────────────┤
│ SUMMARY BAR (96-124px)                                                 │
│ LEAVE NOW → Arrive 7:25                                        65min   │
├────────────────────────────────────────────────────────────────────────┤
│ JOURNEY LEGS (132-448px)                                               │
│ ● 🚶 Walk to stop                                              5 MIN   │
│ │                                                                      │
│ ● ☕ Coffee at Norman's                                        8 MIN   │
│ │                                                                      │
│ ● 🚆 Train to Flinders                                        12 MIN   │
│ │                                                                      │
│ ● 🚶 Walk to work                                              6 MIN   │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER (448-480px)                                                     │
│ ⚡ Live                              Updated 7:05am                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/screen` | Full dashboard PNG (800×480) |
| `/api/zones` | Zone-based partial refresh |
| `/api/zonedata` | JSON zone data |
| `/api/livedash` | CC LiveDash multi-device renderer |
| `/api/health` | Health check |
| `/api/status` | System status |

### Admin Endpoints (Require Authentication)

| Endpoint | Description |
|----------|-------------|
| `/api/admin/preferences` | Get/set user preferences |
| `/api/admin/generate-webhook` | Generate device webhook URL |
| `/api/admin/reset` | Reset configuration |

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [DEVELOPMENT-RULES.md](DEVELOPMENT-RULES.md) | **MANDATORY** — All development rules |
| [INSTALL.md](INSTALL.md) | Complete deployment guide |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | User setup guide |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [LICENSING.md](LICENSING.md) | Licensing information |

---

## 📜 Licence

**Dual Licence:**

- **Open Source:** [AGPL-3.0](LICENCE-AGPL-3.0.md) — Free for non-commercial use
- **Commercial:** Contact [commutecompute.licensing@gmail.com](mailto:commutecompute.licensing@gmail.com)

See [LICENSING.md](LICENSING.md) for full details.

---

## 🙏 Attribution

This project uses data from:

- **Transport Victoria** — GTFS & GTFS-RT data
- **Bureau of Meteorology** — Weather data
- **OpenStreetMap** — Geocoding fallback

See [ATTRIBUTION.md](ATTRIBUTION.md) for full attribution details.

---

## 💖 Support

If you find this project useful:

- ⭐ Star this repository
- 🐛 Report bugs via [Issues](https://github.com/angusbergman17-cpu/CommuteCompute/issues)
- 💡 Suggest features via [Discussions](https://github.com/angusbergman17-cpu/CommuteCompute/discussions)

---

**Copyright © 2026 Angus Bergman. All rights reserved.**

Commute Compute™, CCDash™, CCFirm™, SmartCommute™, and CoffeeDecision™ are trademarks of Angus Bergman.
