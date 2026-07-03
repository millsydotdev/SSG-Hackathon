# Core Architecture

## Product Model

SSG-Hackathon is an **invite-only collaboration workstation** used by one owner and their invited hackathon team.

- One owner decides which hackathons to participate in
- When the owner joins a hackathon, a **workspace** is created for that event
- The owner invites team members who create accounts and collaborate
- When the hackathon ends, the workspace is archived
- The process repeats for the next hackathon

There are no organisations, companies, tenants, subscriptions, or billing.

## Structure

```
src/core/
├── auth/              Session abstraction, auth context, route guards
├── permissions/       RBAC engine scoped to the current workspace
├── workspace/         Workspace model (belongs to a hackathon)
├── user/              User domain model
├── routing/           Route constants, access control
├── flags/             Feature flag system
├── audit/             Audit logging abstraction
├── notification/      Notification foundation
├── errors/            Error boundaries, status pages
└── index.ts           Barrel exports
```

## Provider Hierarchy

```
ThemeProvider
└── FeatureFlagsProvider
    └── AuthContextProvider
        └── PermissionProvider
            └── WorkspaceContextProvider
                └── NotificationProvider
                    └── CommandPaletteProvider
                        └── ToastProvider
```

## Domain Model

```
User (owner or team member)
  │
  └── joins a Hackathon
        │
        └── Workspace created for that event
              │
              ├── Projects
              ├── Ideas
              ├── Tasks
              ├── Research
              ├── Submissions
              └── Judging
```

## Key Simplifications

- No organisations or companies — the user IS the owner
- No multi-tenancy — one workspace per hackathon event
- No subscriptions or billing — invite-only, free for participants
- Roles exist only inside the current workspace, not globally
- Archived workspaces are read-only
- Only one active hackathon is expected at a time
