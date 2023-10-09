import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectLang = () => {
  const { language, updateLanguage } = useSettings();
  const themeOptions: LanguageArray = [
    { shortName: "afr", longName: "Afrikaans" },
    { shortName: "amh", longName: "Amharic" },
    { shortName: "arb", longName: "Modern Standard Arabic" },
    { shortName: "ary", longName: "Moroccan Arabic" },
    { shortName: "arz", longName: "Egyptian Arabic" },
    { shortName: "asm", longName: "Assamese" },
    { shortName: "ast", longName: "Asturian" },
    { shortName: "azj", longName: "North Azerbaijani" },
    { shortName: "bel", longName: "Belarusian" },
    { shortName: "ben", longName: "Bengali" },
    { shortName: "bos", longName: "Bosnian" },
    { shortName: "bul", longName: "Bulgarian" },
    { shortName: "cat", longName: "Catalan" },
    { shortName: "ceb", longName: "Cebuano" },
    { shortName: "ces", longName: "Czech" },
    { shortName: "ckb", longName: "Central Kurdish" },
    { shortName: "cmn", longName: "Mandarin Chinese" },
    { shortName: "cym", longName: "Welsh" },
    { shortName: "dan", longName: "Danish" },
    { shortName: "deu", longName: "German" },
    { shortName: "ell", longName: "Greek" },
    { shortName: "eng", longName: "English" },
    { shortName: "est", longName: "Estonian" },
    { shortName: "eus", longName: "Basque" },
    { shortName: "fin", longName: "Finnish" },
    { shortName: "fra", longName: "French" },
    { shortName: "gaz", longName: "West Central Oromo" },
    { shortName: "gle", longName: "Irish" },
    { shortName: "glg", longName: "Galician" },
    { shortName: "guj", longName: "Gujarati" },
    { shortName: "heb", longName: "Hebrew" },
    { shortName: "hin", longName: "Hindi" },
    { shortName: "hrv", longName: "Croatian" },
    { shortName: "hun", longName: "Hungarian" },
    { shortName: "hye", longName: "Armenian" },
    { shortName: "ibo", longName: "Igbo" },
    { shortName: "ind", longName: "Indonesian" },
    { shortName: "isl", longName: "Icelandic" },
    { shortName: "ita", longName: "Italian" },
    { shortName: "jav", longName: "Javanese" },
    { shortName: "jpn", longName: "Japanese" },
    { shortName: "kam", longName: "Kamba" },
    { shortName: "kan", longName: "Kannada" },
    { shortName: "kat", longName: "Georgian" },
    { shortName: "kaz", longName: "Kazakh" },
    { shortName: "kea", longName: "Kabuverdianu" },
    { shortName: "khk", longName: "Halh Mongolian" },
    { shortName: "khm", longName: "Khmer" },
    { shortName: "kir", longName: "Kyrgyz" },
    { shortName: "kor", longName: "Korean" },
    { shortName: "lao", longName: "Lao" },
    { shortName: "lit", longName: "Lithuanian" },
    { shortName: "ltz", longName: "Luxembourgish" },
    { shortName: "lug", longName: "Ganda" },
    { shortName: "luo", longName: "Luo" },
    { shortName: "lvs", longName: "Standard Latvian" },
    { shortName: "mai", longName: "Maithili" },
    { shortName: "mal", longName: "Malayalam" },
    { shortName: "mar", longName: "Marathi" },
    { shortName: "mkd", longName: "Macedonian" },
    { shortName: "mlt", longName: "Maltese" },
    { shortName: "mni", longName: "Meitei" },
    { shortName: "mya", longName: "Burmese" },
    { shortName: "nld", longName: "Dutch" },
    { shortName: "nno", longName: "Norwegian Nynorsk" },
    { shortName: "nob", longName: "Norwegian Bokm\u00e5l" },
    { shortName: "npi", longName: "Nepali" },
    { shortName: "nya", longName: "Nyanja" },
    { shortName: "oci", longName: "Occitan" },
    { shortName: "ory", longName: "Odia" },
    { shortName: "pan", longName: "Punjabi" },
    { shortName: "pbt", longName: "Southern Pashto" },
    { shortName: "pes", longName: "Western Persian" },
    { shortName: "pol", longName: "Polish" },
    { shortName: "por", longName: "Portuguese" },
    { shortName: "ron", longName: "Romanian" },
    { shortName: "rus", longName: "Russian" },
    { shortName: "slk", longName: "Slovak" },
    { shortName: "slv", longName: "Slovenian" },
    { shortName: "sna", longName: "Shona" },
    { shortName: "snd", longName: "Sindhi" },
    { shortName: "som", longName: "Somali" },
    { shortName: "spa", longName: "Spanish" },
    { shortName: "srp", longName: "Serbian" },
    { shortName: "swe", longName: "Swedish" },
    { shortName: "swh", longName: "Swahili" },
    { shortName: "tam", longName: "Tamil" },
    { shortName: "tel", longName: "Telugu" },
    { shortName: "tgk", longName: "Tajik" },
    { shortName: "tgl", longName: "Tagalog" },
    { shortName: "tha", longName: "Thai" },
    { shortName: "tur", longName: "Turkish" },
    { shortName: "ukr", longName: "Ukrainian" },
    { shortName: "urd", longName: "Urdu" },
    { shortName: "uzn", longName: "Northern Uzbek" },
    { shortName: "vie", longName: "Vietnamese" },
    { shortName: "xho", longName: "Xhosa" },
    { shortName: "yor", longName: "Yoruba" },
    { shortName: "yue", longName: "Cantonese" },
    { shortName: "zlm", longName: "Colloquial Malay" },
    { shortName: "zsm", longName: "Standard Malay" },
    { shortName: "zul", longName: "Zulu" },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Select
      onValueChange={(value: string) => {
        updateLanguage(value);
      }}
      defaultValue={language}
    >
      <SelectTrigger name="language" className="w-full">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent
        onSelect={(e) => {
          e.target;
        }}
        className="max-h-[300px] "
      >
          {themeOptions.map((language) => {
            return (
              <SelectItem key={language.shortName} value={language.shortName}>
                {language.longName}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};

export default SelectLang;
