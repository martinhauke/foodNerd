import {defaultLang, languages, ui} from './ui';

export function getLangFromUrl(url: URL) {
  const pattern = /\/(en|de)\//
  const matches = url.pathname.match(pattern)
  if (matches === null) {
    return defaultLang
  }
  const [_,lang] = matches
  if (lang in languages) {
    return lang as keyof typeof languages
  }
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}