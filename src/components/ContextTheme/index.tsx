import { createContext, ReactNode, useState, useLayoutEffect } from "react";

interface DarkThemeContextData {
  isDark: boolean;
  toggleDarkTheme: () => void;
}

interface DarkThemeProviderProps {
  children: ReactNode;
}

export const DarkThemeContext = createContext({} as DarkThemeContextData);

export function DarkThemeProvider({ children }: DarkThemeProviderProps) {
  const [isDark, setDarkTheme] = useState(false);
  function toggleDarkTheme() {
    if (!isDark) {
      localStorage.setItem("@DarkMode:isDarkTheme", JSON.stringify(true));
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
      setDarkTheme((prevState) => !prevState);
    } else {
      localStorage.setItem("@DarkMode:isDarkTheme", JSON.stringify(false));
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
      setDarkTheme((prevState) => !prevState);
    }
  }

  useLayoutEffect(() => {
    const dark = JSON.parse(
      localStorage.getItem("@DarkMode:isDarkTheme") || "false"
    );
    if (JSON.parse(localStorage.getItem("@DarkMode:isDarkTheme") || "false")) {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
    } else {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
    }
    setDarkTheme(dark);
  }, []);

  return (
    <DarkThemeContext.Provider
      value={{
        isDark,
        toggleDarkTheme,
      }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
}
