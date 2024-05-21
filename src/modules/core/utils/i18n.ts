import {
  Keyword,
  ReadOnlyTranslation,
  TranslationType,
} from '@/core/types/translation.types';

export const i18n = <T extends Keyword>(
  data: TranslationType,
  keyWord: T,
  defaultTranslation: ReadOnlyTranslation[T]
) => {
  if (!defaultTranslation) throw new Error('Default translation is required');

  return data[keyWord] ? data[keyWord] : defaultTranslation;
};

/**
 * Reads translation from .json file
 * @param lang {string}
 * @returns {}
 */
export const getTranslation = async (lang: string) => {
  try {
    const json = (await import(`./../../../locale/${lang}.ts`)).default;
    return json;
  } catch {
    return {};
  }
};
