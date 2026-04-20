# MockMate

Live technical interview coach that watches how you think, not just what you submit.

## Core Features

- Live AI nudges during coding
- Keystroke heatmap (hesitation zones)
- Timed interview simulation
- Full postmortem on submit (scored across approach, complexity, edge cases, communication)
- Session history + delete
- Patterns dashboard (score trend + recurring weaknesses)

## Tech Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Monaco Editor
- Recharts
- Firebase (Auth + Firestore)
- OpenAI API (server-side `/api/nudge` and `/api/postmortem`)
- Vercel (recommended)

## Setup

```bash
npm install
cp .env.example .env
# Fill Firebase values + OPENAI_API_KEY
npm run dev
```

Then:

1. Login / Signup
2. Go to Dashboard and click "Seed Problems" (one-time)
3. Practice → start a session → submit → review

## Environment Variables

Required in `.env` (local) and in Vercel project settings (production):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `OPENAI_API_KEY`

## Notes

- After applying strict Firestore rules, seeding will no longer work (by design). Seed first.
- For deployment, add your Vercel domain to Firebase Auth → Authorized domains.
