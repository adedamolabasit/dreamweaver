# Dreamweaver.AI

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


## 🪙 Sponsor Technology Usage

### 🔐 Tomo Wallet Integration

Tomo Wallet is integrated into the frontend to enable secure blockchain-based user authentication and transaction authorization.

- **User Authentication**: Users connect their wallets via Tomo Wallet, which initiates a session with the backend using JWT. This session allows persistent identity across the application.
- **Transaction Authorization**: Connected wallets are also used to sign and authorize transactions, such as on-chain IP registration and claiming rewards.

📁 **Code Reference**:  
See [`dreamweaver-client/src/App.tsx`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/App.tsx) for Tomo Wallet configuration and session setup.

### 📚 Story SDK Integration

The **Story SDK** is a core part of the application's Web3 functionality, enabling users to register and monetize their dream-inspired creative content as intellectual property on-chain.

#### 🧠 Key Use Cases:

- **Register IP & Attach License**  
  Users can register their dream-generated content as on-chain IP and attach license terms to it.  
  📁 See [dreamweaver-client/src/page-components/profile/components/actions/RegisterIpAsset.tsx](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/page-components/profile/components/actions/RegisterIpAsset.tsx)

- **Claim Royalties**  
  Users can claim earnings generated from licensed IP content.  
  📁 See [`dreamweaver-client/src/page-components/profile/components/actions/claimRevenue.tsx`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/page-components/profile/components/actions/claimRevenue.tsx)

- **Mint an IP**  
  Allows minting a blockchain token that represents a registered intellectual property.  
  📁 See [`dreamweaver-client/src/page-components/stories/components/list/index.tsx`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/page-components/stories/components/list/index.tsx)

- **Attach license to an IP**  
  To attach a lisense to an existing IP. 
  📁 See [`dreamweaver-client/src/page-components/profile/components/actions/AttachLicense.tsx`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/page-components/profile/components/actions/AttachLicense.tsx)

- **Tip a Creator**  
  Enables supporters to send tips to dream creators through Story’s protocol.  
  📁 See [`dreamweaver-client/src/page-components/stories/components/list/index.tsx`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/page-components/stories/components/list/index.tsx)

- **Fetch All License Terms for an IP**  
  Uses the Story REST API to retrieve available license terms for a given IP.  
  📁 See [`dreamweaver-client/src/api/storyApi.ts`](https://github.com/your-username/dreamweaver/blob/main/server/services/story-api.ts)

- **Get License Term Details by ID**  
  Retrieves the details of a specific license term by its ID.  
  📁 See [`dreamweaver-client/src/api/storyApi.ts`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/api/storyApi.ts)

🔧 **SDK Initialization**  
The Story Client is configured and initialized in the frontend inside:  
📁 [`dreamweaver-client/src/api/storyApi.ts`](https://github.com/adedamolabasit/dreamweaver/blob/main/dreamweaver-client/src/api/storyApi.ts)

---
