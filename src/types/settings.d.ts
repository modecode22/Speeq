type ThemeType = "light" | "dark"

type ThemeArray = [
    { option: "light"; name: "light" },
    { option: "dark"; name: "dark" }
  ];
  type Language = string
  
  type LanguageArray = Language[]


  type ContextType = {
    theme: ThemeType;
    updateTheme: (theme: ThemeType) => void;
    fromLanguage: string;
    updateFromLanguage: (language: string) => void;
    toLanguage: string;
    updateToLanguage: (language: string) => void;
    device: string | undefined;
    updateDevice: (device: string) => void;
    devices: MediaDeviceInfo[];
  };