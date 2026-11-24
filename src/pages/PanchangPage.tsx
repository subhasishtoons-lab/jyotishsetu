import React from 'react';
import { Sunrise, Sunset, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

export function PanchangPage() {
  const { t } = useLanguage();
  const { data } = t.panchang;
  const f = data.fields;

  const coreFields = [
    { key: 'date', ...f.date, isTime: false, isCaution: false },
    { key: 'tithi', ...f.tithi, isTime: false, isCaution: false },
    { key: 'nakshatra', ...f.nakshatra, isTime: false, isCaution: false },
    { key: 'yoga', ...f.yoga, isTime: false, isCaution: false },
    { key: 'karana', ...f.karana, isTime: false, isCaution: false },
    { key: 'sunrise', ...f.sunrise, isTime: true, isCaution: false },
    { key: 'sunset', ...f.sunset, isTime: true, isCaution: false },
    { key: 'rahuKaal', ...f.rahuKaal, isTime: true, isCaution: true },
  ];

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={t.panchang.kicker}
            title={t.panchang.title}
            subtitle={t.panchang.subtitle}
            align="left"
            theme="dark"
          />
          <div className="mt-6 pt-4 border-t border-[#D8AD59]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#EBD08D]">
            <span>
              {data.locationLabel}: <strong className="font-semibold text-[#F8F0E3]">{data.locationValue}</strong>
            </span>
            <span>
              {data.samvatLabel}: <strong className="font-semibold text-[#F8F0E3]">{data.samvatValue}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Transparent Demonstration Data Notice */}
        <div className="p-5 rounded-lg bg-[#EFE3CE] border border-[#D8AD59]/50">
          <p className="text-xs font-semibold tracking-wider text-[#7C3A12]">
            {data.demoNoticeTitle}
          </p>
          <p className="mt-1 text-sm text-[#542D24] leading-relaxed">{data.demoNoticeBody}</p>
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
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium tracking-wider ${
                    item.isCaution ? 'text-[#E99A32]' : 'text-[#8C5320]'
                  }`}
                >
                  {item.label}
                </span>
                {item.key === 'date' && <Calendar className="w-4 h-4 text-[#C47616]" aria-hidden="true" />}
                {item.key === 'sunrise' && <Sunrise className="w-4 h-4 text-[#C47616]" aria-hidden="true" />}
                {item.key === 'sunset' && <Sunset className="w-4 h-4 text-[#C47616]" aria-hidden="true" />}
                {item.key === 'rahuKaal' && <Clock className="w-4 h-4 text-[#E99A32]" aria-hidden="true" />}
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
