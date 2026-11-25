import React, { useState, useRef, useEffect } from 'react';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { getActiveNavKey } from '../utils/routing';
import { JyotishLogoMark } from './artwork/JyotishLogo';
import { Link } from './Link';

export function Header() {
  const { language, setLanguage, t, languages } = useLanguage();
  const { route } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const activeNav = getActiveNavKey(route);

  const navItems = [
    { key: 'home', label: t.nav.home, to: '/' },
    { key: 'kundli', label: t.nav.freeKundli, to: '/kundli' },
    { key: 'horoscope', label: t.nav.horoscope, to: '/horoscope' },
    { key: 'panchang', label: t.nav.panchang, to: '/panchang' },
    { key: 'matching', label: t.nav.kundliMatching, to: '/matching' },
    { key: 'numerology', label: t.nav.numerology, to: '/numerology' },
    { key: 'tools', label: t.nav.astrologyTools, to: '/tools' },
    { key: 'blog', label: t.nav.blog, to: '/blog' },
  ];

  const currentLangOption = languages.find((l) => l.code === language) ?? languages[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#351016]/97 backdrop-blur-md border-b border-[#D8AD59]/25">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 shrink-0 whitespace-nowrap group"
        >
          <JyotishLogoMark size={34} className="shrink-0" />
          <span className="font-display text-lg sm:text-xl font-semibold tracking-wide text-[#F8F0E3] whitespace-nowrap">
            {t.brand.name}
          </span>
        </Link>

        {/* Zone 2: Desktop Navigation (8 primary links, clean single-line typography) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-3.5 2xl:gap-6 min-w-0"
        >
          {navItems.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <Link
                key={item.key}
                to={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-[12.5px] 2xl:text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#EBD08D]'
                    : 'text-[#F8F0E3]/85 hover:text-[#EBD08D]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-[#D8AD59] via-[#E99A32] to-[#D8AD59]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher + Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-expanded={langMenuOpen}
              aria-haspopup="listbox"
              aria-label={t.nav.languageLabel}
              className="inline-flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-md border border-[#D8AD59]/35 bg-[#24090E]/70 text-[#F8F0E3] text-xs font-medium hover:border-[#D8AD59] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#D8AD59] shrink-0" aria-hidden="true" />
              <span>{currentLangOption.nativeLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#D8AD59]/80 transition-transform duration-150 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langMenuOpen && (
              <div
                role="listbox"
                aria-label={t.nav.languageLabel}
                className="absolute right-0 mt-2 w-40 rounded-md bg-[#2A0B11] border border-[#D8AD59]/40 shadow-xl py-1 z-50"
              >
                {languages.map((opt) => {
                  const selected = opt.code === language;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#D8AD59]/20 text-[#F5DC9B] font-semibold'
                          : 'text-[#F8F0E3]/85 hover:bg-[#4A1820] hover:text-[#F8F0E3]'
                      }`}
                    >
                      <span>{opt.nativeLabel}</span>
                      <span className="text-[11px] text-[#D8AD59]/80">{opt.code.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Prominent Generate Free Kundli Button (Desktop & Tablet) */}
          <Link
            to="/kundli"
            className="hidden sm:inline-flex items-center justify-center h-9 px-3 xl:px-4 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-xs font-semibold tracking-wide hover:brightness-105 transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            {t.nav.ctaGenerateKundli}
          </Link>

          {/* Mobile / Tablet Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#D8AD59]/30 text-[#F8F0E3] hover:bg-[#4A1820] transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#D8AD59]" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-[#D8AD59]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden border-t border-[#D8AD59]/20 bg-[#290B10] px-4 pt-3 pb-6 shadow-2xl"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#D8AD59]/15 text-[#F5DC9B]'
                      : 'text-[#F8F0E3]/90 hover:bg-[#3F131A]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Language Switcher Segmented Controls */}
          <div className="mt-4 pt-4 border-t border-[#D8AD59]/20">
            <p className="text-xs text-[#D8AD59] mb-2.5 font-medium">{t.nav.languageLabel}</p>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((opt) => {
                const selected = opt.code === language;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                    }}
                    className={`py-2.5 px-2 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#D8AD59] text-[#2B0A10] border-[#D8AD59] font-semibold'
                        : 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]/30 hover:border-[#D8AD59]'
                    }`}
                  >
                    {opt.nativeLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Prominent CTA */}
          <div className="mt-4">
            <Link
              to="/kundli"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold tracking-wide"
            >
              {t.nav.ctaGenerateKundli}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
