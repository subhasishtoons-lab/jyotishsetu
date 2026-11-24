import type { Language, TranslationDictionary } from './types';
import { en } from './translations/en';
import { hi } from './translations/hi';
import { as } from './translations/as';

export const LANGUAGE_STORAGE_KEY = 'jyotishsetu_language';

export interface LanguageOption {
  code: Language;
  nativeLabel: string;
  shortCode: string;
  englishName: string;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: 'en', nativeLabel: 'English', shortCode: 'EN', englishName: 'English' },
  { code: 'hi', nativeLabel: 'हिन्दी', shortCode: 'हिन्दी', englishName: 'Hindi' },
  { code: 'as', nativeLabel: 'অসমীয়া', shortCode: 'অসমীয়া', englishName: 'Assamese' },
] as const;

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en,
  hi,
  as,
};

export function isSupportedLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'hi' || value === 'as';
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function loadSavedLanguage(storage?: StorageLike | null): Language {
  try {
    const target =
      storage !== undefined
        ? storage
        : typeof window !== 'undefined'
          ? window.localStorage
          : null;
    if (!target) return 'en';
    const raw = target.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(raw) ? raw : 'en';
  } catch {
    return 'en';
  }
}

export function saveLanguage(lang: Language, storage?: StorageLike | null): void {
  try {
    const target =
      storage !== undefined
        ? storage
        : typeof window !== 'undefined'
          ? window.localStorage
          : null;
    if (!target) return;
    target.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Ignore storage quota / privacy mode errors gracefully
  }
}

export function getDictionary(lang: Language): TranslationDictionary {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}
