import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ComingSoonPage } from './ComingSoonPage';

export function FreeKundliPage() {
  const { t } = useLanguage();
  return <ComingSoonPage spec={t.comingSoonPages.kundli} />;
}

export function KundliMatchingPage() {
  const { t } = useLanguage();
  return <ComingSoonPage spec={t.comingSoonPages.matching} />;
}

export function NumerologyPage() {
  const { t } = useLanguage();
  return <ComingSoonPage spec={t.comingSoonPages.numerology} />;
}

export function SadeSatiPage() {
  const { t } = useLanguage();
  return <ComingSoonPage spec={t.comingSoonPages.sadeSati} />;
}

export function MangalDoshaPage() {
  const { t } = useLanguage();
  return <ComingSoonPage spec={t.comingSoonPages.mangalDosha} />;
}

export function NakshatraFinderPage() {
  const { t } = useLanguage();
  return <ComingSoonPage spec={t.comingSoonPages.nakshatraFinder} />;
}
