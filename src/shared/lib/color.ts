export type Palette = { bg: string; text: string }
export type Mode = 'resolution' | 'filesize'

export const COLOR_PALETTES: Palette[] = [
  { bg: '#1a1a2e', text: '#e0e0ff' },
  { bg: '#16213e', text: '#a8d8ea' },
  { bg: '#0f3460', text: '#f5f5f5' },
  { bg: '#533483', text: '#ffe0f0' },
  { bg: '#2d6a4f', text: '#d8f3dc' },
  { bg: '#1b4332', text: '#95d5b2' },
  { bg: '#7b2d00', text: '#ffe8d6' },
  { bg: '#6d2b3d', text: '#ffd6e0' },
  { bg: '#1a3a4a', text: '#b2ebf2' },
  { bg: '#2c2c54', text: '#c8b6ff' },
  { bg: '#4a4e69', text: '#f2e9e4' },
  { bg: '#3d405b', text: '#e0fbfc' },
  { bg: '#264653', text: '#e9c46a' },
  { bg: '#2a9d8f', text: '#264653' },
  { bg: '#e9c46a', text: '#264653' },
  { bg: '#f4a261', text: '#1a1a1a' },
  { bg: '#e76f51', text: '#fff8f0' },
  { bg: '#6a0572', text: '#f8c8ff' },
  { bg: '#0d7377', text: '#e0f7fa' },
  { bg: '#14213d', text: '#fca311' },
]

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}
