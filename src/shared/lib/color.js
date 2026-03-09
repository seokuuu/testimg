// MB 구간별로 자동 할당: 0~1, 1~2, ... (1MB 단위, 20개)
export const COLOR_PALETTES = [
  { bg: '#1a1a2e', text: '#e0e0ff' }, // ~1MB
  { bg: '#16213e', text: '#a8d8ea' }, // ~2MB
  { bg: '#0f3460', text: '#f5f5f5' }, // ~3MB
  { bg: '#533483', text: '#ffe0f0' }, // ~4MB
  { bg: '#2d6a4f', text: '#d8f3dc' }, // ~5MB
  { bg: '#1b4332', text: '#95d5b2' }, // ~6MB
  { bg: '#7b2d00', text: '#ffe8d6' }, // ~7MB
  { bg: '#6d2b3d', text: '#ffd6e0' }, // ~8MB
  { bg: '#1a3a4a', text: '#b2ebf2' }, // ~9MB
  { bg: '#2c2c54', text: '#c8b6ff' }, // ~10MB
  { bg: '#4a4e69', text: '#f2e9e4' }, // ~11MB
  { bg: '#3d405b', text: '#e0fbfc' }, // ~12MB
  { bg: '#264653', text: '#e9c46a' }, // ~13MB
  { bg: '#2a9d8f', text: '#264653' }, // ~14MB
  { bg: '#e9c46a', text: '#264653' }, // ~15MB
  { bg: '#f4a261', text: '#1a1a1a' }, // ~16MB
  { bg: '#e76f51', text: '#fff8f0' }, // ~17MB
  { bg: '#6a0572', text: '#f8c8ff' }, // ~18MB
  { bg: '#0d7377', text: '#e0f7fa' }, // ~19MB
  { bg: '#14213d', text: '#fca311' }, // ~20MB
]

export function getPalette(targetMB) {
  const idx = Math.min(19, Math.max(0, Math.floor(targetMB) - 1))
  return COLOR_PALETTES[idx]
}

export function getColors(currentMode, targetSizeMB, currentW, currentH) {
  if (currentMode === 'filesize') {
    return getPalette(targetSizeMB)
  }
  const pixels = currentW * currentH
  const idx = Math.min(19, Math.floor(pixels / (7680 * 4320 / 20)))
  return COLOR_PALETTES[idx]
}

export function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}
