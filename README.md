# StartSync

A comprehensive platform connecting startup founders with top-tier collaborators (developers, designers, marketers).

## Architecture

This is a full-stack MERN application (MongoDB, Express, React, Node.js) with real-time Socket.io capabilities.

### Directory Structure
- `/frontend`: Contains the Vite+React application with TailwindCSS.
- `/backend`: Contains the Node+Express application.

### Tech Stack
**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Icons.
**Backend:** Node.js, Express.js, MongoDB Atlas (Mongoose), JSON Web Tokens (JWT), bcryptjs, Socket.io.

## Setup Instructions

### 1. Database Setup
Ensure you have a MongoDB Atlas account and cluster ready.

### 2. Backend Setup
1. Navigate to `backend` folder: `cd backend`
2. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri_here
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_URL=your_cloudinary_url
   ```
3. Install dependencies: `npm install`
4. Start development server: `npm run dev` (Runs on http://localhost:5000)

### 3. Frontend Setup
1. Navigate to `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev` (Runs on http://localhost:5173)

### Core Features Available
- **Authentication**: Secure JWT-based auth with bcrypt password hashing.
- **Role-Based Routing**: Admin, Founder, and Collaborator dashbaords.
- **Startups Management**: Founders can post and manage startup listings.
- **Discovery**: Advanced filtering and robust search for collaborators.
- **Application System**: Streamlined hiring process with status management.
- **Real-Time Features**: Integrated Socket.io for messaging.

## Deployment
- **Frontend**: Deploy `frontend/dist` directly to Vercel or Netlify. Build command is `npm run build`.
- **Backend**: Deploy on Render or Heroku. Define your `MONGO_URI` in environment variables.

*Developed as a capstone standard production-ready application.*
