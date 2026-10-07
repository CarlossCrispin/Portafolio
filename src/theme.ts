export const TEMAS = ['claro', 'salvia', 'durazno', 'ciruela', 'oscuro'] as const
export type Tema = (typeof TEMAS)[number] | 'contraste-alto'

/** Tema inicial según el sistema. No se guarda nada entre visitas (decisión de Carlos). */
export function temaInicial(): Tema {
  if (window.matchMedia('(prefers-contrast: more)').matches) return 'contraste-alto'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

export function aplicarTema(t: Tema) {
  document.documentElement.setAttribute('data-theme', t)
}
