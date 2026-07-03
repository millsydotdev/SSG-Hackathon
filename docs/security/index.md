# Security Documentation

## Overview

This document outlines the security architecture, standards, and best practices for SSG-Hackathon.

## Principles

1. **Defence in Depth** — Multiple layers of security controls
2. **Least Privilege** — Minimum access required for each role
3. **Secure by Default** — Security is not optional
4. **Zero Trust** — Verify everything, trust nothing

## Authentication

- Supabase Auth provides the authentication layer
- JWT-based session management
- HTTP-only, secure cookies for session tokens
- Multi-factor authentication (planned)
- Session timeout and refresh handling

## Authorization

- Role-Based Access Control (RBAC) with three tiers:
  - Admin — Full system access
  - Judge — Access to judging interface and submissions
  - Participant — Access to team workspace and submissions
- Supabase Row-Level Security (RLS) enforces authorization at database level
- All API routes validate user permissions before processing

## Data Security

- All traffic encrypted in transit via TLS 1.3
- Sensitive data encrypted at rest
- Environment variables for all secrets
- Never hardcode credentials, tokens, or secrets
- Supabase provides encrypted database storage

## API Security

| Measure          | Implementation                           |
| ---------------- | ---------------------------------------- |
| Input validation | Zod schemas on all endpoints             |
| Rate limiting    | Upstash Redis (planned)                  |
| CORS             | Restricted per environment               |
| CSP              | Content Security Policy headers          |
| SQL injection    | Parameterised queries via Supabase       |
| XSS prevention   | React default escaping + output encoding |

## Infrastructure Security

- HTTPS-only via Vercel edge network
- Automated dependency scanning via Dependabot
- CI/CD pipeline runs security linting
- Regular `npm audit` and dependency reviews
- No secrets in repository (`.env*` files gitignored)

## Environment Security

| Environment | Variables Source                    |
| ----------- | ----------------------------------- |
| Local       | `.env.local`                        |
| Preview     | Vercel project env vars             |
| Production  | Vercel project env vars (encrypted) |

## Security Checklist

- [ ] Authentication implemented
- [ ] Authorization (RBAC) implemented
- [ ] RLS policies configured in Supabase
- [ ] CSP headers configured
- [ ] CORS configured per environment
- [ ] Rate limiting on auth routes
- [ ] Input validation on all endpoints
- [ ] Dependabot configured
- [ ] Secrets scanned (no secrets in repo)
- [ ] HTTPS enforced
- [ ] Audit logging implemented
- [ ] Session management configured
