import type { Idioma } from '../i18n'

/* Landing de una sola página: cada sección es un bloque con su id (ancla). El menú hace scroll suave a cada una. */
export const IDS_SECCION = ['inicio', 'trabajo', 'camino', 'laboratorio', 'por-que', 'contacto'] as const
export type IdSeccion = (typeof IDS_SECCION)[number]

const NOMBRES: Record<Idioma, string[]> = {
  es: ['Inicio', 'Trabajo', 'Camino', 'Laboratorio', 'Por qué', 'Contacto'],
  en: ['Home', 'Work', 'Journey', 'Lab', 'Why', 'Contact'],
}

export const secciones = (idioma: Idioma) =>
  IDS_SECCION.map((id, i) => ({ n: String(i + 1).padStart(2, '0'), nombre: NOMBRES[idioma][i], id }))
