# Voice AI Assistant

A modern SaaS web application that provides a dual-engine AI customer message analyzer, built for auto repair shops, restaurants, and medical clinics.

## Features

- **Marketing Landing Page:** Responsive, mobile-first design with Framer Motion animations.
- **Dual-Engine Analyzer:** Uses OpenRouter AI (GPT-4o Mini) to extract customer intents, with a seamless fallback to an advanced Rule-Based Engine.
- **Dark Mode:** Built-in persistent theme toggling.
- **SQLite Database:** Stores all analysis logs for analytics and auditing.
- **Dockerized:** Ready for easy local testing and production deployment.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express, TypeScript, Zod, Prisma ORM
- **Database:** SQLite
- **Deployment:** Docker, Docker Compose

## Prerequisites

- Node.js v20+
- Docker & Docker Compose (optional for containerized deployment)
- OpenRouter API Key

## Local Development

### 1. Clone & Setup

```bash
# Frontend setup
npm install

# Backend setup
cd server
npm install
npx prisma db push
cd ..
```

### 2. Environment Variables

Create `.env` in the root folder (optional, for frontend) and `.env` in the `/server` folder.

**/server/.env**
```env
PORT=3001
DATABASE_URL="file:./dev.db"
OPENROUTER_API_KEY="your-openrouter-api-key"
```

### 3. Run Development Servers

Run backend (in `/server`):
```bash
npm run dev
```

Run frontend (in root):
```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Docker Setup

To run the entire application using Docker:

```bash
# Start both frontend and backend
docker-compose up --build
```
- Frontend will be available at `http://localhost:3000`
- Backend API will be available at `http://localhost:3001/api`

## API Documentation

### POST `/api/analyze`

Analyzes a customer message to extract intent, business type, urgency, and a summary.

**Request Body:**
```json
{
  "message": "My car won't start today, I need help.",
  "engine": "openrouter" // or "rule-based"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "intent": "service_request",
    "business_type": "auto_repair",
    "urgency": "high",
    "summary": "Customer is reporting a vehicle breakdown and requires urgent assistance."
  },
  "meta": {
    "engine": "openrouter",
    "fallback_used": false
  }
}
```

## Backend Architecture & Fallback

The backend uses a robust error-handling mechanism. When a request is sent to OpenRouter, if it fails, times out, or returns malformed JSON, the server seamlessly catches the error and pipes the message through `rules.service.ts`. This rule-based analyzer assigns scores based on weighted keywords, regex patterns, and context, ensuring the user always receives a structured response.
