# FitLog Assignment

FitLog is a workout library and lightweight training planner. Browse exercises, review their instructions, and build a daily plan that stays saved in your browser.

## Project Links

- **Live app:** [fitlog-workout-27.netlify.app](https://fitlog-workout-27.netlify.app/)
- **GitHub repository:** [brinto-swe/fit-log](https://github.com/brinto-swe/fit-log)

## Technologies

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- DaisyUI 5
- React Toastify
- React Icons
- FitLog Workout API

## Key Features

1. **Workout library** — Browse workouts with images, muscle groups, equipment, duration, calories, and ratings.
2. **Workout detail pages** — Open each exercise at its own dynamic route to view stats and step-by-step instructions.
3. **Daily workout plan** — Add up to five exercises, remove or complete them, and see total exercises, minutes, and calories.
4. **Saved workouts** — Save exercises for later and manage them from the Saved tab.
5. **Persistent, responsive experience** — Plan and saved workouts persist in browser storage, with toast notifications and layouts designed for mobile and desktop.

## Getting Started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use FitLog.

## Routes

- `/` — Workout banner and library
- `/my-plan` — Daily plan and saved workouts
- `/workouts/[id]` — Details for a workout

## Scripts

```bash
npm run dev     # Start the development server
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run start   # Run the production server
```
