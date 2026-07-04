# 🏗️ SSG-Hackathon

> Invite-only collaborative workstation for hackathon teams.

SSG-Hackathon is a platform that manages the complete lifecycle of a hackathon — from participation, planning, and research through to development, testing, submission, judging, and archival.

## ✨ Features

- **Participate** — Join hackathons, form teams, collaborate in real time
- **Plan** — Structured planning tools for project roadmaps
- **Research** — Collaborative research and discovery
- **Ideas** — Brainstorm, vote, and refine concepts
- **Delegate** — Task management with role-based assignment
- **Develop** — Integrated development workflow tracking
- **Test** — Built-in testing and quality gates
- **Submit** — Streamlined submission process
- **Judge** — Configurable judging rubrics and scoring
- **Archive** — Historical records of past hackathons

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/ssg-hackathon.git
cd ssg-hackathon

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Framework | Next.js 16 (App Router)      |
| Language  | TypeScript (strict mode)     |
| Styling   | Tailwind CSS v4              |
| Backend   | Supabase (PostgreSQL + Auth) |
| Hosting   | Vercel                       |

## 📁 Project Structure

```
src/
├── app/            # Next.js App Router pages and layouts
├── components/     # UI and shared components
├── config/         # Application and navigation configuration
├── core/           # Feature modules (planning, tasks, ideas, etc.)
├── identity/       # Authentication and session management
├── packages/       # Shared UI primitives, hooks, layouts, utils
├── services/       # Supabase client, config, logger, storage
├── lib/            # Utilities (cn helper)
├── proxy.ts        # Edge middleware (auth, setup redirect)
docs/               # Project documentation
.github/            # GitHub templates and CI/CD
```

## 📋 Development

```bash
npm run dev          # Start development server (webpack)
npm run build        # Production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
npm run test         # Run tests
npm run format       # Format code with Prettier
npm run ci           # Full quality gate (lint + typecheck + test + build)
```

## 🔒 Security

See [SECURITY.md](./SECURITY.md) for security policies and reporting procedures.

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE).
