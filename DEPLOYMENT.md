# Deployment Guide

This repo is ready to deploy as a Vite single-page app on Vercel.

## Frontend: Vercel

Create a new Vercel project connected to this GitHub repository and use:

- Framework Preset: `Vite`
- Root Directory: `.`
- Build Command: `npm run build`
- Output Directory: `dist`

The included `vercel.json` rewrites all routes to `index.html` so React Router works on refresh and direct links.

## Backend: Render

The current repository does not yet contain tracked backend source files under `server/`, so Render deployment is not ready from Git alone yet.

When your backend files are committed, create a Render Web Service with:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

Recommended environment variables on Render:

- `PORT`
- `NODE_ENV=production`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `CORS_ORIGIN`

Do not upload your local `.env` file. Add those values in the Render dashboard instead.

## Database: Aiven MySQL

Create a free MySQL service on Aiven and copy its connection values into Render environment variables.

Typical values you will receive:

- host
- port
- database
- username
- password
- SSL requirement

If your backend uses `mysql2`, make sure it supports the SSL settings required by your Aiven instance.

## Current Recommendation

Deploy the frontend now on Vercel.

After that, commit the backend source files inside `server/` and then deploy that folder to Render with Aiven MySQL credentials.
