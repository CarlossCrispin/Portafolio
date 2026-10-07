import type { Idioma } from '../i18n'

const RUTAS = ['/', '/trabajo', '/camino', '/laboratorio', '/por-que', '/contacto', '/tokens'] as const
const NOMBRES: Record<Idioma, string[]> = {
  es: ['Inicio', 'Trabajo', 'Camino', 'Laboratorio', 'Por qué', 'Contacto', 'Tokens'],
  en: ['Home', 'Work', 'Journey', 'Lab', 'Why', 'Contact', 'Tokens'],
}

/* La última entrada (Tokens) es temporal de la fase 1: se quita antes de publicar. Las rutas se mantienen en español. */
export const secciones = (idioma: Idioma) =>
  RUTAS.map((ruta, i) => ({ n: String(i + 1).padStart(2, '0'), nombre: NOMBRES[idioma][i], ruta }))
