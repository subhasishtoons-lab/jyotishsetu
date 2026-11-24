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
import { parseRoute, normalizePathname, getActiveNavKey } from './routing';
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

test('SPA route parser handles core pages, nested zodiac/blog/tool routes, and unknown fallbacks', () => {
  assert.equal(normalizePathname('/kundli/'), '/kundli');
  assert.equal(normalizePathname('/'), '/');

  assert.deepEqual(parseRoute('/'), { kind: 'home' });
  assert.deepEqual(parseRoute('/kundli'), { kind: 'kundli' });
  assert.deepEqual(parseRoute('/panchang'), { kind: 'panchang' });
  assert.deepEqual(parseRoute('/matching'), { kind: 'matching' });
  assert.deepEqual(parseRoute('/numerology'), { kind: 'numerology' });
  assert.deepEqual(parseRoute('/horoscope'), { kind: 'horoscope' });
  assert.deepEqual(parseRoute('/horoscope/simha'), { kind: 'horoscope', sign: 'simha' });
  assert.deepEqual(parseRoute('/horoscope/unknown-sign'), { kind: 'horoscope' });
  assert.deepEqual(parseRoute('/tools/sade-sati'), { kind: 'tools', toolSlug: 'sade-sati' });
  assert.deepEqual(parseRoute('/tools/mangal-dosha'), { kind: 'tools', toolSlug: 'mangal-dosha' });
  assert.deepEqual(parseRoute('/tools/nakshatra-finder'), {
    kind: 'tools',
    toolSlug: 'nakshatra-finder',
  });
  assert.deepEqual(parseRoute('/blog/twenty-seven-nakshatras-lunar-mansions'), {
    kind: 'blog',
    slug: 'twenty-seven-nakshatras-lunar-mansions',
  });
  assert.deepEqual(parseRoute('/about'), { kind: 'about' });
  assert.deepEqual(parseRoute('/contact'), { kind: 'contact' });
  assert.deepEqual(parseRoute('/privacy'), { kind: 'privacy' });
  assert.deepEqual(parseRoute('/terms'), { kind: 'terms' });
  assert.deepEqual(parseRoute('/disclaimer'), { kind: 'disclaimer' });
  assert.deepEqual(parseRoute('/nonexistent-page'), { kind: 'home' });

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
