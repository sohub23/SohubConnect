"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const LEGACY_THEME_KEY = 'headerBgColor';
const THEME_KEY = 'themeMode';

function normalizeTheme(value) {
  if (value === 'light' || value === 'white') return 'light';
  if (value === 'dark' || value === 'default') return 'dark';
  return 'light';
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (mode) => {
    const isLight = mode === 'light';
    document.documentElement.classList.toggle('light-mode', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
    document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
  };

  const toggleBgColor = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    localStorage.setItem(THEME_KEY, nextMode);
    localStorage.setItem(LEGACY_THEME_KEY, nextMode === 'light' ? 'white' : 'default');
    applyTheme(nextMode);
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_KEY);
    const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);
    const resolvedTheme = normalizeTheme(savedTheme || legacyTheme);
    setThemeMode(resolvedTheme);
    applyTheme(resolvedTheme);
  }, []);

  const bgColor = themeMode === 'light' ? 'white' : 'default';
  const isLightMode = themeMode === 'light';

  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ bgColor: 'white', themeMode: 'light', isLightMode: true, toggleBgColor: () => {} }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ bgColor, themeMode, isLightMode, toggleBgColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
