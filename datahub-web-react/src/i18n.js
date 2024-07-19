import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// eslint import/no-unresolved
import intervalPlural from 'i18next-intervalplural-postprocessor';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

import * as enTranslation from './conf/locales/en/translation.json';
import * as enEmptyMessage from './conf/locales/en/empty-message.json';
import * as enForm from './conf/locales/en/form.json';
import * as enReactCron from './conf/locales/en/react-cron.json';
import * as enTheme from './conf/locales/en/theme.json';
import * as frTranslation from './conf/locales/fr/translation.json';
import * as frEmptyMessage from './conf/locales/fr/empty-message.json';
import * as frForm from './conf/locales/fr/form.json';
import * as frReactCron from './conf/locales/fr/react-cron.json';
import * as frTheme from './conf/locales/fr/theme.json';

import * as ptTranslation from './conf/locales/pt/translation.json';
import * as ptEmptyMessage from './conf/locales/pt/empty-message.json';
import * as ptForm from './conf/locales/pt/form.json';
import * as ptReactCron from './conf/locales/pt/react-cron.json';
import * as ptTheme from './conf/locales/pt/theme.json';

const resources = {
    en: {
        translation: enTranslation.default,
        'empty-message': enEmptyMessage.default,
        form: enForm.default,
        'react-cron': enReactCron.default,
        theme: enTheme.default,
    },
    fr: {
        translation: frTranslation.default,
        'empty-message': frEmptyMessage.default,
        form: frForm.default,
        'react-cron': frReactCron.default,
        theme: frTheme.default,
    },
    pt: {
        translation: ptTranslation.default,
        'empty-message': ptEmptyMessage.default,
        form: ptForm.default,
        'react-cron': ptReactCron.default,
        theme: ptTheme.default,
    }
};

i18n
    // add interval module
    .use(intervalPlural)
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    // .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'pt',
        debug: true,
        resources,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
