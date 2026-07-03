# Security Standards

## Authentication Strategy

- Use Supabase Auth (built-in)
- JWT tokens are short-lived with refresh tokens
- HTTP-only, Secure, SameSite=Strict cookies for session tokens
- OAuth providers configurable per environment

## Authorization Strategy

- RBAC with three core roles: `admin`, `judge`, `participant`
- Supabase RLS policies enforce row-level permissions
- API middleware checks JWT claims for route access
- Feature-level permissions via claims or database lookup

## JWT/Session Handling

```typescript
// Sessions are managed by Supabase Auth
// Tokens are stored in HTTP-only cookies
// Session refresh is handled automatically by the Supabase client
```

## Content Security Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data:;
font-src 'self';
connect-src 'self' https://*.supabase.co;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

## Secure Headers

All responses include:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

## Rate Limiting Strategy

- Auth endpoints: 5 requests per minute per IP
- API endpoints: 100 requests per minute per user
- File upload: 10 per hour per user
- Webhook endpoints: IP allowlist

## Input Validation Strategy

- Zod schemas define all input shapes
- Validate on the client (UX) and server (security)
- Sanitise all user input
- Reject unknown fields

## Output Encoding

- React handles HTML escaping by default
- JSON responses are serialised safely
- File names are sanitised on download

## File Upload Validation

- Validate file type (MIME + extension)
- Validate file size (max 10 MB per file)
- Scan for malware (if applicable)
- Store in Supabase Storage with RLS
- Generate unique file names

## Audit Logging

- Log all authentication events
- Log all data mutations (create, update, delete)
- Log access to sensitive resources
- Logs stored securely with restricted access
- Include: timestamp, user ID, action, resource, IP address

## Dependency Security

- Dependabot configured for weekly scans
- `npm audit` runs in CI pipeline
- Dependency review action on PRs
- Only approve high-severity patches within 7 days
