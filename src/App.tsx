import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HoroscopePage } from './pages/HoroscopePage';
import { PanchangPage } from './pages/PanchangPage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { BlogPage } from './pages/BlogPage';
import {
  FreeKundliPage,
  KundliMatchingPage,
  NumerologyPage,
  SadeSatiPage,
  MangalDoshaPage,
  NakshatraFinderPage,
  MuhuratFinderPage,
} from './pages/FeaturePages';
import { AboutPage, ContactPage, LegalPolicyPage } from './pages/InfoPages';

function AppShell() {
  const { route } = useRouter();

  const renderPage = () => {
    switch (route.kind) {
      case 'home':
        return <HomePage />;
      case 'kundli':
        return <FreeKundliPage />;
      case 'horoscope':
        return <HoroscopePage selectedSignId={route.sign} />;
      case 'panchang':
        return <PanchangPage />;
      case 'matching':
        return <KundliMatchingPage />;
      case 'numerology':
        return <NumerologyPage />;
      case 'tools':
        if (route.toolSlug === 'sade-sati') return <SadeSatiPage />;
        if (route.toolSlug === 'mangal-dosha') return <MangalDoshaPage />;
        if (route.toolSlug === 'nakshatra-finder') return <NakshatraFinderPage />;
        if (route.toolSlug === 'muhurat') return <MuhuratFinderPage />;
        return <ToolsDirectoryPage />;
      case 'blog':
        return <BlogPage articleSlug={route.slug} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <LegalPolicyPage kind="privacy" />;
      case 'terms':
        return <LegalPolicyPage kind="terms" />;
      case 'disclaimer':
        return <LegalPolicyPage kind="disclaimer" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F0E3] text-[#2E140F]">
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppShell />
      </RouterProvider>
    </LanguageProvider>
  );
}
