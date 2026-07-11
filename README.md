# Ireland for International Students

A full-stack site helping international students moving to Ireland: visas & IRP registration, accommodation, health/insurance, banking, transport, work, neighbourhood guides with safety ratings, news & updates, and a moderated community experiences section.

Stack: React (Vite) + Tailwind + Framer Motion + React Three Fiber on the client; Node/Express + MongoDB (Mongoose) on the server.

## Prerequisites

- Node.js 18+ and npm
- MongoDB running locally on `mongodb://127.0.0.1:27017` (or update `MONGODB_URI`)
- (Optional, for live news) a free API key from [newsapi.org](https://newsapi.org)

## Setup

```bash
npm run install:all
```

This installs dependencies in `server/` and `client/`.

### Server environment

Copy `server/.env.example` to `server/.env` and fill in your own values (a random `JWT_SECRET`, and an `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` for the seeded admin account). `server/.env` is gitignored - never commit it. Add a `NEWS_API_KEY` to enable live news fetching (the site works fine without one - it falls back to cached/reference articles).

### Email notifications (optional)

To get an email whenever new feedback or a community story is submitted:

1. Enable [2-Step Verification](https://myaccount.google.com/security) on the Gmail account you want to send from.
2. Generate an [App Password](https://myaccount.google.com/apppasswords) (choose "Mail" as the app).
3. Set in `server/.env`: `GMAIL_USER` (that Gmail address), `GMAIL_APP_PASSWORD` (the 16-character app password, not your normal password), and optionally `ADMIN_NOTIFICATION_EMAIL` if you want notifications sent somewhere other than `GMAIL_USER`. Set `PUBLIC_APP_URL` to your live site URL so the email links go to the right place.

Without these set, the site works exactly the same - it just skips sending notifications (logged as a warning, not an error).

### Seed the database

```bash
npm run seed
```

Populates the admin account, all 61 guide topics across the 12 content categories, 5 sample neighbourhoods, fallback news articles, and a few sample approved community submissions.

### Run both apps

```bash
npm run dev
```

- Client: http://localhost:5173
- Server API: http://localhost:5000/api
- Admin dashboard: http://localhost:5173/admin/login

## Deployment

Three pieces need to be hosted separately: the database, the API, and the frontend.

### 1. Database — MongoDB Atlas (free tier)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and a free M0 cluster.
2. Under **Database Access**, create a database user with a password.
3. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) - simplest for a free-tier hobby project.
4. Get your connection string (**Connect → Drivers**), e.g. `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ie-students`.

### 2. Backend — Render (free tier)

1. Create an account at [render.com](https://render.com) and connect your GitHub account.
2. **New → Web Service**, pick this repo.
3. Root directory: `server`. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables: `MONGODB_URI` (from Atlas), `JWT_SECRET` (any long random string), `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`, `NEWS_API_KEY` (optional), `CLIENT_ORIGIN` (your frontend URL from step 3 below - you can update this after deploying the frontend).
5. Deploy. Once live, open the **Shell** tab on the service and run `npm run seed` once to populate the database.

### 3. Frontend — Vercel (free tier)

1. Create an account at [vercel.com](https://vercel.com) and import this repo.
2. Root directory: `client`. Framework preset: Vite (auto-detected). Build command/output are auto-filled.
3. Add environment variable `VITE_API_BASE_URL` set to your Render backend URL + `/api` (e.g. `https://your-app.onrender.com/api`).
4. Deploy. Then go back to Render and update `CLIENT_ORIGIN` to your new Vercel URL, so the API accepts requests from it.

`client/vercel.json` already handles client-side routing so deep links (e.g. `/guides/visa-immigration`) work on refresh.

## Project structure

```
server/   Express API, Mongoose models, news-fetch service, seed scripts
client/   React app (Vite), Tailwind styling, Framer Motion + R3F homepage
```

See `server/src` and `client/src` for the full breakdown (models, routes, controllers, pages, components).
