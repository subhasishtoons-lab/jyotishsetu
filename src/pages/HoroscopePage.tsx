import React, { useState, useMemo } from 'react';
import { ArrowRight, Info, Sparkles, Orbit } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import type { ZodiacId } from '../i18n/types';
import { computeCurrentTransits, formatDegMin, formatDMS } from '../utils/vedicAstrology';
import { formatPanchangDate, localizeDigits } from '../utils/panchang';
import { CALC_UI, PLANET_NAMES, RASHI_NAMES } from '../i18n/vedicLabels';
import { SectionHeading } from '../components/SectionHeading';
import { ZodiacEmblem } from '../components/artwork/ZodiacEmblems';
import { Link } from '../components/Link';

interface HoroscopePageProps {
  selectedSignId?: ZodiacId;
}

type HoroscopePeriod = 'daily' | 'weekly' | 'monthly';

const PERIOD_COPY = {
  en: {
    dailyHeading: 'Daily Transit Focus',
    weeklyHeading: 'Weekly Moon & Planetary Rhythm (Next 7 Days)',
    monthlyHeading: 'Monthly Solar & Slow-Planet Overview (30-Day Window)',
    moonSignsLabel: 'Sidereal Moon Signs Traversed This Week',
    sunSignsLabel: 'Sidereal Sun Signs Across This 30-Day Window',
    saturnJupiterNote: (satHouse: number, jupHouse: number) =>
      `Guru (Jupiter) currently transits your ${jupHouse}${ordinalEn(jupHouse)} house while Shani (Saturn) transits your ${satHouse}${ordinalEn(satHouse)} house from this Rashi.`,
    weeklyFocus: (moonCount: number, jupHouse: number) =>
      `Over the coming seven days, Chandra (Moon) glides through ${moonCount} consecutive sidereal signs, shifting emotional momentum every ~2.25 days while Guru activates your ${jupHouse}${ordinalEn(jupHouse)} house themes. Plan key discussions during favourable Moon transits and avoid rushing decisions during lunar sign transitions.`,
    monthlyFocus: (sunSigns: string, satHouse: number, jupHouse: number) =>
      `Across this 30-day cycle, Surya (Sun) illuminates ${sunSigns}, setting the monthly focus on vitality and responsibilities. With Guru in your ${jupHouse}${ordinalEn(jupHouse)} house and Shani grounding your ${satHouse}${ordinalEn(satHouse)} house, consistent long-term effort produces steadier results than short bursts.`,
    kundliCta: 'Generate Personal Birth Kundli & Dasha',
    retroShort: 'R',
  },
  hi: {
    dailyHeading: 'दैनिक गोचर दृष्टिकोण',
    weeklyHeading: 'साप्ताहिक चंद्र एवं ग्रह गोचर (आगामी 7 दिन)',
    monthlyHeading: 'मासिक सूर्य एवं गुरु-शनि दृष्टिकोण (30 दिवसीय अवधि)',
    moonSignsLabel: 'इस सप्ताह चंद्र का निरयण राशि संचरण',
    sunSignsLabel: 'इस 30 दिवसीय अवधि में सूर्य की निरयण राशि स्थिति',
    saturnJupiterNote: (satHouse: number, jupHouse: number) =>
      `वर्तमान में बृहस्पति (गुरु) इस राशि से ${localizeDigits(jupHouse, 'hi')}वें भाव में और शनि ${localizeDigits(satHouse, 'hi')}वें भाव में गोचर कर रहे हैं।`,
    weeklyFocus: (moonCount: number, jupHouse: number) =>
      `आगामी सात दिनों में चंद्रमा ${localizeDigits(moonCount, 'hi')} निरयण राशियों से होकर गोचर करेंगे, जिससे हर सवा दो दिन में कार्य और मनःस्थिति की लय बदलेगी। गुरु के ${localizeDigits(jupHouse, 'hi')}वें भाव के प्रभाव में महत्वपूर्ण संवाद और योजनाओं को व्यवस्थित रखें।`,
    monthlyFocus: (sunSigns: string, satHouse: number, jupHouse: number) =>
      `इस 30 दिवसीय अवधि में सूर्य ${sunSigns} से संचरण करेंगे, जो ऊर्जा और उत्तरदायित्व की दिशा तय करता है। गुरु के ${localizeDigits(jupHouse, 'hi')}वें तथा शनि के ${localizeDigits(satHouse, 'hi')}वें भाव के गोचर में धैर्य और निरंतर परिश्रम सर्वोत्तम फल देता है।`,
    kundliCta: 'व्यक्तिगत जन्म कुंडली एवं दशा देखें',
    retroShort: 'वक्री',
  },
  as: {
    dailyHeading: 'দৈনিক গোচৰ দৃষ্টিভংগী',
    weeklyHeading: 'সাপ্তাহিক চন্দ্ৰ আৰু গ্ৰহ গোচৰ (আগন্তুক ৭ দিন)',
    monthlyHeading: 'মাহেকীয়া সূৰ্য আৰু বৃহস্পতি-শনি গোচৰ (৩০ দিনীয়া চক্ৰ)',
    moonSignsLabel: 'এই সপ্তাহত চন্দ্ৰৰ নিৰয়ণ ৰাশি সঞ্চৰণ',
    sunSignsLabel: 'এই ৩০ দিনীয়া চক্ৰত সূৰ্যৰ নিৰয়ণ ৰাশি অৱস্থান',
    saturnJupiterNote: (satHouse: number, jupHouse: number) =>
      `বৰ্তমান বৃহস্পতি (গুৰু) এই ৰাশিৰ পৰা ${localizeDigits(jupHouse, 'as')}ম ভাৱত আৰু শনি ${localizeDigits(satHouse, 'as')}ম ভাৱত গোচৰ কৰি আছে।`,
    weeklyFocus: (moonCount: number, jupHouse: number) =>
      `আগন্তুক সাত দিনত চন্দ্ৰই ${localizeDigits(moonCount, 'as')}খন নিৰয়ণ ৰাশিৰ মাজেৰে গতি কৰিব, যাৰ ফলত প্ৰায় আঢ়ৈ দিনৰ মূৰে মূৰে মানসিক ছন্দ সলনি হ’ব। গুৰুৰ ${localizeDigits(jupHouse, 'as')}ম ভাৱৰ প্ৰভাৱত গুৰুত্বপূৰ্ণ আলোচনা আৰু পৰিকল্পনা সুস্থিৰভাৱে আগবঢ়াওক।`,
    monthlyFocus: (sunSigns: string, satHouse: number, jupHouse: number) =>
      `এই ৩০ দিনীয়া কালছোৱাত সূৰ্যই ${sunSigns} ৰাশিত গোচৰ কৰিব, যিয়ে কৰ্মোদ্যম আৰু দায়িত্বৰ দিশ নিৰ্ধাৰণ কৰে। গুৰুৰ ${localizeDigits(jupHouse, 'as')}ম আৰু শনিৰ ${localizeDigits(satHouse, 'as')}ম ভাৱৰ গোচৰত ধৈৰ্য আৰু নিয়মিত অধ্যৱসায়ে শ্ৰেষ্ঠ ফল প্ৰদান কৰে।`,
    kundliCta: 'ব্যক্তিগত জন্ম কুণ্ডলী আৰু দশা চাওক',
    retroShort: 'বক্ৰী',
  },
} as const;

function ordinalEn(n: number): string {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
}

export function HoroscopePage({ selectedSignId }: HoroscopePageProps) {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();
  const ui = CALC_UI[language];
  const pCopy = PERIOD_COPY[language];

  const [period, setPeriod] = useState<HoroscopePeriod>('daily');

  const activeSign =
    t.horoscope.signs.find((s) => s.id === selectedSignId) ?? t.horoscope.signs[0];

  const transits = useMemo(() => computeCurrentTransits(activeSign.id), [activeSign.id]);
  const todayFormatted = useMemo(() => formatPanchangDate(transits.date, language), [transits.date, language]);

  const saturnTransit = transits.planets.find((p) => p.id === 'saturn')!;
  const jupiterTransit = transits.planets.find((p) => p.id === 'jupiter')!;

  const signNameMap = useMemo(() => {
    const map = new Map<ZodiacId, string>();
    t.horoscope.signs.forEach((s) => map.set(s.id, s.name));
    return map;
  }, [t.horoscope.signs]);

  const weekMoonNames = transits.weekMoonSigns.map((id) => signNameMap.get(id) ?? id).join(' → ');
  const monthSunNames = transits.monthSunSigns.map((id) => signNameMap.get(id) ?? id).join(' → ');

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
          <div className="mt-5 pt-4 border-t border-[#D8AD59]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#EBD08D]">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
              <span>{ui.liveEngineBadge}</span>
            </span>
            <span>{todayFormatted.formattedDate}</span>
            <span className="font-mono tabular-nums">
              {ui.ayanamshaLabel}: {localizeDigits(formatDegMin(transits.ayanamsha), language)}
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Approximate Vedic Solar Sign Date Note */}
        <div
          role="note"
          className="mb-8 p-4 rounded-lg bg-[#EFE3CE]/80 border border-[#D8AD59]/50 flex items-start gap-3"
        >
          <Info className="w-4 h-4 text-[#8C5320] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#542D24] leading-relaxed">
            {t.horoscope.solarDateNote}
          </p>
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

        {/* Selected Rashi Detailed Outlook with Daily / Weekly / Monthly Switcher */}
        <div className="mt-10 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden">
          <div className="bg-[#351016] text-[#F8F0E3] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#24090E] border border-[#D8AD59]/50 text-[#EBD08D] flex items-center justify-center shrink-0">
                <ZodiacEmblem sign={activeSign.id} className="w-12 h-12" />
              </div>
              <div>
                <p className="text-xs text-[#EBD08D] tracking-wide">
                  {activeSign.vedicName} · {t.horoscope.approxSolarDateLabel}: {activeSign.dates}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-[#F8F0E3]">
                  {activeSign.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#F8F0E3]/85">
                  <span>
                    <strong className="text-[#D8AD59]">{t.horoscope.elementLabel}:</strong>{' '}
                    {activeSign.element}
                  </span>
                  <span>
                    <strong className="text-[#D8AD59]">{t.horoscope.rulingPlanetLabel}:</strong>{' '}
                    {activeSign.rulingPlanet}
                  </span>
                </div>
              </div>
            </div>

            {/* Daily / Weekly / Monthly Period Switcher */}
            <div
              role="tablist"
              aria-label="Horoscope timeframe"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#24090E] border border-[#D8AD59]/40 self-start md:self-auto"
            >
              {(
                [
                  { id: 'daily', label: ui.dailyTab },
                  { id: 'weekly', label: ui.weeklyTab },
                  { id: 'monthly', label: ui.monthlyTab },
                ] as const
              ).map((tab) => {
                const active = period === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setPeriod(tab.id)}
                    className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10]'
                        : 'text-[#F8F0E3]/80 hover:text-[#EBD08D]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Sidereal Transits Grid (Genuine Computed Positions) */}
          <div className="p-6 sm:p-8 bg-[#EFE3CE]/45 border-b border-[#D8AD59]/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-[#351016]">
                <Orbit className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">{ui.liveTransitsTitle}</h3>
              </div>
              <p className="text-xs text-[#542D24]">
                {pCopy.saturnJupiterNote(
                  saturnTransit.houseFromSelected,
                  jupiterTransit.houseFromSelected,
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {transits.planets.map((pl) => (
                <div
                  key={pl.id}
                  className="p-3 rounded-md bg-[#FDF9F2] border border-[#D8AD59]/35 text-xs"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-[#351016]">
                      {PLANET_NAMES[language][pl.id]}
                    </span>
                    <span className="font-mono tabular-nums text-[11px] px-1.5 py-0.5 rounded bg-[#351016] text-[#EBD08D]">
                      {ui.houseShort} {localizeDigits(pl.houseFromSelected, language)}
                    </span>
                  </div>
                  <p className="mt-1 text-[#542D24] font-medium">
                    {RASHI_NAMES[language][pl.rashiIndex]}
                    {pl.retrograde ? ` (${pCopy.retroShort})` : ''}
                  </p>
                  <p className="mt-0.5 font-mono tabular-nums text-[11px] text-[#8C5320]">
                    {localizeDigits(formatDMS(pl.degreeInSign), language)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Period-Specific Reading & Guidance */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {period === 'daily' && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#351016]">
                    {pCopy.dailyHeading} — {t.horoscope.generalTitle}
                  </h3>
                  <p className="mt-2.5 text-[15px] text-[#542D24] leading-relaxed">
                    {activeSign.generalReading}
                  </p>
                </div>
              )}

              {period === 'weekly' && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-[#351016]">
                    {pCopy.weeklyHeading}
                  </h3>
                  <div className="p-4 rounded-md bg-[#EFE3CE]/65 border border-[#D8AD59]/40">
                    <p className="text-xs font-semibold text-[#8C5320]">{pCopy.moonSignsLabel}</p>
                    <p className="mt-1 font-display text-base font-semibold text-[#351016]">
                      {weekMoonNames}
                    </p>
                  </div>
                  <p className="text-[15px] text-[#542D24] leading-relaxed">
                    {pCopy.weeklyFocus(
                      transits.weekMoonSigns.length,
                      jupiterTransit.houseFromSelected,
                    )}
                  </p>
                </div>
              )}

              {period === 'monthly' && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-[#351016]">
                    {pCopy.monthlyHeading}
                  </h3>
                  <div className="p-4 rounded-md bg-[#EFE3CE]/65 border border-[#D8AD59]/40">
                    <p className="text-xs font-semibold text-[#8C5320]">{pCopy.sunSignsLabel}</p>
                    <p className="mt-1 font-display text-base font-semibold text-[#351016]">
                      {monthSunNames}
                    </p>
                  </div>
                  <p className="text-[15px] text-[#542D24] leading-relaxed">
                    {pCopy.monthlyFocus(
                      monthSunNames,
                      saturnTransit.houseFromSelected,
                      jupiterTransit.houseFromSelected,
                    )}
                  </p>
                </div>
              )}

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

              <div className="p-4 rounded-md bg-[#EFE3CE]/55 border border-[#D8AD59]/40 text-xs text-[#542D24] leading-relaxed">
                {ui.honestTransitNote}
              </div>
            </div>

            {/* Auspicious Attributes & Direct Tool Links */}
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

              <div className="pb-4 border-b border-[#D8AD59]/20">
                <p className="text-xs text-[#8C5320] font-medium">
                  {t.horoscope.auspiciousTimeLabel}
                </p>
                <p className="mt-1 font-mono tabular-nums text-base font-medium text-[#351016]">
                  {activeSign.auspiciousTime}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <Link
                  to="/kundli"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] text-xs sm:text-sm font-semibold hover:bg-[#4A1820] transition-colors"
                >
                  <span>{pCopy.kundliCta}</span>
                  <ArrowRight className="w-4 h-4 text-[#D8AD59]" aria-hidden="true" />
                </Link>
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
