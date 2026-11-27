"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    setNight(document.documentElement.dataset.theme === "night");
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "night";
    document.documentElement.dataset.theme = next ? "night" : "day";
    setNight(next);
    try {
      localStorage.setItem("alf-theme", next ? "night" : "day");
    } catch {
      // The theme still works for the current page when storage is unavailable.
    }
  }

  return <button type="button" className="floating-theme" aria-label="Mode nuit" aria-pressed={night} title={night ? "Passer en mode jour" : "Passer en mode nuit"} onClick={toggleTheme}>
    <Moon className="theme-moon" aria-hidden="true"/>
    <Sun className="theme-sun" aria-hidden="true"/>
  </button>;
}
