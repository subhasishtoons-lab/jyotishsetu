import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CALC_UI } from '../i18n/vedicLabels';
import { PANCHANG_CITIES, getPanchangCityById, type PanchangCityId } from '../utils/panchang';
import type { BirthInput } from '../utils/vedicAstrology';

export interface BirthFormState {
  name: string;
  dateStr: string;
  timeStr: string;
  cityId: PanchangCityId;
  useCustomCoords: boolean;
  customLat: string;
  customLon: string;
  customUtcHours: string;
}

export function createDefaultBirthFormState(
  overrides: Partial<BirthFormState> = {},
): BirthFormState {
  return {
    name: '',
    dateStr: '1996-05-15',
    timeStr: '08:30',
    cityId: 'guwahati',
    useCustomCoords: false,
    customLat: '26.1445',
    customLon: '91.7362',
    customUtcHours: '5.5',
    ...overrides,
  };
}

export function formStateToBirthInput(state: BirthFormState): BirthInput {
  const city = getPanchangCityById(state.cityId);
  const lat = state.useCustomCoords ? Number(state.customLat) || city.lat : city.lat;
  const lon = state.useCustomCoords ? Number(state.customLon) || city.lon : city.lon;
  const utcOffsetMinutes = state.useCustomCoords
    ? Math.round((Number(state.customUtcHours) || 5.5) * 60)
    : city.utcOffsetMinutes;

  return {
    name: state.name.trim(),
    dateStr: state.dateStr || '1996-05-15',
    timeStr: state.timeStr || '08:30',
    lat: Math.max(-66, Math.min(66, lat)),
    lon: Math.max(-180, Math.min(180, lon)),
    utcOffsetMinutes,
  };
}

interface BirthDetailsFormProps {
  title?: string;
  value: BirthFormState;
  onChange: (next: BirthFormState) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  showName?: boolean;
  compact?: boolean;
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
  idPrefix,
}: BirthDetailsFormProps) {
  const { language } = useLanguage();
  const ui = CALC_UI[language];
  const [error, setError] = useState<string | null>(null);

  const selectedCity = getPanchangCityById(value.cityId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.dateStr) {
      setError(ui.dateLabel);
      return;
    }
    setError(null);
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
            min="1900-01-01"
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

      <div>
        <label
          htmlFor={`${idPrefix}-city`}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#351016] mb-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C47616]" aria-hidden="true" />
          <span>{ui.cityLabel}</span>
        </label>
        <select
          id={`${idPrefix}-city`}
          value={value.cityId}
          onChange={(e) => {
            const nextId = e.target.value as PanchangCityId;
            const c = getPanchangCityById(nextId);
            onChange({
              ...value,
              cityId: nextId,
              customLat: String(c.lat),
              customLon: String(c.lon),
              customUtcHours: String(c.utcOffsetMinutes / 60),
            });
          }}
          className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016] focus:outline-none focus:border-[#B08532] cursor-pointer"
        >
          {PANCHANG_CITIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.names[language]}, {c.regions[language]} ({c.coordinates})
            </option>
          ))}
        </select>
        {!value.useCustomCoords && (
          <p className="mt-1.5 text-[11px] text-[#542D24]/80 font-mono tabular-nums">
            {selectedCity.coordinates} · {selectedCity.timezone}
          </p>
        )}
      </div>

      <label className="inline-flex items-center gap-2 text-xs text-[#542D24] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={value.useCustomCoords}
          onChange={(e) => onChange({ ...value, useCustomCoords: e.target.checked })}
          className="rounded border-[#D8AD59] text-[#351016] focus:ring-[#D8AD59]"
        />
        <span>{ui.customCoordsToggle}</span>
      </label>

      {value.useCustomCoords && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-md bg-[#EFE3CE]/60 border border-[#D8AD59]/40">
          <div>
            <label htmlFor={`${idPrefix}-lat`} className="block text-[11px] font-semibold text-[#351016] mb-1">
              {ui.latLabel}
            </label>
            <input
              id={`${idPrefix}-lat`}
              type="number"
              step="0.0001"
              min="-66"
              max="66"
              value={value.customLat}
              onChange={(e) => onChange({ ...value, customLat: e.target.value })}
              className="w-full h-9 px-2.5 rounded bg-white border border-[#D8AD59]/50 text-xs text-[#351016]"
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-lon`} className="block text-[11px] font-semibold text-[#351016] mb-1">
              {ui.lonLabel}
            </label>
            <input
              id={`${idPrefix}-lon`}
              type="number"
              step="0.0001"
              min="-180"
              max="180"
              value={value.customLon}
              onChange={(e) => onChange({ ...value, customLon: e.target.value })}
              className="w-full h-9 px-2.5 rounded bg-white border border-[#D8AD59]/50 text-xs text-[#351016]"
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-utc`} className="block text-[11px] font-semibold text-[#351016] mb-1">
              {ui.utcOffsetLabel}
            </label>
            <input
              id={`${idPrefix}-utc`}
              type="number"
              step="0.25"
              min="-12"
              max="14"
              value={value.customUtcHours}
              onChange={(e) => onChange({ ...value, customUtcHours: e.target.value })}
              className="w-full h-9 px-2.5 rounded bg-white border border-[#D8AD59]/50 text-xs text-[#351016]"
            />
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="text-xs text-[#8E1C28]">
          {error}
        </p>
      )}

      {onSubmit && (
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold tracking-wide hover:brightness-105 transition-all cursor-pointer shadow-sm"
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
      className={`${compact ? 'p-5' : 'p-6 sm:p-7'} rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40`}
    >
      {fields}
    </form>
  );
}
