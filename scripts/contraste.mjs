// Verifica contraste AA de cada tema leyendo src/styles/tokens.css. Uso: node scripts/contraste.mjs
import { readFileSync } from 'node:fs'
const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')
const temas = {}
for (const m of css.matchAll(/:root(?:\[data-theme="([^"]+)"\])?[^{]*\{([^}]*)\}/g)) {
  const vars = {}
  for (const v of m[2].matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)) vars[v[1]] = v[2]
  if (Object.keys(vars).length >= 7) temas[m[1] ?? 'claro'] = { ...(temas[m[1] ?? 'claro'] ?? {}), ...vars }
}
const lum = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
const pares = [['fg', 'bg'], ['muted', 'bg'], ['accent-text', 'bg'], ['on-accent', 'accent-fill']]
let fallos = 0
for (const [t, v] of Object.entries(temas)) {
  const fila = pares.map(([a, b]) => { const r = ratio(v[a], v[b]); if (r < 4.5) fallos++; return `${a}/${b} ${r.toFixed(1)}${r < 4.5 ? ' ✗' : ''}` })
  console.log(t.padEnd(15), fila.join(' · '))
}
console.log(fallos ? `\n${fallos} par(es) bajo 4.5:1` : '\nTodos los pares de texto pasan AA (≥ 4.5:1)')
process.exit(fallos ? 1 : 0)
