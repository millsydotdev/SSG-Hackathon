# Deployment

## Environments

| Environment | Branch    | URL                      | Purpose             |
| ----------- | --------- | ------------------------ | ------------------- |
| Production  | `main`    | ssg-hackathon.vercel.app | Live                |
| Preview     | `develop` | *.vercel.app             | Integration testing |
| Local       | Local     | localhost:3000           | Development         |

## CI/CD Pipeline

The CI/CD pipeline runs on every push and pull request:

1. **Install** — `npm ci`
2. **Format Check** — `npm run format:check`
3. **Lint** — `npm run lint`
4. **TypeCheck** — `npm run typecheck`
5. **Build** — `npm run build`
6. **Deploy** — Auto-deploy to Vercel on `main` and `develop`

## Vercel Configuration

- Production deployment from `main`
- Preview deployments from `develop` and PR branches
- Environment variables configured in Vercel dashboard
- Automatic HTTPS, CDN, and edge caching

## Deployment Checklist

- [ ] All CI checks pass
- [ ] Environment variables configured in Vercel
- [ ] Database migrations applied
- [ ] RLS policies verified
- [ ] CSP headers reviewed
- [ ] Performance tested
- [ ] Accessibility checked
