import React, { useState, useMemo } from 'react';
import { Printer, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  BirthDetailsForm,
  createDefaultBirthFormState,
  formStateToBirthInput,
  type BirthFormState,
} from '../components/BirthDetailsForm';
import { KundliChartSvg, type ChartStyle, type ChartType } from '../components/KundliChartSvg';
import {
  CALC_UI,
  DIGNITY_LABELS,
  NAKSHATRA_NAMES,
  PLANET_NAMES,
  RASHI_NAMES,
} from '../i18n/vedicLabels';
import { formatShortDate, localizeDigits } from '../utils/panchang';
import { computeKundli, formatDMS } from '../utils/vedicAstrology';

export function KundliPage() {
  const { language, t } = useLanguage();
  const ui = CALC_UI[language];
  const spec = t.comingSoonPages.kundli;

  const [formState, setFormState] = useState<BirthFormState>(() =>
    createDefaultBirthFormState({ name: '', dateStr: '1996-05-15', timeStr: '08:30', cityId: 'guwahati' }),
  );
  const [submittedState, setSubmittedState] = useState<BirthFormState>(formState);
  const [chartStyle, setChartStyle] = useState<ChartStyle>('north');
  const [chartType, setChartType] = useState<ChartType>('lagna');

  const kundli = useMemo(
    () => computeKundli(formStateToBirthInput(submittedState)),
    [submittedState],
  );

  const activeLagnaIdx =
    chartType === 'navamsha'
      ? kundli.navamshaLagnaIndex
      : chartType === 'chandra'
        ? kundli.moonRashiIndex
        : kundli.ascendantRashiIndex;

  const chartTitle =
    chartType === 'navamsha'
      ? ui.navamshaTab
      : chartType === 'chandra'
        ? ui.chandraTab
        : ui.lagnaTab;

  return (
    <div className="bg-[#F8F0E3]">
      {/* Page Banner */}
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.12em]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24090E] border border-[#D8AD59]/60 text-[#EBD08D] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" aria-hidden="true" />
              <span>{ui.liveEngineBadge}</span>
            </span>
            <span className="text-[#EBD08D]/85">{spec.kicker}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F8F0E3] leading-[1.15]">
            {spec.title}
          </h1>
          <p className="mt-3 text-base text-[#F8F0E3]/82 leading-relaxed max-w-3xl">
            {spec.subtitle}
          </p>
          <p className="mt-4 pt-3 border-t border-[#D8AD59]/20 text-xs text-[#EBD08D]/85">
            {ui.methodologyBadge}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Birth Details Input Form */}
          <div className="lg:col-span-4 print:hidden">
            <BirthDetailsForm
              idPrefix="kundli"
              value={formState}
              onChange={setFormState}
              onSubmit={() => setSubmittedState(formState)}
              submitLabel={ui.calculateBtn}
            />
          </div>

          {/* Chart & Summary Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Natal Summary Strip */}
            <div className="p-6 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/40">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D8AD59]/25">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-[#E99A32]" aria-hidden="true" />
                  <h2 className="font-display text-xl font-semibold text-[#F8F0E3]">
                    {submittedState.name.trim() || spec.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="print:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#D8AD59]/50 bg-[#24090E] text-xs font-medium text-[#EBD08D] hover:bg-[#4A1820] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{ui.printBtn}</span>
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
                <div>
                  <p className="text-[#D8AD59]">{ui.ascendantLabel}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-[#F8F0E3]">
                    {RASHI_NAMES[language][kundli.ascendantRashiIndex]}
                  </p>
                  <p className="text-[11px] text-[#F8F0E3]/70 font-mono tabular-nums">
                    {localizeDigits(formatDMS(kundli.ascendantDegree), language)}
                  </p>
                </div>
                <div>
                  <p className="text-[#D8AD59]">{ui.moonSignLabel}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-[#F8F0E3]">
                    {RASHI_NAMES[language][kundli.moonRashiIndex]}
                  </p>
                </div>
                <div>
                  <p className="text-[#D8AD59]">{ui.sunSignLabel}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-[#F8F0E3]">
                    {RASHI_NAMES[language][kundli.sunRashiIndex]}
                  </p>
                </div>
                <div>
                  <p className="text-[#D8AD59]">{ui.birthNakshatraLabel}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-[#F8F0E3]">
                    {NAKSHATRA_NAMES[language][kundli.moonNakshatraIndex]}
                  </p>
                  <p className="text-[11px] text-[#F8F0E3]/70">
                    {language === 'en' ? 'Pada' : language === 'hi' ? 'पाद' : 'পাদ'}{' '}
                    {localizeDigits(kundli.moonPada, language)}
                  </p>
                </div>
                <div>
                  <p className="text-[#D8AD59]">{ui.ayanamshaLabel}</p>
                  <p className="mt-1 font-mono tabular-nums text-sm font-semibold text-[#F8F0E3]">
                    {localizeDigits(formatDMS(kundli.ayanamsha), language)}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Chart Viewer (North / South Indian + Lagna / Navamsha / Chandra) */}
            <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex rounded-md bg-[#EFE3CE] p-1 border border-[#D8AD59]/40">
                  {(
                    [
                      { id: 'lagna', label: ui.lagnaTab },
                      { id: 'navamsha', label: ui.navamshaTab },
                      { id: 'chandra', label: ui.chandraTab },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setChartType(tab.id)}
                      aria-pressed={chartType === tab.id}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        chartType === tab.id
                          ? 'bg-[#351016] text-[#F8F0E3]'
                          : 'text-[#542D24] hover:text-[#351016]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="inline-flex rounded-md bg-[#EFE3CE] p-1 border border-[#D8AD59]/40">
                  <button
                    type="button"
                    onClick={() => setChartStyle('north')}
                    aria-pressed={chartStyle === 'north'}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      chartStyle === 'north'
                        ? 'bg-[#351016] text-[#F8F0E3]'
                        : 'text-[#542D24] hover:text-[#351016]'
                    }`}
                  >
                    {ui.northChart}
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartStyle('south')}
                    aria-pressed={chartStyle === 'south'}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      chartStyle === 'south'
                        ? 'bg-[#351016] text-[#F8F0E3]'
                        : 'text-[#542D24] hover:text-[#351016]'
                    }`}
                  >
                    {ui.southChart}
                  </button>
                </div>
              </div>

              <KundliChartSvg
                style={chartStyle}
                chartType={chartType}
                lagnaRashiIndex={activeLagnaIdx}
                planets={kundli.planets}
                language={language}
                title={chartTitle}
              />
            </div>
          </div>
        </div>

        {/* Full Navagraha Planetary Table */}
        <div className="rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden">
          <div className="px-6 py-4 bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30">
            <h2 className="font-display text-xl font-semibold">{spec.highlights[1]?.title}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#EFE3CE]/80 text-[#351016] text-xs font-semibold border-b border-[#D8AD59]/35">
                  <th className="py-3 px-4">{ui.planetCol}</th>
                  <th className="py-3 px-4">{ui.signCol}</th>
                  <th className="py-3 px-4">{ui.degreeCol}</th>
                  <th className="py-3 px-4">{ui.nakshatraCol}</th>
                  <th className="py-3 px-4">{ui.houseCol}</th>
                  <th className="py-3 px-4">{ui.dignityCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8AD59]/20">
                {kundli.planets.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8F0E3]/60">
                    <td className="py-3 px-4 font-semibold text-[#351016] whitespace-nowrap">
                      {PLANET_NAMES[language][p.id]}
                    </td>
                    <td className="py-3 px-4 text-[#542D24] whitespace-nowrap">
                      {RASHI_NAMES[language][p.rashiIndex]}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-[#542D24] whitespace-nowrap">
                      {localizeDigits(formatDMS(p.degreeInSign), language)}
                    </td>
                    <td className="py-3 px-4 text-[#542D24] whitespace-nowrap">
                      {NAKSHATRA_NAMES[language][p.nakshatraIndex]} ({localizeDigits(p.pada, language)})
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-[#351016] font-medium">
                      {localizeDigits(p.house, language)}
                    </td>
                    <td className="py-3 px-4 text-xs text-[#542D24]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#EFE3CE] border border-[#D8AD59]/40 text-[#351016] font-medium">
                          {DIGNITY_LABELS[language][p.dignity]}
                        </span>
                        {p.retrograde && p.id !== 'rahu' && p.id !== 'ketu' && (
                          <span className="px-2 py-0.5 rounded bg-[#F5E4CA] border border-[#B85D19]/40 text-[#7C2D12] font-medium">
                            {ui.retrogradeTag}
                          </span>
                        )}
                        {p.combust && (
                          <span className="px-2 py-0.5 rounded bg-[#351016]/10 text-[#7A2029] font-medium">
                            {ui.combustTag}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 120-Year Vimshottari Mahadasha & Active Antardasha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden">
            <div className="px-6 py-4 bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30">
              <h2 className="font-display text-lg font-semibold">{ui.dashaTitle}</h2>
            </div>
            <div className="divide-y divide-[#D8AD59]/20">
              {kundli.mahadashas.map((d) => (
                <div
                  key={`${d.lord}-${d.startDate.toISOString()}`}
                  className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 text-sm ${
                    d.isCurrent ? 'bg-[#F5E4CA]/85' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#351016]">
                      {PLANET_NAMES[language][d.lord]}
                    </span>
                    {d.isCurrent && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-[#351016] text-[#EBD08D]">
                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                        <span>{ui.currentTag}</span>
                      </span>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-xs text-[#542D24]">
                    {formatShortDate(d.startDate, language)} – {formatShortDate(d.endDate, language)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden">
            <div className="px-6 py-4 bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30">
              <h2 className="font-display text-lg font-semibold">
                {ui.antardashaTitle}
                {kundli.currentMahadasha
                  ? ` (${PLANET_NAMES[language][kundli.currentMahadasha.lord]})`
                  : ''}
              </h2>
            </div>
            <div className="divide-y divide-[#D8AD59]/20">
              {kundli.currentAntardashas.map((ad) => (
                <div
                  key={`${ad.lord}-${ad.startDate.toISOString()}`}
                  className={`px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm ${
                    ad.isCurrent ? 'bg-[#F5E4CA]/85 font-semibold' : ''
                  }`}
                >
                  <span className="text-[#351016]">
                    {PLANET_NAMES[language][ad.lord]}
                    {ad.isCurrent ? ` · ${ui.currentTag}` : ''}
                  </span>
                  <span className="font-mono tabular-nums text-xs text-[#542D24]">
                    {formatShortDate(ad.startDate, language)} – {formatShortDate(ad.endDate, language)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Classical Methodology Note */}
        <div className="p-6 rounded-lg bg-[#EFE3CE]/75 border border-[#D8AD59]/40">
          <h3 className="font-display text-lg font-semibold text-[#351016]">
            {spec.methodologyTitle}
          </h3>
          <p className="mt-1.5 text-sm text-[#542D24] leading-relaxed">{spec.methodologyBody}</p>
        </div>
      </section>
    </div>
  );
}
