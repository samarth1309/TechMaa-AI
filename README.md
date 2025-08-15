# TechMaa‑AI Corporate Website

Monorepo style: static frontend + Node/Express/Mongo backend API.

## Quickstart

### 1) Frontend (static)
Open `frontend` with a local server (e.g. VS Code Live Server) so CORS works.

### 2) Backend (API)
```
cd backend
npm i
cp .env.example .env   # set MONGO_URI (local or Atlas) and CORS_ORIGIN
npm run dev
```
Seed admin:
```
POST http://localhost:4000/api/admin/seed
```
Get token:
```
POST http://localhost:4000/api/admin/auth/login
{ "email": "admin@techmaa-ai.com", "password": "ChangeMe123!" }
```
Create content:
```
POST /api/admin/posts
POST /api/admin/jobs
POST /api/admin/case-studies
Authorization: Bearer <token>
```

Public endpoints used by the frontend:
```
GET  /api/public/posts
GET  /api/public/jobs
GET  /api/public/case-studies
POST /api/public/newsletter
POST /api/public/contact
```

### 3) Deploy
- **Frontend**: Netlify, Vercel, or S3+CloudFront.
- **Backend**: Render, Railway, Fly.io, or a VPS. Add env vars and point CORS_ORIGIN to your frontend domain.
- **MongoDB**: MongoDB Atlas free tier.

---

## Structure

```
frontend/
  assets/{css,js,img}
  *.html
backend/
  src/
    config/db.js
    routes/{public,admin}.js
    controllers/{publicController,adminController}.js
    models/*.js
    middleware/auth.js
  package.json
```

## Notes
- Keep secrets in `.env` (never commit).
- Add HTTPS and a custom domain.
- Replace placeholder copy and visuals.
