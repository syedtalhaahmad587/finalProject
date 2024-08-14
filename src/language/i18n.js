import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json'; // Adjust the path as necessary

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
