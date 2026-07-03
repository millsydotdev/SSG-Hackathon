# API Documentation

## Overview

SSG-Hackathon uses a combination of:

1. **Supabase SDK** — Client-side and server-side data access
2. **Next.js API Routes** — Server-only endpoints when needed
3. **Supabase Edge Functions** — Serverless functions for complex operations

## API Design Principles

- RESTful conventions
- Type-safe inputs and outputs
- Authentication required for all non-public endpoints
- Rate limited per user
- Paginated list endpoints
- Consistent error responses

## Error Response Format

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

## Authentication

All API routes validate the JWT from the Supabase session. Public endpoints are explicitly marked.

## Rate Limiting

- Auth: 5 req/min per IP
- General: 100 req/min per user
- File upload: 10 req/h per user
