import type { Language } from './types';
import type { DignityId, PlanetId } from '../utils/vedicAstrology';

export const RASHI_NAMES: Record<Language, readonly string[]> = {
  en: [
    'Mesha (Aries)',
    'Vrishabha (Taurus)',
    'Mithuna (Gemini)',
    'Karka (Cancer)',
    'Simha (Leo)',
    'Kanya (Virgo)',
    'Tula (Libra)',
    'Vrishchika (Scorpio)',
    'Dhanu (Sagittarius)',
    'Makara (Capricorn)',
    'Kumbha (Aquarius)',
    'Meena (Pisces)',
  ],
  hi: [
    'मेष',
    'वृषभ',
    'मिथुन',
    'कर्क',
    'सिंह',
    'कन्या',
    'तुला',
    'वृश्चिक',
    'धनु',
    'मकर',
    'कुंभ',
    'मीन',
  ],
  as: [
    'মেষ',
    'বৃষ',
    'মিথুন',
    'কৰ্কট',
    'সিংহ',
    'কন্যা',
    'তুলা',
    'বৃশ্চিক',
    'ধনু',
    'মকৰ',
    'কুম্ভ',
    'মীন',
  ],
};

export const PLANET_NAMES: Record<Language, Record<PlanetId, string>> = {
  en: {
    sun: 'Surya (Sun)',
    moon: 'Chandra (Moon)',
    mars: 'Mangala (Mars)',
    mercury: 'Budha (Mercury)',
    jupiter: 'Guru (Jupiter)',
    venus: 'Shukra (Venus)',
    saturn: 'Shani (Saturn)',
    rahu: 'Rahu',
    ketu: 'Ketu',
  },
  hi: {
    sun: 'सूर्य',
    moon: 'चंद्र',
    mars: 'मंगल',
    mercury: 'बुध',
    jupiter: 'बृहस्पति (गुरु)',
    venus: 'शुक्र',
    saturn: 'शनि',
    rahu: 'राहु',
    ketu: 'केतु',
  },
  as: {
    sun: 'সূৰ্য',
    moon: 'চন্দ্ৰ',
    mars: 'মংগল',
    mercury: 'বুধ',
    jupiter: 'বৃহস্পতি (গুৰু)',
    venus: 'শুক্ৰ',
    saturn: 'শনি',
    rahu: 'ৰাহু',
    ketu: 'কেতু',
  },
};

export const PLANET_SHORT: Record<Language, Record<PlanetId | 'lagna', string>> = {
  en: {
    lagna: 'Asc',
    sun: 'Su',
    moon: 'Mo',
    mars: 'Ma',
    mercury: 'Me',
    jupiter: 'Ju',
    venus: 'Ve',
    saturn: 'Sa',
    rahu: 'Ra',
    ketu: 'Ke',
  },
  hi: {
    lagna: 'लग्न',
    sun: 'सू',
    moon: 'चं',
    mars: 'मं',
    mercury: 'बु',
    jupiter: 'गु',
    venus: 'शु',
    saturn: 'श',
    rahu: 'रा',
    ketu: 'के',
  },
  as: {
    lagna: 'লগ্ন',
    sun: 'সূ',
    moon: 'চ',
    mars: 'মং',
    mercury: 'বু',
    jupiter: 'গু',
    venus: 'শু',
    saturn: 'শ',
    rahu: 'ৰা',
    ketu: 'কে',
  },
};

export const DIGNITY_LABELS: Record<Language, Record<DignityId, string>> = {
  en: {
    exalted: 'Exalted (Uchcha)',
    own: 'Own Sign (Swakshetra)',
    debilitated: 'Debilitated (Neecha)',
    friendly: 'Friendly Sign',
    neutral: 'Neutral Sign',
  },
  hi: {
    exalted: 'उच्च',
    own: 'स्वगृही',
    debilitated: 'नीच',
    friendly: 'मित्र राशि',
    neutral: 'सम राशि',
  },
  as: {
    exalted: 'উচ্চ',
    own: 'স্বৰাশি',
    debilitated: 'নীচ',
    friendly: 'মিত্ৰ ৰাশি',
    neutral: 'সম ৰাশি',
  },
};

export const NAKSHATRA_NAMES: Record<Language, readonly string[]> = {
  en: [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
  ],
  hi: [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
    'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी',
    'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
    'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
    'पूर्वभाद्रपद', 'उत्तरभाद्रपद', 'रेवती',
  ],
  as: [
    'অশ্বিনী', 'ভৰণী', 'কৃত্তিকা', 'ৰোহিণী', 'মৃগশিৰা', 'আৰ্দ্ৰা',
    'পুনৰ্বসু', 'পুষ্যা', 'অশ্লেষা', 'মঘা', 'পূৰ্বফল্গুনী', 'উত্তৰফল্গুনী',
    'হস্তা', 'চিত্ৰা', 'স্বাতী', 'বিশাখা', 'অনুৰাধা', 'জ্যেষ্ঠা',
    'মূলা', 'পূৰ্বাষাঢ়া', 'উত্তৰাষাঢ়া', 'শ্ৰৱণা', 'ধনিষ্ঠা', 'শতভিষা',
    'পূৰ্বভাদ্ৰপদ', 'উত্তৰভাদ্ৰপদ', 'ৰেৱতী',
  ],
};

export const NAKSHATRA_DEITIES: Record<Language, readonly string[]> = {
  en: [
    'Ashwini Kumaras', 'Yama', 'Agni', 'Brahma (Prajapati)', 'Soma (Chandra)', 'Rudra',
    'Aditi', 'Brihaspati', 'Sarpa (Nagas)', 'Pitris (Ancestors)', 'Bhaga', 'Aryaman',
    'Savitr (Surya)', 'Tvastar (Vishwakarma)', 'Vayu', 'Indra-Agni', 'Mitra', 'Indra',
    'Nirriti', 'Apah (Waters)', 'Vishwadevas', 'Vishnu', 'Ashta Vasus', 'Varuna',
    'Aja Ekapada', 'Ahir Budhnya', 'Pushan',
  ],
  hi: [
    'अश्विनी कुमार', 'यम', 'अग्नि', 'ब्रह्मा (प्रजापति)', 'सोम (चंद्र)', 'रुद्र',
    'अदिति', 'बृहस्पति', 'सर्प (नाग)', 'पितृगण', 'भग', 'अर्यमा',
    'सविता (सूर्य)', 'त्वष्टा (विश्वकर्मा)', 'वायु', 'इन्द्राग्नि', 'मित्र', 'इन्द्र',
    'निरृति', 'आपः (जल देवता)', 'विश्वेदेवा', 'विष्णु', 'अष्ट वसु', 'वरुण',
    'अज एकपाद', 'अहिर्बुध्न्य', 'पूषा',
  ],
  as: [
    'অশ্বিনী কুমাৰ', 'যম', 'অগ্নি', 'ব্ৰহ্মা (প্ৰজাপতি)', 'সোম (চন্দ্ৰ)', 'ৰুদ্ৰ',
    'অদিতি', 'বৃহস্পতি', 'সৰ্প (নাগ)', 'পিতৃগণ', 'ভগ', 'অৰ্যমা',
    'সৱিতা (সূৰ্য)', 'ত্বষ্টা (বিশ্বকৰ্মা)', 'বায়ু', 'ইন্দ্ৰাগ্নি', 'মিত্ৰ', 'ইন্দ্ৰ',
    'নিৰৃতি', 'আপঃ (জল দেৱতা)', 'বিশ্বদেৱ', 'বিষ্ণু', 'অষ্ট বসু', 'বৰুণ',
    'অজ একপাদ', 'অহিৰ্বুধ্ন্য', 'পূষা',
  ],
};

export const NAKSHATRA_SYMBOLS: Record<Language, readonly string[]> = {
  en: [
    'Horse Head', 'Yoni (Vessel)', 'Flame / Razor', 'Chariot', 'Deer Head', 'Teardrop / Gem',
    'Quiver of Arrows', 'Lotus / Cow Udder', 'Coiled Serpent', 'Royal Throne', 'Hammock / Couch', 'Bed / Fig Tree',
    'Open Palm', 'Shining Jewel', 'Coral / Young Shoot', 'Triumphal Arch', 'Lotus Staff', 'Umbrella / Amulet',
    'Tied Roots', 'Elephant Tusk / Fan', 'Elephant Tusk / Planks', 'Ear / Three Footprints', 'Drum (Mridanga)', 'Empty Circle / Stars',
    'Sword / Two-Faced Figure', 'Twins / Back Legs of Cot', 'Drum / Fish Pair',
  ],
  hi: [
    'अश्व मुख', 'योनि (पात्र)', 'अग्निशिखा', 'रथ', 'मृगशीर्ष', 'अश्रु / मणि',
    'बाणों का तरकश', 'कमल / गोस्तन', 'कुंडलित सर्प', 'राजसिंहासन', 'शैया / पालकी', 'शय्या / पीपल',
    'खुली हथेली', 'चमकता रत्न', 'नवपल्लव / मूंगा', 'तोरण द्वार', 'कमल दंड', 'छत्र / कुंडल',
    'जड़ों का गुच्छा', 'हाथी दांत / पंखा', 'गजदंत / मंच', 'कर्ण / तीन पदचिह्न', 'मृदंग (ढोल)', 'वृत्त / शततारा',
    'खड्ग / द्विमुख', 'युगल / शय्या पाद', 'मृदंग / मत्स्य युगल',
  ],
  as: [
    'অশ্ব মুখ', 'যোনি (পাত্ৰ)', 'অগ্নিশিখা', 'ৰথ', 'হৰিণৰ মূৰ', 'চকুলো / মণি',
    'শৰৰ তূণ', 'পদুম ফুল', 'কুণ্ডলীকৃত সৰ্প', 'ৰাজসিংহাসন', 'শয্যা / পাল্কী', 'শয্যা / অশ্বত্থ',
    'খোলা হাতৰ তলুৱা', 'উজ্জ্বল ৰত্ন', 'কোমল কুঁহিপাত', 'তোৰণ দুৱাৰ', 'পদুম দণ্ড', 'ছত্ৰ / কুণ্ডল',
    'শিপাৰ থোপা', 'হাতী দাঁত / বিচনী', 'গজদন্ত / মঞ্চ', 'কৰ্ণ / তিনি পদচিহ্ন', 'মৃদংগ', 'শূন্য বৃত্ত / তৰা',
    'খড়্গ / দ্বিমুখ', 'যুগল / শয্যা পাদ', 'মৃদংগ / মাছৰ যোৰ',
  ],
};

// Traditional 108 Namakshar (4 Pada syllables per Nakshatra)
export const NAKSHATRA_PADA_SYLLABLES: Record<Language, readonly (readonly [string, string, string, string])[]> = {
  en: [
    ['Chu', 'Che', 'Cho', 'La'], ['Li', 'Lu', 'Le', 'Lo'], ['A', 'I', 'U', 'E'],
    ['O', 'Va', 'Vi', 'Vu'], ['Ve', 'Vo', 'Ka', 'Ki'], ['Ku', 'Gha', 'Ng', 'Chha'],
    ['Ke', 'Ko', 'Ha', 'Hi'], ['Hu', 'He', 'Ho', 'Da'], ['Di', 'Du', 'De', 'Do'],
    ['Ma', 'Mi', 'Mu', 'Me'], ['Mo', 'Ta', 'Ti', 'Tu'], ['Te', 'To', 'Pa', 'Pi'],
    ['Pu', 'Sha', 'Na', 'Tha'], ['Pe', 'Po', 'Ra', 'Ri'], ['Ru', 'Re', 'Ro', 'Ta'],
    ['Ti', 'Tu', 'Te', 'To'], ['Na', 'Ni', 'Nu', 'Ne'], ['No', 'Ya', 'Yi', 'Yu'],
    ['Ye', 'Yo', 'Bha', 'Bhi'], ['Bhu', 'Dha', 'Pha', 'Dha'], ['Bhe', 'Bho', 'Ja', 'Ji'],
    ['Khi', 'Khu', 'Khe', 'Kho'], ['Ga', 'Gi', 'Gu', 'Ge'], ['Go', 'Sa', 'Si', 'Su'],
    ['Se', 'So', 'Da', 'Di'], ['Du', 'Tha', 'Jha', 'Jna'], ['De', 'Do', 'Cha', 'Chi'],
  ],
  hi: [
    ['चू', 'चे', 'चो', 'ला'], ['ली', 'लू', 'ले', 'लो'], ['अ', 'ई', 'उ', 'ए'],
    ['ओ', 'वा', 'वी', 'वू'], ['वे', 'वो', 'का', 'की'], ['कू', 'घ', 'ङ', 'छ'],
    ['के', 'को', 'हा', 'ही'], ['हू', 'हे', 'हो', 'डा'], ['डी', 'डू', 'डे', 'डो'],
    ['मा', 'मी', 'मू', 'मे'], ['मो', 'टा', 'टी', 'टू'], ['टे', 'टो', 'पा', 'पी'],
    ['पू', 'ष', 'ण', 'ठ'], ['पे', 'पो', 'रा', 'री'], ['रू', 'रे', 'रो', 'ता'],
    ['ती', 'तू', 'ते', 'तो'], ['ना', 'नी', 'नू', 'ने'], ['नो', 'या', 'यी', 'यू'],
    ['ये', 'यो', 'भा', 'भी'], ['भू', 'धा', 'फा', 'ढा'], ['भे', 'भो', 'जा', 'जी'],
    ['खी', 'खू', 'खे', 'खो'], ['गा', 'गी', 'गू', 'गे'], ['गो', 'सा', 'सी', 'सू'],
    ['से', 'सो', 'दा', 'दी'], ['दू', 'थ', 'झ', 'ञ'], ['दे', 'दो', 'चा', 'ची'],
  ],
  as: [
    ['চু', 'চে', 'চো', 'লা'], ['লি', 'লু', 'লে', 'লো'], ['অ', 'ই', 'উ', 'এ'],
    ['ও', 'ৱা', 'ৱি', 'ৱু'], ['ৱে', 'ৱো', 'কা', 'কি'], ['কু', 'ঘ', 'ঙ', 'ছ'],
    ['কে', 'কো', 'হা', 'হি'], ['হু', 'হে', 'হো', 'ডা'], ['ডি', 'ডু', 'ডে', 'ডো'],
    ['মা', 'মি', 'মু', 'মে'], ['মো', 'টা', 'টি', 'টু'], ['টে', 'টো', 'পা', 'পি'],
    ['পু', 'ষ', 'ণ', 'ঠ'], ['পে', 'পো', 'ৰা', 'ৰি'], ['ৰু', 'ৰে', 'ৰো', 'তা'],
    ['তি', 'তু', 'তে', 'তো'], ['না', 'নি', 'নু', 'নে'], ['নো', 'যা', 'যি', 'যু'],
    ['যে', 'যো', 'ভা', 'ভি'], ['ভু', 'ধা', 'ফা', 'ঢা'], ['ভে', 'ভো', 'জা', 'জি'],
    ['খি', 'খু', 'খে', 'খো'], ['গা', 'গি', 'গু', 'গে'], ['গো', 'সা', 'সি', 'সু'],
    ['সে', 'সো', 'দা', 'দি'], ['দু', 'থ', 'ঝ', 'ঞ'], ['দে', 'দো', 'চা', 'চি'],
  ],
};

export const TITHI_NAMES: Record<Language, readonly string[]> = {
  en: [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Amavasya',
  ],
  hi: [
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
    'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
    'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा',
    'अमावस्या',
  ],
  as: [
    'প্ৰতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুৰ্থী', 'পঞ্চমী',
    'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নৱমী', 'দশমী',
    'একাদশী', 'দ্বাদশী', 'ত্ৰয়োদশী', 'চতুৰ্দশী', 'পূৰ্ণিমা',
    'অমাৱস্যা',
  ],
};

export const PAKSHA_LABELS: Record<Language, { shukla: string; krishna: string }> = {
  en: { shukla: 'Shukla Paksha', krishna: 'Krishna Paksha' },
  hi: { shukla: 'शुक्ल पक्ष', krishna: 'कृष्ण पक्ष' },
  as: { shukla: 'শুক্ল পক্ষ', krishna: 'কৃষ্ণ পক্ষ' },
};

export function getLocalizedTithiName(
  paksha: 'shukla' | 'krishna',
  tithiInPaksha: number,
  lang: Language,
): string {
  const names = TITHI_NAMES[lang];
  if (tithiInPaksha === 15) {
    return paksha === 'shukla'
      ? `${PAKSHA_LABELS[lang].shukla} ${names[14]}`
      : `${PAKSHA_LABELS[lang].krishna} ${names[15]}`;
  }
  return `${PAKSHA_LABELS[lang][paksha]} ${names[tithiInPaksha - 1]}`;
}

export const YOGA_NAMES: Record<Language, readonly string[]> = {
  en: [
    'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
    'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva',
    'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
    'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
    'Brahma', 'Indra', 'Vaidhriti',
  ],
  hi: [
    'विष्कुम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगण्ड',
    'सुकर्मा', 'धृति', 'शूल', 'गण्ड', 'वृद्धि', 'ध्रुव',
    'व्याघात', 'हर्षण', 'वज्र', 'सिद्धि', 'व्यतीपात', 'वरीयान',
    'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल',
    'ब्रह्म', 'इन्द्र', 'वैधृति',
  ],
  as: [
    'বিষ্কুম্ভ', 'প্ৰীতি', 'আয়ুষ্মান', 'সৌভাগ্য', 'শোভন', 'অতিগণ্ড',
    'সুকৰ্মা', 'ধৃতি', 'শূল', 'গণ্ড', 'বৃদ্ধি', 'ধ্ৰুৱ',
    'ব্যাঘাত', 'হৰ্ষণ', 'বজ্ৰ', 'সিদ্ধি', 'ব্যতীপাত', 'বৰীয়ান',
    'পৰিঘ', 'শিৱ', 'সিদ্ধ', 'সাধ্য', 'শুভ', 'শুক্ল',
    'ব্ৰহ্ম', 'ইন্দ্ৰ', 'বৈধৃতি',
  ],
};

export const KARANA_NAMES: Record<
  Language,
  Record<
    | 'kimstughna'
    | 'bava'
    | 'balava'
    | 'kaulava'
    | 'taitila'
    | 'gara'
    | 'vanija'
    | 'vishti'
    | 'shakuni'
    | 'chatushpada'
    | 'naga',
    string
  >
> = {
  en: {
    kimstughna: 'Kimstughna',
    bava: 'Bava',
    balava: 'Balava',
    kaulava: 'Kaulava',
    taitila: 'Taitila',
    gara: 'Gara',
    vanija: 'Vanija',
    vishti: 'Vishti (Bhadra)',
    shakuni: 'Shakuni',
    chatushpada: 'Chatushpada',
    naga: 'Naga',
  },
  hi: {
    kimstughna: 'किंस्तुघ्न',
    bava: 'बव',
    balava: 'बालव',
    kaulava: 'कौलव',
    taitila: 'तैतिल',
    gara: 'गर',
    vanija: 'वणिज',
    vishti: 'विष्टि (भद्रा)',
    shakuni: 'शकुनि',
    chatushpada: 'चतुष्पद',
    naga: 'नाग',
  },
  as: {
    kimstughna: 'কিংস্তুঘ্ন',
    bava: 'বৱ',
    balava: 'বালৱ',
    kaulava: 'কৌলৱ',
    taitila: 'তৈতিল',
    gara: 'গৰ',
    vanija: 'বণিক',
    vishti: 'বিষ্টি (ভদ্ৰা)',
    shakuni: 'শকুনি',
    chatushpada: 'চতুষ্পদ',
    naga: 'নাগ',
  },
};

export const CHOGHADIYA_LABELS: Record<
  Language,
  Record<'amrit' | 'shubh' | 'labh' | 'char' | 'rog' | 'kaal' | 'udveg', { name: string; meaning: string }>
> = {
  en: {
    amrit: { name: 'Amrit', meaning: 'Best for all auspicious beginnings' },
    shubh: { name: 'Shubh', meaning: 'Favourable for rituals, education & ceremonies' },
    labh: { name: 'Labh', meaning: 'Ideal for business, trade & starting ventures' },
    char: { name: 'Char', meaning: 'Good for travel, movement & routine work' },
    rog: { name: 'Rog', meaning: 'Avoid starting health-critical or major events' },
    kaal: { name: 'Kaal', meaning: 'Inauspicious; avoid launching new ventures' },
    udveg: { name: 'Udveg', meaning: 'Restless period; best for routine duties only' },
  },
  hi: {
    amrit: { name: 'अमृत', meaning: 'सभी शुभ कार्यों के आरंभ के लिए सर्वोत्तम' },
    shubh: { name: 'शुभ', meaning: 'पूजा, शिक्षा और मांगलिक कार्यों के लिए उत्तम' },
    labh: { name: 'लाभ', meaning: 'व्यापार, निवेश और नए कार्य के लिए लाभकारी' },
    char: { name: 'चर', meaning: 'यात्रा और गतिशील कार्यों के लिए अनुकूल' },
    rog: { name: 'रोग', meaning: 'महत्वपूर्ण शुभ आरंभ से बचें' },
    kaal: { name: 'काल', meaning: 'अशुभ अवधि; नए कार्यों को टालें' },
    udveg: { name: 'उद्वेग', meaning: 'अस्थिर समय; केवल नियमित कार्य करें' },
  },
  as: {
    amrit: { name: 'অমৃত', meaning: 'সকলো শুভ কাৰ্য আৰম্ভ কৰাৰ বাবে সৰ্বোত্তম' },
    shubh: { name: 'শুভ', meaning: 'পূজা-অৰ্চনা, বিদ্যাৰম্ভ আৰু মাংগলিক কাৰ্যৰ বাবে উত্তম' },
    labh: { name: 'লাভ', meaning: 'ব্যৱসায়-বাণিজ্য আৰু নতুন উদ্যোগৰ বাবে লাভজনক' },
    char: { name: 'চৰ', meaning: 'যাত্ৰা আৰু দৈনন্দিন গতিশীল কামৰ বাবে অনুকূল' },
    rog: { name: 'ৰোগ', meaning: 'গুৰুত্বপূৰ্ণ শুভ আৰম্ভণি পৰিহাৰ কৰক' },
    kaal: { name: 'কাল', meaning: 'অশুভ সময়; নতুন কাম আৰম্ভ নকৰিব' },
    udveg: { name: 'উদ্বেগ', meaning: 'অস্থিৰ সময়; কেৱল নিয়মীয়া কামহে কৰিব' },
  },
};

export const YONI_NAMES: Record<Language, readonly string[]> = {
  en: ['Horse', 'Elephant', 'Sheep', 'Serpent', 'Dog', 'Cat', 'Rat', 'Cow', 'Buffalo', 'Tiger', 'Deer', 'Monkey', 'Mongoose', 'Lion'],
  hi: ['अश्व', 'गज', 'मेष', 'सर्प', 'श्वान', 'मार्जार', 'मूषक', 'गौ', 'महिष', 'व्याघ्र', 'मृग', 'वानर', 'नकुल', 'सिंह'],
  as: ['অশ্ব', 'গজ', 'মেষ', 'সৰ্প', 'শ্বান', 'মাৰ্জাৰ', 'মূষিক', 'গৌ', 'মহিষ', 'ব্যাঘ্ৰ', 'মৃগ', 'বানৰ', 'নকুল', 'সিংহ'],
};

export const GANA_NAMES: Record<Language, Record<'deva' | 'manushya' | 'rakshasa', string>> = {
  en: { deva: 'Deva Gana', manushya: 'Manushya Gana', rakshasa: 'Rakshasa Gana' },
  hi: { deva: 'देव गण', manushya: 'मनुष्य गण', rakshasa: 'राक्षस गण' },
  as: { deva: 'দেৱ গণ', manushya: 'মনুষ্য গণ', rakshasa: 'ৰাক্ষস গণ' },
};

export const NADI_NAMES: Record<Language, Record<'adi' | 'madhya' | 'antya', string>> = {
  en: { adi: 'Adi (Vata)', madhya: 'Madhya (Pitta)', antya: 'Antya (Kapha)' },
  hi: { adi: 'आदि (वात)', madhya: 'मध्य (पित्त)', antya: 'अन्त्य (कफ)' },
  as: { adi: 'আদি (বাত)', madhya: 'মধ্য (পিত্ত)', antya: 'অন্ত্য (কফ)' },
};

export const VARNA_NAMES: Record<Language, Record<'brahmin' | 'kshatriya' | 'vaishya' | 'shudra', string>> = {
  en: { brahmin: 'Brahmin', kshatriya: 'Kshatriya', vaishya: 'Vaishya', shudra: 'Shudra' },
  hi: { brahmin: 'ब्राह्मण', kshatriya: 'क्षत्रिय', vaishya: 'वैश्य', shudra: 'शूद्र' },
  as: { brahmin: 'ব্ৰাহ্মণ', kshatriya: 'ক্ষত্ৰিয়', vaishya: 'বৈশ্য', shudra: 'শূদ্ৰ' },
};

export const PAYA_NAMES: Record<Language, Record<'gold' | 'silver' | 'copper' | 'iron', { name: string; note: string }>> = {
  en: {
    gold: { name: 'Swarna Paya (Gold)', note: 'Brings effort with eventual recognition and resilience.' },
    silver: { name: 'Rajata Paya (Silver)', note: 'Traditionally regarded as the most supportive transit foot.' },
    copper: { name: 'Tamra Paya (Copper)', note: 'Encourages steady progress, family support, and prosperity.' },
    iron: { name: 'Loha Paya (Iron)', note: 'Calls for patience, disciplined work, and calm perseverance.' },
  },
  hi: {
    gold: { name: 'स्वर्ण पाया', note: 'परिश्रम के साथ प्रतिष्ठा और धैर्य का फल देता है।' },
    silver: { name: 'रजत पाया', note: 'पारंपरिक रूप से सर्वाधिक अनुकूल पाया माना जाता है।' },
    copper: { name: 'ताम्र पाया', note: 'स्थिर उन्नति, पारिवारिक सहयोग और समृद्धि का सूचक।' },
    iron: { name: 'लोह पाया', note: 'धैर्य, अनुशासन और संयम से कार्य करने की प्रेरणा देता है।' },
  },
  as: {
    gold: { name: 'স্বৰ্ণ পায়া (সোণৰ পাদ)', note: 'পৰিশ্ৰমৰ অন্তত সন্মান আৰু দৃঢ়তা কঢ়িয়াই আনে।' },
    silver: { name: 'ৰজত পায়া (ৰূপৰ পাদ)', note: 'পৰম্পৰাগতভাৱে আটাইতকৈ অনুকূল আৰু শুভ পাদ হিচাপে গণ্য।' },
    copper: { name: 'তাম্ৰ পায়া (তামৰ পাদ)', note: 'স্থিৰ উন্নতি, পাৰিবাৰিক সহযোগিতা আৰু সমৃদ্ধিৰ সূচক।' },
    iron: { name: 'লোহ পায়া (লোৰ পাদ)', note: 'ধৈৰ্য, শৃংখলা আৰু শান্ত অধ্যৱসায়েৰে আগবাঢ়িবলৈ সূচায়।' },
  },
};

export const KOOTA_LABELS: Record<
  Language,
  Record<'varna' | 'vashya' | 'tara' | 'yoni' | 'grahaMaitri' | 'gana' | 'bhakoot' | 'nadi', { name: string; domain: string }>
> = {
  en: {
    varna: { name: 'Varna', domain: 'Spiritual & ego harmony' },
    vashya: { name: 'Vashya', domain: 'Mutual attraction & adaptability' },
    tara: { name: 'Tara', domain: 'Destiny & wellbeing rhythm' },
    yoni: { name: 'Yoni', domain: 'Instinctive & emotional rapport' },
    grahaMaitri: { name: 'Graha Maitri', domain: 'Mental friendship of Moon lords' },
    gana: { name: 'Gana', domain: 'Temperament compatibility' },
    bhakoot: { name: 'Bhakoot', domain: 'Family prosperity & emotional flow' },
    nadi: { name: 'Nadi', domain: 'Constitutional & progeny vitality' },
  },
  hi: {
    varna: { name: 'वर्ण', domain: 'आध्यात्मिक एवं कार्य-सामंजस्य' },
    vashya: { name: 'वश्य', domain: 'परस्पर आकर्षण एवं अनुकूलन' },
    tara: { name: 'तारा', domain: 'भाग्य एवं कल्याण तालमेल' },
    yoni: { name: 'योनि', domain: 'स्वाभाविक एवं भावनात्मक आत्मीयता' },
    grahaMaitri: { name: 'ग्रह मैत्री', domain: 'मानसिक मित्रता एवं विचार-साम्य' },
    gana: { name: 'गण', domain: 'स्वभाव एवं प्रकृति का मेल' },
    bhakoot: { name: 'भकूट', domain: 'गृहस्थ समृद्धि एवं भावनात्मक संतुलन' },
    nadi: { name: 'नाड़ी', domain: 'स्वास्थ्य, प्रकृति एवं संतति बल' },
  },
  as: {
    varna: { name: 'বৰ্ণ', domain: 'আধ্যাত্মিক আৰু কৰ্ম-সামঞ্জস্য' },
    vashya: { name: 'বশ্য', domain: 'পাৰস্পৰিক আকৰ্ষণ আৰু বুজাবুজি' },
    tara: { name: 'তাৰা', domain: 'ভাগ্য আৰু কুশল-মংগলৰ সংগতি' },
    yoni: { name: 'যোনি', domain: 'স্বাভাৱিক আৰু আৱেগিক ঘনিষ্ঠতা' },
    grahaMaitri: { name: 'গ্ৰহ মৈত্ৰী', domain: 'মানসিক বন্ধুত্ব আৰু চিন্তা-ধাৰাৰ মিল' },
    gana: { name: 'গণ', domain: 'স্বভাৱ আৰু প্ৰকৃতিৰ সামঞ্জস্য' },
    bhakoot: { name: 'ভকূট', domain: 'পাৰিবাৰিক সমৃদ্ধি আৰু আৱেগিক ভাৰসাম্য' },
    nadi: { name: 'নাড়ী', domain: 'স্বাস্থ্য, প্ৰকৃতি আৰু বংশগত জীৱনীশক্তি' },
  },
};

export interface NumerologyProfile {
  archetype: string;
  traits: string;
  luckyColors: string;
  luckyDays: string;
}

export const NUMEROLOGY_PROFILES: Record<Language, Record<number, NumerologyProfile>> = {
  en: {
    1: { archetype: 'Surya · Independent Leader', traits: 'Originality, clarity of purpose, natural initiative, and self-reliance.', luckyColors: 'Saffron, Gold, Warm Yellow', luckyDays: 'Sunday, Monday' },
    2: { archetype: 'Chandra · Intuitive Harmonizer', traits: 'Empathy, diplomacy, artistic sensitivity, and supportive partnership.', luckyColors: 'Pearl White, Cream, Pale Green', luckyDays: 'Monday, Friday' },
    3: { archetype: 'Guru · Wise Counselor', traits: 'Optimism, teaching ability, expansive thinking, and ethical leadership.', luckyColors: 'Turmeric Yellow, Saffron, Gold', luckyDays: 'Thursday, Tuesday' },
    4: { archetype: 'Rahu · Unconventional Builder', traits: 'Methodical discipline, fresh perspective, analytical depth, and endurance.', luckyColors: 'Electric Blue, Slate Grey, Khaki', luckyDays: 'Saturday, Sunday' },
    5: { archetype: 'Budha · Agile Communicator', traits: 'Quick intellect, adaptability, eloquence, and commercial insight.', luckyColors: 'Emerald Green, Ivory, Light Grey', luckyDays: 'Wednesday, Friday' },
    6: { archetype: 'Shukra · Graceful Creator', traits: 'Aesthetic refinement, devotion to family, diplomacy, and warm hospitality.', luckyColors: 'Ivory, Soft Rose, Sky Blue', luckyDays: 'Friday, Wednesday' },
    7: { archetype: 'Ketu · Contemplative Seeker', traits: 'Research orientation, inner discernment, spiritual curiosity, and independence.', luckyColors: 'Pale Yellow, Sandalwood, Sea Green', luckyDays: 'Monday, Thursday' },
    8: { archetype: 'Shani · Steadfast Architect', traits: 'Patience, structural mastery, fairness, and long-term karmic resilience.', luckyColors: 'Deep Navy, Charcoal, Dark Blue', luckyDays: 'Saturday, Friday' },
    9: { archetype: 'Mangala · Courageous Protector', traits: 'Vitality, humanitarian courage, decisive action, and principled strength.', luckyColors: 'Vermilion Red, Coral, Rust Gold', luckyDays: 'Tuesday, Thursday' },
  },
  hi: {
    1: { archetype: 'सूर्य · स्वतंत्र नेतृत्व', traits: 'मौलिक सोच, स्पष्ट संकल्प, आत्मविश्वास और स्वाभाविक नेतृत्व क्षमता।', luckyColors: 'केसरिया, सुनहरा, पीला', luckyDays: 'रविवार, सोमवार' },
    2: { archetype: 'चंद्र · संवेदनशील सामंजस्य', traits: 'सहज अंतर्दृष्टि, कोमल व्यवहार, कलात्मक रुचि और मधुर सहयोग।', luckyColors: 'मोती सफेद, क्रीम, हल्का हरा', luckyDays: 'सोमवार, शुक्रवार' },
    3: { archetype: 'गुरु · ज्ञान और मार्गदर्शन', traits: 'आशावाद, शिक्षण प्रवृत्ति, व्यापक दृष्टि और नैतिक नेतृत्व।', luckyColors: 'हल्दी पीला, केसरिया, स्वर्ण', luckyDays: 'गुरुवार, मंगलवार' },
    4: { archetype: 'राहु · व्यवस्थित अन्वेषक', traits: 'मौलिक दृष्टिकोण, विश्लेषणात्मक गहराई, अनुशासन और धैर्य।', luckyColors: 'नीला, स्लेटी, खाकी', luckyDays: 'शनिवार, रविवार' },
    5: { archetype: 'बुध · कुशल संवादकर्ता', traits: 'तीव्र बुद्धि, अनुकूलन क्षमता, वाक्पटुता और व्यापारिक सूझबूझ।', luckyColors: 'पन्ना हरा, हल्का सफेद, धूसर', luckyDays: 'बुधवार, शुक्रवार' },
    6: { archetype: 'शुक्र · सौंदर्य और सद्भाव', traits: 'कलात्मक रुचि, परिवार के प्रति निष्ठा, शालीनता और आतिथ्य भाव।', luckyColors: 'हल्का गुलाबी, क्रीम, आसमानी', luckyDays: 'शुक्रवार, बुधवार' },
    7: { archetype: 'केतु · चिंतनशील साधक', traits: 'गहन शोध प्रवृत्ति, विवेक, आध्यात्मिक जिज्ञासा और अंतर्मुखी स्पष्टता।', luckyColors: 'चंदन पीला, हल्का हरा, सफेद', luckyDays: 'सोमवार, गुरुवार' },
    8: { archetype: 'शनि · दृढ़ कर्मयोगी', traits: 'अथक परिश्रम, न्यायप्रियता, संगठन शक्ति और दीर्घकालिक स्थिरता।', luckyColors: 'गहरा नीला, स्लेटी, जामुनी', luckyDays: 'शनिवार, शुक्रवार' },
    9: { archetype: 'मंगल · साहसी रक्षक', traits: 'उच्च ऊर्जा, निर्भीक संकल्प, सेवा भाव और सिद्धांतनिष्ठ कर्मशीलता।', luckyColors: 'सिंदूरी लाल, मूंगा, केसरिया', luckyDays: 'मंगलवार, गुरुवार' },
  },
  as: {
    1: { archetype: 'সূৰ্য · স্বাধীন নেতৃত্ব', traits: 'মৌলিক চিন্তা, স্পষ্ট সংকল্প, আত্মবিশ্বাস আৰু স্বাভাৱিক নেতৃত্বগুণ।', luckyColors: 'গেৰুৱা, সোণালী, উজ্জ্বল হালধীয়া', luckyDays: 'দেওবাৰ, সোমবাৰ' },
    2: { archetype: 'চন্দ্ৰ · সংবেদনশীল সামঞ্জস্য', traits: 'সহজ অন্তৰ্দৃষ্টি, কোমল স্বভাৱ, শিল্পপ্ৰীতি আৰু মধুৰ সহযোগিতা।', luckyColors: 'মুকুতা বগা, ক্ৰীম, পাতল সেউজীয়া', luckyDays: 'সোমবাৰ, শুকুৰবাৰ' },
    3: { archetype: 'গুৰু · জ্ঞান আৰু মাৰ্গদৰ্শন', traits: 'আশাবাদ, শিক্ষাদানৰ প্ৰৱণতা, প্ৰশস্ত দৃষ্টিভংগী আৰু নৈতিক নেতৃত্ব।', luckyColors: 'হালধি বৰণীয়া, গেৰুৱা, সোণালী', luckyDays: 'বৃহস্পতিবাৰ, মঙলবাৰ' },
    4: { archetype: 'ৰাহু · সুসংগঠিত অন্বেষক', traits: 'ব্যতিক্ৰমী দৃষ্টিভংগী, বিশ্লেষণাত্মক গভীৰতা, শৃংখলা আৰু ধৈৰ্য।', luckyColors: 'নীলা, ধোঁৱা বৰণীয়া, খাকী', luckyDays: 'শনিবাৰ, দেওবাৰ' },
    5: { archetype: 'বুধ · দক্ষ বাৰ্তালাপকাৰী', traits: 'তীক্ষ্ণ বুদ্ধি, পৰিৱেশৰ সৈতে খাপ খোৱাৰ গুণ, বাক্পটুতা আৰু ব্যৱসায়িক দক্ষতা।', luckyColors: 'পান্না সেউজীয়া, কোমল বগা, পাতল ধূসৰ', luckyDays: 'বুধবাৰ, শুকুৰবাৰ' },
    6: { archetype: 'শুক্ৰ · সৌন্দৰ্য আৰু সম্প্ৰীতি', traits: 'কলাত্মক ৰুচি, পৰিয়ালৰ প্ৰতি নিষ্ঠা, শালীনতা আৰু আতিথ্যবোধ।', luckyColors: 'কোমল গোলাপী, ক্ৰীম, আকাশী নীলা', luckyDays: 'শুকুৰবাৰ, বুধবাৰ' },
    7: { archetype: 'কেতু · চিন্তাশীল সাধক', traits: 'গৱেষণাৰ আগ্ৰহ, গভীৰ বিবেক, আধ্যাত্মিক কৌতূহল আৰু অন্তৰ্মুখী স্পষ্টতা।', luckyColors: 'চন্দন হালধীয়া, পাতল সেউজীয়া, বগা', luckyDays: 'সোমবাৰ, বৃহস্পতিবাৰ' },
    8: { archetype: 'শনি · দৃঢ় কৰ্মযোগী', traits: 'নিৰন্তৰ অধ্যৱসায়, ন্যায়পৰায়ণতা, সাংগঠনিক দক্ষতা আৰু দীৰ্ঘম্যাদী স্থিৰতা।', luckyColors: 'ডাঠ নীলা, শিল বৰণীয়া, জামু', luckyDays: 'শনিবাৰ, শুকুৰবাৰ' },
    9: { archetype: 'মংগল · সাহসী ৰক্ষক', traits: 'প্ৰবল উদ্যম, নিৰ্ভীক সংকল্প, সেৱাভাৱ আৰু নীতিপৰায়ণ কৰ্মশক্তি।', luckyColors: 'সেন্দুৰীয়া ৰঙা, পলাশ, গেৰুৱা', luckyDays: 'মঙলবাৰ, বৃহস্পতিবাৰ' },
  },
};

export const CALC_UI = {
  en: {
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Aarav Sharma',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time (Local)',
    cityLabel: 'Birth City',
    customCoordsToggle: 'Use custom latitude / longitude',
    latLabel: 'Latitude (°N, -S)',
    lonLabel: 'Longitude (°E, -W)',
    utcOffsetLabel: 'UTC Offset (hours, e.g. 5.5 for IST)',
    calculateBtn: 'Calculate Now',
    liveEngineBadge: 'Live Sidereal Engine · Lahiri Ayanamsha',
    methodologyBadge: 'Computed client-side using VSOP87/ELP astronomical ephemeris & Lahiri (Chitrapaksha) Ayanamsha',
    printBtn: 'Print / Save PDF',
    northChart: 'North Indian Chart',
    southChart: 'South Indian Chart',
    lagnaTab: 'Lagna (D-1)',
    navamshaTab: 'Navamsha (D-9)',
    chandraTab: 'Chandra (Moon)',
    planetCol: 'Planet',
    signCol: 'Sidereal Rashi',
    degreeCol: 'Degree',
    nakshatraCol: 'Nakshatra (Pada)',
    houseCol: 'House',
    dignityCol: 'Status / Dignity',
    retrogradeTag: 'Retrograde',
    combustTag: 'Combust',
    dashaTitle: '120-Year Vimshottari Mahadasha Timeline',
    antardashaTitle: 'Antardasha Sub-Periods (Active Mahadasha)',
    currentTag: 'Active Now',
    ascendantLabel: 'Lagna (Ascendant)',
    moonSignLabel: 'Janma Rashi (Moon)',
    sunSignLabel: 'Surya Rashi (Sun)',
    birthNakshatraLabel: 'Janma Nakshatra',
    ayanamshaLabel: 'Lahiri Ayanamsha',
    partnerA: 'Partner A (First Chart)',
    partnerB: 'Partner B (Second Chart)',
    matchBtn: 'Calculate 36-Guna Ashtakoota Milan',
    gunaScoreLabel: 'Ashtakoota Score',
    verdicts: {
      excellent: 'Highly Compatible (Uttam Milan)',
      good: 'Favourable Compatibility (Shubh Milan)',
      moderate: 'Moderate Compatibility (Madhyam Milan)',
      caution: 'Needs Careful Astrological Review',
    },
    doshaCheckTitle: 'Classical Dosha & Parihara Evaluation',
    nadiStatus: 'Nadi Dosha',
    bhakootStatus: 'Bhakoot Dosha',
    mangalMatchStatus: 'Mangal Compatibility',
    presentLabel: 'Present',
    absentLabel: 'Not Present',
    cancelledLabel: 'Classical Parihara (Cancellation) Applies',
    balancedLabel: 'Balanced Between Both Charts',
    reviewLabel: 'Different Mangal Intensity — Consult Chart Details',
    sadeSatiStatusTitles: {
      rising: 'Active: Sade Sati Rising Phase (12th from Moon)',
      peak: 'Active: Sade Sati Peak Phase (1st / Janma Shani)',
      setting: 'Active: Sade Sati Setting Phase (2nd from Moon)',
      dhaiya_4: 'Active: Shani Dhaiya (Kantaka Shani — 4th from Moon)',
      dhaiya_8: 'Active: Shani Dhaiya (Ashtama Shani — 8th from Moon)',
      none: 'No Active Sade Sati or Shani Dhaiya Right Now',
    },
    phaseNames: {
      rising: 'Phase 1 · Rising (Udaya)',
      peak: 'Phase 2 · Peak (Shikhara)',
      setting: 'Phase 3 · Setting (Asta)',
    },
    mangalSeverityTitles: {
      none: 'No Mangal Dosha Detected',
      cancelled: 'Mangal Placement Cancelled by Classical Parihara',
      partial: 'Partial / Mild Mangal Influence',
      present: 'Mangal Dosha Present (Lagna & Chandra/Shukra)',
    },
    mangalCancellationText: {
      own_sign: 'Mars occupies its own sign (Mesha or Vrishchika), neutralizing harshness.',
      exalted: 'Mars is exalted in Makara (Capricorn), strengthening constructive energy.',
      jupiter_conjunction_or_aspect: 'Benefic Guru (Jupiter) conjoins or aspects Mars, conferring classical Parihara.',
      classical_sign_exception: 'Mars falls under a traditional house-and-sign exception cited in classical texts.',
    },
    dailyTab: 'Daily',
    weeklyTab: 'Weekly',
    monthlyTab: 'Monthly',
    liveTransitsTitle: 'Live Sidereal Planetary Transits (Lahiri Ayanamsha)',
    houseShort: 'House',
    selectDateLabel: 'Select Date',
    endsAtLabel: 'Ends',
    dayChoghadiyaTitle: 'Daytime Choghadiya (Sunrise to Sunset)',
    nightChoghadiyaTitle: 'Nighttime Choghadiya (Sunset to Next Sunrise)',
    auspiciousWindowsTitle: 'Key Auspicious Muhurat Windows',
    avoidWindowsTitle: 'Caution / Avoidance Windows',
    muhuratNote:
      'These Muhurat & Choghadiya intervals are calculated live from astronomical Sunrise, Sunset, Tithi, and Nakshatra for your chosen date and city. For major life ceremonies (Vivaha or Griha Pravesh), also match Tarabala and Chandrabala against individual birth charts.',
    copyInquiryBtn: 'Copy Formatted Inquiry',
    copiedBtn: 'Copied to Clipboard',
    openEmailBtn: 'Open in Email App',
    honestTransitNote:
      'Transit house positions above are computed live via VSOP87/ELP sidereal ephemeris (Lahiri Ayanamsha). The written outlook below offers traditional sign-level guidance; for personalized birth-chart timing, use our Free Kundli & Dasha engine.',
  },
  hi: {
    nameLabel: 'पूरा नाम',
    namePlaceholder: 'जैसे: आरव शर्मा',
    dateLabel: 'जन्म तिथि',
    timeLabel: 'जन्म समय (स्थानीय)',
    cityLabel: 'जन्म शहर',
    customCoordsToggle: 'कस्टम अक्षांश / देशांतर दर्ज करें',
    latLabel: 'अक्षांश (°N, -S)',
    lonLabel: 'देशांतर (°E, -W)',
    utcOffsetLabel: 'UTC अंतर (घंटे, IST के लिए 5.5)',
    calculateBtn: 'गणना करें',
    liveEngineBadge: 'लाइव निरयण गणना · लाहिड़ी अयनांश',
    methodologyBadge: 'VSOP87/ELP खगोलीय एफेमेरिस एवं लाहिड़ी (चित्रपक्ष) अयनांश द्वारा ब्राउज़र में लाइव गणना',
    printBtn: 'प्रिंट / PDF सहेजें',
    northChart: 'उत्तर भारतीय चक्र',
    southChart: 'दक्षिण भारतीय चक्र',
    lagnaTab: 'लग्न (D-1)',
    navamshaTab: 'नवमांश (D-9)',
    chandraTab: 'चंद्र कुंडली',
    planetCol: 'ग्रह',
    signCol: 'निरयण राशि',
    degreeCol: 'अंश',
    nakshatraCol: 'नक्षत्र (पाद)',
    houseCol: 'भाव',
    dignityCol: 'स्थिति / बल',
    retrogradeTag: 'वक्री',
    combustTag: 'अस्त',
    dashaTitle: '१२० वर्षीय विंशोत्तरी महादशा समयरेखा',
    antardashaTitle: 'अंतर्दशा उप-अवधि (सक्रिय महादशा)',
    currentTag: 'वर्तमान सक्रिय',
    ascendantLabel: 'लग्न',
    moonSignLabel: 'जन्म राशि (चंद्र)',
    sunSignLabel: 'सूर्य राशि',
    birthNakshatraLabel: 'जन्म नक्षत्र',
    ayanamshaLabel: 'लाहिड़ी अयनांश',
    partnerA: 'प्रथम कुंडली (वर / प्रथम व्यक्ति)',
    partnerB: 'द्वितीय कुंडली (वधू / द्वितीय व्यक्ति)',
    matchBtn: '३६ गुण अष्टकूट मिलान करें',
    gunaScoreLabel: 'अष्टकूट गुण योग',
    verdicts: {
      excellent: 'अत्यंत उत्तम मिलान',
      good: 'शुभ एवं अनुकूल मिलान',
      moderate: 'मध्यम मिलान',
      caution: 'विस्तृत ज्योतिषीय विचार अपेक्षित',
    },
    doshaCheckTitle: 'शास्त्रीय दोष एवं परिहार मूल्यांकन',
    nadiStatus: 'नाड़ी दोष',
    bhakootStatus: 'भकूट दोष',
    mangalMatchStatus: 'मंगल सामंजस्य',
    presentLabel: 'उपस्थित',
    absentLabel: 'दोष नहीं',
    cancelledLabel: 'शास्त्रीय परिहार (दोष भंग) लागू',
    balancedLabel: 'दोनों कुंडलियों में संतुलित',
    reviewLabel: 'मंगल प्रभाव में अंतर — विस्तृत समीक्षा करें',
    sadeSatiStatusTitles: {
      rising: 'सक्रिय: शनि साढ़ेसाती का उदय चरण (चंद्र से १२वां भाव)',
      peak: 'सक्रिय: शनि साढ़ेसाती का शिखर चरण (जन्म शनि · १ला भाव)',
      setting: 'सक्रिय: शनि साढ़ेसाती का अस्त चरण (चंद्र से २रा भाव)',
      dhaiya_4: 'सक्रिय: शनि ढैय्या (कंटक शनि · चंद्र से ४था भाव)',
      dhaiya_8: 'सक्रिय: शनि ढैय्या (अष्टम शनि · चंद्र से ८वां भाव)',
      none: 'वर्तमान में साढ़ेसाती या शनि ढैय्या सक्रिय नहीं है',
    },
    phaseNames: {
      rising: 'प्रथम चरण · उदय',
      peak: 'द्वितीय चरण · शिखर',
      setting: 'तृतीय चरण · अस्त',
    },
    mangalSeverityTitles: {
      none: 'मंगल दोष नहीं है',
      cancelled: 'शास्त्रीय परिहार द्वारा मंगल दोष भंग',
      partial: 'आंशिक मंगल प्रभाव',
      present: 'मंगल दोष उपस्थित (लग्न व चंद्र/शुक्र से)',
    },
    mangalCancellationText: {
      own_sign: 'मंगल अपनी स्वराशि (मेष या वृश्चिक) में स्थित होकर कठोरता शांत करता है।',
      exalted: 'मंगल मकर राशि में उच्च का होकर सकारात्मक बल प्रदान करता है।',
      jupiter_conjunction_or_aspect: 'शुभ बृहस्पति की युति या दृष्टि से मंगल दोष का शास्त्रीय परिहार होता है।',
      classical_sign_exception: 'शास्त्रोक्त भाव-राशि अपवाद के कारण मंगल दोष का प्रभाव न्यून होता है।',
    },
    dailyTab: 'दैनिक',
    weeklyTab: 'साप्ताहिक',
    monthlyTab: 'मासिक',
    liveTransitsTitle: 'वर्तमान लाइव निरयण ग्रह गोचर (लाहिड़ी अयनांश)',
    houseShort: 'भाव',
    selectDateLabel: 'तिथि चुनें',
    endsAtLabel: 'समाप्ति',
    dayChoghadiyaTitle: 'दिन का चौघड़िया (सूर्योदय से सूर्यास्त)',
    nightChoghadiyaTitle: 'रात्रि का चौघड़िया (सूर्यास्त से अगले सूर्योदय)',
    auspiciousWindowsTitle: 'प्रमुख शुभ मुहूर्त अवधि',
    avoidWindowsTitle: 'सतर्कता एवं त्याज्य काल',
    muhuratNote:
      'ये मुहूर्त और चौघड़िया चुने गए शहर व तिथि के वास्तविक सूर्योदय, सूर्यास्त, तिथि व नक्षत्र से लाइव गणित किए गए हैं। विवाह या गृह प्रवेश जैसे बड़े संस्कारों के लिए व्यक्तिगत जन्म राशि से ताराबल व चंद्रबल भी अवश्य मिलाएं।',
    copyInquiryBtn: 'संदेश कॉपी करें',
    copiedBtn: 'क्लिपबोर्ड पर कॉपी हो गया',
    openEmailBtn: 'ईमेल ऐप में खोलें',
    honestTransitNote:
      'ऊपर दिए गए ग्रह गोचर भाव लाहिड़ी अयनांश आधारित वास्तविक खगोलीय गणना हैं। नीचे दिया गया राशिफल सामान्य राशि-स्तरीय मार्गदर्शन है; व्यक्तिगत जन्म कुंडली फल के लिए निःशुल्क कुंडली व दशा टूल का उपयोग करें।',
  },
  as: {
    nameLabel: 'সম্পূৰ্ণ নাম',
    namePlaceholder: 'যেনে: আৰৱ শৰ্মা',
    dateLabel: 'জন্ম তাৰিখ',
    timeLabel: 'জন্ম সময় (স্থানীয়)',
    cityLabel: 'জন্ম চহৰ',
    customCoordsToggle: 'নিজস্ব অক্ষাংশ / দ্ৰাঘিমাংশ দিয়ক',
    latLabel: 'অক্ষাংশ (°N, -S)',
    lonLabel: 'দ্ৰাঘিমাংশ (°E, -W)',
    utcOffsetLabel: 'UTC পাৰ্থক্য (ঘণ্টা, ISTৰ বাবে 5.5)',
    calculateBtn: 'গণনা কৰক',
    liveEngineBadge: 'লাইভ নিৰয়ণ গণনা · লাহিড়ী অয়নাংশ',
    methodologyBadge: 'VSOP87/ELP খগোলীয় এফেমেৰিছ আৰু লাহিড়ী অয়নাংশ ব্যৱহাৰ কৰি ব্ৰাউজাৰত লাইভ গণনা',
    printBtn: 'প্ৰিণ্ট / PDF সংৰক্ষণ',
    northChart: 'উত্তৰ ভাৰতীয় চক্ৰ',
    southChart: 'দক্ষিণ ভাৰতীয় চক্ৰ',
    lagnaTab: 'লগ্ন (D-1)',
    navamshaTab: 'নৱমাংশ (D-9)',
    chandraTab: 'চন্দ্ৰ কুণ্ডলী',
    planetCol: 'গ্ৰহ',
    signCol: 'নিৰয়ণ ৰাশি',
    degreeCol: 'অংশ',
    nakshatraCol: 'নক্ষত্ৰ (পাদ)',
    houseCol: 'ভাৱ',
    dignityCol: 'স্থিতি / বল',
    retrogradeTag: 'বক্ৰী',
    combustTag: 'অস্ত',
    dashaTitle: '১২০ বছৰীয়া বিংশোত্তৰী মহাদশা সময়ৰেখা',
    antardashaTitle: 'অন্তৰ্দশা উপ-পৰ্যায় (সক্ৰিয় মহাদশা)',
    currentTag: 'বৰ্তমান সক্ৰিয়',
    ascendantLabel: 'লগ্ন',
    moonSignLabel: 'জন্ম ৰাশি (চন্দ্ৰ)',
    sunSignLabel: 'সূৰ্য ৰাশি',
    birthNakshatraLabel: 'জন্ম নক্ষত্ৰ',
    ayanamshaLabel: 'লাহিড়ী অয়নাংশ',
    partnerA: 'প্ৰথম কুণ্ডলী (প্ৰথম ব্যক্তি)',
    partnerB: 'দ্বিতীয় কুণ্ডলী (দ্বিতীয় ব্যক্তি)',
    matchBtn: '৩৬ গুণ অষ্টকূট মিলন গণনা কৰক',
    gunaScoreLabel: 'অষ্টকূট গুণ যোগ',
    verdicts: {
      excellent: 'অত্যন্ত উত্তম মিলন',
      good: 'শুভ আৰু অনুকূল মিলন',
      moderate: 'মধ্যমীয়া মিলন',
      caution: 'বিস্তাৰিত জ্যোতিষীয় বিচাৰ প্ৰয়োজন',
    },
    doshaCheckTitle: 'শাস্ত্ৰীয় দোষ আৰু পৰিহাৰ মূল্যায়ন',
    nadiStatus: 'নাড়ী দোষ',
    bhakootStatus: 'ভকূট দোষ',
    mangalMatchStatus: 'মংগল সামঞ্জস্য',
    presentLabel: 'উপস্থিত',
    absentLabel: 'দোষ নাই',
    cancelledLabel: 'শাস্ত্ৰীয় পৰিহাৰ (দোষ ভংগ) প্ৰযোজ্য',
    balancedLabel: 'দুয়োখন কুণ্ডলীতে ভাৰসাম্যপূৰ্ণ',
    reviewLabel: 'মংগল প্ৰভাৱত পাৰ্থক্য — বিস্তাৰিত বিচাৰ কৰক',
    sadeSatiStatusTitles: {
      rising: 'সক্ৰিয়: শনিৰ সাঢ়েসাতীৰ উদয় পৰ্যায় (চন্দ্ৰৰ পৰা ১২শ ভাৱ)',
      peak: 'সক্ৰিয়: শনিৰ সাঢ়েসাতীৰ শিখৰ পৰ্যায় (জন্ম শনি · ১ম ভাৱ)',
      setting: 'সক্ৰিয়: শনিৰ সাঢ়েসাতীৰ অস্ত পৰ্যায় (চন্দ্ৰৰ পৰা ২য় ভাৱ)',
      dhaiya_4: 'সক্ৰিয়: শনিৰ ঢৈয়া (কণ্টক শনি · চন্দ্ৰৰ পৰা ৪ৰ্থ ভাৱ)',
      dhaiya_8: 'সক্ৰিয়: শনিৰ ঢৈয়া (অষ্টম শনি · চন্দ্ৰৰ পৰা ৮ম ভাৱ)',
      none: 'বৰ্তমান শনিৰ সাঢ়েসাতী বা ঢৈয়া সক্ৰিয় হৈ থকা নাই',
    },
    phaseNames: {
      rising: 'প্ৰথম পৰ্যায় · উদয়',
      peak: 'দ্বিতীয় পৰ্যায় · শিখৰ',
      setting: 'তৃতীয় পৰ্যায় · অস্ত',
    },
    mangalSeverityTitles: {
      none: 'মংগল দোষ পোৱা নগ’ল',
      cancelled: 'শাস্ত্ৰীয় পৰিহাৰৰ দ্বাৰা মংগল দোষ ভংগ হৈছে',
      partial: 'আংশিক মংগল প্ৰভাৱ',
      present: 'মংগল দোষ উপস্থিত (লগ্ন আৰু চন্দ্ৰ/শুক্ৰৰ পৰা)',
    },
    mangalCancellationText: {
      own_sign: 'মংগল স্বৰাশিত (মেষ বা বৃশ্চিক) থকাৰ বাবে কঠোৰতা প্ৰশমিত হয়।',
      exalted: 'মংগল মকৰ ৰাশিত উচ্চস্থ হৈ ইতিবাচক শক্তি প্ৰদান কৰে।',
      jupiter_conjunction_or_aspect: 'শুভ বৃহস্পতিৰ যুতি বা দৃষ্টিয়ে মংগল দোষৰ শাস্ত্ৰীয় পৰিহাৰ সাধন কৰে।',
      classical_sign_exception: 'শাস্ত্ৰীয় ভাৱ-ৰাশি ব্যতিক্ৰম অনুসৰি মংগল দোষৰ প্ৰভাৱ লাঘৱ হয়।',
    },
    dailyTab: 'দৈনিক',
    weeklyTab: 'সাপ্তাহিক',
    monthlyTab: 'মাহেকীয়া',
    liveTransitsTitle: 'বৰ্তমান লাইভ নিৰয়ণ গ্ৰহ গোচৰ (লাহিড়ী অয়নাংশ)',
    houseShort: 'ভাৱ',
    selectDateLabel: 'তাৰিখ বাছনি কৰক',
    endsAtLabel: 'সমাপ্তি',
    dayChoghadiyaTitle: 'দিনৰ চৌঘড়িয়া (সূৰ্যোদয়ৰ পৰা সূৰ্যাস্তলৈ)',
    nightChoghadiyaTitle: 'নিশাৰ চৌঘড়িয়া (সূৰ্যাস্তৰ পৰা পিছদিনাৰ সূৰ্যোদয়লৈ)',
    auspiciousWindowsTitle: 'মুখ্য শুভ মুহূৰ্তৰ সময়',
    avoidWindowsTitle: 'সতৰ্কতা আৰু পৰিহাৰযোগ্য কাল',
    muhuratNote:
      'এই মুহূৰ্ত আৰু চৌঘড়িয়া নিৰ্বাচিত চহৰ তথা তাৰিখৰ বাস্তৱ সূৰ্যোদয়, সূৰ্যাস্ত, তিথি আৰু নক্ষত্ৰৰ পৰা লাইভ গণনা কৰা হৈছে। বিবাহ বা গৃহপ্ৰৱেশৰ দৰে গুৰুত্বপূৰ্ণ মাংগলিক কাৰ্যৰ বাবে ব্যক্তিগত জন্ম ৰাশি অনুসৰি তাৰাবল আৰু চন্দ্ৰবলো মিলাই লোৱা উচিত।',
    copyInquiryBtn: 'বাৰ্তা কপি কৰক',
    copiedBtn: 'ক্লিপব’ৰ্ডত কপি হ’ল',
    openEmailBtn: 'ইমেইল এপত খোলক',
    honestTransitNote:
      'ওপৰত দেখুওৱা গ্ৰহ গোচৰ ভাৱসমূহ লাহিড়ী অয়নাংশ ভিত্তিক বাস্তৱ খগোলীয় গণনা। তলৰ ৰাশিফল সাধাৰণ ৰাশিভিত্তিক মাৰ্গদৰ্শন; ব্যক্তিগত জন্ম কুণ্ডলী আৰু বিংশোত্তৰী দশাৰ বাবে বিনামূলীয়া কুণ্ডলী সঁজুলি ব্যৱহাৰ কৰক।',
  },
} as const;
