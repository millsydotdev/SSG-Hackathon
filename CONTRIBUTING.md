# Contributing to SSG-Hackathon

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ssg-hackathon.git`
3. Install dependencies: `npm install`
4. Copy environment variables: `cp .env.example .env.local`
5. Start development: `npm run dev`

## Development Workflow

1. Create a branch from `develop`: `git checkout -b feat/your-feature`
2. Make your changes following our coding standards
3. Run the quality gate: `npm run ci`
4. Commit using conventional commits: `git commit -m "feat: your message"`
5. Push and create a pull request

## Branch Naming Convention

- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code refactoring
- `test/` — Adding or updating tests
- `chore/` — Maintenance tasks
- `perf/` — Performance improvements
- `style/` — Formatting, styling
- `ci/` — CI/CD changes

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

## Pull Request Process

1. Ensure all CI checks pass
2. Update documentation if needed
3. Add tests for new functionality
4. Request review from at least one maintainer
5. Squash merge once approved

## Code Standards

- No inline styles
- No duplicated logic
- No console.log in production (use `console.warn`/`console.error` for critical messages)
- No commented code
- No unused imports or variables
- TypeScript strict mode enforced
- WCAG AA accessibility minimum
- Component-first architecture
- Feature-based folder structure

## Questions?

Open a discussion on GitHub.
