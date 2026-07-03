export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export const sidebarNav: NavItem[] = [
  { label: "Overview", href: "/app", icon: "dashboard" },
  { label: "Tasks", href: "/tasks", icon: "assignment" },
  { label: "Ideas", href: "/ideas", icon: "lightbulb" },
  { label: "Research", href: "/research", icon: "science" },
  { label: "Files", href: "/files", icon: "folder" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export const secondaryNav: NavItem[] = [
  { label: "Help", href: "/help", icon: "help" },
];
