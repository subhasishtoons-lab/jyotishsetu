import React from 'react';
import { ArrowRight, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import type { ZodiacId } from '../i18n/types';
import { SectionHeading } from '../components/SectionHeading';
import { ZodiacEmblem } from '../components/artwork/ZodiacEmblems';
import { Link } from '../components/Link';

interface HoroscopePageProps {
  selectedSignId?: ZodiacId;
}

export function HoroscopePage({ selectedSignId }: HoroscopePageProps) {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const activeSign =
    t.horoscope.signs.find((s) => s.id === selectedSignId) ?? t.horoscope.signs[0];

  return (
    <div className="bg-[#F8F0E3]">
      {/* Page Banner */}
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={t.horoscope.kicker}
            title={t.horoscope.title}
            subtitle={t.horoscope.subtitle}
            align="left"
            theme="dark"
          />
          <p className="mt-5 text-xs sm:text-sm text-[#EBD08D]/90 border-t border-[#D8AD59]/20 pt-4 max-w-3xl">
            {t.horoscope.demoBanner}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Transparent Sample Preview & Approximate Vedic Solar Dates Notice */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            role="note"
            className="p-4 rounded-lg bg-[#F5E4CA] border-l-4 border-[#B85D19] border-y border-r border-y-[#D8AD59]/50 border-r-[#D8AD59]/50 flex items-start gap-3"
          >
            <AlertTriangle className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-[#542D24] leading-relaxed">
              {t.horoscope.demoBanner}
            </p>
          </div>
          <div
            role="note"
            className="p-4 rounded-lg bg-[#EFE3CE]/80 border border-[#D8AD59]/50 flex items-start gap-3"
          >
            <Info className="w-4 h-4 text-[#8C5320] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-[#542D24] leading-relaxed">
              {t.horoscope.solarDateNote}
            </p>
          </div>
        </div>

        {/* 12-Sign Interactive Selector Grid */}
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-[#8C5320] mb-4">
            {t.horoscope.selectSignPrompt}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {t.horoscope.signs.map((sign) => {
              const isSelected = sign.id === activeSign.id;
              return (
                <button
                  key={sign.id}
                  type="button"
                  onClick={() => navigate(`/horoscope/${sign.id}`)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]'
                      : 'bg-[#FDF9F2] text-[#351016] border-[#D8AD59]/35 hover:border-[#B08532]'
                  }`}
                >
                  <ZodiacEmblem
                    sign={sign.id}
                    className={`w-7 h-7 shrink-0 ${
                      isSelected ? 'text-[#EBD08D]' : 'text-[#542D24]'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold leading-snug">{sign.name}</p>
                    <p
                      className={`text-[11px] leading-tight mt-0.5 ${
                        isSelected ? 'text-[#EBD08D]/85' : 'text-[#8C5320]'
                      }`}
                    >
                      {sign.dates}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Rashi Detailed Outlook */}
        <div className="mt-10 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden">
          <div className="bg-[#351016] text-[#F8F0E3] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#24090E] border border-[#D8AD59]/50 text-[#EBD08D] flex items-center justify-center shrink-0">
                <ZodiacEmblem sign={activeSign.id} className="w-12 h-12" />
              </div>
              <div>
                <p className="text-xs text-[#EBD08D] tracking-wide">
                  {activeSign.vedicName} · {t.horoscope.approxSolarDateLabel}: {activeSign.dates}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-3xl font-semibold text-[#F8F0E3]">
                    {activeSign.name}
                  </h2>
                  <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded bg-[#24090E] border border-[#D8AD59]/45 text-[#E99A32]">
                    {t.horoscope.sampleBadge}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-[#F8F0E3]/85">
              <div>
                <span className="text-[#D8AD59]">{t.horoscope.elementLabel}: </span>
                <span>{activeSign.element}</span>
              </div>
              <div>
                <span className="text-[#D8AD59]">{t.horoscope.rulingPlanetLabel}: </span>
                <span>{activeSign.rulingPlanet}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#351016]">
                  {t.horoscope.generalTitle}
                </h3>
                <p className="mt-2.5 text-[15px] text-[#542D24] leading-relaxed">
                  {activeSign.generalReading}
                </p>
              </div>

              <div className="pt-6 border-t border-[#D8AD59]/25 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display text-base font-semibold text-[#351016]">
                    {t.horoscope.careerTitle}
                  </h4>
                  <p className="mt-2 text-sm text-[#542D24] leading-relaxed">
                    {activeSign.careerReading}
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#351016]">
                    {t.horoscope.relationshipTitle}
                  </h4>
                  <p className="mt-2 text-sm text-[#542D24] leading-relaxed">
                    {activeSign.relationshipReading}
                  </p>
                </div>
              </div>
            </div>

            {/* Auspicious Daily Attributes */}
            <aside className="lg:col-span-4 lg:border-l lg:border-[#D8AD59]/25 lg:pl-8 space-y-5">
              <div className="pb-4 border-b border-[#D8AD59]/20">
                <p className="text-xs text-[#8C5320] font-medium">{t.horoscope.luckyColorLabel}</p>
                <p className="mt-1 font-display text-lg font-semibold text-[#351016]">
                  {activeSign.luckyColor}
                </p>
              </div>

              <div className="pb-4 border-b border-[#D8AD59]/20">
                <p className="text-xs text-[#8C5320] font-medium">
                  {t.horoscope.luckyNumberLabel}
                </p>
                <p className="mt-1 font-mono tabular-nums text-2xl font-semibold text-[#351016]">
                  {activeSign.luckyNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8C5320] font-medium">
                  {t.horoscope.auspiciousTimeLabel}
                </p>
                <p className="mt-1 font-mono tabular-nums text-base font-medium text-[#351016]">
                  {activeSign.auspiciousTime}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/panchang"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#351016] hover:text-[#C47616] transition-colors"
                >
                  <span>{t.panchang.fullPanchangCta}</span>
                  <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
