type ThemeType = "light" | "dark"

type ThemeArray = [
    { option: "light"; name: "light" },
    { option: "dark"; name: "dark" }
  ];
  type Language = {
    shortName: string;
    longName: string;
  };
  
  type LanguageArray = Language[]


  type ContextType = {
    theme: ThemeType;
    updateTheme: (theme: ThemeType) => void;
    language: string;
    updateLanguage: (language: string) => void;
    device: string | undefined;
    updateDevice: (device: string) => void;
    devices: MediaDeviceInfo[];
  };