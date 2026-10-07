/* Casos de Trabajo (historial/03-04). Todos recreados con datos ficticios. */
import type { Idioma } from '../i18n'

export interface Caso {
  slug: string
  titulo: string
  bajada: string
  nivel: 'principal' | 'segunda'
  listo: boolean
}

export const CASOS: Record<Idioma, Caso[]> = {
  es: [
    { slug: 'mapa', titulo: 'Mapa de ubicación', bajada: 'Del requisito "tabla" al problema real.', nivel: 'principal', listo: true },
    { slug: 'tablas-densas', titulo: 'Tablas de datos densos', bajada: 'Búsqueda por columna y "ver más".', nivel: 'principal', listo: false },
    { slug: 'sistema-de-diseno', titulo: 'Sistema de diseño', bajada: 'Construido desde cero para productos de datos.', nivel: 'segunda', listo: false },
    { slug: 'sistema-editorial', titulo: 'Sistema editorial con IA', bajada: 'Concepto y dirección míos; variantes orquestadas con IA.', nivel: 'segunda', listo: false },
  ],
  en: [
    { slug: 'mapa', titulo: 'Location map', bajada: 'From the "table" requirement to the real problem.', nivel: 'principal', listo: true },
    { slug: 'tablas-densas', titulo: 'Dense data tables', bajada: 'Search by column and "see more".', nivel: 'principal', listo: false },
    { slug: 'sistema-de-diseno', titulo: 'Design system', bajada: 'Built from scratch for data products.', nivel: 'segunda', listo: false },
    { slug: 'sistema-editorial', titulo: 'Editorial system with AI', bajada: 'Concept and direction mine; variants orchestrated with AI.', nivel: 'segunda', listo: false },
  ],
}

/* Caso del mapa: datos ficticios (el original es de una institución de gobierno y no se publica). */
interface SeccionCaso { titulo: string; texto: string; pendiente?: boolean }
interface DatosMapa { titulo: string; filas: { hora: string; zona: string; llamadas: number }[]; ficha: [string, string][]; secciones: SeccionCaso[] }

const FILAS = [['22:10', 'A', 14], ['22:25', 'B', 9], ['22:40', 'A', 11], ['23:05', 'C', 6], ['23:30', 'B', 8], ['23:45', 'D', 5]] as const

export const MAPA: Record<Idioma, DatosMapa> = {
  es: {
    titulo: 'Mapa de ubicación',
    filas: FILAS.map(([hora, z, llamadas]) => ({ hora, zona: `Zona ${z}`, llamadas })),
    ficha: [['ROL', 'Diseño UX/UI'], ['PRODUCTO', 'Seguridad e inteligencia'], ['ESTADO', 'En producción · declarado']],
    secciones: [
      { titulo: 'Requisito original', texto: 'La historia de usuario pedía una tabla con el historial de llamadas.' },
      { titulo: 'Problema real', texto: 'Acercar al analista a una zona probable, no dejarlo solo con números.' },
      { titulo: 'Alternativas', texto: 'En redacción: aquí irán las alternativas que se llevaron a la mesa.', pendiente: true },
      { titulo: 'Decisión', texto: 'Dashboard con mapa, ruta preliminar y radio de alcance. La ruta se rotula como hipótesis para que no se confunda con un hecho.' },
      { titulo: 'Resultado', texto: 'Aprobada y en producción en una institución de gobierno. Declarado: no verificable públicamente.' },
      { titulo: 'Qué aprendí', texto: 'En redacción.', pendiente: true },
    ],
  },
  en: {
    titulo: 'Location map',
    filas: FILAS.map(([hora, z, llamadas]) => ({ hora, zona: `Zone ${z}`, llamadas })),
    ficha: [['ROLE', 'UX/UI design'], ['PRODUCT', 'Security and intelligence'], ['STATUS', 'In production · declared']],
    secciones: [
      { titulo: 'Original requirement', texto: 'The user story asked for a table with the call history.' },
      { titulo: 'Real problem', texto: 'Bring the analyst closer to a probable zone instead of leaving them alone with numbers.' },
      { titulo: 'Alternatives', texto: 'Draft in progress: the alternatives that were put on the table will go here.', pendiente: true },
      { titulo: 'Decision', texto: 'A dashboard with a map, a preliminary route and a reach radius. The route is labeled as a hypothesis so it is not mistaken for a fact.' },
      { titulo: 'Result', texto: 'Approved and in production at a government institution. Declared: not publicly verifiable.' },
      { titulo: 'What I learned', texto: 'Draft in progress.', pendiente: true },
    ],
  },
}
