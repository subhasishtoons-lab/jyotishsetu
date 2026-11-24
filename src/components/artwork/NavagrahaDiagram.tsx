import React, { useId } from 'react';

interface NavagrahaDiagramProps {
  className?: string;
}

const GRAHA_NODES = [
  { angle: -90, radius: 146, size: 8, label: 'Chandra', accent: '#F8F0E3' },
  { angle: -45, radius: 146, size: 7, label: 'Mangala', accent: '#E99A32' },
  { angle: 0, radius: 146, size: 6.5, label: 'Budha', accent: '#D8AD59' },
  { angle: 45, radius: 146, size: 9, label: 'Guru', accent: '#F2C56D' },
  { angle: 90, radius: 146, size: 7.5, label: 'Shukra', accent: '#F8F0E3' },
  { angle: 135, radius: 146, size: 8, label: 'Shani', accent: '#C6994B' },
  { angle: 180, radius: 146, size: 6.5, label: 'Rahu', accent: '#D8AD59' },
  { angle: 225, radius: 146, size: 6.5, label: 'Ketu', accent: '#E99A32' },
];

export function NavagrahaDiagram({ className = '' }: NavagrahaDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const centerId = `navaCenter-${uid}`;
  const goldId = `navaGold-${uid}`;

  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Navagraha sacred Vedic planetary mandala diagram"
      className={className}
    >
      <defs>
        <radialGradient id={centerId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E99A32" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#D8AD59" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#351016" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={goldId} x1="30" y1="30" x2="390" y2="390" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5DC9B" />
          <stop offset="50%" stopColor="#D8AD59" />
          <stop offset="100%" stopColor="#E99A32" />
        </linearGradient>
      </defs>

      {/* Deep maroon medallion base */}
      <rect x="0" y="0" width="420" height="420" rx="16" fill="#2B0C11" />
      <rect x="12" y="12" width="396" height="396" rx="10" stroke="#D8AD59" strokeOpacity="0.35" strokeWidth="1" />
      <rect x="20" y="20" width="380" height="380" rx="6" stroke="#D8AD59" strokeOpacity="0.18" strokeWidth="0.75" />

      <circle cx="210" cy="210" r="185" fill={`url(#${centerId})`} />

      {/* Traditional North Indian Kundli Chart Diamond Background */}
      <g opacity="0.28">
        <rect x="64" y="64" width="292" height="292" stroke="#D8AD59" strokeWidth="0.9" />
        <line x1="64" y1="64" x2="356" y2="356" stroke="#D8AD59" strokeWidth="0.75" />
        <line x1="356" y1="64" x2="64" y2="356" stroke="#D8AD59" strokeWidth="0.75" />
        <polygon points="210,64 356,210 210,356 64,210" stroke="#D8AD59" strokeWidth="0.9" fill="none" />
      </g>

      {/* Concentric planetary orbital tracks */}
      <circle cx="210" cy="210" r="168" stroke={`url(#${goldId})`} strokeOpacity="0.35" strokeWidth="0.9" strokeDasharray="3 5" />
      <circle cx="210" cy="210" r="146" stroke={`url(#${goldId})`} strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="210" cy="210" r="106" stroke={`url(#${goldId})`} strokeOpacity="0.32" strokeWidth="0.9" />
      <circle cx="210" cy="210" r="62" stroke={`url(#${goldId})`} strokeOpacity="0.55" strokeWidth="1.1" />

      {/* 8 Directional spokes + Graha celestial spheres around Surya */}
      {GRAHA_NODES.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const cx = 210 + node.radius * Math.cos(rad);
        const cy = 210 + node.radius * Math.sin(rad);
        return (
          <g key={node.label}>
            <line
              x1="210"
              y1="210"
              x2={cx}
              y2={cy}
              stroke="#D8AD59"
              strokeOpacity="0.24"
              strokeWidth="0.8"
            />
            <circle cx={cx} cy={cy} r={node.size + 6} fill="#351016" stroke="#D8AD59" strokeOpacity="0.5" strokeWidth="0.9" />
            <circle cx={cx} cy={cy} r={node.size} fill={node.accent} />
          </g>
        );
      })}

      {/* Central Surya (Sun) emblem */}
      {Array.from({ length: 16 }).map((_, i) => {
        const deg = i * 22.5;
        return (
          <path
            key={deg}
            d="M210 156 L213 176 L207 176 Z"
            fill={`url(#${goldId})`}
            fillOpacity={i % 2 === 0 ? '0.9' : '0.5'}
            transform={`rotate(${deg} 210 210)`}
          />
        );
      })}
      <circle cx="210" cy="210" r="32" fill="#351016" stroke={`url(#${goldId})`} strokeWidth="1.8" />
      <circle cx="210" cy="210" r="18" fill={`url(#${goldId})`} />
      <circle cx="210" cy="210" r="6" fill="#351016" />

      {/* Corner sacred lotus diamonds */}
      {[
        [36, 36],
        [384, 36],
        [36, 384],
        [384, 384],
      ].map(([x, y], idx) => (
        <g key={idx} transform={`translate(${x}, ${y})`}>
          <polygon points="0,-7 7,0 0,7 -7,0" stroke="#D8AD59" strokeWidth="1" fill="#351016" />
          <circle cx="0" cy="0" r="2" fill="#E99A32" />
        </g>
      ))}
    </svg>
  );
}
