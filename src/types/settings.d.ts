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