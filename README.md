# 🎭 Mood Journal

> **Track your emotions. Discover your patterns. Heal with music.**

Mood Journal is a full-stack emotional wellness app that helps you log your daily moods, understand your emotional triggers, and get personalized song and quote recommendations — all in one place.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥️ Frontend | [mood-journal-1-gnkh.onrender.com](https://mood-journal-1-gnkh.onrender.com) |
| ⚙️ Backend API | [mood-journal-oc1k.onrender.com](https://mood-journal-oc1k.onrender.com) |

---

## ✨ Features

- **🎯 Mood Logging** — Log your current mood with a single click from 8 emotional states
- **⚡ Mood Triggers** — Log what triggered your mood (work, sleep, relationships, etc.) with an optional personal note
- **🎵 Song Recommendations** — Get YouTube music recommendations based on your mood using the YouTube Data API
- **💬 Quote Suggestions** — Receive curated motivational or calming quotes matched to your emotional state
- **📊 Mood History** — View your full emotional history with filter by days and mood type
- **🔍 Trigger Filtering** — Filter history by specific triggers to spot patterns
- **📈 Trigger Stats** — See which triggers affect you most and what moods they cause
- **🧠 Weekly Insights** — See your dominant mood of the week at a glance

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React** — Component-based UI
- 🔀 **React Router** — Page navigation
- 🎨 **CSS** — Custom styling

### Backend
- 🟢 **Node.js** — Runtime environment
- 🚂 **Express.js** — REST API framework

### Database
- 🐘 **PostgreSQL** — Relational database
- 🔷 **Supabase** — Free hosted PostgreSQL (production)

### External APIs
- 📺 **YouTube Data API v3** — Song recommendations based on mood

### Deployment
- 🚀 **Render** — Frontend & backend hosting (free tier)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (local) or Supabase account
- YouTube Data API key — get it from [Google Cloud Console](https://console.cloud.google.com)

### 1. Clone the repository

```bash
git clone https://github.com/kante-Ramanaidu/mood-journal
cd mood-journal
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
DATABASE_URL=your_postgresql_or_supabase_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
CLIENT_ORIGIN=http://localhost:3000
```

Run this SQL once to create the required table:

```sql
CREATE TABLE moods (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL,
  mood       TEXT NOT NULL,
  triggers   TEXT[] DEFAULT '{}',
  note       TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 📁 Project Structure

```
mood-journal/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # App pages
│   │   ├── styles/           # CSS files
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   ├── mood.js           # Mood + trigger routes
│   │   ├── songs.js          # YouTube song recommendations
│   │   └── quotes.js         # Quote recommendations
│   ├── config/
│   │   └── db.js             # PostgreSQL connection
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login user |

### Mood
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/mood` | Log a mood entry |
| `POST` | `/api/mood/trigger` | Log mood with triggers and optional note |
| `GET` | `/api/mood/history?email=&days=` | Get mood history filtered by days |
| `GET` | `/api/mood/history?email=&days=&triggers=` | Filter history by specific triggers |
| `GET` | `/api/mood/triggers/stats?email=&days=` | Get trigger frequency and mood mapping |

### Recommendations
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/songs?mood=` | Get YouTube songs for a mood |
| `GET` | `/api/quotes?mood=` | Get curated quotes for a mood |


---

## 🧠 How It Works

1. **Log your mood** — Pick from 8 emotional states (Happy, Calm, Sad, Angry, etc.)
2. **Add a trigger** — Optionally log what caused the mood (work, sleep, relationships) with a personal note
3. **Get recommendations** — App fetches YouTube songs and curated quotes matching your mood
4. **View history** — See all past mood entries filtered by date range or trigger type
5. **Track patterns** — Understand which triggers affect you most and what moods they cause

---

## 😊 Supported Moods

| Emoji | Mood | Description |
|---|---|---|
| 😊 | Happy | Joyful, content, pleased |
| 😌 | Calm | Relaxed, peaceful, at ease |
| 🤔 | Neutral | OK, fine, indifferent |
| 😟 | Worried | Anxious, concerned, uneasy |
| 😢 | Sad | Down, blue, unhappy |
| 😤 | Frustrated | Annoyed, irritated, agitated |
| 😡 | Angry | Mad, furious, outraged |
| 🥰 | Loved | Appreciated, cherished, adored |

---

## 🌍 Deployment

This app is deployed on **Render** (free tier):

- Backend is a **Web Service** running Node.js
- Frontend is a **Static Site** serving the React build
- Database is hosted on **Supabase** (free PostgreSQL)

> ⚠️ Note: Free tier on Render may cause a ~10 second cold start delay on first load.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

Built with ❤️ to help people understand and improve their emotional wellbeing.

> *"Your emotions are valid. Track them, understand them, grow from them."*
