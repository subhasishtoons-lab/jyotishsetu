import React, { useState, useMemo } from 'react';
import {
  Sunrise,
  Sunset,
  Clock,
  Calendar,
  ArrowRight,
  MapPin,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  PANCHANG_CITIES,
  getPanchangCityById,
  loadSavedPanchangCity,
  savePanchangCity,
  formatPanchangDate,
  formatLocalTime,
  formatTimeRange,
  localizeDigits,
  type PanchangCityId,
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
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

function todayIsoDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const LABELS = {
  en: {
    moonRashi: 'Chandra Rashi',
    sunRashi: 'Surya Rashi',
    pada: 'Pada',
    vikram: 'Vikram Samvat',
    brahma: 'Brahma Muhurat',
    brahmaNote: 'Pre-dawn spiritual practice, meditation, and Vedic study window.',
    abhijit: 'Abhijit Muhurat',
    abhijitNote: 'Midday auspicious window around local solar noon for important beginnings.',
    vijaya: 'Vijaya Muhurat',
    vijayaNote: 'Afternoon auspicious Muhurat favoured for decisive initiatives.',
    godhuli: 'Godhuli Muhurat',
    godhuliNote: 'Sacred twilight window centred on local astronomical sunset.',
    yamaganda: 'Yamaganda Kaal',
    yamagandaNote: 'Traditional caution interval; avoid launching major ceremonies.',
    gulika: 'Gulika Kaal',
    gulikaNote: 'Saturn-ruled daytime segment; generally kept for routine work.',
    muhuratCtaTitle: 'Explore Full Day & Night Choghadiya and Muhurat Windows',
    muhuratCtaBody:
      'Inspect all 16 Day and Night Choghadiya slots (Amrit, Shubh, Labh, Char, Rog, Kaal, Udveg) calculated for your chosen city and date.',
    muhuratCtaBtn: 'Open Muhurat Finder',
  },
  hi: {
    moonRashi: 'चंद्र राशि',
    sunRashi: 'सूर्य राशि',
    pada: 'चरण',
    vikram: 'विक्रम संवत',
    brahma: 'ब्रह्म मुहूर्त',
    brahmaNote: 'सूर्योदय से पूर्व ध्यान, प्राणायाम और स्वाध्याय के लिए सर्वोत्तम अवधि।',
    abhijit: 'अभिजित मुहूर्त',
    abhijitNote: 'स्थानीय मध्याह्न के निकट शुभ कार्यों के आरंभ हेतु अत्यंत शुभ मुहूर्त।',
    vijaya: 'विजय मुहूर्त',
    vijayaNote: 'दोपहर का शुभ मुहूर्त जो संकल्प और महत्वपूर्ण प्रयासों के लिए अनुकूल है।',
    godhuli: 'गोधूलि मुहूर्त',
    godhuliNote: 'सूर्यास्त के समय की पवित्र संध्या बेला।',
    yamaganda: 'यमगंड काल',
    yamagandaNote: 'पारंपरिक सावधानी अवधि; बड़े मांगलिक आरंभ टालें।',
    gulika: 'गुलिक काल',
    gulikaNote: 'शनि-प्रधान दिवस खंड; सामान्य नियमित कार्यों के लिए उपयुक्त।',
    muhuratCtaTitle: 'संपूर्ण दिन एवं रात्रि चौघड़िया और मुहूर्त देखें',
    muhuratCtaBody:
      'अपने चुने गए शहर और तिथि के लिए दिन और रात्रि के सभी 16 चौघड़िया (अमृत, शुभ, लाभ, चर, रोग, काल, उद्वेग) का लाइव समय देखें।',
    muhuratCtaBtn: 'मुहूर्त खोजक खोलें',
  },
  as: {
    moonRashi: 'চন্দ্ৰ ৰাশি',
    sunRashi: 'সূৰ্য ৰাশি',
    pada: 'পাদ',
    vikram: 'বিক্ৰম সংৱৎ',
    brahma: 'ব্ৰহ্ম মুহূৰ্ত',
    brahmaNote: 'সূৰ্যোদয়ৰ পূৰ্বে ধ্যান, সাধনা আৰু অধ্যয়নৰ বাবে সৰ্বোত্তম সময়।',
    abhijit: 'অভিজিৎ মুহূৰ্ত',
    abhijitNote: 'স্থানীয় মধ্যাহ্নৰ ওচৰৰ অতি শুভ মুহূৰ্ত, যি নতুন শুভ আৰম্ভণিৰ বাবে অনুকূল।',
    vijaya: 'বিজয় মুহূৰ্ত',
    vijayaNote: 'বিয়লিৰ শুভ মুহূৰ্ত যি গুৰুত্বপূৰ্ণ সংকল্প আৰু প্ৰচেষ্টাৰ বাবে অনুকূল।',
    godhuli: 'গোধূলি মুহূৰ্ত',
    godhuliNote: 'স্থানীয় সূৰ্যাস্তক কেন্দ্ৰ কৰি পৱিত্ৰ সন্ধিয়াৰ বেলা।',
    yamaganda: 'যমগণ্ড কাল',
    yamagandaNote: 'পৰম্পৰাগত সাৱধানতাৰ সময়; ডাঙৰ মাংগলিক আৰম্ভণি পৰিহাৰ কৰক।',
    gulika: 'গুলিক কাল',
    gulikaNote: 'শনি-প্ৰধান দিনৰ খণ্ড; সাধাৰণ নিয়মীয়া কামৰ বাবে উপযোগী।',
    muhuratCtaTitle: 'সম্পূৰ্ণ দিন-ৰাতিৰ চৌঘড়িয়া আৰু মুহূৰ্ত সময় চাওক',
    muhuratCtaBody:
      'আপোনাৰ নিৰ্বাচিত চহৰ আৰু তাৰিখৰ বাবে দিন আৰু ৰাতিৰ ১৬টা চৌঘড়িয়া (অমৃত, শুভ, লাভ, চৰ, ৰোগ, কাল, উদ্বেগ) লাইভ গণনাৰে চাওক।',
    muhuratCtaBtn: 'মুহূৰ্ত সন্ধানক খোলক',
  },
} as const;

export function PanchangPage() {
  const { language, t } = useLanguage();
  const { data } = t.panchang;
  const f = data.fields;
  const ui = CALC_UI[language];
  const lbl = LABELS[language];

  const [selectedCityId, setSelectedCityId] = useState<PanchangCityId>(() =>
    loadSavedPanchangCity(typeof window !== 'undefined' ? window.localStorage : null),
  );
  const [dateStr, setDateStr] = useState<string>(() => todayIsoDate());

  const selectedCity = useMemo(() => getPanchangCityById(selectedCityId), [selectedCityId]);

  const { year, month, day } = useMemo(() => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const fallback = new Date();
    return {
      year: y || fallback.getFullYear(),
      month: m || fallback.getMonth() + 1,
      day: d || fallback.getDate(),
    };
  }, [dateStr]);

  const formattedDate = useMemo(
    () => formatPanchangDate(new Date(year, month - 1, day, 12, 0, 0), language),
    [year, month, day, language],
  );

  const live = useMemo(
    () =>
      computeLivePanchang(
        year,
        month,
        day,
        selectedCity.lat,
        selectedCity.lon,
        selectedCity.utcOffsetMinutes,
      ),
    [year, month, day, selectedCity],
  );

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value as PanchangCityId;
    setSelectedCityId(nextId);
    savePanchangCity(nextId, typeof window !== 'undefined' ? window.localStorage : null);
  };

  const tithiName = getLocalizedTithiName(live.paksha, live.tithiInPaksha, language);
  const nakshatraName = NAKSHATRA_NAMES[language][live.nakshatraIndex];
  const yogaName = YOGA_NAMES[language][live.yogaIndex];
  const karanaName = KARANA_NAMES[language][live.karanaId];

  const coreFields = [
    {
      key: 'date',
      label: f.date.label,
      value: formattedDate.formattedDate,
      sub: `${formattedDate.weekdayVedic} · ${lbl.vikram} ${localizeDigits(live.vikramSamvat, language)}`,
      isTime: false,
      isCaution: false,
    },
    {
      key: 'tithi',
      label: f.tithi.label,
      value: tithiName,
      sub: live.tithiEndTime
        ? `${ui.endsAtLabel}: ${formatLocalTime(live.tithiEndTime, selectedCity.utcOffsetMinutes, language)}`
        : `${lbl.moonRashi}: ${RASHI_NAMES[language][live.moonRashiIndex]}`,
      isTime: false,
      isCaution: false,
    },
    {
      key: 'nakshatra',
      label: f.nakshatra.label,
      value: nakshatraName,
      sub: `${lbl.pada} ${localizeDigits(live.nakshatraPada, language)}${
        live.nakshatraEndTime
          ? ` · ${ui.endsAtLabel}: ${formatLocalTime(live.nakshatraEndTime, selectedCity.utcOffsetMinutes, language)}`
          : ''
      }`,
      isTime: false,
      isCaution: false,
    },
    {
      key: 'yoga',
      label: f.yoga.label,
      value: yogaName,
      sub: `${lbl.moonRashi}: ${RASHI_NAMES[language][live.moonRashiIndex]}`,
      isTime: false,
      isCaution: false,
    },
    {
      key: 'karana',
      label: f.karana.label,
      value: karanaName,
      sub: `${lbl.sunRashi}: ${RASHI_NAMES[language][live.sunRashiIndex]}`,
      isTime: false,
      isCaution: false,
    },
    {
      key: 'sunrise',
      label: f.sunrise.label,
      value: live.sunrise
        ? formatLocalTime(live.sunrise, selectedCity.utcOffsetMinutes, language)
        : '—',
      sub: `${selectedCity.names[language]} · ${selectedCity.timezone}`,
      isTime: true,
      isCaution: false,
    },
    {
      key: 'sunset',
      label: f.sunset.label,
      value: live.sunset
        ? formatLocalTime(live.sunset, selectedCity.utcOffsetMinutes, language)
        : '—',
      sub: `${ui.ayanamshaLabel}: ${localizeDigits(formatDegMin(live.ayanamsha), language)}`,
      isTime: true,
      isCaution: false,
    },
    {
      key: 'rahuKaal',
      label: f.rahuKaal.label,
      value: live.rahuKaal
        ? formatTimeRange(live.rahuKaal.start, live.rahuKaal.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      sub: t.panchang.cautionLabel,
      isTime: true,
      isCaution: true,
    },
  ];

  const muhuratWindows = [
    {
      name: lbl.brahma,
      time: live.brahmaMuhurat
        ? formatTimeRange(live.brahmaMuhurat.start, live.brahmaMuhurat.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      nature: 'auspicious' as const,
      note: lbl.brahmaNote,
    },
    {
      name: lbl.abhijit,
      time: live.abhijitMuhurat
        ? formatTimeRange(live.abhijitMuhurat.start, live.abhijitMuhurat.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      nature: 'auspicious' as const,
      note: lbl.abhijitNote,
    },
    {
      name: lbl.vijaya,
      time: live.vijayaMuhurat
        ? formatTimeRange(live.vijayaMuhurat.start, live.vijayaMuhurat.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      nature: 'auspicious' as const,
      note: lbl.vijayaNote,
    },
    {
      name: lbl.godhuli,
      time: live.godhuliMuhurat
        ? formatTimeRange(live.godhuliMuhurat.start, live.godhuliMuhurat.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      nature: 'auspicious' as const,
      note: lbl.godhuliNote,
    },
    {
      name: lbl.yamaganda,
      time: live.yamaganda
        ? formatTimeRange(live.yamaganda.start, live.yamaganda.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      nature: 'caution' as const,
      note: lbl.yamagandaNote,
    },
    {
      name: lbl.gulika,
      time: live.gulikaKaal
        ? formatTimeRange(live.gulikaKaal.start, live.gulikaKaal.end, selectedCity.utcOffsetMinutes, language)
        : '—',
      nature: 'caution' as const,
      note: lbl.gulikaNote,
    },
  ];

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                as="h1"
                kicker={t.panchang.kicker}
                title={t.panchang.title}
                subtitle={t.panchang.subtitle}
                align="left"
                theme="dark"
              />
            </div>

            {/* Interactive City & Date Controls */}
            <div className="lg:col-span-5">
              <div className="p-4 sm:p-5 rounded-lg bg-[#24090E] border border-[#D8AD59]/40 space-y-3.5">
                <div>
                  <label
                    htmlFor="panchang-city-select"
                    className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#EBD08D]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#E99A32] shrink-0" aria-hidden="true" />
                    <span>{t.panchang.citySelectorLabel}</span>
                  </label>
                  <select
                    id="panchang-city-select"
                    value={selectedCity.id}
                    onChange={handleCityChange}
                    className="mt-2 w-full h-11 px-3.5 rounded-md bg-[#351016] border border-[#D8AD59]/50 text-sm text-[#F8F0E3] focus:outline-none focus:border-[#E99A32] cursor-pointer"
                  >
                    {PANCHANG_CITIES.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.names[language]}, {city.regions[language]} ({city.coordinates})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="panchang-date-input"
                    className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#EBD08D]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#E99A32] shrink-0" aria-hidden="true" />
                    <span>{ui.selectDateLabel}</span>
                  </label>
                  <input
                    id="panchang-date-input"
                    type="date"
                    min="1900-01-01"
                    max="2099-12-31"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="mt-2 w-full h-10 px-3.5 rounded-md bg-[#351016] border border-[#D8AD59]/50 text-sm text-[#F8F0E3] [color-scheme:dark] focus:outline-none focus:border-[#E99A32]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D8AD59]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#EBD08D]">
            <span>
              {data.locationLabel}:{' '}
              <strong className="font-semibold text-[#F8F0E3]">
                {selectedCity.names[language]}, {selectedCity.regions[language]}
              </strong>
            </span>
            <span>
              {t.panchang.coordinatesLabel}:{' '}
              <strong className="font-mono tabular-nums font-semibold text-[#F8F0E3]">
                {selectedCity.coordinates} · {selectedCity.timezone}
              </strong>
            </span>
            <span>
              {data.samvatLabel}:{' '}
              <strong className="font-semibold text-[#F8F0E3]">
                {lbl.vikram} {localizeDigits(live.vikramSamvat, language)}
              </strong>
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Live Ephemeris Confirmation Bar */}
        <div
          role="note"
          className="p-4 sm:p-5 rounded-lg bg-[#EFE3CE]/80 border-l-4 border-[#2B5A3C] border-y border-r border-y-[#D8AD59]/45 border-r-[#D8AD59]/45 flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-[#2B5A3C] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#351016]">
              {ui.liveEngineBadge}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#542D24] leading-relaxed">
              {ui.methodologyBadge}
            </p>
          </div>
        </div>

        {/* 8 Core Live Panchang Cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreFields.map((item) => (
            <div
              key={item.key}
              className={`p-6 rounded-lg border ${
                item.isCaution
                  ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]/40'
                  : 'bg-[#FDF9F2] text-[#351016] border-[#D8AD59]/35'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-medium tracking-wider ${
                    item.isCaution ? 'text-[#E99A32]' : 'text-[#8C5320]'
                  }`}
                >
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  {item.key === 'date' && (
                    <Calendar className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                  )}
                  {item.key === 'sunrise' && (
                    <Sunrise className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                  )}
                  {item.key === 'sunset' && (
                    <Sunset className="w-4 h-4 text-[#C47616]" aria-hidden="true" />
                  )}
                  {item.key === 'rahuKaal' && (
                    <Clock className="w-4 h-4 text-[#E99A32]" aria-hidden="true" />
                  )}
                </div>
              </div>

              <p
                className={`mt-3 text-xl font-semibold ${
                  item.isTime ? 'font-mono tabular-nums' : 'font-display'
                } ${item.isCaution ? 'text-[#F8F0E3]' : 'text-[#351016]'}`}
              >
                {item.value}
              </p>

              <p
                className={`mt-1.5 text-xs ${
                  item.isCaution ? 'text-[#F8F0E3]/80' : 'text-[#542D24]/85'
                }`}
              >
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Live Muhurat & Caution Timings */}
        <div className="pt-2">
          <h2 className="font-display text-2xl font-semibold text-[#351016]">
            {data.extraTimingsTitle}
          </h2>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {muhuratWindows.map((windowItem) => {
              const isAuspicious = windowItem.nature === 'auspicious';
              return (
                <div
                  key={windowItem.name}
                  className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35"
                >
                  <p
                    className={`text-xs font-semibold tracking-wide ${
                      isAuspicious ? 'text-[#2B5A3C]' : 'text-[#7A2029]'
                    }`}
                  >
                    {isAuspicious ? t.panchang.auspiciousLabel : t.panchang.cautionLabel}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-[#351016]">
                    {windowItem.name}
                  </h3>
                  <p className="mt-2 font-mono tabular-nums text-base font-medium text-[#542D24]">
                    {windowItem.time}
                  </p>
                  <p className="mt-2 text-sm text-[#542D24]/85 leading-relaxed">
                    {windowItem.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Choghadiya & Muhurat Finder CTA */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#351016] text-[#F8F0E3] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs text-[#E99A32] font-semibold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{ui.liveEngineBadge}</span>
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-[#EBD08D]">
              {lbl.muhuratCtaTitle}
            </h3>
            <p className="mt-2 text-sm text-[#F8F0E3]/82 leading-relaxed">{lbl.muhuratCtaBody}</p>
          </div>
          <Link
            to="/tools/muhurat"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <span>{lbl.muhuratCtaBtn}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
