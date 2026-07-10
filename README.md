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

`server/.env` is already created for local dev with a random `JWT_SECRET` and a seeded admin account:

- Email: `admin@iestudents.local`
- Password: `ChangeMe123!`

Change `ADMIN_SEED_PASSWORD` before reseeding if you want a different password, and add a `NEWS_API_KEY` to enable live news fetching (the site works fine without one - it falls back to cached/reference articles).

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

## Project structure

```
server/   Express API, Mongoose models, news-fetch service, seed scripts
client/   React app (Vite), Tailwind styling, Framer Motion + R3F homepage
```

See `server/src` and `client/src` for the full breakdown (models, routes, controllers, pages, components).
