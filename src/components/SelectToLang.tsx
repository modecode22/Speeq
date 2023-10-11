import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TargetLanguages } from "../lib/data";

const SelectToLang = () => {
  const { toLanguage, updateToLanguage } = useSettings();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Select
      onValueChange={(value: string) => {
        updateToLanguage(value);
      }}
      defaultValue={toLanguage}
    >
      <SelectTrigger name="to language" className="w-full">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent
        onSelect={(e) => {
          e.target;
        }}
        className="max-h-[300px] "
      >
        {TargetLanguages.map((tolang) => {
          return (
            <SelectItem key={tolang} value={tolang}>
              {tolang}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectToLang;
