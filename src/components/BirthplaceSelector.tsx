import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  Clock,
  Edit3,
  Globe,
  MapPin,
  PlusCircle,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  BIRTHPLACE_UI,
  createEmptyCustomBirthplace,
  formatCustomPlaceName,
  getAvailableIanaTimeZones,
  resolveIanaUtcOffsetMinutes,
  searchPresetCities,
  validateBirthplaceSelection,
  type BirthplaceSelection,
  type CustomBirthplaceFields,
  type LatHemisphere,
  type LonHemisphere,
} from '../utils/birthplace';
import { formatUtcOffsetLabel, type PanchangCityId } from '../utils/panchang';

export interface BirthplaceSelectorProps {
  idPrefix: string;
  value: BirthplaceSelection;
  onChange: (next: BirthplaceSelection) => void;
  dateStr: string;
  timeStr?: string;
  /** 'birthplace' for birth chart calculators; 'location' for Panchang / Muhurat */
  contextKind?: 'birthplace' | 'location';
  /** 'light' for ivory forms; 'dark' for maroon Panchang/Muhurat banner cards */
  theme?: 'light' | 'dark';
  /** Display validation errors prominently (e.g. after user clicked Calculate) */
  showValidation?: boolean;
  /** Optional custom label override */
  label?: string;
}

export function BirthplaceSelector({
  idPrefix,
  value,
  onChange,
  dateStr,
  timeStr = '12:00',
  contextKind = 'birthplace',
  theme = 'light',
  showValidation = false,
  label,
}: BirthplaceSelectorProps) {
  const { language } = useLanguage();
  const ui = BIRTHPLACE_UI[language];

  const [isEditing, setIsEditing] = useState<boolean>(value.mode === 'custom');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tzQuery, setTzQuery] = useState<string>('');

  const validation = useMemo(
    () => validateBirthplaceSelection(value, dateStr, timeStr, language),
    [value, dateStr, timeStr, language],
  );

  const matchingPresets = useMemo(() => searchPresetCities(searchQuery), [searchQuery]);
  const allTimeZones = useMemo(() => getAvailableIanaTimeZones(), []);

  const filteredTimeZones = useMemo(() => {
    const q = tzQuery.trim().toLowerCase();
    if (!q) return allTimeZones;
    return allTimeZones.filter(
      (tz) =>
        tz.iana.toLowerCase().includes(q) ||
        tz.label.toLowerCase().includes(q) ||
        tz.region.toLowerCase().includes(q),
    );
  }, [allTimeZones, tzQuery]);

  const customPreviewOffset = useMemo(() => {
    const lonNum = Number(value.custom.lonValue);
    const signedLon =
      value.custom.lonValue.trim() && Number.isFinite(lonNum)
        ? value.custom.lonValue.trim().startsWith('-')
          ? lonNum
          : value.custom.lonDir === 'W'
            ? -Math.abs(lonNum)
            : Math.abs(lonNum)
        : undefined;
    return resolveIanaUtcOffsetMinutes(value.custom.ianaTimeZone, dateStr, timeStr, signedLon);
  }, [value.custom.ianaTimeZone, value.custom.lonValue, value.custom.lonDir, dateStr, timeStr]);

  const isDark = theme === 'dark';

  const selectPreset = (cityId: PanchangCityId) => {
    onChange({
      ...value,
      mode: 'preset',
      presetCityId: cityId,
    });
    setSearchQuery('');
    setIsEditing(false);
  };

  const switchToCustom = (prefillName?: string) => {
    const cleanedPrefill = (prefillName ?? '').trim();
    const existingCustom = value.custom;
    const nextCustom: CustomBirthplaceFields =
      value.mode === 'custom'
        ? {
            ...existingCustom,
            placeName: cleanedPrefill || existingCustom.placeName,
          }
        : createEmptyCustomBirthplace({
            placeName: cleanedPrefill || existingCustom.placeName,
            district: existingCustom.district,
            state: existingCustom.state,
            country: existingCustom.country,
            latValue: existingCustom.latValue,
            latDir: existingCustom.latDir,
            lonValue: existingCustom.lonValue,
            lonDir: existingCustom.lonDir,
            ianaTimeZone: existingCustom.ianaTimeZone || 'Asia/Kolkata',
          });

    onChange({
      ...value,
      mode: 'custom',
      custom: nextCustom,
    });
    setSearchQuery('');
    setIsEditing(true);
  };

  const updateCustomField = <K extends keyof CustomBirthplaceFields>(
    key: K,
    fieldValue: CustomBirthplaceFields[K],
  ) => {
    onChange({
      ...value,
      mode: 'custom',
      custom: {
        ...value.custom,
        [key]: fieldValue,
      },
    });
  };

  const handleLatInput = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('-')) {
      onChange({
        ...value,
        mode: 'custom',
        custom: {
          ...value.custom,
          latValue: trimmed.slice(1),
          latDir: 'S',
        },
      });
      return;
    }
    updateCustomField('latValue', raw);
  };

  const handleLonInput = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('-')) {
      onChange({
        ...value,
        mode: 'custom',
        custom: {
          ...value.custom,
          lonValue: trimmed.slice(1),
          lonDir: 'W',
        },
      });
      return;
    }
    updateCustomField('lonValue', raw);
  };

  const fieldLabel =
    label ?? (contextKind === 'location' ? ui.locationLabel : ui.birthplaceLabel);
  const summaryTitle =
    contextKind === 'location' ? ui.selectedLocationSummaryTitle : ui.selectedSummaryTitle;
  const notListedText =
    contextKind === 'location' ? ui.notListedLocationBtn : ui.notListedBtn;

  // Determine whether to show custom validation messages
  const hasAttemptedCustomInput =
    showValidation ||
    value.custom.placeName.trim().length > 0 ||
    value.custom.latValue.trim().length > 0 ||
    value.custom.lonValue.trim().length > 0;

  const customDisplayFallback = formatCustomPlaceName(value.custom);

  // Theme tokens (preserving deep maroon #351016, saffron #E99A32, antique gold #D8AD59, ivory #F8F0E3)
  const labelClass = isDark
    ? 'flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#EBD08D]'
    : 'flex items-center gap-1.5 text-xs font-semibold text-[#351016]';
  const summaryCardClass = isDark
    ? 'rounded-md bg-[#351016] border border-[#D8AD59]/45 p-3'
    : 'rounded-md bg-white border border-[#D8AD59]/50 p-3.5';
  const editorShellClass = isDark
    ? 'mt-2.5 rounded-md bg-[#2A0B11] border border-[#D8AD59]/45 p-3.5 space-y-3'
    : 'mt-2.5 rounded-md bg-[#EFE3CE]/55 border border-[#D8AD59]/45 p-3.5 space-y-3';
  const inputClass = isDark
    ? 'w-full h-10 px-3 rounded-md bg-[#351016] border border-[#D8AD59]/50 text-sm text-[#F8F0E3] placeholder:text-[#F8F0E3]/45 focus:outline-none focus:border-[#E99A32]'
    : 'w-full h-10 px-3 rounded-md bg-white border border-[#D8AD59]/55 text-sm text-[#351016] placeholder:text-[#542D24]/45 focus:outline-none focus:border-[#B08532]';
  const smallLabelClass = isDark
    ? 'block text-[11px] font-semibold text-[#EBD08D] mb-1'
    : 'block text-[11px] font-semibold text-[#351016] mb-1';
  const mutedTextClass = isDark ? 'text-[#F8F0E3]/75' : 'text-[#542D24]/85';

  return (
    <div className="space-y-2">
      <label htmlFor={`${idPrefix}-place-search`} className={labelClass}>
        <MapPin
          className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#E99A32]' : 'text-[#C47616]'}`}
          aria-hidden="true"
        />
        <span>{fieldLabel}</span>
      </label>

      {/* Selected Birthplace / Location Summary Card (always visible before calculation) */}
      <div className={summaryCardClass} data-testid={`${idPrefix}-birthplace-summary`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                  value.mode === 'custom'
                    ? isDark
                      ? 'bg-[#E99A32]/20 border-[#E99A32]/50 text-[#F5DC9B]'
                      : 'bg-[#2C2F4C]/10 border-[#2C2F4C]/35 text-[#252847]'
                    : isDark
                      ? 'bg-[#D8AD59]/15 border-[#D8AD59]/40 text-[#EBD08D]'
                      : 'bg-[#351016]/8 border-[#D8AD59]/50 text-[#351016]'
                }`}
              >
                {value.mode === 'custom' ? ui.customBadge : ui.presetBadge}
              </span>
              <span className={`text-[11px] ${mutedTextClass}`}>{summaryTitle}</span>
              {value.mode === 'custom' && !validation.valid && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#8E1C28]/15 border border-[#8E1C28]/40 text-[#8E1C28]">
                  {ui.customIncompleteBadge}
                </span>
              )}
            </div>

            <p
              className={`mt-1.5 text-sm font-semibold truncate ${
                isDark ? 'text-[#F8F0E3]' : 'text-[#351016]'
              }`}
            >
              {validation.resolved
                ? validation.resolved.displayName
                : customDisplayFallback || ui.placeNamePlaceholder}
            </p>

            {validation.resolved ? (
              <div
                className={`mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] font-mono tabular-nums ${mutedTextClass}`}
              >
                <span>{validation.resolved.coordinatesLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{validation.resolved.timezoneLabel}</span>
              </div>
            ) : (
              <p
                className={`mt-1 text-[11px] ${
                  isDark ? 'text-[#F5DC9B]' : 'text-[#8E1C28]'
                }`}
              >
                {ui.coordinatesRequiredTitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            aria-expanded={isEditing}
            className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#24090E] border-[#D8AD59]/45 text-[#EBD08D] hover:bg-[#4A1820]'
                : 'bg-[#F8F0E3] border-[#D8AD59]/55 text-[#351016] hover:bg-[#EFE3CE]'
            }`}
          >
            <Edit3 className="w-3 h-3" aria-hidden="true" />
            <span>{isEditing ? ui.doneBtn : ui.editBtn}</span>
          </button>
        </div>
      </div>

      {/* Interactive Searchable Preset Selector OR Custom Birthplace Editor */}
      {isEditing && (
        <div className={editorShellClass}>
          {value.mode === 'preset' ? (
            <>
              {/* Searchable Preset City Input */}
              <div className="relative">
                <Search
                  className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? 'text-[#D8AD59]' : 'text-[#8C5320]'
                  }`}
                  aria-hidden="true"
                />
                <input
                  id={`${idPrefix}-place-search`}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  autoComplete="off"
                  className={`${inputClass} pl-9`}
                />
              </div>

              {/* Matching Preset Cities List (All 18 preserved) */}
              <div>
                <p
                  className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#D8AD59]' : 'text-[#8C5320]'
                  }`}
                >
                  {ui.presetGroupLabel} ({matchingPresets.length}/18)
                </p>

                {matchingPresets.length > 0 ? (
                  <div
                    role="listbox"
                    aria-label={ui.presetGroupLabel}
                    className={`max-h-52 overflow-y-auto rounded-md border divide-y ${
                      isDark
                        ? 'bg-[#351016] border-[#D8AD59]/35 divide-[#D8AD59]/15'
                        : 'bg-white border-[#D8AD59]/45 divide-[#D8AD59]/20'
                    }`}
                  >
                    {matchingPresets.map((city) => {
                      const active = value.presetCityId === city.id;
                      return (
                        <button
                          key={city.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => selectPreset(city.id)}
                          className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            active
                              ? isDark
                                ? 'bg-[#D8AD59]/20 text-[#F8F0E3]'
                                : 'bg-[#F8F0E3] text-[#351016]'
                              : isDark
                                ? 'text-[#F8F0E3]/90 hover:bg-[#4A1820]'
                                : 'text-[#351016] hover:bg-[#FDF9F2]'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold truncate">
                              {city.names[language]},{' '}
                              <span className="font-normal opacity-80">
                                {city.regions[language]}
                              </span>
                            </p>
                            <p className="text-[11px] font-mono opacity-75">
                              {city.coordinates} · {city.ianaTimeZone}
                            </p>
                          </div>
                          {active && (
                            <Check
                              className={`w-4 h-4 shrink-0 ${
                                isDark ? 'text-[#E99A32]' : 'text-[#2B5A3C]'
                              }`}
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className={`text-xs py-2 px-1 ${mutedTextClass}`}>{ui.noPresetMatch}</p>
                )}
              </div>

              {/* Prominent "My birthplace is not listed" Action */}
              <button
                type="button"
                onClick={() => switchToCustom(searchQuery)}
                className={`w-full text-left p-3 rounded-md border flex items-start gap-2.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#351016] border-[#E99A32]/60 text-[#F8F0E3] hover:bg-[#4A1820]'
                    : 'bg-[#FDF9F2] border-[#B08532]/60 text-[#351016] hover:bg-white'
                }`}
              >
                <PlusCircle
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isDark ? 'text-[#E99A32]' : 'text-[#C47616]'
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-xs sm:text-sm font-semibold">
                    {notListedText}
                    {searchQuery.trim() ? `: “${searchQuery.trim()}”` : ''}
                  </span>
                  <span className={`block text-[11px] mt-0.5 ${mutedTextClass}`}>
                    {ui.notListedSub}
                  </span>
                </span>
              </button>
            </>
          ) : (
            /* CUSTOM BIRTHPLACE FIELDS */
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D8AD59]/30">
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-[#F5DC9B]' : 'text-[#351016]'
                  }`}
                >
                  {ui.customBadge}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onChange({ ...value, mode: 'preset' });
                    setIsEditing(true);
                  }}
                  className={`text-xs font-semibold underline underline-offset-4 cursor-pointer ${
                    isDark
                      ? 'text-[#EBD08D] hover:text-[#F8F0E3]'
                      : 'text-[#8C5320] hover:text-[#351016]'
                  }`}
                >
                  {ui.backToPresetsBtn}
                </button>
              </div>

              {/* Place Hierarchy: Village/Town/City, District, State/Province, Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${idPrefix}-custom-place`} className={smallLabelClass}>
                    {ui.placeNameLabel}
                  </label>
                  <input
                    id={`${idPrefix}-custom-place`}
                    type="text"
                    value={value.custom.placeName}
                    onChange={(e) => updateCustomField('placeName', e.target.value)}
                    placeholder={ui.placeNamePlaceholder}
                    className={inputClass}
                  />
                  {showValidation && validation.errors.placeNameMissing && (
                    <p className={`mt-1 text-[11px] ${isDark ? 'text-[#F5B0B0]' : 'text-[#8E1C28]'}`}>
                      {ui.errPlaceName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${idPrefix}-custom-district`} className={smallLabelClass}>
                    {ui.districtLabel}
                  </label>
                  <input
                    id={`${idPrefix}-custom-district`}
                    type="text"
                    value={value.custom.district}
                    onChange={(e) => updateCustomField('district', e.target.value)}
                    placeholder={ui.districtPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor={`${idPrefix}-custom-state`} className={smallLabelClass}>
                    {ui.stateLabel}
                  </label>
                  <input
                    id={`${idPrefix}-custom-state`}
                    type="text"
                    value={value.custom.state}
                    onChange={(e) => updateCustomField('state', e.target.value)}
                    placeholder={ui.statePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor={`${idPrefix}-custom-country`} className={smallLabelClass}>
                    {ui.countryLabel}
                  </label>
                  <input
                    id={`${idPrefix}-custom-country`}
                    type="text"
                    value={value.custom.country}
                    onChange={(e) => updateCustomField('country', e.target.value)}
                    placeholder={ui.countryPlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Manual Latitude (N/S) & Longitude (E/W) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${idPrefix}-custom-lat`} className={smallLabelClass}>
                    {ui.latitudeLabel}
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      id={`${idPrefix}-custom-lat`}
                      type="text"
                      inputMode="decimal"
                      value={value.custom.latValue}
                      onChange={(e) => handleLatInput(e.target.value)}
                      placeholder={ui.latitudePlaceholder}
                      className={`${inputClass} font-mono tabular-nums`}
                    />
                    <div
                      role="group"
                      aria-label={ui.latitudeLabel}
                      className="inline-flex rounded-md overflow-hidden border border-[#D8AD59]/55 shrink-0"
                    >
                      {(['N', 'S'] as const satisfies readonly LatHemisphere[]).map((dir) => {
                        const active = value.custom.latDir === dir;
                        return (
                          <button
                            key={dir}
                            type="button"
                            aria-pressed={active}
                            onClick={() => updateCustomField('latDir', dir)}
                            className={`px-2.5 h-10 text-xs font-semibold transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#351016] text-[#F5DC9B]'
                                : isDark
                                  ? 'bg-[#24090E] text-[#F8F0E3]/80 hover:bg-[#4A1820]'
                                  : 'bg-white text-[#542D24] hover:bg-[#F8F0E3]'
                            }`}
                          >
                            {dir === 'N' ? ui.north : ui.south}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {hasAttemptedCustomInput && validation.errors.latMissing && (
                    <p className={`mt-1 text-[11px] ${isDark ? 'text-[#F5B0B0]' : 'text-[#8E1C28]'}`}>
                      {ui.errLatMissing}
                    </p>
                  )}
                  {hasAttemptedCustomInput && validation.errors.latInvalid && (
                    <p className={`mt-1 text-[11px] ${isDark ? 'text-[#F5B0B0]' : 'text-[#8E1C28]'}`}>
                      {ui.errLatInvalid}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${idPrefix}-custom-lon`} className={smallLabelClass}>
                    {ui.longitudeLabel}
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      id={`${idPrefix}-custom-lon`}
                      type="text"
                      inputMode="decimal"
                      value={value.custom.lonValue}
                      onChange={(e) => handleLonInput(e.target.value)}
                      placeholder={ui.longitudePlaceholder}
                      className={`${inputClass} font-mono tabular-nums`}
                    />
                    <div
                      role="group"
                      aria-label={ui.longitudeLabel}
                      className="inline-flex rounded-md overflow-hidden border border-[#D8AD59]/55 shrink-0"
                    >
                      {(['E', 'W'] as const satisfies readonly LonHemisphere[]).map((dir) => {
                        const active = value.custom.lonDir === dir;
                        return (
                          <button
                            key={dir}
                            type="button"
                            aria-pressed={active}
                            onClick={() => updateCustomField('lonDir', dir)}
                            className={`px-2.5 h-10 text-xs font-semibold transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#351016] text-[#F5DC9B]'
                                : isDark
                                  ? 'bg-[#24090E] text-[#F8F0E3]/80 hover:bg-[#4A1820]'
                                  : 'bg-white text-[#542D24] hover:bg-[#F8F0E3]'
                            }`}
                          >
                            {dir === 'E' ? ui.east : ui.west}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {hasAttemptedCustomInput && validation.errors.lonMissing && (
                    <p className={`mt-1 text-[11px] ${isDark ? 'text-[#F5B0B0]' : 'text-[#8E1C28]'}`}>
                      {ui.errLonMissing}
                    </p>
                  )}
                  {hasAttemptedCustomInput && validation.errors.lonInvalid && (
                    <p className={`mt-1 text-[11px] ${isDark ? 'text-[#F5B0B0]' : 'text-[#8E1C28]'}`}>
                      {ui.errLonInvalid}
                    </p>
                  )}
                </div>
              </div>

              {/* Searchable IANA Timezone Selector */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`${idPrefix}-custom-tz`}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                    isDark ? 'text-[#EBD08D]' : 'text-[#351016]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-[#C47616]" aria-hidden="true" />
                  <span>{ui.timezoneLabel}</span>
                </label>

                <input
                  id={`${idPrefix}-custom-tz-search`}
                  type="text"
                  value={tzQuery}
                  onChange={(e) => setTzQuery(e.target.value)}
                  placeholder={ui.timezoneSearchPlaceholder}
                  aria-label={ui.timezoneSearchPlaceholder}
                  className={`${inputClass} h-9 text-xs`}
                />

                <select
                  id={`${idPrefix}-custom-tz`}
                  value={value.custom.ianaTimeZone}
                  onChange={(e) => updateCustomField('ianaTimeZone', e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {filteredTimeZones.length === 0 ? (
                    <option value={value.custom.ianaTimeZone}>{value.custom.ianaTimeZone}</option>
                  ) : (
                    filteredTimeZones.map((tz) => (
                      <option key={tz.iana} value={tz.iana}>
                        {tz.label}
                      </option>
                    ))
                  )}
                </select>

                <p
                  className={`flex items-start gap-1.5 text-[11px] font-mono tabular-nums ${mutedTextClass}`}
                >
                  <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C47616]" aria-hidden="true" />
                  <span>
                    {ui.resolvedOffsetPrefix}:{' '}
                    <strong>{formatUtcOffsetLabel(customPreviewOffset.offsetMinutes)}</strong>
                    {customPreviewOffset.isHistoricalLmt ? ` · ${ui.historicalLmtNote}` : ''}
                  </span>
                </p>

                {showValidation && validation.errors.timezoneInvalid && (
                  <p className={`text-[11px] ${isDark ? 'text-[#F5B0B0]' : 'text-[#8E1C28]'}`}>
                    {ui.errTimezone}
                  </p>
                )}
              </div>

              {/* Missing Coordinates Explanation Banner */}
              {(validation.errors.latMissing || validation.errors.lonMissing) && (
                <div
                  className={`p-3 rounded-md border flex items-start gap-2 text-xs leading-relaxed ${
                    isDark
                      ? 'bg-[#351016] border-[#E99A32]/50 text-[#F5DC9B]'
                      : 'bg-[#FFF8EC] border-[#D8AD59] text-[#542D24]'
                  }`}
                >
                  <AlertTriangle
                    className="w-4 h-4 shrink-0 mt-0.5 text-[#C47616]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">{ui.coordinatesRequiredTitle}</p>
                    <p className="mt-0.5 text-[11px]">{ui.coordinatesRequiredBody}</p>
                  </div>
                </div>
              )}

              {/* Polar Latitude Informational Note */}
              {validation.resolved?.isPolarLatitude && (
                <p className={`text-[11px] ${mutedTextClass}`}>{ui.polarNote}</p>
              )}
            </div>
          )}

          {/* Local Browser Privacy Reassurance */}
          <p className={`pt-1 flex items-center gap-1.5 text-[11px] ${mutedTextClass}`}>
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#2B5A3C]" aria-hidden="true" />
            <span>{ui.privacyNote}</span>
          </p>
        </div>
      )}
    </div>
  );
}
