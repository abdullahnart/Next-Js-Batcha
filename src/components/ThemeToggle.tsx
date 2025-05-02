"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", isDark);
  }, [isDark]);

  const switchTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggle = () => {
    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  };

  return (
    <div className="fixed top-12 right-12 z-50">
      <button
        onClick={handleToggle}
        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
      >
        {isDark ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
