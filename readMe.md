# 🎬 MERN Stack Movie Application

A full-stack movie management application built using the MERN stack, featuring JWT-based authentication, role-based access control, and scalable backend design. The application allows users to browse, search, and sort movies, while admins can manage movie data through secure CRUD operations.

---

## 🚀 Features

### User Features
- User authentication using JWT (HTTP-only cookies)
- View movies with pagination
- Search movies by title
- Sort movies by name, rating, year, and duration
- View detailed movie information

### Admin Features
- Admin authentication and authorization
- Add new movies
- Edit existing movie details
- Delete movies
- Role-based access control enforced on backend

---

## 🔐 Authentication & Authorization

- JWT tokens are stored in HTTP-only cookies for security
- Backend middleware verifies authentication and user roles
- Frontend implements route protection for admin-only views
- Backend remains the single source of truth for access control

---

## ⚙️ Backend Highlights

- Built with Node.js and Express
- MongoDB used for data persistence
- RESTful API design
- Input validation using Zod
- Centralized error handling
- Queue-based lazy insertion for admin movie creation to decouple request handling from database writes and improve concurrency handling

---

## 🧠 Queue-Based Data Handling

Admin movie creation is handled asynchronously using a queue mechanism.  
This approach improves API responsiveness by offloading database writes to a background process, ensuring better performance under concurrent admin operations.

---

## 🖥️ Frontend Highlights

- Built with React
- UI components implemented using Material-UI
- State and authentication handled using Context API
- Protected routes for authenticated users and admins
- Clean separation between user and admin workflows

---

## 🛠️ Tech Stack

### Frontend
- React
- Material-UI
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Zod
- JWT

