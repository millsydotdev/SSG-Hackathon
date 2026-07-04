export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { label: "Mission Control", href: "/app", icon: "dashboard" },
      { label: "Planning", href: "/app/planning", icon: "map" },
      { label: "Ideas", href: "/app/ideas", icon: "lightbulb" },
      { label: "Research", href: "/app/research", icon: "science" },
      { label: "Tasks", href: "/app/tasks", icon: "checklist" },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { label: "Notes", href: "/app/notes", icon: "note" },
      { label: "Files", href: "/app/files", icon: "folder" },
      { label: "Relationships", href: "/app/relationships", icon: "hub" },
    ],
  },
  {
    label: "People & Output",
    items: [
      { label: "Team", href: "/app/team", icon: "group" },
      { label: "Submission Prep", href: "/app/submission-prep", icon: "task_alt" },
    ],
  },
  {
    label: "Discovery",
    items: [
      { label: "Discover", href: "/app/discover", icon: "travel_explore" },
      { label: "Hackathons", href: "/app/hackathons", icon: "emoji_events" },
    ],
  },
];

export const sidebarNav: NavItem[] = navSections.flatMap((s) => s.items);

export const secondaryNav: NavItem[] = [
  { label: "Settings", href: "/app/settings", icon: "settings" },
];
