# Event Operations Dashboard

A React and TypeScript dashboard prototype for planning events, coordinating hosts and invitees, arranging venues, and reviewing operational metrics.

## Highlights

- Event creation and management workflows
- Host and invitee management interfaces
- Seating-plan and venue-map tooling
- Cover, document, and media upload components
- Shareable event views and QR-code support
- KPI cards, charts, calendars, and responsive navigation

## Stack

React 19, TypeScript, React Router, Axios, React Flow, Recharts, Framer Motion, Tailwind CSS and Vite.

## Run locally

```bash
cp .env.example .env
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Configuration

Set `VITE_API_BASE_URL` to the event API URL. The repository primarily demonstrates the frontend workflow and includes prototype data where backend behaviour is not available.

## Project status

This repository is a frontend product prototype. It is useful for evaluating component composition, information architecture, dashboard design, and multi-step event workflows; it is not presented as a complete production backend.
