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

test('all three languages exist with complete zodiac, tools, blog, and panchang parity', () => {
  assert.equal(SUPPORTED_LANGUAGES.length, 3);
  const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
  assert.deepEqual(codes, ['en', 'hi', 'as']);

  const enToolIds = TRANSLATIONS.en.quickTools.items.map((t) => t.id);
  const enSignIds = TRANSLATIONS.en.horoscope.signs.map((s) => s.id);
  const enArticleSlugs = TRANSLATIONS.en.blog.articles.map((a) => a.slug);

  assert.equal(enToolIds.length, 8);
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

    const fields = dict.panchang.data.fields;
    for (const key of [
      'date',
      'tithi',
      'nakshatra',
      'yoga',
      'karana',
      'sunrise',
      'sunset',
      'rahuKaal',
    ] as const) {
      assert.ok(fields[key].label.length > 0, `${code}: panchang.${key}.label`);
      assert.ok(fields[key].value.length > 0, `${code}: panchang.${key}.value`);
    }
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

  assert.equal(
    resolveGitHubPagesRedirect('?p=%2Fkundli'),
    '/jyotishsetu/kundli',
  );
  assert.equal(
    resolveGitHubPagesRedirect('?p=%2Fhoroscope%2Fsimha&q=ref%3Dshare', '#details'),
    '/jyotishsetu/horoscope/simha?ref=share#details',
  );
  assert.equal(resolveGitHubPagesRedirect('?foo=bar'), null);
});

test('SPA route parser handles /jyotishsetu/ prefixed and relative routes across all pages', () => {
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

  assert.equal(getActiveNavKey({ kind: 'tools', toolSlug: 'sade-sati' }), 'tools');
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
    subject: 'Phase 2 Kundli Suggestion',
    message: 'Looking forward to the Assamese and Hindi Kundli PDF support.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
