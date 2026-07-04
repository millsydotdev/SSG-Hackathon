# GitHub OAuth Setup Guide

This guide covers configuring GitHub OAuth for SSG-Hackathon.

## Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
2. Fill in:
   - **Application name**: SSG-Hackathon (or your platform name)
   - **Homepage URL**: `https://your-deployment.vercel.app`
   - **Authorization callback URL**: `https://your-deployment.vercel.app/auth/v1/callback`
3. Click "Register application"
4. Copy the Client ID and generate a Client Secret

## Configure Supabase

1. Go to Supabase Dashboard → Authentication → Settings
2. Under "External OAuth Providers", enable GitHub
3. Enter the Client ID and Client Secret from the GitHub OAuth App
4. Save

The callback URL in Supabase should be:
`https://<project>.supabase.co/auth/v1/callback`

## Environment Variables

No additional env vars needed for OAuth — Supabase handles the OAuth flow.
The `provider_token` is returned in the Supabase session and used for API calls.

## PAT Fallback

Users can also connect via Personal Access Token:
1. Generate a PAT at GitHub Settings → Developer settings → Personal access tokens
2. Required scopes: `repo`, `read:user`
3. Enter the PAT in the GitHub integration settings
4. The token is encrypted via `pgp_sym_encrypt` before storage
