
import type { ZodiacId } from '../i18n/types';

// Active GitHub Pages deployment lives under /jyotishsetu/.
// A future custom domain can override this to "/" via VITE_BASE_PATH=/ at build time.
export const DEFAULT_GITHUB_PAGES_BASE_PATH = '/jyotishsetu';
export const CUSTOM_DOMAIN_BASE_PATH = '/';

export function normalizeBasePath(rawBase?: string | null): string {
  const trimmed = (rawBase ?? '').trim();
  if (!trimmed || trimmed === '/') return '/';
  const collapsed = trimmed.replace(/\/{2,}/g, '/');
  const ensuredLeading = collapsed.startsWith('/') ? collapsed : `/${collapsed}`;
  const withoutTrailing = ensuredLeading.replace(/\/+$/, '');
  return withoutTrailing === '' ? '/' : withoutTrailing;
}

function resolveConfiguredBasePath(): string {
  const metaEnv = (
    import.meta as unknown as { env?: { BASE_URL?: string; VITE_BASE_PATH?: string } }
  ).env;
  if (metaEnv?.VITE_BASE_PATH) {
    return normalizeBasePath(metaEnv.VITE_BASE_PATH);
  }
  if (metaEnv?.BASE_URL) {
    return normalizeBasePath(metaEnv.BASE_URL);
  }
  if (typeof process !== 'undefined' && process.env?.VITE_BASE_PATH) {
    return normalizeBasePath(process.env.VITE_BASE_PATH);
  }
  return DEFAULT_GITHUB_PAGES_BASE_PATH;
}

export const BASE_PATH = resolveConfiguredBasePath();

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
 * Strips the configured deployment base path (default: /jyotishsetu) and normalizes
 * into an app-relative path.
 * Examples (with /jyotishsetu): /jyotishsetu/ -> /, /jyotishsetu/kundli/ -> /kundli, /kundli -> /kundli.
 */
export function stripBasePath(rawPath: string, basePath: string = BASE_PATH): string {
  const withoutQuery = rawPath.split('?')[0]?.split('#')[0] ?? '/';
  const collapsed = withoutQuery.replace(/\/{2,}/g, '/');
  const ensuredLeading = collapsed.startsWith('/')
    ? collapsed
    : `/${collapsed}`;

  const normalizedBase = normalizeBasePath(basePath);
  let stripped = ensuredLeading;
  if (normalizedBase !== '/') {
    if (stripped === normalizedBase) {
      stripped = '/';
    } else if (stripped.startsWith(`${normalizedBase}/`)) {
      stripped = stripped.slice(normalizedBase.length);
    }
  }

  const trimmed = stripped.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function normalizePathname(rawPath: string, basePath: string = BASE_PATH): string {
  return stripBasePath(rawPath, basePath);
}

/**
 * Prepends the configured deployment base path (default: /jyotishsetu) to an app route.
 * With /jyotishsetu: / -> /jyotishsetu/, /kundli -> /jyotishsetu/kundli.
 * With future custom domain /: / -> /, /kundli -> /kundli.
 */
export function withBasePath(appPath: string, basePath: string = BASE_PATH): string {
  const cleanAppPath = stripBasePath(appPath, basePath);
  const normalizedBase = normalizeBasePath(basePath);
  if (normalizedBase === '/') {
    return cleanAppPath;
  }
  return cleanAppPath === '/' ? `${normalizedBase}/` : `${normalizedBase}${cleanAppPath}`;
}

/**
 * Restores a route from the GitHub Pages 404.html fallback (?p=<route>&q=<query>).
 */
export function resolveGitHubPagesRedirect(
  search: string,
  hash = '',
  basePath: string = BASE_PATH,
): string | null {
  if (!search || !search.includes('p=')) return null;

  try {
    const params = new URLSearchParams(search);
    const rawPath = params.get('p');
    if (!rawPath) return null;

    const targetPath = withBasePath(rawPath, basePath);
    const rawQuery = params.get('q');
    const queryPart = rawQuery ? `?${rawQuery}` : '';

    return `${targetPath}${queryPart}${hash}`;
  } catch {
    return null;
  }
}

export function parseRoute(pathname: string, basePath: string = BASE_PATH): RoutePage {
  const path = stripBasePath(pathname, basePath);

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
