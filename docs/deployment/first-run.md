# First-Run Setup Guide

This document describes how to initialise a fresh SSG-Hackathon deployment.

## Prerequisites

- Supabase project (with migrations applied)
- Vercel project (or other Node.js hosting)
- GitHub OAuth App credentials (optional)

## Environment Variables

Required:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Public URL of the deployed application |
| `NEXT_PUBLIC_APP_NAME` | Application name (defaults to SSG-Hackathon) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `PLATFORM_SETUP_KEY` | Strong random value for first-run authentication |

Optional:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ENABLE_SUBMISSIONS` | Enable submission features |
| `NEXT_PUBLIC_ENABLE_JUDGING` | Enable judging features |

## First Startup

1. Deploy the application to your hosting provider
2. Apply Supabase migrations
3. Configure environment variables (including a strong `PLATFORM_SETUP_KEY`)
4. Open the website

If the platform has not been initialised, you will be redirected to `/setup`.

## Platform Initialisation

The setup wizard guides you through:

1. **Welcome** — Explanation of the setup process
2. **Setup Key** — Enter the `PLATFORM_SETUP_KEY` environment variable value
3. **Platform Information** — Name, timezone, locale
4. **Owner Account** — Create the Owner account
5. **Review** — Confirm all details
6. **Initialise** — Creates the owner account, platform configuration, and automatically signs you in

After successful initialisation, you will be automatically signed in and redirected to Mission Control.

## Owner Responsibilities

The Owner:

- Access the Owner Control Centre at `/app/admin`
- Manage members, invitations, and platform settings
- Cannot delete or demote themselves
- Is the only user with access to the admin centre

## Recovery

### Lost Owner Credentials

1. Use Supabase Dashboard to reset the owner password
2. Sign in with the new password
3. The owner role is determined by `platform_config.owner_id`

### Lost PLATFORM_SETUP_KEY

If the platform has not been initialised:

1. Set a new `PLATFORM_SETUP_KEY` environment variable
2. Redeploy the application
3. Use the new key at `/setup`

If the platform has already been initialised, the setup key is no longer needed.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `/setup` redirects to login | Platform is already initialised. Sign in as the owner. |
| Setup key rejected | Verify `PLATFORM_SETUP_KEY` environment variable is set correctly and the application was redeployed. |
| Owner creation fails | Check Supabase Auth settings: ensure email confirmation is disabled or the email is valid. |
| Migration errors | Run `supabase db push` to apply pending migrations. Ensure `00032_create_platform_setup.sql` is included. |
