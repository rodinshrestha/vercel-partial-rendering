import defaultTranslationJson from "@/locale/locale.example";

export type Keyword = keyof typeof defaultTranslationJson;
export type ReadOnlyTranslation = typeof defaultTranslationJson;

export type TranslationType = { [key in Keyword]: ReadOnlyTranslation[key] };

/** Type for locale json in locale directory */
export type LocaleJsonType = { [key in Keyword]: string };
