
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  language: 'en' | 'de';
  setLanguage: (language: 'en' | 'de') => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'de'>('de');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'de';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: 'en' | 'de') => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
