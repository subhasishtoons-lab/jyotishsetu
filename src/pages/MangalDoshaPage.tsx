import React, { useState, useMemo } from 'react';
import { Flame, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { computeKundli, evaluateMangalDoshaFromKundli, formatDMS } from '../utils/vedicAstrology';
import { localizeDigits } from '../utils/panchang';
import { CALC_UI, RASHI_NAMES } from '../i18n/vedicLabels';
import {
  BirthDetailsForm,
  createDefaultBirthFormState,
  formStateToBirthInput,
  validateBirthFormState,
  type BirthFormState,
} from '../components/BirthDetailsForm';
import { BIRTHPLACE_UI } from '../utils/birthplace';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

const COPY = {
  en: {
    kicker: 'KUJA DOSHA · CLASSICAL PARIHARA CHECK',
    title: 'Mangal Dosha (Kuja Dosha) Calculator',
    subtitle:
      'Evaluate Mars (Mangala) house placements from Lagna, Chandra (Moon), and Shukra (Venus) using Lahiri Ayanamsha, complete with classical Parihara (cancellation) rules.',
    formTitle: 'Enter Birth Details',
    submitBtn: 'Check Mangal Dosha',
    marsPlacement: 'Sidereal Mars (Mangala) Placement',
    fromLagna: 'From Lagna (Ascendant)',
    fromMoon: 'From Chandra (Moon)',
    fromVenus: 'From Shukra (Venus)',
    doshaHousesNote: 'Classical Kuja Dosha houses: 1, 2, 4, 7, 8, 12',
    cancellationsTitle: 'Classical Parihara (Cancellation) Factors Detected',
    noCancellations:
      'No automatic sign/Jupiter cancellation triggered for this placement. Always compare both partners’ complete charts before drawing conclusions.',
    matchingCta: 'Compare Two Charts in Kundli Matching',
  },
  hi: {
    kicker: 'कुज दोष · शास्त्रीय परिहार विश्लेषण',
    title: 'मंगल दोष (मांगलिक) कैलकुलेटर',
    subtitle:
      'लाहिड़ी अयनांश के आधार पर लग्न, चंद्र और शुक्र से मंगल की भाव स्थिति की गणना करें तथा शास्त्रीय मंगल दोष परिहार (निरस्तीकरण) के नियमों की जांच करें।',
    formTitle: 'जन्म विवरण दर्ज करें',
    submitBtn: 'मंगल दोष जांचें',
    marsPlacement: 'निरयण मंगल की स्थिति',
    fromLagna: 'लग्न से मंगल भाव',
    fromMoon: 'चंद्र से मंगल भाव',
    fromVenus: 'शुक्र से मंगल भाव',
    doshaHousesNote: 'शास्त्रीय मांगलिक भाव: 1, 2, 4, 7, 8, 12',
    cancellationsTitle: 'पाए गए शास्त्रीय परिहार (निरस्तीकरण) योग',
    noCancellations:
      'इस स्थिति में कोई स्वतः राशि/गुरु परिहार योग सक्रिय नहीं है। किसी भी निष्कर्ष से पहले दोनों पक्षों की संपूर्ण कुंडली का तुलनात्मक मिलान अवश्य देखें।',
    matchingCta: 'कुंडली मिलान में दो कुंडलियाँ जांचें',
  },
  as: {
    kicker: 'কুজ দোষ · শাস্ত্ৰীয় পৰিহাৰ বিশ্লেষণ',
    title: 'মংগল দোষ (মাংগলিক) গণক',
    subtitle:
      'লাহিড়ী অয়নাংশ অনুসৰি লগ্ন, চন্দ্ৰ আৰু শুক্ৰৰ পৰা মংগল গ্ৰহৰ ভাৱ অৱস্থান গণনা কৰক আৰু শাস্ত্ৰীয় মংগল দোষ পৰিহাৰ (খণ্ডন) নিয়মসমূহ পৰীক্ষা কৰক।',
    formTitle: 'জন্ম বিৱৰণ দিয়ক',
    submitBtn: 'মংগল দোষ পৰীক্ষা কৰক',
    marsPlacement: 'নিৰয়ণ মংগলৰ অৱস্থান',
    fromLagna: 'লগ্নৰ পৰা মংগল ভাৱ',
    fromMoon: 'চন্দ্ৰৰ পৰা মংগল ভাৱ',
    fromVenus: 'শুক্ৰৰ পৰা মংগল ভাৱ',
    doshaHousesNote: 'শাস্ত্ৰীয় মংগল দোষ ভাৱ: ১, ২, ৪, ৭, ৮, ১২',
    cancellationsTitle: 'ধৰা পৰা শাস্ত্ৰীয় পৰিহাৰ (খণ্ডন) যোগ',
    noCancellations:
      'এই অৱস্থানত কোনো স্বয়ংক্ৰিয় ৰাশি বা বৃহস্পতি পৰিহাৰ যোগ পোৱা নগ’ল। চূড়ান্ত সিদ্ধান্ত লোৱাৰ পূৰ্বে সদায় দুয়োপক্ষৰ সম্পূৰ্ণ কুণ্ডলী তুলনা কৰা উচিত।',
    matchingCta: 'কুণ্ডলী মিলনত দুখন কুণ্ডলী পৰীক্ষা কৰক',
  },
} as const;

export function MangalDoshaPage() {
  const { language } = useLanguage();
  const ui = CALC_UI[language];
  const copy = COPY[language];
  const bpUi = BIRTHPLACE_UI[language];

  const [form, setForm] = useState<BirthFormState>(() =>
    createDefaultBirthFormState({ dateStr: '1996-05-15', timeStr: '08:30', cityId: 'guwahati' }),
  );
  const [submittedForm, setSubmittedForm] = useState<BirthFormState>(form);

  const submittedBirthplace = useMemo(
    () => validateBirthFormState(submittedForm, language).resolved,
    [submittedForm, language],
  );

  const { kundli, result } = useMemo(() => {
    const k = computeKundli(formStateToBirthInput(submittedForm));
    return { kundli: k, result: evaluateMangalDoshaFromKundli(k) };
  }, [submittedForm]);

  const isSevere = result.severity === 'present' || result.severity === 'partial';

  const houseCards = [
    {
      label: copy.fromLagna,
      refSign: RASHI_NAMES[language][kundli.ascendantRashiIndex],
      house: result.fromLagnaHouse,
      hasDosha: result.fromLagnaDosha,
    },
    {
      label: copy.fromMoon,
      refSign: RASHI_NAMES[language][kundli.moonRashiIndex],
      house: result.fromMoonHouse,
      hasDosha: result.fromMoonDosha,
    },
    {
      label: copy.fromVenus,
      refSign: RASHI_NAMES[language][kundli.planets.find((p) => p.id === 'venus')!.rashiIndex],
      house: result.fromVenusHouse,
      hasDosha: result.fromVenusDosha,
    },
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
            <Flame className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
            <span>{ui.methodologyBadge}</span>
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <BirthDetailsForm
              idPrefix="mangal"
              title={copy.formTitle}
              value={form}
              onChange={setForm}
              onSubmit={() => setSubmittedForm(form)}
              submitLabel={copy.submitBtn}
              showName={false}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Result Verdict Card */}
            <div
              className={`p-6 rounded-lg border ${
                isSevere
                  ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]/50'
                  : 'bg-[#FDF9F2] text-[#351016] border-[#2B5A3C]/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    isSevere
                      ? 'bg-[#E99A32]/20 text-[#E99A32] border border-[#E99A32]/40'
                      : 'bg-[#2B5A3C]/12 text-[#2B5A3C] border border-[#2B5A3C]/30'
                  }`}
                >
                  {isSevere ? (
                    <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-semibold tracking-wider ${
                      isSevere ? 'text-[#EBD08D]' : 'text-[#2B5A3C]'
                    }`}
                  >
                    {copy.marsPlacement}: {RASHI_NAMES[language][result.marsRashiIndex]} (
                    {localizeDigits(formatDMS(result.marsDegree), language)})
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">
                    {ui.mangalSeverityTitles[result.severity]}
                  </h2>
                  {submittedBirthplace && (
                    <p
                      className={`mt-2 text-xs flex flex-wrap items-center gap-x-2 gap-y-1 ${
                        isSevere ? 'text-[#EBD08D]/90' : 'text-[#542D24]'
                      }`}
                    >
                      <span
                        className={`inline-block px-2 py-0.5 rounded border text-[10px] font-semibold ${
                          isSevere
                            ? 'bg-[#24090E] border-[#D8AD59]/40 text-[#EBD08D]'
                            : 'bg-[#EFE3CE] border-[#D8AD59]/50 text-[#351016]'
                        }`}
                      >
                        {submittedBirthplace.mode === 'custom'
                          ? bpUi.customBadge
                          : bpUi.presetBadge}
                      </span>
                      <span className="font-medium">{submittedBirthplace.displayName}</span>
                      <span className="font-mono tabular-nums opacity-90">
                        · {submittedBirthplace.coordinatesLabel} · {submittedBirthplace.timezoneLabel}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Reference Point Evaluations (Lagna, Moon, Venus) */}
            <div>
              <p className="text-xs font-medium text-[#8C5320] mb-3">{copy.doshaHousesNote}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {houseCards.map((card) => (
                  <div
                    key={card.label}
                    className="p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35"
                  >
                    <p className="text-xs font-semibold text-[#8C5320]">{card.label}</p>
                    <p className="mt-2 font-mono tabular-nums text-2xl font-semibold text-[#351016]">
                      {ui.houseShort} {localizeDigits(card.house, language)}
                    </p>
                    <p className="mt-1 text-xs text-[#542D24]">{card.refSign}</p>
                    <p
                      className={`mt-3 text-xs font-semibold ${
                        card.hasDosha ? 'text-[#9A3412]' : 'text-[#2B5A3C]'
                      }`}
                    >
                      {card.hasDosha ? ui.presentLabel : ui.absentLabel}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Classical Parihara Cancellations */}
            <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
              <h3 className="font-display text-xl font-semibold text-[#351016]">
                {copy.cancellationsTitle}
              </h3>

              {result.cancellations.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {result.cancellations.map((code) => (
                    <li
                      key={code}
                      className="flex items-start gap-2.5 text-sm text-[#351016] bg-[#EFE3CE]/60 border border-[#D8AD59]/40 p-3.5 rounded-md"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#2B5A3C] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{ui.mangalCancellationText[code]}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2.5 text-sm text-[#542D24] leading-relaxed">
                  {copy.noCancellations}
                </p>
              )}

              <div className="mt-6 pt-5 border-t border-[#D8AD59]/25">
                <Link
                  to="/matching"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] text-xs sm:text-sm font-semibold hover:bg-[#4A1820] transition-colors"
                >
                  <span>{copy.matchingCta}</span>
                  <ArrowRight className="w-4 h-4 text-[#D8AD59]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
