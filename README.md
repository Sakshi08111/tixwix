# Tixwix — React Starter

A modern, responsive React + Vite front-end starter for the Tixwix event discovery and ticketing marketplace.

## Included pages

- Home
- Explore Events (search, category and price filters)
- Categories
- Cities
- About Tixwix
- Contact
- Login / Create Account UI
- Create Event form UI

The project has separate JSX and CSS files for each page, plus reusable Navbar, Footer and EventCard components. A shared data file contains demo event listings and categories.

## Tech stack

- React
- Vite
- React Router
- Lucide React icons
- Plain CSS (no Tailwind dependency)

## Run locally

Install Node.js (Node 20+ recommended), then from this folder:

```bash
npm install
npm run dev
```

Vite will print a local development URL, usually `http://localhost:5173`.

Create a production build:

```bash
npm run build
npm run preview
```

## Design system

- Jet Black: `#0A0A0A` / page background `#08090D`
- Cerulean Blue: `#007BA7`
- Neon Rose: `#FF2D95`
- Typography: Space Grotesk + DM Sans (Google Fonts)

## Before launch

This is a front-end starter, not a production ticketing system. Demo event listings are illustrative. Login, account creation, event submission, newsletter subscription and contact submission are demo-only and do not send or persist data. Event-card save/detail actions are placeholders. Before accepting real users or payments, connect a backend, database, authentication, payment gateway, email/notification service, QR ticket generation and validation, refund workflows, and organizer settlement logic. Review legal, privacy and refund requirements as well.

Some event photography is loaded from Unsplash image URLs, so the browser needs an internet connection to show those images. Replace these with approved local assets before production if preferred.
