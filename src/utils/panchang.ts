import type { Language } from '../i18n/types';
import type { StorageLike } from '../i18n/index';

export type PanchangCityId =
  | 'varanasi'
  | 'guwahati'
  | 'new-delhi'
  | 'mumbai'
  | 'kolkata'
  | 'ujjain'
  | 'bengaluru'
  | 'chennai'
  | 'jaipur'
  | 'ahmedabad'
  | 'dibrugarh'
  | 'jorhat'
  | 'silchar'
  | 'hyderabad'
  | 'pune'
  | 'kathmandu'
  | 'london'
  | 'new-york';

export interface PanchangCity {
  id: PanchangCityId;
  names: Record<Language, string>;
  regions: Record<Language, string>;
  coordinates: string;
  timezone: string;
  lat: number;
  lon: number;
  /** Standard UTC offset in minutes (e.g., +330 for IST UTC+05:30). */
  utcOffsetMinutes: number;
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
    lat: 25.3176,
    lon: 82.9739,
    utcOffsetMinutes: 330,
  },
  {
    id: 'guwahati',
    names: { en: 'Guwahati', hi: 'गुवाहाटी', as: 'গুৱাহাটী' },
    regions: { en: 'Assam', hi: 'असम', as: 'অসম' },
    coordinates: '26.14° N, 91.74° E',
    timezone: 'IST (UTC+05:30)',
    lat: 26.1445,
    lon: 91.7362,
    utcOffsetMinutes: 330,
  },
  {
    id: 'dibrugarh',
    names: { en: 'Dibrugarh', hi: 'डिब्रूगढ़', as: 'ডিব্ৰুগড়' },
    regions: { en: 'Assam', hi: 'असम', as: 'অসম' },
    coordinates: '27.47° N, 94.91° E',
    timezone: 'IST (UTC+05:30)',
    lat: 27.4728,
    lon: 94.912,
    utcOffsetMinutes: 330,
  },
  {
    id: 'jorhat',
    names: { en: 'Jorhat', hi: 'जोरहाट', as: 'যোৰহাট' },
    regions: { en: 'Assam', hi: 'असम', as: 'অসম' },
    coordinates: '26.76° N, 94.21° E',
    timezone: 'IST (UTC+05:30)',
    lat: 26.7575,
    lon: 94.2031,
    utcOffsetMinutes: 330,
  },
  {
    id: 'silchar',
    names: { en: 'Silchar', hi: 'सिलचर', as: 'শিলচৰ' },
    regions: { en: 'Assam', hi: 'असम', as: 'অসম' },
    coordinates: '24.83° N, 92.78° E',
    timezone: 'IST (UTC+05:30)',
    lat: 24.8333,
    lon: 92.7789,
    utcOffsetMinutes: 330,
  },
  {
    id: 'new-delhi',
    names: { en: 'New Delhi', hi: 'नई दिल्ली', as: 'নতুন দিল্লী' },
    regions: { en: 'Delhi', hi: 'दिल्ली', as: 'দিল্লী' },
    coordinates: '28.61° N, 77.21° E',
    timezone: 'IST (UTC+05:30)',
    lat: 28.6139,
    lon: 77.209,
    utcOffsetMinutes: 330,
  },
  {
    id: 'mumbai',
    names: { en: 'Mumbai', hi: 'मुंबई', as: 'মুম্বাই' },
    regions: { en: 'Maharashtra', hi: 'महाराष्ट्र', as: 'মহাৰাষ্ট্ৰ' },
    coordinates: '19.08° N, 72.88° E',
    timezone: 'IST (UTC+05:30)',
    lat: 19.076,
    lon: 72.8777,
    utcOffsetMinutes: 330,
  },
  {
    id: 'kolkata',
    names: { en: 'Kolkata', hi: 'कोलकाता', as: 'কলকাতা' },
    regions: { en: 'West Bengal', hi: 'पश्चिम बंगाल', as: 'পশ্চিমবংগ' },
    coordinates: '22.57° N, 88.36° E',
    timezone: 'IST (UTC+05:30)',
    lat: 22.5726,
    lon: 88.3639,
    utcOffsetMinutes: 330,
  },
  {
    id: 'ujjain',
    names: { en: 'Ujjain', hi: 'उज्जैन', as: 'উজ্জয়িনী' },
    regions: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', as: 'মধ্য প্ৰদেশ' },
    coordinates: '23.18° N, 75.79° E',
    timezone: 'IST (UTC+05:30)',
    lat: 23.1765,
    lon: 75.7885,
    utcOffsetMinutes: 330,
  },
  {
    id: 'bengaluru',
    names: { en: 'Bengaluru', hi: 'बेंगलुरु', as: 'বেংগালুৰু' },
    regions: { en: 'Karnataka', hi: 'कर्नाटक', as: 'কৰ্ণাটক' },
    coordinates: '12.97° N, 77.59° E',
    timezone: 'IST (UTC+05:30)',
    lat: 12.9716,
    lon: 77.5946,
    utcOffsetMinutes: 330,
  },
  {
    id: 'chennai',
    names: { en: 'Chennai', hi: 'चेन्नई', as: 'চেন্নাই' },
    regions: { en: 'Tamil Nadu', hi: 'तमिलनाडु', as: 'তামিলনাডু' },
    coordinates: '13.08° N, 80.27° E',
    timezone: 'IST (UTC+05:30)',
    lat: 13.0827,
    lon: 80.2707,
    utcOffsetMinutes: 330,
  },
  {
    id: 'jaipur',
    names: { en: 'Jaipur', hi: 'जयपुर', as: 'জয়পুৰ' },
    regions: { en: 'Rajasthan', hi: 'राजस्थान', as: 'ৰাজস্থান' },
    coordinates: '26.91° N, 75.79° E',
    timezone: 'IST (UTC+05:30)',
    lat: 26.9124,
    lon: 75.7873,
    utcOffsetMinutes: 330,
  },
  {
    id: 'ahmedabad',
    names: { en: 'Ahmedabad', hi: 'अहमदाबाद', as: 'আহমেদাবাদ' },
    regions: { en: 'Gujarat', hi: 'गुजरात', as: 'গুজৰাট' },
    coordinates: '23.02° N, 72.57° E',
    timezone: 'IST (UTC+05:30)',
    lat: 23.0225,
    lon: 72.5714,
    utcOffsetMinutes: 330,
  },
  {
    id: 'hyderabad',
    names: { en: 'Hyderabad', hi: 'हैदराबाद', as: 'হায়দৰাবাদ' },
    regions: { en: 'Telangana', hi: 'तेलंगाना', as: 'তেলেংগানা' },
    coordinates: '17.39° N, 78.49° E',
    timezone: 'IST (UTC+05:30)',
    lat: 17.385,
    lon: 78.4867,
    utcOffsetMinutes: 330,
  },
  {
    id: 'pune',
    names: { en: 'Pune', hi: 'पुणे', as: 'পুনে' },
    regions: { en: 'Maharashtra', hi: 'महाराष्ट्र', as: 'মহাৰাষ্ট্ৰ' },
    coordinates: '18.52° N, 73.86° E',
    timezone: 'IST (UTC+05:30)',
    lat: 18.5204,
    lon: 73.8567,
    utcOffsetMinutes: 330,
  },
  {
    id: 'kathmandu',
    names: { en: 'Kathmandu', hi: 'काठमांडू', as: 'কাঠমাণ্ডু' },
    regions: { en: 'Nepal', hi: 'नेपाल', as: 'নেপাল' },
    coordinates: '27.72° N, 85.32° E',
    timezone: 'NPT (UTC+05:45)',
    lat: 27.7172,
    lon: 85.324,
    utcOffsetMinutes: 345,
  },
  {
    id: 'london',
    names: { en: 'London', hi: 'लंदन', as: 'লণ্ডন' },
    regions: { en: 'United Kingdom', hi: 'यूनाइटेड किंगडम', as: 'যুক্তৰাজ্য' },
    coordinates: '51.51° N, 0.13° W',
    timezone: 'GMT (UTC+00:00)',
    lat: 51.5074,
    lon: -0.1278,
    utcOffsetMinutes: 0,
  },
  {
    id: 'new-york',
    names: { en: 'New York', hi: 'न्यूयॉर्क', as: 'নিউ ইয়ৰ্ক' },
    regions: { en: 'United States', hi: 'संयुक्त राज्य', as: 'আমেৰিকা যুক্তৰাষ্ট্ৰ' },
    coordinates: '40.71° N, 74.01° W',
    timezone: 'EST (UTC-05:00)',
    lat: 40.7128,
    lon: -74.006,
    utcOffsetMinutes: -300,
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

/**
 * Formats a UTC Date in the target city's fixed UTC offset as localized 12-hour time.
 */
export function formatLocalTime(
  utcDate: Date | null,
  utcOffsetMinutes: number,
  lang: Language,
): string {
  if (!utcDate) return '—';
  const shifted = new Date(utcDate.getTime() + utcOffsetMinutes * 60_000);
  const h24 = shifted.getUTCHours();
  const mins = shifted.getUTCMinutes();
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const hh = String(h12).padStart(2, '0');
  const mm = String(mins).padStart(2, '0');

  if (lang === 'en') {
    const suffix = h24 < 12 ? 'AM' : 'PM';
    return `${hh}:${mm} ${suffix}`;
  }
  const timeNum = localizeDigits(`${hh}:${mm}`, lang);
  if (lang === 'hi') {
    const period =
      h24 < 4
        ? 'रात्रि'
        : h24 < 12
          ? 'प्रातः'
          : h24 < 16
            ? 'दोपहर'
            : h24 < 20
              ? 'सायं'
              : 'रात्रि';
    return `${period} ${timeNum}`;
  }
  // Natural Assamese time periods
  const periodAs =
    h24 < 4
      ? 'নিশা'
      : h24 < 11
        ? 'পুৱা'
        : h24 < 14
          ? 'দুপৰীয়া'
          : h24 < 17
            ? 'বিয়লি'
            : h24 < 20
              ? 'সন্ধিয়া'
              : 'নিশা';
  return `${periodAs} ${timeNum}`;
}

export function formatShortDate(utcDate: Date, lang: Language): string {
  const day = localizeDigits(utcDate.getUTCDate(), lang);
  const month = MONTHS[lang][utcDate.getUTCMonth()];
  const year = localizeDigits(utcDate.getUTCFullYear(), lang);
  return `${day} ${month} ${year}`;
}

export function formatTimeRange(
  start: Date | null,
  end: Date | null,
  utcOffsetMinutes: number,
  lang: Language,
): string {
  if (!start || !end) return '—';
  return `${formatLocalTime(start, utcOffsetMinutes, lang)} – ${formatLocalTime(end, utcOffsetMinutes, lang)}`;
}
