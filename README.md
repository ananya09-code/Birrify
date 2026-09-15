# 🇪🇹 Birrify

Compare Ethiopian bank foreign-exchange rates in one place.

Birrify scrapes buy/sell rates from Ethiopian banks every day, stores them in Postgres, and serves them through a FastAPI backend to a React dashboard — so users don't have to check each bank's website individually.

**Live app:** https://birrify.vercel.app

---

## Contents

- [How it's built](#how-its-built)
- [Features](#features)
- [Supported banks & currencies](#supported-banks--currencies)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Backend](#1-backend-api)
  - [Frontend](#2-frontend)
  - [Scraper](#3-scraper-optional)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
- [Data pipeline](#data-pipeline)
- [Deployment](#deployment)
- [Known gaps / notes for contributors](#known-gaps--notes-for-contributors)
- [Roadmap](#roadmap)
- [License](#license)

---

## How it's built

Birrify is a monorepo with three independently deployable pieces:

```
Scraper (Playwright)  →  Postgres  →  FastAPI backend  →  React frontend
   daily cron job          (Neon)      (Render)             (Vercel)
```

1. **`scraper/`** visits each bank's site/rate page with Playwright, parses buy/sell rates for supported currencies, and writes them to Postgres. It runs on a schedule via GitHub Actions (`.github/workflows/main.yml`, daily at 00:00 UTC), and can also run as a standalone Render web service.
2. **`backend/`** is a FastAPI app that reads from Postgres and exposes both an internal API (used by the dashboard) and a versioned public API (`/api/v1/...`) intended for external developers.
3. **`apps/web/`** is a React + TanStack Router dashboard that consumes the backend API and renders rates, comparisons, history charts, and a currency converter.

---

## Features

Based on the routes actually implemented in `apps/web/src/routes`:

- Dashboard overview of current market rates
- Bank-by-bank rate comparison, including a per-bank detail page
- Currency converter using live market averages
- Historical rate charts (7D / 30D / 90D / 1Y)
- A dedicated "Compare" view across banks
- A "Developers" page exposing the public API
- Multi-currency support (USD, EUR, GBP, AED, SAR)
- Public, versioned developer API (`/api/v1`) separate from the internal dashboard API

> Note: an `Alerts` route and a `stockmarket` route also exist in the codebase but aren't mentioned in the previous README — worth confirming whether they're finished, in progress, or experimental before documenting them publicly.

---

## Supported banks & currencies

**Currencies:** USD, EUR, GBP, AED, SAR (base currency: ETB)

**Banks** (from `scraper/app/services/`, 23 total — considerably more than the previous README's list of 7):

Abay Bank, Abyssinia Bank, Addis International Bank, Ahadu Bank, Amhara Bank, Awash Bank, Berhan Bank, Bunna Bank, Commercial Bank of Ethiopia, Cooperative Bank of Oromia, Dashen Bank, Development Bank of Ethiopia, Enat Bank, Gadaa Bank, Global Bank Ethiopia, Goh Betoch Bank, Hibret Bank, Hijra Bank, Nib International Bank, Oromia Bank, Rammis Bank, Siinqee Bank, Wegagen Bank, Zemen Bank

---

## Project structure

```
Birrify/
├── .github/workflows/
│   └── main.yml              # Daily scraper cron (GitHub Actions)
│
├── apps/web/                 # Frontend — React + Vite + TanStack Router
│   ├── src/
│   │   ├── routes/           # File-based routes (dashboard, banks, compare, history, ...)
│   │   ├── services/         # API client functions (fetch wrappers per resource)
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   ├── vercel.json
│   └── package.json
│
├── backend/                  # API — FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/       # Internal API used by the dashboard
│   │   │   │   ├── banks.py, rates.py, history.py, compare.py,
│   │   │   │   │   market.py, meta.py, info.py, common.py
│   │   │   ├── v1/           # Public, versioned developer API
│   │   │   │   ├── banks.py, rates.py, history.py
│   │   │   └── main.py
│   │   └── db/
│   │       ├── database.py   # SQLAlchemy engine/session (reads DATABASE_URL)
│   │       └── model.py      # Bank, Rate models
│   ├── pyproject.toml / requirements.txt
│
├── scraper/                  # Data collection — Playwright
│   ├── app/
│   │   ├── services/         # One scraper module per bank (23 files)
│   │   ├── db/                # DB models + insert logic for the scraper process
│   ├── scripts/run_daily.py  # Entry point used by the GitHub Actions workflow
│   └── render.yaml           # Optional Render deployment for the scraper/API
│
└── README.md
```

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 19, Vite, TypeScript, TanStack Router, TanStack Query, Tailwind CSS v4, Recharts, Radix-style primitives via `@base-ui/react`, `lucide-react` |
| Backend | FastAPI, SQLAlchemy 2.x, Pydantic, Uvicorn |
| Database | PostgreSQL (hosted on Neon) |
| Scraper | Playwright, BeautifulSoup/lxml, pandas |
| CI / Scheduling | GitHub Actions (daily scrape) |
| Hosting | Vercel (frontend), Render (backend / scraper) |

---

## Getting started

### Prerequisites

- Node.js 20+ and [pnpm](https://pnpm.io) (the frontend ships a `pnpm-lock.yaml`)
- Python 3.11+ for the scraper, Python 3.14+ if you use the backend's `uv`-managed environment (see `backend/pyproject.toml`)
- A PostgreSQL database (Neon or local)

```bash
git clone https://github.com/ananya09-code/Birrify.git
cd Birrify
```

### 1. Backend (API)

```bash
cd backend

# Using uv (matches pyproject.toml / uv.lock)
uv sync
uv run uvicorn app.main:app --reload

# — or, using plain pip —
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API needs a `DATABASE_URL` — see [Environment variables](#environment-variables). It starts on `http://127.0.0.1:8000` by default; `GET /health` returns `{"status": "ok"}` once it's up.

### 2. Frontend

```bash
cd apps/web
pnpm install
pnpm dev
```

Set `VITE_API_URL` to point at your backend (see below). Vite serves the dashboard at `http://localhost:5173` by default.

### 3. Scraper (optional)

Only needed if you want to populate the database yourself rather than pointing at an existing one.

```bash
cd scraper
pip install -r requirements.txt
python -m playwright install
python scripts/run_daily.py
```

In CI this runs headless under `xvfb-run` (see `.github/workflows/main.yml`); locally, Playwright's normal browser install is usually enough.

---

## Environment variables

| Variable | Used by | Description |
|---|---|---|
| `DATABASE_URL` | `backend`, `scraper` | Postgres connection string. Required — the backend raises on startup if it's missing. |
| `VITE_API_URL` | `apps/web` | Base URL of the backend API. Several service files fall back to `http://localhost:8000` or `http://127.0.0.1:8000` if unset — worth standardizing on one. |

There's currently no `.env.example` committed in either `backend/` or `apps/web/` — adding one would make onboarding noticeably smoother.

---

## API reference

### Internal API (used by the dashboard)

| Endpoint | Description |
|---|---|
| `GET /api/banks` | All banks with their latest rates for a given currency (or `all`) |
| `GET /api/banks/{bank_id}` | Latest rates for a single bank |
| `GET /api/banks/{bank_id}/history` | A bank's rate history for a period (`7D`/`30D`/`90D`/`1Y`) |
| `GET /api/rates` | Paginated rates, filterable by `date`, `currency`, `page`, `per_page` |
| `GET /api/history` | Aggregate market history for a currency and period |
| `GET /api/compare` | Cross-bank comparison for a currency and date |
| `GET /api/market` | Market summary (average/lowest/highest buy & sell) for a currency and date |
| `GET /api/market/all` | Market summary for every currency on a given date |
| `GET /api/meta` | Distinct currencies and bank names currently in the database |
| `GET /api/info` | Currencies, banks, and supported history periods in one payload |
| `GET /health` | Liveness check |

### Public developer API (versioned)

| Endpoint | Description |
|---|---|
| `GET /api/v1/rates` | List rates |
| `GET /api/v1/rates/{currency}` | Rates for a currency |
| `GET /api/v1/rates/{currency}/{bank_id}` | A specific bank's rate for a currency |
| `GET /api/v1/banks` | List banks |
| `GET /api/v1/banks/{bank_id}` | A single bank |
| `GET /api/v1/banks/{bank_id}/rates` | A bank's rates |
| `GET /api/v1/history/{currency}` | History for a currency |

Interactive docs (Swagger UI) are available at `/docs` on whichever host is running the FastAPI app, courtesy of FastAPI's default OpenAPI integration.

---

## Data pipeline

1. GitHub Actions triggers `scraper/scripts/run_daily.py` once a day (`cron: "0 0 * * *"`), or on manual `workflow_dispatch`.
2. Each module in `scraper/app/services/` (one per bank) uses Playwright to load that bank's rate page and parse buy/sell values.
3. Parsed rates are written to the `rates` table (`backend/app/db/model.py`: `Bank` ↔ `Rate`, one row per bank/currency/timestamp).
4. The FastAPI backend queries the same database on demand — there's no separate caching layer, so API responses reflect whatever the scraper last wrote.
5. The frontend calls the internal API (`/api/...`) directly; the `/api/v1/...` surface exists for external consumers and isn't currently used by the dashboard itself.

---

## Deployment

- **Frontend** — Vercel, configured via `apps/web/vercel.json` (SPA rewrite to `index.html`).
- **Backend / scraper** — Render. `scraper/render.yaml` defines a web service (`brrify-api`) that installs `scraper/requirements.txt` and runs `uvicorn app.main:app`. There's no equivalent `render.yaml` under `backend/`, so double check which service definition is actually the one deployed in production.
- **Scraping cadence** — handled by the GitHub Actions workflow rather than a cron job on the host, which keeps the run history and logs visible in the Actions tab.

---

## Roadmap

- [ ] Expand currency and bank coverage further
- [ ] Add authentication + API keys for the public `/api/v1` surface
- [ ] Add automated tests for scraper parsing logic (bank sites change layout without warning)
- [ ] Add a `.env.example` for both `backend/` and `apps/web/`
- [ ] Add a license


---

## Author

Built by **Ananya Mengistu** — frontend-focused full-stack developer.

Suggestions and contributions are welcome via issues or pull requests.
