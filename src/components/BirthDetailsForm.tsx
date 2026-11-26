import React, { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../i18n/types';
import { CALC_UI } from '../i18n/vedicLabels';
import { type PanchangCityId } from '../utils/panchang';
import {
  BIRTHPLACE_UI,
  assertBirthplaceMatchesCalculation,
  createCustomBirthplace,
  createPresetBirthplace,
  hasBirthplaceChanged,
  validateBirthplaceSelection,
  type BirthplaceSelection,
  type BirthplaceValidationResult,
  type ResolvedBirthplace,
} from '../utils/birthplace';
import { BirthplaceSelector } from './BirthplaceSelector';
import type { BirthInput } from '../utils/vedicAstrology';

export interface BirthFormState {
  name: string;
  dateStr: string;
  timeStr: string;
  birthplace: BirthplaceSelection;
  /** Optional explicit UTC offset override (hours) preserved for backward compatibility with legacy test helpers. */
  legacyUtcOffsetHours?: number;
}

export interface BirthFormInitOverrides {
  name?: string;
  dateStr?: string;
  timeStr?: string;
  cityId?: PanchangCityId;
  birthplace?: BirthplaceSelection;
  /** Legacy test/init properties converted cleanly into BirthplaceSelection */
  useCustomCoords?: boolean;
  customLat?: string;
  customLon?: string;
  customUtcHours?: string;
}

export function createDefaultBirthFormState(
  overrides: BirthFormInitOverrides = {},
): BirthFormState {
  const defaultCity: PanchangCityId = overrides.cityId ?? 'guwahati';
  let birthplace: BirthplaceSelection;
  let legacyUtcOffsetHours: number | undefined;

  if (overrides.birthplace) {
    birthplace = overrides.birthplace;
  } else if (overrides.useCustomCoords) {
    const rawLat = (overrides.customLat ?? '').trim();
    const rawLon = (overrides.customLon ?? '').trim();
    const latNegative = rawLat.startsWith('-');
    const lonNegative = rawLon.startsWith('-');
    const parsedUtc =
      overrides.customUtcHours !== undefined && overrides.customUtcHours.trim() !== ''
        ? Number(overrides.customUtcHours)
        : NaN;
    if (Number.isFinite(parsedUtc)) {
      legacyUtcOffsetHours = parsedUtc;
    }

    birthplace = createCustomBirthplace(
      {
        placeName: 'Custom Coordinates',
        latValue: latNegative ? rawLat.slice(1) : rawLat,
        latDir: latNegative ? 'S' : 'N',
        lonValue: lonNegative ? rawLon.slice(1) : rawLon,
        lonDir: lonNegative ? 'W' : 'E',
        ianaTimeZone: parsedUtc === 0 ? 'UTC' : 'Asia/Kolkata',
      },
      defaultCity,
    );
  } else {
    birthplace = createPresetBirthplace(defaultCity);
  }

  return {
    name: overrides.name ?? '',
    dateStr: overrides.dateStr ?? '1996-05-15',
    timeStr: overrides.timeStr ?? '08:30',
    birthplace,
    ...(legacyUtcOffsetHours !== undefined ? { legacyUtcOffsetHours } : {}),
  };
}

export function validateBirthFormState(
  state: BirthFormState,
  language: Language = 'en',
): BirthplaceValidationResult {
  const dateStr = state.dateStr || '1996-05-15';
  const timeStr = state.timeStr || '08:30';
  const result = validateBirthplaceSelection(state.birthplace, dateStr, timeStr, language);
  if (
    result.valid &&
    result.resolved &&
    state.birthplace.mode === 'custom' &&
    typeof state.legacyUtcOffsetHours === 'number' &&
    Number.isFinite(state.legacyUtcOffsetHours)
  ) {
    return {
      ...result,
      resolved: {
        ...result.resolved,
        utcOffsetMinutes: Math.round(state.legacyUtcOffsetHours * 60),
      },
    };
  }
  return result;
}

export interface ValidatedCalculationPayload {
  form: BirthFormState;
  selection: BirthplaceSelection;
  resolved: ResolvedBirthplace;
  input: BirthInput;
}

/**
 * Validates a submitted BirthFormState and builds a strictly matched calculation payload.
 * - Returns `null` if `state` is null, date is missing, or custom coordinates/timezone are invalid.
 * - Verifies that `input.lat`, `input.lon`, and `input.utcOffsetMinutes` exactly match
 *   `resolved` and `state.birthplace` (NEVER falling back to Guwahati or another preset city).
 */
export function buildValidatedCalculationPayload(
  state: BirthFormState | null,
  language: Language = 'en',
): ValidatedCalculationPayload | null {
  if (!state || !state.dateStr.trim()) {
    return null;
  }
  const validation = validateBirthFormState(state, language);
  if (!validation.valid || !validation.resolved) {
    return null;
  }
  const { resolved } = validation;
  const input: BirthInput = {
    name: state.name.trim(),
    dateStr: state.dateStr,
    timeStr: state.timeStr || '08:30',
    lat: resolved.lat,
    lon: resolved.lon,
    utcOffsetMinutes: resolved.utcOffsetMinutes,
  };
  if (!assertBirthplaceMatchesCalculation(state.birthplace, resolved, input)) {
    return null;
  }
  return {
    form: state,
    selection: state.birthplace,
    resolved,
    input,
  };
}

/**
 * Immediately clears previously calculated results (`null`) whenever the user changes
 * the birthplace selection (mode, preset city, or any custom location/coordinate/timezone field).
 */
export function reconcileSubmittedFormOnChange(
  prevForm: BirthFormState,
  nextForm: BirthFormState,
  currentSubmitted: BirthFormState | null,
): BirthFormState | null {
  if (hasBirthplaceChanged(prevForm.birthplace, nextForm.birthplace)) {
    return null;
  }
  if (
    currentSubmitted !== null &&
    hasBirthplaceChanged(currentSubmitted.birthplace, nextForm.birthplace)
  ) {
    return null;
  }
  return currentSubmitted;
}

/**
 * Immediately clears previously calculated Kundli Matching results (`null`) whenever
 * either Partner A or Partner B changes their birthplace selection.
 */
export function reconcileSubmittedPairOnChange(
  prevA: BirthFormState,
  nextA: BirthFormState,
  prevB: BirthFormState,
  nextB: BirthFormState,
  currentSubmitted: { a: BirthFormState; b: BirthFormState } | null,
): { a: BirthFormState; b: BirthFormState } | null {
  if (
    hasBirthplaceChanged(prevA.birthplace, nextA.birthplace) ||
    hasBirthplaceChanged(prevB.birthplace, nextB.birthplace)
  ) {
    return null;
  }
  if (
    currentSubmitted !== null &&
    (hasBirthplaceChanged(currentSubmitted.a.birthplace, nextA.birthplace) ||
      hasBirthplaceChanged(currentSubmitted.b.birthplace, nextB.birthplace))
  ) {
    return null;
  }
  return currentSubmitted;
}

/**
 * Converts a validated BirthFormState into a BirthInput for astronomical calculations.
 * Returns `null` if a custom birthplace has missing or invalid coordinates—NEVER silently
 * substitutes Guwahati or another preset city.
 */
export function formStateToBirthInputOrNull(
  state: BirthFormState,
): { input: BirthInput; resolved: ResolvedBirthplace } | null {
  const payload = buildValidatedCalculationPayload(state, 'en');
  if (!payload) {
    return null;
  }
  return {
    resolved: payload.resolved,
    input: payload.input,
  };
}

/**
 * Converts a valid BirthFormState into BirthInput.
 * Throws if a custom birthplace is missing valid coordinates (never silently falls back to a preset city).
 */
export function formStateToBirthInput(state: BirthFormState): BirthInput {
  const converted = formStateToBirthInputOrNull(state);
  if (!converted) {
    throw new Error(
      'Cannot calculate birth chart without valid custom birthplace coordinates and timezone.',
    );
  }
  return converted.input;
}

interface BirthDetailsFormProps {
  title?: string;
  value: BirthFormState;
  onChange: (next: BirthFormState) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  showName?: boolean;
  compact?: boolean;
  showValidation?: boolean;
  idPrefix: string;
}

export function BirthDetailsForm({
  title,
  value,
  onChange,
  onSubmit,
  submitLabel,
  showName = true,
  compact = false,
  showValidation: externalShowValidation = false,
  idPrefix,
}: BirthDetailsFormProps) {
  const { language } = useLanguage();
  const ui = CALC_UI[language];
  const bpUi = BIRTHPLACE_UI[language];
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);

  const validation = useMemo(
    () => validateBirthFormState(value, language),
    [value, language],
  );

  const showValidation = externalShowValidation || submittedAttempt;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAttempt(true);
    if (!value.dateStr) {
      setDateError(ui.dateLabel);
      return;
    }
    setDateError(null);
    if (!validation.valid) {
      return;
    }
    onSubmit?.();
  };

  const fields = (
    <div className="space-y-4">
      {title && (
        <h2 className="font-display text-lg font-semibold text-[#351016] border-b border-[#D8AD59]/30 pb-2.5">
          {title}
        </h2>
      )}

      {showName && (
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="block text-xs font-semibold text-[#351016] mb-1.5"
          >
            {ui.nameLabel}
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder={ui.namePlaceholder}
            className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016] focus:outline-none focus:border-[#B08532]"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-date`}
            className="block text-xs font-semibold text-[#351016] mb-1.5"
          >
            {ui.dateLabel}
          </label>
          <input
            id={`${idPrefix}-date`}
            type="date"
            required
            min="1800-01-01"
            max="2099-12-31"
            value={value.dateStr}
            onChange={(e) => onChange({ ...value, dateStr: e.target.value })}
            className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016] focus:outline-none focus:border-[#B08532]"
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-time`}
            className="block text-xs font-semibold text-[#351016] mb-1.5"
          >
            {ui.timeLabel}
          </label>
          <input
            id={`${idPrefix}-time`}
            type="time"
            required
            value={value.timeStr}
            onChange={(e) => onChange({ ...value, timeStr: e.target.value })}
            className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016] focus:outline-none focus:border-[#B08532]"
          />
        </div>
      </div>

      <BirthplaceSelector
        idPrefix={idPrefix}
        value={value.birthplace}
        onChange={(nextBirthplace) =>
          onChange({
            ...value,
            birthplace: nextBirthplace,
            legacyUtcOffsetHours: undefined,
          })
        }
        dateStr={value.dateStr || '1996-05-15'}
        timeStr={value.timeStr || '08:30'}
        contextKind="birthplace"
        theme="light"
        showValidation={showValidation}
      />

      {dateError && (
        <p role="alert" className="text-xs text-[#8E1C28]">
          {dateError}
        </p>
      )}

      {showValidation && !validation.valid && (
        <p role="alert" className="text-xs font-medium text-[#8E1C28]">
          {bpUi.coordinatesRequiredTitle}
        </p>
      )}

      {onSubmit && (
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold tracking-wide hover:brightness-105 transition-colors cursor-pointer shadow-sm"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>{submitLabel ?? ui.calculateBtn}</span>
        </button>
      )}
    </div>
  );

  if (!onSubmit) {
    return (
      <div
        className={`${compact ? 'p-5' : 'p-6 sm:p-7'} rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40`}
      >
        {fields}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${compact ? 'p-5' : 'p-6 sm:p-7'} rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40`}
    >
      {fields}
    </form>
  );
}
