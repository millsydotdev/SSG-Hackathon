export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export const sidebarNav: NavItem[] = [
  { label: "Overview", href: "/app", icon: "dashboard" },
  { label: "Hackathons", href: "/app/hackathons", icon: "emoji_events" },
  { label: "Team", href: "/app/team", icon: "group" },
  { label: "Planning", href: "/app/planning", icon: "map" },
  { label: "Tasks", href: "/app/tasks", icon: "assignment" },
  { label: "Ideas", href: "/app/ideas", icon: "lightbulb" },
  { label: "Research", href: "/app/research", icon: "science" },
  { label: "Files", href: "/files", icon: "folder" },
  { label: "Settings", href: "/app/settings/profile", icon: "settings" },
];

export const secondaryNav: NavItem[] = [
  { label: "Help", href: "/help", icon: "help" },
];
