<div align="center">

<p align="center">
  <img src="https://svg-banners.vercel.app/api?type=glitch&text1=Stock%20Trading%20Platform&text2=Next-Gen%20Market%20Simulator&width=900&height=200" />
</p>

A full-featured stock trading simulation platform inspired by Zerodha — including real-time market simulation, trading dashboard, authentication system, portfolio engine, news service, and more.

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=2300&pause=700&color=36BCF7&center=true&vCenter=true&width=600&lines=Real-time+Stock+Simulation;Buy+%2F+Sell+Trading+Engine;Google+OAuth+%2F+JWT+Auth;Full+Dashboard+with+Charts;Complete+Portfolio+%26+Holdings+System" />

---

### <span style="color:red; font-weight:bold;">⚠️ IMPORTANT: Run website on Google Chrome browser.  
For other browsers, you must manually enable third-party cookies.</span>

---

</div>

---

## 📦 **Project Overview**

This is a **production-style full-stack trading system** developed using:

- **Backend** → Node.js, Express.js, MongoDB  
- **Dashboard** → React (Vite), Tailwind, Zustand, Chart.js  
- **Landing Site** → React (Vite), Tailwind, Bootstrap  
- **Auth** → Passport.js, Google OAuth 2.0, JWT  
- **Simulation Engine** → Custom cron-based stock price updater  
- **News Engine** → Automated news generator  
- **Trading Engine** → Buy/Sell stocks, holdings, P/L tracking  

---

# 📂 **Project Structure**

The project is divided into **three separate apps**:

stock-trading-platform/

│── backend/ # Node.js + Express backend

│── dashboard/ # React Vite (User trading dashboard)

│── frontend/ # React Vite (Landing website)


---

# 🚀 **Technologies Used**

## 🔧 **Backend**
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime |
| **Express.js** | Backend framework |
| **MongoDB + Mongoose** | Database & Schema management |
| **Passport.js** | Local + Google OAuth authentication |
| **JWT** | Secure stateless sessions |
| **bcryptjs** | Password hashing |
| **cors** | Cross-origin support |
| **cookie-parser** | JWT cookie handling |
| **dotenv** | Environment variables |
| **Mongoose Transactions** | Prevent inconsistent trades |
| **Cron Jobs** | Market simulation + news updates |

---

## 📊 **Dashboard (React Trading Interface)**

- React (Vite)
- Tailwind CSS
- Material UI (MUI)
- Zustand (global state management)
- Axios
- Chart.js + react-chartjs-2
- React Router DOM
- react-toastify (notifications)

---

## 🏠 **Frontend (Public Landing Pages)**

- React (Vite)
- Tailwind CSS
- Bootstrap
- Material UI
- react-icons
- React Router DOM

---

# ✨ **Platform Features & Implementation**

## 🔐 **1. Authentication & User Protection**

### Features:
✔ Signup / Login / Logout  
✔ Google Login (OAuth 2.0)  
✔ JWT-based sessions stored in **HTTP-only secure cookies**  
✔ Password hashing with bcrypt  
✔ Protected routes with `verifyToken` middleware  

### Flow:
1. User logs in → JWT created  
2. JWT stored in secure cookie  
3. Dashboard reads JWT & fetches user data  
4. All trading operations require authentication  

---

## 📈 **2. Real-Time Stock Market Simulation**

### Implementation:
- Custom simulation engine (`StockService.js`)
- Cron job runs every X seconds/minutes
- Randomized price movement with volatility model
- Circuit breaker (upper/lower limit)
- Sector-based movement (from `sectorMap`)
- Saved into MongoDB (`Stocks` collection)
- Dashboard fetches live prices

### Effects:
- Prices change dynamically  
- Portfolio updates instantly  
- Charts show live trend  

---

## 💹 **3. Trading Engine (Buy/Sell Orders)**

### Supported operations:
- **Buy orders**
- **Sell orders**
- **Holdings calculation**
- **Average price calculation**
- **Live P/L**
- **Fund management**
- **Order history**
- **Day positions**
- **GTT Orders (Good Till Triggered)**

### Backend:
- `/api/order/buy`
- `/api/order/sell`
- MongoDB transactions ensure:
  - User funds update
  - Holdings update
  - Orders stored safely

---

## 💼 **4. Portfolio & Holdings System**

Tracks:
- Total invested amount  
- Current market value  
- Unrealized P/L  
- Realized P/L  
- Each stock’s:
  - Quantity  
  - Avg buy price  
  - Current price  
  - Net P/L  

---

## 📰 **5. Market News Engine**

- Auto-generated news using `newsService.js`
- Stored in `newsState`
- Dashboard displays latest headlines

---



# 📁 **Folder Structure (Backend)**

backend/

│── controllers/

│── models/

│── routes/

│── services/

│── utils/

│── data/

│── app.js

│── .env

│── package.json


---

# 🛠️ **Setup & Installation**

## 📌 Prerequisites
- Node.js
- MongoDB or MongoDB Atlas
- Google OAuth keys (optional)

---

## 📥 **1. Clone Repository**

git clone <https://github.com/MANANPATEL7310/Stock-Trading-Plateform>

cd stock-trading-platform


### 📦 2. Install Dependencies

# Backend
cd backend
npm install

# Dashboard
cd ../dashboard
npm install

# Frontend
cd ../frontend
npm install


### 🔑 3. Environment Setup

Create backend/.env:

PORT=5000

MONGO_URL=your_mongodb_url

FRONTEND_URL=http://localhost:5173

DASHBOARD_URL=http://localhost:5174

JWT_SECRET=your_secret_here

GOOGLE_CLIENT_ID=YOUR_ID

GOOGLE_CLIENT_SECRET=YOUR_SECRET


### 🔗 5. Access the App

| App                   | URL                                            |
| --------------------- | ---------------------------------------------- |
| **Landing Page**      | <https://stock-trading-plateform.onrender.com> |
| **Trading Dashboard** | <https://stock-trading-plateform-dashboard-erys.onrender.com> |

<div align="center">
🏁 Thank You for Exploring the Project!

⭐ If you like this project, consider giving the repo a star!

</div> 
