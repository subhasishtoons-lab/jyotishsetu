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
import {
  PANCHANG_CITIES,
  PANCHANG_CITY_STORAGE_KEY,
  DEFAULT_PANCHANG_CITY_ID,
  getPanchangCityById,
  loadSavedPanchangCity,
  savePanchangCity,
  formatPanchangDate,
  formatLocalTime,
} from './panchang';
import {
  getLahiriAyanamsha,
  computeKundli,
  computeLivePanchang,
  computeAshtakoota,
  computeMangalDosha,
  computeSadeSati,
  computeNakshatraDetails,
  computeNumerology,
  computeCurrentTransits,
} from './vedicAstrology';
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
  }
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
  assert.equal(sadeSati.windows.length, 3);

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
