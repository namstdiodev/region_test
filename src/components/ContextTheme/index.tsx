import { createContext, ReactNode, useEffect, useState } from "react";

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
        localStorage.setItem("@DarkMode:isDarkTheme", JSON.stringify(isDark));
        document
          .getElementsByTagName("HTML")[0]
          .setAttribute("data-theme", "dark");
          setDarkTheme((prevState) => !prevState);
      } else {
        localStorage.setItem("@DarkMode:isDarkTheme", JSON.stringify(!isDark));
        document
          .getElementsByTagName("HTML")[0]
          .setAttribute("data-theme", "light");
          setDarkTheme((prevState) => !prevState);
      }
  }

  useEffect(() => {
    setDarkTheme(
      JSON.parse(localStorage.getItem("@DarkMode:isDarkTheme") || "false")
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("@DarkMode:isDarkTheme", JSON.stringify(isDark));
  }, [isDark]);

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
