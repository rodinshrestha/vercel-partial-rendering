"use client";
import React from "react";

import type {
  Keyword,
  ReadOnlyTranslation,
  TranslationType,
} from "@/core/types/translation.types";
import { i18n } from "@/core/utils/i18n";

type Props = {
  children: React.ReactNode;
  translation: TranslationType;
};

type ContextTypes = {
  _t: <T extends Keyword>(
    keyWord: T,
    defaultTranslation: ReadOnlyTranslation[T]
  ) => string;
};

const initialContext: ContextTypes = {
  _t: () => "",
};

export const TranslationContext = React.createContext(initialContext);

export type TranslateType = <T extends Keyword>(
  keyWord: T,
  defaultTranslation: ReadOnlyTranslation[T]
) => string;

const TranslationProvider = ({ translation, children }: Props) => {
  const _t: TranslateType = React.useCallback(
    <T extends Keyword>(
      keyWord: T,
      defaultTranslation: ReadOnlyTranslation[T]
    ): string => {
      return i18n(translation, keyWord, defaultTranslation);
    },
    [translation]
  );

  return (
    <TranslationContext.Provider value={{ _t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
