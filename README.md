# 🚀 TaskFlow: Premium MERN Task Management


[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**TaskFlow** is a high-performance, full-stack task management system built with the MERN stack. It features a modern Glassmorphism UI, fluid animations, and robust state management.

---

## 🌐 Live Demo & Repository
🔗 **Live Demo:** [Click Here to View Live App](https://task-tracker-1-gjk4.onrender.com)  
📂 **Backend API:** [Render API Link](https://task-tracker-s5nq.onrender.com)

---

## ✨ Key Features

### 🚀 Performance & UI
- **Glassmorphism Design:** Modern, clean, and professional UI with Tailwind CSS.
- **Micro-Animations:** Fluid transitions and hover effects using **Framer Motion**.
- **Adaptive Layout:** Fully responsive from mobile screens to 4K monitors.

### 🧠 Smart Logic
- **Advanced Sorting:** Organize tasks by **Newest Creation** or **Upcoming Due Dates**.
- **Real-time Filters:** Quick toggle between *All*, *Pending*, and *Completed* tasks.
- **Instant Feedback:** Beautiful toast notifications for CRUD actions using **React-Hot-Toast**.

### 🛡️ Technical Robustness
- **Redux Toolkit:** Centralized state management for predictable data flow.
- **RESTful API:** Secure backend with Mongoose schema validation and error handling.
- **Clean Architecture:** Separated concerns between Controllers, Routes, and Models.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit (RTK Thunks)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide-React / Heroicons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **CORS:** Secure cross-origin configuration

---

## 📂 Project Structure

```text
Task-Tracker/
├── backend/
│   ├── config/         # Database connection
│   ├── models/         # Mongoose Task Schema
│   ├── controllers/    # API Logic (CRUD)
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # TaskForm, TaskItem, EditModal
│   │   ├── store/      # Redux Toolkit (taskSlice)
│   │   ├── api/        # Axios configurations
│   │   └── App.jsx     # Main Logic & Sorting/Filtering
│   └── vite.config.js
└── README.md
```
## 🚀 Local Installation
### 1. Backend Setup
``` bash
cd backend
npm install
```
Create .env with: MONGO_URI, PORT, FRONTEND_URL
```bash
npm run dev
```
### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create .env with: VITE_BACKEND_URL
```bash
npm run dev
```
