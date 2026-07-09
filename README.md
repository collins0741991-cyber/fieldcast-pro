# FieldCast Pro 🌦️

**Professional outdoor weather dashboard for field workers.**

Multi-model weather forecasting averaged across 5 global weather models, with air quality, pollen, flood warnings, heat stress index, and outdoor safety assessment — all in a privacy-first PWA.

## Features

### Weather
- **5-model averaging** — ECMWF, GFS, ICON, GEM, JMA via [Open-Meteo](https://open-meteo.com)
- **Model agreement score** — confidence percentage based on cross-model variance
- **Model spread visualization** — see how each model disagrees at a glance
- **Hourly forecast** — 12-hour scrollable outlook with temp, rain, wind
- **7-day forecast** — daily highs/lows, conditions, and rain probability
- **Extra metrics** — surface pressure, visibility, dew point
- **Dynamic backgrounds** — gradient + particle effects match current weather
- **Unit toggle** — switch between °C/°F and kph/mph in Settings

### Air Quality & Pollen
- European AQI, PM10, PM2.5, NO₂ via [CAMS](https://www.copernicus.eu/en/access-data/copernicus-services/catalogue/cams-european-air-quality-forecasts)
- Pollen levels for grass, birch, mugwort, olive, and alder

### Safety
- **Safe-to-Work banner** — green/amber/red assessment based on wind, rain, temp, UV, and flood warnings
- **Heat stress index** — WBGT-style calculation with risk levels and safety tips
- **Work conditions checklist** — per-factor breakdown (rain, wind, temp, UV, frost)
- **Flood warnings** — live UK Environment Agency data within 15km
- **UK weather news** — BBC Science & Environment feed (filtered for weather relevance)

### Privacy
- No accounts, no tracking, no analytics
- All data fetched directly from public APIs — no middleman
- Saved locations stored only on-device (localStorage)
- No data sent to any external server beyond the public APIs

## Tech Stack

- **Single-file PWA** — `index.html`, `sw.js`, `manifest.json`
- No build tools, no frameworks, no dependencies
- Vanilla JS + CSS custom properties
- Fonts: Inter (body), Bebas Neue (display), JetBrains Mono (data)
- Service worker with stale-while-revalidate for app shell, network-first for API data
- Installable on iOS/Android/desktop (PWA)

## Data Sources (all free)

| Source | Data | API |
|--------|------|-----|
| Open-Meteo | Weather (5 models) | `api.open-meteo.com` |
| CAMS | Air quality & pollen | `air-quality-api.open-meteo.com` |
| UK Environment Agency | Flood warnings | `environment.data.gov.uk` |
| Postcodes.io | UK postcode lookup | `api.postcodes.io` |
| OpenStreetMap Nominatim | Geocoding | `nominatim.openstreetmap.org` |
| BBC News | Weather news RSS | `feeds.bbci.co.uk` |

## Usage

1. Enter a UK postcode or town name, or tap 📍 for GPS location
2. 8 data sources load automatically (5 weather models + air quality + flood + solar)
3. Swipe between tabs: Weather, Air & Pollen, 7-Day, Safety
4. Tap ⚙️ for Settings (units, animated backgrounds, auto-refresh)
5. Pull down to refresh data on mobile
6. Tap ＋ to save locations for quick access

## License

MIT — free to use, modify, and distribute.

## Contributing

Feedback and suggestions welcome via GitHub Issues.