import * as Astronomy from 'astronomy-engine';
import type { ZodiacId } from '../i18n/types';

export type PlanetId =
  | 'sun'
  | 'moon'
  | 'mars'
  | 'mercury'
  | 'jupiter'
  | 'venus'
  | 'saturn'
  | 'rahu'
  | 'ketu';

export type DignityId = 'exalted' | 'own' | 'debilitated' | 'friendly' | 'neutral';

export const ZODIAC_IDS: readonly ZodiacId[] = [
  'mesha',
  'vrishabha',
  'mithuna',
  'karka',
  'simha',
  'kanya',
  'tula',
  'vrishchika',
  'dhanu',
  'makara',
  'kumbha',
  'meena',
] as const;

export const RASHI_LORDS: readonly PlanetId[] = [
  'mars', // Mesha
  'venus', // Vrishabha
  'mercury', // Mithuna
  'moon', // Karka
  'sun', // Simha
  'mercury', // Kanya
  'venus', // Tula
  'mars', // Vrishchika
  'jupiter', // Dhanu
  'saturn', // Makara
  'saturn', // Kumbha
  'jupiter', // Meena
];

export const VIMSHOTTARI_ORDER: readonly { lord: PlanetId; years: number }[] = [
  { lord: 'ketu', years: 7 },
  { lord: 'venus', years: 20 },
  { lord: 'sun', years: 6 },
  { lord: 'moon', years: 10 },
  { lord: 'mars', years: 7 },
  { lord: 'rahu', years: 18 },
  { lord: 'jupiter', years: 16 },
  { lord: 'saturn', years: 19 },
  { lord: 'mercury', years: 17 },
];

export interface BirthInput {
  name: string;
  /** YYYY-MM-DD */
  dateStr: string;
  /** HH:MM (24h local time at birthplace) */
  timeStr: string;
  lat: number;
  lon: number;
  utcOffsetMinutes: number;
}

export interface PlanetPosition {
  id: PlanetId;
  siderealLon: number;
  rashiIndex: number; // 0..11
  rashiId: ZodiacId;
  degreeInSign: number; // 0..30
  nakshatraIndex: number; // 0..26
  pada: number; // 1..4
  house: number; // 1..12 (whole-sign from Lagna)
  navamshaRashiIndex: number; // 0..11
  retrograde: boolean;
  combust: boolean;
  dignity: DignityId;
}

export interface DashaPeriod {
  lord: PlanetId;
  startDate: Date;
  endDate: Date;
  years: number;
  isCurrent: boolean;
}

export interface KundliResult {
  birthUtc: Date;
  ayanamsha: number;
  ascendantLon: number;
  ascendantRashiIndex: number;
  ascendantRashiId: ZodiacId;
  ascendantDegree: number;
  ascendantNakshatraIndex: number;
  ascendantPada: number;
  navamshaLagnaIndex: number;
  moonRashiIndex: number;
  moonRashiId: ZodiacId;
  moonNakshatraIndex: number;
  moonPada: number;
  sunRashiIndex: number;
  sunRashiId: ZodiacId;
  planets: PlanetPosition[];
  mahadashas: DashaPeriod[];
  currentMahadasha: DashaPeriod | null;
  currentAntardashas: DashaPeriod[];
}

export interface ChoghadiyaSlot {
  type: 'amrit' | 'shubh' | 'labh' | 'char' | 'rog' | 'kaal' | 'udveg';
  nature: 'auspicious' | 'neutral' | 'caution';
  start: Date;
  end: Date;
  isDay: boolean;
}

export interface LivePanchangResult {
  dateLocal: Date;
  weekdayIndex: number; // 0 = Sunday .. 6 = Saturday
  ayanamsha: number;
  vikramSamvat: number;
  sunrise: Date | null;
  sunset: Date | null;
  tithiNumber: number; // 1..30 (1-15 Shukla, 16-30 Krishna)
  paksha: 'shukla' | 'krishna';
  tithiInPaksha: number; // 1..15
  tithiEndTime: Date | null;
  nakshatraIndex: number; // 0..26
  nakshatraPada: number; // 1..4
  nakshatraLord: PlanetId;
  nakshatraEndTime: Date | null;
  yogaIndex: number; // 0..26
  karanaId:
    | 'kimstughna'
    | 'bava'
    | 'balava'
    | 'kaulava'
    | 'taitila'
    | 'gara'
    | 'vanija'
    | 'vishti'
    | 'shakuni'
    | 'chatushpada'
    | 'naga';
  moonRashiIndex: number;
  moonRashiId: ZodiacId;
  sunRashiIndex: number;
  sunRashiId: ZodiacId;
  rahuKaal: { start: Date; end: Date } | null;
  yamaganda: { start: Date; end: Date } | null;
  gulikaKaal: { start: Date; end: Date } | null;
  abhijitMuhurat: { start: Date; end: Date } | null;
  brahmaMuhurat: { start: Date; end: Date } | null;
  vijayaMuhurat: { start: Date; end: Date } | null;
  godhuliMuhurat: { start: Date; end: Date } | null;
  dayChoghadiya: ChoghadiyaSlot[];
  nightChoghadiya: ChoghadiyaSlot[];
}

export interface KootaScore {
  key: 'varna' | 'vashya' | 'tara' | 'yoni' | 'grahaMaitri' | 'gana' | 'bhakoot' | 'nadi';
  score: number;
  max: number;
  detailKey?: string;
}

export interface AshtakootaResult {
  personA: KundliResult;
  personB: KundliResult;
  kootas: KootaScore[];
  totalScore: number;
  maxScore: 36;
  verdict: 'excellent' | 'good' | 'moderate' | 'caution';
  nadiDosha: boolean;
  nadiParihara: boolean;
  bhakootDosha: boolean;
  bhakootParihara: boolean;
  mangalA: MangalDoshaResult;
  mangalB: MangalDoshaResult;
  mangalCompatible: boolean;
}

export interface SadeSatiWindow {
  phase: 'rising' | 'peak' | 'setting';
  saturnRashiIndex: number;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
}

export interface SadeSatiResult {
  natalMoonRashiIndex: number;
  natalMoonRashiId: ZodiacId;
  natalNakshatraIndex: number;
  currentSaturnRashiIndex: number;
  currentSaturnRashiId: ZodiacId;
  currentSaturnDegree: number;
  houseFromMoon: number; // 1..12
  status: 'rising' | 'peak' | 'setting' | 'dhaiya_4' | 'dhaiya_8' | 'none';
  paya: 'gold' | 'silver' | 'copper' | 'iron';
  windows: SadeSatiWindow[];
}

export interface MangalDoshaResult {
  marsRashiIndex: number;
  marsRashiId: ZodiacId;
  marsDegree: number;
  fromLagnaHouse: number;
  fromMoonHouse: number;
  fromVenusHouse: number;
  fromLagnaDosha: boolean;
  fromMoonDosha: boolean;
  fromVenusDosha: boolean;
  cancellations: Array<
    | 'own_sign'
    | 'exalted'
    | 'jupiter_conjunction_or_aspect'
    | 'classical_sign_exception'
  >;
  severity: 'none' | 'cancelled' | 'partial' | 'present';
}

export interface NakshatraFinderResult {
  birthUtc: Date;
  ayanamsha: number;
  moonSiderealLon: number;
  moonRashiIndex: number;
  moonRashiId: ZodiacId;
  moonDegreeInSign: number;
  nakshatraIndex: number; // 0..26
  pada: number; // 1..4
  ruler: PlanetId;
  gana: 'deva' | 'manushya' | 'rakshasa';
  nadi: 'adi' | 'madhya' | 'antya';
  varna: 'brahmin' | 'kshatriya' | 'vaishya' | 'shudra';
  yoniIndex: number; // 0..13
  startingDashaLord: PlanetId;
  startingDashaRemainingYears: number;
}

export interface NumerologyResult {
  fullName: string;
  birthDateStr: string;
  mulank: number; // 1..9
  bhagyank: number; // 1..9
  namankCompound: number;
  namank: number; // 1..9
  mulankPlanet: PlanetId;
  bhagyankPlanet: PlanetId;
  namankPlanet: PlanetId;
  friendlyNumbers: number[];
  neutralNumbers: number[];
  challengingNumbers: number[];
}

export interface TransitSnapshot {
  date: Date;
  ayanamsha: number;
  planets: Array<{
    id: PlanetId;
    rashiIndex: number;
    rashiId: ZodiacId;
    degreeInSign: number;
    retrograde: boolean;
    houseFromSelected: number;
  }>;
  weekMoonSigns: ZodiacId[];
  monthSunSigns: ZodiacId[];
}

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

export function norm360(deg: number): number {
  const m = deg % 360;
  return m < 0 ? m + 360 : m;
}

export function formatDMS(degInSign: number): string {
  const totalMin = Math.round(degInSign * 60);
  const d = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}′`;
}

/**
 * Converts local birth date + time + UTC offset (minutes) into an exact UTC Date.
 */
export function buildUtcDate(dateStr: string, timeStr: string, utcOffsetMinutes: number): Date {
  const [yStr, mStr, dStr] = dateStr.split('-');
  const [hhStr, mmStr] = (timeStr || '12:00').split(':');
  const year = Number(yStr) || 2000;
  const month = (Number(mStr) || 1) - 1;
  const day = Number(dStr) || 1;
  const hour = Number(hhStr) || 0;
  const minute = Number(mmStr) || 0;
  const localAsUtcMs = Date.UTC(year, month, day, hour, minute, 0, 0);
  return new Date(localAsUtcMs - utcOffsetMinutes * 60_000);
}

/**
 * Julian centuries since J2000.0 (2000-01-01 12:00:00 TT/UTC).
 */
export function julianCenturiesJ2000(date: Date): number {
  const j2000Ms = Date.UTC(2000, 0, 1, 12, 0, 0, 0);
  const days = (date.getTime() - j2000Ms) / 86_400_000;
  return days / 36525;
}

/**
 * Lahiri (Chitrapaksha) Ayanamsha in degrees.
 * Aligned to Indian Government Rashtriya Panchang / Swiss Ephemeris SE_SIDM_LAHIRI:
 * 23° 51' 25.5324" at J2000.0 + IAU general precession in longitude.
 */
export function getLahiriAyanamsha(date: Date): number {
  const T = julianCenturiesJ2000(date);
  const baseJ2000 = 23 + 51 / 60 + 25.5324 / 3600; // 23.85709233°
  const precessionArcsec = 5028.796195 * T + 1.1054348 * T * T;
  return baseJ2000 + precessionArcsec / 3600;
}

/**
 * True ecliptic longitude of date (tropical) for Sun, Moon, Mercury..Saturn via astronomy-engine.
 */
export function getTropicalLongitude(body: Astronomy.Body, date: Date): number {
  const time = Astronomy.MakeTime(date);
  if (body === Astronomy.Body.Sun) {
    return norm360(Astronomy.SunPosition(time).elon);
  }
  const vec = Astronomy.GeoVector(body, time, true);
  return norm360(Astronomy.Ecliptic(vec).elon);
}

/**
 * Mean ascending lunar node (Rahu) tropical longitude via Meeus Ch. 47.
 */
export function getMeanRahuTropicalLongitude(date: Date): number {
  const T = julianCenturiesJ2000(date);
  const omega =
    125.0445479 -
    1934.1362891 * T +
    0.0020754 * T * T +
    (T * T * T) / 467441 -
    (T * T * T * T) / 60616000;
  return norm360(omega);
}

export function getSiderealLongitude(planet: PlanetId, date: Date): number {
  const ayanamsha = getLahiriAyanamsha(date);
  if (planet === 'rahu') {
    return norm360(getMeanRahuTropicalLongitude(date) - ayanamsha);
  }
  if (planet === 'ketu') {
    return norm360(getMeanRahuTropicalLongitude(date) + 180 - ayanamsha);
  }
  const bodyMap: Record<Exclude<PlanetId, 'rahu' | 'ketu'>, Astronomy.Body> = {
    sun: Astronomy.Body.Sun,
    moon: Astronomy.Body.Moon,
    mars: Astronomy.Body.Mars,
    mercury: Astronomy.Body.Mercury,
    jupiter: Astronomy.Body.Jupiter,
    venus: Astronomy.Body.Venus,
    saturn: Astronomy.Body.Saturn,
  };
  const trop = getTropicalLongitude(bodyMap[planet], date);
  return norm360(trop - ayanamsha);
}

/**
 * Sidereal Ascendant (Lagna) longitude in degrees using GMST + local longitude + true obliquity.
 */
export function getSiderealAscendant(date: Date, lat: number, lon: number): number {
  const time = Astronomy.MakeTime(date);
  const gmstHours = Astronomy.SiderealTime(time);
  const lstDeg = norm360(gmstHours * 15 + lon);
  const T = julianCenturiesJ2000(date);
  const epsDeg = 23.4392911 - 0.0130042 * T;

  const lst = lstDeg * DEG2RAD;
  const eps = epsDeg * DEG2RAD;
  const phi = lat * DEG2RAD;

  const y = Math.cos(lst);
  const x = -(Math.sin(lst) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps));
  const tropicalAsc = norm360(Math.atan2(y, x) * RAD2DEG);
  const ayanamsha = getLahiriAyanamsha(date);
  return norm360(tropicalAsc - ayanamsha);
}

/**
 * Classical Parashari Navamsha (D-9) Rashi index (0..11) from sidereal longitude.
 */
export function getNavamshaRashiIndex(siderealLon: number): number {
  const sign = Math.floor(norm360(siderealLon) / 30);
  const degInSign = norm360(siderealLon) % 30;
  const navPart = Math.min(8, Math.floor(degInSign / (30 / 9)));
  // Fire(0,4,8)->0, Earth(1,5,9)->9, Air(2,6,10)->6, Water(3,7,11)->3
  const startByElement = [0, 9, 6, 3];
  const startSign = startByElement[sign % 4];
  return (startSign + navPart) % 12;
}

export function getNakshatraAndPada(siderealLon: number): {
  nakshatraIndex: number;
  pada: number;
} {
  const lon = norm360(siderealLon);
  const span = 360 / 27; // 13.333333°
  const nakshatraIndex = Math.min(26, Math.floor(lon / span));
  const within = lon - nakshatraIndex * span;
  const pada = Math.min(4, Math.floor(within / (span / 4)) + 1);
  return { nakshatraIndex, pada };
}

const EXALTATION_SIGN: Partial<Record<PlanetId, number>> = {
  sun: 0, // Mesha
  moon: 1, // Vrishabha
  mars: 9, // Makara
  mercury: 5, // Kanya
  jupiter: 3, // Karka
  venus: 11, // Meena
  saturn: 6, // Tula
  rahu: 1, // Vrishabha (traditional Parashari view)
  ketu: 7, // Vrishchika
};

const DEBILITATION_SIGN: Partial<Record<PlanetId, number>> = {
  sun: 6,
  moon: 7,
  mars: 3,
  mercury: 11,
  jupiter: 9,
  venus: 5,
  saturn: 0,
  rahu: 7,
  ketu: 1,
};

const OWN_SIGNS: Record<PlanetId, number[]> = {
  sun: [4],
  moon: [3],
  mars: [0, 7],
  mercury: [2, 5],
  jupiter: [8, 11],
  venus: [1, 6],
  saturn: [9, 10],
  rahu: [10],
  ketu: [7],
};

const NATURAL_FRIENDS: Record<PlanetId, PlanetId[]> = {
  sun: ['moon', 'mars', 'jupiter'],
  moon: ['sun', 'mercury'],
  mars: ['sun', 'moon', 'jupiter'],
  mercury: ['sun', 'venus'],
  jupiter: ['sun', 'moon', 'mars'],
  venus: ['mercury', 'saturn'],
  saturn: ['mercury', 'venus'],
  rahu: ['venus', 'saturn', 'mercury'],
  ketu: ['mars', 'jupiter', 'sun'],
};

function getPlanetaryDignity(planet: PlanetId, rashiIndex: number): DignityId {
  if (EXALTATION_SIGN[planet] === rashiIndex) return 'exalted';
  if (DEBILITATION_SIGN[planet] === rashiIndex) return 'debilitated';
  if (OWN_SIGNS[planet].includes(rashiIndex)) return 'own';
  const signLord = RASHI_LORDS[rashiIndex];
  if (NATURAL_FRIENDS[planet].includes(signLord)) return 'friendly';
  return 'neutral';
}

function angularSeparation(lonA: number, lonB: number): number {
  const diff = Math.abs(norm360(lonA) - norm360(lonB));
  return diff > 180 ? 360 - diff : diff;
}

function isPlanetRetrograde(planet: PlanetId, date: Date): boolean {
  if (planet === 'sun' || planet === 'moon') return false;
  if (planet === 'rahu' || planet === 'ketu') return true; // Mean nodes are always retrograde
  const deltaMs = 6 * 3600_000;
  const lonBefore = getSiderealLongitude(planet, new Date(date.getTime() - deltaMs));
  const lonAfter = getSiderealLongitude(planet, new Date(date.getTime() + deltaMs));
  let diff = lonAfter - lonBefore;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

function isPlanetCombust(
  planet: PlanetId,
  planetLon: number,
  sunLon: number,
  retrograde: boolean,
): boolean {
  if (planet === 'sun' || planet === 'rahu' || planet === 'ketu') return false;
  const orb: Record<Exclude<PlanetId, 'sun' | 'rahu' | 'ketu'>, number> = {
    moon: 12,
    mars: 17,
    mercury: retrograde ? 12 : 14,
    jupiter: 11,
    venus: retrograde ? 8 : 10,
    saturn: 15,
  };
  return angularSeparation(planetLon, sunLon) <= orb[planet];
}

const TROPICAL_YEAR_MS = 365.2425 * 86_400_000;

export function computeVimshottariDasha(
  birthUtc: Date,
  moonSiderealLon: number,
  referenceDate: Date = new Date(),
): {
  mahadashas: DashaPeriod[];
  currentMahadasha: DashaPeriod | null;
  currentAntardashas: DashaPeriod[];
} {
  const span = 360 / 27;
  const nakIdx = Math.min(26, Math.floor(norm360(moonSiderealLon) / span));
  const elapsedFraction = (norm360(moonSiderealLon) - nakIdx * span) / span;
  const remainingFraction = Math.max(0, 1 - elapsedFraction);

  const startLordIdx = nakIdx % 9;
  const mahadashas: DashaPeriod[] = [];
  let cursorMs = birthUtc.getTime();
  const refMs = referenceDate.getTime();

  for (let i = 0; i < 9; i++) {
    const entry = VIMSHOTTARI_ORDER[(startLordIdx + i) % 9];
    const years = i === 0 ? entry.years * remainingFraction : entry.years;
    const endMs = cursorMs + years * TROPICAL_YEAR_MS;
    const isCurrent = refMs >= cursorMs && refMs < endMs;
    mahadashas.push({
      lord: entry.lord,
      startDate: new Date(cursorMs),
      endDate: new Date(endMs),
      years,
      isCurrent,
    });
    cursorMs = endMs;
  }

  const currentMahadasha = mahadashas.find((d) => d.isCurrent) ?? mahadashas[0] ?? null;
  const currentAntardashas: DashaPeriod[] = [];

  if (currentMahadasha) {
    // Antardashas start from the Mahadasha lord itself over its full nominal period
    const mdIdx = VIMSHOTTARI_ORDER.findIndex((e) => e.lord === currentMahadasha.lord);
    const fullMdYears = VIMSHOTTARI_ORDER[mdIdx].years;
    // Anchor full Mahadasha start back from endDate so partial first Mahadasha aligns accurately
    let adCursorMs = currentMahadasha.endDate.getTime() - fullMdYears * TROPICAL_YEAR_MS;

    for (let j = 0; j < 9; j++) {
      const sub = VIMSHOTTARI_ORDER[(mdIdx + j) % 9];
      const subYears = (fullMdYears * sub.years) / 120;
      const adEndMs = adCursorMs + subYears * TROPICAL_YEAR_MS;
      if (adEndMs > birthUtc.getTime()) {
        const clampedStart = Math.max(adCursorMs, birthUtc.getTime());
        currentAntardashas.push({
          lord: sub.lord,
          startDate: new Date(clampedStart),
          endDate: new Date(adEndMs),
          years: subYears,
          isCurrent: refMs >= clampedStart && refMs < adEndMs,
        });
      }
      adCursorMs = adEndMs;
    }
  }

  return { mahadashas, currentMahadasha, currentAntardashas };
}

/**
 * Computes a complete genuine Vedic Kundli (Lahiri Ayanamsha, D-1, D-9, Navagraha, Vimshottari Dasha).
 */
export function computeKundli(input: BirthInput, referenceDate: Date = new Date()): KundliResult {
  const birthUtc = buildUtcDate(input.dateStr, input.timeStr, input.utcOffsetMinutes);
  const ayanamsha = getLahiriAyanamsha(birthUtc);
  const ascendantLon = getSiderealAscendant(birthUtc, input.lat, input.lon);
  const ascendantRashiIndex = Math.floor(ascendantLon / 30);
  const ascendantDegree = ascendantLon % 30;
  const ascNak = getNakshatraAndPada(ascendantLon);
  const navamshaLagnaIndex = getNavamshaRashiIndex(ascendantLon);

  const planetOrder: PlanetId[] = [
    'sun',
    'moon',
    'mars',
    'mercury',
    'jupiter',
    'venus',
    'saturn',
    'rahu',
    'ketu',
  ];

  const sunLon = getSiderealLongitude('sun', birthUtc);
  const planets: PlanetPosition[] = planetOrder.map((id) => {
    const siderealLon = id === 'sun' ? sunLon : getSiderealLongitude(id, birthUtc);
    const rashiIndex = Math.floor(siderealLon / 30);
    const degreeInSign = siderealLon % 30;
    const { nakshatraIndex, pada } = getNakshatraAndPada(siderealLon);
    const house = ((rashiIndex - ascendantRashiIndex + 12) % 12) + 1;
    const navamshaRashiIndex = getNavamshaRashiIndex(siderealLon);
    const retrograde = isPlanetRetrograde(id, birthUtc);
    const combust = isPlanetCombust(id, siderealLon, sunLon, retrograde);
    const dignity = getPlanetaryDignity(id, rashiIndex);

    return {
      id,
      siderealLon,
      rashiIndex,
      rashiId: ZODIAC_IDS[rashiIndex],
      degreeInSign,
      nakshatraIndex,
      pada,
      house,
      navamshaRashiIndex,
      retrograde,
      combust,
      dignity,
    };
  });

  const moon = planets.find((p) => p.id === 'moon')!;
  const sun = planets.find((p) => p.id === 'sun')!;
  const { mahadashas, currentMahadasha, currentAntardashas } = computeVimshottariDasha(
    birthUtc,
    moon.siderealLon,
    referenceDate,
  );

  return {
    birthUtc,
    ayanamsha,
    ascendantLon,
    ascendantRashiIndex,
    ascendantRashiId: ZODIAC_IDS[ascendantRashiIndex],
    ascendantDegree,
    ascendantNakshatraIndex: ascNak.nakshatraIndex,
    ascendantPada: ascNak.pada,
    navamshaLagnaIndex,
    moonRashiIndex: moon.rashiIndex,
    moonRashiId: moon.rashiId,
    moonNakshatraIndex: moon.nakshatraIndex,
    moonPada: moon.pada,
    sunRashiIndex: sun.rashiIndex,
    sunRashiId: sun.rashiId,
    planets,
    mahadashas,
    currentMahadasha,
    currentAntardashas,
  };
}

// ============================================================================
// LIVE PANCHANG & MUHURAT ENGINE
// ============================================================================

const KARANA_ROTATION: readonly LivePanchangResult['karanaId'][] = [
  'bava',
  'balava',
  'kaulava',
  'taitila',
  'gara',
  'vanija',
  'vishti',
];

function getKaranaFromHalfTithi(halfTithiIndex: number): LivePanchangResult['karanaId'] {
  // 0..59 across lunar month
  if (halfTithiIndex === 0) return 'kimstughna';
  if (halfTithiIndex === 57) return 'shakuni';
  if (halfTithiIndex === 58) return 'chatushpada';
  if (halfTithiIndex === 59) return 'naga';
  return KARANA_ROTATION[(halfTithiIndex - 1) % 7];
}

/**
 * Binary search within [startMs, startMs + 36h] for when an integer index function changes.
 */
function findTransitionTime(startMs: number, evalIndex: (ms: number) => number): Date | null {
  const initial = evalIndex(startMs);
  const stepMs = 30 * 60_000; // 30-min coarse scan
  let lo = startMs;
  let hi = startMs;
  let found = false;

  for (let i = 1; i <= 72; i++) {
    const t = startMs + i * stepMs;
    if (evalIndex(t) !== initial) {
      lo = t - stepMs;
      hi = t;
      found = true;
      break;
    }
  }
  if (!found) return null;

  for (let iter = 0; iter < 12; iter++) {
    const mid = Math.floor((lo + hi) / 2);
    if (evalIndex(mid) === initial) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return new Date(hi);
}

// Classical 8-part daytime segment index (0..7) by weekday (0=Sun..6=Sat)
const RAHU_KAAL_SLOT = [7, 1, 6, 4, 5, 3, 2];
const YAMAGANDA_SLOT = [4, 3, 2, 1, 0, 6, 5];
const GULIKA_SLOT = [6, 5, 4, 3, 2, 1, 0];

const CHOGHADIYA_CYCLE: readonly ChoghadiyaSlot['type'][] = [
  'udveg',
  'char',
  'labh',
  'amrit',
  'kaal',
  'shubh',
  'rog',
];

const DAY_CHOGHADIYA_START = [0, 3, 6, 2, 5, 1, 4]; // Sun=Udveg, Mon=Amrit, Tue=Rog, Wed=Labh, Thu=Shubh, Fri=Char, Sat=Kaal
const NIGHT_CHOGHADIYA_START = [5, 1, 4, 0, 3, 6, 2]; // Sun=Shubh, Mon=Char, Tue=Kaal, Wed=Udveg, Thu=Amrit, Fri=Rog, Sat=Labh

function getChoghadiyaNature(type: ChoghadiyaSlot['type']): ChoghadiyaSlot['nature'] {
  if (type === 'amrit' || type === 'shubh' || type === 'labh') return 'auspicious';
  if (type === 'char') return 'neutral';
  return 'caution';
}

/**
 * Computes genuine astronomical Hindu Panchang & Muhurat windows for any calendar date and city.
 */
export function computeLivePanchang(
  year: number,
  month1Based: number,
  day: number,
  lat: number,
  lon: number,
  utcOffsetMinutes: number,
): LivePanchangResult {
  const localMidnightUtcMs = Date.UTC(year, month1Based - 1, day, 0, 0, 0, 0) - utcOffsetMinutes * 60_000;
  const dateLocal = new Date(year, month1Based - 1, day, 12, 0, 0, 0);
  const weekdayIndex = dateLocal.getDay();

  const observer = new Astronomy.Observer(lat, lon, 0);
  const startSearchTime = Astronomy.MakeTime(new Date(localMidnightUtcMs));
  const riseResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, startSearchTime, 1.5);
  const setResult = Astronomy.SearchRiseSet(
    Astronomy.Body.Sun,
    observer,
    -1,
    riseResult ?? startSearchTime,
    1.5,
  );
  const nextRiseResult = Astronomy.SearchRiseSet(
    Astronomy.Body.Sun,
    observer,
    +1,
    setResult ?? Astronomy.MakeTime(new Date(localMidnightUtcMs + 86_400_000)),
    1.5,
  );

  const sunrise = riseResult ? riseResult.date : null;
  const sunset = setResult ? setResult.date : null;
  const nextSunrise = nextRiseResult ? nextRiseResult.date : null;

  // Classical Vedic Udayatithi reference moment = local Sunrise (fallback local noon)
  const refDate = sunrise ?? new Date(localMidnightUtcMs + 12 * 3600_000);
  const ayanamsha = getLahiriAyanamsha(refDate);

  const getTithiIdx = (ms: number) => {
    const d = new Date(ms);
    const sunL = getSiderealLongitude('sun', d);
    const moonL = getSiderealLongitude('moon', d);
    return Math.floor(norm360(moonL - sunL) / 12); // 0..29
  };

  const getNakIdx = (ms: number) => {
    const moonL = getSiderealLongitude('moon', new Date(ms));
    return Math.min(26, Math.floor(moonL / (360 / 27)));
  };

  const sunSid = getSiderealLongitude('sun', refDate);
  const moonSid = getSiderealLongitude('moon', refDate);
  const elongation = norm360(moonSid - sunSid);

  const tithiZero = Math.floor(elongation / 12); // 0..29
  const tithiNumber = tithiZero + 1; // 1..30
  const paksha: 'shukla' | 'krishna' = tithiNumber <= 15 ? 'shukla' : 'krishna';
  const tithiInPaksha = tithiNumber <= 15 ? tithiNumber : tithiNumber - 15;

  const { nakshatraIndex, pada: nakshatraPada } = getNakshatraAndPada(moonSid);
  const nakshatraLord = VIMSHOTTARI_ORDER[nakshatraIndex % 9].lord;
  const yogaIndex = Math.min(26, Math.floor(norm360(sunSid + moonSid) / (360 / 27)));
  const halfTithi = Math.min(59, Math.floor(elongation / 6));
  const karanaId = getKaranaFromHalfTithi(halfTithi);

  const moonRashiIndex = Math.floor(moonSid / 30);
  const sunRashiIndex = Math.floor(sunSid / 30);

  const tithiEndTime = findTransitionTime(refDate.getTime(), getTithiIdx);
  const nakshatraEndTime = findTransitionTime(refDate.getTime(), getNakIdx);

  // Vikram Samvat starts around Chaitra Shukla Pratipada (March/April)
  const vikramSamvat = month1Based >= 4 ? year + 57 : year + 56;

  let rahuKaal: { start: Date; end: Date } | null = null;
  let yamaganda: { start: Date; end: Date } | null = null;
  let gulikaKaal: { start: Date; end: Date } | null = null;
  let abhijitMuhurat: { start: Date; end: Date } | null = null;
  let brahmaMuhurat: { start: Date; end: Date } | null = null;
  let vijayaMuhurat: { start: Date; end: Date } | null = null;
  let godhuliMuhurat: { start: Date; end: Date } | null = null;
  const dayChoghadiya: ChoghadiyaSlot[] = [];
  const nightChoghadiya: ChoghadiyaSlot[] = [];

  if (sunrise && sunset) {
    const dayMs = sunset.getTime() - sunrise.getTime();
    const eighth = dayMs / 8;

    const makeSlot = (slotIdx: number) => ({
      start: new Date(sunrise.getTime() + slotIdx * eighth),
      end: new Date(sunrise.getTime() + (slotIdx + 1) * eighth),
    });

    rahuKaal = makeSlot(RAHU_KAAL_SLOT[weekdayIndex]);
    yamaganda = makeSlot(YAMAGANDA_SLOT[weekdayIndex]);
    gulikaKaal = makeSlot(GULIKA_SLOT[weekdayIndex]);

    const muhurtaMs = dayMs / 15; // 15 daytime Muhurtas
    const solarNoonMs = sunrise.getTime() + dayMs / 2;
    abhijitMuhurat = {
      start: new Date(solarNoonMs - muhurtaMs / 2),
      end: new Date(solarNoonMs + muhurtaMs / 2),
    };
    vijayaMuhurat = {
      start: new Date(sunrise.getTime() + 10 * muhurtaMs),
      end: new Date(sunrise.getTime() + 11 * muhurtaMs),
    };
    brahmaMuhurat = {
      start: new Date(sunrise.getTime() - 96 * 60_000),
      end: new Date(sunrise.getTime() - 48 * 60_000),
    };
    godhuliMuhurat = {
      start: new Date(sunset.getTime() - 12 * 60_000),
      end: new Date(sunset.getTime() + 12 * 60_000),
    };

    const dayStartIdx = DAY_CHOGHADIYA_START[weekdayIndex];
    for (let i = 0; i < 8; i++) {
      const type = CHOGHADIYA_CYCLE[(dayStartIdx + i) % 7];
      dayChoghadiya.push({
        type,
        nature: getChoghadiyaNature(type),
        start: new Date(sunrise.getTime() + i * eighth),
        end: new Date(sunrise.getTime() + (i + 1) * eighth),
        isDay: true,
      });
    }

    if (nextSunrise && nextSunrise.getTime() > sunset.getTime()) {
      const nightEighth = (nextSunrise.getTime() - sunset.getTime()) / 8;
      const nightStartIdx = NIGHT_CHOGHADIYA_START[weekdayIndex];
      for (let i = 0; i < 8; i++) {
        const type = CHOGHADIYA_CYCLE[(nightStartIdx + i) % 7];
        nightChoghadiya.push({
          type,
          nature: getChoghadiyaNature(type),
          start: new Date(sunset.getTime() + i * nightEighth),
          end: new Date(sunset.getTime() + (i + 1) * nightEighth),
          isDay: false,
        });
      }
    }
  }

  return {
    dateLocal,
    weekdayIndex,
    ayanamsha,
    vikramSamvat,
    sunrise,
    sunset,
    tithiNumber,
    paksha,
    tithiInPaksha,
    tithiEndTime,
    nakshatraIndex,
    nakshatraPada,
    nakshatraLord,
    nakshatraEndTime,
    yogaIndex,
    karanaId,
    moonRashiIndex,
    moonRashiId: ZODIAC_IDS[moonRashiIndex],
    sunRashiIndex,
    sunRashiId: ZODIAC_IDS[sunRashiIndex],
    rahuKaal,
    yamaganda,
    gulikaKaal,
    abhijitMuhurat,
    brahmaMuhurat,
    vijayaMuhurat,
    godhuliMuhurat,
    dayChoghadiya,
    nightChoghadiya,
  };
}

// ============================================================================
// NAKSHATRA ATTRIBUTES & ASHTAKOOTA 36-GUNA MILAN
// ============================================================================

// Classical Gana per Nakshatra (0..26)
export const NAKSHATRA_GANA: readonly ('deva' | 'manushya' | 'rakshasa')[] = [
  'deva', // 0 Ashwini
  'manushya', // 1 Bharani
  'rakshasa', // 2 Krittika
  'manushya', // 3 Rohini
  'deva', // 4 Mrigashirsha
  'manushya', // 5 Ardra
  'deva', // 6 Punarvasu
  'deva', // 7 Pushya
  'rakshasa', // 8 Ashlesha
  'rakshasa', // 9 Magha
  'manushya', // 10 Purva Phalguni
  'manushya', // 11 Uttara Phalguni
  'deva', // 12 Hasta
  'rakshasa', // 13 Chitra
  'deva', // 14 Swati
  'rakshasa', // 15 Vishakha
  'deva', // 16 Anuradha
  'rakshasa', // 17 Jyeshtha
  'rakshasa', // 18 Mula
  'manushya', // 19 Purva Ashadha
  'manushya', // 20 Uttara Ashadha
  'deva', // 21 Shravana
  'rakshasa', // 22 Dhanishta
  'rakshasa', // 23 Shatabhisha
  'manushya', // 24 Purva Bhadrapada
  'manushya', // 25 Uttara Bhadrapada
  'deva', // 26 Revati
];

// Classical Nadi per Nakshatra (0..26)
export const NAKSHATRA_NADI: readonly ('adi' | 'madhya' | 'antya')[] = [
  'adi', 'madhya', 'antya',
  'antya', 'madhya', 'adi',
  'adi', 'madhya', 'antya',
  'antya', 'madhya', 'adi',
  'adi', 'madhya', 'antya',
  'antya', 'madhya', 'adi',
  'adi', 'madhya', 'antya',
  'antya', 'madhya', 'adi',
  'adi', 'madhya', 'antya',
];

// 14 Classical Yoni animals (0..13):
// 0 Horse, 1 Elephant, 2 Sheep, 3 Serpent, 4 Dog, 5 Cat, 6 Rat,
// 7 Cow, 8 Buffalo, 9 Tiger, 10 Deer, 11 Monkey, 12 Mongoose, 13 Lion
export const NAKSHATRA_YONI: readonly number[] = [
  0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1,
];

// Authentic 14x14 Yoni Maitri compatibility matrix (0..4)
const YONI_MATRIX: readonly (readonly number[])[] = [
  [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 3, 3, 2, 1], // 0 Horse
  [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0], // 1 Elephant
  [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1], // 2 Sheep
  [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2], // 3 Serpent
  [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1], // 4 Dog
  [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1], // 5 Cat
  [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2], // 6 Rat
  [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1], // 7 Cow
  [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1], // 8 Buffalo
  [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1], // 9 Tiger
  [3, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1], // 10 Deer
  [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2], // 11 Monkey
  [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2], // 12 Mongoose
  [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4], // 13 Lion
];

// Classical Rashi Varna: Water(3,7,11)=Brahmin(3), Fire(0,4,8)=Kshatriya(2), Earth(1,5,9)=Vaishya(1), Air(2,6,10)=Shudra(0)
function getRashiVarnaRank(rashiIdx: number): number {
  const mod = rashiIdx % 4;
  if (mod === 3) return 3; // Brahmin
  if (mod === 0) return 2; // Kshatriya
  if (mod === 1) return 1; // Vaishya
  return 0; // Shudra
}

export function getRashiVarnaName(rashiIdx: number): 'brahmin' | 'kshatriya' | 'vaishya' | 'shudra' {
  const rank = getRashiVarnaRank(rashiIdx);
  if (rank === 3) return 'brahmin';
  if (rank === 2) return 'kshatriya';
  if (rank === 1) return 'vaishya';
  return 'shudra';
}

// Vashya groups: 0=Chatushpada, 1=Manava, 2=Jalachara, 3=Vanachara, 4=Keeta
function getVashyaGroup(rashiIdx: number, degInSign: number): number {
  if (rashiIdx === 0 || rashiIdx === 1) return 0; // Aries, Taurus
  if (rashiIdx === 2 || rashiIdx === 5 || rashiIdx === 6 || rashiIdx === 10) return 1; // Gemini, Virgo, Libra, Aquarius
  if (rashiIdx === 3 || rashiIdx === 11) return 2; // Cancer, Pisces
  if (rashiIdx === 4) return 3; // Leo
  if (rashiIdx === 7) return 4; // Scorpio
  if (rashiIdx === 8) return degInSign < 15 ? 1 : 0; // Sagittarius 1st half Manava, 2nd half Chatushpada
  return degInSign < 15 ? 0 : 2; // Capricorn 1st half Chatushpada, 2nd half Jalachara
}

const VASHYA_MATRIX: readonly (readonly number[])[] = [
  [2, 1, 1, 0.5, 1], // Chatushpada
  [1, 2, 0.5, 0, 1], // Manava
  [1, 0.5, 2, 1, 1], // Jalachara
  [0.5, 0, 1, 2, 0], // Vanachara
  [1, 1, 1, 0, 2], // Keeta
];

// Natural planetary relationship: 1 = Friend, 0 = Neutral, -1 = Enemy
const PLANET_RELATION: Record<
  Exclude<PlanetId, 'rahu' | 'ketu'>,
  Record<Exclude<PlanetId, 'rahu' | 'ketu'>, number>
> = {
  sun: { sun: 1, moon: 1, mars: 1, mercury: 0, jupiter: 1, venus: -1, saturn: -1 },
  moon: { sun: 1, moon: 1, mars: 0, mercury: 1, jupiter: 0, venus: 0, saturn: 0 },
  mars: { sun: 1, moon: 1, mars: 1, mercury: -1, jupiter: 1, venus: 0, saturn: 0 },
  mercury: { sun: 1, moon: -1, mars: 0, mercury: 1, jupiter: 0, venus: 1, saturn: 0 },
  jupiter: { sun: 1, moon: 1, mars: 1, mercury: -1, jupiter: 1, venus: -1, saturn: 0 },
  venus: { sun: -1, moon: -1, mars: 0, mercury: 1, jupiter: 0, venus: 1, saturn: 1 },
  saturn: { sun: -1, moon: -1, mars: -1, mercury: 1, jupiter: 0, venus: 1, saturn: 1 },
};

function getGrahaMaitriScore(rashiA: number, rashiB: number): number {
  const lordA = RASHI_LORDS[rashiA] as Exclude<PlanetId, 'rahu' | 'ketu'>;
  const lordB = RASHI_LORDS[rashiB] as Exclude<PlanetId, 'rahu' | 'ketu'>;
  if (lordA === lordB) return 5;
  const ab = PLANET_RELATION[lordA][lordB];
  const ba = PLANET_RELATION[lordB][lordA];
  if (ab === 1 && ba === 1) return 5;
  if ((ab === 1 && ba === 0) || (ab === 0 && ba === 1)) return 4;
  if (ab === 0 && ba === 0) return 3;
  if ((ab === 1 && ba === -1) || (ab === -1 && ba === 1)) return 1;
  if ((ab === 0 && ba === -1) || (ab === -1 && ba === 0)) return 0.5;
  return 0;
}

function getTaraScore(nakA: number, nakB: number): number {
  const goodTara = (from: number, to: number) => {
    const dist = ((to - from + 27) % 27) + 1;
    const rem = dist % 9;
    // Auspicious Taras: 1, 2, 4, 6, 8, 9 (rem 0) -> unfavorable: 3 (Vipat), 5 (Pratyak), 7 (Naidhana)
    return rem !== 3 && rem !== 5 && rem !== 7;
  };
  const ab = goodTara(nakA, nakB);
  const ba = goodTara(nakB, nakA);
  if (ab && ba) return 3;
  if (ab || ba) return 1.5;
  return 0;
}

function getGanaScore(ganaA: 'deva' | 'manushya' | 'rakshasa', ganaB: 'deva' | 'manushya' | 'rakshasa'): number {
  if (ganaA === ganaB) return 6;
  if ((ganaA === 'deva' && ganaB === 'manushya') || (ganaA === 'manushya' && ganaB === 'deva')) return 6;
  if (ganaA === 'rakshasa' && ganaB === 'deva') return 1;
  if (ganaA === 'deva' && ganaB === 'rakshasa') return 0;
  return 0; // Manushya + Rakshasa
}

/**
 * Authentic 36-point Ashtakoota Guna Milan + Parihara + Mangal Dosha comparison.
 */
export function computeAshtakoota(inputA: BirthInput, inputB: BirthInput): AshtakootaResult {
  const personA = computeKundli(inputA);
  const personB = computeKundli(inputB);

  const moonA = personA.planets.find((p) => p.id === 'moon')!;
  const moonB = personB.planets.find((p) => p.id === 'moon')!;

  // 1. Varna (max 1)
  const varnaA = getRashiVarnaRank(moonA.rashiIndex);
  const varnaB = getRashiVarnaRank(moonB.rashiIndex);
  const varnaScore = varnaA === varnaB ? 1 : Math.abs(varnaA - varnaB) === 1 ? 1 : 0;

  // 2. Vashya (max 2)
  const vashyaA = getVashyaGroup(moonA.rashiIndex, moonA.degreeInSign);
  const vashyaB = getVashyaGroup(moonB.rashiIndex, moonB.degreeInSign);
  const vashyaScore = VASHYA_MATRIX[vashyaA][vashyaB];

  // 3. Tara (max 3)
  const taraScore = getTaraScore(moonA.nakshatraIndex, moonB.nakshatraIndex);

  // 4. Yoni (max 4)
  const yoniScore = YONI_MATRIX[NAKSHATRA_YONI[moonA.nakshatraIndex]][NAKSHATRA_YONI[moonB.nakshatraIndex]];

  // 5. Graha Maitri (max 5)
  const grahaMaitriScore = getGrahaMaitriScore(moonA.rashiIndex, moonB.rashiIndex);

  // 6. Gana (max 6)
  const ganaScore = getGanaScore(NAKSHATRA_GANA[moonA.nakshatraIndex], NAKSHATRA_GANA[moonB.nakshatraIndex]);

  // 7. Bhakoot (max 7)
  const signDiff = ((moonB.rashiIndex - moonA.rashiIndex + 12) % 12) + 1;
  const bhakootGood = [1, 3, 4, 7, 10, 11].includes(signDiff);
  const bhakootScore = bhakootGood ? 7 : 0;
  const bhakootDosha = !bhakootGood;
  const bhakootParihara = bhakootDosha && grahaMaitriScore >= 4;

  // 8. Nadi (max 8)
  const nadiA = NAKSHATRA_NADI[moonA.nakshatraIndex];
  const nadiB = NAKSHATRA_NADI[moonB.nakshatraIndex];
  const nadiDosha = nadiA === nadiB;
  const nadiScore = nadiDosha ? 0 : 8;
  // Classical Nadi Parihara: same Rashi but different Nakshatra, OR same Nakshatra with different Pada
  const nadiParihara =
    nadiDosha &&
    ((moonA.rashiIndex === moonB.rashiIndex && moonA.nakshatraIndex !== moonB.nakshatraIndex) ||
      (moonA.nakshatraIndex === moonB.nakshatraIndex && moonA.pada !== moonB.pada));

  const kootas: KootaScore[] = [
    { key: 'varna', score: varnaScore, max: 1 },
    { key: 'vashya', score: vashyaScore, max: 2 },
    { key: 'tara', score: taraScore, max: 3 },
    { key: 'yoni', score: yoniScore, max: 4 },
    { key: 'grahaMaitri', score: grahaMaitriScore, max: 5 },
    { key: 'gana', score: ganaScore, max: 6 },
    { key: 'bhakoot', score: bhakootScore, max: 7 },
    { key: 'nadi', score: nadiScore, max: 8 },
  ];

  const totalScore = kootas.reduce((acc, k) => acc + k.score, 0);
  const verdict: AshtakootaResult['verdict'] =
    totalScore >= 28 ? 'excellent' : totalScore >= 21 ? 'good' : totalScore >= 18 ? 'moderate' : 'caution';

  const mangalA = evaluateMangalDoshaFromKundli(personA);
  const mangalB = evaluateMangalDoshaFromKundli(personB);
  const activeA = mangalA.severity === 'present';
  const activeB = mangalB.severity === 'present';
  const mangalCompatible = activeA === activeB;

  return {
    personA,
    personB,
    kootas,
    totalScore,
    maxScore: 36,
    verdict,
    nadiDosha,
    nadiParihara,
    bhakootDosha,
    bhakootParihara,
    mangalA,
    mangalB,
    mangalCompatible,
  };
}

// ============================================================================
// MANGAL DOSHA CALCULATOR
// ============================================================================

const MANGAL_HOUSES = new Set([1, 2, 4, 7, 8, 12]);

export function evaluateMangalDoshaFromKundli(kundli: KundliResult): MangalDoshaResult {
  const mars = kundli.planets.find((p) => p.id === 'mars')!;
  const moon = kundli.planets.find((p) => p.id === 'moon')!;
  const venus = kundli.planets.find((p) => p.id === 'venus')!;
  const jupiter = kundli.planets.find((p) => p.id === 'jupiter')!;

  const fromLagnaHouse = mars.house;
  const fromMoonHouse = ((mars.rashiIndex - moon.rashiIndex + 12) % 12) + 1;
  const fromVenusHouse = ((mars.rashiIndex - venus.rashiIndex + 12) % 12) + 1;

  const fromLagnaDosha = MANGAL_HOUSES.has(fromLagnaHouse);
  const fromMoonDosha = MANGAL_HOUSES.has(fromMoonHouse);
  const fromVenusDosha = MANGAL_HOUSES.has(fromVenusHouse);

  const cancellations: MangalDoshaResult['cancellations'] = [];

  if (fromLagnaDosha || fromMoonDosha || fromVenusDosha) {
    if (mars.rashiIndex === 0 || mars.rashiIndex === 7) {
      cancellations.push('own_sign');
    }
    if (mars.rashiIndex === 9) {
      cancellations.push('exalted');
    }
    // Jupiter aspects 5th, 7th, 9th houses (plus conjunction = 1st)
    const marsFromJupiter = ((mars.rashiIndex - jupiter.rashiIndex + 12) % 12) + 1;
    if ([1, 5, 7, 9].includes(marsFromJupiter)) {
      cancellations.push('jupiter_conjunction_or_aspect');
    }
    // Classical sign-house exceptions (e.g., Mars in 2nd in Gemini/Virgo, 4th in Aries/Scorpio, 7th in Capricorn/Cancer, 8th in Sagittarius/Pisces, 12th in Taurus/Libra)
    const exceptionMatch =
      (fromLagnaHouse === 2 && (mars.rashiIndex === 2 || mars.rashiIndex === 5)) ||
      (fromLagnaHouse === 4 && (mars.rashiIndex === 0 || mars.rashiIndex === 7)) ||
      (fromLagnaHouse === 7 && (mars.rashiIndex === 9 || mars.rashiIndex === 3)) ||
      (fromLagnaHouse === 8 && (mars.rashiIndex === 8 || mars.rashiIndex === 11)) ||
      (fromLagnaHouse === 12 && (mars.rashiIndex === 1 || mars.rashiIndex === 6));
    if (exceptionMatch) {
      cancellations.push('classical_sign_exception');
    }
  }

  let severity: MangalDoshaResult['severity'] = 'none';
  if (!fromLagnaDosha && !fromMoonDosha && !fromVenusDosha) {
    severity = 'none';
  } else if (cancellations.length > 0) {
    severity = 'cancelled';
  } else if (fromLagnaDosha && (fromMoonDosha || fromVenusDosha)) {
    severity = 'present';
  } else {
    severity = 'partial';
  }

  return {
    marsRashiIndex: mars.rashiIndex,
    marsRashiId: mars.rashiId,
    marsDegree: mars.degreeInSign,
    fromLagnaHouse,
    fromMoonHouse,
    fromVenusHouse,
    fromLagnaDosha,
    fromMoonDosha,
    fromVenusDosha,
    cancellations,
    severity,
  };
}

export function computeMangalDosha(input: BirthInput): MangalDoshaResult {
  return evaluateMangalDoshaFromKundli(computeKundli(input));
}

// ============================================================================
// SADE SATI & SHANI DHAIYA CALCULATOR (REAL SATURN TRANSIT SCANNER)
// ============================================================================

export function computeSadeSati(input: BirthInput, referenceDate: Date = new Date()): SadeSatiResult {
  const kundli = computeKundli(input, referenceDate);
  const natalMoon = kundli.moonRashiIndex;
  const saturnNowLon = getSiderealLongitude('saturn', referenceDate);
  const currentSaturnRashiIndex = Math.floor(saturnNowLon / 30);
  const currentSaturnDegree = saturnNowLon % 30;
  const houseFromMoon = ((currentSaturnRashiIndex - natalMoon + 12) % 12) + 1;

  let status: SadeSatiResult['status'] = 'none';
  if (houseFromMoon === 12) status = 'rising';
  else if (houseFromMoon === 1) status = 'peak';
  else if (houseFromMoon === 2) status = 'setting';
  else if (houseFromMoon === 4) status = 'dhaiya_4';
  else if (houseFromMoon === 8) status = 'dhaiya_8';

  // Classical Paya based on Moon's position from Saturn's current sign
  const moonFromSaturn = ((natalMoon - currentSaturnRashiIndex + 12) % 12) + 1;
  let paya: SadeSatiResult['paya'] = 'silver';
  if ([1, 6, 11].includes(moonFromSaturn)) paya = 'gold';
  else if ([2, 5, 9].includes(moonFromSaturn)) paya = 'silver';
  else if ([3, 7, 10].includes(moonFromSaturn)) paya = 'copper';
  else paya = 'iron';

  // Scan ±15 years around referenceDate in 30-day steps to locate actual Sade Sati 12th/1st/2nd house spans
  const risingSign = (natalMoon + 11) % 12;
  const peakSign = natalMoon;
  const settingSign = (natalMoon + 1) % 12;
  const targetSigns = [
    { phase: 'rising' as const, sign: risingSign },
    { phase: 'peak' as const, sign: peakSign },
    { phase: 'setting' as const, sign: settingSign },
  ];

  // Find nearest cycle by scanning -10 years to +22 years from referenceDate
  const stepMs = 20 * 86_400_000;
  const scanStartMs = referenceDate.getTime() - 10 * TROPICAL_YEAR_MS;
  const scanEndMs = referenceDate.getTime() + 22 * TROPICAL_YEAR_MS;
  const samples: Array<{ ms: number; sign: number }> = [];
  for (let ms = scanStartMs; ms <= scanEndMs; ms += stepMs) {
    const lon = getSiderealLongitude('saturn', new Date(ms));
    samples.push({ ms, sign: Math.floor(lon / 30) });
  }

  const windows: SadeSatiWindow[] = [];
  const refMs = referenceDate.getTime();

  for (const target of targetSigns) {
    // Group contiguous (allowing brief retrograde dips within 180 days) visits to target.sign
    const segments: Array<{ startMs: number; endMs: number }> = [];
    for (const s of samples) {
      if (s.sign === target.sign) {
        const last = segments[segments.length - 1];
        if (last && s.ms - last.endMs <= 210 * 86_400_000) {
          last.endMs = s.ms;
        } else {
          segments.push({ startMs: s.ms, endMs: s.ms });
        }
      }
    }
    // Choose the active segment or nearest upcoming (or most recent if none upcoming)
    const chosen =
      segments.find((seg) => refMs >= seg.startMs && refMs <= seg.endMs) ??
      segments.find((seg) => seg.endMs >= refMs) ??
      segments[segments.length - 1];

    if (chosen) {
      windows.push({
        phase: target.phase,
        saturnRashiIndex: target.sign,
        startDate: new Date(chosen.startMs),
        endDate: new Date(chosen.endMs),
        isCurrent: refMs >= chosen.startMs && refMs <= chosen.endMs && currentSaturnRashiIndex === target.sign,
      });
    }
  }

  return {
    natalMoonRashiIndex: natalMoon,
    natalMoonRashiId: ZODIAC_IDS[natalMoon],
    natalNakshatraIndex: kundli.moonNakshatraIndex,
    currentSaturnRashiIndex,
    currentSaturnRashiId: ZODIAC_IDS[currentSaturnRashiIndex],
    currentSaturnDegree,
    houseFromMoon,
    status,
    paya,
    windows,
  };
}

// ============================================================================
// NAKSHATRA FINDER
// ============================================================================

export function computeNakshatraDetails(input: BirthInput): NakshatraFinderResult {
  const kundli = computeKundli(input);
  const moon = kundli.planets.find((p) => p.id === 'moon')!;
  const startDasha = kundli.mahadashas[0];

  return {
    birthUtc: kundli.birthUtc,
    ayanamsha: kundli.ayanamsha,
    moonSiderealLon: moon.siderealLon,
    moonRashiIndex: moon.rashiIndex,
    moonRashiId: moon.rashiId,
    moonDegreeInSign: moon.degreeInSign,
    nakshatraIndex: moon.nakshatraIndex,
    pada: moon.pada,
    ruler: VIMSHOTTARI_ORDER[moon.nakshatraIndex % 9].lord,
    gana: NAKSHATRA_GANA[moon.nakshatraIndex],
    nadi: NAKSHATRA_NADI[moon.nakshatraIndex],
    varna: getRashiVarnaName(moon.rashiIndex),
    yoniIndex: NAKSHATRA_YONI[moon.nakshatraIndex],
    startingDashaLord: startDasha.lord,
    startingDashaRemainingYears: startDasha.years,
  };
}

// ============================================================================
// VEDIC & CHALDEAN NUMEROLOGY CALCULATOR
// ============================================================================

const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const NUMBER_PLANET: Record<number, PlanetId> = {
  1: 'sun',
  2: 'moon',
  3: 'jupiter',
  4: 'rahu',
  5: 'mercury',
  6: 'venus',
  7: 'ketu',
  8: 'saturn',
  9: 'mars',
};

const NUMBER_COMPATIBILITY: Record<
  number,
  { friendly: number[]; neutral: number[]; challenging: number[] }
> = {
  1: { friendly: [1, 2, 3, 9], neutral: [4, 5, 7], challenging: [6, 8] },
  2: { friendly: [1, 2, 3, 5], neutral: [6, 7, 9], challenging: [4, 8] },
  3: { friendly: [1, 2, 3, 9], neutral: [4, 7, 8], challenging: [5, 6] },
  4: { friendly: [1, 5, 6, 7], neutral: [3, 4, 8], challenging: [2, 9] },
  5: { friendly: [1, 4, 5, 6], neutral: [3, 7, 8, 9], challenging: [2] },
  6: { friendly: [4, 5, 6, 8], neutral: [3, 7, 9], challenging: [1, 2] },
  7: { friendly: [1, 2, 4, 6], neutral: [3, 5, 7, 8], challenging: [9] },
  8: { friendly: [4, 5, 6, 8], neutral: [3, 7], challenging: [1, 2, 9] },
  9: { friendly: [1, 2, 3, 9], neutral: [6, 7, 8], challenging: [4, 5] },
};

export function reduceToSingleDigit(n: number): number {
  let val = Math.abs(Math.trunc(n));
  if (val === 0) return 1;
  while (val > 9) {
    val = String(val)
      .split('')
      .reduce((sum, ch) => sum + Number(ch), 0);
  }
  return val;
}

export function computeNumerology(fullName: string, birthDateStr: string): NumerologyResult {
  const digits = birthDateStr.replace(/\D/g, '');
  const parts = birthDateStr.split('-');
  const dayNum = Number(parts[2]) || 1;
  const mulank = reduceToSingleDigit(dayNum);

  const dateDigitSum = digits.split('').reduce((acc, d) => acc + Number(d), 0);
  const bhagyank = reduceToSingleDigit(dateDigitSum || dayNum);

  const upper = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let namankCompound = 0;
  for (const ch of upper) {
    namankCompound += CHALDEAN_MAP[ch] ?? 0;
  }
  const namank = namankCompound > 0 ? reduceToSingleDigit(namankCompound) : mulank;
  const compat = NUMBER_COMPATIBILITY[mulank] ?? NUMBER_COMPATIBILITY[1];

  return {
    fullName: fullName.trim(),
    birthDateStr,
    mulank,
    bhagyank,
    namankCompound,
    namank,
    mulankPlanet: NUMBER_PLANET[mulank],
    bhagyankPlanet: NUMBER_PLANET[bhagyank],
    namankPlanet: NUMBER_PLANET[namank],
    friendlyNumbers: compat.friendly,
    neutralNumbers: compat.neutral,
    challengingNumbers: compat.challenging,
  };
}

// ============================================================================
// LIVE SIDEREAL TRANSITS FOR DAILY / WEEKLY / MONTHLY HOROSCOPE
// ============================================================================

export function computeCurrentTransits(
  selectedSignId: ZodiacId,
  referenceDate: Date = new Date(),
): TransitSnapshot {
  const selectedIdx = Math.max(0, ZODIAC_IDS.indexOf(selectedSignId));
  const ayanamsha = getLahiriAyanamsha(referenceDate);
  const ids: PlanetId[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

  const planets = ids.map((id) => {
    const lon = getSiderealLongitude(id, referenceDate);
    const rashiIndex = Math.floor(lon / 30);
    return {
      id,
      rashiIndex,
      rashiId: ZODIAC_IDS[rashiIndex],
      degreeInSign: lon % 30,
      retrograde: isPlanetRetrograde(id, referenceDate),
      houseFromSelected: ((rashiIndex - selectedIdx + 12) % 12) + 1,
    };
  });

  // Moon signs traversed over the next 7 days
  const weekMoonSet = new Set<ZodiacId>();
  for (let d = 0; d <= 6; d++) {
    const dt = new Date(referenceDate.getTime() + d * 86_400_000);
    const r = Math.floor(getSiderealLongitude('moon', dt) / 30);
    weekMoonSet.add(ZODIAC_IDS[r]);
  }

  // Sun signs traversed over the current 30-day window
  const monthSunSet = new Set<ZodiacId>();
  for (let d = 0; d <= 30; d += 5) {
    const dt = new Date(referenceDate.getTime() + d * 86_400_000);
    const r = Math.floor(getSiderealLongitude('sun', dt) / 30);
    monthSunSet.add(ZODIAC_IDS[r]);
  }

  return {
    date: referenceDate,
    ayanamsha,
    planets,
    weekMoonSigns: Array.from(weekMoonSet),
    monthSunSigns: Array.from(monthSunSet),
  };
}

/**
 * Formats an angular value in degrees into degrees and arcminutes (e.g. 24°13').
 */
export function formatDegMin(deg: number): string {
  const safe = Number.isFinite(deg) ? Math.abs(deg) : 0;
  let d = Math.floor(safe);
  let m = Math.round((safe - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return `${d}°${String(m).padStart(2, '0')}′`;
}

