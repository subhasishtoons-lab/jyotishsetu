import type { Language } from '../i18n/types';
import type { StorageLike } from '../i18n/index';

export type PanchangCityId =
  | 'varanasi'
  | 'guwahati'
  | 'new-delhi'
  | 'mumbai'
  | 'kolkata'
  | 'bengaluru'
  | 'chennai'
  | 'ujjain'
  | 'jaipur'
  | 'ahmedabad';

export interface PanchangCity {
  id: PanchangCityId;
  names: Record<Language, string>;
  regions: Record<Language, string>;
  coordinates: string;
  timezone: string;
}

export const PANCHANG_CITY_STORAGE_KEY = 'jyotishsetu_panchang_city';
export const DEFAULT_PANCHANG_CITY_ID: PanchangCityId = 'varanasi';

export const PANCHANG_CITIES: readonly PanchangCity[] = [
  {
    id: 'varanasi',
    names: { en: 'Varanasi', hi: 'वाराणसी', as: 'বাৰাণসী' },
    regions: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', as: 'উত্তৰ প্ৰদেশ' },
    coordinates: '25.32° N, 82.97° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'guwahati',
    names: { en: 'Guwahati', hi: 'गुवाहाटी', as: 'গুৱাহাটী' },
    regions: { en: 'Assam', hi: 'असम', as: 'অসম' },
    coordinates: '26.14° N, 91.74° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'new-delhi',
    names: { en: 'New Delhi', hi: 'नई दिल्ली', as: 'নতুন দিল্লী' },
    regions: { en: 'Delhi', hi: 'दिल्ली', as: 'দিল্লী' },
    coordinates: '28.61° N, 77.21° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'mumbai',
    names: { en: 'Mumbai', hi: 'मुंबई', as: 'মুম্বাই' },
    regions: { en: 'Maharashtra', hi: 'महाराष्ट्र', as: 'মহাৰাষ্ট্ৰ' },
    coordinates: '19.08° N, 72.88° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'kolkata',
    names: { en: 'Kolkata', hi: 'कोलकाता', as: 'কলকাতা' },
    regions: { en: 'West Bengal', hi: 'पश्चिम बंगाल', as: 'পশ্চিমবংগ' },
    coordinates: '22.57° N, 88.36° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'ujjain',
    names: { en: 'Ujjain', hi: 'उज्जैन', as: 'উজ্জয়িনী' },
    regions: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', as: 'মধ্য প্ৰদেশ' },
    coordinates: '23.18° N, 75.79° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'bengaluru',
    names: { en: 'Bengaluru', hi: 'बेंगलुरु', as: 'বেংগালুৰু' },
    regions: { en: 'Karnataka', hi: 'कर्नाटक', as: 'কৰ্ণাটক' },
    coordinates: '12.97° N, 77.59° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'chennai',
    names: { en: 'Chennai', hi: 'चेन्नई', as: 'চেন্নাই' },
    regions: { en: 'Tamil Nadu', hi: 'तमिलनाडु', as: 'তামিলনাডু' },
    coordinates: '13.08° N, 80.27° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'jaipur',
    names: { en: 'Jaipur', hi: 'जयपुर', as: 'জয়পুৰ' },
    regions: { en: 'Rajasthan', hi: 'राजस्थान', as: 'ৰাজস্থান' },
    coordinates: '26.91° N, 75.79° E',
    timezone: 'IST (UTC+05:30)',
  },
  {
    id: 'ahmedabad',
    names: { en: 'Ahmedabad', hi: 'अहमदाबाद', as: 'আহমেদাবাদ' },
    regions: { en: 'Gujarat', hi: 'गुजरात', as: 'গুজৰাট' },
    coordinates: '23.02° N, 72.57° E',
    timezone: 'IST (UTC+05:30)',
  },
] as const;

export function isValidPanchangCityId(value: string | null | undefined): value is PanchangCityId {
  return PANCHANG_CITIES.some((city) => city.id === value);
}

export function getPanchangCityById(id: string | null | undefined): PanchangCity {
  return PANCHANG_CITIES.find((city) => city.id === id) ?? PANCHANG_CITIES[0];
}

export function loadSavedPanchangCity(storage?: StorageLike | null): PanchangCityId {
  try {
    const raw = storage?.getItem(PANCHANG_CITY_STORAGE_KEY);
    if (isValidPanchangCityId(raw)) {
      return raw;
    }
  } catch {
    // Ignore storage read errors in restricted browsing contexts.
  }
  return DEFAULT_PANCHANG_CITY_ID;
}

export function savePanchangCity(cityId: PanchangCityId, storage?: StorageLike | null): void {
  try {
    storage?.setItem(PANCHANG_CITY_STORAGE_KEY, cityId);
  } catch {
    // Ignore storage write errors in restricted browsing contexts.
  }
}

const WEEKDAYS: Record<Language, readonly string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  as: ['দেওবাৰ', 'সোমবাৰ', 'মঙলবাৰ', 'বুধবাৰ', 'বৃহস্পতিবাৰ', 'শুকুৰবাৰ', 'শনিবাৰ'],
};

const VEDIC_VARAS: Record<Language, readonly string[]> = {
  en: ['Ravivara', 'Somavara', 'Mangalavara', 'Budhavara', 'Guruvara', 'Shukravara', 'Shanivara'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  as: ['ৰবিবাৰ', 'সোমবাৰ', 'মঙলবাৰ', 'বুধবাৰ', 'বৃহস্পতিবাৰ', 'শুক্ৰবাৰ', 'শনিবাৰ'],
};

const MONTHS: Record<Language, readonly string[]> = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  hi: [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितम्बर',
    'अक्टूबर',
    'नवम्बर',
    'दिसम्बर',
  ],
  as: [
    'জানুৱাৰী',
    'ফেব্ৰুৱাৰী',
    'মাৰ্চ',
    'এপ্ৰিল',
    'মে’',
    'জুন',
    'জুলাই',
    'আগষ্ট',
    'ছেপ্টেম্বৰ',
    'অক্টোবৰ',
    'নৱেম্বৰ',
    'ডিচেম্বৰ',
  ],
};

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const ASSAMESE_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function localizeDigits(input: number | string, lang: Language): string {
  const str = String(input);
  if (lang === 'en') return str;
  const table = lang === 'hi' ? DEVANAGARI_DIGITS : ASSAMESE_DIGITS;
  return str.replace(/\d/g, (digit) => table[Number(digit)] ?? digit);
}

export interface FormattedPanchangDate {
  formattedDate: string;
  weekdayVedic: string;
}

/**
 * Formats a calendar date into a localized Panchang date string and Vedic Vara.
 * Defaults to the current local calendar date so the displayed date stays accurate.
 */
export function formatPanchangDate(date: Date, lang: Language): FormattedPanchangDate {
  const weekday = WEEKDAYS[lang][date.getDay()];
  const weekdayVedic = VEDIC_VARAS[lang][date.getDay()];
  const day = localizeDigits(date.getDate(), lang);
  const month = MONTHS[lang][date.getMonth()];
  const year = localizeDigits(date.getFullYear(), lang);

  return {
    formattedDate: `${weekday}, ${day} ${month} ${year}`,
    weekdayVedic,
  };
}
