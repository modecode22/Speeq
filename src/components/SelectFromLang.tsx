import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SourceLanguages } from "../lib/data";

const SelectFromLang = () => {
  const { fromLanguage, updateFromLanguage } = useSettings();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Select
      onValueChange={(value: string) => {
        updateFromLanguage(value);
      }}
      defaultValue={fromLanguage}
    >
      <SelectTrigger name="from language" className="w-full">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent
        onSelect={(e) => {
          e.target;
        }}
        className="max-h-[300px] "
      >
        {SourceLanguages.map((fromlang) => {
          return (
            <SelectItem key={fromlang} value={fromlang}>
              {fromlang}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectFromLang;
