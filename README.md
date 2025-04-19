
# 🇨🇦 IRCC Storyboard AI Assistant

A full-stack AI-powered Next.js application that helps users explore Canadian immigration processes such as Study Permits, PGWP, PR, and Citizenship — step by step. It leverages OpenRouter’s LLM to dynamically generate structured, interactive storyboards using data grounded in official Canadian government content.

> 🔍 **Data Source**: [canada.ca/en/services/immigration-citizenship](https://www.canada.ca/en/services/immigration-citizenship.html)  
> 🧠 **Powered by**: OpenRouter API + custom semantic breakdown logic  
> 🌐 **Deployment**: Planned via Vercel

---

## 🚀 Features

- 🔐 Google Authentication (via NextAuth.js)
- 🤖 LLM-based prompt interface (OpenRouter)
- 📌 Interactive, layered storyboard UI with expandable steps
- 🧠 Semantic decomposition of user prompts
- 💡 Each storyboard step shows title + details on click
- 📊 Clean UI using TailwindCSS + shadcn/ui
- 🔧 Prisma + PostgreSQL (Neon DB) for user data

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui  
- **Backend**: API routes inside Next.js  
- **Authentication**: NextAuth.js + Google OAuth  
- **LLM**: [OpenRouter](https://openrouter.ai) (Mixtral, configured for IRCC context only)  
- **Database**: Prisma + PostgreSQL (Neon)

---

## 🧑‍💻 Getting Started

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/Krishnagoyal-13/immigration-storyboard.git
cd immigration-storyboard
```

### 2. 📥 Install Dependencies

```bash
npm install
```

### 3. 🔐 Setup Environment Variables

Create a `.env` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_postgres_connection_url
```

🔑 You can get your free OpenRouter API key here: [https://openrouter.ai/keys](https://openrouter.ai/keys)

### 4. 🧬 Initialize Prisma & Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Example schema:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  image     String?
  createdAt DateTime @default(now())
}
```

### 5. ▶️ Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication Flow

- **Public Routes**: Home, About, Contact, Know the Team  
- **Private Routes**: `/prompt`, `/explore`, `/storyboard`  
- **Auth Method**: Google OAuth via NextAuth.js

---

## 📁 Folder Structure

```bash
/prisma
  └── schema.prisma          → DB schema

/src
  └── /app
      ├── /api
      │   ├── /auth/[...nextauth] → NextAuth config
      │   └── /chat               → OpenRouter API route
      └── /private
          ├── /prompt            → LLM prompt UI
          ├── /storyboard        → Multi-step storyboard
          └── /explore           → In-depth step explorer
      └── /public/auth           → Login/Register UIs
      └── about, contact, etc.   → Public-facing pages

  └── /components/_ui           → Reusable UI components
  └── /data                     → Static sample content
  └── /lib                      → API + utility helpers
```

---

## ✨ Example Prompts

Try asking:

- “How do I get PR if I’m on PGWP?”  
- “What is the eligibility for a study permit in Canada?”  
- “What are the steps for sponsoring my spouse?”  

Each response is structured as a clickable storyboard. Click any step to explore it further!

---

## 📈 LLM Behavior

1. User prompt is semantically broken down using NLP  
2. OpenRouter (Mixtral) is queried with constraints to IRCC content  
3. Response is parsed into structured steps (title + description)  
4. UI renders each step as an expandable card  

---

## ✅ To-Do / Future Enhancements

- 🔐 Add role-based user dashboard  
- 💾 Enable storyboard saving for signed-in users  
- 📤 Add export/print-to-PDF option  
- 📚 Integrate vector DB (e.g., Pinecone) for RAG + LLM hybrid  
- 🧩 Improve logging & error handling

---

## 🎦 Video Demo

[![Demo Video](https://github.com/user-attachments/assets/fea2d828-3d4c-442b-9ba5-ced9ccf371ef)](https://drive.google.com/file/d/13FswHvC-zFifqd06me6Tq6YrvbE_pIUB/view?usp=sharing)

---

## 👥 Contributors

- **Apoorva Jadhav** – [@apoorvajadhav](https://github.com/apoorvajadhav)  
- **Krishna Goyal** – [@Krishnagoyal-13](https://github.com/Krishnagoyal-13)
- **Saatvik Birla** - [@Saatvikbirla](https://github.com/Saatvikbirla)
- **Bhavya Narang** - [@bhavya405](https://github.com/bhavya405)

---

## 📄 License

MIT License – See the `LICENSE` file for details.
