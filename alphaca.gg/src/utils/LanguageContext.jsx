import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('ko'); // 기본값을 'ko'로 설정

    const changeLanguage = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
