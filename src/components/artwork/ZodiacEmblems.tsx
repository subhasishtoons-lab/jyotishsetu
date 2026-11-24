import React from 'react';
import type { ZodiacId } from '../../i18n/types';

interface ZodiacEmblemProps {
  sign: ZodiacId;
  className?: string;
}

export function ZodiacEmblem({ sign, className = 'w-9 h-9' }: ZodiacEmblemProps) {
  const commonProps = {
    viewBox: '0 0 48 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
    className,
  };

  return (
    <svg {...commonProps}>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      {sign === 'mesha' && (
        <path
          d="M24 35 V19 C24 13.5 19.5 11 16 12.5 C12.8 14 12.5 18 15 20 M24 19 C24 13.5 28.5 11 32 12.5 C35.2 14 35.5 18 33 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {sign === 'vrishabha' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 13 C15.5 19 19.5 21 24 21 C28.5 21 32.5 19 34 13" />
          <circle cx="24" cy="29" r="8" />
        </g>
      )}
      {sign === 'mithuna' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 14 C18 16.5 30 16.5 35 14" />
          <path d="M13 34 C18 31.5 30 31.5 35 34" />
          <line x1="19" y1="15.5" x2="19" y2="32.5" />
          <line x1="29" y1="15.5" x2="29" y2="32.5" />
        </g>
      )}
      {sign === 'karka' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17.5" cy="18.5" r="3.5" />
          <path d="M17.5 15 C25 14 31 16.5 34 21.5" />
          <circle cx="30.5" cy="29.5" r="3.5" />
          <path d="M30.5 33 C23 34 17 31.5 14 26.5" />
        </g>
      )}
      {sign === 'simha' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17.5" cy="27.5" r="4.5" />
          <path d="M21.2 25 C22 18 25.5 13 30 14 C33.8 14.8 34.5 19.5 32 23.5 C29.5 27.5 28.5 32 31.5 34 C33.2 35 35 34 35.5 32.5" />
        </g>
      )}
      {sign === 'kanya' && (
        <path
          d="M13 15 V31 M13 20 C13 16 19 15 19 20 V31 M19 20 C19 16 25 15 25 20 V31 M25 20 C25 16 31 15 31 20 C31 25 28 31 23.5 34.5 M27 25 C31.5 24 35 26 33.5 30 C32.5 32.5 29.5 33 27 31.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {sign === 'tula' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="33" x2="36" y2="33" />
          <path d="M12 27 H18.5 C17.5 24.8 18 21.8 19.8 20 C22.1 17.8 25.9 17.8 28.2 20 C30 21.8 30.5 24.8 29.5 27 H36" />
        </g>
      )}
      {sign === 'vrishchika' && (
        <path
          d="M12 16 V30 M12 20 C12 16 18 15 18 20 V30 M18 20 C18 16 24 15 24 20 V30 M24 20 C24 16 30 15 30 20 V29 C30 32.5 33.5 33 36 30.5 M33 29.5 L36.5 30 L35.5 33.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {sign === 'dhanu' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="15" y1="33" x2="33" y2="15" />
          <polyline points="24,15 33,15 33,24" />
          <line x1="18" y1="22" x2="26" y2="30" />
        </g>
      )}
      {sign === 'makara' && (
        <path
          d="M13 17 L18 17 L21 31 L27 17 C30.5 17 33 19.5 32 23.5 C31.2 26.8 28.5 29 29.5 32.5 C30.3 35 34 34.5 35 31.8 C36 29 33.2 27 30.5 28.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {sign === 'kumbha' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="12,21 16,17 20,21 24,17 28,21 32,17 36,21" />
          <polyline points="12,29 16,25 20,29 24,25 28,29 32,25 36,29" />
        </g>
      )}
      {sign === 'meena' && (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 14 C21 19 21 29 16 34" />
          <path d="M32 14 C27 19 27 29 32 34" />
          <line x1="13" y1="24" x2="35" y2="24" />
        </g>
      )}
    </svg>
  );
}
