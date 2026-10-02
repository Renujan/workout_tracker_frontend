# ProgressX — Modern Premium Fitness Progress Tracking Frontend

ProgressX is a high-performance, mobile-first React + TypeScript fitness application engineered for tracking workouts, exercises, strength progression, personal records, protein intake, body composition, goals, achievements, and training insights.

---

## 🚀 Key Features

* **Dashboard**: Personalized welcome ("Good morning, Renujan 👋"), active 12-day streak 🔥 indicator, today's workout spotlight card, responsive metric cards (Body Weight, Protein, Workouts, Volume), 8-week Bench Press strength chart, personal record celebration card, muscle group volume analytics, and habit consistency scoring.
* **Gym-Optimized Active Workout**: Real-time timer, set-by-set weight and rep controls (+/- step adjustments), set completion checkmarks with celebratory feedback, dynamic rest timer trigger, and session completion summary.
* **Signature UX Session Comparison**: Side-by-side comparison of current workout vs last session (+2.5 kg overload & +20 kg volume diff visual feedback).
* **Rest Timer Widget**: Circular progress ring (01:32) with +30s, -30s, and skip controls.
* **Exercise Library & Detail**: Searchable library with muscle group, equipment, and difficulty filtering, alongside detailed exercise views featuring estimated 1RM, volume bests, personal records, and historical progression graphs.
* **Workout History**: Detailed log of past completed sessions with volume, set counts, and workout category filters.
* **Analytics & Progress**: Interactive Recharts graphs for strength growth, weekly volume, body weight trajectory, and workout frequency.
* **Nutrition & Protein Tracker**: Daily protein target circular meter (92 / 120 g, 77%), calories, carbs, fat, water tracking, food log by meal category, food logger modal, and weekly protein consistency chart.
* **Body Progress**: Body weight, fat percentage, body part measurement tracking (chest, arms, waist, thighs), measurement logging modal, and visual progress photo gallery.
* **Goals & Achievements**: Goal progress bars with target deadlines, locked vs unlocked achievement badges with glow animations.
* **Fitness Insights**: Informational cards analyzing progressive overload trends, nutrition consistency, and volume growth.
* **Profile & Settings**: Account overview, lifetime statistics, theme preferences, weight unit toggle (kg / lb), distance unit toggle (km / miles), and rest timer configuration.

---

## 🛠️ Technology Stack

* **Core**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS (Sophisticated Dark Mode: Background `#09090B`, Surface `#18181B`, Elevated `#202023`, Electric Lime / Green Accents `#22c55e` / `#84cc16`)
* **Icons & Animation**: Lucide React, Framer Motion
* **Charts**: Recharts
* **Routing**: React Router v7

---

## 🗺️ Application Routes

| Route | Page | Purpose |
|---|---|---|
| `/dashboard` | Dashboard | Hero streak, metrics, today's workout, strength graph, PR spotlight |
| `/workout` | Workout Overview | Today's routine, workout plans, past sessions |
| `/workout/active` | Active Workout | Gym-optimized live set logger & rest timer |
| `/exercises` | Exercise Library | Searchable database with muscle & equipment filters |
| `/exercises/:id` | Exercise Detail | 1RM max, volume bests, exercise progression chart |
| `/history` | Workout History | Calendar & detailed logs of past completed workouts |
| `/progress` | Progress Analytics | Multi-chart dashboard (strength, volume, body weight) |
| `/records` | Personal Records | Hall of Fame PR trophies and improvement metrics |
| `/nutrition` | Nutrition & Macros | Protein target circular progress, macros, food logger |
| `/body` | Body Progress | Weight trends, body part measurements & progress photos |
| `/goals` | Fitness Goals | Target goal cards and milestone progress bars |
| `/achievements` | Achievements | Badges & trophy unlocks |
| `/insights` | Fitness Insights | Data-driven training & nutrition insights |
| `/profile` | Profile | Account stats, lifetime volume, training history |
| `/settings` | Settings | Unit toggle (kg/lb), dark/light appearance, rest timer settings |

---

## 🔌 Django REST Framework (DRF) Ready Service Layer

The frontend is structured with an API-ready service layer (`src/services/`):
- `workoutService.ts`
- `exerciseService.ts`
- `nutritionService.ts`
- `progressService.ts`
- `userService.ts`

These modules expose async promise-based interfaces operating on centralized mock data in `src/data/mockData.ts`, enabling seamless wiring to a Django REST Framework backend API in future phases.

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```