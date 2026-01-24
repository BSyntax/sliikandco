# Deployment Guide - Sliik & Co.

This guide outlines the steps to host your full-stack application using Vercel, Render, and MongoDB Atlas.

## 1. Database (MongoDB Atlas)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account.
2. **Create Cluster**: Create a free shared cluster.
3. **Database Access**: Create a database user (username and password).
4. **Network Access**: Add `0.0.0.0/0` to your whitelist to allow connections from Render.
5. **Connection String**: Copy your connection string (format: `mongodb+srv://...`).

## 2. Backend (Render)

1. **New Web Service**: Create a new Web Service on [Render](https://render.com).
2. **Connect Repository**: Connect your GitHub repository.
3. **Settings**:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
4. **Environment Variables**:
   - `MONGO_URI`: (Your Atlas connection string)
   - `JWT_SECRET`: (Any secure random string)
   - `STRIPE_SECRET_KEY`: (Your Stripe Secret Key)
   - `FRONTEND_URL`: (Your Vercel URL, e.g., `https://sliikandco.vercel.app`)
   - `NODE_ENV`: `production`

## 3. Frontend (Vercel)

1. **New Project**: In [Vercel](https://vercel.com), import your repository.
2. **Framework**: Vite should be auto-detected.
3. **Environment Variables**:
   - `VITE_API_URL`: `https://sliikandco.onrender.com/api`
   - `VITE_STRIPE_PUBLISHABLE_KEY`: (Your Stripe Publishable Key)
4. **Deploy**: Click Deploy.

---

_Note: Cleaned up project by removing outdated static data folders._
