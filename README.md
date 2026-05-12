# FoodScout

FoodScout is a full-stack restaurant discovery platform that allows users to explore nearby restaurants, view ratings and reviews, and interact with locations through an interactive map interface. Admins can manage restaurants with full CRUD functionality and geospatial location support.

---

## Live Demo

Frontend: [FoodScout](https://food-scout-plum.vercel.app/)

Backend API: https://food-scout.onrender.com

---

# Features

## Authentication & Authorization

- JWT-based authentication
- Protected frontend routes
- Role-based access control
- Separate admin functionality
- Persistent login using localStorage

---

## Restaurant Discovery

- Browse restaurants
- Search restaurants by name
- Filter by category
- Sort by:
  - Latest
  - Oldest
  - Highest Rated
  - Nearby Restaurants
- Pagination support

---

## Restaurant Details

- Interactive map using Leaflet
- Restaurant ratings and reviews
- Category tags
- Average rating calculation
- Detailed restaurant information

---

## Reviews System

- Add ratings and reviews
- One review per user restriction
- Average rating calculation
- Review validation

---

## Admin Features

- Add restaurants
- Edit restaurants
- Delete restaurants
- Select restaurant location using interactive map
- Auto-detect current location

---

## Geospatial Features

- Nearby restaurant search
- Location-based restaurant discovery
- Interactive map integration
- Custom restaurant location selection

---

# Technical Highlights

- Geospatial MongoDB queries using `2dsphere` indexing
- Reusable create/edit restaurant form architecture
- Interactive map integration with React Leaflet
- Role-based route protection
- JWT authentication middleware
- RESTful API architecture

---

# Tech Stack

## Frontend

- React
- TypeScript
- React Router DOM
- Axios
- React Leaflet
- Leaflet
- CSS
- Vite

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# Screenshots

## Home / Restaurants Page

<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/c8c680ca-c417-42dd-9d5b-db98e42afd6e" />

---

## Restaurant Details Page

<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/6e865eef-12bd-42a7-85ed-dc337479ad2a" />

<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/e63ede94-4432-4e17-9a5d-bdf3f4616dc3" />

---

## Add Restaurant Page

<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/c5d18f00-93d5-422f-ad3e-d2559907e808" />

<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/09ee7517-5b0c-486b-9602-5e856ab15206" />

---

## Edit Restaurant Page

<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/fbc76a70-2322-48d0-852a-3790ff12a67b" />

---

# Demo Credentials

## Admin Account

```txt
Email: PASTE_ADMIN_EMAIL
Password: PASTE_ADMIN_PASSWORD
```

## User Account

```txt
Email: PASTE_USER_EMAIL
Password: PASTE_USER_PASSWORD
```

---

# Folder Structure

```bash
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── styles/
│   └── App.tsx

backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.ts
```

---

# API Endpoints

## Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user |

---

## Restaurant Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/restaurants` | Get all restaurants |
| GET | `/api/restaurants/:id` | Get single restaurant |
| GET | `/api/restaurants/near` | Get nearby restaurants |
| POST | `/api/restaurants` | Create restaurant (Admin) |
| PUT | `/api/restaurants/:id` | Edit restaurant (Admin) |
| DELETE | `/api/restaurants/:id` | Delete restaurant (Admin) |
| POST | `/api/restaurants/:id/rating` | Add review |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/krish999777/restaurant-finder
```

---

# Environment Variables

## Backend `.env`

```env
MONGO_URI=YOUR_MONGO_URI
JWT_KEY=YOUR_SECRET_KEY
PORT=8000
```

## Frontend `.env`

```env
VITE_API_URL=YOUR_BACKEND_URL
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Challenges Faced

- Implementing reusable create/edit restaurant forms
- Managing interactive map state with React Leaflet
- Geospatial queries using MongoDB
- Authentication and protected routes
- Role-based frontend rendering
- TypeScript type safety during deployment
- Production deployment configuration

---

# Learnings

- Full-stack application architecture
- Reusable component design
- REST API development
- JWT authentication flow
- Geospatial database queries
- React Leaflet integration
- Deployment workflows
- TypeScript strict mode handling

---

# Future Improvements

- Restaurant image uploads
- Better mobile responsiveness
- Advanced filtering
- Bookmark/favorites system
- Review editing/deletion
- Better loading skeletons
- Map clustering
- Infinite scrolling

---

# Author

## Krish Shah

GitHub: https://github.com/krish999777

LinkedIn: https://www.linkedin.com/in/krish-shah-ab3b93336/
