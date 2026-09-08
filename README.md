# Career Path Recommendation System

A full-stack web app that helps Indian students and freshers identify suitable career paths based on their skills, education, and experience.

---

## Prerequisites

Make sure you have the following installed before starting:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

## Project Structure

```
pbl/
├── backend/    ← Express.js REST API (runs on port 4000)
└── frontend/   ← Next.js web app (runs on port 3003)
```

---

## Setup & Running

You need **two terminals open at the same time** — one for the backend and one for the frontend.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

You should see: `Backend running on http://localhost:4000`

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

You should see something like: `Local: http://localhost:3003`

---

## Open the App

Once both servers are running, open your browser and go to:

```
http://localhost:3003
```

---

## Using the App

1. **Landing page** — click **Get Started** to create an account
2. **Sign up** — enter your name, email, and password
3. **Onboarding** — complete the 6-step wizard:
   - Personal info (name, age)
   - Education level
   - State and city
   - Your skills (type and press Enter to add tags)
   - Experience type (theoretical or practical)
   - Project details *(only if you selected practical)*
4. **Career Dashboard** — view your AI-recommended career path, skill gaps, learning roadmap, and related roles
5. **Jobs Dashboard** — browse job listings filtered to your recommended role; upload your resume PDF to extract skills automatically
6. **Logout** — click the logout button in the sidebar

---

## Environment Variables

Both folders already include the required environment files for local development. No changes needed to run locally.

| File | Purpose |
|---|---|
| `backend/.env` | Backend port, JWT secret, database path |
| `frontend/.env.local` | Backend API URL for the frontend to connect to |

---

## Stopping the Servers

Press `Ctrl + C` in each terminal to stop the backend and frontend.
