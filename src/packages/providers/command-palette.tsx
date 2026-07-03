"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useKeyboard } from "@/packages/hooks";
import { cn } from "@/packages/utils";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  commands: Command[];
  register: (cmd: Command) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => {},
  commands: [],
  register: () => {},
});

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const register = useCallback((cmd: Command) => {
    setCommands((prev) => [...prev, cmd]);
  }, []);

  useKeyboard("k", () => setOpen((v) => !v), { meta: true });

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex]!.action();
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <CommandPaletteContext.Provider
      value={{ open, setOpen, commands, register }}
    >
      {children}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-[15vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="border-outline-variant bg-surface-container-low w-full max-w-lg rounded border shadow-lg">
            <div className="border-outline-variant/30 px-md flex items-center border-b">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                search
              </span>
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                className="px-sm py-md text-body-sm text-on-surface placeholder:text-on-surface-variant/50 w-full bg-transparent outline-none"
              />
              <kbd className="text-on-surface-variant font-mono text-[10px]">
                ESC
              </kbd>
            </div>
            <div className="p-xs max-h-80 scrollbar-thin overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-md py-lg text-body-sm text-on-surface-variant text-center">
                  No results
                </p>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={cn(
                    "px-md py-sm text-body-sm flex w-full items-center justify-between rounded transition-colors",
                    i === selectedIndex
                      ? "bg-surface-container-high text-on-surface"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                  )}
                >
                  <span>{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="text-on-surface-variant font-mono text-[10px]">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}
