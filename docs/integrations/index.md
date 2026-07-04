# Integration Centre

## Overview

The Integration Centre provides a unified framework for connecting external services to SSG-Hackathon. Every integration follows the same lifecycle: overview → setup → connect → validate → health → monitor → disconnect.

GitHub is the reference implementation. Future integrations (ICS Calendar, etc.) plug into the same framework.

## Architecture

```
/app/integrations                    ← Dashboard (card grid)
/app/integrations/github             ← GitHub implementation
/app/integrations/{future}           ← Future integrations

core/integrations/
  types.ts                           ← IntegrationDefinition registry
  service.ts                         ← Generic CRUD + health + logs + validations

components/integrations/
  integration-card.tsx               ← Reusable card
  connection-health.tsx              ← Health dashboard
  sync-history.tsx                   ← Activity feed
```

### Database Tables

| Table | Purpose |
|---|---|
| `integration_connections` | One row per hackathon per integration type |
| `integration_health` | Time-series health check results |
| `integration_logs` | Time-series log entries |
| `integration_validations` | Time-series validation results |

### Lifecycle

1. **Setup** — User sees setup guide with requirements and step-by-step instructions
2. **Connect** — OAuth (recommended) or PAT/API key authentication
3. **Validate** — Automatic validation of connection, permissions, and API access
4. **Health** — Ongoing health checks with score (0-100)
5. **Monitor** — Logs, validation history, sync status
6. **Disconnect** — Clean removal of connection and all associated data

## Authentication

### OAuth (Recommended)

- Uses Supabase Auth's built-in OAuth provider
- Provider token stored in Supabase session (not in our database)
- Token refreshed automatically by Supabase
- No token management needed

### PAT (Personal Access Token)

- For advanced users who need fine-grained permissions
- Encrypted before storage using `pgp_sym_encrypt` before storage, decrypted via RPC on retrieval
- Never exposed in plaintext to the client
- Encryption key stored in `app_secrets` table, auto-generated on first run

## Encryption

PAT tokens are encrypted using PostgreSQL's `pgp_sym_encrypt` with AES-256.

### Architecture

1. On save: `encrypt_token(plaintext)` → base64-encoded ciphertext stored in `github_connections.encrypted_token`
2. On retrieve: `decrypt_token(ciphertext)` → plaintext returned server-side only
3. Key: 32-byte random hex string stored in `app_secrets` table, generated on migration 00029

### Key Rotation

To rotate the encryption key:
1. Generate a new key: `select encode(gen_random_bytes(32), 'hex')`
2. Update the key: `update app_secrets set value = '...' where key = 'encryption_key'`
3. Re-encrypt all existing PATs: call `encrypt_token` for each connection

### Failure Handling

- If the encryption key is missing, `encrypt_token` and `decrypt_token` raise an exception
- The GitHub service catches encryption failures and falls through gracefully
- Plaintext `access_token` column is kept as a fallback for failed encryption

## Validation Engine

Every integration uses the `integration_validations` table for check results.

### Validation Types

- `connection` — Can we reach the service?
- `authentication` — Is the auth method valid?
- `permissions` — Are required scopes available?
- `repository` — Does the repository exist and is it accessible?
- `features` — Are enabled features actually available?

### Results

| Result | Meaning |
|---|---|
| `passed` | Check succeeded |
| `failed` | Check failed — action required |
| `warning` | Check passed but has concerns |
| `skipped` | Check was not applicable |

## Health Engine

Health is calculated as a score from 0-100, stored in `integration_connections.health_score` and tracked over time in `integration_health`.

### Score Components

- API availability (30 pts)
- Permission validity (25 pts)
- Sync freshness (25 pts)
- Error rate (20 pts)

### Statuses

| Status | Score Range |
|---|---|
| `healthy` | 80-100 |
| `warning` | 50-79 |
| `error` | 0-49 |

## Adding a New Integration

1. Add the definition to `INTEGRATION_DEFINITIONS` in `src/core/integrations/types.ts`
2. Create `src/app/app/integrations/{type}/page.tsx` following GitHub's pattern
3. Create any type-specific service (e.g., `src/core/{type}/service.ts`)
4. Use the generic integration components for health, validation, and logging

## Security

- OAuth tokens are never stored in our database
- PATs are encrypted before storage
- Encryption keys are stored in a table with RLS blocking all direct access
- Decryption only happens server-side via security definer functions
- All integration RPCs require authentication
