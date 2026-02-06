import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.start': 'Start Assessment',
    
    // Hero
    'hero.badge': 'AI-Powered Career Guidance',
    'hero.title': 'Your Future,',
    'hero.titleHighlight': 'Guided by AI',
    'hero.subtitle': 'Personalized career guidance for rural students. Discover careers that match your skills, interests, and local opportunities.',
    'hero.cta': 'Start Your Journey',
    'hero.secondary': 'Learn More',
    'hero.students': 'Students Guided',
    'hero.careers': 'Career Paths',
    'hero.languages': 'Languages',
    
    // Features
    'features.title': 'How Margadarshi AI Works',
    'features.subtitle': 'A simple, intelligent process to discover your ideal career path',
    'features.step1.title': 'Tell Us About You',
    'features.step1.desc': 'Share your education, interests, and goals through our conversational assessment',
    'features.step2.title': 'AI Analysis',
    'features.step2.desc': 'Our AI analyzes your profile against thousands of career paths and local opportunities',
    'features.step3.title': 'Get Your Roadmap',
    'features.step3.desc': 'Receive personalized career recommendations with step-by-step guidance',
    
    // Trust
    'trust.title': 'Trusted & Transparent',
    'trust.subtitle': 'Built with ethics, accessibility, and your success in mind',
    'trust.ethics': 'Ethical AI',
    'trust.ethicsDesc': 'No over-promising. Realistic, achievable career paths based on your actual profile.',
    'trust.accessible': 'Rural-First Design',
    'trust.accessibleDesc': 'Low data usage, simple language, works on basic smartphones.',
    'trust.transparent': 'AI Transparency',
    'trust.transparentDesc': 'See exactly why each career is recommended with our AI reasoning panel.',
    
    // Onboarding
    'onboarding.step1': 'Education',
    'onboarding.step2': 'Subjects',
    'onboarding.step3': 'Interests',
    'onboarding.step4': 'Location',
    'onboarding.step5': 'Finances',
    'onboarding.next': 'Continue',
    'onboarding.back': 'Back',
    'onboarding.complete': 'Get My Career Match',
    
    'onboarding.edu.title': 'What is your education level?',
    'onboarding.edu.subtitle': 'Select your current or highest completed education',
    'onboarding.edu.10th': '10th Standard',
    'onboarding.edu.12th': '12th Standard',
    'onboarding.edu.graduate': 'Graduate',
    'onboarding.edu.postgraduate': 'Post Graduate',
    
    'onboarding.subjects.title': 'Your Academic Performance',
    'onboarding.subjects.subtitle': 'Rate your performance in key subjects',
    
    'onboarding.interests.title': 'What interests you?',
    'onboarding.interests.subtitle': 'Select all areas that excite you',
    
    'onboarding.location.title': 'Where are you from?',
    'onboarding.location.subtitle': 'Help us find opportunities near you',
    
    'onboarding.finance.title': 'Financial Considerations',
    'onboarding.finance.subtitle': 'This helps us suggest realistic paths',
    
    // Results
    'results.title': 'Your Career Match',
    'results.subtitle': 'Based on your unique profile and local opportunities',
    'results.matchScore': 'Match Score',
    'results.breakdown': 'Score Breakdown',
    'results.academic': 'Academic Fit',
    'results.skill': 'Skill Fit',
    'results.interest': 'Interest Fit',
    'results.opportunity': 'Local Opportunity',
    'results.salary': 'Expected Salary Range',
    'results.time': 'Time to Achieve',
    'results.roadmap': 'Your Career Roadmap',
    'results.aiReasoning': 'AI Reasoning',
    'results.whyThis': 'Why This Career?',
    'results.explore': 'Explore More Careers',
    'results.download': 'Download Report',
    
    // Footer
    'footer.tagline': 'Empowering rural India with AI-powered career guidance',
    'footer.links': 'Quick Links',
    'footer.support': 'Support',
    'footer.contact': 'Contact Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2024 Margadarshi AI. Built for Career Guidance.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.features': 'विशेषताएं',
    'nav.start': 'मूल्यांकन शुरू करें',
    
    // Hero
    'hero.badge': 'AI-संचालित करियर मार्गदर्शन',
    'hero.title': 'आपका भविष्य,',
    'hero.titleHighlight': 'AI द्वारा निर्देशित',
    'hero.subtitle': 'ग्रामीण छात्रों के लिए व्यक्तिगत करियर मार्गदर्शन। अपने कौशल, रुचियों और स्थानीय अवसरों से मेल खाने वाले करियर खोजें।',
    'hero.cta': 'अपनी यात्रा शुरू करें',
    'hero.secondary': 'और जानें',
    'hero.students': 'छात्रों को मार्गदर्शन',
    'hero.careers': 'करियर पथ',
    'hero.languages': 'भाषाएं',
    
    // Features
    'features.title': 'Margadarshi AI कैसे काम करता है',
    'features.subtitle': 'अपने आदर्श करियर पथ को खोजने की एक सरल, बुद्धिमान प्रक्रिया',
    'features.step1.title': 'हमें अपने बारे में बताएं',
    'features.step1.desc': 'हमारे संवादात्मक मूल्यांकन के माध्यम से अपनी शिक्षा, रुचियां और लक्ष्य साझा करें',
    'features.step2.title': 'AI विश्लेषण',
    'features.step2.desc': 'हमारा AI हजारों करियर पथों और स्थानीय अवसरों के विरुद्ध आपकी प्रोफ़ाइल का विश्लेषण करता है',
    'features.step3.title': 'अपना रोडमैप प्राप्त करें',
    'features.step3.desc': 'चरण-दर-चरण मार्गदर्शन के साथ व्यक्तिगत करियर अनुशंसाएं प्राप्त करें',
    
    // Results
    'results.title': 'आपका करियर मैच',
    'results.subtitle': 'आपकी अनूठी प्रोफ़ाइल और स्थानीय अवसरों के आधार पर',
    'results.matchScore': 'मैच स्कोर',
    'results.breakdown': 'स्कोर विवरण',
    'results.academic': 'शैक्षणिक फिट',
    'results.skill': 'कौशल फिट',
    'results.interest': 'रुचि फिट',
    'results.opportunity': 'स्थानीय अवसर',
    'results.salary': 'अपेक्षित वेतन सीमा',
    'results.time': 'प्राप्त करने का समय',
    'results.roadmap': 'आपका करियर रोडमैप',
    'results.aiReasoning': 'AI तर्क',
    'results.whyThis': 'यह करियर क्यों?',
    'results.explore': 'और करियर देखें',
    'results.download': 'रिपोर्ट डाउनलोड करें',
    
    // Onboarding
    'onboarding.next': 'जारी रखें',
    'onboarding.back': 'वापस',
    'onboarding.complete': 'मेरा करियर मैच प्राप्त करें',
    'onboarding.edu.title': 'आपकी शिक्षा का स्तर क्या है?',
    'onboarding.edu.subtitle': 'अपनी वर्तमान या उच्चतम पूर्ण शिक्षा चुनें',
    
    // Footer
    'footer.tagline': 'AI-संचालित करियर मार्गदर्शन के साथ ग्रामीण भारत को सशक्त बनाना',
    'footer.copyright': '© 2024 Margadarshi AI। करियर मार्गदर्शन के लिए बनाया गया।',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.about': 'మా గురించి',
    'nav.features': 'ఫీచర్లు',
    'nav.start': 'అంచనా ప్రారంభించండి',
    
    // Hero
    'hero.badge': 'AI-ఆధారిత కెరీర్ మార్గదర్శకత్వం',
    'hero.title': 'మీ భవిష్యత్తు,',
    'hero.titleHighlight': 'AI ద్వారా మార్గదర్శకత్వం',
    'hero.subtitle': 'గ్రామీణ విద్యార్థులకు వ్యక్తిగత కెరీర్ మార్గదర్శకత్వం. మీ నైపుణ్యాలు, ఆసక్తులు మరియు స్థానిక అవకాశాలకు సరిపోయే కెరీర్లను కనుగొనండి.',
    'hero.cta': 'మీ ప్రయాణాన్ని ప్రారంభించండి',
    'hero.secondary': 'మరింత తెలుసుకోండి',
    'hero.students': 'విద్యార్థులకు మార్గదర్శకత్వం',
    'hero.careers': 'కెరీర్ మార్గాలు',
    'hero.languages': 'భాషలు',
    
    // Features
    'features.title': 'Margadarshi AI ఎలా పనిచేస్తుంది',
    'features.subtitle': 'మీ ఆదర్శ కెరీర్ మార్గాన్ని కనుగొనడానికి ఒక సరళమైన, తెలివైన ప్రక్రియ',
    
    // Results
    'results.title': 'మీ కెరీర్ మ్యాచ్',
    'results.subtitle': 'మీ ప్రత్యేక ప్రొఫైల్ మరియు స్థానిక అవకాశాల ఆధారంగా',
    'results.matchScore': 'మ్యాచ్ స్కోర్',
    
    // Onboarding
    'onboarding.next': 'కొనసాగించు',
    'onboarding.back': 'వెనుకకు',
    'onboarding.complete': 'నా కెరీర్ మ్యాచ్ పొందండి',
    
    // Footer
    'footer.tagline': 'AI-ఆధారిత కెరీర్ మార్గదర్శకత్వంతో గ్రామీణ భారతదేశాన్ని శక్తివంతం చేయడం',
    'footer.copyright': '© 2024 Margadarshi AI. కెరీర్ మార్గదర్శకత్వం కోసం నిర్మించబడింది.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
