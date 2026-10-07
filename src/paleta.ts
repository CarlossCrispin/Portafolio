/* Copia en TS de los 7 modos de la pista (mismos valores que src/styles/tokens.css).
   Sirve para mezclar colores mientras se arrastra el sol. `npm run contraste` verifica que coincidan. */

export const ETIQUETAS = {
  claro: 'Claro',
  salvia: 'Salvia',
  durazno: 'Durazno',
  ciruela: 'Ciruela',
  oscuro: 'Oscuro',
  monokai: 'Monokai',
  'contraste-alto': 'Alto contraste',
} as const

export type Token = 'bg' | 'fg' | 'muted' | 'line' | 'accent-fill' | 'on-accent' | 'accent-text'

export const PALETA: Record<keyof typeof ETIQUETAS, Record<Token, string>> = {
  claro:   { 'bg': '#FDFDFD', 'fg': '#0A0A0A', 'muted': '#55555C', 'line': '#D9D9DE', 'accent-fill': '#BEF264', 'on-accent': '#0A0A0A', 'accent-text': '#3F6212' },
  salvia:  { 'bg': '#C8D3C1', 'fg': '#232B1F', 'muted': '#46513F', 'line': '#9DAE92', 'accent-fill': '#BEF264', 'on-accent': '#232B1F', 'accent-text': '#2F4A0C' },
  durazno: { 'bg': '#FECBA8', 'fg': '#A82C00', 'muted': '#7A3A1A', 'line': '#E3A67F', 'accent-fill': '#BEF264', 'on-accent': '#272728', 'accent-text': '#A82C00' },
  ciruela: { 'bg': '#4A2146', 'fg': '#F6C6E0', 'muted': '#D9A8CC', 'line': '#7A4C75', 'accent-fill': '#BEF264', 'on-accent': '#272728', 'accent-text': '#BEF264' },
  monokai: { 'bg': '#26293D', 'fg': '#C8B4E8', 'muted': '#A99BCB', 'line': '#474B6B', 'accent-fill': '#BEF264', 'on-accent': '#26293D', 'accent-text': '#BEF264' },
  oscuro:  { 'bg': '#27272A', 'fg': '#FAFAFA', 'muted': '#A1A1AA', 'line': '#3F3F46', 'accent-fill': '#BEF264', 'on-accent': '#27272A', 'accent-text': '#BEF264' },
  'contraste-alto': { 'bg': '#FFFFFF', 'fg': '#000000', 'muted': '#3F3F46', 'line': '#52525B', 'accent-fill': '#BEF264', 'on-accent': '#272728', 'accent-text': '#14532D' },
}

export const TOKENS_COLOR = Object.keys(PALETA.claro) as Token[]

const aRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

/** Mezcla lineal en sRGB entre dos colores hex. t va de 0 a 1. */
export function mezclar(a: string, b: string, t: number): string {
  const [ra, rb] = [aRgb(a), aRgb(b)]
  return '#' + ra.map((v, i) => Math.round(v + (rb[i] - v) * t).toString(16).padStart(2, '0')).join('')
}

const luminancia = (h: string) => {
  const c = aRgb(h).map((v) => v / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
/** Relación de contraste WCAG entre dos colores hex. */
export function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
