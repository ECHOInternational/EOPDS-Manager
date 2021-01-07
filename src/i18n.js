import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    saveMissing: true,
    backend: {
      projectId: '8a959e7c-9cdf-4310-8ad2-d6ff4b62f904',
      apiKey: '09daecc7-5f25-435b-aea7-776da08703cc',
      referenceLng: 'en',
      allowedAddOrUpdateHosts: ['localhost', 'localhost:3001'],
      saveMissing: true,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;