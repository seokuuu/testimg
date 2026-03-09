import { MESSAGES, type Lang } from '../../shared/i18n/messages.js'

export let lang: Lang = navigator.language?.startsWith('ko') ? 'ko' : 'en'
export let t = MESSAGES[lang]

export function toggleLang() {
  lang = lang === 'en' ? 'ko' : 'en'
  t = MESSAGES[lang]
}

export function setLang(newLang: Lang) {
  lang = newLang
  t = MESSAGES[lang]
}
