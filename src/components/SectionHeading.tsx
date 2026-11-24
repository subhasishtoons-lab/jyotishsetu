import React from 'react';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  as = 'h2',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  const alignClasses = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  const HeadingTag = as;

  return (
    <div className={`flex flex-col max-w-2xl ${alignClasses}`}>
      <div className={`flex items-center gap-3 text-xs font-medium tracking-[0.14em] ${isDark ? 'text-[#EBD08D]' : 'text-[#8C5320]'}`}>
        <span className={`h-px w-6 ${isDark ? 'bg-[#D8AD59]/60' : 'bg-[#D8AD59]'}`} aria-hidden="true" />
        <span>{kicker}</span>
        <span className={`h-px w-6 ${isDark ? 'bg-[#D8AD59]/60' : 'bg-[#D8AD59]'}`} aria-hidden="true" />
      </div>

      <HeadingTag
        className={`mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.2] [text-wrap:balance] ${
          isDark ? 'text-[#F8F0E3]' : 'text-[#351016]'
        }`}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p
          className={`mt-3.5 text-[15px] sm:text-base leading-relaxed ${
            isDark ? 'text-[#F8F0E3]/80' : 'text-[#542D24]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
