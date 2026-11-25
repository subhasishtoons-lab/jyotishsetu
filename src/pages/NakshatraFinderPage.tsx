import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { computeNakshatraDetails, formatDegMin } from '../utils/vedicAstrology';
import { localizeDigits } from '../utils/panchang';
import {
  CALC_UI,
  GANA_NAMES,
  NADI_NAMES,
  NAKSHATRA_DEITIES,
  NAKSHATRA_NAMES,
  NAKSHATRA_PADA_SYLLABLES,
  NAKSHATRA_SYMBOLS,
  PLANET_NAMES,
  RASHI_NAMES,
  VARNA_NAMES,
  YONI_NAMES,
} from '../i18n/vedicLabels';
import {
  BirthDetailsForm,
  createDefaultBirthFormState,
  formStateToBirthInput,
  type BirthFormState,
} from '../components/BirthDetailsForm';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

const COPY = {
  en: {
    kicker: '27 LUNAR MANSIONS · NAMAKSHAR & PADA',
    title: 'Janma Nakshatra Finder',
    subtitle:
      'Find your exact birth Nakshatra, Pada (quarter 1–4), traditional naming syllable (Namakshar), ruling planet, presiding deity, Gana, Yoni, Nadi, and starting Vimshottari Mahadasha.',
    formTitle: 'Enter Birth Details',
    submitBtn: 'Find Birth Nakshatra',
    padaLabel: 'Pada (Quarter)',
    activeSyllableLabel: 'Birth Pada Naming Syllable (Namakshar)',
    allPadasLabel: 'All 4 Pada Syllables of This Nakshatra',
    moonPosLabel: 'Sidereal Moon Longitude',
    rashiLabel: 'Janma Rashi (Moon Sign)',
    rulerLabel: 'Nakshatra Lord',
    deityLabel: 'Presiding Deity (Devata)',
    symbolLabel: 'Classical Symbol',
    ganaLabel: 'Gana',
    yoniLabel: 'Yoni',
    nadiLabel: 'Nadi',
    varnaLabel: 'Varna',
    dashaBalanceLabel: 'Starting Vimshottari Mahadasha Balance',
    yearsUnit: 'years remaining at birth',
    kundliCta: 'Generate Full Kundli Chart',
  },
  hi: {
    kicker: '27 नक्षत्र · चरण एवं नामाक्षर',
    title: 'जन्म नक्षत्र खोजक',
    subtitle:
      'अपनी जन्म तिथि, समय और स्थान से अपना सटीक जन्म नक्षत्र, चरण (1–4), पारंपरिक नामाक्षर, नक्षत्र स्वामी, देवता, गण, योनि, नाड़ी और प्रारंभिक विंशोत्तरी महादशा ज्ञात करें।',
    formTitle: 'जन्म विवरण दर्ज करें',
    submitBtn: 'जन्म नक्षत्र जानें',
    padaLabel: 'चरण (पाद)',
    activeSyllableLabel: 'जन्म चरण का नामाक्षर',
    allPadasLabel: 'इस नक्षत्र के चारों चरणों के नामाक्षर',
    moonPosLabel: 'निरयण चंद्र देशांतर',
    rashiLabel: 'जन्म राशि (चंद्र राशि)',
    rulerLabel: 'नक्षत्र स्वामी ग्रह',
    deityLabel: 'अधिष्ठातृ देवता',
    symbolLabel: 'शास्त्रीय प्रतीक',
    ganaLabel: 'गण',
    yoniLabel: 'योनि',
    nadiLabel: 'नाड़ी',
    varnaLabel: 'वर्ण',
    dashaBalanceLabel: 'जन्मकालीन विंशोत्तरी महादशा शेष',
    yearsUnit: 'वर्ष जन्म के समय शेष',
    kundliCta: 'संपूर्ण जन्म कुंडली बनाएं',
  },
  as: {
    kicker: '২৭ নক্ষত্ৰ · পাদ আৰু নামাক্ষৰ',
    title: 'জন্ম নক্ষত্ৰ সন্ধানক',
    subtitle:
      'আপোনাৰ জন্ম তাৰিখ, সময় আৰু স্থানৰ পৰা সঠিক জন্ম নক্ষত্ৰ, পাদ (১–৪), পৰম্পৰাগত নামাক্ষৰ, অধিপতি গ্ৰহ, দেৱতা, গণ, যোনি, নাড়ী আৰু প্ৰাৰম্ভিক বিংশোত্তৰী মহাদশা নিৰ্ণয় কৰক।',
    formTitle: 'জন্ম বিৱৰণ দিয়ক',
    submitBtn: 'জন্ম নক্ষত্ৰ নিৰ্ণয় কৰক',
    padaLabel: 'পাদ (চৰণ)',
    activeSyllableLabel: 'জন্ম পাদৰ নামাক্ষৰ',
    allPadasLabel: 'এই নক্ষত্ৰৰ চাৰিওটা পাদৰ নামাক্ষৰ',
    moonPosLabel: 'নিৰয়ণ চন্দ্ৰ দ্ৰাঘিমাংশ',
    rashiLabel: 'জন্ম ৰাশি (চন্দ্ৰ ৰাশি)',
    rulerLabel: 'নক্ষত্ৰ অধিপতি',
    deityLabel: 'অধিষ্ঠাত্ৰী দেৱতা',
    symbolLabel: 'শাস্ত্ৰীয় প্ৰতীক',
    ganaLabel: 'গণ',
    yoniLabel: 'যোনি',
    nadiLabel: 'নাড়ী',
    varnaLabel: 'বৰ্ণ',
    dashaBalanceLabel: 'জন্মকালীন বিংশোত্তৰী মহাদশা অৱশেষ',
    yearsUnit: 'বছৰ জন্মৰ সময়ত বাকী',
    kundliCta: 'সম্পূৰ্ণ জন্ম কুণ্ডলী প্ৰস্তুত কৰক',
  },
} as const;

export function NakshatraFinderPage() {
  const { language } = useLanguage();
  const ui = CALC_UI[language];
  const copy = COPY[language];

  const [form, setForm] = useState<BirthFormState>(() =>
    createDefaultBirthFormState({ dateStr: '1996-05-15', timeStr: '08:30', cityId: 'guwahati' }),
  );
  const [submittedInput, setSubmittedInput] = useState(() => formStateToBirthInput(form));

  const result = useMemo(() => computeNakshatraDetails(submittedInput), [submittedInput]);
  const syllables = NAKSHATRA_PADA_SYLLABLES[language][result.nakshatraIndex];
  const activeSyllable = syllables[result.pada - 1];

  const attributes = [
    { label: copy.rashiLabel, value: RASHI_NAMES[language][result.moonRashiIndex] },
    { label: copy.rulerLabel, value: PLANET_NAMES[language][result.ruler] },
    { label: copy.deityLabel, value: NAKSHATRA_DEITIES[language][result.nakshatraIndex] },
    { label: copy.symbolLabel, value: NAKSHATRA_SYMBOLS[language][result.nakshatraIndex] },
    { label: copy.ganaLabel, value: GANA_NAMES[language][result.gana] },
    { label: copy.yoniLabel, value: YONI_NAMES[language][result.yoniIndex] },
    { label: copy.nadiLabel, value: NADI_NAMES[language][result.nadi] },
    { label: copy.varnaLabel, value: VARNA_NAMES[language][result.varna] },
  ];

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={copy.kicker}
            title={copy.title}
            subtitle={copy.subtitle}
            align="left"
            theme="dark"
          />
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-[#EBD08D] bg-[#24090E] border border-[#D8AD59]/40 px-3 py-1.5 rounded">
            <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
            <span>{ui.methodologyBadge}</span>
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <BirthDetailsForm
              idPrefix="nakshatra"
              title={copy.formTitle}
              value={form}
              onChange={setForm}
              onSubmit={() => setSubmittedInput(formStateToBirthInput(form))}
              submitLabel={copy.submitBtn}
              showName={false}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Primary Nakshatra & Pada Highlight */}
            <div className="p-6 sm:p-8 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#EBD08D]">
                  {ui.birthNakshatraLabel} · {copy.padaLabel} {localizeDigits(result.pada, language)}
                </p>
                <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold text-[#F8F0E3]">
                  {NAKSHATRA_NAMES[language][result.nakshatraIndex]}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#F8F0E3]/80 font-mono tabular-nums">
                  {copy.moonPosLabel}:{' '}
                  {localizeDigits(formatDegMin(result.moonDegreeInSign), language)} (
                  {RASHI_NAMES[language][result.moonRashiIndex]})
                </p>
              </div>

              <div className="px-5 py-4 rounded-lg bg-[#24090E] border border-[#D8AD59]/50 text-center shrink-0">
                <p className="text-[11px] font-medium text-[#EBD08D]">{copy.activeSyllableLabel}</p>
                <p className="mt-1 font-display text-3xl font-semibold text-[#E99A32]">
                  {activeSyllable}
                </p>
              </div>
            </div>

            {/* 4 Pada Syllables Breakdown */}
            <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
              <p className="text-xs font-semibold tracking-wider text-[#8C5320]">
                {copy.allPadasLabel}
              </p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {syllables.map((syl, idx) => {
                  const isBirthPada = idx + 1 === result.pada;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-md border text-center ${
                        isBirthPada
                          ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]'
                          : 'bg-[#F8F0E3]/70 text-[#351016] border-[#D8AD59]/35'
                      }`}
                    >
                      <p
                        className={`text-[11px] font-medium ${
                          isBirthPada ? 'text-[#EBD08D]' : 'text-[#8C5320]'
                        }`}
                      >
                        {copy.padaLabel} {localizeDigits(idx + 1, language)}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold">{syl}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8 Classical Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="p-4 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35"
                >
                  <p className="text-[11px] font-medium text-[#8C5320]">{attr.label}</p>
                  <p className="mt-1 font-display text-base font-semibold text-[#351016]">
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Starting Dasha Balance */}
            <div className="p-6 rounded-lg bg-[#EFE3CE]/70 border border-[#D8AD59]/45 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#8C5320]">
                  {copy.dashaBalanceLabel}
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-[#351016]">
                  {PLANET_NAMES[language][result.startingDashaLord]} —{' '}
                  <span className="font-mono tabular-nums">
                    {localizeDigits(result.startingDashaRemainingYears.toFixed(2), language)}
                  </span>{' '}
                  <span className="text-sm font-normal text-[#542D24]">{copy.yearsUnit}</span>
                </p>
              </div>
              <Link
                to="/kundli"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#4A1820] transition-colors self-start sm:self-auto"
              >
                <span>{copy.kundliCta}</span>
                <ArrowRight className="w-4 h-4 text-[#D8AD59]" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
