# FITONE FITNESS CLUB - Full-Stack Web Application

A modern, premium, fully responsive fitness gym web application built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Express.js**, **MongoDB (Mongoose)**, and **JWT Authentication**.

---

## Features

- **Theme & UI/UX**: Premium dark aesthetic, red accents (`#e50914`), translucent glassmorphism cards, and fluid Framer Motion animations.
- **11 Complete Pages**: Home, About Us, Programs, Trainers, Gallery (with Lightbox viewer), Pricing, Contact, Login, Register, Member Dashboard, and Admin Dashboard.
- **Interactive Checkout Modal**: Payment Gateway checkout UI supporting Credit/Debit Card, UPI QR Code scanning, and Net Banking.
- **Member Dashboard**: Active plan details, trainer assignment, BMI calculator, body metrics tracking, and workout compliance.
- **Admin Control Center**: Revenue metrics, active membership counts, and CRUD management for Users, Trainers, Programs, Memberships, Contact Messages, and Newsletter Subscribers.
- **Security Hardened**: Helmet HTTP headers, Mongo Sanitization against NoSQL injection, API Rate Limiting, and 256-bit JWT secret authentication.

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
MONGODB_URI=mongodb://127.0.0.1:27017/fitone-gym
JWT_SECRET=92c6b85138234630cb8dec4b172e5fe8c69c6d88e3723cf95c67b58795fc4256
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

## Demo Accounts

- **Admin Account**: `admin@fitone.com` / `Admin@12345`
- **Member Account**: `rohit@fitone.com` / `Member@12345`

---

## How to Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `fitone-gym`).
2. Run the following commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/fitone-gym.git
git push -u origin main
```

---

## How to Publish / Deploy Live

### Deploying Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Click **Deploy**.

### Deploying Backend (Render / Railway)
1. Go to [Render.com](https://render.com) and create a **Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).
