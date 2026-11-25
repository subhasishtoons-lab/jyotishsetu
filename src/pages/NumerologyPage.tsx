import React, { useState, useMemo } from 'react';
import { Hash, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CALC_UI, NUMEROLOGY_PROFILES, PLANET_NAMES } from '../i18n/vedicLabels';
import { localizeDigits } from '../utils/panchang';
import { computeNumerology } from '../utils/vedicAstrology';

export function NumerologyPage() {
  const { language, t } = useLanguage();
  const ui = CALC_UI[language];
  const spec = t.comingSoonPages.numerology;

  const [fullName, setFullName] = useState('Aarav Sharma');
  const [birthDate, setBirthDate] = useState('1996-05-15');
  const [submitted, setSubmitted] = useState({ fullName: 'Aarav Sharma', birthDate: '1996-05-15' });

  const result = useMemo(
    () => computeNumerology(submitted.fullName, submitted.birthDate),
    [submitted],
  );

  const mulankProfile = NUMEROLOGY_PROFILES[language][result.mulank];
  const bhagyankProfile = NUMEROLOGY_PROFILES[language][result.bhagyank];

  const labels = {
    en: {
      mulank: 'Mulank (Birth / Psychic Number)',
      bhagyank: 'Bhagyank (Destiny / Life Path)',
      namank: 'Chaldean Namank (Name Number)',
      compound: 'Compound Total',
      ruler: 'Ruling Planet',
      friendly: 'Friendly Numbers',
      neutral: 'Neutral Numbers',
      challenging: 'Challenging Numbers',
      luckyColors: 'Favourable Colors',
      luckyDays: 'Favourable Days',
      nameHint: 'Enter English letters (A–Z) for classical Chaldean sound-value calculation.',
    },
    hi: {
      mulank: 'मूलांक (जन्म संख्या)',
      bhagyank: 'भाग्यांक (जीवन पथ संख्या)',
      namank: 'केल्डियन नामांक (नाम संख्या)',
      compound: 'संयुक्त योग',
      ruler: 'स्वामी ग्रह',
      friendly: 'मित्र अंक',
      neutral: 'सम अंक',
      challenging: 'चुनौतीपूर्ण अंक',
      luckyColors: 'शुभ रंग',
      luckyDays: 'अनुकूल वार',
      nameHint: 'पारंपरिक केल्डियन नामांक गणना के लिए नाम अंग्रेज़ी अक्षरों (A–Z) में लिखें।',
    },
    as: {
      mulank: 'মূলাংক (জন্ম সংখ্যা)',
      bhagyank: 'ভাগ্যাংক (জীৱন দিশৰ সংখ্যা)',
      namank: 'কেল্ডিয়ান নামাংক (নামৰ সংখ্যা)',
      compound: 'যৌগিক যোগফল',
      ruler: 'স্বামী গ্ৰহ',
      friendly: 'মিত্ৰ অংক',
      neutral: 'সম অংক',
      challenging: 'প্ৰত্যাহ্বানমূলক অংক',
      luckyColors: 'শুভ ৰং',
      luckyDays: 'অনুকূল বাৰ',
      nameHint: 'পৰম্পৰাগত কেল্ডিয়ান নামাংক গণনাৰ বাবে নামটো ইংৰাজী আখৰত (A–Z) লিখক।',
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ fullName, birthDate });
  };

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.12em]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24090E] border border-[#D8AD59]/60 text-[#EBD08D] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
              <span>{spec.kicker}</span>
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F8F0E3]">
            {spec.title}
          </h1>
          <p className="mt-3 text-base text-[#F8F0E3]/82 leading-relaxed max-w-3xl">
            {spec.subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-4 p-6 sm:p-7 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 space-y-5"
          >
            <div>
              <label htmlFor="num-name" className="block text-xs font-semibold text-[#351016] mb-1.5">
                {ui.nameLabel}
              </label>
              <input
                id="num-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={ui.namePlaceholder}
                className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016]"
              />
              <p className="mt-1.5 text-[11px] text-[#542D24]/80">{labels.nameHint}</p>
            </div>

            <div>
              <label htmlFor="num-date" className="block text-xs font-semibold text-[#351016] mb-1.5">
                {ui.dateLabel}
              </label>
              <input
                id="num-date"
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold hover:brightness-105 transition-all cursor-pointer shadow-sm"
            >
              <Hash className="w-4 h-4" aria-hidden="true" />
              <span>{ui.calculateBtn}</span>
            </button>
          </form>

          {/* Computed Results */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Mulank */}
              <div className="p-6 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/40">
                <p className="text-xs text-[#EBD08D] font-medium">{labels.mulank}</p>
                <p className="mt-2 font-display text-5xl font-semibold text-[#F5DC9B] tabular-nums">
                  {localizeDigits(result.mulank, language)}
                </p>
                <p className="mt-2 text-xs text-[#F8F0E3]/80">
                  {labels.ruler}: <strong>{PLANET_NAMES[language][result.mulankPlanet]}</strong>
                </p>
              </div>

              {/* Bhagyank */}
              <div className="p-6 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/40">
                <p className="text-xs text-[#EBD08D] font-medium">{labels.bhagyank}</p>
                <p className="mt-2 font-display text-5xl font-semibold text-[#F5DC9B] tabular-nums">
                  {localizeDigits(result.bhagyank, language)}
                </p>
                <p className="mt-2 text-xs text-[#F8F0E3]/80">
                  {labels.ruler}: <strong>{PLANET_NAMES[language][result.bhagyankPlanet]}</strong>
                </p>
              </div>

              {/* Chaldean Namank */}
              <div className="p-6 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/40">
                <p className="text-xs text-[#EBD08D] font-medium">{labels.namank}</p>
                {result.hasValidName && result.namank !== null && result.namankPlanet ? (
                  <>
                    <p className="mt-2 font-display text-5xl font-semibold text-[#F5DC9B] tabular-nums">
                      {localizeDigits(result.namank, language)}
                    </p>
                    <p className="mt-2 text-xs text-[#F8F0E3]/80">
                      {labels.compound}: {localizeDigits(result.namankCompound, language)} ·{' '}
                      <strong>{PLANET_NAMES[language][result.namankPlanet]}</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 font-display text-5xl font-semibold text-[#F5DC9B]/70 tabular-nums">
                      —
                    </p>
                    <p className="mt-2 text-xs text-[#F8F0E3]/80 leading-relaxed">
                      {labels.nameHint}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Archetype Insights */}
            <div className="p-6 sm:p-7 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 space-y-5">
              <div>
                <p className="text-xs font-semibold text-[#8C5320]">{labels.mulank}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#351016]">
                  {mulankProfile.archetype}
                </h2>
                <p className="mt-2 text-sm text-[#542D24] leading-relaxed">{mulankProfile.traits}</p>
              </div>

              <div className="pt-4 border-t border-[#D8AD59]/25">
                <p className="text-xs font-semibold text-[#8C5320]">{labels.bhagyank}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-[#351016]">
                  {bhagyankProfile.archetype}
                </h3>
                <p className="mt-1.5 text-sm text-[#542D24] leading-relaxed">
                  {bhagyankProfile.traits}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8AD59]/25 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3.5 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/30">
                  <p className="text-xs font-semibold text-[#2B5A3C]">{labels.friendly}</p>
                  <p className="mt-1 font-mono tabular-nums font-semibold text-[#351016]">
                    {result.friendlyNumbers.map((n) => localizeDigits(n, language)).join(', ')}
                  </p>
                </div>
                <div className="p-3.5 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/30">
                  <p className="text-xs font-semibold text-[#8C5320]">{labels.neutral}</p>
                  <p className="mt-1 font-mono tabular-nums font-semibold text-[#351016]">
                    {result.neutralNumbers.map((n) => localizeDigits(n, language)).join(', ')}
                  </p>
                </div>
                <div className="p-3.5 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/30">
                  <p className="text-xs font-semibold text-[#7A2029]">{labels.challenging}</p>
                  <p className="mt-1 font-mono tabular-nums font-semibold text-[#351016]">
                    {result.challengingNumbers.map((n) => localizeDigits(n, language)).join(', ')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-[#8C5320]">{labels.luckyColors}</p>
                  <p className="mt-1 font-medium text-[#351016]">{mulankProfile.luckyColors}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8C5320]">{labels.luckyDays}</p>
                  <p className="mt-1 font-medium text-[#351016]">{mulankProfile.luckyDays}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
