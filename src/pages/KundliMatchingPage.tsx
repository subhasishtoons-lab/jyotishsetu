import React, { useState, useMemo } from 'react';
import { HeartHandshake, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  BirthDetailsForm,
  createDefaultBirthFormState,
  formStateToBirthInput,
  type BirthFormState,
} from '../components/BirthDetailsForm';
import {
  CALC_UI,
  KOOTA_LABELS,
  NAKSHATRA_NAMES,
  RASHI_NAMES,
} from '../i18n/vedicLabels';
import { localizeDigits } from '../utils/panchang';
import { computeAshtakoota } from '../utils/vedicAstrology';

export function KundliMatchingPage() {
  const { language, t } = useLanguage();
  const ui = CALC_UI[language];
  const spec = t.comingSoonPages.matching;

  const [partnerA, setPartnerA] = useState<BirthFormState>(() =>
    createDefaultBirthFormState({ name: '', dateStr: '1994-08-21', timeStr: '07:15', cityId: 'varanasi' }),
  );
  const [partnerB, setPartnerB] = useState<BirthFormState>(() =>
    createDefaultBirthFormState({ name: '', dateStr: '1996-11-04', timeStr: '14:40', cityId: 'guwahati' }),
  );
  const [submittedPair, setSubmittedPair] = useState({ a: partnerA, b: partnerB });

  const result = useMemo(
    () =>
      computeAshtakoota(
        formStateToBirthInput(submittedPair.a),
        formStateToBirthInput(submittedPair.b),
      ),
    [submittedPair],
  );

  const handleMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPair({ a: partnerA, b: partnerB });
  };

  const scorePct = Math.round((result.totalScore / 36) * 100);

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
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F8F0E3]">
            {spec.title}
          </h1>
          <p className="mt-3 text-base text-[#F8F0E3]/82 leading-relaxed max-w-3xl">
            {spec.subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Dual Partner Forms */}
        <form onSubmit={handleMatchSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BirthDetailsForm
              idPrefix="match-a"
              title={ui.partnerA}
              value={partnerA}
              onChange={setPartnerA}
              compact
            />
            <BirthDetailsForm
              idPrefix="match-b"
              title={ui.partnerB}
              value={partnerB}
              onChange={setPartnerB}
              compact
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold tracking-wide hover:brightness-105 transition-all cursor-pointer shadow-md"
            >
              <HeartHandshake className="w-4 h-4" aria-hidden="true" />
              <span>{ui.matchBtn}</span>
            </button>
          </div>
        </form>

        {/* Score Overview Banner */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider text-[#EBD08D]">
                {ui.gunaScoreLabel}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold text-[#F5DC9B] tabular-nums">
                  {localizeDigits(result.totalScore, language)}
                </span>
                <span className="text-xl text-[#D8AD59]/80 font-mono">
                  / {localizeDigits(36, language)}
                </span>
              </div>
              <p className="mt-2 text-base font-semibold text-[#E99A32]">
                {ui.verdicts[result.verdict]}
              </p>
              <div className="mt-4 h-2.5 w-full rounded-full bg-[#24090E] overflow-hidden border border-[#D8AD59]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#D8AD59] to-[#E99A32]"
                  style={{ width: `${scorePct}%` }}
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-md bg-[#24090E] border border-[#D8AD59]/30">
                <p className="text-[#D8AD59] font-semibold">
                  {submittedPair.a.name.trim() || ui.partnerA}
                </p>
                <p className="mt-1.5 text-[#F8F0E3]">
                  {ui.moonSignLabel}: <strong>{RASHI_NAMES[language][result.personA.moonRashiIndex]}</strong>
                </p>
                <p className="mt-1 text-[#F8F0E3]/80">
                  {ui.birthNakshatraLabel}: {NAKSHATRA_NAMES[language][result.personA.moonNakshatraIndex]} (
                  {localizeDigits(result.personA.moonPada, language)})
                </p>
              </div>

              <div className="p-4 rounded-md bg-[#24090E] border border-[#D8AD59]/30">
                <p className="text-[#D8AD59] font-semibold">
                  {submittedPair.b.name.trim() || ui.partnerB}
                </p>
                <p className="mt-1.5 text-[#F8F0E3]">
                  {ui.moonSignLabel}: <strong>{RASHI_NAMES[language][result.personB.moonRashiIndex]}</strong>
                </p>
                <p className="mt-1 text-[#F8F0E3]/80">
                  {ui.birthNakshatraLabel}: {NAKSHATRA_NAMES[language][result.personB.moonNakshatraIndex]} (
                  {localizeDigits(result.personB.moonPada, language)})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Koota Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 overflow-hidden">
            <div className="px-6 py-4 bg-[#351016] text-[#F8F0E3]">
              <h2 className="font-display text-lg font-semibold">{spec.highlightsTitle}</h2>
            </div>
            <div className="divide-y divide-[#D8AD59]/25">
              {result.kootas.map((k) => {
                const label = KOOTA_LABELS[language][k.key];
                const pct = Math.round((k.score / k.max) * 100);
                return (
                  <div key={k.key} className="p-4 sm:px-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-base font-semibold text-[#351016]">
                        {label.name}
                      </p>
                      <p className="text-xs text-[#542D24]/85">{label.domain}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono tabular-nums text-base font-semibold text-[#351016]">
                        {localizeDigits(k.score, language)} / {localizeDigits(k.max, language)}
                      </p>
                      <div className="mt-1 w-20 h-1.5 rounded-full bg-[#EFE3CE] overflow-hidden ml-auto">
                        <div
                          className="h-full bg-[#C47616]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dosha & Parihara Evaluation */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40 space-y-4">
              <h2 className="font-display text-xl font-semibold text-[#351016]">
                {ui.doshaCheckTitle}
              </h2>

              <div className="p-4 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/35">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#351016]">{ui.nadiStatus}</span>
                  {result.nadiDosha ? (
                    <AlertTriangle className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#2B5A3C]" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-1 text-xs text-[#542D24]">
                  {!result.nadiDosha
                    ? ui.absentLabel
                    : result.nadiParihara
                      ? ui.cancelledLabel
                      : ui.presentLabel}
                </p>
              </div>

              <div className="p-4 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/35">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#351016]">{ui.bhakootStatus}</span>
                  {result.bhakootDosha ? (
                    <AlertTriangle className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#2B5A3C]" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-1 text-xs text-[#542D24]">
                  {!result.bhakootDosha
                    ? ui.absentLabel
                    : result.bhakootParihara
                      ? ui.cancelledLabel
                      : ui.presentLabel}
                </p>
              </div>

              <div className="p-4 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/35">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#351016]">{ui.mangalMatchStatus}</span>
                  {result.mangalCompatible ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2B5A3C]" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-1 text-xs text-[#542D24]">
                  {result.mangalCompatible ? ui.balancedLabel : ui.reviewLabel}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#EFE3CE]/75 border border-[#D8AD59]/40">
              <h3 className="font-display text-base font-semibold text-[#351016]">
                {spec.methodologyTitle}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#542D24] leading-relaxed">
                {spec.methodologyBody}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
