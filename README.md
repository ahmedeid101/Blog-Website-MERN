📌 Inkspire – A MERN Blog Platform

🚀 Overview

## Inkspire is a full-stack MERN blog platform where users can:

✍️ Create and publish blog posts

📖 Read blogs from others

🛡️ Authenticate using JWT (login/register)

🔐 Reset passwords via email

👤 Manage profiles

📌 Perform CRUD operations on blogs

This project is built with the MERN stack (MongoDB, Express, React, Node.js) and follows a modular structure for scalability.

🛠️ Tech Stack

# Frontend: React, Redux, Axios, TailwindCSS (or Bootstrap depending on your UI)

# Backend: Node.js, Express.js

# Database: MongoDB + Mongoose

# Authentication: JWT + Bcrypt

# Email Service: Nodemailer (for password reset links)

📂 Project Structure

Blog-Website-MERN/
│── backend/
│   ├── src/
│   │   ├── config/        # DB connection, environment setup
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routes
│   │   ├── services/      # Email, token handling
│   │   ├── middlewares/   # Auth middleware, error handling
│   │   └── utils/         # utils and helper function 
│   │   └── app.js         # Express entry point
│   ├── .env               # Env variables (DB_URI, JWT_SECRET, etc.)
│   ├── package.json       
│
│── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── images/
│   │   ├── pages/         # Pages (Home, Blog, Login, Register, etc.)
│   │   ├── redux/         # Redux store & slices
│   │   └── App.js         # Main React entry point       ├── .env 
│   ├── package.json
│
│── nginx/                 # Nginx reverse proxy config
│── docker-compose.yml
│── README.md

⚙️ Installation

1️⃣ Clone Repo
- git clone https://github.com/ahmedeid101/Blog-Website-MERN.git
- cd blog-website-mern

2️⃣ Backend Setup
- cd backend
- npm install

# Create .env file inside backend/:
PORT=5000
MONGO_URI=your_mongo_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your cloudinary name
CLOUDINARY_API_KEY=your cloudinary api key
CLOUDINARY_API_SECRET=your cloudinary api secret
APP_EMAIL_ADDRESS=your_email@example.com
APP_EMAIL_PASSWORD=your_email_password
CLIENT_DOMAIN=http://localhost:3000

# Run server:
- npm run dev

3️⃣ Frontend Setup
- cd frontend
- npm install

# Create .env file inside frontend/:
REACT_APP_API_URL=http://localhost:8000/api

# Run server:
- npm start

🐳 Running with Docker

## This project is fully containerized using Docker and docker-compose.
## Both frontend (React) and backend (Express + MongoDB) are orchestrated with Nginx for production-ready deployment.

1️⃣ Prerequisites

* Install Docker

* Install Docker Compose

2️⃣ Clone the Repository
- git clone https://github.com/ahmedeid101/Blog-Website-MERN.git
- cd blog-website-mern

3️⃣ Create .env files
# Already done above

4️⃣ Build & Run with Docker Compose
- docker-compose up --build -d

# This will:

* Build frontend → static files → served by Nginx

* Start backend → Express server

* Start MongoDB → database

5️⃣ Access the Application

Frontend → http://localhost

Backend API → http://localhost/api

MongoDB → exposed on port 27017 (for development use only)

6️⃣ Managing Containers

* Stop containers:
- docker-compose down

* View logs:
- docker-compose logs -f


## 🚀 Features

### ✅ Completed Features
- 🔐 **User Authentication** – register, login, JWT-based auth  
- ✉️ **Password Reset** with email verification  
- 📝 **Blog Management** – create, update, delete, and view blogs  
- 🎨 **Rich Text Editor** for writing blogs  
- 📱 **Responsive UI** with modern design  
- 💬 **Comments System** – users can comment on blogs  
- ❤️ **Likes & Reactions** on blogs  
- 🏷️ **Categories/Tags** for blogs  
- 👤 **User Profiles & Avatars**  
- 🛠️ **Admin Dashboard** – manage users and blogs
- 🐳 **Dockerized Setup** – run frontend & backend with docker-compose up -d
- ✅ **Nginx Integration** – production-ready build served via Nginx
- ✅ **SPA Routing Fix** – React routes (/login, /blogs/:id, etc.) no longer throw 404 on refresh
- ✅ **Multi-Stage Builds** – optimized Dockerfiles (smaller image sizes)
- ✅ **Environment Variable Support** – easily configurable .env for both frontend & backend

---

### 🔮 Future Improvements
- 🔍 **Blog Search & Filtering**  
- ⏳ **Drafts & Publish Scheduling**  
- 🤝 **Follow System** – follow users & see their blogs  
- 🔔 **Notifications** – for likes, comments, and follows  
- 🌙 **Dark Mode Support**  
- 📈 **SEO Optimization**  


🔐 Security

# Passwords hashed with bcrypt

# Authentication via JWT tokens

# Secure password reset with email tokens

🤝 Contributing

# Pull requests are welcome. Please open an issue first to discuss major changes.

📜 License

# This project is licensed under the MIT License.

👨‍💻 Author

## Developed by Ahmed Eid ✨
- GitHub: https://github.com/ahmedeid101
- LinkedIn: https://www.linkedin.com/in/ahmed-eid-4085b2202
