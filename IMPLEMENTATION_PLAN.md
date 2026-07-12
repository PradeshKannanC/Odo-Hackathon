# TransitOps — Team Lead Module Implementation Plan

> Companion to `TEAM_LEAD_MASTER_PROMPT.md`. Scope, rules, and AI
> behaviour defined there still apply: one file per turn, wait for
> confirmation, no Vehicles/Drivers/Trips/Maintenance/Fuel/Expenses/Reports.

## Current State Audit (as of this update)

- No Register page, Signup API, or Register route exists anywhere in
  `client/` or `server/` — nothing to delete, this is already satisfied.
- `roleMiddleware.js` defines `authorize(...allowedRoles)` but no route
  currently applies it — RBAC is unenforced on the backend.
- `User.js` already has the correct role enum: `fleet_manager`,
  `dispatcher`, `safety_officer`, `financial_analyst`.
- `RoleRoute.jsx` redirects to `/forbidden` but no `/forbidden` route or
  page exists. No `/unauthorized` (401) page/route exists either.
- `axiosInstance.js` hard-redirects to `/login` on 401 via
  `window.location.href` — works, but bypasses the router and won't show
  a dedicated 401 page.
- No `ThemeContext` exists yet, only static `themeConstants.js`.
- `Sidebar.jsx` / `Navbar.jsx` / `MainLayout.jsx` are minimal starter
  stubs with no role-awareness, drawer behavior, or avatar menu.
- No dashboard API layer (`dashboardController.js`,
  `dashboardRoutes.js`, `dashboardService.js`) exists — `Dashboard.jsx`
  is a placeholder page.
- Shared component library only has Button, Input, Card, Loader, Modal,
  Table, Toast — Select, Badge, Pagination, SearchBar, EmptyState,
  ErrorState, ConfirmDialog, SkeletonLoader are all missing.
- No notifications, profile, settings tabs, global search, or
  breadcrumbs exist yet.

## Priority Order

### Phase 1 — Auth & Access Control Foundation
1. Remove Register — verify/lock down (no register route, page, API, or nav link anywhere)
2. Fix RBAC — apply `authorize()` correctly on protected backend routes in scope; align frontend role checks
3. Authentication — Remember Me, session timeout, friendly errors, loading states on login
4. Protected Routes — wire `ProtectedRoute` + `RoleRoute` into `AppRoutes.jsx` with real role assignments
5. 401 Page — `Unauthorized.jsx` + route, wired from expired/invalid-token handling
6. 403 Page — `Forbidden.jsx` + route, wired from `RoleRoute`

### Phase 2 — Core Layout & Theming
1. Theme System — `ThemeContext`, `useTheme` hook, dark/light persistence
2. Sidebar — role-aware nav items, active state, responsive drawer
3. Navbar — avatar menu, theme toggle, notification bell placeholder
4. Main Layout — responsive shell, breadcrumb slot, route transition loading

### Phase 3 — Dashboard
1. Dashboard APIs — `dashboardController.js`, `dashboardRoutes.js`, `dashboardService.js`
2. Dashboard Cards — `StatCard` component + KPI wiring (active/available/maintenance vehicles, trips, drivers on duty, utilization %)
3. Dashboard Charts — fleet utilization & trip trend charts
4. Dashboard Filters — vehicle type, status, region, date range, search
5. Dashboard Loading — fetch/loading states for cards, charts, filters
6. Dashboard Skeletons — skeleton cards, skeleton table for recent trips

### Phase 4 — Shared Components & Account Management
1. Shared Components — Select, Badge, Pagination, SearchBar, EmptyState, ErrorState, ConfirmDialog, SkeletonLoader
2. Notifications — bell, drawer, unread badge, notification context
3. Profile — profile view/edit
4. Settings — change password, theme, about, security tabs

### Phase 5 — Enterprise UX & Polish
1. Global Search — Ctrl+K search modal
2. Breadcrumbs — wired into Main Layout
3. Enterprise UX — activity timeline, offline indicator, avatar menu refinement
4. Animations — hover/transition polish across components
5. Polish — accessibility pass (keyboard nav, labels), responsive audit, final QA

## Rules
- Generate one file at a time.
- Do not skip phases or reorder items within a phase.
- Wait for explicit confirmation after each file before generating the next.
