# Engineering Standards

## Tooling

| Tool        | Purpose                   | Config File              |
| ----------- | ------------------------- | ------------------------ |
| TypeScript  | Type checking             | `tsconfig.json`          |
| ESLint      | Code quality              | `eslint.config.mjs`      |
| Prettier    | Code formatting           | `.prettierrc`            |
| Husky       | Git hooks                 | `package.json (prepare)` |
| lint-staged | Staged file linting       | `package.json`           |
| Commitlint  | Commit message validation | `commitlint.config.js`   |

## Pre-commit Hooks

Before every commit, the following checks run on staged files:

1. ESLint (with `--fix`)
2. Prettier (with `--write`)

Commits that fail these checks are rejected.

## Commit Convention

Format: `<type>(<scope>): <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

Examples:

- `feat(hackathon): add submission scoring`
- `fix(judging): prevent duplicate scores`
- `docs: update API documentation`
- `refactor(auth): extract session validation`

## CI Pipeline

Every push triggers:

1. Format check (`npm run format:check`)
2. Lint (`npm run lint`)
3. Type check (`npm run typecheck`)
4. Build (`npm run build`)

The pipeline fails on any warning or error.

## Code Review

- Every PR requires at least one approval
- All CI checks must pass before merging
- squash merge to `main`
- Follow the PR template

## Definition of Done

A task is complete when:

- Build passes
- TypeScript passes
- ESLint passes
- Formatting passes
- CI passes
- Documentation updated
- Production build succeeds
