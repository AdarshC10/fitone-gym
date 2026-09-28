# FITONE FITNESS CLUB - Full-Stack Web Application

A modern, premium, fully responsive fitness gym web application built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Express.js**, **MongoDB (Mongoose)**, and **JWT Authentication**.

---

## Features

- **Theme & UI/UX**: Premium dark aesthetic, red accents (`#e50914`), translucent glassmorphism cards, and fluid Framer Motion animations.
- **11 Complete Pages**: Home, About Us, Programs, Trainers, Gallery (with Lightbox viewer), Pricing, Contact, Login, Register, Member Dashboard, and Admin Dashboard.
- **Interactive Checkout Modal**: Payment Gateway checkout UI supporting Credit/Debit Card, UPI QR Code scanning, and Net Banking.
- **Member Dashboard**: Active plan details, trainer assignment, BMI calculator, body metrics tracking, and workout compliance.
- **Admin Control Center**: Revenue metrics, active membership counts, and CRUD management for Users, Trainers, Programs, Memberships, Contact Messages, and Newsletter Subscribers.
- **Security Hardened**: Helmet HTTP headers, Mongo Sanitization against NoSQL injection, API Rate Limiting, and JWT secret authentication.

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (based on `.env.example`):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Run Development Servers
```bash
# In the root directory
npm dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## Deployment & Hosting

### Deploying Frontend (Vercel)
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Click **Deploy**.

### Deploying Backend (Render / Railway)
1. Create a **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Configure environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).
