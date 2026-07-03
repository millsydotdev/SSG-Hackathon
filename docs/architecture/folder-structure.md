# Folder Structure

```
ssg-hackathon/
├── .github/                    # GitHub templates, CI/CD, issue templates
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
├── docs/                       # Project documentation
│   ├── architecture/
│   ├── security/
│   ├── components/
│   ├── api/
│   ├── database/
│   ├── testing/
│   ├── deployment/
│   ├── design-system/
│   └── adr/
├── public/                     # Static assets
│   ├── images/
│   └── fonts/
├── scripts/                    # Build and utility scripts
├── src/                        # Application source
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/        # Public marketing routes
│   │   ├── (dashboard)/        # Authenticated routes
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ui/                 # Primitive UI components
│   │   └── shared/            # Shared domain components
│   ├── config/                 # Application configuration
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, clients, validators
│   │   ├── supabase/           # Supabase client and helpers
│   │   ├── utils/              # General utilities
│   │   └── validators/         # Validation schemas
│   ├── services/               # Business logic layer
│   ├── styles/                 # Global styles
│   └── types/                  # TypeScript type definitions
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example                # Environment templates
├── .env.local.example
├── .env.preview.example
├── .env.production.example
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .prettierrc
├── .prettierignore
├── commitlint.config.js
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── vercel.json
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```
