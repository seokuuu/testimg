import { PRESETS } from '../../entities/preset/presets.js'

export const state = {
  currentMode: 'resolution',
  resSubMode: 'preset',
  currentW: 1920,
  currentH: 1080,
  inputW: '1920',
  inputH: '1080',
  currentFormat: 'image/jpeg',
  targetSizeMB: 5,
  inputSize: '5',
  showInfo: true,
  selectedPreset: PRESETS.find(p => p.w === 1920 && p.h === 1080) ?? null,
}
