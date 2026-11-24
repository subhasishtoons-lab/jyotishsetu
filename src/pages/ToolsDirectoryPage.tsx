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
};

type ToolFilter = 'all' | 'core' | 'dosha';

export function ToolsDirectoryPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ToolFilter>('all');

  const filteredTools =
    filter === 'all'
      ? t.quickTools.items
      : t.quickTools.items.filter((item) => item.category === filter);

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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredTools.map((tool) => {
            const Icon = TOOL_ICON_MAP[tool.id];
            const isPreview = tool.status === 'preview';
            return (
              <Link
                key={tool.id}
                to={tool.route}
                className="group flex flex-col justify-between p-6 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] hover:-translate-y-0.5 transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#351016] text-[#EBD08D] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span
                      className={`text-[11px] font-medium ${
                        isPreview ? 'text-[#7C4710]' : 'text-[#542D24]/70'
                      }`}
                    >
                      {isPreview ? t.quickTools.statusPreview : t.quickTools.statusComingSoon}
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-[#8C5320] font-medium">{tool.subtitle}</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-[#351016] group-hover:text-[#7C3A12] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#542D24] leading-relaxed">{tool.description}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D8AD59]/20 flex items-center justify-between text-xs font-semibold text-[#351016]">
                  <span>{t.quickTools.openTool}</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[#C47616] transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
