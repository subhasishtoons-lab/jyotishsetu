import React from 'react';

interface BlogEditorialArtProps {
  artworkId: 'vedic' | 'nakshatra' | 'panchang' | 'festivals';
  className?: string;
}

export function BlogEditorialArt({ artworkId, className = 'w-full h-full' }: BlogEditorialArtProps) {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${artworkId}`} x1="0" y1="0" x2="480" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#351016" />
          <stop offset="55%" stopColor="#48171F" />
          <stop offset="100%" stopColor="#24090E" />
        </linearGradient>
        <radialGradient id={`glow-${artworkId}`} cx="50%" cy="48%" r="48%">
          <stop offset="0%" stopColor="#E99A32" stopOpacity="0.34" />
          <stop offset="65%" stopColor="#D8AD59" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#351016" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="320" fill={`url(#bg-${artworkId})`} />
      <rect width="480" height="320" fill={`url(#glow-${artworkId})`} />
      <rect x="14" y="14" width="452" height="292" stroke="#D8AD59" strokeOpacity="0.28" strokeWidth="1" />

      {artworkId === 'vedic' && (
        <g>
          {/* Classical North Indian Kundli Chart + Palm Leaf Scroll Motifs */}
          <rect x="150" y="70" width="180" height="180" stroke="#D8AD59" strokeWidth="1.5" fill="#2A0C11" fillOpacity="0.55" />
          <line x1="150" y1="70" x2="330" y2="250" stroke="#D8AD59" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="330" y1="70" x2="150" y2="250" stroke="#D8AD59" strokeWidth="1" strokeOpacity="0.7" />
          <polygon points="240,70 330,160 240,250 150,160" stroke="#E99A32" strokeWidth="1.4" fill="none" />
          <circle cx="240" cy="160" r="24" fill="#351016" stroke="#D8AD59" strokeWidth="1.3" />
          <circle cx="240" cy="160" r="8" fill="#E99A32" />
          {/* Decorative planetary orbit rings */}
          <circle cx="240" cy="160" r="126" stroke="#D8AD59" strokeOpacity="0.26" strokeDasharray="3 5" />
          <circle cx="96" cy="160" r="4" fill="#D8AD59" />
          <circle cx="384" cy="160" r="4" fill="#D8AD59" />
          <line x1="56" y1="160" x2="132" y2="160" stroke="#D8AD59" strokeOpacity="0.35" />
          <line x1="348" y1="160" x2="424" y2="160" stroke="#D8AD59" strokeOpacity="0.35" />
        </g>
      )}

      {artworkId === 'nakshatra' && (
        <g>
          {/* Crescent Moon + 27 Nakshatra constellation geometry */}
          <circle cx="240" cy="160" r="118" stroke="#D8AD59" strokeOpacity="0.3" strokeDasharray="2 6" />
          <circle cx="240" cy="160" r="82" stroke="#D8AD59" strokeOpacity="0.25" />
          {/* Crescent Moon */}
          <path
            d="M254 114 C228 118 212 141 216 168 C220 193 243 210 268 206 C246 218 216 212 200 190 C184 167 189 135 212 119 C225 110 241 109 254 114 Z"
            fill="#F5DC9B"
            fillOpacity="0.92"
          />
          {/* Constellation Lines & Stars */}
          <polyline
            points="92,102 144,132 174,88 242,74 316,96 364,138 392,98"
            stroke="#D8AD59"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <polyline
            points="108,228 168,248 240,262 322,238 378,208"
            stroke="#E99A32"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          {[
            [92, 102, 3],
            [144, 132, 3.5],
            [174, 88, 2.5],
            [242, 74, 4],
            [316, 96, 3],
            [364, 138, 3.5],
            [392, 98, 2.5],
            [108, 228, 3],
            [168, 248, 2.5],
            [240, 262, 3.5],
            [322, 238, 3],
            [378, 208, 3],
            [284, 152, 4.5],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 === 0 ? '#F8F0E3' : '#E99A32'} />
          ))}
        </g>
      )}

      {artworkId === 'panchang' && (
        <g>
          {/* Rising Surya over Horizon & Five Panchang Limbs */}
          <line x1="60" y1="214" x2="420" y2="214" stroke="#D8AD59" strokeWidth="1.2" strokeOpacity="0.65" />
          <path d="M148 214 A92 92 0 0 1 332 214" stroke="#D8AD59" strokeWidth="1.3" strokeOpacity="0.6" />
          <path d="M184 214 A56 56 0 0 1 296 214" fill="#E99A32" fillOpacity="0.22" stroke="#E99A32" strokeWidth="1.4" />
          {Array.from({ length: 9 }).map((_, i) => {
            const angle = -80 + i * 20;
            return (
              <line
                key={i}
                x1="240"
                y1="146"
                x2="240"
                y2="100"
                stroke="#F5DC9B"
                strokeWidth={i % 2 === 0 ? '1.4' : '0.9'}
                strokeOpacity="0.72"
                transform={`rotate(${angle} 240 214)`}
              />
            );
          })}
          {/* 5 Panchang Limb Medallions along base */}
          {[112, 176, 240, 304, 368].map((x, idx) => (
            <g key={idx}>
              <polygon points={`${x},236 ${x + 9},245 ${x},254 ${x - 9},245`} stroke="#D8AD59" strokeWidth="1.1" fill="#351016" />
              <circle cx={x} cy="245" r="2.5" fill="#E99A32" />
            </g>
          ))}
        </g>
      )}

      {artworkId === 'festivals' && (
        <g>
          {/* Sacred Diya Lamp & Lotus Archway */}
          <path
            d="M110 270 V140 C110 85 180 62 240 48 C300 62 370 85 370 140 V270"
            stroke="#D8AD59"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
          <circle cx="240" cy="144" r="52" fill="#E99A32" fillOpacity="0.16" />
          {/* Diya Flame */}
          <path
            d="M240 94 C258 122 260 146 240 162 C220 146 222 122 240 94 Z"
            fill="#E99A32"
            stroke="#F5DC9B"
            strokeWidth="1.2"
          />
          <path d="M240 116 C248 130 248 144 240 153 C232 144 232 130 240 116 Z" fill="#F8F0E3" />
          {/* Traditional Brass Diya Bowl */}
          <path
            d="M168 178 C184 218 296 218 312 178 C280 188 200 188 168 178 Z"
            fill="#D8AD59"
            fillOpacity="0.88"
            stroke="#F5DC9B"
            strokeWidth="1.2"
          />
          <ellipse cx="240" cy="222" rx="44" ry="7" stroke="#D8AD59" strokeOpacity="0.5" strokeWidth="1" />
          {/* Side Festival Stars */}
          <circle cx="144" cy="128" r="3" fill="#F5DC9B" />
          <circle cx="336" cy="128" r="3" fill="#F5DC9B" />
          <circle cx="156" cy="156" r="2" fill="#E99A32" />
          <circle cx="324" cy="156" r="2" fill="#E99A32" />
        </g>
      )}
    </svg>
  );
}
