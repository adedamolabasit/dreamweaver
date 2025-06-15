# Dreamweaver.Ai

**An AI-powered creative tool that transforms subconscious dream-inspired words into unique stories and artworks, with the ability to register and monetize creations as on-chain intellectual property.**

---

## 🚀 Features

- Voice-to-Dream Capture: Record and transcribe your dream narrations using an intuitive voice input system.
- Dream Journal & Tracker: Save, organize, and revisit your dreams in a personal, searchable dream journal
- AI-Powered Dream Analysis: Generate symbolic interpretations and archetypes extracted from your subconscious narratives.
- Comic Story Generator: Instantly transform your dreams into immersive, AI-generated comic stories aligned with your dream themes.
- Interactive Visual Art: Create and explore dynamic images inspired by your dream content for deeper emotional connection.
- On-Chain IP Registration: Seamlessly mint your stories and artworks as intellectual property on the Story blockchain.
- Monetization Portal: Earn revenue by showcasing or licensing your AI-generated dream content through Web3 integrations.

### 🛠️ Installation & Setup

Follow these steps to run the project locally.

### 🔧 Prerequisites

- Node.js v16+
- Git

---

### 📦 Steps to Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/adedamolabasit/dreamweaver
cd dreamweaver
```

#### 2. Set Up the Frontend (Client)

cd dreamweaver-client
cp .env.example .env # Copy the env template

npm install # Install dependencies
npm run dev # Start Vite development server

#### 3. Set Up the Backend (Server)

cd ../dreamweaver-server
cp .env.example .env # Copy the env template

npm install # Install backend dependencies
npm run dev # Start Express server

✅ Development Servers
Frontend: http://localhost:5173

Backend: http://localhost:3000

## 🧩 Dependencies

A list of core technologies and libraries used in the project.

### 🌐 Frontend (Vite + React + TypeScript)

- **Vite** – Lightning-fast build tool and dev server
- **React** – Component-based UI library
- **TypeScript** – Static typing for JavaScript
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Tomo Wallet** – For wallet connection and blockchain interactions
- **Story SDK** – For on-chain intellectual property registration, license creation, rewards, and claims
- **React Router** – Client-side routing (if used)

### 🔧 Backend (Node + Express)

- **Express.js** – Minimal and flexible Node.js web application framework
- **MongoDB** – NoSQL database for storing user data, dreams, and creative content
- **Redis** – In-memory data store used for task queuing and caching
- **BullMQ / Bull** – (if used) Redis-backed queue system for background jobs
- **OpenAI API** – For generating dream-based stories, interpretations, and images (text + vision models)
- **Mongoose** for MongoDB object modeling
