# Folder Structure

```
ssg-hackathon/
├── .github/                    # GitHub templates, CI/CD, issue templates
├── docs/                       # Project documentation
│   ├── adr/                    # Architecture Decision Records
│   ├── api/
│   ├── architecture/
│   ├── audit/
│   ├── components/
│   ├── database/
│   ├── deployment/
│   ├── design/
│   ├── design-system/
│   ├── guides/
│   ├── infrastructure/
│   ├── integrations/
│   ├── releases/
│   ├── security/
│   ├── standards/
│   ├── testing/
│   └── index.md
├── public/                     # Static assets (logo, favicon)
├── scripts/                    # Build and utility scripts
├── src/                        # Application source
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── app/                # Authenticated workspace routes
│   │   ├── api/                # API routes
│   │   ├── setup/              # First-run setup wizard
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components (admin, analytics, auth, ui, etc.)
│   ├── config/                 # Application and navigation configuration
│   ├── core/                   # Feature modules (domain logic)
│   │   ├── admin/
│   │   ├── analytics/
│   │   ├── automation/
│   │   ├── github/
│   │   ├── hackathon/
│   │   ├── planning/
│   │   ├── tasks/
│   │   └── ...
│   ├── identity/               # Authentication, session, guards
│   ├── lib/                    # Utilities (cn helper)
│   ├── packages/               # Shared hooks, layouts, constants
│   ├── proxy.ts                # Edge middleware
│   └── services/               # Supabase client, config, logger
├── supabase/
│   └── migrations/             # Numbered SQL migrations (00001-00032)
├── AGENTS.md
├── .env.example
├── .gitignore
├── .prettierrc
├── commitlint.config.js
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vitest.config.ts
```
