import React, { useId } from 'react';

interface VedicMandalaProps {
  className?: string;
  opacity?: number;
}

export function VedicMandalaArtwork({ className = '', opacity = 1 }: VedicMandalaProps) {
  const uid = useId().replace(/:/g, '');
  const glowId = `mandalaGlow-${uid}`;
  const goldId = `goldStroke-${uid}`;

  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E99A32" stopOpacity="0.3" />
          <stop offset="48%" stopColor="#D8AD59" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#351016" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={goldId} x1="100" y1="100" x2="700" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F6E0A6" />
          <stop offset="50%" stopColor="#D8AD59" />
          <stop offset="100%" stopColor="#E99A32" />
        </linearGradient>
      </defs>

      {/* Warm central solar aura */}
      <circle cx="400" cy="400" r="390" fill={`url(#${glowId})`} />

      {/* Outer slow rotating zodiac & 27-nakshatra ring */}
      <g className="animate-mandala-slow origin-center" style={{ transformOrigin: '400px 400px' }}>
        <circle cx="400" cy="400" r="378" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeOpacity="0.55" />
        <circle
          cx="400"
          cy="400"
          r="364"
          stroke={`url(#${goldId})`}
          strokeWidth="1"
          strokeDasharray="3 6"
          strokeOpacity="0.6"
        />
        <circle cx="400" cy="400" r="332" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeOpacity="0.55" />

        {/* 27 Nakshatra ticks */}
        {Array.from({ length: 27 }).map((_, i) => {
          const deg = (i * 360) / 27;
          return (
            <g key={`nak-${i}`} transform={`rotate(${deg} 400 400)`}>
              <line x1="400" y1="36" x2="400" y2="68" stroke={`url(#${goldId})`} strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="400" cy="52" r="2.4" fill="#EBD08D" fillOpacity="0.85" />
            </g>
          );
        })}

        {/* 12 Rashi lotus arches */}
        {Array.from({ length: 12 }).map((_, i) => {
          const deg = i * 30;
          return (
            <g key={`rashi-${i}`} transform={`rotate(${deg} 400 400)`}>
              <path
                d="M400 72 C425 112 435 140 400 178 C365 140 375 112 400 72 Z"
                stroke={`url(#${goldId})`}
                strokeWidth="1.25"
                strokeOpacity="0.68"
                fill="#D8AD59"
                fillOpacity="0.05"
              />
              <line x1="400" y1="68" x2="400" y2="178" stroke={`url(#${goldId})`} strokeWidth="0.75" strokeOpacity="0.4" />
            </g>
          );
        })}
      </g>

      {/* Inner counter-rotating sacred lotus & Sri Yantra inspired geometry */}
      <g className="animate-mandala-reverse origin-center" style={{ transformOrigin: '400px 400px' }}>
        <circle cx="400" cy="400" r="222" stroke={`url(#${goldId})`} strokeWidth="1.4" strokeOpacity="0.72" />
        <circle cx="400" cy="400" r="206" stroke={`url(#${goldId})`} strokeWidth="0.9" strokeDasharray="2 4" strokeOpacity="0.6" />

        {/* 16 Inner Lotus Petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const deg = i * 22.5;
          return (
            <g key={`petal-${i}`} transform={`rotate(${deg} 400 400)`}>
              <path
                d="M400 194 Q418 232 400 264 Q382 232 400 194 Z"
                stroke={`url(#${goldId})`}
                strokeWidth="1.15"
                strokeOpacity="0.72"
                fill="#E99A32"
                fillOpacity="0.06"
              />
            </g>
          );
        })}

        {/* Interlocking North Indian Kundli Diamond Frame */}
        <rect
          x="295"
          y="295"
          width="210"
          height="210"
          stroke={`url(#${goldId})`}
          strokeWidth="1.35"
          strokeOpacity="0.75"
        />
        <rect
          x="295"
          y="295"
          width="210"
          height="210"
          stroke={`url(#${goldId})`}
          strokeWidth="1.35"
          strokeOpacity="0.75"
          transform="rotate(45 400 400)"
        />
      </g>

      {/* Stationary radiant Surya center */}
      <circle cx="400" cy="400" r="96" stroke={`url(#${goldId})`} strokeWidth="1.4" strokeOpacity="0.82" />
      <circle cx="400" cy="400" r="64" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeOpacity="0.75" />
      {Array.from({ length: 24 }).map((_, i) => {
        const deg = i * 15;
        return (
          <line
            key={`ray-${i}`}
            x1="400"
            y1={i % 2 === 0 ? '310' : '324'}
            x2="400"
            y2="342"
            stroke={`url(#${goldId})`}
            strokeWidth={i % 2 === 0 ? '1.5' : '0.9'}
            strokeOpacity="0.85"
            transform={`rotate(${deg} 400 400)`}
          />
        );
      })}
      <circle cx="400" cy="400" r="36" fill="#351016" stroke={`url(#${goldId})`} strokeWidth="2" />
      <circle cx="400" cy="400" r="15" fill={`url(#${goldId})`} />
      <circle cx="400" cy="400" r="5.5" fill="#351016" />
    </svg>
  );
}
