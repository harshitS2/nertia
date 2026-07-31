# Vnertia.com — Developer Guide

A complete marketing website for **Vnertia** — a growth strategy and performance marketing agency.

Built with **Next.js 14**, **Tailwind CSS v3**, and an **Express.js** backend scaffold.

---

## Project Structure

```
Vnertia.com/
├── frontend/          # Next.js 14 App Router (TypeScript + Tailwind)
└── backend/           # Express.js API scaffold (TypeScript)
```

---

## Quick Start

### 1. Start the Frontend

```bash
cd frontend
npm install        # first time only
npm run dev        # runs at http://localhost:3000
```

### 2. Start the Backend (optional for now)

```bash
cd backend
npm install        # first time only
npm run dev        # runs at http://localhost:4000
```

The contact form will work even without the backend in development — it simulates a successful submission automatically.

---

## Frontend — `frontend/`

### Tech Stack
| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework + routing |
| TypeScript | Type safety |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Scroll animations |
| Lucide React | Icons |
| Axios / Fetch | API calls to backend |

### Folder Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout — fonts, metadata, Navbar, Footer
│   ├── page.tsx         # Home page — composes all sections
│   └── globals.css      # Global styles, Tailwind directives, keyframes
├── components/
│   ├── ui/
│   │   ├── Logo.tsx         # SVG logo (brand-guide accurate)
│   │   ├── Button.tsx       # primary / secondary / ghost variants
│   │   └── SectionLabel.tsx # Eyebrow labels above headings
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky navbar + mobile drawer
│   │   └── Footer.tsx       # Footer with links + BUILD · SCALE · LEAD
│   └── sections/
│       ├── HeroSection.tsx        # Full-viewport hero with animated arc
│       ├── AboutSection.tsx       # Brand story + 3 principles
│       ├── ExpertiseSection.tsx   # 6 service cards (click to expand)
│       ├── HowWeWorkSection.tsx   # 4-step process
│       ├── WhatYouGetSection.tsx  # Value propositions
│       └── ContactSection.tsx     # CTA + contact form
├── lib/
│   └── api.ts           # Fetch wrapper for the Express backend
├── public/
│   └── favicon.svg      # Brand icon (V + arc, dark background)
├── tailwind.config.ts   # Brand tokens as Tailwind theme extensions
└── .env.local           # Local environment variables
```

### Environment Variables (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Backend — `backend/`

### Tech Stack
| Tool | Purpose |
|---|---|
| Express.js | HTTP server |
| TypeScript | Type safety |
| CORS | Cross-origin configuration |
| dotenv | Environment variables |
| ts-node-dev | Hot-reload for dev |

### API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check — confirms server is up |
| POST | `/api/contact` | Contact form submission handler |

### Adding Email / Database Support

Open `backend/src/routes/contact.ts` — you'll find commented-out code snippets for:

- **Nodemailer** (send email notifications)
- **MongoDB** (save to database)
- **Slack webhook** (instant team notifications)

Just uncomment the relevant block, install the package, and add the environment variable.

### Environment Variables (`backend/.env`)

```env
PORT=4000
NODE_ENV=development

# Add when ready:
# MAIL_USER=hello@vnertia.com
# MAIL_PASS=your_app_password
# MONGODB_URI=mongodb+srv://...
# SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

---

## Brand Guide Reference

### Colours
| Name | Hex | Usage |
|---|---|---|
| Teal Primary | `#25C4CB` | CTAs, arc, highlights |
| Teal Dark | `#1A8C96` | Hover states, gradient end |
| Navy | `#0D2326` | Primary background |
| Slate | `#2B5156` | Secondary backgrounds |
| Teal Light | `#94D3D8` | Muted text, soft accents |
| White | `#FFFFFF` | Text on dark backgrounds |

### Logo
The `Logo.tsx` component is hand-coded from the brand guide:
- Arc sweeps from **132° → 308°** (176° open arc, open on the right)
- Arc wraps the **V only** — "nertia" extends as plain typography
- Teal gradient (`#25C4CB → #1A8C96`) on the arc
- All proportions derived from `H = height of the V`

---

## Deployment Notes

1. **Frontend**: Deploy to Vercel — connect the `frontend/` directory
2. **Backend**: Deploy to Railway, Render, or a VPS — connect the `backend/` directory
3. Set `NEXT_PUBLIC_API_URL` in Vercel to point to your live backend URL
4. Add your production domain to `ALLOWED_ORIGINS` in `backend/src/middleware/cors.ts`

---

## Future Improvements

- [ ] Add blog / case studies section
- [ ] Connect contact form to Nodemailer or CRM
- [ ] Add Google Analytics / Posthog
- [ ] Add Open Graph image (`/public/og-image.png`)
- [ ] Add case study pages (`/work/[slug]`)
- [ ] Add a team page
