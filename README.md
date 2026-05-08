# WorkflowAI — AI-Powered Workplace Productivity Assistant

A modern, production-style web application that helps professionals and students automate everyday workplace tasks using AI. Built as a polished suite of tools suitable for university or workplace AI project presentations.

> ⚠️ **Ethical AI Notice:** All outputs are AI-generated and may contain inaccuracies or bias. Always review content before professional use, never share confidential data, and verify factual claims with trusted sources.

---

## ✨ Features

### 1. Smart Email Generator
Generate professional emails by specifying:
- Email purpose
- Recipient type
- Tone (**formal**, **friendly**, or **persuasive**)

### 2. Meeting Notes Summarizer
Paste long meeting notes and get a structured summary with:
- Key points
- Decisions
- Action items (with owners)
- Deadlines

### 3. AI Task Planner
Turn a raw task list into a prioritized, time-blocked daily schedule with productivity tips and time-optimization suggestions.

### 4. Research Assistant
Distill articles or topics into:
- Simplified explanations
- Key insights
- Recommendations
- Further reading suggestions

### 5. AI Chatbot
A conversational assistant for any workplace, career, or productivity question, with full message history.

---

## 🛠 Additional Capabilities

- 🌗 **Dark mode toggle** with system-preference detection and persistence
- 📋 **Copy-to-clipboard** for every AI output
- 💾 **Export** generated content as `.txt` / `.md`
- 🕘 **History panel** of previous outputs (stored locally)
- ✅ **Input validation** — empty fields are blocked before sending
- 🛡 **Ethical AI notice** integrated across pages
- 📱 **Responsive** sidebar layout for desktop, tablet, and mobile

---

## 📂 Pages

| Route          | Description                          |
| -------------- | ------------------------------------ |
| `/`            | Dashboard with feature cards         |
| `/email`       | Smart Email Generator                |
| `/meetings`    | Meeting Notes Summarizer             |
| `/tasks`       | AI Task Planner                      |
| `/research`    | Research Assistant                   |
| `/chat`        | AI Chatbot                           |

---

## 🧰 Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7, SSR-ready)
- **Styling:** Tailwind CSS v4 with semantic design tokens (`oklch`)
- **UI Components:** shadcn/ui + Radix primitives + Lucide icons
- **AI:** Lovable AI Gateway (`google/gemini-3-flash-preview`)
- **Backend:** Lovable Cloud (Supabase under the hood)
- **Markdown rendering:** `react-markdown`
- **Server functions:** `@tanstack/react-start` typed RPC

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:8080`.

### Environment Variables

The project uses Lovable Cloud, which auto-generates the `.env` file with:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
LOVABLE_API_KEY=...   # used server-side for AI Gateway
```

> Do **not** edit `.env` manually — it is managed by Lovable Cloud.

---

## 📁 Project Structure

```
src/
├── components/         # Reusable UI (AppSidebar, AIOutput, ThemeToggle, ...)
│   └── ui/             # shadcn/ui primitives
├── lib/
│   ├── ai.functions.ts # Server functions calling the AI Gateway
│   └── history.ts      # LocalStorage history utility
├── routes/             # File-based routing
│   ├── __root.tsx
│   ├── index.tsx       # Dashboard
│   ├── email.tsx
│   ├── meetings.tsx
│   ├── tasks.tsx
│   ├── research.tsx
│   └── chat.tsx
├── integrations/supabase/
└── styles.css          # Design tokens & theme
```

---

## 🤖 How the AI Works

All AI calls go through a single typed server function (`runAI`) in `src/lib/ai.functions.ts`. It accepts a `task` (`email | summarize | plan | research | chat`) and a payload, builds task-specific system + user prompts, and forwards them to the Lovable AI Gateway.

No API key configuration is required from the user — the Lovable AI Gateway handles authentication automatically.

---

## 🧪 Available Scripts

```bash
bun run dev       # Start the dev server
bun run build     # Production build
bun run preview   # Preview the production build
bun run lint      # Run ESLint
```

---

## 🛡 Responsible Use

This project is intended for educational and productivity purposes. Outputs may contain inaccuracies, hallucinations, or bias. Users are responsible for:

- Reviewing and verifying every AI-generated output
- Avoiding the input of confidential, personal, or sensitive data
- Complying with their organization's AI usage policies

---

## 📜 License

MIT — feel free to use, modify, and adapt for academic or personal projects.

---

## 🙌 Acknowledgements

- [Lovable](https://lovable.dev) — AI development platform
- [TanStack](https://tanstack.com) — Router & Start framework
- [shadcn/ui](https://ui.shadcn.com) — UI components
- [Lucide](https://lucide.dev) — Icon set