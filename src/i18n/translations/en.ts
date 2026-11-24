import type { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  brand: {
    name: 'JyotishSetu',
    tagline: 'Ancient Vedic Wisdom. Personalized Astrological Insights.',
    shortDescription:
      'A classical Indian Vedic astrology house bridging timeless Jyotish Shastra traditions with clear, accessible guidance in English, Hindi, and Assamese.',
  },
  seo: {
    homeTitle: 'JyotishSetu – Ancient Vedic Wisdom & Personalized Astrology',
    homeDescription:
      'Explore the ancient wisdom of Vedic astrology through personalized Kundli, daily horoscope, Hindu Panchang, Kundli matching, and cosmic guidance.',
    kundliTitle: 'Free Kundli (Janam Patrika) – Coming Soon | JyotishSetu',
    horoscopeTitle: 'Daily Horoscope (12 Rashis) | JyotishSetu',
    panchangTitle: "Today's Hindu Panchang – Tithi, Nakshatra & Rahu Kaal | JyotishSetu",
    matchingTitle: 'Kundli Matching (Ashtakoota Milan) – Coming Soon | JyotishSetu',
    numerologyTitle: 'Vedic Numerology (Ank Jyotish) – Coming Soon | JyotishSetu',
    toolsTitle: 'Vedic Astrology Tools Directory | JyotishSetu',
    blogTitle: 'Jyotish Journal – Vedic Astrology, Nakshatras & Festivals | JyotishSetu',
    aboutTitle: 'About JyotishSetu – Our Vedic Heritage & Vision',
    contactTitle: 'Contact JyotishSetu – Reach Our Editorial Desk',
    privacyTitle: 'Privacy Policy | JyotishSetu',
    termsTitle: 'Terms and Conditions | JyotishSetu',
    disclaimerTitle: 'Astrological Disclaimer | JyotishSetu',
  },
  nav: {
    home: 'Home',
    freeKundli: 'Free Kundli',
    horoscope: 'Horoscope',
    panchang: 'Panchang',
    kundliMatching: 'Kundli Matching',
    numerology: 'Numerology',
    astrologyTools: 'Astrology Tools',
    blog: 'Blog',
    ctaGenerateKundli: 'Generate Free Kundli',
    languageLabel: 'Select language',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  hero: {
    kicker: 'Ancient Vedic Wisdom · Personalized Astrological Insights',
    headline: 'Discover Your Cosmic Path',
    description:
      'Explore the ancient wisdom of Vedic astrology through personalized Kundli, horoscope, Panchang and cosmic guidance.',
    primaryCta: 'Generate Free Kundli',
    secondaryCta: 'Explore Astrology',
    traditionMarkers: [
      'Parashari Sidereal Tradition',
      'English · हिन्दी · অসমীয়া',
      'Navagraha & 27 Nakshatras',
    ],
  },
  quickTools: {
    kicker: 'Sacred Vedic Instruments',
    title: 'Quick Astrology Tools',
    subtitle:
      'Thoughtfully structured Vedic utilities designed to bring clarity to your birth chart, daily planetary rhythm, and auspicious timings.',
    viewAllCta: 'View All Tools',
    statusPreview: 'Sample Preview · Not Live',
    statusComingSoon: 'Coming Soon',
    openTool: 'View Sample',
    openComingSoon: 'Coming Soon Details',
    items: [
      {
        id: 'free-kundli',
        title: 'Free Kundli',
        subtitle: 'Janam Patrika',
        description:
          'Complete Vedic birth chart with Lagna, Navamsha, planetary degrees, and Vimshottari Dasha overview.',
        category: 'core',
        status: 'coming_soon',
        route: '/kundli',
      },
      {
        id: 'daily-horoscope',
        title: 'Daily Horoscope',
        subtitle: 'Dainik Rashifal',
        description:
          'Day-by-day lunar transit guidance across all twelve Vedic zodiac signs for career, harmony, and dharma.',
        category: 'core',
        status: 'preview',
        route: '/horoscope',
      },
      {
        id: 'hindu-panchang',
        title: 'Hindu Panchang',
        subtitle: 'Daily Almanac',
        description:
          'Five-limbed Vedic calendar detailing Tithi, Vara, Nakshatra, Yoga, Karana, sunrise, sunset, and Rahu Kaal.',
        category: 'core',
        status: 'preview',
        route: '/panchang',
      },
      {
        id: 'kundli-matching',
        title: 'Kundli Matching',
        subtitle: 'Ashtakoota Milan',
        description:
          'Traditional 36-Guna marriage compatibility assessment evaluating mental harmony, longevity, and Nadi balance.',
        category: 'core',
        status: 'coming_soon',
        route: '/matching',
      },
      {
        id: 'numerology',
        title: 'Numerology',
        subtitle: 'Ank Jyotish',
        description:
          'Discover Mulank, Bhagyank, and planetary number vibrations rooted in classical Indian numerology.',
        category: 'core',
        status: 'coming_soon',
        route: '/numerology',
      },
      {
        id: 'sade-sati',
        title: 'Sade Sati Calculator',
        subtitle: 'Shani Transit',
        description:
          'Examine Saturn’s seven-and-a-half-year transit phases relative to your natal Moon sign and remedies.',
        category: 'dosha',
        status: 'coming_soon',
        route: '/tools/sade-sati',
      },
      {
        id: 'mangal-dosha',
        title: 'Mangal Dosha',
        subtitle: 'Kuja Analysis',
        description:
          'Evaluate Mars placements across Lagna, Moon, and Venus charts with classical cancellation rules.',
        category: 'dosha',
        status: 'coming_soon',
        route: '/tools/mangal-dosha',
      },
      {
        id: 'nakshatra-finder',
        title: 'Nakshatra Finder',
        subtitle: 'Janma Tara',
        description:
          'Identify your birth lunar mansion, Pada, ruling deity, and auspicious syllable for naming ceremonies.',
        category: 'dosha',
        status: 'coming_soon',
        route: '/tools/nakshatra-finder',
      },
    ],
  },
  panchang: {
    kicker: 'Vedic Timekeeping · Sample Preview (Not Live)',
    title: "Today's Panchang",
    subtitle:
      'Preview the classical five-limbed Vedic calendar layout covering Tithi, Nakshatra, Yoga, Karana, and solar intervals.',
    fullPanchangCta: 'Open Full Panchang',
    auspiciousLabel: 'Auspicious Window (Sample)',
    cautionLabel: 'Caution Period (Sample)',
    phase2NoteTitle: 'Phase 2 Live Calculation Roadmap',
    phase2NoteBody:
      'In Phase 2, JyotishSetu will integrate real-time Lahiri Ayanamsha ephemeris calculations customized for your selected city, latitude, longitude, and timezone across India and worldwide.',
    citySelectorLabel: 'Reference City (Prepared for Phase 2)',
    citySelectorHelper:
      'Your selected city is saved locally to prepare for location-specific calculations in Phase 2. The Panchang values shown below remain static sample data and do not yet recalculate by city.',
    coordinatesLabel: 'Coordinates',
    sampleTag: 'Sample Data',
    data: {
      demoNoticeTitle: 'Sample Data Only — Live Calculations Coming Soon',
      demoNoticeBody:
        'Illustrative sample Panchang values are shown below to demonstrate our Phase 1 layout. These are not live astronomical calculations—real city-specific ephemeris calculations arrive in Phase 2.',
      locationLabel: 'Selected City',
      locationValue: 'Varanasi, Uttar Pradesh (IST · Sample Reference)',
      samvatLabel: 'Vikram Samvat',
      samvatValue: '2083 · Sample Calendar Preview',
      fields: {
        date: {
          label: 'Date',
          value: 'Tuesday, 24 November 2026',
          sub: 'Mangalavara · Current Calendar Date',
        },
        tithi: {
          label: 'Tithi',
          value: 'Shukla Purnima',
          sub: 'Sample entry · Not live calculation',
        },
        nakshatra: {
          label: 'Nakshatra',
          value: 'Rohini',
          sub: 'Sample entry · Ruled by Chandra',
        },
        yoga: {
          label: 'Yoga',
          value: 'Shiva Yoga',
          sub: 'Sample entry · Phase 2 live engine',
        },
        karana: {
          label: 'Karana',
          value: 'Bava Karana',
          sub: 'Sample entry · Phase 2 live engine',
        },
        sunrise: {
          label: 'Sunrise',
          value: '06:35 AM',
          sub: 'Sample time (IST) · Not city-adjusted',
        },
        sunset: {
          label: 'Sunset',
          value: '05:18 PM',
          sub: 'Sample time (IST) · Not city-adjusted',
        },
        rahuKaal: {
          label: 'Rahu Kaal',
          value: '02:37 PM – 03:58 PM',
          sub: 'Sample interval · Avoid new starts',
        },
      },
      extraTimingsTitle: 'Additional Daily Muhurat Windows (Sample Preview — Not Live)',
      extraTimings: [
        {
          name: 'Brahma Muhurat',
          time: '04:59 AM – 05:47 AM',
          nature: 'auspicious',
          note: 'Sample pre-dawn window traditionally noted for meditation, mantra japa, and quiet study.',
        },
        {
          name: 'Abhijit Muhurat',
          time: '11:35 AM – 12:18 PM',
          nature: 'auspicious',
          note: 'Sample midday window traditionally favoured for important initiatives.',
        },
        {
          name: 'Yamaganda Kaal',
          time: '09:16 AM – 10:36 AM',
          nature: 'caution',
          note: 'Sample cautionary period traditionally observed with patience before formal ceremonies.',
        },
      ],
    },
  },
  horoscope: {
    kicker: 'Dwadasha Rashi · Twelve Vedic Signs (Sample Preview)',
    title: 'Daily Horoscope',
    subtitle:
      'Browse our Phase 1 editorial preview across all twelve classical Vedic Rashis. Select any sign to view its sample daily layout.',
    viewFullCta: 'Explore All 12 Signs',
    readSignCta: 'View Sample',
    demoBanner:
      'Sample Editorial Preview — Live Calculations Coming Soon: Readings shown below are illustrative Phase 1 examples, not genuine daily transit calculations.',
    sampleBadge: 'Sample Reading · Not Live Calculation',
    solarDateNote:
      'Note on dates: The date ranges shown below are approximate Vedic sidereal solar sign (Surya Sankranti) periods—not Western tropical zodiac dates. Traditional Vedic horoscopes are primarily read from your natal Moon sign (Chandra Rashi).',
    approxSolarDateLabel: 'Approx. Vedic solar sign',
    selectSignPrompt: 'Select a Rashi (Sample Preview)',
    elementLabel: 'Element',
    rulingPlanetLabel: 'Ruling Graha',
    generalTitle: 'Daily Cosmic Overview',
    careerTitle: 'Work & Dharma',
    relationshipTitle: 'Harmony & Family',
    luckyColorLabel: 'Auspicious Colour',
    luckyNumberLabel: 'Favourable Number',
    auspiciousTimeLabel: 'Best Window',
    signs: [
      {
        id: 'mesha',
        name: 'Aries',
        vedicName: 'Mesha',
        dates: 'Apr 14 – May 14',
        element: 'Fire (Agni)',
        rulingPlanet: 'Mars (Mangala)',
        shortForecast: 'Decisive momentum favours thoughtful initiative and disciplined leadership today.',
        generalReading:
          'With fiery clarity guiding your disposition, today rewards steady action over haste. Pause briefly before committing to long-term agreements, and honour your morning routine to anchor mental poise.',
        careerReading:
          'Collaborative responsibilities move briskly when expectations are stated plainly. Senior mentors notice reliability and calm execution.',
        relationshipReading:
          'Warm listening bridges minor misunderstandings at home. An unhurried evening conversation restores ease and mutual respect.',
        luckyColor: 'Vermilion Saffron',
        luckyNumber: '9',
        auspiciousTime: '10:30 AM – 12:00 PM',
      },
      {
        id: 'vrishabha',
        name: 'Taurus',
        vedicName: 'Vrishabha',
        dates: 'May 15 – Jun 14',
        element: 'Earth (Prithvi)',
        rulingPlanet: 'Venus (Shukra)',
        shortForecast: 'Grounded discernment brings steadiness to finances, craft, and domestic peace.',
        generalReading:
          'A calm, restorative rhythm surrounds your practical affairs. Focus on completing existing obligations with aesthetic care rather than chasing scattered distractions.',
        careerReading:
          'Financial review and methodical planning yield durable clarity. Craftsmanship and patience set your contribution apart.',
        relationshipReading:
          'Shared meals and small acts of hospitality deepen affection with loved ones. Express gratitude openly.',
        luckyColor: 'Warm Ivory',
        luckyNumber: '6',
        auspiciousTime: '02:00 PM – 03:30 PM',
      },
      {
        id: 'mithuna',
        name: 'Gemini',
        vedicName: 'Mithuna',
        dates: 'Jun 15 – Jul 15',
        element: 'Air (Vayu)',
        rulingPlanet: 'Mercury (Budha)',
        shortForecast: 'Clear speech and curiosity open meaningful dialogue and fresh intellectual insight.',
        generalReading:
          'Mental agility runs high today, making it favourable for writing, study, and clarifying pending correspondence. Guard against spreading your attention across too many errands.',
        careerReading:
          'Presentations, negotiations, and analytical notes land with precision. Verify key figures before finalising documents.',
        relationshipReading:
          'Light-hearted conversation lifts spirits among siblings and friends. Offer undivided presence during personal discussions.',
        luckyColor: 'Emerald Leaf',
        luckyNumber: '5',
        auspiciousTime: '09:15 AM – 10:45 AM',
      },
      {
        id: 'karka',
        name: 'Cancer',
        vedicName: 'Karka',
        dates: 'Jul 16 – Aug 16',
        element: 'Water (Jala)',
        rulingPlanet: 'Moon (Chandra)',
        shortForecast: 'Intuitive composure nurtures family bonds and restores inner equilibrium.',
        generalReading:
          'Your sensitivity acts as a compass today. Create quiet space in the morning for reflection so external pressures do not disturb your emotional balance.',
        careerReading:
          'Empathetic leadership strengthens team morale. Handle behind-the-scenes planning thoughtfully before making public announcements.',
        relationshipReading:
          'Domestic warmth takes centre stage. Reconnecting with elders or checking in on a close confidant brings quiet fulfilment.',
        luckyColor: 'Pearl Cream',
        luckyNumber: '2',
        auspiciousTime: '04:15 PM – 05:30 PM',
      },
      {
        id: 'simha',
        name: 'Leo',
        vedicName: 'Simha',
        dates: 'Aug 17 – Sep 16',
        element: 'Fire (Agni)',
        rulingPlanet: 'Sun (Surya)',
        shortForecast: 'Dignified confidence and generosity inspire trust in shared endeavours.',
        generalReading:
          'Solar vitality highlights creative expression and moral clarity. Lead with magnanimity rather than insistence, allowing others room to shine alongside you.',
        careerReading:
          'Strategic visibility increases. Step forward on initiatives requiring vision, while delegating routine details gracefully.',
        relationshipReading:
          'Affection grows through sincere appreciation and playful warmth. Plan a thoughtful gesture for someone close.',
        luckyColor: 'Royal Gold',
        luckyNumber: '1',
        auspiciousTime: '11:30 AM – 01:00 PM',
      },
      {
        id: 'kanya',
        name: 'Virgo',
        vedicName: 'Kanya',
        dates: 'Sep 17 – Oct 16',
        element: 'Earth (Prithvi)',
        rulingPlanet: 'Mercury (Budha)',
        shortForecast: 'Methodical refinement brings order to complex tasks and personal wellbeing.',
        generalReading:
          'Attention to subtle details serves you remarkably well today. Simplify your schedule, nourish your body mindfully, and release unnecessary self-criticism.',
        careerReading:
          'Audits, research, and structured workflows progress seamlessly. Your measured counsel helps resolve a lingering bottleneck.',
        relationshipReading:
          'Practical support speaks louder than grand promises. Balance helpfulness with gentle patience.',
        luckyColor: 'Sandalwood Ochre',
        luckyNumber: '5',
        auspiciousTime: '08:30 AM – 10:00 AM',
      },
      {
        id: 'tula',
        name: 'Libra',
        vedicName: 'Tula',
        dates: 'Oct 17 – Nov 15',
        element: 'Air (Vayu)',
        rulingPlanet: 'Venus (Shukra)',
        shortForecast: 'Measured diplomacy restores harmony in partnerships and creative pursuits.',
        generalReading:
          'Equilibrium returns where recent weeks felt hurried. Trust balanced judgement when weighing two appealing options, and surround yourself with calm beauty.',
        careerReading:
          'Partnerships and client dialogues benefit from your tactful framing. Seek fair, mutually beneficial agreements.',
        relationshipReading:
          'Graceful honesty deepens trust between partners. Sharing art, music, or quiet evening time strengthens connection.',
        luckyColor: 'Soft Lotus',
        luckyNumber: '6',
        auspiciousTime: '03:00 PM – 04:30 PM',
      },
      {
        id: 'vrishchika',
        name: 'Scorpio',
        vedicName: 'Vrishchika',
        dates: 'Nov 16 – Dec 15',
        element: 'Water (Jala)',
        rulingPlanet: 'Mars (Mangala)',
        shortForecast: 'Deep focus uncovers hidden truths and strengthens long-term resilience.',
        generalReading:
          'A contemplative, determined undercurrent helps you see past surface appearances. Channel intensity into constructive research, healing, or disciplined personal growth.',
        careerReading:
          'Complex problem-solving and confidential strategy are strongly favoured. Keep long-range plans discreet until mature.',
        relationshipReading:
          'Loyalty and quiet depth anchor your closest ties. Release unspoken grievances through calm, candid conversation.',
        luckyColor: 'Deep Crimson',
        luckyNumber: '9',
        auspiciousTime: '01:15 PM – 02:45 PM',
      },
      {
        id: 'dhanu',
        name: 'Sagittarius',
        vedicName: 'Dhanu',
        dates: 'Dec 16 – Jan 13',
        element: 'Fire (Agni)',
        rulingPlanet: 'Jupiter (Guru)',
        shortForecast: 'Expansive perspective encourages learning, wise counsel, and optimistic planning.',
        generalReading:
          'Guided by Guru’s philosophical grace, your mind turns toward higher meaning, travel plans, or classical learning. Pair enthusiasm with realistic timelines.',
        careerReading:
          'Teaching, advisory work, and long-horizon strategy flourish. Seeking guidance from a respected teacher clarifies next steps.',
        relationshipReading:
          'Shared ideals and joyful humour bring family closer. Respect differing viewpoints with warmth.',
        luckyColor: 'Turmeric Saffron',
        luckyNumber: '3',
        auspiciousTime: '10:00 AM – 11:30 AM',
      },
      {
        id: 'makara',
        name: 'Capricorn',
        vedicName: 'Makara',
        dates: 'Jan 14 – Feb 12',
        element: 'Earth (Prithvi)',
        rulingPlanet: 'Saturn (Shani)',
        shortForecast: 'Steadfast perseverance consolidates enduring progress and professional respect.',
        generalReading:
          'Patient effort bears quiet fruit today. Honour commitments deliberately, pace your energy wisely, and recognize the foundations you have already built.',
        careerReading:
          'Structured milestones and leadership accountability advance smoothly. Long-term investments of time begin showing stability.',
        relationshipReading:
          'Dependability comforts those who rely on you. Carve out unhurried time away from work duties in the evening.',
        luckyColor: 'Antique Bronze',
        luckyNumber: '8',
        auspiciousTime: '04:00 PM – 05:15 PM',
      },
      {
        id: 'kumbha',
        name: 'Aquarius',
        vedicName: 'Kumbha',
        dates: 'Feb 13 – Mar 13',
        element: 'Air (Vayu)',
        rulingPlanet: 'Saturn (Shani)',
        shortForecast: 'Original insight blends with community purpose to spark constructive ideas.',
        generalReading:
          'Forward-looking thinking meets practical restraint. You are well placed to refine an unconventional concept into something genuinely useful to others.',
        careerReading:
          'Collaborative networks and systems thinking bring welcome breakthroughs. Document emerging ideas systematically.',
        relationshipReading:
          'Meaningful friendships offer fresh perspective. Value authenticity and gentle respect for personal space.',
        luckyColor: 'Indigo Slate',
        luckyNumber: '8',
        auspiciousTime: '12:00 PM – 01:30 PM',
      },
      {
        id: 'meena',
        name: 'Pisces',
        vedicName: 'Meena',
        dates: 'Mar 14 – Apr 13',
        element: 'Water (Jala)',
        rulingPlanet: 'Jupiter (Guru)',
        shortForecast: 'Reflective serenity enriches spiritual practice, artistry, and compassionate service.',
        generalReading:
          'Gentle intuition and creative imagination flow effortlessly today. Balance contemplative solitude with clear boundaries around practical commitments.',
        careerReading:
          'Creative composition, counselling, and thoughtful synthesis excel. Keep a simple written checklist to stay anchored.',
        relationshipReading:
          'Compassion softens older tensions. Quiet empathy and sincerity deepen emotional closeness.',
        luckyColor: 'Saffron Gold',
        luckyNumber: '3',
        auspiciousTime: '06:45 AM – 08:15 AM',
      },
    ],
  },
  whyChoose: {
    kicker: 'The JyotishSetu Standard',
    title: 'Why Choose JyotishSetu',
    subtitle:
      'Built with reverence for classical Indian Jyotish Shastra and designed with modern editorial clarity for seekers across languages.',
    pillars: [
      {
        number: '01',
        title: 'Traditional Vedic Astrology',
        description:
          'Rooted in classical Parashari principles, sidereal Lahiri calculations, Navagraha dignities, and the 27 Nakshatra framework.',
      },
      {
        number: '02',
        title: 'Easy-to-Understand Reports',
        description:
          'Complex planetary yogas, houses, and dasha periods translated into clear, dignified, fear-free everyday guidance.',
      },
      {
        number: '03',
        title: 'Multilingual Experience',
        description:
          'Thoughtfully authored in English, हिन्दी (Hindi), and অসমীয়া (Assamese) with authentic cultural and astrological terminology.',
      },
      {
        number: '04',
        title: 'Free Astrology Tools',
        description:
          'Open access to essential Vedic foundations—Panchang, Daily Horoscope, Kundli, Matching, and Numerology—without cluttered barriers.',
      },
      {
        number: '05',
        title: 'Premium Reports Coming Soon',
        description:
          'In-depth downloadable Kundli folios, multi-year Vimshottari Dasha manuscripts, and personalized consultations are being crafted for upcoming phases.',
      },
    ],
  },
  premium: {
    kicker: 'JyotishSetu Pratishtha · Membership Preview',
    statusLabel: 'Coming Soon · No Payments Yet',
    title: 'Curated Vedic Manuscripts & Deep Insights',
    subtitle:
      'Our upcoming Premium suite will bring heirloom-quality astrological reports and classical analytical depth directly to your reading desk.',
    noPaymentNote:
      'Premium memberships and paid reports are currently in preparation. No billing or payment collection is active in Phase 1.',
    features: [
      {
        title: 'Detailed Kundli PDF',
        description:
          'Print-ready Janam Patrika folio featuring Lagna, Navamsha, Dashamsha charts, planetary Shadbala, and house-by-house interpretation.',
      },
      {
        title: 'Advanced Dasha Report',
        description:
          'Multi-layered Vimshottari Mahadasha, Antardasha, and Pratyantardasha timeline illuminating pivotal life chapters.',
      },
      {
        title: 'Marriage Compatibility Report',
        description:
          'Comprehensive Ashtakoota Guna Milan paired with Manglik evaluation, Navamsha synastry, and harmonic guidance for couples.',
      },
      {
        title: 'Personalized Astrology Insights',
        description:
          'Focused guidance for career dharma, education, auspicious Muhurat selection, and traditional remedial practices.',
      },
    ],
    notifyTitle: 'Launch Notifications (Coming Soon)',
    notifyPlaceholder: 'Email signup opens in Phase 2',
    notifyButton: 'Not Active Yet',
    notifyUnavailableNote:
      'Email notifications are disabled in Phase 1 because no backend or mailing list is connected yet. No email addresses are collected, saved, or submitted.',
    exploreToolsLink: 'Browse All Astrology Tools',
  },
  blog: {
    kicker: 'Jyotish Journal · Sacred Studies',
    title: 'Wisdom from the Vedic Tradition',
    subtitle:
      'Curated essays exploring Jyotish Shastra, the twenty-seven lunar mansions, daily Panchang observance, and the astronomical rhythm of Indian festivals.',
    readArticleCta: 'Read Essay',
    viewAllArticlesCta: 'View All Articles',
    backToBlog: 'Back to All Articles',
    keyTakeawaysTitle: 'Key Reflections',
    categories: {
      all: 'All Essays',
      vedic: 'Vedic Astrology',
      nakshatra: 'Nakshatras',
      panchang: 'Panchang',
      festivals: 'Indian Festivals',
    },
    articles: [
      {
        slug: 'foundations-of-vedic-jyotish-shastra',
        category: 'vedic',
        categoryLabel: 'Vedic Astrology',
        title: 'Understanding Jyotish Shastra: The Eye of the Vedas',
        excerpt:
          'How classical Indian astrology maps the sidereal sky through twelve Bhavas, nine Grahas, and the unfolding timing of Karma.',
        date: '18 Nov 2026',
        readTime: '6 min read',
        author: 'Acharya Editorial Desk',
        artworkId: 'vedic',
        paragraphs: [
          'In the classical Vedanga tradition, Jyotish—literally "the science of light"—is revered as the eye of the Vedas. Rather than predicting rigid fate, traditional Jyotish illuminates the quality of time (Kala) so an individual can act with awareness, humility, and right effort.',
          'Unlike Western tropical systems anchored to the seasons, Indian Vedic astrology uses the Nirayana (sidereal) zodiac aligned with the fixed stars. The angular adjustment between these two frames, known as Ayanamsha, ensures that planetary placements honour the actual stellar constellations overhead.',
          'A complete Janam Kundli rests on three foundational pillars: the twelve Rashis (signs) that colour planetary expression, the twelve Bhavas (houses) representing domains of human life from selfhood to liberation, and the nine Grahas (Navagraha) whose interplay activates events across Vimshottari Dasha cycles.',
        ],
        keyTakeaways: [
          'Jyotish means "science of light" and serves as a guide for timely, dharmic action.',
          'Vedic astrology uses the sidereal (Nirayana) zodiac aligned with observable constellations.',
          'Birth chart interpretation harmonizes Lagna (Ascendant), Chandra (Moon), and Dasha timing.',
        ],
      },
      {
        slug: 'twenty-seven-nakshatras-lunar-mansions',
        category: 'nakshatra',
        categoryLabel: 'Nakshatras',
        title: 'The 27 Nakshatras: Secret Architecture of the Lunar Sky',
        excerpt:
          'From Ashwini to Revati, discover why Vedic masters look beyond zodiac signs to the subtle lunar mansions that shape temperament and destiny.',
        date: '12 Nov 2026',
        readTime: '7 min read',
        author: 'Pandit Raghavendra Sharma',
        artworkId: 'nakshatra',
        paragraphs: [
          'While the twelve Rashis divide the ecliptic into 30-degree arcs, Vedic sages refined the sky further into twenty-seven Nakshatras of 13°20′ each. Every day, the Moon travels through roughly one Nakshatra, lending each day its distinctive emotional and spiritual signature.',
          'Each Nakshatra carries a presiding Devata (deity), a sacred symbol, a planetary ruler within the 120-year Vimshottari Dasha system, and four Padas (quarters) that bridge the natal chart with the Navamsha (D-9) divisional chart.',
          'Knowing your Janma Nakshatra—the mansion occupied by the Moon at birth—reveals instinctive emotional patterns, natural inclinations, auspicious naming syllables (Namakaran), and compatibility harmonies studied in Ashtakoota matching.',
        ],
        keyTakeaways: [
          'Each of the 27 Nakshatras spans 13°20′ and is subdivided into four Padas.',
          'Your natal Moon’s Nakshatra sets the starting Mahadasha of your Vimshottari life timeline.',
          'Traditional naming, Muhurat selection, and Kundli matching rely deeply on Nakshatra wisdom.',
        ],
      },
      {
        slug: 'reading-hindu-panchang-five-limbs-of-time',
        category: 'panchang',
        categoryLabel: 'Panchang',
        title: 'How to Read a Hindu Panchang: The Five Sacred Limbs of Time',
        excerpt:
          'A clear introduction to Tithi, Vara, Nakshatra, Yoga, and Karana—and how households use Rahu Kaal and Abhijit Muhurat daily.',
        date: '06 Nov 2026',
        readTime: '5 min read',
        author: 'Dr. Meenakshi Devi',
        artworkId: 'panchang',
        paragraphs: [
          'The word Panchang derives from Pancha (five) and Anga (limbs). Together, these five astronomical elements describe the subtle energetic quality of every single day from sunrise to the following sunrise.',
          'Tithi measures the 12-degree angular separation between the Sun and Moon across Shukla (waxing) and Krishna (waning) fortnights. Vara is the solar weekday governed by one of the seven visible planets. Nakshatra marks the Moon’s stellar lodging, while Yoga combines solar and lunar longitudes, and Karana denotes half of a Tithi.',
          'By observing daily sunrise, sunset, auspicious Abhijit Muhurat, and cautionary intervals like Rahu Kaal, families choose harmonious moments for travel, learning, business launches, and sacred ceremonies.',
        ],
        keyTakeaways: [
          'The five limbs of Panchang are Tithi, Vara, Nakshatra, Yoga, and Karana.',
          'A traditional Vedic day runs from local sunrise (Suryodaya) to the next sunrise.',
          'Abhijit Muhurat offers a midday auspicious window, while Rahu Kaal advises patience before new starts.',
        ],
      },
      {
        slug: 'sacred-astronomy-behind-indian-festivals',
        category: 'festivals',
        categoryLabel: 'Indian Festivals',
        title: 'The Celestial Rhythm of Indian Festivals & Sacred Seasons',
        excerpt:
          'Why Makar Sankranti, Bohag Bihu, Deepavali, and Kartik Purnima align with solar ingresses, solstices, and lunar cycles.',
        date: '01 Nov 2026',
        readTime: '6 min read',
        author: 'JyotishSetu Cultural Desk',
        artworkId: 'festivals',
        paragraphs: [
          'Across every region of India—from Kashi to Kamrup—traditional festivals are not arbitrary calendar dates; they are living celebrations of astronomical transitions that connect agriculture, seasons, and inner contemplation.',
          'Solar festivals such as Makar Sankranti (Magh Bihu in Assam) and Mesha Sankranti (Bohag Bihu / Rongali Bihu) mark the Sun’s sidereal entry into Capricorn and Aries respectively, celebrating harvest abundance and cosmic renewal.',
          'Lunisolar observances like Deepavali on Kartika Amavasya, Sharad Purnima, and Maha Shivaratri follow precise Tithi and Nakshatra alignments at sunset or midnight, weaving celestial observation directly into community ritual.',
        ],
        keyTakeaways: [
          'Sankranti festivals celebrate the Sun’s sidereal ingress into a new Rashi.',
          'Regional traditions such as Bihu, Pongal, and Uttarayan share common Vedic astronomical roots.',
          'Lunisolar festivals align Tithi phases with specific times of dusk, dawn, or midnight.',
        ],
      },
    ],
  },
  toolsPage: {
    kicker: 'Complete Jyotish Suite',
    title: 'Vedic Astrology Tools',
    subtitle:
      'Explore all eight planned and preview instruments of JyotishSetu. Phase 1 establishes our multilingual foundation; astronomical calculation engines arrive in Phase 2.',
    filterAll: 'All Tools',
    filterCore: 'Core Vedic Charts',
    filterDosha: 'Dosha & Lunar Analysis',
  },
  comingSoonCommon: {
    phaseLabel: 'Coming Soon · Phase 2 Release',
    launchNotice:
      'This calculator is not live yet—it is planned for our upcoming Phase 2 astronomical calculation engine. No personal birth data is collected, calculated, or stored during Phase 1.',
    notifyHeading: 'Launch Alerts (Not Active Yet)',
    notifyDescription:
      'Email notifications for this tool will open once backend services are connected in Phase 2.',
    notifyUnavailableBadge: 'Disabled in Phase 1',
    notifyUnavailableNote:
      'No backend or database exists in Phase 1, so this form does not collect, save, or send email addresses yet.',
    emailPlaceholder: 'Email alerts unavailable until Phase 2',
    notifyBtn: 'Not Active Yet',
    availableNowTitle: 'Sample Previews & Reading in Phase 1',
    goToPanchang: "View Today's Panchang (Sample)",
    goToHoroscope: 'View Daily Horoscope (Sample)',
    goToBlog: 'Read Jyotish Journal',
    backHome: 'Return to Homepage',
  },
  comingSoonPages: {
    kundli: {
      id: 'kundli',
      kicker: 'Janam Patrika · Birth Chart Engine',
      title: 'Free Vedic Kundli Generator',
      subtitle:
        'Generate your authentic North Indian & South Indian Lagna chart, Navamsha (D-9), planetary degrees, and Vimshottari Dasha timeline.',
      phaseNote: 'Phase 2 will introduce precision Lahiri Ayanamsha planetary ephemeris calculations.',
      highlightsTitle: 'What Will Be Included',
      highlights: [
        {
          title: 'Lagna & Divisional Charts',
          detail: 'D-1 Rashi, D-9 Navamsha, Chandra Kundli, and Chalit Bhava charts in clean regional formats.',
        },
        {
          title: 'Planetary Degrees & Dignities',
          detail: 'Exact sidereal longitude, Nakshatra Pada, combustion, retrogression, and exaltation status for all nine Grahas.',
        },
        {
          title: 'Vimshottari Dasha Timeline',
          detail: 'Complete 120-year Mahadasha and Antardasha sequence anchored to your natal Moon Nakshatra.',
        },
        {
          title: 'Multilingual Chart Labels',
          detail: 'Switch seamlessly between English, हिन्दी, and অসমীয়া without regenerating your chart.',
        },
      ],
      methodologyTitle: 'Classical Parashari Foundation',
      methodologyBody:
        'Our upcoming Kundli engine follows Brihat Parashara Hora Shastra with True Chitrapaksha (Lahiri) Ayanamsha and topocentric sunrise definitions so every house cusp and planetary placement remains faithful to Indian tradition.',
    },
    matching: {
      id: 'matching',
      kicker: 'Vivaha Milan · Relationship Harmony',
      title: 'Kundli Matching (Ashtakoota Milan)',
      subtitle:
        'Evaluate traditional 36-Guna marriage compatibility alongside Mangal Dosha balance and Navamsha synastry.',
      phaseNote: 'Automated dual-chart Ashtakoota scoring is scheduled for Phase 2.',
      highlightsTitle: 'Eight-Fold Compatibility Pillars',
      highlights: [
        {
          title: 'Complete 36-Guna Breakdown',
          detail: 'Detailed scoring across Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.',
        },
        {
          title: 'Nadi & Bhakoot Exceptions',
          detail: 'Thoughtful evaluation of classical cancellation conditions (Parihara) rather than mechanical fear-based alerts.',
        },
        {
          title: 'Mangal & Seventh-House Review',
          detail: 'Balanced comparison of Mars placement, Venus dignity, and seventh-lord strength in both charts.',
        },
        {
          title: 'Clear Family Summary',
          detail: 'Readable compatibility narrative accessible in English, Hindi, and Assamese.',
        },
      ],
      methodologyTitle: 'Beyond Raw Scores',
      methodologyBody:
        'Classical Jyotish teaches that Gunas are one chapter of partnership harmony. JyotishSetu will pair Ashtakoota mathematics with compassionate, transparent explanations of planetary strengths.',
    },
    numerology: {
      id: 'numerology',
      kicker: 'Ank Jyotish · Sacred Numbers',
      title: 'Vedic Numerology Explorer',
      subtitle:
        'Uncover the planetary resonance of your birth date and name through Mulank (Psychic Number), Bhagyank (Destiny Number), and Namank.',
      phaseNote: 'Interactive Vedic & Chaldean numerology calculators launch in Phase 2.',
      highlightsTitle: 'Planned Numerology Insights',
      highlights: [
        {
          title: 'Mulank & Ruling Planet',
          detail: 'Understand how numbers 1 through 9 correspond to Surya, Chandra, Guru, Rahu, Budha, Shukra, Ketu, Shani, and Mangala.',
        },
        {
          title: 'Bhagyank Life Trajectory',
          detail: 'Full birth-date synthesis revealing long-term temperament, vocational strengths, and auspicious years.',
        },
        {
          title: 'Friendly & Challenging Numbers',
          detail: 'Identify harmonious dates, colours, and daily rhythms aligned with your core planetary vibration.',
        },
        {
          title: 'Name Vibration Preview',
          detail: 'Explore classical phonetic letter values using Chaldean-Vedic mapping.',
        },
      ],
      methodologyTitle: 'Numbers as Planetary Expressions',
      methodologyBody:
        'In Indian Ank Jyotish, each digit mirrors one of the nine Grahas. Our upcoming calculator harmonizes numerological rhythms with traditional Vedic symbolism.',
    },
    sadeSati: {
      id: 'sade-sati',
      kicker: 'Shani Gochara · Saturn Transit Cycle',
      title: 'Sade Sati Calculator',
      subtitle:
        'Understand Saturn’s 7.5-year transit across the twelfth, first, and second houses from your natal Moon with calm, traditional perspective.',
      phaseNote: 'Personalized Saturn transit date mapping arrives in Phase 2.',
      highlightsTitle: 'What This Tool Will Provide',
      highlights: [
        {
          title: 'Three-Phase Mapping',
          detail: 'Clear timelines for Rising (Udaya), Peak (Shikhara), and Setting (Asta) phases of Sade Sati.',
        },
        {
          title: 'Paya Classification',
          detail: 'Traditional Gold, Silver, Copper, and Iron foot (Paya) interpretation based on transit house.',
        },
        {
          title: 'Constructive Remedies',
          detail: 'Grounded ethical practices, discipline, and traditional Shani mantras without superstition.',
        },
        {
          title: 'Dhaiya (Small Panoti) Check',
          detail: 'Simultaneous verification of Saturn’s fourth and eighth house transits from the Moon.',
        },
      ],
      methodologyTitle: 'Saturn as Teacher of Dharma',
      methodologyBody:
        'Shani Dev is the dispenser of karma and maturity, not an adversary. JyotishSetu frames Sade Sati as a season of disciplined refinement and lasting structural growth.',
    },
    mangalDosha: {
      id: 'mangal-dosha',
      kicker: 'Kuja Dosha · Mars Placement Analysis',
      title: 'Mangal Dosha Checker',
      subtitle:
        'Examine Mars placements in the 1st, 2nd, 4th, 7th, 8th, and 12th houses alongside authentic classical cancellation rules.',
      phaseNote: 'Full chart-based Mangal Dosha and cancellation logic arrives in Phase 2.',
      highlightsTitle: 'Analytical Scope',
      highlights: [
        {
          title: 'Lagna, Moon & Venus Reference',
          detail: 'Evaluates Mars across primary reference points as practiced in traditional lineages.',
        },
        {
          title: 'Classical Cancellation Rules',
          detail: 'Checks own-sign, exaltation, benefic Jupiter aspect, and mutual partner cancellation.',
        },
        {
          title: 'Low, Moderate & High Nuance',
          detail: 'Distinguishes subtle placements from strong Kuja energy without alarmist language.',
        },
        {
          title: 'Balanced Remedial Guidance',
          detail: 'Simple spiritual practices and practical communication insights for harmony.',
        },
      ],
      methodologyTitle: 'Clarity Over Fear',
      methodologyBody:
        'Many charts labelled "Manglik" carry natural scriptural cancellations. Our Phase 2 engine will highlight every mitigating factor clearly so families make informed decisions.',
    },
    nakshatraFinder: {
      id: 'nakshatra-finder',
      kicker: 'Janma Tara · 27 Lunar Mansions',
      title: 'Nakshatra & Pada Finder',
      subtitle:
        'Discover your birth Nakshatra, quarter (Pada), presiding Devata, Gana, Yoni, and sacred naming syllables.',
      phaseNote: 'Exact Moon-longitude Nakshatra computation launches in Phase 2.',
      highlightsTitle: 'Nakshatra Profile Elements',
      highlights: [
        {
          title: 'Nakshatra & Pada Identification',
          detail: 'Pinpoints your exact lunar mansion and 3°20′ Pada from birth date, time, and city.',
        },
        {
          title: 'Namakaran Syllables',
          detail: 'Traditional Akshara sound syllables associated with each Pada for newborn naming ceremonies.',
        },
        {
          title: 'Symbolism & Deity Lore',
          detail: 'Authentic insights into the Vedic deity, sacred tree, animal totem, and temperament of your Tara.',
        },
        {
          title: 'Starting Dasha Lord',
          detail: 'Reveals your birth Mahadasha ruler and balanced transition age.',
        },
      ],
      methodologyTitle: 'Heart of Lunar Astrology',
      methodologyBody:
        'Every Vedic ritual begins with Sankalpa—reciting the Tithi and Nakshatra. Our Nakshatra Finder will honour this ancient lunar heritage with scholarly accuracy.',
    },
  },
  infoPages: {
    about: {
      kicker: 'Our Heritage & Purpose',
      title: 'About JyotishSetu',
      lead:
        'JyotishSetu—meaning "The Bridge of Light"—was envisioned to make authentic Indian Vedic astrology clear, dignified, and accessible in the languages India speaks at home.',
      paragraphs: [
        'For millennia, Jyotish Shastra has offered seekers a luminous mirror of time, temperament, and dharmic purpose. Yet on the modern web, traditional wisdom is too often buried beneath clutter, alarmist claims, or rigid single-language interfaces.',
        'JyotishSetu brings editorial craft and classical reverence together. In Phase 1, we have established our multilingual website foundation across English, हिन्दी, and অসমীয়া—pairing sacred Indian visual heritage with transparent demonstration previews of Panchang, Daily Horoscope, and Vedic essays.',
        'As we advance into Phase 2 and beyond, our roadmap introduces accurate sidereal Kundli calculations, 36-Guna Ashtakoota matching, location-aware Panchang ephemeris, and heirloom-grade downloadable Vedic manuscripts.',
      ],
      pillarsTitle: 'Our Guiding Principles',
      pillars: [
        {
          title: 'Classical Integrity',
          body: 'Grounded in established Parashari texts, sidereal Lahiri reckoning, and respectful traditional terminology.',
        },
        {
          title: 'Zero Fear-Mongering',
          body: 'Astrology should cultivate clarity, patience, and self-awareness—never anxiety or coercive remedies.',
        },
        {
          title: 'True Multilingual Craft',
          body: 'Every heading, tool, and essay is thoughtfully authored for English, Hindi, and Assamese readers alike.',
        },
      ],
    },
    contact: {
      kicker: 'Editorial & Community Desk',
      title: 'Contact Us',
      lead:
        'Have feedback on our Phase 1 foundation, multilingual terminology suggestions, or questions about upcoming JyotishSetu tools? Write to our team below.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g., Phase 2 feedback or Assamese translation note',
      messageLabel: 'Message',
      messagePlaceholder: 'Share your inquiry or suggestion (at least 10 characters)...',
      submitBtn: 'Test Form Validation (Preview Only)',
      previewNotice:
        'Phase 1 Notice: No backend server is connected yet, so submitting this form validates your inputs locally and does not send or store your message.',
      successTitle: 'Preview Only — Message Not Sent',
      successBody:
        'Your inputs passed local form validation, but nothing was transmitted or saved because Phase 1 has no backend email service yet. For real inquiries, please write directly to namaste@jyotishsetu.in.',
      sendAnotherBtn: 'Reset Preview Form',
      officeTitle: 'JyotishSetu Editorial Desk',
      officeBody:
        'Dedicated to preserving classical Indian Jyotish knowledge across regional languages with clarity and scholarly care.',
      emailSupportLabel: 'Editorial Correspondence',
      hoursLabel: 'Response Hours',
      hoursValue: 'Monday – Saturday · 10:00 AM – 6:00 PM IST',
    },
    privacy: {
      kicker: 'Trust & Transparency',
      title: 'Privacy Policy',
      updated: 'Phase 1 Foundation · Effective November 2026',
      sections: [
        {
          heading: '1. No Account or Database Collection in Phase 1',
          body: 'JyotishSetu Phase 1 operates entirely as a front-end informational foundation. We do not maintain user accounts, external databases, payment gateways, or birth-chart servers at this stage.',
        },
        {
          heading: '2. Browser Local Storage',
          body: 'To remember your chosen reading language (English, हिन्दी, or অসমীয়া) across page reloads, JyotishSetu stores a single preference key in your browser’s localStorage. No personal identifiers or tracking cookies are stored.',
        },
        {
          heading: '3. Preview Forms',
          body: 'Any contact or early-access email entries submitted during Phase 1 are validated locally in your browser to demonstrate interface behaviour and are not transmitted to third-party servers.',
        },
        {
          heading: '4. Future Phases',
          body: 'When personalized Kundli calculations and optional reports are introduced in later phases, this Privacy Policy will be updated transparently before any birth details are processed.',
        },
      ],
    },
    terms: {
      kicker: 'Platform Guidelines',
      title: 'Terms and Conditions',
      updated: 'Phase 1 Foundation · Effective November 2026',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By browsing JyotishSetu, you agree to use this website and its educational Vedic astrology content respectfully and in accordance with applicable laws.',
        },
        {
          heading: '2. Informational & Demonstration Nature',
          body: 'Phase 1 showcases the structural, multilingual, and editorial foundation of JyotishSetu. Daily Horoscope readings and Today’s Panchang values are clearly labelled demonstration content until live astronomical calculation modules are released.',
        },
        {
          heading: '3. Intellectual Property',
          body: 'All original copy, translations (English, Hindi, and Assamese), visual motifs, mandala artwork, and page layouts belong to JyotishSetu and may not be reproduced commercially without written permission.',
        },
        {
          heading: '4. No Commercial Transactions Yet',
          body: 'Premium services listed on JyotishSetu are marked Coming Soon. No purchases, subscriptions, or financial transactions are accepted on this site during Phase 1.',
        },
      ],
    },
    disclaimer: {
      kicker: 'Astrological Ethics',
      title: 'Disclaimer',
      updated: 'Phase 1 Foundation · Effective November 2026',
      sections: [
        {
          heading: '1. Cultural & Spiritual Guidance',
          body: 'All Vedic astrology content, horoscope outlooks, Panchang explanations, and essays presented on JyotishSetu are intended for cultural study, personal reflection, and informational purposes.',
        },
        {
          heading: '2. Not a Substitute for Professional Advice',
          body: 'Astrological insights should never replace qualified medical, legal, financial, or mental health counsel. Always consult certified professionals for critical life decisions.',
        },
        {
          heading: '3. Demonstration Data Notice',
          body: 'Panchang timings and daily zodiac forecasts in Phase 1 are illustrative demonstration entries and should not be used for time-critical ceremonial Muhurat decisions until our verified Phase 2 ephemeris engine launches.',
        },
      ],
    },
  },
  validation: {
    nameRequired: 'Please enter your full name.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    subjectRequired: 'Please enter a brief subject.',
    messageRequired: 'Please write a message of at least 10 characters.',
  },
  footer: {
    exploreHeading: 'Explore JyotishSetu',
    toolsHeading: 'Astrology Instruments',
    companyHeading: 'House & Policies',
    connectHeading: 'Connect',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms and Conditions',
    disclaimer: 'Disclaimer',
    socialLabels: {
      instagram: 'Instagram',
      youtube: 'YouTube',
      x: 'X (Twitter)',
      facebook: 'Facebook',
    },
    copyright: '© 2026 JyotishSetu. All rights reserved.',
    phaseNotice: 'Phase 1 Website Foundation · Demonstration Panchang & Horoscope Preview',
  },
};
