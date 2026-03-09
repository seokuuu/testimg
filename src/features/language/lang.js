import { MESSAGES } from '../../shared/i18n/messages.js'

export let lang = navigator.language?.startsWith('ko') ? 'ko' : 'en'
export let t = MESSAGES[lang]

export function toggleLang() {
  lang = lang === 'en' ? 'ko' : 'en'
  t = MESSAGES[lang]
}

export function setLang(newLang) {
  lang = newLang
  t = MESSAGES[lang]
}
