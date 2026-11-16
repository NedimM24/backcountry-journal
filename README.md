# Backcountry Journal

A full-stack outdoor blogging platform focused on hiking, camping, backpacking, fishing, and outdoor gear. Backcountry Journal features an authenticated reading experience, an administrative content management dashboard, and a REST API backed by PostgreSQL.


<img width="1398" height="1155" alt="image" src="https://github.com/user-attachments/assets/c732fed5-9a8b-4d68-b392-8d893fc49fb4" />

<img width="1394" height="1155" alt="image" src="https://github.com/user-attachments/assets/062046f0-5468-4926-8ec3-3ab9f6bee1dc" />



## Live Demo

- **User Blog:** [Visit Backcountry Journal](https://backcountry-journal.vercel.app/)
- **Admin Dashboard:** [Visit Admin Dashboard](https://backcountry-journal-admin.vercel.app)

---

# Features

## User Frontend

- User registration and authentication.
- Authenticated access to published blog content.
- Featured articles and homepage hero section.
- Browse articles by category.
- Individual article pages.
- Comment on published articles.

## Admin Dashboard

- Secure administrator authentication.
- Dashboard displaying post and comment statistics.
- Create, edit, and delete blog posts.
- Save articles as drafts or publish them.
- Manage and review comments.
- View recent posts and publication status.

## Backend API

- RESTful API built with Express and TypeScript.
- PostgreSQL database managed with Prisma ORM.
- JWT authentication.
- Password hashing with bcrypt.
- Role-based authorization middleware.
- Request validation.
- Separated controllers, routes, queries, and middleware.

---

# Tech Stack

| Category | Technologies |
|---|---|
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT, bcrypt |
| Validation | express-validator |
| Frontend | React, TypeScript, Vite |
| Routing | React Router |
| API Testing | Postman, Autocannon |
| Deployment | Railway, Vercel |

---

# Project Architecture

Backcountry Journal uses a monorepo architecture containing three independently organized applications.

```text
backcountry-journal/
│
├── server/
│   ├── prisma/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── queries/
│       ├── routes/
│       ├── validation/
│       └── app.ts
│
├── admin-frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── App.tsx
│
├── user-frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.tsx
│
└── README.md
```

---

# Performance Optimizations

Performance improvements were implemented across the frontend and backend to reduce image loading overhead, minimize API response payloads, and improve request performance.

## Frontend Image Optimization

Optimized the homepage hero image to reduce loading overhead and prioritize the primary visual content.

**Optimizations:**

- Resized the homepage hero image from 2560 × 1440 to 1200 × 675.
- Compressed the JPEG image, reducing its file size by approximately 79%.
- Replaced the CSS background image with an HTML `<img>` element.
- Added `fetchPriority="high"` to prioritize loading of the hero image.

**Results:**

- Reduced hero image file size by approximately 79%.
- Improved image loading efficiency.
- Prioritized loading of the homepage's primary visual asset.

## Backend API Optimization

Optimized the published posts endpoint by reducing database field selection and API response payload size.

**Optimizations:**

- Used Prisma `select` to retrieve only fields required by public blog cards.
- Truncated post bodies to 50-character excerpts in the published posts listing response.
- Preserved full article content on individual post endpoints.

### Before and After Benchmarks

| Metric | Before | After |
|---|---:|---:|
| API Response Size | 8,374 bytes | 2,857 bytes |
| Average Latency | 39.74 ms | 34.69 ms |
| p97.5 Latency | 58 ms | 43 ms |
| Throughput | 122.6 req/s | 140.7 req/s |

**Results:**

- Reduced API response payload by approximately 65.9%.
- Measured 12.7% lower average request latency.
- Measured 14.8% higher request throughput.
- Reduced p97.5 latency by approximately 25.9%.

**Benchmark Methodology:**

Backend benchmarks were conducted against the deployed Railway API using Autocannon with 5 concurrent connections over 10 seconds.

Results represent individual before-and-after benchmark runs.

---

# API Testing & Validation

Used Postman to test and validate individual API endpoints against the deployed production backend.

**Testing included:**

- Authentication and authorization endpoints.
- User registration and login.
- Blog post retrieval and management.
- Published posts and individual article endpoints.
- Comment creation and retrieval.
- Protected routes and role-based access.
- Request validation and error responses.

Postman was used to verify endpoint behavior, HTTP status codes, and API responses during production testing.

Autocannon was used separately for performance benchmarking and load testing.

---

# Authentication & Authorization

Backcountry Journal uses JSON Web Tokens (JWT) for authentication.

- Passwords are hashed using bcrypt before being stored.
- JWTs authenticate protected API requests.
- Role-based authorization separates regular users from administrators.
- Regular users can read published content and participate in discussions.
- Administrators have access to content management functionality.

All blog content requires authentication.

---

# Deployment

The application is deployed using separate hosting services.

| Application | Hosting |
|---|---|
| Backend API | Railway |
| User Frontend | Vercel |
| Admin Frontend | Vercel |

Frontend applications communicate with the backend through the configured `VITE_API_URL` environment variable.

---

# Local Development Setup

## Prerequisites

- Node.js
- npm
- PostgreSQL

## 1. Clone the Repository

```bash
git clone <repository-url>
cd backcountry-journal
```

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

Create a `.env` file containing the required database connection and authentication secrets.

```env
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret"
```

Configure Prisma and apply the project's database migrations.

## 3. Start the Backend

```bash
npm run dev
```

## 4. Start the User Frontend

Open another terminal:

```bash
cd user-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL="http://localhost:3000"
```

Start the development server:

```bash
npm run dev
```

## 5. Start the Admin Frontend

Open another terminal:

```bash
cd admin-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL="http://localhost:3000"
```

Start the development server:

```bash
npm run dev
```

---

# Future Improvements

- Expand automated backend and frontend testing.
- Improve authentication and token refresh handling.
- Further optimize database queries and API performance.
- Improve accessibility and responsive design.
- Expand administrative content management capabilities.

---

Built as a full-stack portfolio project demonstrating REST API development, database design, authentication, authorization, frontend development, deployment, API testing, and performance optimization.
