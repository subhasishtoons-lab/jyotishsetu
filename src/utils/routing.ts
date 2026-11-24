import type { ZodiacId } from '../i18n/types';

export type RoutePage =
  | { kind: 'home' }
  | { kind: 'kundli' }
  | { kind: 'horoscope'; sign?: ZodiacId }
  | { kind: 'panchang' }
  | { kind: 'matching' }
  | { kind: 'numerology' }
  | { kind: 'tools'; toolSlug?: 'sade-sati' | 'mangal-dosha' | 'nakshatra-finder' }
  | { kind: 'blog'; slug?: string }
  | { kind: 'about' }
  | { kind: 'contact' }
  | { kind: 'privacy' }
  | { kind: 'terms' }
  | { kind: 'disclaimer' };

const VALID_ZODIACS: ReadonlySet<string> = new Set<ZodiacId>([
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
]);

const VALID_TOOL_SLUGS: ReadonlySet<string> = new Set([
  'sade-sati',
  'mangal-dosha',
  'nakshatra-finder',
]);

export function normalizePathname(rawPath: string): string {
  const withoutQuery = rawPath.split('?')[0]?.split('#')[0] ?? '/';
  const cleaned = withoutQuery.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export function parseRoute(pathname: string): RoutePage {
  const path = normalizePathname(pathname);
  if (path === '/') return { kind: 'home' };
  if (path === '/kundli') return { kind: 'kundli' };
  if (path === '/panchang') return { kind: 'panchang' };
  if (path === '/matching') return { kind: 'matching' };
  if (path === '/numerology') return { kind: 'numerology' };
  if (path === '/about') return { kind: 'about' };
  if (path === '/contact') return { kind: 'contact' };
  if (path === '/privacy') return { kind: 'privacy' };
  if (path === '/terms') return { kind: 'terms' };
  if (path === '/disclaimer') return { kind: 'disclaimer' };

  if (path === '/horoscope') return { kind: 'horoscope' };
  if (path.startsWith('/horoscope/')) {
    const sign = path.slice('/horoscope/'.length);
    if (VALID_ZODIACS.has(sign)) {
      return { kind: 'horoscope', sign: sign as ZodiacId };
    }
    return { kind: 'horoscope' };
  }

  if (path === '/tools') return { kind: 'tools' };
  if (path.startsWith('/tools/')) {
    const slug = path.slice('/tools/'.length);
    if (VALID_TOOL_SLUGS.has(slug)) {
      return {
        kind: 'tools',
        toolSlug: slug as 'sade-sati' | 'mangal-dosha' | 'nakshatra-finder',
      };
    }
    return { kind: 'tools' };
  }

  if (path === '/blog') return { kind: 'blog' };
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length);
    if (slug.length > 0) {
      return { kind: 'blog', slug };
    }
    return { kind: 'blog' };
  }

  return { kind: 'home' };
}

export function getActiveNavKey(route: RoutePage): string {
  switch (route.kind) {
    case 'home':
      return 'home';
    case 'kundli':
      return 'kundli';
    case 'horoscope':
      return 'horoscope';
    case 'panchang':
      return 'panchang';
    case 'matching':
      return 'matching';
    case 'numerology':
      return 'numerology';
    case 'tools':
      return 'tools';
    case 'blog':
      return 'blog';
    default:
      return '';
  }
}
