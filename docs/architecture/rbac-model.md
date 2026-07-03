# RBAC Permission Model

## Roles

Roles are scoped to the current hackathon workspace only.

| Role     | Description                                         |
| -------- | --------------------------------------------------- |
| `owner`  | Full access — manages the hackathon workspace       |
| `lead`   | Manages tasks, planning, research, team invitations |
| `member` | Standard participant                                |
| `guest`  | Limited read-only access                            |

## Permissions

| Category      | Permissions                                |
| ------------- | ------------------------------------------ |
| `workspace`   | view, manage, archive, view-members        |
| `members`     | invite, remove, manage                     |
| `planning`    | view, manage                               |
| `ideas`       | view, create, vote, edit, delete, manage   |
| `tasks`       | view, create, assign, edit, delete, manage |
| `research`    | view, create, edit, delete, manage         |
| `files`       | view, upload, delete, manage               |
| `submissions` | view, create, edit, delete, manage         |
| `judging`     | view, score                                |

## Usage

```typescript
import { usePermissions } from "@/core/permissions";

function TaskActions() {
  const { can } = usePermissions();
  if (!can("tasks:create")) return null;
  return <CreateTaskButton />;
}
```
