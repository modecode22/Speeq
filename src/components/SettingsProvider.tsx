import React, { createContext, useState, useContext, useEffect } from "react";
import { getFromLocalStorage } from "../lib/utils";

// Settings Context Initialization
const SettingsContext = createContext<ContextType>({
  theme: "dark",
  updateTheme: () => {},
  language: "eng",
  updateLanguage: () => {},
  device: undefined,
  updateDevice: () => {},
  devices: []
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // States
  const [theme, setTheme] = useState<ThemeType>(getFromLocalStorage("theme", "dark"));
  const [language, setLanguage] = useState<string>(getFromLocalStorage("lang", "eng"));
  const [device, setDevice] = useState<string | undefined>(getFromLocalStorage("device", undefined));
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // Update and Store functions
  const updateAndStore = (key: string, value: any, updater: React.Dispatch<React.SetStateAction<any>>) => {
    updater(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Effects
  useEffect(() => {
    // Update the DOM class based on theme
    const className = "dark";
    const htmlClass = document.documentElement.classList;
    theme === "dark" ? htmlClass.add(className) : htmlClass.remove(className);
  }, [theme]);

  useEffect(() => {
    // Enumerate devices if available
    if (navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function') {
      navigator.mediaDevices.enumerateDevices()
        .then((allDevices) => {
          const audioDevices = allDevices.filter(device => device.kind === 'audiooutput');
          setDevices(audioDevices);
          
          if (!device && audioDevices.length > 0) {
            updateAndStore("device", audioDevices[0].deviceId, setDevice);
          }
        });
    }
  }, [device]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        updateTheme: (value: ThemeType) => updateAndStore("theme", value, setTheme),
        language,
        updateLanguage: (value: string) => updateAndStore("lang", value, setLanguage),
        device,
        updateDevice: (value: string) => updateAndStore("device", value, setDevice),
        devices
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
