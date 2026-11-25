import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TRANSLATIONS,
  SUPPORTED_LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  loadSavedLanguage,
  saveLanguage,
  getDictionary,
  type StorageLike,
} from '../i18n/index';
import {
  BASE_PATH,
  parseRoute,
  normalizePathname,
  stripBasePath,
  withBasePath,
  resolveGitHubPagesRedirect,
  getActiveNavKey,
} from './routing';
import { validateEmail, validateContactForm } from './validation';
import * as Astronomy from 'astronomy-engine';
import {
  PANCHANG_CITIES,
  PANCHANG_CITY_STORAGE_KEY,
  DEFAULT_PANCHANG_CITY_ID,
  getPanchangCityById,
  getCityUtcOffsetMinutesForDate,
  loadSavedPanchangCity,
  savePanchangCity,
  formatPanchangDate,
  formatLocalTime,
  formatShortDate,
  formatDateInTimeZone,
  getTimeZoneDateIso,
} from './panchang';
import {
  getLahiriAyanamsha,
  getMeanLahiriAyanamsha,
  getSiderealAscendant,
  getSiderealLongitude,
  getNavamshaRashiIndex,
  getNakshatraAndPada,
  formatDMS,
  isGregorianLeapYear,
  daysInGregorianMonth,
  buildUtcDate,
  computeVimshottariDasha,
  computeKundli,
  computeLivePanchang,
  computeAshtakoota,
  computeMangalDosha,
  computeSaturnTransits,
  computeSadeSati,
  computeNakshatraDetails,
  computeNumerology,
  computeCurrentTransits,
} from './vedicAstrology';
import {
  createDefaultBirthFormState,
  formStateToBirthInput,
} from '../components/BirthDetailsForm';
import {
  RASHI_NAMES,
  PLANET_NAMES,
  NAKSHATRA_NAMES,
  TITHI_NAMES,
  YOGA_NAMES,
  KARANA_NAMES,
  CHOGHADIYA_LABELS,
  CALC_UI,
  NUMEROLOGY_PROFILES,
} from '../i18n/vedicLabels';

function createMemoryStorage(): StorageLike {
  const store = new Map<string, string>();
  return {
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

test('all three languages exist with complete zodiac, 9 live tools, blog, and panchang parity', () => {
  assert.equal(SUPPORTED_LANGUAGES.length, 3);
  const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
  assert.deepEqual(codes, ['en', 'hi', 'as']);

  const enToolIds = TRANSLATIONS.en.quickTools.items.map((t) => t.id);
  const enSignIds = TRANSLATIONS.en.horoscope.signs.map((s) => s.id);
  const enArticleSlugs = TRANSLATIONS.en.blog.articles.map((a) => a.slug);

  assert.equal(enToolIds.length, 9);
  assert.ok(enToolIds.includes('muhurat-finder'));
  assert.equal(enSignIds.length, 12);
  assert.equal(enArticleSlugs.length, 4);

  for (const code of codes) {
    const dict = getDictionary(code);
    assert.ok(dict.brand.name.length > 0, `${code}: brand name`);
    assert.ok(dict.hero.headline.length > 0, `${code}: hero headline`);
    assert.deepEqual(
      dict.quickTools.items.map((t) => t.id),
      enToolIds,
      `${code}: tool ids parity`,
    );
    // All 9 core tools must be marked live (no Coming Soon badges on working tools)
    for (const tool of dict.quickTools.items) {
      assert.equal(tool.status, 'live', `${code}: ${tool.id} must be live`);
    }
    assert.deepEqual(
      dict.horoscope.signs.map((s) => s.id),
      enSignIds,
      `${code}: zodiac ids parity`,
    );
    assert.deepEqual(
      dict.blog.articles.map((a) => a.slug),
      enArticleSlugs,
      `${code}: blog slugs parity`,
    );
    assert.equal(dict.whyChoose.pillars.length, 5, `${code}: whyChoose pillars`);
    assert.equal(dict.premium.features.length, 4, `${code}: premium features`);
    assert.ok(dict.horoscope.solarDateNote.length > 0, `${code}: solarDateNote`);
    assert.ok(dict.panchang.citySelectorLabel.length > 0, `${code}: panchang citySelectorLabel`);
    assert.ok(dict.toolsPage.shaniDhaiyaCard.title.length > 0, `${code}: shaniDhaiyaCard title`);
    assert.ok(dict.toolsPage.shaniDhaiyaCard.subtitle.length > 0, `${code}: shaniDhaiyaCard subtitle`);
    assert.ok(dict.toolsPage.shaniDhaiyaCard.openButton.length > 0, `${code}: shaniDhaiyaCard openButton`);
  }
  assert.equal(TRANSLATIONS.en.toolsPage.shaniDhaiyaCard.title, 'Shani Dhaiya Calculator');
  assert.equal(
    TRANSLATIONS.en.toolsPage.shaniDhaiyaCard.subtitle,
    'Check 4th-house Kantaka Shani and 8th-house Ashtama Shani periods',
  );
  assert.equal(TRANSLATIONS.en.toolsPage.shaniDhaiyaCard.openButton, 'Open Calculator');
});

test('language preference saves and loads from storage with safe fallback', () => {
  const storage = createMemoryStorage();
  assert.equal(loadSavedLanguage(storage), 'en');

  saveLanguage('hi', storage);
  assert.equal(storage.getItem(LANGUAGE_STORAGE_KEY), 'hi');
  assert.equal(loadSavedLanguage(storage), 'hi');

  saveLanguage('as', storage);
  assert.equal(loadSavedLanguage(storage), 'as');

  storage.setItem(LANGUAGE_STORAGE_KEY, 'fr');
  assert.equal(loadSavedLanguage(storage), 'en');
});

test('GitHub Pages /jyotishsetu/ base path helpers produce canonical URLs and handle direct redirects', () => {
  assert.equal(BASE_PATH, '/jyotishsetu');

  assert.equal(withBasePath('/'), '/jyotishsetu/');
  assert.equal(withBasePath('/jyotishsetu'), '/jyotishsetu/');
  assert.equal(withBasePath('/jyotishsetu/'), '/jyotishsetu/');
  assert.equal(withBasePath('/kundli'), '/jyotishsetu/kundli');
  assert.equal(withBasePath('/jyotishsetu/kundli'), '/jyotishsetu/kundli');
  assert.equal(withBasePath('/horoscope'), '/jyotishsetu/horoscope');
  assert.equal(withBasePath('/horoscope/simha'), '/jyotishsetu/horoscope/simha');
  assert.equal(withBasePath('/panchang'), '/jyotishsetu/panchang');
  assert.equal(withBasePath('/matching'), '/jyotishsetu/matching');
  assert.equal(withBasePath('/numerology'), '/jyotishsetu/numerology');
  assert.equal(withBasePath('/tools'), '/jyotishsetu/tools');
  assert.equal(withBasePath('/tools/sade-sati'), '/jyotishsetu/tools/sade-sati');
  assert.equal(withBasePath('/tools/muhurat'), '/jyotishsetu/tools/muhurat');
  assert.equal(withBasePath('/blog'), '/jyotishsetu/blog');
  assert.equal(withBasePath('/about'), '/jyotishsetu/about');
  assert.equal(withBasePath('/contact'), '/jyotishsetu/contact');
  assert.equal(withBasePath('/privacy'), '/jyotishsetu/privacy');
  assert.equal(withBasePath('/terms'), '/jyotishsetu/terms');
  assert.equal(withBasePath('/disclaimer'), '/jyotishsetu/disclaimer');

  assert.equal(stripBasePath('/jyotishsetu/'), '/');
  assert.equal(stripBasePath('/jyotishsetu'), '/');
  assert.equal(stripBasePath('/jyotishsetu/kundli/'), '/kundli');
  assert.equal(stripBasePath('/jyotishsetu/horoscope/simha'), '/horoscope/simha');

  assert.equal(resolveGitHubPagesRedirect('?p=%2Fkundli'), '/jyotishsetu/kundli');
  assert.equal(
    resolveGitHubPagesRedirect('?p=%2Fhoroscope%2Fsimha&q=ref%3Dshare', '#details'),
    '/jyotishsetu/horoscope/simha?ref=share#details',
  );
  assert.equal(resolveGitHubPagesRedirect('?foo=bar'), null);
});

test('SPA route parser handles /jyotishsetu/ prefixed and relative routes across all pages including Muhurat', () => {
  assert.equal(normalizePathname('/kundli/'), '/kundli');
  assert.equal(normalizePathname('/'), '/');

  assert.deepEqual(parseRoute('/jyotishsetu/'), { kind: 'home' });
  assert.deepEqual(parseRoute('/jyotishsetu/kundli'), { kind: 'kundli' });
  assert.deepEqual(parseRoute('/jyotishsetu/panchang'), { kind: 'panchang' });
  assert.deepEqual(parseRoute('/jyotishsetu/matching'), { kind: 'matching' });
  assert.deepEqual(parseRoute('/jyotishsetu/numerology'), { kind: 'numerology' });
  assert.deepEqual(parseRoute('/jyotishsetu/horoscope'), { kind: 'horoscope' });
  assert.deepEqual(parseRoute('/jyotishsetu/horoscope/simha'), { kind: 'horoscope', sign: 'simha' });
  assert.deepEqual(parseRoute('/jyotishsetu/horoscope/unknown-sign'), { kind: 'horoscope' });
  assert.deepEqual(parseRoute('/jyotishsetu/tools'), { kind: 'tools' });
  assert.deepEqual(parseRoute('/jyotishsetu/tools/sade-sati'), { kind: 'tools', toolSlug: 'sade-sati' });
  assert.deepEqual(parseRoute('/jyotishsetu/tools/mangal-dosha'), { kind: 'tools', toolSlug: 'mangal-dosha' });
  assert.deepEqual(parseRoute('/jyotishsetu/tools/nakshatra-finder'), {
    kind: 'tools',
    toolSlug: 'nakshatra-finder',
  });
  assert.deepEqual(parseRoute('/jyotishsetu/tools/muhurat'), { kind: 'tools', toolSlug: 'muhurat' });
  assert.deepEqual(parseRoute('/jyotishsetu/muhurat'), { kind: 'tools', toolSlug: 'muhurat' });
  assert.deepEqual(parseRoute('/jyotishsetu/blog'), { kind: 'blog' });
  assert.deepEqual(parseRoute('/jyotishsetu/blog/twenty-seven-nakshatras-lunar-mansions'), {
    kind: 'blog',
    slug: 'twenty-seven-nakshatras-lunar-mansions',
  });
  assert.deepEqual(parseRoute('/jyotishsetu/about'), { kind: 'about' });
  assert.deepEqual(parseRoute('/jyotishsetu/contact'), { kind: 'contact' });
  assert.deepEqual(parseRoute('/jyotishsetu/privacy'), { kind: 'privacy' });
  assert.deepEqual(parseRoute('/jyotishsetu/terms'), { kind: 'terms' });
  assert.deepEqual(parseRoute('/jyotishsetu/disclaimer'), { kind: 'disclaimer' });
  assert.deepEqual(parseRoute('/jyotishsetu/nonexistent-page'), { kind: 'home' });

  assert.equal(getActiveNavKey({ kind: 'tools', toolSlug: 'muhurat' }), 'tools');
  assert.equal(getActiveNavKey({ kind: 'horoscope', sign: 'mesha' }), 'horoscope');
  assert.equal(getActiveNavKey({ kind: 'about' }), '');
});

test('email and contact form validation rejects empty/invalid inputs and accepts valid data', () => {
  assert.equal(validateEmail(''), 'emailRequired');
  assert.equal(validateEmail('not-an-email'), 'emailInvalid');
  assert.equal(validateEmail('seeker@jyotishsetu.in'), null);

  const invalid = validateContactForm({
    name: '   ',
    email: 'bad@email',
    subject: '',
    message: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.equal(invalid.errors.name, 'nameRequired');
  assert.equal(invalid.errors.email, 'emailInvalid');
  assert.equal(invalid.errors.subject, 'subjectRequired');
  assert.equal(invalid.errors.message, 'messageRequired');

  const valid = validateContactForm({
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    subject: 'Kundli Suggestion',
    message: 'Appreciate the Assamese and Hindi Lahiri Kundli calculators.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('Panchang date formatter and city selector work accurately across all three languages', () => {
  const nov24 = new Date(2026, 10, 24, 12, 0, 0);

  const enDate = formatPanchangDate(nov24, 'en');
  assert.equal(enDate.formattedDate, 'Tuesday, 24 November 2026');
  assert.equal(enDate.weekdayVedic, 'Mangalavara');

  const hiDate = formatPanchangDate(nov24, 'hi');
  assert.equal(hiDate.formattedDate, 'मंगलवार, २४ नवम्बर २०२६');
  assert.equal(hiDate.weekdayVedic, 'मंगलवार');

  const asDate = formatPanchangDate(nov24, 'as');
  assert.equal(asDate.formattedDate, 'মঙলবাৰ, ২৪ নৱেম্বৰ ২০২৬');
  assert.equal(asDate.weekdayVedic, 'মঙলবাৰ');

  const storage = createMemoryStorage();
  assert.equal(loadSavedPanchangCity(storage), DEFAULT_PANCHANG_CITY_ID);

  savePanchangCity('guwahati', storage);
  assert.equal(storage.getItem(PANCHANG_CITY_STORAGE_KEY), 'guwahati');
  assert.equal(loadSavedPanchangCity(storage), 'guwahati');

  const guwahati = getPanchangCityById('guwahati');
  assert.equal(guwahati.names.en, 'Guwahati');
  assert.equal(guwahati.names.as, 'গুৱাহাটী');
  assert.equal(guwahati.regions.as, 'অসম');

  assert.ok(PANCHANG_CITIES.length >= 18);
  for (const city of PANCHANG_CITIES) {
    assert.ok(city.names.en && city.names.hi && city.names.as);
    assert.ok(city.regions.en && city.regions.hi && city.regions.as);
    assert.ok(Number.isFinite(city.lat) && Number.isFinite(city.lon));
  }
});

test('Vedic ephemeris computes accurate Lahiri Ayanamsha, Kundli, D-9, and 120-year Vimshottari Dasha', () => {
  const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
  const ayJ2000 = getLahiriAyanamsha(j2000);
  assert.ok(ayJ2000 > 23.85 && ayJ2000 < 23.87, `J2000 Lahiri Ayanamsha unexpected: ${ayJ2000}`);

  const nov2026 = new Date(Date.UTC(2026, 10, 24, 6, 0, 0));
  const ay2026 = getLahiriAyanamsha(nov2026);
  assert.ok(ay2026 > 24.22 && ay2026 < 24.25, `2026 Lahiri Ayanamsha unexpected: ${ay2026}`);

  const kundli = computeKundli(
    {
      name: 'Test Seeker',
      dateStr: '1996-05-15',
      timeStr: '08:30',
      lat: 26.1445,
      lon: 91.7362,
      utcOffsetMinutes: 330,
    },
    nov2026,
  );

  assert.equal(kundli.planets.length, 9);
  assert.ok(kundli.ascendantRashiIndex >= 0 && kundli.ascendantRashiIndex <= 11);
  assert.ok(kundli.navamshaLagnaIndex >= 0 && kundli.navamshaLagnaIndex <= 11);
  for (const p of kundli.planets) {
    assert.ok(p.siderealLon >= 0 && p.siderealLon < 360);
    assert.ok(p.house >= 1 && p.house <= 12);
    assert.ok(p.nakshatraIndex >= 0 && p.nakshatraIndex <= 26);
    assert.ok(p.pada >= 1 && p.pada <= 4);
  }
  // Rahu and Ketu must be exactly 180 degrees apart
  const rahu = kundli.planets.find((p) => p.id === 'rahu')!;
  const ketu = kundli.planets.find((p) => p.id === 'ketu')!;
  const rkDiff = Math.abs(((ketu.siderealLon - rahu.siderealLon + 360) % 360) - 180);
  assert.ok(rkDiff < 0.001, `Rahu-Ketu opposition error: ${rkDiff}`);

  // Vimshottari Mahadasha sequence starts at birth and covers active period
  assert.ok(kundli.mahadashas.length >= 9);
  assert.ok(kundli.currentMahadasha !== null);
  assert.equal(kundli.currentAntardashas.length, 9);
});

test('Live Panchang computes distinct city-adjusted Sunrise/Sunset, valid Tithi/Nakshatra, and 16 Choghadiya slots', () => {
  const varanasi = getPanchangCityById('varanasi');
  const guwahati = getPanchangCityById('guwahati');

  const pVns = computeLivePanchang(2026, 11, 24, varanasi.lat, varanasi.lon, varanasi.utcOffsetMinutes);
  const pGhy = computeLivePanchang(2026, 11, 24, guwahati.lat, guwahati.lon, guwahati.utcOffsetMinutes);

  assert.ok(pVns.sunrise && pVns.sunset && pGhy.sunrise && pGhy.sunset);
  assert.ok(pVns.sunrise.getTime() < pVns.sunset.getTime());
  // Guwahati is ~8.76 degrees east of Varanasi -> Sunrise in Guwahati occurs ~35 minutes earlier!
  const diffMin = (pVns.sunrise.getTime() - pGhy.sunrise.getTime()) / 60_000;
  assert.ok(diffMin > 25 && diffMin < 45, `Expected Guwahati sunrise ~35 min earlier than Varanasi, got ${diffMin}`);

  assert.ok(pVns.tithiNumber >= 1 && pVns.tithiNumber <= 30);
  assert.ok(pVns.nakshatraIndex >= 0 && pVns.nakshatraIndex <= 26);
  assert.ok(pVns.yogaIndex >= 0 && pVns.yogaIndex <= 26);
  assert.equal(pVns.dayChoghadiya.length, 8);
  assert.equal(pVns.nightChoghadiya.length, 8);
  assert.ok(pVns.rahuKaal && pVns.abhijitMuhurat && pVns.brahmaMuhurat);

  // Check Assamese time formatter does not output AM/PM
  const asRise = formatLocalTime(pGhy.sunrise, guwahati.utcOffsetMinutes, 'as');
  assert.equal(asRise.includes('AM'), false);
  assert.equal(asRise.includes('PM'), false);
});

test('Ashtakoota 36-Guna Matching, Mangal Dosha, Sade Sati, Nakshatra, Numerology, and Transits compute valid results', () => {
  const inputA = {
    name: 'Aarav',
    dateStr: '1995-03-18',
    timeStr: '07:45',
    lat: 26.1445,
    lon: 91.7362,
    utcOffsetMinutes: 330,
  };
  const inputB = {
    name: 'Ananya',
    dateStr: '1997-11-04',
    timeStr: '18:20',
    lat: 25.3176,
    lon: 82.9739,
    utcOffsetMinutes: 330,
  };

  const match = computeAshtakoota(inputA, inputB);
  assert.equal(match.kootas.length, 8);
  assert.equal(match.maxScore, 36);
  assert.ok(match.totalScore >= 0 && match.totalScore <= 36);
  const sum = match.kootas.reduce((acc, k) => acc + k.score, 0);
  assert.ok(Math.abs(sum - match.totalScore) < 0.01);

  const mangal = computeMangalDosha(inputA);
  assert.ok(mangal.fromLagnaHouse >= 1 && mangal.fromLagnaHouse <= 12);
  assert.ok(mangal.fromMoonHouse >= 1 && mangal.fromMoonHouse <= 12);
  assert.ok(mangal.fromVenusHouse >= 1 && mangal.fromVenusHouse <= 12);

  const sadeSati = computeSadeSati(inputA, new Date(Date.UTC(2026, 10, 24, 6, 0, 0)));
  assert.ok(sadeSati.houseFromMoon >= 1 && sadeSati.houseFromMoon <= 12);
  assert.ok(sadeSati.windows.length >= 3);
  assert.ok(sadeSati.sadeSatiStartDate && sadeSati.sadeSatiEndDate);
  assert.ok(sadeSati.dhaiyaWindows.length >= 2);

  const nak = computeNakshatraDetails(inputA);
  assert.ok(nak.nakshatraIndex >= 0 && nak.nakshatraIndex <= 26);
  assert.ok(nak.pada >= 1 && nak.pada <= 4);

  const num = computeNumerology('Aarav Sharma', '1996-05-15');
  assert.equal(num.mulank, 6); // 1+5 = 6
  assert.equal(num.bhagyank, 9); // 1+9+9+6+0+5+1+5 = 36 -> 9
  assert.ok(num.namank >= 1 && num.namank <= 9);

  const transits = computeCurrentTransits('mesha', new Date(Date.UTC(2026, 10, 24, 6, 0, 0)));
  assert.equal(transits.planets.length, 9);
  assert.ok(transits.weekMoonSigns.length >= 2);
  assert.ok(transits.monthSunSigns.length >= 1);
});

test('Assamese translations and Vedic labels maintain pure Assamese orthography without stray Bengali ra', () => {
  const asCorpus = JSON.stringify(TRANSLATIONS.as);
  const cityCorpus = JSON.stringify(
    PANCHANG_CITIES.map((c) => ({ name: c.names.as, region: c.regions.as })),
  );
  const labelsCorpus = JSON.stringify({
    rashi: RASHI_NAMES.as,
    planets: PLANET_NAMES.as,
    nakshatra: NAKSHATRA_NAMES.as,
    tithi: TITHI_NAMES.as,
    yoga: YOGA_NAMES.as,
    karana: KARANA_NAMES.as,
    choghadiya: CHOGHADIYA_LABELS.as,
    ui: CALC_UI.as,
    num: NUMEROLOGY_PROFILES.as,
  });
  const fullAssamese = `${asCorpus} ${cityCorpus} ${labelsCorpus}`;

  // Must not contain Bengali ra (U+09B0); Assamese uses U+09F0 (ৰ).
  assert.equal(fullAssamese.includes('\u09B0'), false, 'Found stray Bengali ra (U+09B0)');

  // Must not contain unnatural/incorrect phrases or orthography defects.
  for (const forbidden of [
    'পৰিকল্পনা চাওক',
    'চাৰে সাতি',
    'গোছৰ',
    'ডেক্স',
    'পশ্চিমবঙ্গ',
    'পঞ্চাঙ্গ',
    'মঙ্গল',
    ' ও ',
    ' AM',
    ' PM',
  ]) {
    assert.equal(
      fullAssamese.includes(forbidden),
      false,
      `Forbidden or inconsistent Assamese phrase still present: ${forbidden}`,
    );
  }

  for (const required of [
    'তিথি',
    'নক্ষত্ৰ',
    'যোগ',
    'কৰণ',
    'ৰাহু কাল',
    'লাহিড়ী অয়নাংশ',
    'বিংশোত্তৰী দশা',
    'সাঢ়েসাতী',
    'বিৱৰণ চাওক',
    'অস্বীকাৰ পত্ৰ',
  ]) {
    assert.ok(fullAssamese.includes(required), `Missing required Assamese term: ${required}`);
  }

  assert.ok(TRANSLATIONS.as.footer.phaseNotice.includes('লাহিড়ী অয়নাংশ'));
  assert.ok(TRANSLATIONS.as.footer.copyright.includes('জ্যোতিষসেতু'));
});

// ============================================================================
// TECHNICAL ACCURACY AUDIT: INDEPENDENT ASTRONOMICAL BENCHMARKS
// ============================================================================

test('Audit 1: True & Mean Lahiri (Chitrapaksha) Ayanamsha match Swiss Ephemeris SE_SIDM_LAHIRI across centuries', () => {
  // Swiss Ephemeris SE_SIDM_LAHIRI reference values (True Ayanamsha including nutation dpsi):
  // 2000-01-01 00:00 UT: 23° 51' 11.4" (23.85317°); Mean at J2000.0: 23° 51' 25.53" (23.85709°)
  const jan2000 = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));
  const true2000 = getLahiriAyanamsha(jan2000);
  const mean2000 = getMeanLahiriAyanamsha(jan2000);
  assert.ok(Math.abs(true2000 - (23 + 51 / 60 + 11.4 / 3600)) < 0.001, `2000 True Lahiri drift: ${true2000}`);
  assert.ok(Math.abs(mean2000 - (23 + 51 / 60 + 25.4 / 3600)) < 0.001, `2000 Mean Lahiri drift: ${mean2000}`);
  // Nutation dpsi at 2000-01-01 is ~ -13.9" -> True < Mean by ~0.0039°
  assert.ok(mean2000 - true2000 > 0.003 && mean2000 - true2000 < 0.005);

  // 1947-08-15 00:00 IST (1947-08-14 18:30 UT): Swiss Ephemeris True Lahiri ≈ 23° 07' 23" (23.123°)
  const ind1947 = buildUtcDate('1947-08-15', '00:00', 330);
  const true1947 = getLahiriAyanamsha(ind1947);
  assert.ok(Math.abs(true1947 - 23.123) < 0.005, `1947 True Lahiri drift: ${true1947}`);

  // 2026-01-01 00:00 UT: Swiss Ephemeris True Lahiri ≈ 24° 13' 19" (24.2219°)
  const jan2026 = new Date(Date.UTC(2026, 0, 1, 0, 0, 0));
  const true2026 = getLahiriAyanamsha(jan2026);
  assert.ok(Math.abs(true2026 - (24 + 13 / 60 + 19 / 3600)) < 0.002, `2026 True Lahiri drift: ${true2026}`);
});

test('Audit 2, 5, 6 & 7: Independent Historical Benchmarks (India 1947, Mahatma Gandhi 1869, Swami Vivekananda 1863)', () => {
  // 1) India Independence Chart: 15 Aug 1947, 00:00 IST, New Delhi (28.6139°N, 77.2090°E)
  const india = computeKundli(
    {
      name: 'India Independence',
      dateStr: '1947-08-15',
      timeStr: '00:00',
      lat: 28.6139,
      lon: 77.209,
      utcOffsetMinutes: 330,
    },
    new Date(Date.UTC(1947, 7, 15, 0, 0, 0)),
  );

  // Taurus Lagna ~07°44' (Krittika Pada 4), Navamsha Lagna = Pisces (11)
  assert.equal(india.ascendantRashiId, 'vrishabha');
  assert.ok(Math.abs(india.ascendantDegree - (7 + 44 / 60)) < 0.1, `India Lagna deg: ${india.ascendantDegree}`);
  assert.equal(india.ascendantNakshatraIndex, 2); // Krittika
  assert.equal(india.ascendantPada, 4);
  assert.equal(india.navamshaLagnaIndex, 11); // Meena

  // 5-planet stellium in Cancer (House 3): Sun, Moon, Mercury, Venus, Saturn
  const byId = Object.fromEntries(india.planets.map((p) => [p.id, p]));
  for (const id of ['sun', 'moon', 'mercury', 'venus', 'saturn'] as const) {
    assert.equal(byId[id].rashiId, 'karka', `India ${id} expected in Karka`);
    assert.equal(byId[id].house, 3, `India ${id} expected in Whole-Sign House 3`);
  }
  // Moon in Pushya Pada 1 (~03°59' Karka)
  assert.equal(byId.moon.nakshatraIndex, 7); // Pushya
  assert.equal(byId.moon.pada, 1);
  assert.ok(Math.abs(byId.moon.degreeInSign - (3 + 59 / 60)) < 0.1, `India Moon deg: ${byId.moon.degreeInSign}`);

  // Mars in Gemini H2, Jupiter in Libra H6, Rahu in Taurus H1, Ketu in Scorpio H7
  assert.equal(byId.mars.rashiId, 'mithuna');
  assert.equal(byId.mars.house, 2);
  assert.equal(byId.jupiter.rashiId, 'tula');
  assert.equal(byId.jupiter.house, 6);
  assert.equal(byId.rahu.rashiId, 'vrishabha');
  assert.equal(byId.rahu.house, 1);
  assert.equal(byId.ketu.rashiId, 'vrishchika');
  assert.equal(byId.ketu.house, 7);

  // Exact Rahu-Ketu 180° opposition in D-1 and 6-sign opposition in D-9
  const rkDiffIndia = Math.abs(((byId.ketu.siderealLon - byId.rahu.siderealLon + 360) % 360) - 180);
  assert.ok(rkDiffIndia < 1e-9, `Rahu-Ketu opposition error: ${rkDiffIndia}`);
  assert.equal((byId.rahu.navamshaRashiIndex + 6) % 12, byId.ketu.navamshaRashiIndex);

  // Saturn Mahadasha at birth with ~18.08 years remaining (ending ~Sep 1965)
  assert.equal(india.mahadashas.length, 10); // 9 + completing Saturn tail balance
  assert.equal(india.mahadashas[0].lord, 'saturn');
  assert.ok(
    Math.abs(india.mahadashas[0].years - 18.08) < 0.1,
    `India Saturn balance unexpected: ${india.mahadashas[0].years}`,
  );
  assert.equal(india.mahadashas[0].endDate.getUTCFullYear(), 1965);
  assert.equal(india.mahadashas[9].lord, 'saturn');
  // Local date formatting for 1947-08-15 00:00 IST must display 15 August 1947 (not 14 August 1947 UTC)
  assert.equal(formatShortDate(india.mahadashas[0].startDate, 'en', 330), '15 August 1947');

  // 2) Mahatma Gandhi: 2 Oct 1869, 07:12 LMT, Porbandar (21.6417°N, 69.6293°E, LMT = +278.5 min)
  const gandhi = computeKundli({
    name: 'Mahatma Gandhi',
    dateStr: '1869-10-02',
    timeStr: '07:12',
    lat: 21.6417,
    lon: 69.6293,
    utcOffsetMinutes: 278.5,
  });
  const gById = Object.fromEntries(gandhi.planets.map((p) => [p.id, p]));
  assert.equal(gandhi.ascendantRashiId, 'tula');
  assert.ok(Math.abs(gandhi.ascendantDegree - (4 + 37 / 60)) < 0.25, `Gandhi Lagna deg: ${gandhi.ascendantDegree}`);
  assert.equal(gById.sun.rashiId, 'kanya');
  assert.equal(gById.sun.house, 12);
  assert.equal(gById.moon.rashiId, 'karka');
  assert.equal(gById.moon.nakshatraIndex, 8); // Ashlesha
  assert.equal(gById.moon.pada, 4);
  assert.equal(gById.mars.rashiId, 'tula');
  assert.equal(gById.mercury.rashiId, 'tula');
  assert.equal(gById.venus.rashiId, 'tula');
  assert.equal(gById.jupiter.rashiId, 'mesha');
  assert.equal(gById.jupiter.retrograde, true);
  assert.equal(gById.saturn.rashiId, 'vrishchika');
  assert.equal(gById.rahu.rashiId, 'karka');
  assert.equal(gById.ketu.rashiId, 'makara');

  // 3) Swami Vivekananda: 12 Jan 1863, 06:33 LMT, Kolkata (22.5726°N, 88.3639°E, LMT = +353.45 min)
  const vivek = computeKundli({
    name: 'Swami Vivekananda',
    dateStr: '1863-01-12',
    timeStr: '06:33',
    lat: 22.5726,
    lon: 88.3639,
    utcOffsetMinutes: 353.45,
  });
  const vById = Object.fromEntries(vivek.planets.map((p) => [p.id, p]));
  assert.equal(vivek.ascendantRashiId, 'dhanu');
  assert.ok(Math.abs(vivek.ascendantDegree - (26 + 2 / 60)) < 0.25, `Vivekananda Lagna deg: ${vivek.ascendantDegree}`);
  assert.equal(vById.sun.rashiId, 'dhanu');
  assert.equal(vById.moon.rashiId, 'kanya');
  assert.equal(vById.moon.nakshatraIndex, 12); // Hasta
  assert.equal(vById.moon.pada, 3);
  assert.equal(vById.mars.rashiId, 'mesha');
  assert.equal(vById.mars.house, 5);
  assert.equal(vById.jupiter.rashiId, 'tula');
  assert.equal(vById.jupiter.house, 11);
  assert.equal(vById.saturn.rashiId, 'kanya');
  assert.equal(vById.saturn.house, 10);

  // Whole-sign house invariant across all three charts
  for (const chart of [india, gandhi, vivek]) {
    for (const p of chart.planets) {
      assert.equal(p.house, ((p.rashiIndex - chart.ascendantRashiIndex + 12) % 12) + 1);
    }
  }
});

test('Audit 3: Sidereal Ascendant matches independent 3D horizon-ecliptic intersection to < 1 arcsecond globally', () => {
  // Independent geometric solver: find ecliptic longitude lambda on the True Ecliptic of Date (ECT)
  // whose horizontal altitude = 0° on the Eastern horizon (azimuth near 90°).
  function independent3dSiderealAscendant(date: Date, lat: number, lon: number): number {
    const time = Astronomy.MakeTime(date);
    const observer = new Astronomy.Observer(lat, lon, 0);
    const rEctEqd = Astronomy.Rotation_ECT_EQD(time);
    const rEqdHor = Astronomy.Rotation_EQD_HOR(time, observer);

    const evalPoint = (lamDeg: number) => {
      const r = (lamDeg * Math.PI) / 180;
      const vEct = new Astronomy.Vector(Math.cos(r), Math.sin(r), 0, time);
      const vEqd = Astronomy.RotateVector(rEctEqd, vEct);
      const vHor = Astronomy.RotateVector(rEqdHor, vEqd);
      const sphere = Astronomy.SphereFromVector(vHor);
      return { alt: sphere.lat, az: sphere.lon };
    };

    let lo = 0;
    let hi = 0;
    let found = false;
    for (let deg = 0; deg < 360; deg += 1) {
      const a = evalPoint(deg);
      const b = evalPoint((deg + 1) % 360);
      // In Astronomy Engine HOR frame (+x=N, +y=W, +z=Up), East has sphere.lon in (180°, 360°),
      // and as ecliptic longitude increases eastward, points cross from above horizon (>=0) to below (<0).
      if (a.alt >= 0 && b.alt < 0 && a.az > 180 && a.az < 360) {
        lo = deg;
        hi = deg + 1;
        found = true;
        break;
      }
    }
    assert.ok(found, 'Failed to bracket eastern ecliptic horizon intersection');
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (evalPoint(mid).alt >= 0) lo = mid;
      else hi = mid;
    }
    const tropAsc = (lo + hi) / 2;
    const ayan = getLahiriAyanamsha(date);
    return (((tropAsc - ayan) % 360) + 360) % 360;
  }

  const cases: Array<{ label: string; date: Date; lat: number; lon: number }> = [
    { label: 'New Delhi 1947', date: buildUtcDate('1947-08-15', '00:00', 330), lat: 28.6139, lon: 77.209 },
    { label: 'Guwahati 1996', date: buildUtcDate('1996-05-15', '08:30', 330), lat: 26.1445, lon: 91.7362 },
    { label: 'Quito Equator', date: new Date(Date.UTC(2024, 2, 20, 12, 0, 0)), lat: 0, lon: -78.4678 },
    { label: 'London Prime Meridian', date: new Date(Date.UTC(2025, 6, 15, 18, 30, 0)), lat: 51.5074, lon: 0 },
    { label: 'Sydney Southern Hem', date: new Date(Date.UTC(2024, 11, 21, 5, 15, 0)), lat: -33.8688, lon: 151.2093 },
    { label: 'Buenos Aires South-West', date: new Date(Date.UTC(2000, 0, 1, 3, 0, 0)), lat: -34.6037, lon: -58.3816 },
    { label: 'Reykjavik High North', date: new Date(Date.UTC(2026, 5, 21, 10, 0, 0)), lat: 64.1466, lon: -21.9426 },
    { label: 'Antarctic Rim High South', date: new Date(Date.UTC(2026, 1, 10, 14, 20, 0)), lat: -65.0, lon: 45.0 },
  ];

  for (const c of cases) {
    const engineAsc = getSiderealAscendant(c.date, c.lat, c.lon);
    const geomAsc = independent3dSiderealAscendant(c.date, c.lat, c.lon);
    let diff = Math.abs(engineAsc - geomAsc);
    if (diff > 180) diff = 360 - diff;
    // Must agree within 1 arcsecond (1/3600 deg ≈ 0.000278°)
    assert.ok(diff < 1 / 3600, `${c.label}: Ascendant mismatch ${(diff * 3600).toFixed(3)}"`);
  }
});

test('Audit 4: Navamsha (D-9), Nakshatra/Pada boundaries, and formatDMS avoid IEEE-754 boundary errors', () => {
  // Exact 10°00' and 20°00' inside Aries (Fire -> starts Mesha=0):
  // 0°..3°20'->0, 3°20'..6°40'->1, 6°40'..10°00'->2, 10°00'..13°20'->3, 20°00'..23°20'->6
  assert.equal(getNavamshaRashiIndex(0), 0);
  assert.equal(getNavamshaRashiIndex(10), 3); // Karka (was 2 before fix due to 10/(30/9)=2.9999999999999996!)
  assert.equal(getNavamshaRashiIndex(20), 6); // Tula
  // Earth sign (Vrishabha=1 -> starts Makara=9): 30° -> 9, 40° (10° Taurus) -> (9+3)%12 = 0 (Mesha)
  assert.equal(getNavamshaRashiIndex(30), 9);
  assert.equal(getNavamshaRashiIndex(40), 0);
  // Air sign (Mithuna=2 -> starts Tula=6): 60° -> 6, 70° -> 9
  assert.equal(getNavamshaRashiIndex(60), 6);
  assert.equal(getNavamshaRashiIndex(70), 9);
  // Water sign (Karka=3 -> starts Karka=3): 90° -> 3, 100° -> 6
  assert.equal(getNavamshaRashiIndex(90), 3);
  assert.equal(getNavamshaRashiIndex(100), 6);
  // End of zodiac 359.999° -> Meena (11)
  assert.equal(getNavamshaRashiIndex(359.999), 11);

  // Opposite longitudes (Rahu/Ketu) must ALWAYS be 6 signs apart in D-9
  for (const lon of [0, 7.5, 10, 29.99, 40, 80, 123.456, 179.999]) {
    const d9A = getNavamshaRashiIndex(lon);
    const d9B = getNavamshaRashiIndex((lon + 180) % 360);
    assert.equal((d9A + 6) % 12, d9B, `D-9 opposition failed at ${lon}°`);
  }

  // Exact Nakshatra/Pada boundaries (40° = Rohini Pada 1 [idx 3, pada 1], 80° = Punarvasu Pada 1 [idx 6, pada 1])
  assert.deepEqual(getNakshatraAndPada(0), { nakshatraIndex: 0, pada: 1 });
  assert.deepEqual(getNakshatraAndPada(40), { nakshatraIndex: 3, pada: 1 });
  assert.deepEqual(getNakshatraAndPada(80), { nakshatraIndex: 6, pada: 1 });
  assert.deepEqual(getNakshatraAndPada(120), { nakshatraIndex: 9, pada: 1 });
  assert.deepEqual(getNakshatraAndPada(359.999), { nakshatraIndex: 26, pada: 4 });

  // formatDMS must never round 29.996° inside a sign up to 30°00′
  assert.equal(formatDMS(29.996), '29°59′');
  assert.equal(formatDMS(0), '00°00′');
  assert.equal(formatDMS(15.5), '15°30′');
});

test('Audit 7: Vimshottari Mahadasha spans exactly 120.0000 years with continuous, clamped Antardashas', () => {
  const birth = new Date(Date.UTC(1990, 5, 15, 6, 0, 0));
  // Test mid-Nakshatra birth (Moon at 45° = 5° into Rohini, elapsed = 5 / 13.3333 = 37.5%, remaining = 62.5% of Moon 10y = 6.25y)
  const atBirth = computeVimshottariDasha(birth, 45, new Date(birth.getTime() + 86_400_000));
  assert.equal(atBirth.mahadashas.length, 10);
  assert.equal(atBirth.mahadashas[0].lord, 'moon');
  assert.ok(Math.abs(atBirth.mahadashas[0].years - 6.25) < 1e-9);
  assert.equal(atBirth.mahadashas[9].lord, 'moon');
  assert.ok(Math.abs(atBirth.mahadashas[9].years - 3.75) < 1e-9);

  // Total sum of Mahadasha years must equal 120.0000 years exactly
  const totalYears = atBirth.mahadashas.reduce((acc, m) => acc + m.years, 0);
  assert.ok(Math.abs(totalYears - 120) < 1e-9, `Total Mahadasha years: ${totalYears}`);

  // Antardashas of initial partial Mahadasha must start at birth, end at MD end, be contiguous, and sum to 6.25 yrs
  assert.ok(atBirth.currentAntardashas.length > 0 && atBirth.currentAntardashas.length <= 9);
  assert.equal(atBirth.currentAntardashas[0].startDate.getTime(), birth.getTime());
  assert.equal(
    atBirth.currentAntardashas[atBirth.currentAntardashas.length - 1].endDate.getTime(),
    atBirth.mahadashas[0].endDate.getTime(),
  );
  const adSumBirth = atBirth.currentAntardashas.reduce((acc, a) => acc + a.years, 0);
  assert.ok(Math.abs(adSumBirth - 6.25) < 1e-6, `Birth partial Antardasha sum: ${adSumBirth}`);
  for (let i = 1; i < atBirth.currentAntardashas.length; i++) {
    assert.equal(
      atBirth.currentAntardashas[i].startDate.getTime(),
      atBirth.currentAntardashas[i - 1].endDate.getTime(),
    );
  }

  // Tail balance Mahadasha (idx 9) Antardashas must anchor forward from tail startDate and sum to 3.75 yrs
  const tailMidRef = new Date(atBirth.mahadashas[9].startDate.getTime() + 365 * 86_400_000);
  const atTail = computeVimshottariDasha(birth, 45, tailMidRef);
  assert.equal(atTail.currentMahadasha?.lord, 'moon');
  assert.equal(atTail.currentAntardashas[0].startDate.getTime(), atTail.mahadashas[9].startDate.getTime());
  assert.equal(
    atTail.currentAntardashas[atTail.currentAntardashas.length - 1].endDate.getTime(),
    atTail.mahadashas[9].endDate.getTime(),
  );
  const adSumTail = atTail.currentAntardashas.reduce((acc, a) => acc + a.years, 0);
  assert.ok(Math.abs(adSumTail - 3.75) < 1e-6, `Tail partial Antardasha sum: ${adSumTail}`);
});

test('Audit 8: Leap years, DST/historical time zones, zero coordinates, and historical date parsing', () => {
  // Gregorian leap-year rules
  assert.equal(isGregorianLeapYear(2000), true);
  assert.equal(isGregorianLeapYear(2024), true);
  assert.equal(isGregorianLeapYear(1900), false);
  assert.equal(isGregorianLeapYear(2100), false);
  assert.equal(isGregorianLeapYear(2023), false);
  assert.equal(daysInGregorianMonth(2024, 2), 29);
  assert.equal(daysInGregorianMonth(1900, 2), 28);

  // buildUtcDate: leap day, seconds, non-leap clamping, negative offsets, historical 2-digit year
  const leapUtc = buildUtcDate('2024-02-29', '23:45:30', 330);
  assert.equal(leapUtc.toISOString(), '2024-02-29T18:15:30.000Z');

  // 1900 was NOT a leap year -> 1900-02-29 must clamp to 1900-02-28 (no silent March 1 rollover)
  const nonLeapClamped = buildUtcDate('1900-02-29', '12:00', 0);
  assert.equal(nonLeapClamped.toISOString(), '1900-02-28T12:00:00.000Z');

  // Historical 2-digit year 0050 must NOT become 1950
  const year50 = buildUtcDate('0050-06-15', '06:00', 0);
  assert.equal(year50.getUTCFullYear(), 50);

  // DST & historical timezone resolution
  const london = getPanchangCityById('london');
  const newYork = getPanchangCityById('new-york');
  const newDelhi = getPanchangCityById('new-delhi');
  const kolkata = getPanchangCityById('kolkata');

  assert.equal(getCityUtcOffsetMinutesForDate(london, '2024-01-15', '12:00'), 0); // GMT
  assert.equal(getCityUtcOffsetMinutesForDate(london, '2024-07-15', '12:00'), 60); // BST
  assert.equal(getCityUtcOffsetMinutesForDate(newYork, '2024-01-15', '12:00'), -300); // EST
  assert.equal(getCityUtcOffsetMinutesForDate(newYork, '2024-07-15', '12:00'), -240); // EDT
  assert.equal(getCityUtcOffsetMinutesForDate(newDelhi, '1947-08-15', '00:00'), 330); // IST
  assert.equal(getCityUtcOffsetMinutesForDate(newDelhi, '1943-08-15', '12:00'), 390); // India War Time
  assert.equal(getCityUtcOffsetMinutesForDate(kolkata, '1863-01-12', '06:33'), Math.round(kolkata.lon * 4)); // Pre-1906 LMT (+353)

  // Regression test for falsy-zero bug in BirthDetailsForm: custom lat=0, lon=0, UTC+0 must NOT fall back to Guwahati IST
  const zeroForm = createDefaultBirthFormState({
    cityId: 'guwahati',
    useCustomCoords: true,
    customLat: '0',
    customLon: '0',
    customUtcHours: '0',
    dateStr: '2024-03-20',
    timeStr: '12:00',
  });
  const zeroBirth = formStateToBirthInput(zeroForm);
  assert.equal(zeroBirth.lat, 0);
  assert.equal(zeroBirth.lon, 0);
  assert.equal(zeroBirth.utcOffsetMinutes, 0);

  // Verify Rahu/Ketu exact opposition across 1860-2040
  for (const iso of ['1863-01-12T00:40:00Z', '1947-08-14T18:30:00Z', '2000-01-01T00:00:00Z', '2035-09-21T12:00:00Z']) {
    const dt = new Date(iso);
    const r = getSiderealLongitude('rahu', dt);
    const k = getSiderealLongitude('ketu', dt);
    const sep = Math.abs(((k - r + 360) % 360) - 180);
    assert.ok(sep < 1e-9, `Rahu-Ketu opposition failed at ${iso}: ${sep}`);
  }
});

// ============================================================================
// SADE SATI & SHANI DHAIYA AUDIT: 2020–2028 SATURN TRANSITS & RETROGRADE LOOPS
// ============================================================================

test('Sade Sati Audit 1: 2020–2028 Lahiri sidereal Saturn sign ingresses & retrograde re-entries match astronomical references', () => {
  const transits = computeSaturnTransits(
    new Date(Date.UTC(2019, 0, 1)),
    new Date(Date.UTC(2031, 0, 1)),
  );

  // Extract IST civil dates for every computed transit interval in 2020–2028
  const summaryIst = transits
    .filter((iv) => iv.startDate.getUTCFullYear() >= 2020 && iv.startDate.getUTCFullYear() <= 2028)
    .map((iv) => ({
      sign: iv.rashiId,
      startIst: getTimeZoneDateIso(iv.startDate, 'Asia/Kolkata', 330),
      endIst: getTimeZoneDateIso(iv.endDate, 'Asia/Kolkata', 330),
      retroEntry: iv.isRetrogradeEntry,
      retroExit: iv.isRetrogradeExit,
    }));

  // Independent astronomical reference milestones (IST):
  // 1) Capricorn: 2020-01-24 -> 2022-04-29
  // 2) Early Aquarius: 2022-04-29 -> 2022-07-12 (retrograde exit back to Capricorn)
  // 3) Retrograde return to Capricorn: 2022-07-12 -> 2023-01-17
  // 4) Aquarius re-entry: 2023-01-17 -> 2025-03-29
  // 5) Pisces: 2025-03-29 -> 2027-06-03
  // 6) Aries: 2027-06-03 -> 2027-10-20 (retrograde exit back to Pisces)
  // 7) Retrograde return to Pisces: 2027-10-20 -> 2028-02-23
  // 8) Final entry into Aries: 2028-02-23 -> 2029-08-08
  assert.deepEqual(summaryIst, [
    { sign: 'makara', startIst: '2020-01-24', endIst: '2022-04-29', retroEntry: false, retroExit: false },
    { sign: 'kumbha', startIst: '2022-04-29', endIst: '2022-07-12', retroEntry: false, retroExit: true },
    { sign: 'makara', startIst: '2022-07-12', endIst: '2023-01-17', retroEntry: true, retroExit: false },
    { sign: 'kumbha', startIst: '2023-01-17', endIst: '2025-03-29', retroEntry: false, retroExit: false },
    { sign: 'meena', startIst: '2025-03-29', endIst: '2027-06-03', retroEntry: false, retroExit: false },
    { sign: 'mesha', startIst: '2027-06-03', endIst: '2027-10-20', retroEntry: false, retroExit: true },
    { sign: 'meena', startIst: '2027-10-20', endIst: '2028-02-23', retroEntry: true, retroExit: false },
    { sign: 'mesha', startIst: '2028-02-23', endIst: '2029-08-08', retroEntry: false, retroExit: false },
  ]);
});

test('Sade Sati Audit 2: Rising, Peak, Setting intervals, retrograde returns, and ending dates for affected Moon signs', () => {
  const mkBirth = (dateStr: string) => ({
    name: '',
    dateStr,
    timeStr: '10:15',
    lat: 26.1445,
    lon: 91.7362,
    utcOffsetMinutes: 330,
  });
  const toIst = (d: Date | null) => (d ? getTimeZoneDateIso(d, 'Asia/Kolkata', 330) : null);
  const nov2026 = new Date(Date.UTC(2026, 10, 24, 6, 0, 0));

  // 1) Aquarius Moon (Kumbha): Active Setting phase in Nov 2026; 6 separate intervals incl. 2022 & 2027-2028 retrogrades
  const kumbha = computeSadeSati(mkBirth('1994-08-22'), nov2026);
  assert.equal(kumbha.natalMoonRashiId, 'kumbha');
  assert.equal(kumbha.status, 'setting');
  assert.equal(toIst(kumbha.sadeSatiStartDate), '2020-01-24');
  assert.equal(toIst(kumbha.sadeSatiEndDate), '2028-02-23');
  assert.deepEqual(
    kumbha.windows.map((w) => ({
      phase: w.phase,
      start: toIst(w.startDate),
      end: toIst(w.endDate),
      retro: w.isRetrogradeEntry,
      reentry: w.isReentry,
    })),
    [
      { phase: 'rising', start: '2020-01-24', end: '2022-04-29', retro: false, reentry: false },
      { phase: 'peak', start: '2022-04-29', end: '2022-07-12', retro: false, reentry: false },
      { phase: 'rising', start: '2022-07-12', end: '2023-01-17', retro: true, reentry: true },
      { phase: 'peak', start: '2023-01-17', end: '2025-03-29', retro: false, reentry: true },
      { phase: 'setting', start: '2025-03-29', end: '2027-06-03', retro: false, reentry: false },
      { phase: 'setting', start: '2027-10-20', end: '2028-02-23', retro: true, reentry: true },
    ],
  );

  // 2) Pisces Moon (Meena): Active Peak phase in Nov 2026; starts 29 Apr 2022, ends 17 Apr 2030
  const meena = computeSadeSati(mkBirth('1994-08-24'), nov2026);
  assert.equal(meena.natalMoonRashiId, 'meena');
  assert.equal(meena.status, 'peak');
  assert.equal(toIst(meena.sadeSatiStartDate), '2022-04-29');
  assert.equal(toIst(meena.sadeSatiEndDate), '2030-04-17');
  // Must show separate Peak (2025-03-29..2027-06-03), Setting (2027-06-03..2027-10-20), Retrograde Peak (2027-10-20..2028-02-23), Setting re-entry (2028-02-23..)
  assert.ok(meena.windows.some((w) => w.phase === 'peak' && toIst(w.startDate) === '2027-10-20' && toIst(w.endDate) === '2028-02-23' && w.isRetrogradeEntry));
  assert.ok(meena.windows.some((w) => w.phase === 'setting' && toIst(w.startDate) === '2028-02-23' && w.isReentry));

  // 3) Aries Moon (Mesha): Active Rising phase in Nov 2026; starts 29 Mar 2025
  const mesha = computeSadeSati(mkBirth('1994-08-26'), nov2026);
  assert.equal(mesha.natalMoonRashiId, 'mesha');
  assert.equal(mesha.status, 'rising');
  assert.equal(toIst(mesha.sadeSatiStartDate), '2025-03-29');
  assert.ok(mesha.windows.some((w) => w.phase === 'rising' && toIst(w.startDate) === '2025-03-29' && toIst(w.endDate) === '2027-06-03'));
  assert.ok(mesha.windows.some((w) => w.phase === 'peak' && toIst(w.startDate) === '2027-06-03' && toIst(w.endDate) === '2027-10-20'));
  assert.ok(mesha.windows.some((w) => w.phase === 'rising' && toIst(w.startDate) === '2027-10-20' && toIst(w.endDate) === '2028-02-23' && w.isRetrogradeEntry));
  assert.ok(mesha.windows.some((w) => w.phase === 'peak' && toIst(w.startDate) === '2028-02-23' && w.isReentry));

  // 4) Capricorn Moon (Makara) during active Setting phase (Jun 2024): ends 29 Mar 2025
  const makara = computeSadeSati(mkBirth('1994-08-19'), new Date(Date.UTC(2024, 5, 15, 6, 0, 0)));
  assert.equal(makara.natalMoonRashiId, 'makara');
  assert.equal(makara.status, 'setting');
  assert.equal(toIst(makara.sadeSatiEndDate), '2025-03-29');

  // 5) Sagittarius Moon (Dhanu) during active Setting phase (Jun 2021): ends 17 Jan 2023 after 2022 Capricorn retro return
  const dhanu2021 = computeSadeSati(mkBirth('1994-08-17'), new Date(Date.UTC(2021, 5, 15, 6, 0, 0)));
  assert.equal(dhanu2021.natalMoonRashiId, 'dhanu');
  assert.equal(dhanu2021.status, 'setting');
  assert.equal(toIst(dhanu2021.sadeSatiEndDate), '2023-01-17');
  assert.ok(dhanu2021.windows.some((w) => w.phase === 'setting' && toIst(w.startDate) === '2022-07-12' && toIst(w.endDate) === '2023-01-17' && w.isRetrogradeEntry));
});

test('Sade Sati Audit 3: Shani Dhaiya periods & birthplace timezone date formatting', () => {
  const mkBirth = (dateStr: string) => ({
    name: '',
    dateStr,
    timeStr: '10:15',
    lat: 26.1445,
    lon: 91.7362,
    utcOffsetMinutes: 330,
  });
  const toIst = (d: Date) => getTimeZoneDateIso(d, 'Asia/Kolkata', 330);
  const nov2026 = new Date(Date.UTC(2026, 10, 24, 6, 0, 0));

  // Sagittarius Moon -> 4th House Dhaiya (Kantaka Shani) when Saturn is in Pisces (2025-03-29..2027-06-03 & 2027-10-20..2028-02-23)
  const dhanu = computeSadeSati(mkBirth('1994-08-17'), nov2026);
  assert.equal(dhanu.status, 'dhaiya_4');
  const dhanuD4 = dhanu.dhaiyaWindows.filter((w) => w.type === 'dhaiya_4');
  assert.deepEqual(
    dhanuD4.map((w) => ({ start: toIst(w.startDate), end: toIst(w.endDate), retro: w.isRetrogradeEntry })),
    [
      { start: '2025-03-29', end: '2027-06-03', retro: false },
      { start: '2027-10-20', end: '2028-02-23', retro: true },
    ],
  );

  // Leo Moon -> 8th House Dhaiya (Ashtama Shani) when Saturn is in Pisces (exact same intervals)
  const simha = computeSadeSati(mkBirth('1994-08-08'), nov2026);
  assert.equal(simha.status, 'dhaiya_8');
  const simhaD8 = simha.dhaiyaWindows.filter((w) => w.type === 'dhaiya_8');
  assert.deepEqual(
    simhaD8.map((w) => ({ start: toIst(w.startDate), end: toIst(w.endDate), retro: w.isRetrogradeEntry })),
    [
      { start: '2025-03-29', end: '2027-06-03', retro: false },
      { start: '2027-10-20', end: '2028-02-23', retro: true },
    ],
  );

  // Cancer Moon in Jun 2024 -> 8th House Dhaiya in Aquarius (29 Apr–12 Jul 2022 & 17 Jan 2023–29 Mar 2025)
  const karka = computeSadeSati(mkBirth('1994-08-06'), new Date(Date.UTC(2024, 5, 15, 6, 0, 0)));
  assert.equal(karka.status, 'dhaiya_8');
  const karkaD8 = karka.dhaiyaWindows.filter((w) => w.type === 'dhaiya_8');
  assert.deepEqual(
    karkaD8.map((w) => ({ start: toIst(w.startDate), end: toIst(w.endDate), reentry: w.isReentry })),
    [
      { start: '2022-04-29', end: '2022-07-12', reentry: false },
      { start: '2023-01-17', end: '2025-03-29', reentry: true },
    ],
  );

  // Birthplace timezone date shift verification (IST vs New York EDT/EST)
  const kumbha = computeSadeSati(mkBirth('1994-08-22'), nov2026);
  const ariesIngress = kumbha.windows.find((w) => w.phase === 'setting' && !w.isReentry)!.endDate; // 2027-06-03T00:33Z
  const piscesRetroReturn = kumbha.windows.find((w) => w.phase === 'setting' && w.isRetrogradeEntry)!.startDate; // 2027-10-20T00:48Z
  const capricornIngress = kumbha.sadeSatiStartDate!; // 2020-01-24T04:33Z

  assert.equal(formatDateInTimeZone(ariesIngress, 'en', 'Asia/Kolkata', 330), '3 June 2027');
  assert.equal(formatDateInTimeZone(ariesIngress, 'en', 'America/New_York', -300), '2 June 2027');
  assert.equal(formatDateInTimeZone(piscesRetroReturn, 'en', 'Asia/Kolkata', 330), '20 October 2027');
  assert.equal(formatDateInTimeZone(piscesRetroReturn, 'en', 'America/New_York', -300), '19 October 2027');
  assert.equal(formatDateInTimeZone(capricornIngress, 'en', 'Asia/Kolkata', 330), '24 January 2020');
  assert.equal(formatDateInTimeZone(capricornIngress, 'en', 'America/New_York', -300), '23 January 2020');
});
