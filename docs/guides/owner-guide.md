# Owner Guide

This guide covers duties and capabilities of the SSG-Hackathon Owner.

## Becoming Owner

The Owner is created during the first-run setup wizard (`/setup`). Only one Owner exists per deployment.

## Owner Capabilities

- Access the Owner Control Centre at `/app/admin`
- Manage team members (deactivate/reactivate)
- Generate and manage invitation codes
- View platform diagnostics
- Run maintenance operations
- View platform configuration and deployment info
- Monitor automation, integrations, storage, and database

## Owner Control Centre

| Section | Purpose |
|---------|---------|
| Dashboard | Platform health overview, key metrics |
| Platform | Deployment info, version, environment |
| Members | User management |
| Invitations | Invitation code management |
| Maintenance | Search rebuild, analytics recalculation, health checks |
| Diagnostics | Platform health verification across 9 areas |
| Logs | Admin audit trail |

## Security

- The Owner cannot delete or demote themselves
- Owner status is determined by `platform_config.owner_id`
- The `PLATFORM_SETUP_KEY` is only needed once during initial setup
