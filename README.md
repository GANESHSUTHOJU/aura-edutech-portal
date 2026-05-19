# AUra Edutech - Premium Learning Platform

Welcome to AUra Edutech, a modern, full-stack learning platform designed for students, faculty, and admins.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.js, JWT, Bcrypt.
- **Database**: MongoDB (Mongoose).

## Features
- **Modern UI**: Glassmorphism, animated gradients, and smooth transitions.
- **Role-Based Access**: Specialized dashboards for Students, Faculty, and Admins.
- **Course Management**: Browse, enroll, and watch courses with a premium video player.
- **Faculty Tools**: Revenue analytics, student management, and course creation.
- **Admin Panel**: System-wide statistics and user management.
- **Dark/Light Mode**: Full support for system-based or manual theme switching.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Setup

1. **Backend Setup**:
   ```bash
   cd server
   npm install
   # Update .env with your MONGO_URI
   npm run dev
   ```

2. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Folder Structure

### Frontend (`client/`)
- `src/components`: Reusable UI elements (Navbar, Sidebar, Cards).
- `src/pages`: Main application views.
- `src/context`: Authentication and state management.
- `src/layouts`: Page structural components.

### Backend (`server/`)
- `controllers/`: Logic for API endpoints.
- `models/`: Database schemas (User, Course, etc.).
- `routes/`: Express route definitions.
- `middleware/`: Authentication and error handling.

---
Designed with ❤️ by AUra Edutech Team.
