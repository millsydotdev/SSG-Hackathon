# Security Policy

## Supported Versions

We currently support the latest stable release with security updates.

| Version  | Supported          |
| -------- | ------------------ |
| latest   | :white_check_mark: |
| < latest | :x:                |

## Reporting a Vulnerability

We take the security of SSG-Hackathon seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the project maintainers.

You should receive a response within 48 hours. If you do not, please follow up.

Please include:

- Type of issue (e.g., XSS, SQL injection, privilege escalation)
- Full paths of the affected source file(s)
- Step-by-step reproduction instructions
- Proof-of-concept or exploit code (if possible)
- Impact of the issue

## Security Architecture

### Authentication

- Supabase Auth for all authentication flows
- JWT tokens are HTTP-only, secure cookies where applicable
- Multi-factor authentication support planned

### Authorization

- Role-Based Access Control (RBAC)
- Row-Level Security (RLS) via Supabase
- Least privilege principle throughout

### Data Protection

- All data encrypted in transit (TLS 1.3)
- Sensitive data encrypted at rest
- Environment variables for all secrets — never hardcoded
- No secrets in the repository

### API Security

- Input validation on all endpoints
- Rate limiting on authentication routes
- Content Security Policy (CSP) enforced
- CORS configured per environment
- Parameterized queries via Supabase (no SQL injection)

### Infrastructure

- HTTPS-only via Vercel
- Automated dependency scanning via Dependabot
- CI/CD pipeline runs security linting
- Regular dependency audits

## Disclosure Policy

When a vulnerability is reported:

1. The report is acknowledged within 48 hours
2. An initial assessment is made within 5 business days
3. A fix is developed and tested
4. A patch is released
5. The vulnerability is publicly disclosed after the patch

## Preferred Languages

We prefer all communications to be in English.
