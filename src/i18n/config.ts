import i18n from "i18next";
import eng_translation from "./en/EN.json";
import srb_translation from "./sr/SRB.json";
import { initReactI18next } from "react-i18next";

type Language = { symbol: string; value: string };

/**
 * Register available languages
 */
export const availableLanguages: Language[] = [
  { symbol: "ENG", value: "en" },
  { symbol: "SRB", value: "srb" },
];

export const resources = {
  en: {
    translation: eng_translation,
  },
  srb: {
    translation: srb_translation,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "srb",
});
