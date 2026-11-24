import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { parseRoute, normalizePathname, type RoutePage } from '../utils/routing';
import { useLanguage } from './LanguageContext';

interface RouterContextValue {
  pathname: string;
  route: RoutePage;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/',
  );

  const navigate = useCallback((to: string) => {
    const nextPath = normalizePathname(to);
    if (typeof window !== 'undefined') {
      if (normalizePathname(window.location.pathname) !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setPathname(nextPath);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePathname(window.location.pathname));
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
      case 'kundli':
        title = t.seo.kundliTitle;
        description = t.comingSoonPages.kundli.subtitle;
        break;
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
      case 'matching':
        title = t.seo.matchingTitle;
        description = t.comingSoonPages.matching.subtitle;
        break;
      case 'numerology':
        title = t.seo.numerologyTitle;
        description = t.comingSoonPages.numerology.subtitle;
        break;
      case 'tools':
        if (route.toolSlug === 'sade-sati') {
          title = `${t.comingSoonPages.sadeSati.title} | ${t.brand.name}`;
          description = t.comingSoonPages.sadeSati.subtitle;
        } else if (route.toolSlug === 'mangal-dosha') {
          title = `${t.comingSoonPages.mangalDosha.title} | ${t.brand.name}`;
          description = t.comingSoonPages.mangalDosha.subtitle;
        } else if (route.toolSlug === 'nakshatra-finder') {
          title = `${t.comingSoonPages.nakshatraFinder.title} | ${t.brand.name}`;
          description = t.comingSoonPages.nakshatraFinder.subtitle;
        } else {
          title = t.seo.toolsTitle;
          description = t.toolsPage.subtitle;
        }
        break;
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
