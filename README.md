# 🚛 TransitOps – Smart Transport Operations Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) based Fleet Management System developed for managing transport operations efficiently. The platform provides secure authentication, role-based access control (RBAC), and modules for vehicles, drivers, trips, maintenance, fuel management, reports, and dashboard analytics.

---

## 🛠 Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router DOM, Axios, Chart.js

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** JWT, bcrypt

---

## 📂 Folder Structure

```text
TransitOps/
├── client/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── constants/
│       ├── utils/
│       ├── routes/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄 Database Collections

- users
- vehicles
- drivers
- trips
- maintenances
- fuelLogs
- expenses

---

## 📌 Status Enums

| Entity | Values |
|----------|--------------------------------|
| Vehicle | AVAILABLE, ON_TRIP, IN_SHOP, RETIRED |
| Driver | AVAILABLE, ON_TRIP, OFF_DUTY, SUSPENDED |
| Trip | DRAFT, DISPATCHED, COMPLETED, CANCELLED |
| Maintenance | ACTIVE, COMPLETED |

---

## 🌐 API Routes

| Endpoint | Description |
|-----------|-------------|
| `/api/auth` | Authentication APIs |
| `/api/users` | User Management |
| `/api/vehicles` | Vehicle Management |
| `/api/drivers` | Driver Management |
| `/api/trips` | Trip Management |
| `/api/maintenance` | Maintenance Management |
| `/api/fuel` | Fuel Management |
| `/api/reports` | Reports |

---

## 🎨 UI Theme

| Token | Value |
|--------|---------|
| Background | #111827 |
| Surface | #1F2937 |
| Primary | #D18A00 |
| Success | #22C55E |
| Danger | #EF4444 |
| Text | White |
| Font | Poppins |

---

# 🚀 Getting Started

## 1. Install Dependencies

```bash
npm install
```

or

```bash
npm install --prefix client
npm install --prefix server
```

---

## 2. Configure Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=<your_mongodb_connection_string>

JWT_SECRET=<your_secure_jwt_secret>

CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 3. Start the Application

Run backend

```bash
cd server
npm run dev
```

Run frontend

```bash
cd client
npm run dev
```

---

## 🔐 Demo Login Credentials

Use one of the following demo accounts.

| Role | Email | Password |
|------|-----------------------------|-------------|
| Fleet Manager | fleetmanager@transitops.com | password123 |
| Dispatcher | dispatcher@transitops.com | password123 |
| Safety Officer | safety@transitops.com | password123 |
| Financial Analyst | finance@transitops.com | password123 |

> **Note:** These accounts are intended for demonstration purposes only.

---

## ✅ Verify

- Backend Health Check

```
GET http://localhost:5000/api/health
```

- Frontend

Open

```
http://localhost:5173
```

You will be redirected to the Login page.

Sign in using any of the demo accounts listed above.

---

## ✨ Features

- JWT Authentication
- Role Based Access Control (RBAC)
- Dashboard Analytics
- Vehicle Management
- Driver Management
- Trip Management
- Maintenance Management
- Fuel Management
- Reports
- Responsive UI
- MongoDB Integration
- RESTful APIs

---

## 📄 License

This project was developed for educational and hackathon purposes.