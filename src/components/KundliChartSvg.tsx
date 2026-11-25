import React from 'react';
import type { Language } from '../i18n/types';
import { PLANET_SHORT } from '../i18n/vedicLabels';
import { localizeDigits } from '../utils/panchang';
import type { PlanetPosition } from '../utils/vedicAstrology';

export type ChartStyle = 'north' | 'south';
export type ChartType = 'lagna' | 'navamsha' | 'chandra';

interface KundliChartSvgProps {
  style: ChartStyle;
  chartType: ChartType;
  lagnaRashiIndex: number; // 0..11 for the active chart (Lagna, Navamsha Lagna, or Moon Sign)
  planets: PlanetPosition[];
  language: Language;
  title: string;
}

function getPlanetSignForChart(p: PlanetPosition, chartType: ChartType): number {
  return chartType === 'navamsha' ? p.navamshaRashiIndex : p.rashiIndex;
}

// North Indian Diamond chart center coordinates for Houses 1..12 (counter-clockwise from top diamond)
const NORTH_HOUSE_CENTERS: ReadonlyArray<{
  house: number;
  x: number;
  y: number;
  signX: number;
  signY: number;
}> = [
  { house: 1, x: 200, y: 100, signX: 200, signY: 168 },
  { house: 2, x: 100, y: 46, signX: 100, signY: 82 },
  { house: 3, x: 46, y: 100, signX: 80, signY: 100 },
  { house: 4, x: 100, y: 200, signX: 168, signY: 200 },
  { house: 5, x: 46, y: 300, signX: 80, signY: 300 },
  { house: 6, x: 100, y: 354, signX: 100, signY: 324 },
  { house: 7, x: 200, y: 300, signX: 200, signY: 238 },
  { house: 8, x: 300, y: 354, signX: 300, signY: 324 },
  { house: 9, x: 354, y: 300, signX: 320, signY: 300 },
  { house: 10, x: 300, y: 200, signX: 232, signY: 200 },
  { house: 11, x: 354, y: 100, signX: 320, signY: 100 },
  { house: 12, x: 300, y: 46, signX: 300, signY: 82 },
];

// South Indian fixed sign boxes (0=Mesha..11=Meena) in a 4x4 grid (each cell 100x100)
const SOUTH_SIGN_CELLS: ReadonlyArray<{ rashiIndex: number; col: number; row: number }> = [
  { rashiIndex: 11, col: 0, row: 0 }, // Meena
  { rashiIndex: 0, col: 1, row: 0 }, // Mesha
  { rashiIndex: 1, col: 2, row: 0 }, // Vrishabha
  { rashiIndex: 2, col: 3, row: 0 }, // Mithuna
  { rashiIndex: 3, col: 3, row: 1 }, // Karka
  { rashiIndex: 4, col: 3, row: 2 }, // Simha
  { rashiIndex: 5, col: 3, row: 3 }, // Kanya
  { rashiIndex: 6, col: 2, row: 3 }, // Tula
  { rashiIndex: 7, col: 1, row: 3 }, // Vrishchika
  { rashiIndex: 8, col: 0, row: 3 }, // Dhanu
  { rashiIndex: 9, col: 0, row: 2 }, // Makara
  { rashiIndex: 10, col: 0, row: 1 }, // Kumbha
];

export function KundliChartSvg({
  style,
  chartType,
  lagnaRashiIndex,
  planets,
  language,
  title,
}: KundliChartSvgProps) {
  const shortMap = PLANET_SHORT[language];

  // Group planet labels by Rashi index (0..11)
  const planetsByRashi: Record<number, string[]> = {};
  for (let i = 0; i < 12; i++) planetsByRashi[i] = [];

  if (chartType !== 'chandra') {
    planetsByRashi[lagnaRashiIndex].push(shortMap.lagna);
  }
  for (const p of planets) {
    const rIdx = getPlanetSignForChart(p, chartType);
    const label = p.retrograde && p.id !== 'rahu' && p.id !== 'ketu'
      ? `${shortMap[p.id]}*`
      : shortMap[p.id];
    planetsByRashi[rIdx].push(label);
  }

  if (style === 'south') {
    return (
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[380px] mx-auto h-auto select-none"
        role="img"
        aria-label={title}
      >
        <rect x="4" y="4" width="392" height="392" rx="6" fill="#FDF9F2" stroke="#8C5320" strokeWidth="2" />
        {/* 4x4 outer cells with open 2x2 center */}
        {SOUTH_SIGN_CELLS.map(({ rashiIndex, col, row }) => {
          const x = 4 + col * 98;
          const y = 4 + row * 98;
          const isLagna = rashiIndex === lagnaRashiIndex;
          const items = planetsByRashi[rashiIndex];
          const line1 = items.slice(0, 3).join(' ');
          const line2 = items.slice(3, 6).join(' ');
          const line3 = items.slice(6).join(' ');

          return (
            <g key={rashiIndex}>
              <rect
                x={x}
                y={y}
                width="98"
                height="98"
                fill={isLagna ? '#F5E4CA' : '#FDF9F2'}
                stroke="#B08532"
                strokeWidth="1.2"
              />
              {isLagna && (
                <line x1={x} y1={y + 20} x2={x + 20} y2={y} stroke="#7A2029" strokeWidth="1.5" />
              )}
              <text
                x={x + 88}
                y={y + 16}
                textAnchor="end"
                fontSize="10"
                fill="#8C5320"
                fontWeight="600"
              >
                {localizeDigits(rashiIndex + 1, language)}
              </text>
              <text
                x={x + 49}
                y={y + 46}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="600"
                fill="#351016"
              >
                {line1}
              </text>
              {line2 && (
                <text
                  x={x + 49}
                  y={y + 64}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="600"
                  fill="#351016"
                >
                  {line2}
                </text>
              )}
              {line3 && (
                <text
                  x={x + 49}
                  y={y + 82}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#351016"
                >
                  {line3}
                </text>
              )}
            </g>
          );
        })}

        {/* Center Title Box */}
        <rect x="102" y="102" width="196" height="196" fill="#351016" stroke="#D8AD59" strokeWidth="1.4" />
        <text
          x="200"
          y="194"
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          fill="#F5DC9B"
        >
          {title}
        </text>
        <text
          x="200"
          y="218"
          textAnchor="middle"
          fontSize="11"
          fill="#EBD08D"
          opacity="0.85"
        >
          {shortMap.lagna}: {localizeDigits(lagnaRashiIndex + 1, language)}
        </text>
      </svg>
    );
  }

  // North Indian Diamond Chart
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-[380px] mx-auto h-auto select-none"
      role="img"
      aria-label={title}
    >
      <rect x="6" y="6" width="388" height="388" rx="6" fill="#FDF9F2" stroke="#8C5320" strokeWidth="2.2" />
      {/* Diagonals */}
      <line x1="6" y1="6" x2="394" y2="394" stroke="#B08532" strokeWidth="1.3" />
      <line x1="394" y1="6" x2="6" y2="394" stroke="#B08532" strokeWidth="1.3" />
      {/* Inner Diamond */}
      <polygon
        points="200,6 394,200 200,394 6,200"
        fill="none"
        stroke="#8C5320"
        strokeWidth="1.6"
      />
      {/* Subtle First House Highlight */}
      <polygon points="200,6 297,103 200,200 103,103" fill="#F5E4CA" fillOpacity="0.45" />

      {NORTH_HOUSE_CENTERS.map((cell) => {
        const rashiIndex = (lagnaRashiIndex + cell.house - 1) % 12;
        const items = planetsByRashi[rashiIndex];
        const line1 = items.slice(0, 3).join(' ');
        const line2 = items.slice(3, 6).join(' ');
        const line3 = items.slice(6).join(' ');

        return (
          <g key={cell.house}>
            <text
              x={cell.signX}
              y={cell.signY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="#8C5320"
            >
              {localizeDigits(rashiIndex + 1, language)}
            </text>
            {line1 && (
              <text
                x={cell.x}
                y={line2 ? cell.y - 7 : cell.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12.5"
                fontWeight="600"
                fill="#351016"
              >
                {line1}
              </text>
            )}
            {line2 && (
              <text
                x={cell.x}
                y={cell.y + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="600"
                fill="#351016"
              >
                {line2}
              </text>
            )}
            {line3 && (
              <text
                x={cell.x}
                y={cell.y + 24}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="600"
                fill="#351016"
              >
                {line3}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
