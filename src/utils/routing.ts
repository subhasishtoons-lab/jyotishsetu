
import type { ZodiacId } from '../i18n/types';

// Custom domain uses the website root.
export const BASE_PATH = '/';

export type RoutePage =
  | { kind: 'home' }
  | { kind: 'kundli' }
  | { kind: 'horoscope'; sign?: ZodiacId }
  | { kind: 'panchang' }
  | { kind: 'matching' }
  | { kind: 'numerology' }
  | { kind: 'tools'; toolSlug?: 'sade-sati' | 'mangal-dosha' | 'nakshatra-finder' | 'muhurat' }
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
  'muhurat',
]);

/**
 * Normalizes a URL into an app-relative path.
 * Examples: / -> /, /kundli -> /kundli.
 */
export function stripBasePath(rawPath: string): string {
  const withoutQuery = rawPath.split('?')[0]?.split('#')[0] ?? '/';
  const collapsed = withoutQuery.replace(/\/{2,}/g, '/');
  const ensuredLeading = collapsed.startsWith('/')
    ? collapsed
    : `/${collapsed}`;

  const trimmed = ensuredLeading.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function normalizePathname(rawPath: string): string {
  return stripBasePath(rawPath);
}

/**
 * Custom-domain URLs use root-relative paths.
 * Homepage -> /
 * Subpages -> /kundli, /panchang, etc.
 */
export function withBasePath(appPath: string): string {
  return stripBasePath(appPath);
}

/**
 * Restores a route from the GitHub Pages 404.html fallback.
 */
export function resolveGitHubPagesRedirect(
  search: string,
  hash = '',
): string | null {
  if (!search || !search.includes('p=')) return null;

  try {
    const params = new URLSearchParams(search);
    const rawPath = params.get('p');
    if (!rawPath) return null;

    const targetPath = withBasePath(rawPath);
    const rawQuery = params.get('q');
    const queryPart = rawQuery ? `?${rawQuery}` : '';

    return `${targetPath}${queryPart}${hash}`;
  } catch {
    return null;
  }
}

export function parseRoute(pathname: string): RoutePage {
  const path = stripBasePath(pathname);

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

  if (path === '/muhurat') {
    return { kind: 'tools', toolSlug: 'muhurat' };
  }

  if (path === '/tools') return { kind: 'tools' };

  if (path.startsWith('/tools/')) {
    const slug = path.slice('/tools/'.length);
    if (VALID_TOOL_SLUGS.has(slug)) {
      return {
        kind: 'tools',
        toolSlug: slug as
          | 'sade-sati'
          | 'mangal-dosha'
          | 'nakshatra-finder'
          | 'muhurat',
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
