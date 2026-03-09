"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [bgColor, setBgColor] = useState('white');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('headerBgColor') || 'white';
    setBgColor(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (color) => {
    if (color === 'white') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  const toggleBgColor = () => {
    const newColor = bgColor === 'default' ? 'white' : 'default';
    setBgColor(newColor);
    localStorage.setItem('headerBgColor', newColor);
    applyTheme(newColor);
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ bgColor: 'white', toggleBgColor: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ bgColor, toggleBgColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
