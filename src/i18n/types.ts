export type Language = 'en' | 'hi' | 'as';

export type ZodiacId =
  | 'mesha'
  | 'vrishabha'
  | 'mithuna'
  | 'karka'
  | 'simha'
  | 'kanya'
  | 'tula'
  | 'vrishchika'
  | 'dhanu'
  | 'makara'
  | 'kumbha'
  | 'meena';

export type ToolId =
  | 'free-kundli'
  | 'daily-horoscope'
  | 'hindu-panchang'
  | 'kundli-matching'
  | 'numerology'
  | 'sade-sati'
  | 'mangal-dosha'
  | 'nakshatra-finder';

export type BlogCategoryId = 'vedic' | 'nakshatra' | 'panchang' | 'festivals';

export interface ToolItem {
  id: ToolId;
  title: string;
  subtitle: string;
  description: string;
  category: 'core' | 'dosha';
  status: 'preview' | 'coming_soon';
  route: string;
}

export interface ZodiacSignData {
  id: ZodiacId;
  name: string;
  vedicName: string;
  dates: string;
  element: string;
  rulingPlanet: string;
  shortForecast: string;
  generalReading: string;
  careerReading: string;
  relationshipReading: string;
  luckyColor: string;
  luckyNumber: string;
  auspiciousTime: string;
}

export interface PanchangData {
  demoNoticeTitle: string;
  demoNoticeBody: string;
  locationLabel: string;
  locationValue: string;
  samvatLabel: string;
  samvatValue: string;
  fields: {
    date: { label: string; value: string; sub: string };
    tithi: { label: string; value: string; sub: string };
    nakshatra: { label: string; value: string; sub: string };
    yoga: { label: string; value: string; sub: string };
    karana: { label: string; value: string; sub: string };
    sunrise: { label: string; value: string; sub: string };
    sunset: { label: string; value: string; sub: string };
    rahuKaal: { label: string; value: string; sub: string };
  };
  extraTimingsTitle: string;
  extraTimings: Array<{
    name: string;
    time: string;
    nature: 'auspicious' | 'caution';
    note: string;
  }>;
}

export interface BlogArticle {
  slug: string;
  category: BlogCategoryId;
  categoryLabel: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  artworkId: 'vedic' | 'nakshatra' | 'panchang' | 'festivals';
  paragraphs: string[];
  keyTakeaways: string[];
}

export interface ComingSoonFeatureSpec {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  phaseNote: string;
  highlightsTitle: string;
  highlights: Array<{ title: string; detail: string }>;
  methodologyTitle: string;
  methodologyBody: string;
}

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    shortDescription: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    kundliTitle: string;
    horoscopeTitle: string;
    panchangTitle: string;
    matchingTitle: string;
    numerologyTitle: string;
    toolsTitle: string;
    blogTitle: string;
    aboutTitle: string;
    contactTitle: string;
    privacyTitle: string;
    termsTitle: string;
    disclaimerTitle: string;
  };
  nav: {
    home: string;
    freeKundli: string;
    horoscope: string;
    panchang: string;
    kundliMatching: string;
    numerology: string;
    astrologyTools: string;
    blog: string;
    ctaGenerateKundli: string;
    languageLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    traditionMarkers: [string, string, string];
  };
  quickTools: {
    kicker: string;
    title: string;
    subtitle: string;
    viewAllCta: string;
    statusPreview: string;
    statusComingSoon: string;
    openTool: string;
    items: ToolItem[];
  };
  panchang: {
    kicker: string;
    title: string;
    subtitle: string;
    fullPanchangCta: string;
    auspiciousLabel: string;
    cautionLabel: string;
    phase2NoteTitle: string;
    phase2NoteBody: string;
    data: PanchangData;
  };
  horoscope: {
    kicker: string;
    title: string;
    subtitle: string;
    viewFullCta: string;
    readSignCta: string;
    demoBanner: string;
    selectSignPrompt: string;
    elementLabel: string;
    rulingPlanetLabel: string;
    generalTitle: string;
    careerTitle: string;
    relationshipTitle: string;
    luckyColorLabel: string;
    luckyNumberLabel: string;
    auspiciousTimeLabel: string;
    signs: ZodiacSignData[];
  };
  whyChoose: {
    kicker: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  premium: {
    kicker: string;
    statusLabel: string;
    title: string;
    subtitle: string;
    noPaymentNote: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    notifyTitle: string;
    notifyPlaceholder: string;
    notifyButton: string;
    notifySuccess: string;
    exploreToolsLink: string;
  };
  blog: {
    kicker: string;
    title: string;
    subtitle: string;
    readArticleCta: string;
    viewAllArticlesCta: string;
    backToBlog: string;
    keyTakeawaysTitle: string;
    categories: {
      all: string;
      vedic: string;
      nakshatra: string;
      panchang: string;
      festivals: string;
    };
    articles: BlogArticle[];
  };
  toolsPage: {
    kicker: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterCore: string;
    filterDosha: string;
  };
  comingSoonCommon: {
    phaseLabel: string;
    launchNotice: string;
    notifyHeading: string;
    notifyDescription: string;
    emailPlaceholder: string;
    notifyBtn: string;
    notifyDone: string;
    availableNowTitle: string;
    goToPanchang: string;
    goToHoroscope: string;
    goToBlog: string;
    backHome: string;
  };
  comingSoonPages: {
    kundli: ComingSoonFeatureSpec;
    matching: ComingSoonFeatureSpec;
    numerology: ComingSoonFeatureSpec;
    sadeSati: ComingSoonFeatureSpec;
    mangalDosha: ComingSoonFeatureSpec;
    nakshatraFinder: ComingSoonFeatureSpec;
  };
  infoPages: {
    about: {
      kicker: string;
      title: string;
      lead: string;
      paragraphs: string[];
      pillarsTitle: string;
      pillars: Array<{ title: string; body: string }>;
    };
    contact: {
      kicker: string;
      title: string;
      lead: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      successTitle: string;
      successBody: string;
      sendAnotherBtn: string;
      officeTitle: string;
      officeBody: string;
      emailSupportLabel: string;
      hoursLabel: string;
      hoursValue: string;
    };
    privacy: {
      kicker: string;
      title: string;
      updated: string;
      sections: Array<{ heading: string; body: string }>;
    };
    terms: {
      kicker: string;
      title: string;
      updated: string;
      sections: Array<{ heading: string; body: string }>;
    };
    disclaimer: {
      kicker: string;
      title: string;
      updated: string;
      sections: Array<{ heading: string; body: string }>;
    };
  };
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    messageRequired: string;
  };
  footer: {
    exploreHeading: string;
    toolsHeading: string;
    companyHeading: string;
    connectHeading: string;
    aboutUs: string;
    contactUs: string;
    privacyPolicy: string;
    termsAndConditions: string;
    disclaimer: string;
    socialLabels: {
      instagram: string;
      youtube: string;
      x: string;
      facebook: string;
    };
    copyright: string;
    phaseNotice: string;
  };
}
