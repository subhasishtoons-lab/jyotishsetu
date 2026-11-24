import React from 'react';
import { ArrowRight, Info, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ComingSoonFeatureSpec } from '../i18n/types';
import { Link } from '../components/Link';
import { NavagrahaDiagram } from '../components/artwork/NavagrahaDiagram';

interface ComingSoonPageProps {
  spec: ComingSoonFeatureSpec;
}

export function ComingSoonPage({ spec }: ComingSoonPageProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#F8F0E3]">
      {/* Regal Header Band */}
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.12em]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24090E] border border-[#E99A32]/60 text-[#E99A32] font-semibold">
                  <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{t.comingSoonCommon.phaseLabel}</span>
                </span>
                <span className="text-[#EBD08D]">{spec.kicker}</span>
              </div>

              <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F8F0E3] leading-[1.15] [text-wrap:balance]">
                {spec.title}
              </h1>

              <p className="mt-4 text-base text-[#F8F0E3]/82 leading-relaxed max-w-2xl">
                {spec.subtitle}
              </p>

              <p className="mt-5 pt-4 border-t border-[#D8AD59]/20 text-xs sm:text-sm text-[#EBD08D]/90 max-w-2xl">
                {spec.phaseNote} {t.comingSoonCommon.launchNotice}
              </p>
            </div>

            <div className="hidden lg:block lg:col-span-4">
              <div className="max-w-[280px] ml-auto">
                <NavagrahaDiagram className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planned Scope + Methodology + Honest Notification Status */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Planned Feature Breakdown */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold text-[#351016]">
              {spec.highlightsTitle}
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {spec.highlights.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono tabular-nums text-[#B08532]">0{idx + 1}</span>
                    <span className="text-[11px] font-medium text-[#542D24]/75">
                      {t.quickTools.statusComingSoon}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold text-[#351016]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#542D24] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#D8AD59]/30">
              <h3 className="font-display text-xl font-semibold text-[#351016]">
                {spec.methodologyTitle}
              </h3>
              <p className="mt-2.5 text-[15px] text-[#542D24] leading-relaxed">
                {spec.methodologyBody}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Honest Notification Status & Phase 1 Destinations */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-[#351016]">
                  {t.comingSoonCommon.notifyHeading}
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EFE3CE] border border-[#D8AD59]/50 text-[#7C3A12] whitespace-nowrap">
                  {t.comingSoonCommon.notifyUnavailableBadge}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#542D24] leading-relaxed">
                {t.comingSoonCommon.notifyDescription}
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label htmlFor={`notify-${spec.id}`} className="sr-only">
                    {t.comingSoonCommon.notifyHeading}
                  </label>
                  <input
                    id={`notify-${spec.id}`}
                    type="email"
                    disabled
                    aria-disabled="true"
                    value=""
                    readOnly
                    placeholder={t.comingSoonCommon.emailPlaceholder}
                    className="w-full h-11 px-3.5 rounded-md bg-[#F4ECE0] border border-[#D8AD59]/35 text-sm text-[#542D24]/60 placeholder:text-[#542D24]/55 cursor-not-allowed"
                  />
                </div>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full h-11 px-5 rounded-md bg-[#542D24]/40 text-[#F8F0E3] text-sm font-semibold cursor-not-allowed"
                >
                  {t.comingSoonCommon.notifyBtn}
                </button>
              </div>

              <p className="mt-3.5 flex items-start gap-2 text-xs text-[#542D24] leading-relaxed bg-[#EFE3CE]/65 p-3 rounded-md border border-[#D8AD59]/35">
                <Info className="w-4 h-4 text-[#8C5320] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t.comingSoonCommon.notifyUnavailableNote}</span>
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#EFE3CE]/70 border border-[#D8AD59]/35">
              <h3 className="font-display text-base font-semibold text-[#351016]">
                {t.comingSoonCommon.availableNowTitle}
              </h3>
              <div className="mt-4 flex flex-col divide-y divide-[#D8AD59]/25">
                <Link
                  to="/panchang"
                  className="py-3 flex items-center justify-between text-sm font-medium text-[#351016] hover:text-[#7C3A12]"
                >
                  <span>{t.comingSoonCommon.goToPanchang}</span>
                  <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                </Link>
                <Link
                  to="/horoscope"
                  className="py-3 flex items-center justify-between text-sm font-medium text-[#351016] hover:text-[#7C3A12]"
                >
                  <span>{t.comingSoonCommon.goToHoroscope}</span>
                  <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                </Link>
                <Link
                  to="/blog"
                  className="py-3 flex items-center justify-between text-sm font-medium text-[#351016] hover:text-[#7C3A12]"
                >
                  <span>{t.comingSoonCommon.goToBlog}</span>
                  <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

