# TransitOps – Smart Transport Operations Platform

A production-style MERN stack starter for managing transport operations: vehicles, drivers, trips, maintenance, fuel and reports.

This repository currently contains the **project skeleton only** — folder structure, routing, authentication, and shared UI components. Business logic (CRUD for vehicles/drivers/trips/maintenance/fuel, dashboard analytics, reports) is intentionally left unimplemented and will be added in later steps.

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router DOM, Axios, Chart.js
**Backend:** Node.js, Express.js
**Database:** MongoDB, Mongoose
**Authentication:** JWT, bcrypt

## Folder Structure

```
TransitOps/
├── client/                    # React frontend (Vite)
│   └── src/
│       ├── assets/            # Static assets (images, icons)
│       ├── components/
│       │   ├── common/        # Button, Input, Card, Table, Loader, Modal, Toast, ProtectedRoute
│       │   └── layout/        # Sidebar, Navbar
│       ├── layouts/           # MainLayout, AuthLayout
│       ├── pages/             # Dashboard, Vehicles, Drivers, Trips, Maintenance, Fuel, Reports, Settings, Auth
│       ├── services/          # Axios instance + one service file per API resource
│       ├── hooks/             # useAuth, useToast
│       ├── context/           # AuthContext, ToastContext
│       ├── constants/         # status enums, theme colors, API endpoints
│       ├── utils/             # formatDate, validators, helpers
│       ├── routes/            # AppRoutes, routesConfig (sidebar nav)
│       ├── styles/            # Tailwind entrypoint
│       ├── App.jsx
│       └── main.jsx
│
├── server/                    # Express backend
│   ├── config/                 # env.js, db.js (MongoDB connection)
│   ├── controllers/            # authController is functional; others are stubs
│   ├── middleware/             # authMiddleware (JWT), roleMiddleware, errorMiddleware
│   ├── models/                 # User (full schema), other collections (placeholder schemas)
│   ├── routes/                 # one router per resource, mounted under /api
│   ├── utils/                  # generateToken, asyncHandler
│   ├── uploads/                # file upload target (gitignored contents)
│   └── server.js               # Express app entrypoint
│
├── .gitignore
├── package.json                # root scripts to run client + server together
└── README.md
```

## Database Collections

`users`, `vehicles`, `drivers`, `trips`, `maintenances`, `fuelLogs`, `expenses`

## Status Enums

| Entity | Values |
|---|---|
| Vehicle | `AVAILABLE`, `ON_TRIP`, `IN_SHOP`, `RETIRED` |
| Driver | `AVAILABLE`, `ON_TRIP`, `OFF_DUTY`, `SUSPENDED` |
| Trip | `DRAFT`, `DISPATCHED`, `COMPLETED`, `CANCELLED` |
| Maintenance | `ACTIVE`, `COMPLETED` |

## API Routes

| Base path | Status |
|---|---|
| `/api/auth` | Functional (register, login, logout, me) |
| `/api/users` | Stub |
| `/api/vehicles` | Stub |
| `/api/drivers` | Stub |
| `/api/trips` | Stub |
| `/api/maintenance` | Stub |
| `/api/fuel` | Stub |
| `/api/reports` | Stub |

Stub endpoints return `501 Not Implemented` until their business logic is built.

## UI Theme

| Token | Value |
|---|---|
| Background | `#111827` |
| Card / Surface | `#1F2937` |
| Primary | `#D18A00` |
| Success | `#22C55E` |
| Danger | `#EF4444` |
| Text | White |
| Font | Poppins |

## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

(or manually: `npm install --prefix client` and `npm install --prefix server`)

### 2. Configure environment variables

Copy the example env files and fill in your own values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

`server/.env` requires `MONGO_URI` and `JWT_SECRET` at minimum.

### 3. Run the app

From the repository root, run both client and server together:

```bash
npm run dev
```

Or run them individually:

```bash
npm run dev:server   # http://localhost:5000
npm run dev:client   # http://localhost:5173
```

### 4. Verify

- Backend health check: `GET http://localhost:5000/api/health`
- Frontend: open `http://localhost:5173` — you'll be redirected to `/login` since routes are protected by `ProtectedRoute`. Register a new account to get in.

## Next Steps

This skeleton intentionally excludes:

- Vehicle CRUD
- Driver CRUD
- Trip CRUD
- Maintenance & Fuel logic
- Reports & analytics
- Dashboard charts/logic

These will be implemented incrementally on top of this foundation.
