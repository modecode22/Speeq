import React, { createContext, useState, useContext, useEffect } from "react";



type ContextType = {
  theme: ThemeType;
  updateTheme: (theme: ThemeType) => void;
};
// Language Context
const SettingsContext = createContext<ContextType>({
  theme: "dark",
  updateTheme: () => {},
});


export const SettingsProvider = ({ children }: { children :React.ReactNode}) => {

  const [theme, setTheme] = useState<ThemeType>(
    JSON.parse(localStorage.getItem("theme") as ThemeType) ||
      "dark"
  ); // Default theme is dark

    const updateTheme = (theme: ThemeType) => {
      setTheme(theme);
      localStorage.setItem("theme", JSON.stringify(theme));
    };


    useEffect(() => {
      const className = "dark";
      const htmlClass = document.documentElement.classList;
      theme === "dark"
        ? htmlClass.add(className)
        : htmlClass.remove(className);
    }, [theme]);

  useEffect(() => {
        if (!localStorage.getItem("theme")) {
          localStorage.setItem("theme", JSON.stringify("dark"));
        }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        updateTheme
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
