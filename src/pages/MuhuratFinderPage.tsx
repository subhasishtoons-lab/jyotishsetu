import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Sparkles, Sun, Moon, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  formatLocalTime,
  formatPanchangDate,
  formatTimeRange,
  loadSavedPanchangCity,
  localizeDigits,
  savePanchangCity,
} from '../utils/panchang';
import {
  BIRTHPLACE_UI,
  assertBirthplaceMatchesCalculation,
  createPresetBirthplace,
  validateBirthplaceSelection,
  type BirthplaceSelection,
} from '../utils/birthplace';
import {
  CALC_UI,
  CHOGHADIYA_LABELS,
  KARANA_NAMES,
  NAKSHATRA_NAMES,
  YOGA_NAMES,
  getLocalizedTithiName,
} from '../i18n/vedicLabels';
import { computeLivePanchang } from '../utils/vedicAstrology';
import { BirthplaceSelector } from '../components/BirthplaceSelector';

function toDateInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function MuhuratFinderPage() {
  const { language, t } = useLanguage();
  const ui = CALC_UI[language];
  const bpUi = BIRTHPLACE_UI[language];

  const [dateStr, setDateStr] = useState<string>(() => toDateInputValue(new Date()));
  const [locationSelection, setLocationSelection] = useState<BirthplaceSelection>(() =>
    createPresetBirthplace(
      loadSavedPanchangCity(typeof window !== 'undefined' ? window.localStorage : null),
    ),
  );

  const parsedParts = useMemo(() => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const fallback = new Date();
    return {
      year: y || fallback.getFullYear(),
      month: m || fallback.getMonth() + 1,
      day: d || fallback.getDate(),
    };
  }, [dateStr]);

  const locationValidation = useMemo(
    () => validateBirthplaceSelection(locationSelection, dateStr, '12:00', language),
    [locationSelection, dateStr, language],
  );
  const resolvedLocation = locationValidation.resolved;

  const panchang = useMemo(() => {
    if (!resolvedLocation) return null;
    if (
      !assertBirthplaceMatchesCalculation(locationSelection, resolvedLocation, {
        lat: resolvedLocation.lat,
        lon: resolvedLocation.lon,
        utcOffsetMinutes: resolvedLocation.utcOffsetMinutes,
      })
    ) {
      return null;
    }
    return computeLivePanchang(
      parsedParts.year,
      parsedParts.month,
      parsedParts.day,
      resolvedLocation.lat,
      resolvedLocation.lon,
      resolvedLocation.utcOffsetMinutes,
    );
  }, [parsedParts, locationSelection, resolvedLocation]);

  const formattedDate = useMemo(
    () =>
      formatPanchangDate(
        panchang
          ? panchang.dateLocal
          : new Date(parsedParts.year, parsedParts.month - 1, parsedParts.day, 12, 0, 0),
        language,
      ),
    [panchang, parsedParts, language],
  );

  const copy = {
    en: {
      kicker: 'Shubha Muhurat · Electional Vedic Timekeeping',
      title: 'Muhurat & Choghadiya Finder',
      subtitle:
        'Find live auspicious Muhurat and Day/Night Choghadiya intervals calculated from astronomical Sunrise, Sunset, Tithi, and Nakshatra for your chosen date and location.',
      brahma: 'Brahma Muhurat',
      brahmaNote: 'Best for meditation, study, prayer, and quiet spiritual discipline.',
      abhijit: 'Abhijit Muhurat',
      abhijitNote: 'Most versatile midday Muhurat for launching important initiatives.',
      vijaya: 'Vijaya Muhurat',
      vijayaNote: 'Traditionally favourable for decisive action, applications, and agreements.',
      godhuli: 'Godhuli Muhurat',
      godhuliNote: 'Sacred twilight window surrounding local Sunset.',
      rahu: 'Rahu Kaal',
      yamaganda: 'Yamaganda Kaal',
      gulika: 'Gulika Kaal',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      tithi: 'Tithi',
      nakshatra: 'Nakshatra',
      yoga: 'Yoga',
      karana: 'Karana',
      auspiciousTag: 'Auspicious',
      neutralTag: 'Neutral',
      cautionTag: 'Caution',
    },
    hi: {
      kicker: 'शुभ मुहूर्त · वैदिक कालगणना',
      title: 'मुहूर्त एवं चौघड़िया खोजक',
      subtitle:
        'अपने चुने हुए स्थान और तिथि के वास्तविक सूर्योदय, सूर्यास्त, तिथि व नक्षत्र के आधार पर शुभ मुहूर्त तथा दिन-रात्रि चौघड़िया जानें।',
      brahma: 'ब्रह्म मुहूर्त',
      brahmaNote: 'ध्यान, मंत्र जप, स्वाध्याय और प्रातःकालीन साधना हेतु सर्वोत्तम।',
      abhijit: 'अभिजित मुहूर्त',
      abhijitNote: 'महत्वपूर्ण कार्यों के शुभारंभ हेतु मध्याह्न की श्रेष्ठ शुभ अवधि।',
      vijaya: 'विजय मुहूर्त',
      vijayaNote: 'निर्णायक कार्य, समझौते और महत्वपूर्ण प्रयासों के लिए अनुकूल।',
      godhuli: 'गोधूलि मुहूर्त',
      godhuliNote: 'सूर्यास्त के समय की पवित्र संध्या वेला।',
      rahu: 'राहु काल',
      yamaganda: 'यमगंड काल',
      gulika: 'गुलिक काल',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      tithi: 'तिथि',
      nakshatra: 'नक्षत्र',
      yoga: 'योग',
      karana: 'करण',
      auspiciousTag: 'शुभ',
      neutralTag: 'सामान्य',
      cautionTag: 'सतर्कता',
    },
    as: {
      kicker: 'শুভ মুহূৰ্ত · বৈদিক কালগণনা',
      title: 'মুহূৰ্ত আৰু চৌঘড়িয়া নিৰ্ণায়ক',
      subtitle:
        'আপোনাৰ নিৰ্বাচিত স্থান আৰু তাৰিখৰ বাস্তৱ সূৰ্যোদয়, সূৰ্যাস্ত, তিথি আৰু নক্ষত্ৰৰ ভিত্তিত শুভ মুহূৰ্ত তথা দিন-ৰাতিৰ চৌঘড়িয়া জানক।',
      brahma: 'ব্ৰহ্ম মুহূৰ্ত',
      brahmaNote: 'প্ৰাতঃকালীন ধ্যান, নাম-প্ৰসংগ, জপ আৰু অধ্যয়নৰ বাবে সৰ্বোত্তম সময়।',
      abhijit: 'অভিজিত মুহূৰ্ত',
      abhijitNote: 'গুৰুত্বপূৰ্ণ আৰু শুভ কাম আৰম্ভ কৰাৰ বাবে দুপৰীয়াৰ শ্ৰেষ্ঠ মুহূৰ্ত।',
      vijaya: 'বিজয় মুহূৰ্ত',
      vijayaNote: 'সিদ্ধান্তমূলক কাম, চুক্তি আৰু গুৰুত্বপূৰ্ণ পদক্ষেপৰ বাবে অনুকূল সময়।',
      godhuli: 'গোধূলি মুহূৰ্ত',
      godhuliNote: 'স্থানীয় সূৰ্যাস্তৰ পৱিত্ৰ সন্ধিয়া ক্ষণ।',
      rahu: 'ৰাহু কাল',
      yamaganda: 'যমগণ্ড কাল',
      gulika: 'গুলিক কাল',
      sunrise: 'সূৰ্যোদয়',
      sunset: 'সূৰ্যাস্ত',
      tithi: 'তিথি',
      nakshatra: 'নক্ষত্ৰ',
      yoga: 'যোগ',
      karana: 'কৰণ',
      auspiciousTag: 'শুভ',
      neutralTag: 'সাধাৰণ',
      cautionTag: 'সতৰ্কতা',
    },
  }[language];

  const handleLocationChange = (next: BirthplaceSelection) => {
    setLocationSelection(next);
    // Privacy rule: only persist a preset city ID preference; never store custom locations or coordinates.
    if (next.mode === 'preset') {
      savePanchangCity(next.presetCityId, typeof window !== 'undefined' ? window.localStorage : null);
    }
  };

  const effectiveOffsetMinutes = resolvedLocation?.utcOffsetMinutes ?? 0;

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.12em]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24090E] border border-[#D8AD59]/60 text-[#EBD08D] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
                  <span>{ui.liveEngineBadge}</span>
                </span>
                <span className="text-[#EBD08D]/85">{copy.kicker}</span>
              </div>
              <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F8F0E3]">
                {copy.title}
              </h1>
              <p className="mt-3 text-base text-[#F8F0E3]/82 leading-relaxed">{copy.subtitle}</p>
            </div>

            {/* Interactive Date + Searchable Location Controls */}
            <div className="lg:col-span-6 p-4 sm:p-5 rounded-lg bg-[#24090E] border border-[#D8AD59]/40 space-y-4">
              <div>
                <label
                  htmlFor="muhurat-date"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#EBD08D] mb-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
                  <span>{ui.selectDateLabel}</span>
                </label>
                <input
                  id="muhurat-date"
                  type="date"
                  min="1900-01-01"
                  max="2099-12-31"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-[#351016] border border-[#D8AD59]/50 text-sm text-[#F8F0E3] [color-scheme:dark] focus:outline-none focus:border-[#E99A32]"
                />
              </div>

              <BirthplaceSelector
                idPrefix="muhurat"
                value={locationSelection}
                onChange={handleLocationChange}
                dateStr={dateStr}
                timeStr="12:00"
                contextKind="location"
                theme="dark"
                label={t.panchang.citySelectorLabel}
                showValidation={locationSelection.mode === 'custom'}
              />
            </div>
          </div>

          {/* Panchang Summary Bar */}
          <div className="mt-6 pt-4 border-t border-[#D8AD59]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#EBD08D]">
            {resolvedLocation && panchang ? (
              <>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#24090E] border border-[#D8AD59]/40 text-[10px] font-semibold text-[#EBD08D]">
                    {resolvedLocation.mode === 'custom' ? bpUi.customBadge : bpUi.presetBadge}
                  </span>
                  <strong className="text-[#F8F0E3]">{resolvedLocation.displayName}</strong>
                  <span className="font-mono tabular-nums text-xs text-[#EBD08D]/85">
                    ({resolvedLocation.coordinatesLabel} · {resolvedLocation.timezoneLabel})
                  </span>
                </span>
                <span>
                  <strong className="text-[#F8F0E3]">{formattedDate.formattedDate}</strong>
                </span>
                <span>
                  {copy.tithi}:{' '}
                  <strong className="text-[#F8F0E3]">
                    {getLocalizedTithiName(panchang.paksha, panchang.tithiInPaksha, language)}
                  </strong>
                </span>
                <span>
                  {copy.nakshatra}:{' '}
                  <strong className="text-[#F8F0E3]">
                    {NAKSHATRA_NAMES[language][panchang.nakshatraIndex]}
                  </strong>
                </span>
                <span>
                  {copy.yoga}:{' '}
                  <strong className="text-[#F8F0E3]">{YOGA_NAMES[language][panchang.yogaIndex]}</strong>
                </span>
                <span>
                  {copy.karana}:{' '}
                  <strong className="text-[#F8F0E3]">{KARANA_NAMES[language][panchang.karanaId]}</strong>
                </span>
                <span>
                  {copy.sunrise}:{' '}
                  <strong className="text-[#F8F0E3]">
                    {formatLocalTime(panchang.sunrise, effectiveOffsetMinutes, language)}
                  </strong>
                </span>
                <span>
                  {copy.sunset}:{' '}
                  <strong className="text-[#F8F0E3]">
                    {formatLocalTime(panchang.sunset, effectiveOffsetMinutes, language)}
                  </strong>
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-2 text-[#F5C58A]">
                <AlertTriangle className="w-4 h-4 text-[#E99A32] shrink-0" aria-hidden="true" />
                <span>{bpUi.coordinatesRequiredTitle}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {!panchang || !resolvedLocation ? (
          <div
            role="alert"
            className="p-6 sm:p-8 rounded-lg bg-[#FDF9F2] border-l-4 border-[#9A3412] border-y border-r border-y-[#D8AD59]/50 border-r-[#D8AD59]/50 flex items-start gap-4"
          >
            <AlertTriangle className="w-6 h-6 text-[#9A3412] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl font-semibold text-[#351016]">
                {bpUi.coordinatesRequiredTitle}
              </h2>
              <p className="mt-2 text-sm text-[#542D24] leading-relaxed">
                {bpUi.coordinatesRequiredBody}
              </p>
              <ul className="mt-3 list-disc list-inside text-xs sm:text-sm text-[#7A2029] space-y-1">
                {locationValidation.errors.placeNameMissing && <li>{bpUi.errPlaceName}</li>}
                {locationValidation.errors.latMissing && <li>{bpUi.errLatMissing}</li>}
                {locationValidation.errors.latInvalid && <li>{bpUi.errLatInvalid}</li>}
                {locationValidation.errors.lonMissing && <li>{bpUi.errLonMissing}</li>}
                {locationValidation.errors.lonInvalid && <li>{bpUi.errLonInvalid}</li>}
                {locationValidation.errors.timezoneInvalid && <li>{bpUi.errTimezone}</li>}
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Auspicious & Avoidance Windows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <h2 className="font-display text-2xl font-semibold text-[#351016]">
                  {ui.auspiciousWindowsTitle}
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: copy.brahma, slot: panchang.brahmaMuhurat, note: copy.brahmaNote },
                    { name: copy.abhijit, slot: panchang.abhijitMuhurat, note: copy.abhijitNote },
                    { name: copy.vijaya, slot: panchang.vijayaMuhurat, note: copy.vijayaNote },
                    { name: copy.godhuli, slot: panchang.godhuliMuhurat, note: copy.godhuliNote },
                  ].map((w) => (
                    <div
                      key={w.name}
                      className="p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40"
                    >
                      <p className="text-xs font-semibold text-[#2B5A3C]">{copy.auspiciousTag}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-[#351016]">
                        {w.name}
                      </h3>
                      <p className="mt-1.5 font-mono tabular-nums text-sm font-semibold text-[#542D24]">
                        {formatTimeRange(w.slot?.start ?? null, w.slot?.end ?? null, effectiveOffsetMinutes, language)}
                      </p>
                      <p className="mt-1.5 text-xs text-[#542D24]/85 leading-relaxed">{w.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <h2 className="font-display text-2xl font-semibold text-[#351016]">
                  {ui.avoidWindowsTitle}
                </h2>
                <div className="mt-4 space-y-3.5">
                  {[
                    { name: copy.rahu, slot: panchang.rahuKaal },
                    { name: copy.yamaganda, slot: panchang.yamaganda },
                    { name: copy.gulika, slot: panchang.gulikaKaal },
                  ].map((w) => (
                    <div
                      key={w.name}
                      className="p-4 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/40 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-[11px] font-semibold text-[#E99A32]">{copy.cautionTag}</p>
                        <h3 className="font-display text-base font-semibold text-[#F8F0E3]">{w.name}</h3>
                      </div>
                      <p className="font-mono tabular-nums text-xs sm:text-sm font-medium text-[#EBD08D]">
                        {formatTimeRange(w.slot?.start ?? null, w.slot?.end ?? null, effectiveOffsetMinutes, language)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day & Night Choghadiya Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { title: ui.dayChoghadiyaTitle, icon: Sun, slots: panchang.dayChoghadiya },
                { title: ui.nightChoghadiyaTitle, icon: Moon, slots: panchang.nightChoghadiya },
              ].map((block) => {
                const Icon = block.icon;
                return (
                  <div
                    key={block.title}
                    className="rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden"
                  >
                    <div className="px-5 py-4 bg-[#351016] text-[#F8F0E3] flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#E99A32]" aria-hidden="true" />
                      <h2 className="font-display text-lg font-semibold">{block.title}</h2>
                    </div>
                    <div className="divide-y divide-[#D8AD59]/20">
                      {block.slots.map((slot, idx) => {
                        const info = CHOGHADIYA_LABELS[language][slot.type];
                        const badgeClass =
                          slot.nature === 'auspicious'
                            ? 'bg-[#E6F1EA] text-[#2B5A3C] border-[#2B5A3C]/25'
                            : slot.nature === 'neutral'
                              ? 'bg-[#EFE3CE] text-[#7C4710] border-[#D8AD59]/50'
                              : 'bg-[#F8E2E0] text-[#7A2029] border-[#7A2029]/25';
                        const badgeText =
                          slot.nature === 'auspicious'
                            ? copy.auspiciousTag
                            : slot.nature === 'neutral'
                              ? copy.neutralTag
                              : copy.cautionTag;
                        return (
                          <div
                            key={`${slot.type}-${idx}`}
                            className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display font-semibold text-[#351016]">
                                  {localizeDigits(idx + 1, language)}. {info.name}
                                </span>
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badgeClass}`}
                                >
                                  {badgeText}
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-[#542D24]/85">{info.meaning}</p>
                            </div>
                            <span className="font-mono tabular-nums text-xs font-medium text-[#351016] flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#C47616]" aria-hidden="true" />
                              {formatTimeRange(slot.start, slot.end, effectiveOffsetMinutes, language)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Honest Guidance Note */}
        <div className="p-5 rounded-lg bg-[#EFE3CE]/80 border border-[#D8AD59]/50 flex items-start gap-3 text-xs sm:text-sm text-[#542D24]">
          <AlertTriangle className="w-4 h-4 text-[#8C5320] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">{ui.muhuratNote}</p>
        </div>
      </section>
    </div>
  );
}
