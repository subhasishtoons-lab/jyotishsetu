import React, { useId } from 'react';

interface JyotishLogoProps {
  size?: number;
  className?: string;
}

export function JyotishLogoMark({ size = 36, className = '' }: JyotishLogoProps) {
  const uid = useId().replace(/:/g, '');
  const goldId = `jsGold-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={goldId} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5DC9B" />
          <stop offset="50%" stopColor="#D8AD59" />
          <stop offset="100%" stopColor="#E99A32" />
        </linearGradient>
      </defs>
      {/* Outer sacred ring */}
      <circle cx="32" cy="32" r="29" stroke={`url(#${goldId})`} strokeWidth="1.25" strokeOpacity="0.65" />
      <circle cx="32" cy="32" r="24" stroke={`url(#${goldId})`} strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.6" />

      {/* 12 Solar Mandala Rays */}
      {Array.from({ length: 12 }).map((_, idx) => {
        const angle = idx * 30;
        const isCardinal = idx % 3 === 0;
        return (
          <g key={angle} transform={`rotate(${angle} 32 32)`}>
            <path
              d={isCardinal ? 'M32 4 L34.2 15 L32 13 L29.8 15 Z' : 'M32 8 L33.5 16.5 L32 15 L30.5 16.5 Z'}
              fill={`url(#${goldId})`}
              fillOpacity={isCardinal ? '1' : '0.82'}
            />
          </g>
        );
      })}

      {/* 8-pointed Star / Ashtadala Lotus Geometry */}
      <rect
        x="21.5"
        y="21.5"
        width="21"
        height="21"
        stroke={`url(#${goldId})`}
        strokeWidth="1.2"
        transform="rotate(45 32 32)"
      />
      <rect x="21.5" y="21.5" width="21" height="21" stroke={`url(#${goldId})`} strokeWidth="1.2" />

      {/* Radiant Surya Core */}
      <circle cx="32" cy="32" r="7.5" fill="#351016" stroke={`url(#${goldId})`} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="3.4" fill={`url(#${goldId})`} />
    </svg>
  );
}
