# OctoFit Tracker - Multi-tier Application

A modern multi-tier fitness tracking application with user authentication, activity logging, team management, competitive leaderboards, and personalized workout suggestions.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite presentation tier
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── backend/           # Node.js + Express logic tier
    ├── src/
    ├── package.json
    ├── tsconfig.json
    └── .env
```

## Tech Stack

### Presentation Tier (Frontend)
- **Framework:** React 19 with Vite
- **Routing:** react-router-dom
- **Styling:** Bootstrap
- **Port:** 5173 (Vite dev server)

### Logic Tier (Backend)
- **Runtime:** Node.js (LTS v24.17.0)
- **Framework:** Express.js
- **Language:** TypeScript
- **Port:** 8000
- **Scripts:**
  - `npm run dev` - Start development server with ts-node-dev
  - `npm run build` - Compile TypeScript
  - `npm start` - Run compiled application

### Data Tier
- **Database:** MongoDB
- **ODM:** Mongoose
- **Port:** 27017
- **Connection:** mongodb://localhost:27017/octofit-tracker

## Installation & Setup

### Prerequisites
- Node.js (LTS v24.17.0 or higher)
- MongoDB running on localhost:27017

### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```
Frontend will be available at: http://localhost:5173

### Backend Setup
```bash
cd octofit-tracker/backend
npm install
npm run dev
```
Backend API will be available at: http://localhost:8000

## Development

### Frontend Development
- Hot module replacement enabled with Vite
- ESLint configured for code quality
- Bootstrap classes available for styling

### Backend Development
- TypeScript strict mode enabled
- Express CORS enabled for frontend communication
- MongoDB connection handling with Mongoose
- Health check endpoint: `GET /api/health`

## Port Configuration

| Service | Port | Access |
|---------|------|--------|
| Frontend (Vite) | 5173 | Public |
| Backend (Express) | 8000 | Public |
| MongoDB | 27017 | Private |

## Environment Variables (Backend)

Create a `.env` file in the backend directory:
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

## Next Steps

1. Implement authentication models and services
2. Create user profiles and activity tracking
3. Build team management features
4. Develop leaderboard system
5. Add workout recommendation engine
6. Create UI components and pages in React
7. Integrate API endpoints with frontend

## Git Branch

Currently working on: `build-octofit-app`

To start development:
```bash
git checkout build-octofit-app
cd octofit-tracker
npm run dev  # frontend
npm run dev  # backend (in separate terminal)
```
