
# 🌍 LandGuard AI

LandGuard AI is an intelligent web application that leverages geospatial data and AI analytics to help users monitor, analyze, and manage land parcels more efficiently. It provides a visual interface for mapping parcels, assessing environmental and risk factors, and connecting landowners with interested stakeholders.

---

## 🚀 Table of Contents

- [Overview](#-overview)  
- [Problem Statement](#-problem-statement)  
- [Solution](#-solution)  
- [Tech Stack](#-tech-stack)  
- [Features](#-features)  
- [Installation & Setup](#-installation--setup)  
  - [1. Backend Setup](#1-backend-setup)  
  - [2. Frontend Setup](#2-frontend-setup)  
- [Running the Project](#-running-the-project)  
- [Monetization Strategy](#-monetization-strategy)  
- [Collaboration](#-collaboration)  
- [Author](#-author)

---

## 🌐 Overview

LandGuard AI provides a platform where individuals, NGOs, or governments can **map parcels of land**, run **AI-based environmental risk analyses**, and visualize results on an interactive map. It allows users to register/login, add parcels, and view detailed analytics.

The frontend is built with **React** and uses **Leaflet.js** for mapping, while the backend is powered by **Node.js / Express** and **MongoDB** for data persistence.

---

## 🧭 Problem Statement

Land degradation, illegal deforestation, and poor land management are major challenges, especially in developing regions.  
Currently, most land risk assessments are:

- ❌ Manual and time-consuming  
- ❌ Done without proper geospatial tools  
- ❌ Lack real-time data integration  
- ❌ Not accessible to everyday landowners

---

## 💡 Solution

LandGuard AI solves this problem by:

- ✅ Allowing users to **digitally map their parcels** using an interactive map.  
- ✅ Running **AI or algorithmic risk analysis** on parcels (e.g., deforestation risk, environmental risk scores).  
- ✅ Visualizing parcels with **color-coded risk levels** on a Leaflet map.  
- ✅ Providing a **marketplace section** where landowners and NGOs can collaborate.  
- ✅ Offering a modern, browser-based tool accessible to both technical and non-technical users.

---

## 🧱 Tech Stack

**Frontend:**
- React 
- React Router DOM
- Leaflet.js (OpenStreetMap for mapping)
- React Toastify for notifications
- HTML5 / CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

**Other Tools:**

- dotenv for environment variables
- Joi for request validation

---

## ✨ Features

- 🌍 **Interactive Map** — view and click on parcels  
- 🧠 **Risk Analysis** — visualize parcel risk using color-coded layers  
- 📝 **User Auth** — register/login with JWT authentication  
- 🏞️ **Add & Edit Parcels** — add geospatial data with metadata  
- 🛍️ **Project Marketplace** — connect landowners and stakeholders  
- 📱 Responsive layout for mobile and desktop

---

## 🛠️ Installation & Setup

### 📌 Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) running locally or in the cloud (e.g., Atlas)
- Git (optional)

---

### 1. Backend Setup

```bash
cd backend
npm install
````

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/landguard
JWT_SECRET=your_jwt_secret_here
```

Start the backend:

```bash
npm run dev
```

> The backend should now be running on **[http://localhost:5000](http://localhost:5000)**

---

### 2. Frontend Setup

You have two options:

#### ✅ Option A: Using Vite (modern React setup)

```bash
cd frontend
npm install
npm run dev
```

> Visit `http://localhost:5173`

---

#### ✅ Option B: Using Static HTML (no build tools)

* Open `frontend/index.html` in your browser directly
  OR
* Serve it using a static server:

```bash
npx serve frontend
```

---

## 🧠 Running the Project

1. Start **MongoDB** locally or connect to your Atlas cluster.
2. Start the **backend server** (`npm run dev` inside `backend`).
3. Start or open the **frontend**.
4. Visit the application in your browser (e.g., `http://localhost:5173` or the static server URL).
5. Register a new user, log in, and start adding parcels!

---

## 💰 Monetization Strategy

Possible monetization models for LandGuard AI:

* **Subscription Model**: Landowners pay a monthly fee for advanced risk analysis, reporting, or alerts.
* **Pay-per-Analysis**: Users pay per parcel analysis or for downloading premium reports.
* **Marketplace Commission**: Take a commission on successful collaborations or land project funding through the platform.
* **API Access**: Offer paid access to risk analysis API for third-party developers and organizations.
* **Freemium Model**: Free basic features; premium analytics and marketplace tools for paid users.

---

## 🤝 Collaboration

LandGuard AI is designed to foster collaboration between:

* 🧑‍🌾 **Landowners** — map and monitor their parcels
* 🌱 **NGOs & Governments** — analyze risk at scale and run conservation programs
* 🧠 **Developers / Data Scientists** — extend the platform with plugins or better AI models
* 💼 **Businesses & Investors** — connect with sustainable land projects in the marketplace
* 


Author: **Charles Wambua**
