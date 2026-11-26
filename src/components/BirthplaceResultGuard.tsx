import React from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  BIRTHPLACE_UI,
  formatCustomPlaceName,
  type BirthplaceSelection,
  type BirthplaceValidationResult,
} from '../utils/birthplace';

export interface BirthplaceGuardEntry {
  label?: string;
  selection: BirthplaceSelection;
  validation: BirthplaceValidationResult;
}

interface BirthplaceResultGuardProps {
  entries: readonly BirthplaceGuardEntry[];
}

/**
 * Rendered in the result panel whenever previous results were cleared after a birthplace
 * change or when a custom birthplace is missing valid latitude/longitude coordinates.
 * Guarantees stale preset-city results (such as Guwahati) are never shown for another place.
 */
export function BirthplaceResultGuard({ entries }: BirthplaceResultGuardProps) {
  const { language } = useLanguage();
  const bpUi = BIRTHPLACE_UI[language];

  const invalidEntries = entries.filter((e) => !e.validation.valid);
  const isBlocked = invalidEntries.length > 0;
  const isMatching = entries.length > 1;

  if (isBlocked) {
    return (
      <div
        role="alert"
        data-testid="birthplace-result-blocked"
        className="lg:sticky lg:top-24 p-6 sm:p-8 rounded-lg bg-[#FDF9F2] border-l-4 border-[#9A3412] border-y border-r border-y-[#D8AD59]/50 border-r-[#D8AD59]/50 flex items-start gap-4"
      >
        <AlertTriangle className="w-6 h-6 text-[#9A3412] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="min-w-0 space-y-3">
          <h2 className="font-display text-xl font-semibold text-[#351016]">
            {bpUi.coordinatesRequiredTitle}
          </h2>
          <p className="text-sm text-[#542D24] leading-relaxed">
            {bpUi.coordinatesRequiredBody}
          </p>

          <div className="space-y-3">
            {invalidEntries.map((entry, idx) => {
              const draftCustomName =
                entry.selection.mode === 'custom'
                  ? formatCustomPlaceName(entry.selection.custom)
                  : '';
              const { errors } = entry.validation;
              return (
                <div
                  key={entry.label ?? idx}
                  className="p-3.5 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/45"
                >
                  {(entry.label || draftCustomName) && (
                    <p className="text-xs font-semibold text-[#351016] flex flex-wrap items-center gap-2">
                      {entry.label && <span>{entry.label}:</span>}
                      <span className="inline-block px-2 py-0.5 rounded bg-[#EFE3CE] border border-[#D8AD59]/50 text-[10px] font-semibold text-[#8C5320]">
                        {bpUi.customBadge} · {bpUi.customIncompleteBadge}
                      </span>
                      {draftCustomName && (
                        <span className="font-medium text-[#351016]">{draftCustomName}</span>
                      )}
                    </p>
                  )}
                  <ul className="mt-2 list-disc list-inside text-xs sm:text-sm text-[#7A2029] space-y-1">
                    {errors.placeNameMissing && <li>{bpUi.errPlaceName}</li>}
                    {errors.latMissing && <li>{bpUi.errLatMissing}</li>}
                    {errors.latInvalid && <li>{bpUi.errLatInvalid}</li>}
                    {errors.lonMissing && <li>{bpUi.errLonMissing}</li>}
                    {errors.lonInvalid && <li>{bpUi.errLonInvalid}</li>}
                    {errors.timezoneInvalid && <li>{bpUi.errTimezone}</li>}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      data-testid="birthplace-result-cleared"
      className="lg:sticky lg:top-24 p-6 sm:p-8 rounded-lg bg-[#FDF9F2] border-l-4 border-[#C47616] border-y border-r border-y-[#D8AD59]/50 border-r-[#D8AD59]/50 flex items-start gap-4"
    >
      <MapPin className="w-6 h-6 text-[#C47616] shrink-0 mt-0.5" aria-hidden="true" />
      <div className="min-w-0 space-y-3">
        <h2 className="font-display text-xl font-semibold text-[#351016]">
          {bpUi.resultsClearedTitle}
        </h2>
        <p className="text-sm text-[#542D24] leading-relaxed">
          {isMatching ? bpUi.matchingClearedBody : bpUi.resultsClearedBody}
        </p>

        <div className="space-y-2">
          {entries.map((entry, idx) => {
            const resolved = entry.validation.resolved;
            if (!resolved) return null;
            return (
              <div
                key={entry.label ?? idx}
                className="p-3 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/40 text-xs text-[#351016] flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                {entry.label && <span className="font-semibold">{entry.label}:</span>}
                <span className="inline-block px-2 py-0.5 rounded bg-[#EFE3CE] border border-[#D8AD59]/50 text-[10px] font-semibold text-[#351016]">
                  {resolved.mode === 'custom' ? bpUi.customBadge : bpUi.presetBadge}
                </span>
                <span className="font-medium">{resolved.displayName}</span>
                <span className="font-mono tabular-nums text-[#542D24]">
                  · {resolved.coordinatesLabel} · {resolved.timezoneLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
