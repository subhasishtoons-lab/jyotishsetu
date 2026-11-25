import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  Sun,
  Calendar,
  HeartHandshake,
  Hash,
  Orbit,
  Flame,
  Sparkles,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ToolId } from '../i18n/types';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../components/Link';

const TOOL_ICON_MAP: Record<ToolId, React.ComponentType<{ className?: string }>> = {
  'free-kundli': Compass,
  'daily-horoscope': Sun,
  'hindu-panchang': Calendar,
  'kundli-matching': HeartHandshake,
  numerology: Hash,
  'sade-sati': Orbit,
  'mangal-dosha': Flame,
  'nakshatra-finder': Sparkles,
  'muhurat-finder': Clock,
};

function ShaniRingIcon({ className }: { className?: string }) {
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

type ToolFilter = 'all' | 'core' | 'dosha';

export function ToolsDirectoryPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ToolFilter>('all');

  const filteredTools =
    filter === 'all'
      ? t.quickTools.items
      : t.quickTools.items.filter((item) => item.category === filter);

  const showShaniDhaiyaCard = filter === 'all' || filter === 'dosha';
  const dhaiyaCard = t.toolsPage.shaniDhaiyaCard;

  const renderShaniDhaiyaCard = () => (
    <article
      key="shani-dhaiya"
      className="group relative flex flex-col justify-between p-6 rounded-lg bg-gradient-to-b from-[#FCF7EE] to-[#F3E9D8] border border-[#2C2F4C]/30 border-t-2 border-t-[#2C2F4C] hover:border-[#B08532] hover:border-t-[#B08532] hover:-translate-y-0.5 transition-all duration-150"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#1C1F38] via-[#2B1830] to-[#351016] text-[#EBD08D] border border-[#D8AD59]/50 flex items-center justify-center shrink-0">
            <ShaniRingIcon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border bg-[#2C2F4C]/10 border-[#2C2F4C]/30 text-[#252847]">
            {t.quickTools.statusPreview}
          </span>
        </div>

        <p className="mt-4 text-xs font-semibold tracking-wide text-[#2C2F4C]">
          {dhaiyaCard.kicker}
        </p>
        <h2 className="mt-1 font-display text-lg font-semibold text-[#351016] group-hover:text-[#7C3A12] transition-colors">
          {dhaiyaCard.title}
        </h2>
        <p className="mt-1.5 text-sm font-medium text-[#3B2621] leading-snug">
          {dhaiyaCard.subtitle}
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#542D24] leading-relaxed">
          {dhaiyaCard.description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#D8AD59]/30">
        <Link
          to="/tools/sade-sati"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/50 hover:bg-[#4A1820] text-xs font-semibold tracking-wide transition-colors"
        >
          <span>{dhaiyaCard.openButton}</span>
          <ArrowRight
            className="w-3.5 h-3.5 text-[#EBD08D] transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={t.toolsPage.kicker}
            title={t.toolsPage.title}
            subtitle={t.toolsPage.subtitle}
            align="left"
            theme="dark"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Interactive Segmented Filter Controls */}
        <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EFE3CE] border border-[#D8AD59]/40">
          {(
            [
              { id: 'all', label: t.toolsPage.filterAll },
              { id: 'core', label: t.toolsPage.filterCore },
              { id: 'dosha', label: t.toolsPage.filterDosha },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#351016] text-[#F8F0E3]'
                    : 'text-[#542D24] hover:text-[#351016]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const Icon = TOOL_ICON_MAP[tool.id];
            const isAvailable = tool.status === 'live' || tool.status === 'preview';
            return (
              <React.Fragment key={tool.id}>
                <Link
                  to={tool.route}
                  className="group flex flex-col justify-between p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#351016] text-[#EBD08D] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span
                        className={`text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border ${
                          isAvailable
                            ? 'bg-[#2B5A3C]/10 border-[#2B5A3C]/35 text-[#2B5A3C]'
                            : 'bg-[#351016]/6 border-[#542D24]/25 text-[#542D24]'
                        }`}
                      >
                        {isAvailable ? t.quickTools.statusPreview : t.quickTools.statusComingSoon}
                      </span>
                    </div>

                    <p className="mt-4 text-xs text-[#8C5320] font-medium">{tool.subtitle}</p>
                    <h2 className="mt-1 font-display text-lg font-semibold text-[#351016] group-hover:text-[#7C3A12] transition-colors">
                      {tool.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#542D24] leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#D8AD59]/20 flex items-center justify-between text-xs font-semibold text-[#351016]">
                    <span>
                      {isAvailable ? t.quickTools.openTool : t.quickTools.openComingSoon}
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[#C47616] transition-transform duration-150 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
                {showShaniDhaiyaCard && tool.id === 'sade-sati' && renderShaniDhaiyaCard()}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
}
