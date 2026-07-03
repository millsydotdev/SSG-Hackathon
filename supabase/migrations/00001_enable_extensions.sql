-- Enable required PostgreSQL extensions
create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists "pgcrypto" with schema extensions;
create extension if not exists "pgjwt" with schema extensions;

-- Set timezone
alter database postgres set timezone to 'UTC';

-- Ensure RLS is enabled by default
-- (RLS is applied per-table in application migrations)

-- Create schema for extensions if not exists
create schema if not exists extensions;
