# Identity Architecture

## Overview

The identity module (`src/identity/`) provides the authentication foundation for SSG-Hackathon. It defines clean abstractions between the application and the auth provider (Supabase), making the system testable and provider-swappable.

## Architecture

```
┌─────────────────────────────────────────┐
│            Application UI               │
│  (login page, route guards, hooks)      │
├─────────────────────────────────────────┤
│            Identity Module              │
│  ┌──────────┐  ┌────────────────────┐   │
│  │  Hooks   │  │  Session Store     │   │
│  │ useAuth  │◄─┤  (React Context)   │   │
│  │ useUser  │  └────────┬───────────┘   │
│  └──────────┘           │               │
│                         │               │
│  ┌──────────────────────▼────────────┐  │
│  │          AuthService             │  │
│  │     (abstract interface)        │  │
│  └──────────────┬──────────────────┘  │
│                 │                     │
│  ┌──────────────▼──────────────────┐  │
│  │    SupabaseAuthService          │  │
│  │  (wraps @supabase/ssr client)   │  │
│  └─────────────────────────────────┘  │
├─────────────────────────────────────────┤
│           Supabase Auth API             │
├─────────────────────────────────────────┤
│          Vercel Environment             │
└─────────────────────────────────────────┘
```

## Files

| File                | Purpose                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `types.ts`          | Identity types — `IdentityUser`, `IdentitySession`, `AuthStatus`, `SignInParams`, `SignUpParams`, `AuthResult`, `AuthError` |
| `auth-service.ts`   | Abstract `AuthService` interface — `getSession`, `signIn`, `signUp`, `signOut`, `refreshSession`, `onAuthStateChange`       |
| `supabase-auth.ts`  | `createSupabaseAuthService()` — Supabase implementation of `AuthService` using `@supabase/ssr`                              |
| `session-store.tsx` | `SessionStoreProvider` — React context for session state. Handles init, subscribe, sign-in, sign-out, refresh               |
| `hooks.ts`          | `useAuth()` — full auth access. `useUser()` — user only. `useIsAuthenticated()` — boolean check                             |
| `guard.tsx`         | `ProtectedRoute` — redirects unauthenticated to `/login`. `GuestRoute` — redirects authenticated to `/app`                  |
| `providers.tsx`     | `IdentityProvider` — wires SessionStoreProvider with lazy Supabase auth service                                             |
| `index.ts`          | Barrel exports                                                                                                              |

## AuthService Interface

```typescript
interface AuthService {
  getSession: () => Promise<IdentitySession>;
  signIn: (params: SignInParams) => Promise<AuthResult>;
  signUp: (params: SignUpParams) => Promise<AuthResult>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refreshSession: () => Promise<IdentitySession>;
  onAuthStateChange: (callback) => () => void;
}
```

This interface is the contract. Any auth provider (Supabase, mock, test) implements it.

## Session Lifecycle

1. **App mounts** → `IdentityProvider` creates `AuthService` lazily in `useState`
2. **SessionStoreProvider** calls `authService.getSession()` to restore any existing session
3. **Subscribes** to `authService.onAuthStateChange()` for real-time updates
4. **Hooks** (`useAuth`, `useUser`, `useIsAuthenticated`) expose session state to components
5. **Route guards** (`ProtectedRoute`, `GuestRoute`) handle redirects based on auth state

## Provider Hierarchy

```
ThemeProvider
└── FeatureFlagsProvider
    └── IdentityProvider
        └── SessionStoreProvider (context)
            └── PermissionProvider
                └── WorkspaceContextProvider
                    └── ...
```

## Key Design Decisions

1. **Abstract AuthService** — The identity module depends on an interface, not Supabase directly. Enables testing with mocks and future migration.
2. **Lazy initialization** — `createBrowserClient` is only called on the client (via `useState` initializer), avoiding SSR crashes.
3. **Singleton service** — Only one `AuthService` instance is created per page lifecycle.
4. **Error-tolerant** — If Supabase env vars are missing, auth degrades gracefully instead of crashing the app.
