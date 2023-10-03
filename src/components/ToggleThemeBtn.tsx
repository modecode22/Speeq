import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSettings } from "./SettingsProvider";

const ToggleThemeBtn = () => {

const {theme , updateTheme} =useSettings()
const themeOptions:ThemeArray = [
  {
name:"light",
option:"light"
  },
  {
    name:"dark",
    option:"dark"
  }
]

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Select
        value={theme}
        onValueChange={(value: ThemeType) => {
          updateTheme(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent
          onSelect={(e) => {
            e.target;
          }}
        >
          <SelectGroup>
        {themeOptions.map(theme=>{
          return <SelectItem key={theme.option} value={theme.option}>{theme.name}</SelectItem>;
        })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* <button
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
        className="w-full flex truncate h-10 items-center rounded-sm justify-start p-3 gap-2 "
      >
        {resolvedTheme === "dark" ? (
          <>
            <BsFillSunFill />
            light mode
          </>
        ) : (
          <>
            <BsFillMoonFill />
            dark mode
          </>
        )}
      </button> */}
    </>
  );
};

export default ToggleThemeBtn;
