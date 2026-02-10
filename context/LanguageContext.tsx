
import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../utils/translations';

type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    // Default to 'es' if no saved language or invalid value
    return (saved === 'en' || saved === 'pt') ? saved : 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    // @ts-ignore
    let value = translations[language];
    
    // Simple flat key lookup for now as defined in translations.ts
    // @ts-ignore
    const result = value[key];

    if (!result) {
      console.warn(`Missing translation for key: ${key} in language: ${language}`);
      return key; // Fallback to key if translation missing
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
