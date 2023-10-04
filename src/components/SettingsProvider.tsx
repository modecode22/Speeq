import React, { createContext, useState, useContext, useEffect } from "react";



type ContextType = {
  theme: ThemeType;
  updateTheme: (theme: ThemeType) => void;
  language: string;
  updateLanguage: (language: string) => void;
};
// Language Context
const SettingsContext = createContext<ContextType>({
  theme: "dark",
  updateTheme: () => {},
  language:  "eng",
  updateLanguage: () => {},
});


export const SettingsProvider = ({ children }: { children :React.ReactNode}) => {

  const [theme, setTheme] = useState<ThemeType>(
    JSON.parse(localStorage.getItem("theme") as ThemeType) ||
      "dark"
  ); // Default theme is dark
  const [language, setLanguage] = useState<string>(
    JSON.parse(localStorage.getItem("lang") as string) ||
      "eng"
  ); // Default theme is dark

    const updateTheme = (theme: ThemeType) => {
      setTheme(theme);
      localStorage.setItem("theme", JSON.stringify(theme));
    };


    const updateLanguage = (language: string) => {
      setLanguage(language);
      localStorage.setItem("lang", JSON.stringify(language));
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
        if (!localStorage.getItem("lang")) {
          localStorage.setItem("lang", JSON.stringify("eng"));
        }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        updateTheme,
        language,
        updateLanguage
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
