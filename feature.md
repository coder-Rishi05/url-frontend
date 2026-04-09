# URL Shortener — Frontend Features File
> **Purpose:** Give this file to any AI assistant along with your current resume to generate strong, accurate resume bullet points for the URL Shortener frontend.
> **Developer:** Rishabh Singh | rawatrishi3@gmail.com | github.com/coder-Rishi05

---

## RESUME ENTRY HEADER (copy-paste ready)

**URL Shortener** — Frontend | React.js, React Router v6, Axios, Tailwind CSS, DaisyUI, Context API, Framer Motion | [Live Demo](https://url-frontend-fhzz.onrender.com)

---

## TECH STACK

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | SPA frontend — fast dev build, optimized production bundle |
| React Router v6 | Client-side routing with protected and admin-only route guards |
| Axios | API calls with `withCredentials: true` for httpOnly cookie auth |
| Tailwind CSS + DaisyUI | Utility-first styling with pre-built accessible component classes |
| Context API | Global state management — auth state + theme preference |
| Framer Motion | Animation library — hero transitions, card hover effects, scroll reveals |
| react-hot-toast | Non-blocking toast notifications for all user actions |

---

## FRONTEND FILE STRUCTURE

```
src/
├── admin/
│   ├── AdminBoard.jsx          ← Tabbed admin dashboard (Overview, Users, URLs, Credit Requests)
│   ├── AdminCreditReqs.jsx     ← Credit request list with approve action + skeleton loading
│   ├── AdminUrls.jsx           ← All platform URLs with delete (inactive only) + skeleton loading
│   └── AdminUsers.jsx          ← User cards with role/status toggle, credit input + skeleton loading
├── api/
│   └── axios.js                ← Axios instance with baseURL from env + withCredentials: true
├── components/
│   ├── NavBar/
│   │   └── Navbar.jsx          ← Responsive navbar with credit badge, theme toggle, avatar dropdown
│   ├── auth/
│   │   ├── AdminRoute.jsx      ← Route guard: unauthenticated → /login, non-admin → /dashboard
│   │   └── ProtectedRoute.jsx  ← Route guard: unauthenticated → /login
│   ├── ui/
│   │   ├── Button.jsx          ← Reusable button with disabled state + DaisyUI class composition
│   │   ├── Card.jsx            ← Reusable card wrapper with base styling
│   │   ├── Home.jsx            ← Landing page: hero, features grid, how-it-works, pricing, footer
│   │   ├── Input.jsx           ← Reusable labeled input with error state + accessible htmlFor
│   │   └── Spinner.jsx         ← Configurable loading spinner (sm/md/lg, fullScreen mode)
│   ├── CreateUrl.jsx           ← URL creation form with credit check + generated short URL display
│   └── UrlTable.jsx            ← User URL table with copy-to-clipboard + deactivate action
├── context/
│   ├── AuthContext.jsx         ← Auth state, login, logout, refreshUser — session restored on load
│   └── ThemeContext.jsx        ← Theme toggle (forest/silk) persisted in localStorage
├── lib/
│   └── api.js                  ← All API calls organized by domain: auth, urls, admin
├── pages/
│   ├── Dashboard.jsx           ← User dashboard: credit display, URL creation, URL table
│   ├── Login.jsx               ← Login form with AuthContext integration
│   └── Signup.jsx              ← Signup form with toast feedback + redirect on success
├── App.jsx                     ← Route definitions with nested ProtectedRoute + AdminRoute wrappers
└── main.jsx                    ← App entry: BrowserRouter → ThemeProvider → AuthProvider → App
```

---

## FEATURE LIST (for AI to generate bullets from)

### Authentication & Route Protection
- `AuthContext` provides `user`, `loading`, `login`, `logout`, `refreshUser` to the entire app — no prop drilling required
- Session restoration on app load: `fetchCurrentUser()` runs on mount inside `AuthProvider`, sets user state from active cookie — user stays logged in on page refresh
- `ProtectedRoute`: if loading, shows `<Spinner />`; if no user, redirects to `/login`; otherwise renders children — covers all three auth states cleanly
- `AdminRoute`: layered on top of `ProtectedRoute` logic — redirects non-admins to `/dashboard` even if authenticated
- Login flow: calls `loginUser()` → then immediately `getCurrentUser()` → sets user state → navigates to `/dashboard` — avoids stale state from login response alone
- Logout: calls backend logout endpoint (clears httpOnly cookie) → sets `user` to null → navigates to `/login`

### Axios Configuration
- Single Axios instance (`api/axios.js`) with `baseURL` from `VITE_API_BASE_URL` env variable and `withCredentials: true` — all cookies sent automatically on every request, no per-call configuration needed
- All API functions in `lib/api.js` use this shared instance — one place to change base URL or add interceptors

### URL Creation (CreateUrl.jsx)
- Credit guard: button is `disabled` when `remainingCredits <= 0` with a visible error message — prevents users from even attempting a request with no credits
- After successful URL creation: calls `refreshUser()` to update credit count in navbar immediately + calls `onSuccess()` to reload URL table — UI stays in sync without page reload
- Generated short URL displayed inline with a one-click Copy button using `navigator.clipboard.writeText()`
- Custom alias field is optional — passed in form data only when filled; backend handles both cases

### URL Table (UrlTable.jsx)
- Expiry calculated client-side: `new Date(url.expiresAt) < new Date()` — expired URLs show a red "Expired" badge
- Copy button with transient "Copied!" state using `copiedId` local state + `setTimeout` reset after 1500ms — prevents double-copy confusion
- Deactivate action calls `deactivateUrl(id)` then triggers `onRefresh()` callback — parent table reloads without full page reload
- Short URL constructed with `VITE_API_BASE_URL_Live` env variable — keeps dev/prod URLs separate

### Dashboard (Dashboard.jsx)
- Remaining credits computed as `user.credits.total - user.credits.used` — displayed in header card
- "Add 10 Credits" button calls `requestApi(10)` — sends a credit request to backend with fixed 10-credit ask
- `loadUrls` passed as `onSuccess` to `CreateUrl` and `onRefresh` to `UrlTable` — single source of truth for URL data in the page

### Admin Panel (AdminBoard.jsx)
- Four tabs: Overview, Users, Credit Requests, URLs — tab state managed with `useState("Overview")`
- Overview stats computed client-side from `users` array: `totalCredits`, `totalUsed`, `adminCount`, `activeCount` — no separate stats API call needed for basic overview
- Animated stat cards: CSS transition with staggered `delay` using index (`i * 0.07s`) — cards appear one by one on load
- `visible` state + `setTimeout(50ms)` trick: triggers CSS transition after data loads so animation is visible even on fast connections

### Admin Users (AdminUsers.jsx)
- Per-user credit usage bar: percentage computed as `Math.round((credits.used / credits.total) * 100)` — bar color changes: green (<50%), yellow (>50%), red (>80%)
- Credit input per user with local `creditInputs` state keyed by `user._id` — multiple users can have pending inputs simultaneously without conflict
- `actionLoading` object keyed by `role-{id}`, `status-{id}`, `credit-{id}` — granular per-action loading states so multiple buttons can spin independently
- Role toggle: reads current role, sends the opposite — one button handles both directions (Make Admin / Make User)
- Skeleton loading: 4 `UserCardSkeleton` components rendered during fetch — matches exact card layout so no layout shift on data arrival

### Admin Credit Requests (AdminCreditReqs.jsx)
- Approve button only shown for `pending` requests — approved/rejected cards are read-only display
- `actionLoading` keyed by `req._id` — each approve button spins independently
- After approve: reloads full request list (`loadRequests()`) so status badge updates immediately
- Skeleton loading: 3 `ReqCardSkeleton` components during fetch

### Admin URLs (AdminUrls.jsx)
- Delete button only shown for inactive (`!url.isActive`) URLs — matches backend rule that only inactive URLs can be hard-deleted
- Expiry badge: `isExpired()` helper checks `expiresAt` — shows yellow "Expired" badge alongside active/inactive badge
- Owner displayed as `url.user.firstname` (populated from backend) with "by" prefix
- Skeleton loading: 4 `UrlCardSkeleton` components during fetch

### Reusable UI Components
- `Button.jsx`: wraps DaisyUI `btn btn-primary` — accepts `disabled`, `type`, `onClick`, custom `className`
- `Card.jsx`: standard card wrapper — consistent border, shadow, padding across all pages
- `Input.jsx`: labeled input with `error` prop — shows red border + error message below; `htmlFor` linked to `id` for accessibility
- `Spinner.jsx`: accepts `size` (sm/md/lg) and `fullScreen` (centers in `min-h-screen`) — used for route guards and data loading

### Navbar (Navbar.jsx)
- Credits badge shows `user.credits.total - user.credits.used` — updates after every URL creation via `refreshUser`
- Theme toggle button: switches between "forest" and "silk" DaisyUI themes
- Avatar dropdown: shows email, role, links to Dashboard and Admin Dashboard (admin-only), logout button
- Admin gets two nav links (Dashboard + Admin Dashboard) — regular users see only Dashboard

### Theme System (ThemeContext.jsx)
- Theme persisted in `localStorage` — survives page refresh
- `data-theme` attribute set on `document.documentElement` — DaisyUI reads this for full theme switch
- Toggles between "forest" (dark) and "silk" (light) — two curated DaisyUI themes

### Landing Page / Home (Home.jsx)
- Framer Motion hero: `initial={{ opacity: 0, y: 40 }}` → `animate={{ opacity: 1, y: 0 }}` on load
- Feature cards: `whileInView` animations with staggered delay (0.12s per column) — animates as user scrolls
- How It Works cards: `whileHover={{ y: -4 }}` subtle lift on hover
- Pricing cards: `whileHover={{ scale: 1.02 }}` — highlighted card has `border-2 border-primary`
- Stats row: 10k+ links shortened, 500+ active users, 99.9% uptime (displayed on hero)

### App Routing (App.jsx + main.jsx)
- Route: `/` → redirects to `/home` via `<Navigate replace />`
- Route: `/dashboard` wrapped in `<ProtectedRoute>` — only logged-in users
- Route: `/adminDashboard` wrapped in `<AdminRoute>` — only admin users
- Provider nesting order: `BrowserRouter → ThemeProvider → AuthProvider → App` — router available inside auth context for `useNavigate`

---

## METRICS / QUANTIFIABLE FACTS

- 4 pages: Home, Login, Signup, Dashboard
- 2 route guard components: ProtectedRoute + AdminRoute
- 4 admin panel tabs: Overview, Users, Credit Requests, URLs
- 3 context providers: BrowserRouter, ThemeProvider, AuthProvider
- 17 API functions in `lib/api.js` covering auth, urls, and all admin operations
- 5 reusable UI components: Button, Card, Input, Spinner, Home
- 2 DaisyUI themes: forest (dark) + silk (light), persisted in localStorage
- Skeleton loaders in all 3 admin tabs — no blank screens during data fetch
- Per-action loading states using object keyed by `{action}-{id}` — prevents UI deadlock on multi-row interactions
- Short URL base constructed from `VITE_API_BASE_URL_Live` env var — zero hardcoded URLs in components

---

## INTERESTING TECHNICAL DECISIONS (for interview stories / resume bullets)

1. **Session restoration without Redux** — `AuthProvider` calls `getCurrentUser()` on mount. If the httpOnly cookie is valid, backend returns the user and React state is populated. No token stored in localStorage, no Redux, no complex rehydration logic.

2. **Staggered CSS animation without a library** — Admin Overview cards use inline `transition-delay` computed from array index (`i * 0.07s`) in JSX style props. Achieves the staggered card entrance effect with zero extra dependencies — pure CSS transitions.

3. **`visible` state + 50ms timeout for animation trigger** — After data loads, a `visible` flag is set with a 50ms `setTimeout`. This forces the browser to paint the initial `opacity: 0, translateY(16px)` state before the transition runs, making the animation visible even when data arrives in under 50ms.

4. **Granular `actionLoading` object** — Instead of one `loading` boolean per component, an object keyed by `{action}-{userId}` (e.g., `role-abc123`, `status-abc123`) allows each button row to show its own spinner independently. Multiple admin actions can be in-flight simultaneously.

5. **Credit count kept in sync without polling** — After creating a short URL, `refreshUser()` (which re-calls `getCurrentUser()`) is triggered. This updates the user object in `AuthContext`, which the Navbar reads to display updated credits — all without a dedicated credits endpoint or WebSocket.

6. **Skeleton loaders matched to real card layouts** — `UserCardSkeleton`, `ReqCardSkeleton`, `UrlCardSkeleton` each mirror the structure (avatar circle, text lines, action row) of their real cards using `animate-pulse` divs. Users see no layout shift when data arrives.

7. **Admin delete blocked in UI and backend** — The delete button in `AdminUrls` is only rendered when `!url.isActive`. This is a UI-level guard that mirrors the backend's 403 rule, preventing users from even clicking delete on an active URL.

---

## SUGGESTED RESUME BULLETS (ready to use or adapt)

- Built `AuthContext` with session restoration on app load — `getCurrentUser()` called on mount restores user state from httpOnly cookie, eliminating manual token management and localStorage dependency
- Implemented two-layer route guard system (`ProtectedRoute` + `AdminRoute`) using React Router v6 — handles loading, unauthenticated, and unauthorized states distinctly, covering all three access scenarios
- Designed granular per-action loading states using an `actionLoading` object keyed by `{action}-{id}` — enables multiple independent admin actions (role toggle, status toggle, credit add) to show individual spinners across rows simultaneously
- Kept credit balance in sync across Navbar and Dashboard without polling — `refreshUser()` re-fetches user from `AuthContext` after every URL creation, updating displayed credits instantly via shared context state
- Built skeleton loaders for all three admin tabs that mirror exact card layouts — prevents layout shift on data arrival and provides visual continuity during fetch
- Implemented staggered card entrance animation using computed `transition-delay` from array index — achieves sequential appear effect with zero animation libraries, using only CSS transitions and a 50ms visibility timeout
- Created shared Axios instance with `withCredentials: true` and env-driven `baseURL` — standardizes cookie-based auth across all 17 API functions without per-call configuration
- Enforced admin-only delete at UI level by conditionally rendering the delete button only for inactive URLs — mirrors backend 403 rule and removes user-facing confusion for active URLs

---

## HOW TO USE THIS FILE

When asking an AI to write resume bullets for the URL Shortener frontend, say:

> "I have attached my URL Shortener frontend features file. Based on this, write [X] strong resume bullet points for a [Frontend/Fullstack] Developer role. Focus on [specific area: auth system / admin panel / UI components / animations / state management]. Keep bullets achievement-oriented and specific."
