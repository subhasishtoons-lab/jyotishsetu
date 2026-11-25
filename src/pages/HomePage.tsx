import React, { useMemo } from 'react';
import {
  ArrowRight,
  Compass,
  Sun,
  Calendar,
  HeartHandshake,
  Hash,
  Orbit,
  Flame,
  Sparkles,
  Sunrise,
  Sunset,
  Clock,
  Info,
  CheckCircle2,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  formatPanchangDate,
  formatLocalTime,
  formatTimeRange,
  formatUtcOffsetLabel,
  getCityUtcOffsetMinutesForDate,
  getPanchangCityById,
  loadSavedPanchangCity,
  localizeDigits,
} from '../utils/panchang';
import { computeLivePanchang, formatDegMin } from '../utils/vedicAstrology';
import {
  CALC_UI,
  KARANA_NAMES,
  NAKSHATRA_NAMES,
  RASHI_NAMES,
  YOGA_NAMES,
  getLocalizedTithiName,
} from '../i18n/vedicLabels';
import type { ToolId } from '../i18n/types';
import { Link } from '../components/Link';
import { SectionHeading } from '../components/SectionHeading';
import { VedicMandalaArtwork } from '../components/artwork/VedicMandalaArtwork';
import { NavagrahaDiagram } from '../components/artwork/NavagrahaDiagram';
import { ZodiacEmblem } from '../components/artwork/ZodiacEmblems';
import { BlogEditorialArt } from '../components/artwork/BlogEditorialArt';
import { ShaniRingIcon } from '../components/artwork/ShaniRingIcon';

const TOOL_ICON_MAP: Record<ToolId, React.ComponentType<{ className?: string }>> = {
  'free-kundli': Compass,
  'daily-horoscope': Sun,
  'hindu-panchang': Calendar,
  'kundli-matching': HeartHandshake,
  numerology: Hash,
  'sade-sati': Orbit,
  'mangal-dosha': Flame,
  'nakshatra-finder': Sparkles,
  'muhurat-finder': Clock,
};

const SUITE_ROUTES = ['/kundli', '/kundli', '/matching', '/tools/muhurat'] as const;

export function HomePage() {
  const { language, t } = useLanguage();
  const ui = CALC_UI[language];

  const today = useMemo(() => new Date(), []);
  const todayFormatted = useMemo(() => formatPanchangDate(today, language), [today, language]);
  const selectedCity = useMemo(() => {
    const savedId = loadSavedPanchangCity(
      typeof window !== 'undefined' ? window.localStorage : null,
    );
    return getPanchangCityById(savedId);
  }, []);

  const todayIso = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  const effectiveOffsetMinutes = useMemo(
    () => getCityUtcOffsetMinutesForDate(selectedCity, todayIso, '12:00'),
    [selectedCity, todayIso],
  );

  const activeTimezoneLabel =
    effectiveOffsetMinutes === selectedCity.utcOffsetMinutes
      ? selectedCity.timezone
      : `${selectedCity.ianaTimeZone} (${formatUtcOffsetLabel(effectiveOffsetMinutes)})`;

  const livePanchang = useMemo(
    () =>
      computeLivePanchang(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
        selectedCity.lat,
        selectedCity.lon,
        effectiveOffsetMinutes,
      ),
    [today, selectedCity, effectiveOffsetMinutes],
  );

  const pFields = t.panchang.data.fields;
  const panchangEntries = [
    {
      key: 'date',
      label: pFields.date.label,
      value: todayFormatted.formattedDate,
      sub: `${todayFormatted.weekdayVedic} · ${localizeDigits(livePanchang.vikramSamvat, language)}`,
      isTime: false,
      isCaution: false,
    },
    {
      key: 'tithi',
      label: pFields.tithi.label,
      value: getLocalizedTithiName(livePanchang.paksha, livePanchang.tithiInPaksha, language),
      sub: livePanchang.tithiEndTime
        ? `${ui.endsAtLabel}: ${formatLocalTime(livePanchang.tithiEndTime, effectiveOffsetMinutes, language)}`
        : RASHI_NAMES[language][livePanchang.moonRashiIndex],
      isTime: false,
      isCaution: false,
    },
    {
      key: 'nakshatra',
      label: pFields.nakshatra.label,
      value: NAKSHATRA_NAMES[language][livePanchang.nakshatraIndex],
      sub: livePanchang.nakshatraEndTime
        ? `${ui.endsAtLabel}: ${formatLocalTime(livePanchang.nakshatraEndTime, effectiveOffsetMinutes, language)}`
        : RASHI_NAMES[language][livePanchang.moonRashiIndex],
      isTime: false,
      isCaution: false,
    },
    {
      key: 'yoga',
      label: pFields.yoga.label,
      value: YOGA_NAMES[language][livePanchang.yogaIndex],
      sub: RASHI_NAMES[language][livePanchang.moonRashiIndex],
      isTime: false,
      isCaution: false,
    },
    {
      key: 'karana',
      label: pFields.karana.label,
      value: KARANA_NAMES[language][livePanchang.karanaId],
      sub: RASHI_NAMES[language][livePanchang.sunRashiIndex],
      isTime: false,
      isCaution: false,
    },
    {
      key: 'sunrise',
      label: pFields.sunrise.label,
      value: livePanchang.sunrise
        ? formatLocalTime(livePanchang.sunrise, effectiveOffsetMinutes, language)
        : '—',
      sub: `${selectedCity.names[language]} · ${activeTimezoneLabel}`,
      isTime: true,
      isCaution: false,
    },
    {
      key: 'sunset',
      label: pFields.sunset.label,
      value: livePanchang.sunset
        ? formatLocalTime(livePanchang.sunset, effectiveOffsetMinutes, language)
        : '—',
      sub: `${ui.ayanamshaLabel}: ${localizeDigits(formatDegMin(livePanchang.ayanamsha), language)}`,
      isTime: true,
      isCaution: false,
    },
    {
      key: 'rahuKaal',
      label: pFields.rahuKaal.label,
      value: livePanchang.rahuKaal
        ? formatTimeRange(
            livePanchang.rahuKaal.start,
            livePanchang.rahuKaal.end,
            effectiveOffsetMinutes,
            language,
          )
        : '—',
      sub: t.panchang.cautionLabel,
      isTime: true,
      isCaution: true,
    },
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(233,154,50,0.16),rgba(53,16,22,0)_62%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 w-[420px] h-[420px] opacity-20 lg:hidden"
        >
          <VedicMandalaArtwork className="w-full h-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-10">
            <div className="lg:col-span-7 max-w-2xl">
              <p className="text-xs sm:text-[13px] font-medium tracking-[0.14em] text-[#EBD08D]">
                {t.hero.kicker}
              </p>

              <h1 className="mt-3.5 font-display text-[2.1rem] sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.14] tracking-tight text-[#F8F0E3] [text-wrap:balance]">
                {t.hero.headline}
              </h1>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg leading-relaxed text-[#F8F0E3]/85 max-w-xl">
                {t.hero.description}
              </p>

              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  to="/kundli"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold tracking-wide hover:brightness-105 transition-colors whitespace-nowrap shadow-sm"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/tools"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-[#D8AD59]/60 bg-[#24090E]/40 text-[#F8F0E3] text-sm font-medium tracking-wide hover:bg-[#4A1820] hover:border-[#D8AD59] transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.secondaryCta}</span>
                </Link>
              </div>

              <div className="mt-10 pt-6 border-t border-[#D8AD59]/20 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-[13px] text-[#EBD08D]/85">
                {t.hero.traditionMarkers.map((marker, idx) => (
                  <React.Fragment key={marker}>
                    {idx > 0 && (
                      <span className="text-[#D8AD59]/45" aria-hidden="true">
                        ◆
                      </span>
                    )}
                    <span>{marker}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
              <div className="relative w-[440px] h-[440px] xl:w-[480px] xl:h-[480px]">
                <VedicMandalaArtwork className="w-full h-full drop-shadow-[0_0_40px_rgba(216,173,89,0.16)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ASTROLOGY TOOLS (ALL 10 LIVE INTERACTIVE CARDS, INCLUDING SHANI DHAIYA) */}
      <section id="astrology-tools" className="py-14 sm:py-18 lg:py-20 bg-[#F8F0E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <SectionHeading
              kicker={t.quickTools.kicker}
              title={t.quickTools.title}
              subtitle={t.quickTools.subtitle}
              align="left"
            />
            <Link
              to="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#542D24] hover:text-[#351016] border-b border-[#D8AD59] pb-1 whitespace-nowrap shrink-0 self-start md:self-auto transition-colors"
            >
              <span>{t.quickTools.viewAllCta}</span>
              <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.quickTools.items.map((tool) => {
              const Icon = TOOL_ICON_MAP[tool.id];
              const isAvailable = tool.status === 'live' || tool.status === 'preview';
              const dhaiyaCard = t.toolsPage.shaniDhaiyaCard;
              const isWideRowOnDesktop = tool.id === 'muhurat-finder';
              return (
                <React.Fragment key={tool.id}>
                  <Link
                    to={tool.route}
                    className={`group flex flex-col justify-between p-5 sm:p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] hover:bg-white transition-colors duration-150 ${
                      isWideRowOnDesktop
                        ? 'lg:col-span-3 lg:flex-row lg:items-center lg:gap-8'
                        : ''
                    }`}
                  >
                    <div className={isWideRowOnDesktop ? 'lg:flex lg:items-center lg:gap-5 lg:flex-1' : ''}>
                      <div
                        className={`flex items-center justify-between gap-3 ${
                          isWideRowOnDesktop ? 'lg:block' : ''
                        }`}
                      >
                        <div className="w-10 h-10 rounded-md bg-[#351016] text-[#EBD08D] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span
                          className={`text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border ${
                            isWideRowOnDesktop ? 'lg:hidden' : ''
                          } ${
                            isAvailable
                              ? 'bg-[#2B5A3C]/10 border-[#2B5A3C]/35 text-[#2B5A3C]'
                              : 'bg-[#351016]/6 border-[#542D24]/25 text-[#542D24]'
                          }`}
                        >
                          {isAvailable ? t.quickTools.statusPreview : t.quickTools.statusComingSoon}
                        </span>
                      </div>

                      <div className={isWideRowOnDesktop ? 'mt-4 lg:mt-0 lg:flex-1' : ''}>
                        <div className="flex flex-wrap items-center gap-2">
                          <p
                            className={`${
                              isWideRowOnDesktop ? 'mt-0' : 'mt-4'
                            } text-xs text-[#8C5320] font-medium`}
                          >
                            {tool.subtitle}
                          </p>
                          {isWideRowOnDesktop && (
                            <span
                              className={`hidden lg:inline-block text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border ${
                                isAvailable
                                  ? 'bg-[#2B5A3C]/10 border-[#2B5A3C]/35 text-[#2B5A3C]'
                                  : 'bg-[#351016]/6 border-[#542D24]/25 text-[#542D24]'
                              }`}
                            >
                              {isAvailable
                                ? t.quickTools.statusPreview
                                : t.quickTools.statusComingSoon}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-display text-lg font-semibold text-[#351016] group-hover:text-[#7C3A12] transition-colors">
                          {tool.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-[#542D24] leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-5 pt-3.5 border-t border-[#D8AD59]/20 flex items-center justify-between text-xs font-semibold text-[#351016] ${
                        isWideRowOnDesktop
                          ? 'lg:mt-0 lg:pt-0 lg:border-t-0 lg:shrink-0 lg:gap-2 lg:px-4 lg:py-2.5 lg:rounded-md lg:border lg:border-[#D8AD59]/45 lg:bg-[#F8F0E3]'
                          : ''
                      }`}
                    >
                      <span>
                        {isAvailable ? t.quickTools.openTool : t.quickTools.openComingSoon}
                      </span>
                      <ArrowRight
                        className="w-3.5 h-3.5 text-[#C47616]"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>

                  {tool.id === 'sade-sati' && (
                    <article
                      key="shani-dhaiya"
                      className="group flex flex-col justify-between p-5 sm:p-6 rounded-lg bg-gradient-to-b from-[#FCF7EE] to-[#F3E9D8] border border-[#2C2F4C]/30 border-t-2 border-t-[#2C2F4C] hover:border-[#B08532] hover:border-t-[#B08532] transition-colors duration-150"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#1C1F38] via-[#2B1830] to-[#351016] text-[#EBD08D] border border-[#D8AD59]/50 flex items-center justify-center shrink-0">
                            <ShaniRingIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border bg-[#2C2F4C]/10 border-[#2C2F4C]/30 text-[#252847]">
                            {t.quickTools.statusPreview}
                          </span>
                        </div>

                        <p className="mt-4 text-xs font-semibold tracking-wide text-[#2C2F4C]">
                          {dhaiyaCard.kicker}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-semibold text-[#351016] group-hover:text-[#7C3A12] transition-colors">
                          {dhaiyaCard.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-[#3B2621] leading-snug">
                          {dhaiyaCard.subtitle}
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-[#542D24] leading-relaxed">
                          {dhaiyaCard.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-[#D8AD59]/30">
                        <Link
                          to="/tools/sade-sati"
                          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/50 hover:bg-[#4A1820] text-xs font-semibold tracking-wide transition-colors"
                        >
                          <span>{dhaiyaCard.openButton}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#EBD08D]" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TODAY'S LIVE PANCHANG */}
      <section className="py-16 sm:py-20 bg-[#EFE3CE]/70 border-y border-[#D8AD59]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              kicker={t.panchang.kicker}
              title={t.panchang.title}
              subtitle={t.panchang.subtitle}
              align="left"
            />
            <Link
              to="/panchang"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] text-sm font-medium hover:bg-[#4A1820] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>{t.panchang.fullPanchangCta}</span>
              <ArrowRight className="w-4 h-4 text-[#D8AD59]" aria-hidden="true" />
            </Link>
          </div>

          {/* Live Ephemeris Metadata Bar */}
          <div className="mt-8 p-4 sm:px-6 rounded-t-lg bg-[#351016] text-[#F8F0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#E99A32] shrink-0" aria-hidden="true" />
              <span className="font-semibold text-[#EBD08D]">{ui.liveEngineBadge}</span>
              <span className="text-[#D8AD59]/50" aria-hidden="true">
                ·
              </span>
              <span className="text-[#F8F0E3]/90">
                {selectedCity.names[language]}, {selectedCity.regions[language]} (
                {activeTimezoneLabel})
              </span>
            </div>
            <div className="text-xs text-[#EBD08D]">
              {t.panchang.data.samvatLabel}:{' '}
              {localizeDigits(livePanchang.vikramSamvat, language)}
            </div>
          </div>

          {/* 8 Live Panchang Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D8AD59]/30 border-x border-b border-[#D8AD59]/40 rounded-b-lg overflow-hidden">
            {panchangEntries.map((item) => (
              <div
                key={item.key}
                className={`p-5 sm:p-6 ${item.isCaution ? 'bg-[#F5E9DB]' : 'bg-[#FDF9F2]'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium tracking-wider text-[#8C5320]">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.key === 'sunrise' && (
                      <Sunrise className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                    )}
                    {item.key === 'sunset' && (
                      <Sunset className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                    )}
                    {item.key === 'rahuKaal' && (
                      <Clock className="w-4 h-4 text-[#7A2029]" aria-hidden="true" />
                    )}
                  </div>
                </div>

                <p
                  className={`mt-2 text-lg font-semibold ${
                    item.isTime ? 'font-mono tabular-nums' : 'font-display'
                  } ${item.isCaution ? 'text-[#7A2029]' : 'text-[#351016]'}`}
                >
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-[#542D24]/85">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DAILY, WEEKLY & MONTHLY HOROSCOPE — ALL 12 ZODIAC SIGNS */}
      <section className="py-16 sm:py-20 bg-[#F8F0E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={t.horoscope.kicker}
            title={t.horoscope.title}
            subtitle={t.horoscope.subtitle}
            align="center"
          />

          <div className="mt-8 max-w-4xl mx-auto p-4 rounded-lg bg-[#EFE3CE]/80 border border-[#D8AD59]/50 text-xs sm:text-[13px] text-[#542D24]">
            <p className="flex items-start gap-2 leading-relaxed">
              <Info className="w-4 h-4 text-[#8C5320] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t.horoscope.solarDateNote}</span>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {t.horoscope.signs.map((sign) => (
              <Link
                key={sign.id}
                to={`/horoscope/${sign.id}`}
                className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] hover:bg-white transition-colors duration-150"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#351016] text-[#EBD08D] flex items-center justify-center">
                  <ZodiacEmblem sign={sign.id} className="w-9 h-9 sm:w-10 sm:h-10" />
                </div>
                <h3 className="mt-3 font-display text-sm sm:text-base font-semibold text-[#351016]">
                  {sign.name}
                </h3>
                <p className="mt-0.5 text-[11px] text-[#8C5320] font-medium">{sign.vedicName}</p>
                <p className="mt-2 text-[10px] text-[#7C4710]/90">
                  {t.horoscope.approxSolarDateLabel}
                </p>
                <p className="text-[11px] text-[#542D24]/85 font-medium">{sign.dates}</p>
                <span className="mt-3 text-xs font-semibold text-[#351016] group-hover:text-[#C47616] transition-colors">
                  {t.horoscope.readSignCta} →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/horoscope"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#351016] hover:text-[#7C3A12] border-b border-[#D8AD59] pb-1 transition-colors"
            >
              <span>{t.horoscope.viewFullCta}</span>
              <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE JYOTISHSETU */}
      <section className="py-16 sm:py-20 bg-[#FDF9F2] border-y border-[#D8AD59]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="max-w-md mx-auto">
                <NavagrahaDiagram className="w-full h-auto rounded-xl shadow-lg" />
                <p className="mt-3 text-center text-xs text-[#542D24]/80 font-display tracking-wide">
                  {t.brand.name} · {t.brand.tagline}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                kicker={t.whyChoose.kicker}
                title={t.whyChoose.title}
                subtitle={t.whyChoose.subtitle}
                align="left"
              />

              <ol className="mt-8 divide-y divide-[#D8AD59]/25">
                {t.whyChoose.pillars.map((pillar) => (
                  <li key={pillar.number} className="py-4 first:pt-0 last:pb-0 flex gap-5">
                    <span className="font-mono tabular-nums text-sm font-medium text-[#B08532] pt-0.5 shrink-0">
                      {pillar.number}.
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#351016]">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#542D24] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRINTABLE VEDIC STUDY & ANALYSIS SUITE (ALL ACTIVE & FREE CLIENT-SIDE) */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-[#351016] text-[#F8F0E3]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.09]"
        >
          <VedicMandalaArtwork className="w-full h-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.14em] text-[#E99A32]">
                {t.premium.statusLabel}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-[#F8F0E3] leading-[1.18] [text-wrap:balance]">
                {t.premium.title}
              </h2>
              <p className="mt-4 text-[15px] text-[#F8F0E3]/82 leading-relaxed">
                {t.premium.subtitle}
              </p>
              <p className="mt-3 text-xs text-[#EBD08D]/85 leading-relaxed">
                {t.premium.noPaymentNote}
              </p>

              <div className="mt-7 pt-6 border-t border-[#D8AD59]/25 space-y-3">
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/kundli"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold hover:brightness-105 transition-all"
                  >
                    <span>{t.hero.primaryCta}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/tools"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#D8AD59]/55 text-[#F8F0E3] text-sm font-medium hover:bg-[#4A1820] transition-colors"
                  >
                    <span>{t.premium.exploreToolsLink}</span>
                  </Link>
                </div>
                <p className="flex items-start gap-2 text-xs text-[#F5DC9B]/85 leading-relaxed">
                  <Info className="w-3.5 h-3.5 text-[#E99A32] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t.premium.notifyUnavailableNote}</span>
                </p>
              </div>
            </div>

            {/* 4 Active Tool Offerings Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.premium.features.map((feat, idx) => (
                <Link
                  key={feat.title}
                  to={SUITE_ROUTES[idx] ?? '/tools'}
                  className="group block p-6 rounded-lg bg-[#2A0B11] border border-[#D8AD59]/35 hover:border-[#E99A32] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-[#D8AD59]">
                    <span className="font-mono tabular-nums">
                      {localizeDigits(`0${idx + 1}`, language)}
                    </span>
                    <span className="text-[#E99A32] font-semibold">
                      {t.quickTools.statusPreview}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#F8F0E3] group-hover:text-[#EBD08D] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#F8F0E3]/78 leading-relaxed">
                    {feat.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#EBD08D]">
                    <span>{t.quickTools.openTool}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BLOG SECTION */}
      <section className="py-14 sm:py-18 lg:py-20 bg-[#F8F0E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <SectionHeading
              kicker={t.blog.kicker}
              title={t.blog.title}
              subtitle={t.blog.subtitle}
              align="left"
            />
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#542D24] hover:text-[#351016] border-b border-[#D8AD59] pb-1 whitespace-nowrap shrink-0 self-start md:self-auto transition-colors"
            >
              <span>{t.blog.viewAllArticlesCta}</span>
              <ArrowRight className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {t.blog.articles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col rounded-lg overflow-hidden bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] transition-colors"
              >
                <Link to={`/blog/${article.slug}`} className="block aspect-[3/2] overflow-hidden">
                  <BlogEditorialArt artworkId={article.artworkId} className="w-full h-full" />
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8C5320]">
                      <span className="font-medium">{article.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-semibold text-[#351016] leading-snug group-hover:text-[#7C3A12] transition-colors">
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="mt-2 text-sm text-[#542D24] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#D8AD59]/20 flex items-center justify-between text-xs">
                    <span className="text-[#542D24]/75">{article.date}</span>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="font-semibold text-[#351016] hover:text-[#C47616] transition-colors"
                    >
                      {t.blog.readArticleCta} →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRUST, METHODOLOGY, PRIVACY & ASTROLOGY DISCLAIMER */}
      <section
        aria-labelledby="trust-disclaimer-heading"
        className="py-14 sm:py-16 bg-[#EFE3CE]/75 border-t border-[#D8AD59]/35"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.14em] text-[#8C5320]">
              {t.trustNotice.kicker}
            </p>
            <h2
              id="trust-disclaimer-heading"
              className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#351016] leading-tight [text-wrap:balance]"
            >
              {t.trustNotice.title}
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] text-[#542D24] leading-relaxed">
              {t.trustNotice.subtitle}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.trustNotice.cards.map((card) => {
              const CardIcon =
                card.id === 'belief'
                  ? Scale
                  : card.id === 'methodology'
                    ? Compass
                    : ShieldCheck;
              return (
                <div
                  key={card.id}
                  className="p-5 sm:p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 flex flex-col"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#351016] text-[#EBD08D] flex items-center justify-center shrink-0">
                      <CardIcon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#351016] leading-snug">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[#542D24] leading-relaxed">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-[#D8AD59]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#542D24]">
            <span className="font-medium text-[#351016]">{t.trustNotice.readPoliciesLabel}</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to="/disclaimer"
                className="font-semibold text-[#351016] hover:text-[#8C5320] underline underline-offset-4 decoration-[#D8AD59] transition-colors"
              >
                {t.footer.disclaimer}
              </Link>
              <Link
                to="/privacy"
                className="font-semibold text-[#351016] hover:text-[#8C5320] underline underline-offset-4 decoration-[#D8AD59] transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
              <Link
                to="/terms"
                className="font-semibold text-[#351016] hover:text-[#8C5320] underline underline-offset-4 decoration-[#D8AD59] transition-colors"
              >
                {t.footer.termsAndConditions}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
