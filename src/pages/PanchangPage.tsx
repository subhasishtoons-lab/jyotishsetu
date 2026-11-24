import React, { useState, useMemo } from 'react';
import { Sunrise, Sunset, Clock, Calendar, ArrowRight, MapPin, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  PANCHANG_CITIES,
  getPanchangCityById,
  loadSavedPanchangCity,
  savePanchangCity,
  formatPanchangDate,
  type PanchangCityId,
} from '../utils/panchang';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

export function PanchangPage() {
  const { language, t } = useLanguage();
  const { data } = t.panchang;
  const f = data.fields;

  const [selectedCityId, setSelectedCityId] = useState<PanchangCityId>(() =>
    loadSavedPanchangCity(typeof window !== 'undefined' ? window.localStorage : null),
  );

  const selectedCity = useMemo(() => getPanchangCityById(selectedCityId), [selectedCityId]);
  const todayFormatted = useMemo(() => formatPanchangDate(new Date(), language), [language]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value as PanchangCityId;
    setSelectedCityId(nextId);
    savePanchangCity(nextId, typeof window !== 'undefined' ? window.localStorage : null);
  };

  const coreFields = [
    {
      key: 'date',
      label: f.date.label,
      value: todayFormatted.formattedDate,
      sub: `${todayFormatted.weekdayVedic} · ${f.date.sub.split('·').slice(1).join('·').trim() || f.date.sub}`,
      isTime: false,
      isCaution: false,
      isSample: false,
    },
    { key: 'tithi', ...f.tithi, isTime: false, isCaution: false, isSample: true },
    { key: 'nakshatra', ...f.nakshatra, isTime: false, isCaution: false, isSample: true },
    { key: 'yoga', ...f.yoga, isTime: false, isCaution: false, isSample: true },
    { key: 'karana', ...f.karana, isTime: false, isCaution: false, isSample: true },
    { key: 'sunrise', ...f.sunrise, isTime: true, isCaution: false, isSample: true },
    { key: 'sunset', ...f.sunset, isTime: true, isCaution: false, isSample: true },
    { key: 'rahuKaal', ...f.rahuKaal, isTime: true, isCaution: true, isSample: true },
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

            {/* City Selector (Prepares Panchang for Location-Specific Calculations) */}
            <div className="lg:col-span-5">
              <div className="p-4 sm:p-5 rounded-lg bg-[#24090E] border border-[#D8AD59]/40">
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
                  className="mt-2.5 w-full h-11 px-3.5 rounded-md bg-[#351016] border border-[#D8AD59]/50 text-sm text-[#F8F0E3] focus:outline-none focus:border-[#E99A32] cursor-pointer"
                >
                  {PANCHANG_CITIES.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.names[language]}, {city.regions[language]} ({city.coordinates})
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-[#F8F0E3]/75 leading-relaxed">
                  {t.panchang.citySelectorHelper}
                </p>
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
              <strong className="font-semibold text-[#F8F0E3]">{data.samvatValue}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Prominent Sample-Data Warning Notice */}
        <div
          role="note"
          className="p-5 rounded-lg bg-[#F5E4CA] border-l-4 border-[#B85D19] border-y border-r border-y-[#D8AD59]/50 border-r-[#D8AD59]/50 flex items-start gap-3.5"
        >
          <AlertTriangle
            className="w-5 h-5 text-[#9A3412] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#7C2D12]">
              {data.demoNoticeTitle}
            </p>
            <p className="mt-1 text-sm text-[#542D24] leading-relaxed">{data.demoNoticeBody}</p>
          </div>
        </div>

        {/* 8 Core Panchang Cells */}
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
                  {item.isSample && (
                    <span
                      className={`text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded border ${
                        item.isCaution
                          ? 'border-[#D8AD59]/40 text-[#EBD08D]'
                          : 'border-[#D8AD59]/50 bg-[#EFE3CE]/70 text-[#7C3A12]'
                      }`}
                    >
                      {t.panchang.sampleTag}
                    </span>
                  )}
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

        {/* Additional Muhurat Timings */}
        <div className="pt-4">
          <h3 className="font-display text-2xl font-semibold text-[#351016]">
            {data.extraTimingsTitle}
          </h3>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.extraTimings.map((windowItem) => {
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
                  <h4 className="mt-1.5 font-display text-lg font-semibold text-[#351016]">
                    {windowItem.name}
                  </h4>
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

        {/* Phase 2 Roadmap Note */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#351016] text-[#F8F0E3] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl font-semibold text-[#EBD08D]">
              {t.panchang.phase2NoteTitle}
            </h3>
            <p className="mt-2 text-sm text-[#F8F0E3]/82 leading-relaxed">
              {t.panchang.phase2NoteBody}
            </p>
          </div>
          <Link
            to="/horoscope"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <span>{t.comingSoonCommon.goToHoroscope}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

