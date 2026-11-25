import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  parseRoute,
  stripBasePath,
  withBasePath,
  resolveGitHubPagesRedirect,
  type RoutePage,
} from '../utils/routing';
import { useLanguage } from './LanguageContext';

interface RouterContextValue {
  pathname: string;
  route: RoutePage;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function getInitialAppPath(): string {
  if (typeof window === 'undefined') return '/';
  const restored = resolveGitHubPagesRedirect(window.location.search, window.location.hash);
  if (restored) {
    window.history.replaceState({}, '', restored);
    return stripBasePath(restored);
  }
  const appPath = stripBasePath(window.location.pathname);
  const canonicalUrl = withBasePath(appPath);
  if (window.location.pathname !== canonicalUrl) {
    window.history.replaceState(
      {},
      '',
      `${canonicalUrl}${window.location.search}${window.location.hash}`,
    );
  }
  return appPath;
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [pathname, setPathname] = useState<string>(() => getInitialAppPath());

  const navigate = useCallback((to: string) => {
    const appPath = stripBasePath(to);
    const fullUrl = withBasePath(appPath);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== fullUrl) {
        window.history.pushState({}, '', fullUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setPathname(appPath);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(stripBasePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = useMemo(() => parseRoute(pathname), [pathname]);

  // Dynamic SEO page title and meta description per route & language
  useEffect(() => {
    let title = t.seo.homeTitle;
    let description = t.seo.homeDescription;

    switch (route.kind) {
      case 'home':
        title = t.seo.homeTitle;
        description = t.seo.homeDescription;
        break;
      case 'kundli': {
        const tool = t.quickTools.items.find((item) => item.id === 'free-kundli');
        title = t.seo.kundliTitle;
        description = tool?.description ?? t.seo.homeDescription;
        break;
      }
      case 'horoscope': {
        if (route.sign) {
          const sign = t.horoscope.signs.find((s) => s.id === route.sign);
          if (sign) {
            title = `${sign.name} – ${t.seo.horoscopeTitle}`;
            description = sign.shortForecast;
            break;
          }
        }
        title = t.seo.horoscopeTitle;
        description = t.horoscope.subtitle;
        break;
      }
      case 'panchang':
        title = t.seo.panchangTitle;
        description = t.panchang.subtitle;
        break;
      case 'matching': {
        const tool = t.quickTools.items.find((item) => item.id === 'kundli-matching');
        title = t.seo.matchingTitle;
        description = tool?.description ?? t.seo.homeDescription;
        break;
      }
      case 'numerology': {
        const tool = t.quickTools.items.find((item) => item.id === 'numerology');
        title = t.seo.numerologyTitle;
        description = tool?.description ?? t.seo.homeDescription;
        break;
      }
      case 'tools': {
        if (route.toolSlug === 'sade-sati') {
          const tool = t.quickTools.items.find((item) => item.id === 'sade-sati');
          title = `${tool?.title ?? 'Sade Sati Calculator'} | ${t.brand.name}`;
          description = tool?.description ?? t.toolsPage.subtitle;
        } else if (route.toolSlug === 'mangal-dosha') {
          const tool = t.quickTools.items.find((item) => item.id === 'mangal-dosha');
          title = `${tool?.title ?? 'Mangal Dosha Calculator'} | ${t.brand.name}`;
          description = tool?.description ?? t.toolsPage.subtitle;
        } else if (route.toolSlug === 'nakshatra-finder') {
          const tool = t.quickTools.items.find((item) => item.id === 'nakshatra-finder');
          title = `${tool?.title ?? 'Nakshatra Finder'} | ${t.brand.name}`;
          description = tool?.description ?? t.toolsPage.subtitle;
        } else if (route.toolSlug === 'muhurat') {
          const tool = t.quickTools.items.find((item) => item.id === 'muhurat-finder');
          title = `${tool?.title ?? 'Muhurat Finder'} | ${t.brand.name}`;
          description = tool?.description ?? t.panchang.subtitle;
        } else {
          title = t.seo.toolsTitle;
          description = t.toolsPage.subtitle;
        }
        break;
      }
      case 'blog': {
        if (route.slug) {
          const article = t.blog.articles.find((a) => a.slug === route.slug);
          if (article) {
            title = `${article.title} | ${t.brand.name}`;
            description = article.excerpt;
            break;
          }
        }
        title = t.seo.blogTitle;
        description = t.blog.subtitle;
        break;
      }
      case 'about':
        title = t.seo.aboutTitle;
        description = t.infoPages.about.lead;
        break;
      case 'contact':
        title = t.seo.contactTitle;
        description = t.infoPages.contact.lead;
        break;
      case 'privacy':
        title = t.seo.privacyTitle;
        description = t.infoPages.privacy.sections[0]?.body ?? t.seo.homeDescription;
        break;
      case 'terms':
        title = t.seo.termsTitle;
        description = t.infoPages.terms.sections[0]?.body ?? t.seo.homeDescription;
        break;
      case 'disclaimer':
        title = t.seo.disclaimerTitle;
        description = t.infoPages.disclaimer.sections[0]?.body ?? t.seo.homeDescription;
        break;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [route, t]);

  const value = useMemo(() => ({ pathname, route, navigate }), [pathname, route, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
