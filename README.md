
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

## 🤖 AI Reference

<img width="1177" alt="1" src="https://github.com/user-attachments/assets/ddb9a1c7-9dab-4a6d-ab2a-c3e7784c523f" />

<img width="1177" alt="2" src="https://github.com/user-attachments/assets/db46aac6-1a6c-48c3-b772-2105e4e41de3" />

<img width="1177" alt="3" src="https://github.com/user-attachments/assets/934ce379-4b6d-4f5c-8b99-9bb4060efa9b" />

<img width="1177" alt="4" src="https://github.com/user-attachments/assets/08e9772d-d7fd-403f-a209-dca2866a95f8" />

<img width="1177" alt="5" src="https://github.com/user-attachments/assets/90ccf536-a61d-49a9-8481-054acff98fe4" />

![PHOTO-2025-04-17-23-32-12](https://github.com/user-attachments/assets/99eb8132-a429-4153-b6b4-212621d9bcdc)

![PHOTO-2025-04-17-23-32-49](https://github.com/user-attachments/assets/1990cd2d-7e47-4378-b45f-f2c640245314)

![WhatsApp Image 2025-04-18 at 14 08 42](https://github.com/user-attachments/assets/fa107fce-2ac0-44fe-8048-6a5da91f2bc6)

![WhatsApp Image 2025-04-18 at 14 09 00](https://github.com/user-attachments/assets/4b690617-6ebf-43c8-88f9-f06b474c5fd6)

![WhatsApp Image 2025-04-18 at 14 09 17](https://github.com/user-attachments/assets/748784c8-075e-4385-baca-ef2e0bfffc5b)

![WhatsApp Image 2025-04-18 at 14 09 25](https://github.com/user-attachments/assets/957c0e1f-97a7-485b-98c2-2b07d0bfadea)

![WhatsApp Image 2025-04-18 at 14 09 41](https://github.com/user-attachments/assets/b54729e6-d51f-4809-8f2f-7ed733786619)

<img width="1021" alt="Screenshot 2025-04-18 at 19 41 08" src="https://github.com/user-attachments/assets/ed2d8ac6-ce62-4598-a5fa-87659ca27de5" />

<img width="1021" alt="Screenshot 2025-04-18 at 19 41 23" src="https://github.com/user-attachments/assets/49969b79-62a1-47d6-8aef-e6482b3f7a5d" />

<img width="1021" alt="Screenshot 2025-04-18 at 19 41 50" src="https://github.com/user-attachments/assets/5a683abb-ba61-463f-9bff-a53263b5cd77" />

<img width="1021" alt="Screenshot 2025-04-18 at 19 42 10" src="https://github.com/user-attachments/assets/fa96aec2-6269-4595-8447-fb13a47748b5" />

<img width="1021" alt="Screenshot 2025-04-18 at 19 44 15" src="https://github.com/user-attachments/assets/12706bf1-c416-4c65-9025-f41331205f48" />

![WhatsApp Image 2025-04-18 at 14 11 17](https://github.com/user-attachments/assets/7f9b07fe-ac07-48f2-863c-d123490cbe38)


## 📚 References

Google Cloud Documentation. (n.d.). *Google Cloud*. [https://cloud.google.com/docs](https://cloud.google.com/docs?_gl=1*1t4tcum*_up*MQ..&gclid=CjwKCAjw8IfABhBXEiwAxRHlsCk2cAP8Wirqe_FEvyxDmAcxEQLig4So7TRDbG5YYAYUPzd1URqWjRoCs6wQAvD_BwE&gclsrc=aw.ds)

How to embed a video into GitHub README.md? (n.d.). *Stack Overflow*. [https://stackoverflow.com/questions/4279611/how-to-embed-a-video-into-github-readme-md/4279746#4279746](https://stackoverflow.com/questions/4279611/how-to-embed-a-video-into-github-readme-md/4279746#4279746)

Index | Node.js v21.4.0 Documentation. (n.d.). *Node.js*. [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)

Neon Docs. (n.d.). *Neon*. [https://neon.tech/docs/introduction](https://neon.tech/docs/introduction)

OpenAI ChatGPT. (n.d.). *OpenAI*. [https://chatgpt.com/](https://chatgpt.com/)

OpenRouter Quickstart Guide. (n.d.). *OpenRouter Documentation*. [https://openrouter.ai/docs/quickstart](https://openrouter.ai/docs/quickstart)

Vercel Documentation. (n.d.). *Vercel: Build and deploy the best web experiences with the Frontend Cloud*. [https://vercel.com/docs](https://vercel.com/docs)

Why does my Webapp not work with Google's OAuth login system? (n.d.). *Stack Overflow*. [https://stackoverflow.com/questions/75260960/why-does-my-webapp-not-work-with-googles-oauth-login-system](https://stackoverflow.com/questions/75260960/why-does-my-webapp-not-work-with-googles-oauth-login-system)


---

## 👥 Contributors

- **Apoorva Jadhav** – [@apo0orva](https://github.com/apo0orva)  
- **Krishna Goyal** – [@Krishnagoyal-13](https://github.com/Krishnagoyal-13)
- **Saatvik Birla** - [@Saatvikbirla](https://github.com/Saatvikbirla)
- **Bhavya Narang** - [@bhavya405](https://github.com/bhavya405)

---

## 📄 License

MIT License – See the `LICENSE` file for details.
