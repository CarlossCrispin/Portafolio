/** Orden de la pista, de arriba (Claro) a abajo (Oscuro). */
export const TEMAS = ['claro', 'contraste-alto', 'salvia', 'durazno', 'monokai', 'ciruela', 'oscuro'] as const
export type Tema = (typeof TEMAS)[number]

/** Tema inicial según el sistema. No se guarda nada entre visitas (decisión de Carlos). */
export function temaInicial(): Tema {
  if (window.matchMedia('(prefers-contrast: more)').matches) return 'contraste-alto'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

export function aplicarTema(t: Tema) {
  document.documentElement.setAttribute('data-theme', t)
}
