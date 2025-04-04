# 🇨🇦 IRCC Storyboard AI Assistant

A full-stack AI-powered Next.js application that helps users explore Canadian immigration processes such as Study Permits, PGWP, PR, and Citizenship — step by step. It leverages OpenRouter (Mixtral) LLM to dynamically generate structured, interactive storyboards.

---

## 🚀 Features

- 🤖 LLM-based prompt interface
- 📌 Interactive, layered storyboard steps
- 🧠 Drill-down on any step for more detail
- 📊 Clean UI with Tailwind + shadcn/ui
- 🔐 Login & Signup (UI ready for future auth integration)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: OpenAI-compatible API (OpenRouter + Mixtral)
- **LLM**: [https://openrouter.ai](https://openrouter.ai) (Mixtral 8x7b)

---

## 🧑‍💻 Getting Started

### 1. 📦 Clone the repository
```bash
git clone https://github.com/Krishnagoyal-13/immigration-storyboard.git
cd ircc-storyboard
```

### 2. 🧬 Install dependencies
```bash
npm install
```

### 3. 🔐 Setup environment variables
Create a `.env.local` file at the root:
```env
OPENROUTER_API_KEY=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
```

You can get your free OpenRouter key from [https://openrouter.ai/keys](https://openrouter.ai/keys)

### 4. 💅 Install shadcn components
If not yet installed, initialize and add components:
```bash
npx shadcn@latest init
npx shadcn@latest add card button input
```

### 5. 🧠 Run the dev server
```bash
npm run dev
```

Visit `http://localhost:3000` to explore.

---

## 📁 Key Pages & Routes

| Route            | Purpose                                |
|------------------|----------------------------------------|
| `/`              | Home with Login / Signup               |
| `/login`         | Fake login (UI only)                   |
| `/signup`        | Fake signup (UI only)                  |
| `/prompt`        | Main LLM prompt → storyboard view      |
| `/storyboard`    | Static JSON storyboard viewer          |
| `/explore`       | Dynamic step expansion via query       |

---

## ✨ Example Prompts
Try asking:
- "How do I get PR if I’m on PGWP?"
- "What is the eligibility for a study permit in Canada?"

Then click any step to explore deeper layers.

---

## 🧠 LLM Prompt Behavior
- First prompt: returns **only step titles**
- On click: sends that title back + original prompt to LLM
- LLM responds with structured `title + description` steps

---

## 📦 Folder Structure (important files)
```
/src
  /app
    /prompt            → LLM prompt UI
    /explore           → Deep step exploration page
    /api/chat/route.ts → Backend API for LLM requests
  /components
    Storyboard.tsx     → Interactive storyboard UI
  /data
    study_permit.json  → Sample static JSON
```

---

## ✅ To-Do / Extend Ideas
- Add Firebase/Auth.js for real login/signup
- Save storyboards per user
- Export or print storyboard
- Track navigation history / breadcrumbs
- Use vector DB + RAG for deeper IRCC context

---

## 👤 Author
- Krishna Goyal

---

## 📄 License
MIT

