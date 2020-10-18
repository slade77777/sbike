import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import vi from './vi.json';

const resources = {
  en,
  vi,
};

const lng =
  RNLocalize.findBestAvailableLanguage(Object.keys(resources))?.languageTag ||
  'en';

i18n.use(initReactI18next).init({
  resources,
  lng: lng,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
