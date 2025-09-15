import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'
import AsyncStorage from '@react-native-async-storage/async-storage'

const en = require('../locales/en.json')
const pt = require('../locales/pt.json')
const STORAGE_KEY = '@lang'

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, pt: { translation: pt } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export async function loadLanguage() {
  const stored = await AsyncStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'pt') {
    await i18n.changeLanguage(stored)
    return
  }
  const best = RNLocalize.findBestAvailableLanguage(['en', 'pt'])
  const lng = best && best.languageTag && best.languageTag.startsWith('pt') ? 'pt' : 'en'
  await AsyncStorage.setItem(STORAGE_KEY, lng)
  await i18n.changeLanguage(lng)
}

export async function setAppLanguage(lng: 'en' | 'pt') {
  await AsyncStorage.setItem(STORAGE_KEY, lng)
  await i18n.changeLanguage(lng)
}

export default i18n
