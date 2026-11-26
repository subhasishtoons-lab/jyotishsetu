import type { Language } from '../i18n/types';
import {
  PANCHANG_CITIES,
  formatUtcOffsetLabel,
  getPanchangCityById,
  type PanchangCity,
  type PanchangCityId,
} from './panchang';

export type BirthplaceMode = 'preset' | 'custom';
export type LatHemisphere = 'N' | 'S';
export type LonHemisphere = 'E' | 'W';

export interface CustomBirthplaceFields {
  placeName: string;
  district: string;
  state: string;
  country: string;
  latValue: string;
  latDir: LatHemisphere;
  lonValue: string;
  lonDir: LonHemisphere;
  ianaTimeZone: string;
}

export interface BirthplaceSelection {
  mode: BirthplaceMode;
  presetCityId: PanchangCityId;
  custom: CustomBirthplaceFields;
}

export interface BirthplaceValidationErrors {
  placeNameMissing?: boolean;
  latMissing?: boolean;
  latInvalid?: boolean;
  lonMissing?: boolean;
  lonInvalid?: boolean;
  timezoneInvalid?: boolean;
}

export interface ResolvedBirthplace {
  mode: BirthplaceMode;
  presetCityId: PanchangCityId | null;
  displayName: string;
  shortName: string;
  lat: number;
  lon: number;
  coordinatesLabel: string;
  ianaTimeZone: string;
  utcOffsetMinutes: number;
  timezoneLabel: string;
  isHistoricalLmt: boolean;
  isPolarLatitude: boolean;
}

export interface BirthplaceValidationResult {
  valid: boolean;
  errors: BirthplaceValidationErrors;
  resolved: ResolvedBirthplace | null;
}

export interface CuratedTimeZoneOption {
  iana: string;
  label: string;
  region: string;
}

export const CURATED_IANA_TIMEZONES: readonly CuratedTimeZoneOption[] = [
  // South Asia
  { iana: 'Asia/Kolkata', label: 'India (IST · Asia/Kolkata)', region: 'South Asia' },
  { iana: 'Asia/Kathmandu', label: 'Nepal (NPT · Asia/Kathmandu)', region: 'South Asia' },
  { iana: 'Asia/Dhaka', label: 'Bangladesh (BST · Asia/Dhaka)', region: 'South Asia' },
  { iana: 'Asia/Thimphu', label: 'Bhutan (BTT · Asia/Thimphu)', region: 'South Asia' },
  { iana: 'Asia/Colombo', label: 'Sri Lanka (SLST · Asia/Colombo)', region: 'South Asia' },
  { iana: 'Asia/Karachi', label: 'Pakistan (PKT · Asia/Karachi)', region: 'South Asia' },
  { iana: 'Asia/Kabul', label: 'Afghanistan (AFT · Asia/Kabul)', region: 'South Asia' },
  { iana: 'Asia/Yangon', label: 'Myanmar (MMT · Asia/Yangon)', region: 'South Asia' },
  // Middle East
  { iana: 'Asia/Dubai', label: 'UAE / Dubai (GST · Asia/Dubai)', region: 'Middle East' },
  { iana: 'Asia/Muscat', label: 'Oman (GST · Asia/Muscat)', region: 'Middle East' },
  { iana: 'Asia/Qatar', label: 'Qatar (AST · Asia/Qatar)', region: 'Middle East' },
  { iana: 'Asia/Riyadh', label: 'Saudi Arabia (AST · Asia/Riyadh)', region: 'Middle East' },
  { iana: 'Asia/Kuwait', label: 'Kuwait (AST · Asia/Kuwait)', region: 'Middle East' },
  { iana: 'Asia/Tehran', label: 'Iran (IRST · Asia/Tehran)', region: 'Middle East' },
  // East & Southeast Asia
  { iana: 'Asia/Singapore', label: 'Singapore (SGT · Asia/Singapore)', region: 'Asia' },
  { iana: 'Asia/Kuala_Lumpur', label: 'Malaysia (MYT · Asia/Kuala_Lumpur)', region: 'Asia' },
  { iana: 'Asia/Bangkok', label: 'Thailand (ICT · Asia/Bangkok)', region: 'Asia' },
  { iana: 'Asia/Jakarta', label: 'Indonesia West (WIB · Asia/Jakarta)', region: 'Asia' },
  { iana: 'Asia/Manila', label: 'Philippines (PHT · Asia/Manila)', region: 'Asia' },
  { iana: 'Asia/Hong_Kong', label: 'Hong Kong (HKT · Asia/Hong_Kong)', region: 'Asia' },
  { iana: 'Asia/Shanghai', label: 'China (CST · Asia/Shanghai)', region: 'Asia' },
  { iana: 'Asia/Tokyo', label: 'Japan (JST · Asia/Tokyo)', region: 'Asia' },
  { iana: 'Asia/Seoul', label: 'South Korea (KST · Asia/Seoul)', region: 'Asia' },
  // Oceania & Southern Hemisphere
  { iana: 'Australia/Sydney', label: 'Australia East / Sydney (AEST/AEDT)', region: 'Oceania' },
  { iana: 'Australia/Melbourne', label: 'Australia / Melbourne (AEST/AEDT)', region: 'Oceania' },
  { iana: 'Australia/Brisbane', label: 'Australia / Brisbane (AEST)', region: 'Oceania' },
  { iana: 'Australia/Adelaide', label: 'Australia / Adelaide (ACST/ACDT)', region: 'Oceania' },
  { iana: 'Australia/Perth', label: 'Australia West / Perth (AWST)', region: 'Oceania' },
  { iana: 'Pacific/Auckland', label: 'New Zealand / Auckland (NZST/NZDT)', region: 'Oceania' },
  { iana: 'Pacific/Fiji', label: 'Fiji (FJT · Pacific/Fiji)', region: 'Oceania' },
  // Europe
  { iana: 'Europe/London', label: 'United Kingdom / London (GMT/BST)', region: 'Europe' },
  { iana: 'Europe/Dublin', label: 'Ireland / Dublin (GMT/IST)', region: 'Europe' },
  { iana: 'Europe/Paris', label: 'France / Paris (CET/CEST)', region: 'Europe' },
  { iana: 'Europe/Berlin', label: 'Germany / Berlin (CET/CEST)', region: 'Europe' },
  { iana: 'Europe/Zurich', label: 'Switzerland / Zurich (CET/CEST)', region: 'Europe' },
  { iana: 'Europe/Amsterdam', label: 'Netherlands / Amsterdam (CET/CEST)', region: 'Europe' },
  { iana: 'Europe/Rome', label: 'Italy / Rome (CET/CEST)', region: 'Europe' },
  { iana: 'Europe/Madrid', label: 'Spain / Madrid (CET/CEST)', region: 'Europe' },
  { iana: 'Europe/Moscow', label: 'Russia / Moscow (MSK)', region: 'Europe' },
  // Africa
  { iana: 'Africa/Johannesburg', label: 'South Africa / Johannesburg (SAST)', region: 'Africa' },
  { iana: 'Africa/Nairobi', label: 'Kenya / Nairobi (EAT)', region: 'Africa' },
  { iana: 'Africa/Cairo', label: 'Egypt / Cairo (EET)', region: 'Africa' },
  { iana: 'Africa/Lagos', label: 'Nigeria / Lagos (WAT)', region: 'Africa' },
  { iana: 'Indian/Mauritius', label: 'Mauritius (MUT · Indian/Mauritius)', region: 'Africa' },
  // Americas
  { iana: 'America/New_York', label: 'US / Canada Eastern (EST/EDT)', region: 'Americas' },
  { iana: 'America/Chicago', label: 'US / Canada Central (CST/CDT)', region: 'Americas' },
  { iana: 'America/Denver', label: 'US Mountain (MST/MDT)', region: 'Americas' },
  { iana: 'America/Los_Angeles', label: 'US / Canada Pacific (PST/PDT)', region: 'Americas' },
  { iana: 'America/Toronto', label: 'Canada / Toronto (EST/EDT)', region: 'Americas' },
  { iana: 'America/Vancouver', label: 'Canada / Vancouver (PST/PDT)', region: 'Americas' },
  { iana: 'America/Mexico_City', label: 'Mexico City (CST/CDT)', region: 'Americas' },
  { iana: 'America/Sao_Paulo', label: 'Brazil / Sao Paulo (BRT)', region: 'Americas' },
  {
    iana: 'America/Argentina/Buenos_Aires',
    label: 'Argentina / Buenos Aires (ART)',
    region: 'Americas',
  },
  { iana: 'America/Santiago', label: 'Chile / Santiago (CLT/CLST)', region: 'Americas' },
  { iana: 'America/Lima', label: 'Peru / Lima (PET)', region: 'Americas' },
  { iana: 'Pacific/Honolulu', label: 'US / Hawaii (HST)', region: 'Americas' },
  // Universal
  { iana: 'UTC', label: 'UTC (Coordinated Universal Time)', region: 'Universal' },
] as const;

let cachedAllTimeZones: CuratedTimeZoneOption[] | null = null;

/**
 * Returns curated IANA timezones first, followed by any additional IANA timezones
 * supported by the current JavaScript runtime (`Intl.supportedValuesOf('timeZone')`).
 */
export function getAvailableIanaTimeZones(): readonly CuratedTimeZoneOption[] {
  if (cachedAllTimeZones) return cachedAllTimeZones;
  const seen = new Set<string>(CURATED_IANA_TIMEZONES.map((tz) => tz.iana));
  const combined: CuratedTimeZoneOption[] = [...CURATED_IANA_TIMEZONES];

  try {
    const intlWithValues = Intl as unknown as {
      supportedValuesOf?: (key: string) => string[];
    };
    if (typeof intlWithValues.supportedValuesOf === 'function') {
      for (const tz of intlWithValues.supportedValuesOf('timeZone')) {
        if (!seen.has(tz)) {
          seen.add(tz);
          const slashIdx = tz.indexOf('/');
          const region = slashIdx > 0 ? tz.slice(0, slashIdx) : 'Other';
          combined.push({
            iana: tz,
            label: tz.replace(/_/g, ' '),
            region,
          });
        }
      }
    }
  } catch {
    // Fall back to curated IANA list when Intl.supportedValuesOf is unavailable.
  }

  cachedAllTimeZones = combined;
  return combined;
}

export function isValidIanaTimeZone(tz: string): boolean {
  const trimmed = (tz || '').trim();
  if (!trimmed) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: trimmed });
    return true;
  } catch {
    return false;
  }
}

export function createEmptyCustomBirthplace(
  overrides: Partial<CustomBirthplaceFields> = {},
): CustomBirthplaceFields {
  return {
    placeName: '',
    district: '',
    state: '',
    country: '',
    latValue: '',
    latDir: 'N',
    lonValue: '',
    lonDir: 'E',
    ianaTimeZone: 'Asia/Kolkata',
    ...overrides,
  };
}

export function createPresetBirthplace(
  cityId: PanchangCityId = 'guwahati',
): BirthplaceSelection {
  const city = getPanchangCityById(cityId);
  return {
    mode: 'preset',
    presetCityId: city.id,
    custom: createEmptyCustomBirthplace({ ianaTimeZone: city.ianaTimeZone }),
  };
}

export function createCustomBirthplace(
  overrides: Partial<CustomBirthplaceFields> = {},
  fallbackPresetId: PanchangCityId = 'guwahati',
): BirthplaceSelection {
  return {
    mode: 'custom',
    presetCityId: fallbackPresetId,
    custom: createEmptyCustomBirthplace(overrides),
  };
}

/**
 * Compares two BirthplaceSelection values for exact equality across mode,
 * preset city selection, and all custom location fields.
 */
export function areBirthplaceSelectionsEqual(
  a: BirthplaceSelection,
  b: BirthplaceSelection,
): boolean {
  if (a.mode !== b.mode) return false;
  if (a.mode === 'preset') {
    return a.presetCityId === b.presetCityId;
  }
  const ca = a.custom;
  const cb = b.custom;
  return (
    ca.placeName === cb.placeName &&
    ca.district === cb.district &&
    ca.state === cb.state &&
    ca.country === cb.country &&
    ca.latValue === cb.latValue &&
    ca.latDir === cb.latDir &&
    ca.lonValue === cb.lonValue &&
    ca.lonDir === cb.lonDir &&
    ca.ianaTimeZone === cb.ianaTimeZone
  );
}

/**
 * Returns true whenever the user changed birthplace mode, preset city,
 * or any custom birthplace field (name, region, coordinates, hemisphere, or timezone).
 */
export function hasBirthplaceChanged(
  prev: BirthplaceSelection,
  next: BirthplaceSelection,
): boolean {
  return !areBirthplaceSelectionsEqual(prev, next);
}

/**
 * Validates that the coordinates and UTC offset passed into a calculation
 * strictly match the selected and resolved birthplace — and that a custom
 * birthplace NEVER silently resolves to a preset city.
 */
export function assertBirthplaceMatchesCalculation(
  selection: BirthplaceSelection,
  resolved: ResolvedBirthplace,
  calcCoords: { lat: number; lon: number; utcOffsetMinutes: number },
): boolean {
  if (selection.mode !== resolved.mode) return false;
  if (selection.mode === 'custom' && resolved.presetCityId !== null) return false;
  if (selection.mode === 'preset' && resolved.presetCityId !== selection.presetCityId) {
    return false;
  }
  if (!Number.isFinite(calcCoords.lat) || !Number.isFinite(calcCoords.lon)) return false;
  if (!Number.isFinite(calcCoords.utcOffsetMinutes)) return false;
  return (
    calcCoords.lat === resolved.lat &&
    calcCoords.lon === resolved.lon &&
    calcCoords.utcOffsetMinutes === resolved.utcOffsetMinutes
  );
}

/**
 * Parses a decimal coordinate string with hemisphere indicator (N/S or E/W).
 * - Empty or non-numeric input returns `null` (never substitutes a default city).
 * - If user enters a leading negative sign (e.g. "-33.8688"), the negative sign is honoured
 *   directly without double-negating even if hemisphere is 'S' or 'W'.
 */
export function parseSignedCoordinate(
  raw: string,
  hemisphere: LatHemisphere | LonHemisphere,
): number | null {
  const trimmed = (raw ?? '').trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return null;

  if (trimmed.startsWith('-')) {
    return parsed;
  }
  const abs = Math.abs(parsed);
  if (abs === 0) return 0;
  return hemisphere === 'S' || hemisphere === 'W' ? -abs : abs;
}

export function formatCoordinatesLabel(lat: number, lon: number, decimals: number = 4): string {
  const latAbs = Math.abs(lat).toFixed(decimals);
  const lonAbs = Math.abs(lon).toFixed(decimals);
  const latHem: LatHemisphere = lat < 0 ? 'S' : 'N';
  const lonHem: LonHemisphere = lon < 0 ? 'W' : 'E';
  return `${latAbs}° ${latHem}, ${lonAbs}° ${lonHem}`;
}

export function formatCustomPlaceName(custom: CustomBirthplaceFields): string {
  const rawParts = [custom.placeName, custom.district, custom.state, custom.country]
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const deduped: string[] = [];
  for (const part of rawParts) {
    const prev = deduped[deduped.length - 1];
    if (!prev || prev.toLowerCase() !== part.toLowerCase()) {
      deduped.push(part);
    }
  }
  return deduped.join(', ');
}

/**
 * Resolves the accurate UTC offset in minutes for ANY IANA timezone on a specific local date & time.
 * Handles:
 * - Pre-1906 Local Mean Time (lon * 4 min) for Indian locations (`Asia/Kolkata` / `Asia/Calcutta`)
 * - Historical wartime offsets (e.g. India War Time 1942–1945 UTC+06:30, UK WWII Double Summer Time)
 * - Modern & historical Northern and Southern Hemisphere Daylight Saving Time transitions.
 */
export function resolveIanaUtcOffsetMinutes(
  ianaTimeZone: string,
  dateStr: string,
  timeStr: string = '12:00',
  lon?: number,
): { offsetMinutes: number; isHistoricalLmt: boolean } {
  const tz = (ianaTimeZone || 'UTC').trim();
  const [yStr, mStr, dStr] = (dateStr || '2000-01-01').split('-');
  const [hhStr, mmStr] = (timeStr || '12:00').split(':');
  const year = Number(yStr);
  const month = Number(mStr);
  const day = Number(dStr);
  const hour = Number(hhStr) || 0;
  const minute = Number(mmStr) || 0;

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return { offsetMinutes: 0, isHistoricalLmt: false };
  }

  // Prior to 1 Jan 1906, India did not use unified IST; Indian towns kept Local Mean Time (lon * 4 min)
  if (
    (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') &&
    year < 1906 &&
    typeof lon === 'number' &&
    Number.isFinite(lon)
  ) {
    return { offsetMinutes: Math.round(lon * 4), isHistoricalLmt: true };
  }

  try {
    const approxUtc = new Date(0);
    approxUtc.setUTCFullYear(year, month - 1, day);
    approxUtc.setUTCHours(hour, minute, 0, 0);

    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    });

    const toZonedUtcMs = (dt: Date): number => {
      const parts = Object.fromEntries(fmt.formatToParts(dt).map((p) => [p.type, p.value]));
      const zoned = new Date(0);
      zoned.setUTCFullYear(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
      zoned.setUTCHours(Number(parts.hour), Number(parts.minute), Number(parts.second), 0);
      return zoned.getTime();
    };

    const offset1 = Math.round((toZonedUtcMs(approxUtc) - approxUtc.getTime()) / 60_000);
    const refinedUtc = new Date(approxUtc.getTime() - offset1 * 60_000);
    const offset2 = Math.round((toZonedUtcMs(refinedUtc) - refinedUtc.getTime()) / 60_000);
    return {
      offsetMinutes: Number.isFinite(offset2) ? offset2 : 0,
      isHistoricalLmt: false,
    };
  } catch {
    return { offsetMinutes: 0, isHistoricalLmt: false };
  }
}

/**
 * Validates and resolves a preset or custom birthplace selection for a specific date and time.
 * NEVER silently substitutes Guwahati or another preset city when `selection.mode === 'custom'`.
 */
export function validateBirthplaceSelection(
  selection: BirthplaceSelection,
  dateStr: string,
  timeStr: string = '12:00',
  language: Language = 'en',
): BirthplaceValidationResult {
  if (selection.mode === 'preset') {
    const city = getPanchangCityById(selection.presetCityId);
    const { offsetMinutes, isHistoricalLmt } = resolveIanaUtcOffsetMinutes(
      city.ianaTimeZone,
      dateStr,
      timeStr,
      city.lon,
    );
    const utcStr = formatUtcOffsetLabel(offsetMinutes);
    const timezoneLabel = isHistoricalLmt
      ? `${city.ianaTimeZone} (LMT ${utcStr})`
      : offsetMinutes === city.utcOffsetMinutes
        ? city.timezone
        : `${city.ianaTimeZone} (${utcStr})`;

    return {
      valid: true,
      errors: {},
      resolved: {
        mode: 'preset',
        presetCityId: city.id,
        displayName: `${city.names[language]}, ${city.regions[language]}`,
        shortName: city.names[language],
        lat: city.lat,
        lon: city.lon,
        coordinatesLabel: formatCoordinatesLabel(city.lat, city.lon, 4),
        ianaTimeZone: city.ianaTimeZone,
        utcOffsetMinutes: offsetMinutes,
        timezoneLabel,
        isHistoricalLmt,
        isPolarLatitude: Math.abs(city.lat) > 66.5,
      },
    };
  }

  // Custom birthplace mode — strict validation, ZERO silent fallback to any preset city
  const { custom } = selection;
  const errors: BirthplaceValidationErrors = {};

  if (!custom.placeName.trim()) {
    errors.placeNameMissing = true;
  }

  const latRaw = (custom.latValue ?? '').trim();
  const lonRaw = (custom.lonValue ?? '').trim();

  const parsedLat = parseSignedCoordinate(latRaw, custom.latDir);
  if (!latRaw) {
    errors.latMissing = true;
  } else if (parsedLat === null || parsedLat < -90 || parsedLat > 90) {
    errors.latInvalid = true;
  }

  const parsedLon = parseSignedCoordinate(lonRaw, custom.lonDir);
  if (!lonRaw) {
    errors.lonMissing = true;
  } else if (parsedLon === null || parsedLon < -180 || parsedLon > 180) {
    errors.lonInvalid = true;
  }

  const tzValid = isValidIanaTimeZone(custom.ianaTimeZone);
  if (!tzValid) {
    errors.timezoneInvalid = true;
  }

  const hasErrors = Object.values(errors).some(Boolean);
  if (hasErrors || parsedLat === null || parsedLon === null) {
    return { valid: false, errors, resolved: null };
  }

  const { offsetMinutes, isHistoricalLmt } = resolveIanaUtcOffsetMinutes(
    custom.ianaTimeZone,
    dateStr,
    timeStr,
    parsedLon,
  );
  const utcStr = formatUtcOffsetLabel(offsetMinutes);
  const timezoneLabel = isHistoricalLmt
    ? `${custom.ianaTimeZone} (LMT ${utcStr})`
    : `${custom.ianaTimeZone} (${utcStr})`;

  const displayName = formatCustomPlaceName(custom);

  return {
    valid: true,
    errors: {},
    resolved: {
      mode: 'custom',
      presetCityId: null,
      displayName,
      shortName: custom.placeName.trim(),
      lat: parsedLat,
      lon: parsedLon,
      coordinatesLabel: formatCoordinatesLabel(parsedLat, parsedLon, 4),
      ianaTimeZone: custom.ianaTimeZone.trim(),
      utcOffsetMinutes: offsetMinutes,
      timezoneLabel,
      isHistoricalLmt,
      isPolarLatitude: Math.abs(parsedLat) > 66.5,
    },
  };
}

const PRESET_COUNTRY_KEYWORDS: Record<PanchangCityId, string> = {
  varanasi: 'india bharat up uttar pradesh',
  guwahati: 'india bharat assam kamrup northeast',
  dibrugarh: 'india bharat assam upper assam',
  jorhat: 'india bharat assam upper assam',
  silchar: 'india bharat assam barak valley cachar',
  'new-delhi': 'india bharat delhi ncr',
  mumbai: 'india bharat maharashtra bombay',
  kolkata: 'india bharat west bengal calcutta',
  ujjain: 'india bharat madhya pradesh mp',
  bengaluru: 'india bharat karnataka bangalore',
  chennai: 'india bharat tamil nadu madras',
  jaipur: 'india bharat rajasthan',
  ahmedabad: 'india bharat gujarat',
  hyderabad: 'india bharat telangana',
  pune: 'india bharat maharashtra poona',
  kathmandu: 'nepal',
  london: 'uk united kingdom england britain',
  'new-york': 'usa us united states america nyc',
};

/**
 * Searches all 18 preset cities across English, Hindi, Assamese names, regions, and country keywords.
 */
export function searchPresetCities(query: string): readonly PanchangCity[] {
  const q = query.trim().toLowerCase();
  if (!q) return PANCHANG_CITIES;
  const tokens = q.split(/\s+/).filter(Boolean);

  return PANCHANG_CITIES.filter((city) => {
    const haystack = [
      city.id,
      city.names.en,
      city.names.hi,
      city.names.as,
      city.regions.en,
      city.regions.hi,
      city.regions.as,
      city.ianaTimeZone,
      PRESET_COUNTRY_KEYWORDS[city.id] ?? '',
    ]
      .join(' ')
      .toLowerCase();
    return tokens.every((tok) => haystack.includes(tok));
  });
}

export const BIRTHPLACE_UI = {
  en: {
    birthplaceLabel: 'Birthplace (Village, Town, or City)',
    locationLabel: 'Location (Village, Town, or City)',
    presetBadge: 'Preset City',
    customBadge: 'Custom Location',
    editBtn: 'Change / Edit',
    doneBtn: 'Close Editor',
    searchPlaceholder: 'Search 18 preset cities or type any village / town...',
    presetGroupLabel: '18 Preset Cities',
    noPresetMatch: 'No preset city matches your search.',
    notListedBtn: 'My birthplace is not listed',
    notListedLocationBtn: 'My location is not listed',
    notListedSub: 'Enter any village, town, district, state, country, coordinates, and IANA timezone',
    backToPresetsBtn: 'Choose from 18 preset cities instead',
    placeNameLabel: 'Village / Town / City *',
    placeNamePlaceholder: 'e.g. Majuli, Tezpur, Sivasagar, Sydney',
    districtLabel: 'District',
    districtPlaceholder: 'e.g. Majuli, Sonitpur',
    stateLabel: 'State / Province',
    statePlaceholder: 'e.g. Assam, New South Wales',
    countryLabel: 'Country',
    countryPlaceholder: 'e.g. India, Australia',
    latitudeLabel: 'Latitude *',
    latitudePlaceholder: 'e.g. 26.9500',
    longitudeLabel: 'Longitude *',
    longitudePlaceholder: 'e.g. 94.1667',
    timezoneLabel: 'Timezone (IANA) *',
    timezoneSearchPlaceholder: 'Filter timezones (e.g. Kolkata, London, Sydney, New_York)...',
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'W',
    resolvedOffsetPrefix: 'Resolved for selected date & time',
    historicalLmtNote: 'Pre-1906 historical Local Mean Time (LMT) applied from longitude.',
    polarNote:
      'Polar latitude (>66.5°): horizon Ascendant calculation clamps latitude at 66.5° to avoid polar singularities.',
    selectedSummaryTitle: 'Selected Birthplace',
    selectedLocationSummaryTitle: 'Selected Location',
    coordinatesRequiredTitle: 'Coordinates Required for Accurate Calculation',
    coordinatesRequiredBody:
      'Accurate Vedic Ascendant (Lagna), Sunrise/Sunset, and local-time calculations require valid Latitude (0°–90° N/S) and Longitude (0°–180° E/W). JyotishSetu will not substitute Guwahati or another city.',
    errPlaceName: 'Please enter the village, town, or city name.',
    errLatMissing: 'Latitude is required for accurate Ascendant and local-time calculations.',
    errLatInvalid: 'Latitude must be a valid number between 0° and 90° (N or S).',
    errLonMissing: 'Longitude is required for accurate Ascendant and local-time calculations.',
    errLonInvalid: 'Longitude must be a valid number between 0° and 180° (E or W).',
    errTimezone: 'Please select a valid IANA timezone.',
    privacyNote: 'Processed locally in your browser · Never stored or transmitted.',
    customIncompleteBadge: 'Coordinates needed',
    resultsClearedTitle: 'Birthplace Updated — Ready to Calculate',
    resultsClearedBody:
      'Previous results were cleared when the birthplace changed so stale city data is never shown. Click the calculate button to compute results for the selected location below.',
    matchingClearedBody:
      'Previous compatibility results were cleared when a partner’s birthplace changed. Verify both birthplaces and click the match button to recalculate.',
    customDraftLabel: 'Entered custom location',
  },
  hi: {
    birthplaceLabel: 'जन्म स्थान (गाँव, कस्बा या शहर)',
    locationLabel: 'स्थान (गाँव, कस्बा या शहर)',
    presetBadge: 'प्रमुख शहर',
    customBadge: 'कस्टम स्थान',
    editBtn: 'बदलें / संपादित करें',
    doneBtn: 'बंद करें',
    searchPlaceholder: '18 प्रमुख शहर खोजें या किसी गाँव / कस्बे का नाम लिखें...',
    presetGroupLabel: '18 प्रमुख शहर',
    noPresetMatch: 'आपकी खोज से कोई प्रमुख शहर मेल नहीं खाया।',
    notListedBtn: 'मेरा जन्म स्थान सूची में नहीं है',
    notListedLocationBtn: 'मेरा स्थान सूची में नहीं है',
    notListedSub: 'कोई भी गाँव, कस्बा, ज़िला, राज्य, देश, अक्षांश-देशांतर और IANA समय क्षेत्र दर्ज करें',
    backToPresetsBtn: '18 प्रमुख शहरों की सूची में लौटें',
    placeNameLabel: 'गाँव / कस्बा / शहर *',
    placeNamePlaceholder: 'जैसे: माजुली, तेजपुर, शिवसागर, सिडनी',
    districtLabel: 'ज़िला',
    districtPlaceholder: 'जैसे: माजुली, सोनितपुर',
    stateLabel: 'राज्य / प्रांत',
    statePlaceholder: 'जैसे: असम, उत्तर प्रदेश',
    countryLabel: 'देश',
    countryPlaceholder: 'जैसे: भारत, ऑस्ट्रेलिया',
    latitudeLabel: 'अक्षांश (Latitude) *',
    latitudePlaceholder: 'जैसे: 26.9500',
    longitudeLabel: 'देशांतर (Longitude) *',
    longitudePlaceholder: 'जैसे: 94.1667',
    timezoneLabel: 'समय क्षेत्र (IANA Timezone) *',
    timezoneSearchPlaceholder: 'समय क्षेत्र खोजें (जैसे: Kolkata, London, Sydney)...',
    north: 'उ (N)',
    south: 'द (S)',
    east: 'पू (E)',
    west: 'प (W)',
    resolvedOffsetPrefix: 'चुनी हुई तिथि व समय हेतु लागू समय अंतर',
    historicalLmtNote: '1906 से पूर्व के लिए देशांतर आधारित ऐतिहासिक स्थानीय माध्य समय (LMT) लागू किया गया है।',
    polarNote:
      'ध्रुवीय अक्षांश (>66.5°): क्षितिज लग्न गणना के लिए अक्षांश 66.5° पर सीमित रखा जाता है।',
    selectedSummaryTitle: 'चयनित जन्म स्थान',
    selectedLocationSummaryTitle: 'चयनित स्थान',
    coordinatesRequiredTitle: 'सटीक गणना हेतु अक्षांश-देशांतर आवश्यक हैं',
    coordinatesRequiredBody:
      'सटीक वैदिक लग्न, सूर्योदय-सूर्यास्त और स्थानीय समय की गणना के लिए मान्य अक्षांश (0°–90° N/S) और देशांतर (0°–180° E/W) आवश्यक हैं। ज्योतिषसेतु स्वतः गुवाहाटी या किसी अन्य शहर का उपयोग नहीं करेगा।',
    errPlaceName: 'कृपया गाँव, कस्बे या शहर का नाम दर्ज करें।',
    errLatMissing: 'सटीक लग्न एवं स्थानीय समय गणना के लिए अक्षांश आवश्यक है।',
    errLatInvalid: 'अक्षांश 0° से 90° (N या S) के बीच एक मान्य संख्या होनी चाहिए।',
    errLonMissing: 'सटीक लग्न एवं स्थानीय समय गणना के लिए देशांतर आवश्यक है।',
    errLonInvalid: 'देशांतर 0° से 180° (E या W) के बीच एक मान्य संख्या होनी चाहिए।',
    errTimezone: 'कृपया एक मान्य IANA समय क्षेत्र चुनें।',
    privacyNote: 'केवल आपके ब्राउज़र में स्थानीय गणना · कोई जन्म विवरण संग्रहीत या प्रेषित नहीं।',
    customIncompleteBadge: 'निर्देशांक आवश्यक',
    resultsClearedTitle: 'जन्म स्थान बदल गया है — नई गणना के लिए तैयार',
    resultsClearedBody:
      'जन्म स्थान बदलने पर पिछले परिणाम तुरंत हटा दिए गए हैं ताकि किसी पुराने शहर का डेटा न दिखे। नीचे चयनित स्थान के लिए नया परिणाम देखने हेतु गणना बटन दबाएँ।',
    matchingClearedBody:
      'किसी भी पक्ष का जन्म स्थान बदलने पर पिछला मिलान परिणाम हटा दिया गया है। दोनों पक्षों के मान्य स्थान सुनिश्चित कर पुनः मिलान बटन दबाएँ।',
    customDraftLabel: 'दर्ज कस्टम स्थान',
  },
  as: {
    birthplaceLabel: 'জন্মস্থান (গাঁও, নগৰ বা চহৰ)',
    locationLabel: 'স্থান (গাঁও, নগৰ বা চহৰ)',
    presetBadge: 'নিৰ্বাচিত চহৰ',
    customBadge: 'নিজস্ব স্থান',
    editBtn: 'সলনি / সম্পাদনা কৰক',
    doneBtn: 'বন্ধ কৰক',
    searchPlaceholder: '১৮খন চহৰ বিচাৰক বা যিকোনো গাঁও / নগৰৰ নাম লিখক...',
    presetGroupLabel: '১৮খন তালিকাভুক্ত চহৰ',
    noPresetMatch: 'আপোনাৰ সন্ধানৰ সৈতে কোনো তালিকাভুক্ত চহৰ নিমিলে।',
    notListedBtn: 'মোৰ জন্মস্থান তালিকাত নাই',
    notListedLocationBtn: 'মোৰ স্থান তালিকাত নাই',
    notListedSub: 'যিকোনো গাঁও, নগৰ, জিলা, ৰাজ্য, দেশ, অক্ষাংশ-দ্ৰাঘিমাংশ আৰু IANA সময় অঞ্চল দিয়ক',
    backToPresetsBtn: '১৮খন তালিকাভুক্ত চহৰলৈ ঘূৰি যাওক',
    placeNameLabel: 'গাঁও / নগৰ / চহৰ *',
    placeNamePlaceholder: 'যেনে: মাজুলী, তেজপুৰ, শিৱসাগৰ, ছিডনী',
    districtLabel: 'জিলা',
    districtPlaceholder: 'যেনে: মাজুলী, শোণিতপুৰ',
    stateLabel: 'ৰাজ্য / প্ৰদেশ',
    statePlaceholder: 'যেনে: অসম, পশ্চিমবংগ',
    countryLabel: 'দেশ',
    countryPlaceholder: 'যেনে: ভাৰত, অষ্ট্ৰেলিয়া',
    latitudeLabel: 'অক্ষাংশ (Latitude) *',
    latitudePlaceholder: 'যেনে: 26.9500',
    longitudeLabel: 'দ্ৰাঘিমাংশ (Longitude) *',
    longitudePlaceholder: 'যেনে: 94.1667',
    timezoneLabel: 'সময় অঞ্চল (IANA Timezone) *',
    timezoneSearchPlaceholder: 'সময় অঞ্চল বিচাৰক (যেনে: Kolkata, London, Sydney)...',
    north: 'উ (N)',
    south: 'দ (S)',
    east: 'পূ (E)',
    west: 'প (W)',
    resolvedOffsetPrefix: 'নিৰ্বাচিত তাৰিখ আৰু সময়ৰ বাবে প্ৰযোজ্য সময় অন্তৰ',
    historicalLmtNote: '১৯০৬ চনৰ পূৰ্বৰ বাবে দ্ৰাঘিমাংশ ভিত্তিক ঐতিহাসিক স্থানীয় মধ্য সময় (LMT) প্ৰয়োগ কৰা হৈছে।',
    polarNote:
      'মেৰু অক্ষাংশ (>66.5°): লগ্ন গণনাৰ ক্ষেত্ৰত অক্ষাংশ ৬৬.৫° ত সীমাবদ্ধ ৰখা হয়।',
    selectedSummaryTitle: 'নিৰ্বাচিত জন্মস্থান',
    selectedLocationSummaryTitle: 'নিৰ্বাচিত স্থান',
    coordinatesRequiredTitle: 'নিখুঁত গণনাৰ বাবে অক্ষাংশ-দ্ৰাঘিমাংশ আৱশ্যক',
    coordinatesRequiredBody:
      'সঠিক বৈদিক লগ্ন, সূৰ্যোদয়-সূৰ্যাস্ত আৰু স্থানীয় সময় গণনাৰ বাবে বৈধ অক্ষাংশ (0°–90° N/S) আৰু দ্ৰাঘিমাংশ (0°–180° E/W) আৱশ্যক। জ্যোতিষসেতুৱে স্বয়ংক্ৰিয়ভাৱে গুৱাহাটী বা আন কোনো চহৰ ব্যৱহাৰ নকৰে।',
    errPlaceName: 'অনুগ্ৰহ কৰি গাঁও, নগৰ বা চহৰৰ নাম লিখক।',
    errLatMissing: 'সঠিক লগ্ন আৰু স্থানীয় সময় গণনাৰ বাবে অক্ষাংশ আৱশ্যক।',
    errLatInvalid: 'অক্ষাংশ 0° ৰ পৰা 90° (N বা S) ৰ ভিতৰৰ এটা বৈধ সংখ্যা হ’ব লাগিব।',
    errLonMissing: 'সঠিক লগ্ন আৰু স্থানীয় সময় গণনাৰ বাবে দ্ৰাঘিমাংশ আৱশ্যক।',
    errLonInvalid: 'দ্ৰাঘিমাংশ 0° ৰ পৰা 180° (E বা W) ৰ ভিতৰৰ এটা বৈধ সংখ্যা হ’ব লাগিব।',
    errTimezone: 'অনুগ্ৰহ কৰি এটা বৈধ IANA সময় অঞ্চল বাছনি কৰক।',
    privacyNote: 'কেৱল আপোনাৰ ব্ৰাউজাৰতে স্থানীয়ভাৱে গণনা হয় · কোনো তথ্য সংৰক্ষণ বা প্ৰেৰণ নহয়।',
    customIncompleteBadge: 'স্থানাংক আৱশ্যক',
    resultsClearedTitle: 'জন্মস্থান সলনি কৰা হৈছে — নতুন গণনাৰ বাবে সাজু',
    resultsClearedBody:
      'জন্মস্থান সলনি কৰাৰ লগে লগে পূৰ্বৰ ফলাফল আঁতৰোৱা হৈছে যাতে পুৰণি চহৰৰ তথ্য প্ৰদৰ্শন নহয়। তলত নিৰ্বাচিত স্থানৰ বাবে নতুন ফলাফল চাবলৈ গণনা বুটামত ক্লিক কৰক।',
    matchingClearedBody:
      'কোনো এটা পক্ষৰ জন্মস্থান সলনি হোৱাৰ লগে লগে পূৰ্বৰ মিলন ফলাফল আঁতৰোৱা হৈছে। দুয়োপক্ষৰ বৈধ স্থান নিশ্চিত কৰি পুনৰ গণনা কৰক।',
    customDraftLabel: 'দিয়া নিজস্ব স্থান',
  },
} as const;
