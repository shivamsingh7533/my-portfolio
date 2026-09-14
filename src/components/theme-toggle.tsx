"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    getServerSnapshot
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("size-8", className)}
        aria-label="Toggle theme"
      />
    );
  }

  const isLight = resolvedTheme === "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}