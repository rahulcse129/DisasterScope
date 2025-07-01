📄 README.md (GitHub Version)

# 🌍 DisasterScope

**DisasterScope** is a full-stack web application for real-time monitoring of global disasters. It visualizes wildfire data from NASA FIRMS and tracks the current position of the International Space Station (ISS) using interactive maps.

Built with:

- React + TypeScript + Vite (Frontend)
- Node.js + Express + TypeScript (Backend)
- Leaflet.js for map rendering
- NASA FIRMS & N2YO APIs for real-time data

---

## 🚀 Features

- 🔥 Live wildfire tracking from NASA FIRMS
- 🛰️ ISS real-time location tracking (N2YO API)
- 🌐 Interactive Leaflet map with data overlays
- ✅ Backend proxy to handle API and CORS
- Responsive and modular UI components

---

## 🧱 Project Structure

DisasterScope/ 
├── frontend/         # Vite + React + Leaflet UI │   ├── src/ │   │   ├── components/ 
│   │   ├── api/ 
│   │   ├── types/ 
│   │   └── App.tsx, main.tsx, etc. 
│   └── .env 
├── backend/          # Express + TypeScript server │   ├── src/ │   │   ├── routes/ 
│   │   ├── types/ 
│   │   └── server.ts 
│   └── .env
└── README.md

---

## 🛠️ Local Development

### 🔧 Prerequisites

- Node.js v18+
- npm (or yarn)
- Git

---

### 📦 Setup Backend

```bash
cd backend
npm install
npm run build
npm start

Backend will run at http://localhost:5000


---

🖼️ Setup Frontend

cd ../frontend
npm install

Create a .env file:

VITE_BACKEND_URL=http://localhost:5000

Then run:

npm run dev

Frontend will be served at http://localhost:5173


---

🔗 API Endpoints

Route	Description

/api/wildfire	Fetch wildfire data (CSV)
/api/iss	Fetch current ISS coordinates



---

🧪 External APIs Used

NASA FIRMS: Fire data from https://firms.modaps.eosdis.nasa.gov/

N2YO API: ISS tracking from https://www.n2yo.com/api/



---

👤 Author

Rahul Pal 
rahulcse129
https://www.linkedin.com/in/rahul-pal-b28b9727b


---

📜 License

This project is licensed under the MIT License.

---
