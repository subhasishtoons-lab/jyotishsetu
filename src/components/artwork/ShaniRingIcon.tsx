import React from 'react';

export function ShaniRingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.6"
        transform="rotate(-24 12 12)"
      />
      <circle cx="19" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
