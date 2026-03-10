import { createContext, useContext, useState, type ReactNode } from 'react'
import { PRESETS, type Preset } from '../../../entities/preset/presets.js'
import { MESSAGES, type Lang, type Messages } from '../../../shared/i18n/messages.js'
import type { Mode } from '../../../shared/lib/color.js'

type AppContextValue = {
  lang: Lang
  t: Messages
  currentMode: Mode
  resSubMode: 'preset' | 'manual'
  setResSubMode: (v: 'preset' | 'manual') => void
  currentW: number
  currentH: number
  inputW: string
  inputH: string
  currentFormat: string
  setCurrentFormat: (v: string) => void
  targetSizeMB: number
  inputSize: string
  showInfo: boolean
  setShowInfo: (v: boolean) => void
  selectedPreset: Preset | null
  isGenerateDisabled: boolean
  toggleLang: () => void
  setMode: (mode: Mode) => void
  setWidth: (raw: string) => void
  setHeight: (raw: string) => void
  setSize: (raw: string) => void
  selectPreset: (preset: Preset) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(navigator.language?.startsWith('ko') ? 'ko' : 'en')
  const [currentMode, setCurrentMode] = useState<Mode>('resolution')
  const [resSubMode, setResSubMode] = useState<'preset' | 'manual'>('preset')
  const [currentW, setCurrentW] = useState(1920)
  const [currentH, setCurrentH] = useState(1080)
  const [inputW, setInputW] = useState('1920')
  const [inputH, setInputH] = useState('1080')
  const [currentFormat, setCurrentFormat] = useState('image/jpeg')
  const [targetSizeMB, setTargetSizeMB] = useState(5)
  const [inputSize, setInputSize] = useState('5')
  const [showInfo, setShowInfo] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(
    PRESETS.find(p => p.w === 1920 && p.h === 1080) ?? null
  )

  const t = MESSAGES[lang]

  function toggleLang() {
    setLang(prev => (prev === 'en' ? 'ko' : 'en'))
  }

  function setMode(mode: Mode) {
    if (mode === 'filesize' && currentFormat === 'image/png') setCurrentFormat('image/jpeg')
    setCurrentMode(mode)
  }

  function setWidth(raw: string) {
    setInputW(raw)
    const v = parseInt(raw)
    if (v >= 1) setCurrentW(v)
  }

  function setHeight(raw: string) {
    setInputH(raw)
    const v = parseInt(raw)
    if (v >= 1) setCurrentH(v)
  }

  function setSize(raw: string) {
    const cleaned = raw.replace(/[^0-9]/g, '')
    setInputSize(cleaned)
    const v = parseInt(cleaned)
    if (v >= 1) setTargetSizeMB(v)
  }

  function selectPreset(preset: Preset) {
    setSelectedPreset(preset)
    setCurrentW(preset.w)
    setCurrentH(preset.h)
    setInputW(String(preset.w))
    setInputH(String(preset.h))
  }

  const isGenerateDisabled =
    (currentMode === 'resolution' && (
      (resSubMode === 'manual' && (inputW === '' || inputH === '')) ||
      currentW > 8000 || currentH > 8000
    )) ||
    (currentMode === 'filesize' && inputSize === '')

  return (
    <AppContext.Provider value={{
      lang, t,
      currentMode, resSubMode, setResSubMode,
      currentW, currentH, inputW, inputH,
      currentFormat, setCurrentFormat,
      targetSizeMB, inputSize,
      showInfo, setShowInfo,
      selectedPreset,
      isGenerateDisabled,
      toggleLang, setMode, setWidth, setHeight, setSize, selectPreset,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
