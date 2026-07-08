# CleanAir Prayagraj

**Municipal air-pollution hotspot console** — built for **Track 2: CleanAir &
Clear Streets**, *Build with AI: Code for Communities* (Google Cloud ×
Hack2Skill), scoped to Prayagraj, Uttar Pradesh.

> Live pilot pathway: solutions in this hackathon are eligible for deployment
> with the sponsoring MP's office. This submission is scoped for Prayagraj.

---

## The Problem

City-wide air quality monitors miss hyper-local pollution events — a garbage
dump fire, an industrial cluster, a smog trap at a busy junction — because
local authorities can't have eyes on every street. These pockets go unnoticed
while directly harming nearby residents. Prayagraj's 2026 annual AQI has
averaged ~153 (unhealthy for sensitive groups), with 0% of days meeting WHO
safe limits.

## The Solution

A live console covering **~45 monitoring points** across Prayagraj that:

1. **Detects hotspots by anomaly, not absolute threshold** — each station is
   compared against its *own* rolling 24h baseline via z-score, not a
   city-wide average. This is what actually catches a hyper-local event: a
   station reading 3× its normal evening level is a hotspot even if it's
   still numerically lower than a busy market's typical AQI.
2. **Forecasts 24 hours ahead per station** — blending short-term trend with
   historical time-of-day patterns, not a flat extrapolation.
3. **Accepts citizen photo reports with location** — geotagged via the
   browser's GPS (or a tap-to-pick fallback), analyzed by Gemini multimodal
   for smoke/dust/severity.
4. **Closes the loop with dispatch** — a one-click "Dispatch Alert" per
   hotspot creates a timestamped, logged municipal action, mapped to a
   station-type-specific response (industrial → inspection team, market →
   water-mist cannon, residential → health advisory).

## Screenshots

*(add your captured screenshots here before submitting — see deck for which
views to capture: full dashboard, hotspot popup, forecast modal, satellite
layer, citizen photo report, dispatch log)*

## Running Locally

```bash
git clone https://github.com/<your-username>/cleanair-prayagraj.git
cd cleanair-prayagraj
npm install
cp .env.example .env   # optional: add GEMINI_API_KEY for real photo analysis
npm run dev            # or: npx tsx server.ts
```

Open `http://localhost:3000`.

## ⚠️ Data Disclosure

**Station readings are seeded/simulated for this demo.** Station *locations*
are real Prayagraj geography (Naini, Phaphamau, Katra Market, Civil Lines,
Allahabad Junction, Jhunsi, and ~39 additional neighbourhood-level points);
AQI/PM2.5 values are synthetically generated with a realistic diurnal pattern
and two injected hotspot events, since live CPCB/WAQI credentials weren't
available during the hackathon build window. This is disclosed in-app via a
visible badge, not hidden.

**Real-data integration path** (no architecture changes needed — the
detection/forecasting logic is written against the same data schema either
way):

| Component | Current (demo) | Production |
|---|---|---|
| Station readings | Synthetic generator | CPCB station API / WAQI API |
| Weather | Not modeled | IMD API (rain/wind materially affect PM2.5 — see note below) |
| Satellite imagery | Esri basemap (visual only) | Google Earth Engine — real smoke/haze plume detection |
| Cross-referencing | None | BigQuery, joined with Census/CPCB datasets |
| Photo analysis | Gemini API (real) with labeled offline fallback | Same — production-ready as-is |

## Tech Stack

- **Backend:** Node.js / Express / TypeScript
- **Frontend:** Vanilla JS + Leaflet.js (map) + Chart.js (forecast charts) —
  self-hosted, zero external CDN dependency for reliability in low-connectivity
  deployment
- **AI:** Gemini multimodal (`gemini-2.5-flash`) for citizen photo analysis
- **Deployment:** Single Dockerfile, deploys to Cloud Run in one command

## API Endpoints

- `GET /api/stations` — all monitoring points + latest reading
- `GET /api/history/<id>` / `GET /api/forecast/<id>` — per-station history + 24h forecast
- `GET /api/hotspots` — ranked anomaly-detected hotspots + recommended actions
- `POST /api/analyze-photo` — citizen photo + lat/lng → Gemini analysis, saved as a map pin
- `GET /api/citizen-reports` — all submitted citizen reports
- `POST /api/dispatch-alert` / `GET /api/dispatch-log` — municipal action logging

## Judging Rubric Alignment

| Criterion | Weight | How this addresses it |
|---|---|---|
| Problem-Solution Fit | 20% | Own-baseline anomaly detection directly targets "hyper-local events invisible to city-wide monitors" |
| AI/Technical Execution | 25% | Real z-score anomaly detection, real trend+diurnal forecasting, real Gemini multimodal photo analysis |
| Deployability & Scalability | 25% | No CDN dependency, one Dockerfile, one-command Cloud Run deploy, documented real-data swap path |
| Inclusivity & Accessibility | 15% | Citizen photo reporting requires no literacy or dashboard access — just a camera |
| Impact Potential | 10% | Scoped to ~45 points across Prayagraj, mapped to real municipal response actions |
| Presentation & Clarity | 5% | Plain-language recommended actions, readable by a non-technical MP's office in minutes |
