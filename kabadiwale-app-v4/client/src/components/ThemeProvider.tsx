import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Function to determine theme based on system preference
  const getSystemTheme = (): "light" | "dark" => {
    // Check if user prefers dark mode based on system settings
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Check if current time is night time based on user's timezone
    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 6 || currentHour >= 19; // Between 7PM and 6AM
    
    // Return dark if either system prefers dark or it's nighttime
    return (prefersDark || isNightTime) ? "dark" : "light";
  };

  // Initialize theme based on user preference or system preference
  useEffect(() => {
    // Check if user has previously selected a theme
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        setResolvedTheme(getSystemTheme());
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Resolve the theme whenever it changes
  useEffect(() => {
    if (theme === "system") {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Apply theme change to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    setThemeState(prevTheme => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}