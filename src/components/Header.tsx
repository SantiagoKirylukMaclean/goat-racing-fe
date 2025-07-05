"use client";

import * as React from "react";
import { Moon, Sun, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl hover:text-primary transition-colors">GOAT RACING</Link>
        <div className="flex items-center space-x-2">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Dashboard"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "rounded-full",
              theme === "dark" ? "text-yellow-400 hover:text-yellow-500" : "text-slate-700 hover:text-slate-900"
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
