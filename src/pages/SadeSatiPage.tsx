import React, { useState, useMemo } from 'react';
import { Orbit, ShieldCheck, AlertTriangle, Calendar, ArrowRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { computeSadeSati, formatDMS } from '../utils/vedicAstrology';
import {
  formatDateInTimeZone,
  formatUtcOffsetLabel,
  localizeDigits,
} from '../utils/panchang';
import {
  CALC_UI,
  NAKSHATRA_NAMES,
  PAYA_NAMES,
  RASHI_NAMES,
} from '../i18n/vedicLabels';
import {
  BirthDetailsForm,
  createDefaultBirthFormState,
  formStateToBirthInput,
  validateBirthFormState,
  type BirthFormState,
} from '../components/BirthDetailsForm';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

const COPY = {
  en: {
    kicker: 'SHANI GOCHARA · SIDEREAL SATURN TRANSIT',
    title: 'Sade Sati & Shani Dhaiya Calculator',
    subtitle:
      'Compute your natal Moon sign (Janma Rashi) and compare it against Saturn’s live sidereal transit position (Lahiri Ayanamsha) to identify Sade Sati phases, Shani Dhaiya, Paya, and exact ephemeris transit intervals.',
    formTitle: 'Enter Birth Details',
    submitBtn: 'Check Sade Sati Status',
    natalMoonLabel: 'Natal Moon Sign (Janma Rashi)',
    liveSaturnLabel: 'Current Sidereal Shani (Saturn)',
    houseFromMoonLabel: 'Transit House from Moon',
    payaLabel: 'Classical Transit Paya',
    timelineTitle: 'Calculated Sade Sati Transit Intervals',
    timelineSub:
      'Dates below are computed directly from Saturn’s exact Lahiri sidereal Rashi crossings across the 12th, 1st, and 2nd signs from your natal Moon. Retrograde sign re-entries are listed as separate intervals.',
    cycleStartLabel: 'Cycle Begins',
    cycleEndLabel: 'Sade Sati Ends',
    timezoneLabel: 'Timezone',
    retroReturnTag: 'Retrograde Return',
    reentryTag: 'Direct Re-entry',
    saturnSignCol: 'Shani Rashi',
    dhaiyaTitle: 'Calculated Shani Dhaiya Transit Intervals',
    dhaiyaSub:
      '4th-house (Kantaka / Ardha-Ashtama Shani) and 8th-house (Ashtama Shani) Saturn transits from your natal Moon, computed by the same sidereal ingress engine including retrograde returns.',
    dhaiya4Name: '4th House Dhaiya · Kantaka Shani',
    dhaiya8Name: '8th House Dhaiya · Ashtama Shani',
    guidanceTitle: 'Traditional Perspective on Shani Gochara',
    guidanceBody:
      'In classical Jyotish, Shani (Saturn) is the karaka of discipline, patience, and enduring karma rather than fear. Sade Sati unfolds across three phases (Rising, Peak, and Setting) totaling ~7.5 years; its lived effect always depends on Saturn’s functional dignity in your full Kundli and your active Vimshottari Dasha.',
    kundliCta: 'View Full Birth Kundli & Dasha',
  },
  hi: {
    kicker: 'शनि गोचर · निरयण शनि गणना',
    title: 'साढ़ेसाती एवं शनि ढैय्या कैलकुलेटर',
    subtitle:
      'अपनी जन्म राशि (चंद्र राशि) की गणना करें और लाहिड़ी अयनांश के आधार पर वर्तमान शनि गोचर से तुलना करके साढ़ेसाती के चरण, ढैय्या, पाया और सटीक खगोलीय गोचर अवधियाँ जानें।',
    formTitle: 'जन्म विवरण दर्ज करें',
    submitBtn: 'साढ़ेसाती स्थिति जांचें',
    natalMoonLabel: 'जन्म राशि (चंद्र राशि)',
    liveSaturnLabel: 'वर्तमान निरयण शनि गोचर',
    houseFromMoonLabel: 'चंद्र से गोचर भाव',
    payaLabel: 'शास्त्रीय शनि पाया',
    timelineTitle: 'गणित साढ़ेसाती गोचर अवधियाँ',
    timelineSub:
      'नीचे दी गई तिथियाँ आपकी जन्म राशि से 12वें, 1वें और 2रे भाव में शनि के वास्तविक लाहिड़ी निरयण राशि प्रवेशों से निकाली गई हैं। वक्री राशि वापसी को अलग अवधि के रूप में दर्शाया गया है।',
    cycleStartLabel: 'चक्र प्रारंभ',
    cycleEndLabel: 'साढ़ेसाती समाप्ति',
    timezoneLabel: 'समय क्षेत्र',
    retroReturnTag: 'वक्री वापसी',
    reentryTag: 'पुनः प्रवेश',
    saturnSignCol: 'शनि राशि',
    dhaiyaTitle: 'गणित शनि ढैय्या गोचर अवधियाँ',
    dhaiyaSub:
      'आपकी जन्म राशि से 4थे भाव (कंटक / अर्धाष्टम शनि) और 8वें भाव (अष्टम शनि) में शनि के सटीक निरयण गोचर, वक्री वापसी सहित।',
    dhaiya4Name: 'चतुर्थ भाव ढैय्या · कंटक शनि',
    dhaiya8Name: 'अष्टम भाव ढैय्या · अष्टम शनि',
    guidanceTitle: 'शनि गोचर का शास्त्रीय दृष्टिकोण',
    guidanceBody:
      'शास्त्रीय ज्योतिष में शनि भय नहीं बल्कि अनुशासन, धैर्य और कर्म-परिपक्वता के कारक हैं। साढ़ेसाती तीन चरणों (उदय, शिखर और अस्त) में लगभग 7.5 वर्षों तक चलती है; इसका वास्तविक फल जन्म कुंडली में शनि की स्थिति और चल रही विंशोत्तरी दशा पर निर्भर करता है।',
    kundliCta: 'संपूर्ण जन्म कुंडली एवं दशा देखें',
  },
  as: {
    kicker: 'শনি গোচৰ · নিৰয়ণ শনি গণনা',
    title: 'সাঢ়েসাতী আৰু শনি ঢৈয়া গণক',
    subtitle:
      'আপোনাৰ জন্ম ৰাশি (চন্দ্ৰ ৰাশি) নিৰ্ণয় কৰক আৰু লাহিড়ী অয়নাংশ অনুসৰি বৰ্তমান শনি গোচৰৰ সৈতে তুলনা কৰি সাঢ়েসাতীৰ পৰ্যায়, ঢৈয়া, পায়া আৰু সঠিক খগোলীয় গোচৰ সময়সীমা জানক।',
    formTitle: 'জন্ম বিৱৰণ দিয়ক',
    submitBtn: 'সাঢ়েসাতী স্থিতি পৰীক্ষা কৰক',
    natalMoonLabel: 'জন্ম ৰাশি (চন্দ্ৰ ৰাশি)',
    liveSaturnLabel: 'বৰ্তমান নিৰয়ণ শনি গোচৰ',
    houseFromMoonLabel: 'চন্দ্ৰৰ পৰা গোচৰ ভাৱ',
    payaLabel: 'শাস্ত্ৰীয় শনি পায়া',
    timelineTitle: 'গণনাকৃত সাঢ়েসাতী গোচৰ সময়সীমা',
    timelineSub:
      'তলৰ তাৰিখসমূহ আপোনাৰ জন্ম ৰাশিৰ পৰা দ্বাদশ, প্ৰথম আৰু দ্বিতীয় ৰাশিত শনিৰ প্ৰকৃত লাহিড়ী নিৰয়ণ ৰাশি পৰিৱৰ্তনৰ পৰা গণনা কৰা হৈছে। বক্ৰী ৰাশি প্ৰত্যাৱৰ্তনসমূহ পৃথক সময়খণ্ড হিচাপে দেখুওৱা হৈছে।',
    cycleStartLabel: 'চক্ৰ আৰম্ভণি',
    cycleEndLabel: 'সাঢ়েসাতী সমাপ্তি',
    timezoneLabel: 'সময় অঞ্চল',
    retroReturnTag: 'বক্ৰী প্ৰত্যাৱৰ্তন',
    reentryTag: 'পুনঃপ্ৰৱেশ',
    saturnSignCol: 'শনি ৰাশি',
    dhaiyaTitle: 'গণনাকৃত শনি ঢৈয়া গোচৰ সময়সীমা',
    dhaiyaSub:
      'একে নিৰয়ণ খগোলীয় ইঞ্জিনৰ দ্বাৰা আপোনাৰ জন্ম ৰাশিৰ পৰা চতুৰ্থ (কণ্টক শনি) আৰু অষ্টম (অষ্টম শনি) ভাৱৰ শনি ঢৈয়া সময়খণ্ড (বক্ৰী প্ৰত্যাৱৰ্তনসহ)।',
    dhaiya4Name: 'চতুৰ্থ ভাৱৰ ঢৈয়া · কণ্টক শনি',
    dhaiya8Name: 'অষ্টম ভাৱৰ ঢৈয়া · অষ্টম শনি',
    guidanceTitle: 'শনি গোচৰৰ শাস্ত্ৰীয় দৃষ্টিভংগী',
    guidanceBody:
      'শাস্ত্ৰীয় জ্যোতিষত শনি ভয়ৰ নহয়, বৰঞ্চ শৃংখলা, ধৈৰ্য আৰু কৰ্ম-পৰিপক্বতাৰ কাৰক গ্ৰহ। সাঢ়েসাতী তিনিটা পৰ্যায়ত (উদয়, শিখৰ আৰু অস্ত) প্ৰায় ৭.৫ বছৰ ধৰি চলে; ইয়াৰ প্ৰকৃত ফল সম্পূৰ্ণ জন্ম কুণ্ডলীত শনিৰ অৱস্থান আৰু চলি থকা বিংশোত্তৰী দশাৰ ওপৰত নিৰ্ভৰ কৰে।',
    kundliCta: 'সম্পূৰ্ণ জন্ম কুণ্ডলী আৰু দশা চাওক',
  },
} as const;

export function SadeSatiPage() {
  const { language } = useLanguage();
  const ui = CALC_UI[language];
  const copy = COPY[language];

  const [form, setForm] = useState<BirthFormState>(() =>
    createDefaultBirthFormState({ dateStr: '1994-08-22', timeStr: '10:15', cityId: 'guwahati' }),
  );
  const [submittedForm, setSubmittedForm] = useState<BirthFormState>(form);

  const submittedPlace = useMemo(
    () => validateBirthFormState(submittedForm, language).resolved,
    [submittedForm, language],
  );
  const submittedInput = useMemo(() => formStateToBirthInput(submittedForm), [submittedForm]);
  const ianaTimeZone = submittedPlace?.ianaTimeZone ?? null;
  const timezoneBadge = submittedPlace
    ? `${submittedPlace.displayName} · ${submittedPlace.timezoneLabel}`
    : formatUtcOffsetLabel(submittedInput.utcOffsetMinutes);

  const formatTransitDate = (utcDate: Date) =>
    formatDateInTimeZone(utcDate, language, ianaTimeZone, submittedInput.utcOffsetMinutes);

  const result = useMemo(() => computeSadeSati(submittedInput), [submittedInput]);
  const isActive = result.status !== 'none';
  const payaInfo = PAYA_NAMES[language][result.paya];

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
            <Orbit className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
            <span>{ui.methodologyBadge}</span>
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <BirthDetailsForm
              idPrefix="sadesati"
              title={copy.formTitle}
              value={form}
              onChange={setForm}
              onSubmit={() => setSubmittedForm(form)}
              submitLabel={copy.submitBtn}
              showName={false}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Primary Status Banner */}
            <div
              className={`p-6 rounded-lg border ${
                isActive
                  ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]/50'
                  : 'bg-[#FDF9F2] text-[#351016] border-[#2B5A3C]/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-[#E99A32]/20 text-[#E99A32] border border-[#E99A32]/40'
                      : 'bg-[#2B5A3C]/12 text-[#2B5A3C] border border-[#2B5A3C]/30'
                  }`}
                >
                  {isActive ? (
                    <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold tracking-wider ${
                      isActive ? 'text-[#EBD08D]' : 'text-[#2B5A3C]'
                    }`}
                  >
                    {ui.liveEngineBadge}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">
                    {ui.sadeSatiStatusTitles[result.status]}
                  </h2>
                </div>
              </div>
            </div>

            {/* Key Astronomical Readout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35">
                <p className="text-xs font-medium text-[#8C5320]">{copy.natalMoonLabel}</p>
                <p className="mt-1.5 font-display text-xl font-semibold text-[#351016]">
                  {RASHI_NAMES[language][result.natalMoonRashiIndex]}
                </p>
                <p className="mt-1 text-xs text-[#542D24]">
                  {NAKSHATRA_NAMES[language][result.natalNakshatraIndex]}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35">
                <p className="text-xs font-medium text-[#8C5320]">{copy.liveSaturnLabel}</p>
                <p className="mt-1.5 font-display text-xl font-semibold text-[#351016]">
                  {RASHI_NAMES[language][result.currentSaturnRashiIndex]}
                </p>
                <p className="mt-1 text-xs font-mono tabular-nums text-[#542D24]">
                  {localizeDigits(formatDMS(result.currentSaturnDegree), language)} ·{' '}
                  {copy.houseFromMoonLabel}: {localizeDigits(result.houseFromMoon, language)}
                </p>
              </div>
            </div>

            {/* Classical Paya Card */}
            <div className="p-5 rounded-lg bg-[#EFE3CE]/70 border border-[#D8AD59]/45">
              <p className="text-xs font-semibold tracking-wider text-[#8C5320]">
                {copy.payaLabel}
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-[#351016]">
                {payaInfo.name}
              </p>
              <p className="mt-1.5 text-sm text-[#542D24] leading-relaxed">{payaInfo.note}</p>
            </div>

            {/* Calculated Sade Sati Transit Intervals (with Retrograde Re-entries) */}
            <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[#351016]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#C47616]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold">{copy.timelineTitle}</h3>
                </div>
                <span className="text-[11px] font-mono tabular-nums px-2.5 py-1 rounded bg-[#EFE3CE] border border-[#D8AD59]/40 text-[#542D24]">
                  {copy.timezoneLabel}: {timezoneBadge}
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-[#542D24] leading-relaxed">
                {copy.timelineSub}
              </p>

              {result.sadeSatiStartDate && result.sadeSatiEndDate && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-md bg-[#EFE3CE]/65 border border-[#D8AD59]/40">
                  <div>
                    <p className="text-[11px] font-semibold text-[#8C5320]">{copy.cycleStartLabel}</p>
                    <p className="mt-0.5 font-mono tabular-nums text-sm font-semibold text-[#351016]">
                      {formatTransitDate(result.sadeSatiStartDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#8C5320]">{copy.cycleEndLabel}</p>
                    <p className="mt-0.5 font-mono tabular-nums text-sm font-semibold text-[#351016]">
                      {formatTransitDate(result.sadeSatiEndDate)}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-3">
                {result.windows.map((win) => (
                  <div
                    key={`${win.phase}-${win.startDate.toISOString()}`}
                    className={`p-4 rounded-md border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      win.isCurrent
                        ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]'
                        : 'bg-[#F8F0E3]/70 text-[#351016] border-[#D8AD59]/35'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-base font-semibold">
                          {ui.phaseNames[win.phase]}
                        </p>
                        {win.isCurrent && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E99A32] text-[#2B0A10]">
                            {ui.currentTag}
                          </span>
                        )}
                        {win.isRetrogradeEntry && (
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                              win.isCurrent
                                ? 'bg-[#4A1820] text-[#EBD08D] border-[#D8AD59]/50'
                                : 'bg-[#F5E4CA] text-[#7C2D12] border-[#B85D19]/40'
                            }`}
                          >
                            <RotateCcw className="w-3 h-3" aria-hidden="true" />
                            <span>{copy.retroReturnTag}</span>
                          </span>
                        )}
                        {!win.isRetrogradeEntry && win.isReentry && (
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                              win.isCurrent
                                ? 'bg-[#4A1820] text-[#EBD08D] border-[#D8AD59]/50'
                                : 'bg-[#EFE3CE] text-[#542D24] border-[#D8AD59]/50'
                            }`}
                          >
                            {copy.reentryTag}
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-0.5 text-xs ${
                          win.isCurrent ? 'text-[#EBD08D]' : 'text-[#8C5320]'
                        }`}
                      >
                        {copy.saturnSignCol}: {RASHI_NAMES[language][win.saturnRashiIndex]}
                      </p>
                    </div>
                    <p className="font-mono tabular-nums text-xs sm:text-sm font-semibold">
                      {formatTransitDate(win.startDate)} — {formatTransitDate(win.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculated Shani Dhaiya Transit Intervals (4th & 8th House from Moon) */}
            {result.dhaiyaWindows.length > 0 && (
              <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
                <div className="flex items-center gap-2 text-[#351016]">
                  <Orbit className="w-5 h-5 text-[#C47616]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold">{copy.dhaiyaTitle}</h3>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-[#542D24] leading-relaxed">
                  {copy.dhaiyaSub}
                </p>

                <div className="mt-5 space-y-3">
                  {result.dhaiyaWindows.map((win) => (
                    <div
                      key={`${win.type}-${win.startDate.toISOString()}`}
                      className={`p-4 rounded-md border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        win.isCurrent
                          ? 'bg-[#351016] text-[#F8F0E3] border-[#D8AD59]'
                          : 'bg-[#F8F0E3]/70 text-[#351016] border-[#D8AD59]/35'
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-display text-base font-semibold">
                            {win.type === 'dhaiya_4' ? copy.dhaiya4Name : copy.dhaiya8Name}
                          </p>
                          {win.isCurrent && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E99A32] text-[#2B0A10]">
                              {ui.currentTag}
                            </span>
                          )}
                          {win.isRetrogradeEntry && (
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                                win.isCurrent
                                  ? 'bg-[#4A1820] text-[#EBD08D] border-[#D8AD59]/50'
                                  : 'bg-[#F5E4CA] text-[#7C2D12] border-[#B85D19]/40'
                              }`}
                            >
                              <RotateCcw className="w-3 h-3" aria-hidden="true" />
                              <span>{copy.retroReturnTag}</span>
                            </span>
                          )}
                          {!win.isRetrogradeEntry && win.isReentry && (
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                                win.isCurrent
                                  ? 'bg-[#4A1820] text-[#EBD08D] border-[#D8AD59]/50'
                                  : 'bg-[#EFE3CE] text-[#542D24] border-[#D8AD59]/50'
                              }`}
                            >
                              {copy.reentryTag}
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-0.5 text-xs ${
                            win.isCurrent ? 'text-[#EBD08D]' : 'text-[#8C5320]'
                          }`}
                        >
                          {copy.saturnSignCol}: {RASHI_NAMES[language][win.saturnRashiIndex]}
                        </p>
                      </div>
                      <p className="font-mono tabular-nums text-xs sm:text-sm font-semibold">
                        {formatTransitDate(win.startDate)} — {formatTransitDate(win.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Traditional Context & Cross-Link */}
            <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="font-display text-lg font-semibold text-[#351016]">
                  {copy.guidanceTitle}
                </h3>
                <p className="mt-1.5 text-sm text-[#542D24] leading-relaxed">
                  {copy.guidanceBody}
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
