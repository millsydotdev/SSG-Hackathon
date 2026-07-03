# Workspace Model

A **Workspace** represents one hackathon event. It is temporary and archived when the hackathon ends.

## Fields

| Field         | Type                           | Description                                 |
| ------------- | ------------------------------ | ------------------------------------------- |
| `id`          | string                         | Unique identifier                           |
| `name`        | string                         | Display name (e.g. "ETHGlobal Lisbon 2026") |
| `slug`        | string                         | URL-friendly identifier                     |
| `description` | string?                        | Optional description                        |
| `hackathonId` | string                         | The hackathon this workspace belongs to     |
| `status`      | `active \| archived \| frozen` | Current state                               |
| `members`     | WorkspaceMember[]              | Team members with roles                     |
| `metadata`    | Record<string, unknown>        | Extensible metadata                         |

## Member Roles

- `owner` — Created the workspace, full control
- `lead` — Can manage tasks, planning, and invitations
- `member` — Standard participant
- `guest` — Read-only access

## Lifecycle

1. Owner joins a hackathon → workspace created
2. Owner invites team members
3. Members collaborate during the hackathon
4. Hackathon ends → workspace archived (read-only)
5. Owner joins next hackathon → new workspace created

## Context Hook

```typescript
import { useWorkspace } from "@/core/workspace";

function WorkspaceHeader() {
  const { workspace, memberRole } = useWorkspace();
  return <h1>{workspace?.name}</h1>;
}
```
