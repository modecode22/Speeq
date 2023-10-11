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
    outputDevice: string | undefined;
    updateOutputDevice: (device: string) => void;
    inputDevice: string | undefined;
    updateInputDevice: (device: string) => void;
    devices: MediaDeviceInfo[];
  };