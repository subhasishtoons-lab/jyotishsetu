import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  getDictionary,
  loadSavedLanguage,
  saveLanguage,
  SUPPORTED_LANGUAGES,
  type LanguageOption,
} from '../i18n/index';
import type { Language, TranslationDictionary } from '../i18n/types';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  languages: readonly LanguageOption[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => loadSavedLanguage());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: getDictionary(language),
      languages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
