import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { JyotishLogoMark } from './artwork/JyotishLogo';
import { Link } from './Link';

export function Footer() {
  const { t, language, setLanguage, languages } = useLanguage();

  const socialItems = [
    { name: t.footer.socialLabels.instagram, href: 'https://instagram.com' },
    { name: t.footer.socialLabels.youtube, href: 'https://youtube.com' },
    { name: t.footer.socialLabels.x, href: 'https://x.com' },
    { name: t.footer.socialLabels.facebook, href: 'https://facebook.com' },
  ];

  return (
    <footer className="bg-[#24090E] text-[#F8F0E3] border-t border-[#D8AD59]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D8AD59]/20">
          {/* Brand Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <JyotishLogoMark size={38} />
              <span className="font-display text-2xl font-semibold tracking-wide text-[#F8F0E3]">
                {t.brand.name}
              </span>
            </Link>
            <p className="text-sm font-medium text-[#EBD08D]">{t.brand.tagline}</p>
            <p className="text-sm text-[#F8F0E3]/75 leading-relaxed max-w-sm">
              {t.brand.shortDescription}
            </p>

            {/* Footer Language Quick-Switch */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              {languages.map((opt, idx) => (
                <React.Fragment key={opt.code}>
                  {idx > 0 && (
                    <span className="text-[#D8AD59]/40" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    className={`cursor-pointer transition-colors ${
                      language === opt.code
                        ? 'text-[#E99A32] font-semibold underline underline-offset-4'
                        : 'text-[#F8F0E3]/70 hover:text-[#F8F0E3]'
                    }`}
                  >
                    {opt.nativeLabel}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold tracking-wider text-[#EBD08D] mb-4">
              {t.footer.exploreHeading}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F8F0E3]/80">
              <li>
                <Link to="/" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/horoscope" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.horoscope}
                </Link>
              </li>
              <li>
                <Link to="/panchang" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.panchang}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Astrology Tools Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold tracking-wider text-[#EBD08D] mb-4">
              {t.footer.toolsHeading}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F8F0E3]/80">
              <li>
                <Link to="/kundli" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.freeKundli}
                </Link>
              </li>
              <li>
                <Link to="/matching" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.kundliMatching}
                </Link>
              </li>
              <li>
                <Link to="/numerology" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.numerology}
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-[#EBD08D] transition-colors">
                  {t.nav.astrologyTools}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company, Legal & Social Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold tracking-wider text-[#EBD08D] mb-4">
              {t.footer.companyHeading}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F8F0E3]/80">
              <li>
                <Link to="/about" className="hover:text-[#EBD08D] transition-colors">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#EBD08D] transition-colors">
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#EBD08D] transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#EBD08D] transition-colors">
                  {t.footer.termsAndConditions}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#EBD08D] transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs font-medium tracking-wider text-[#D8AD59] mb-2.5">
                {t.footer.connectHeading}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#F8F0E3]/80 max-w-[260px]">
                {socialItems.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#EBD08D] transition-colors whitespace-nowrap"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#F8F0E3]/70 leading-relaxed">
          <p className="shrink-0">{t.footer.copyright}</p>
          <p className="sm:text-right">{t.footer.phaseNotice}</p>
        </div>
      </div>
    </footer>
  );
}
