# Matrix Security Con 2026

A modern, high-aesthetic single-page web application for a 1-day technical conference focused on Information Security. The app features a dynamic schedule, real-time filtering, and the iconic "Matrix Digital Rain" visual effect.

![Matrix Con Screenshot](https://img.shields.io/badge/Status-Secure-00FF41?style=for-the-badge&logo=matrix&logoColor=00FF41)

## 🟢 Key Features

- **Matrix Digital Rain:** High-performance background animation using HTML5 Canvas.
- **Dynamic Timeline:** Automatically calculates a full 1-day schedule (10:00 AM - 5:00 PM).
- **Enhanced Search & Highlighting:** Instant search by speaker, category, or title with real-time text highlighting and visual dimming.
- **Responsive Design:** Mobile-first terminal aesthetic that works on all devices.
- **Backend API:** Lightweight Node.js/Express server providing talk data via JSON.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Data:** JSON-based storage

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (installed with Node)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jefcap/the-matrix-event-talks-app.git
   cd the-matrix-event-talks-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   `http://localhost:3000`

## 📅 Schedule Logic

The event starts at **10:00 AM** and includes:
- **6 Technical Talks:** 1 hour each.
- **Transitions:** 10-minute gap between talks.
- **Lunch Break:** 1 hour (scheduled after the 3rd talk).

## 📂 Project Structure

```text
├── public/
│   ├── index.html    # Main structure
│   ├── script.js     # Matrix effect & rendering logic
│   └── style.css     # Terminal styling
├── talks.json        # Event data source
├── server.js         # Express server
└── package.json      # Dependencies and scripts
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
> _End_of_Transmission_2026_
