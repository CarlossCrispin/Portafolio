/* Casos de Trabajo (historial/03-04). Todos recreados con datos ficticios. */
export interface Caso {
  slug: string
  titulo: string
  bajada: string
  nivel: 'CASO PRINCIPAL' | 'SEGUNDA LÍNEA'
  listo: boolean
}

export const CASOS: Caso[] = [
  { slug: 'mapa', titulo: 'Mapa de ubicación', bajada: 'Del requisito "tabla" al problema real.', nivel: 'CASO PRINCIPAL', listo: true },
  { slug: 'tablas-densas', titulo: 'Tablas de datos densos', bajada: 'Búsqueda por columna y "ver más".', nivel: 'CASO PRINCIPAL', listo: false },
  { slug: 'sistema-de-diseno', titulo: 'Sistema de diseño', bajada: 'Construido desde cero para productos de datos.', nivel: 'SEGUNDA LÍNEA', listo: false },
  { slug: 'sistema-editorial', titulo: 'Sistema editorial con IA', bajada: 'Concepto y dirección míos; variantes orquestadas con IA.', nivel: 'SEGUNDA LÍNEA', listo: false },
]

/* Caso del mapa: datos ficticios (el original es de una institución de gobierno y no se publica). */
export const MAPA = {
  filas: [
    { hora: '22:10', zona: 'Zona A', llamadas: 14 },
    { hora: '22:25', zona: 'Zona B', llamadas: 9 },
    { hora: '22:40', zona: 'Zona A', llamadas: 11 },
    { hora: '23:05', zona: 'Zona C', llamadas: 6 },
    { hora: '23:30', zona: 'Zona B', llamadas: 8 },
    { hora: '23:45', zona: 'Zona D', llamadas: 5 },
  ],
  ficha: [
    ['ROL', 'Diseño UX/UI'],
    ['PRODUCTO', 'Seguridad e inteligencia'],
    ['ESTADO', 'En producción · declarado'],
  ] as const,
  secciones: [
    { titulo: 'Requisito original', texto: 'La historia de usuario pedía una tabla con el historial de llamadas.' },
    { titulo: 'Problema real', texto: 'Acercar al analista a una zona probable, no dejarlo solo con números.' },
    { titulo: 'Alternativas', texto: 'En redacción: aquí irán las alternativas que se llevaron a la mesa.', pendiente: true },
    { titulo: 'Decisión', texto: 'Dashboard con mapa, ruta preliminar y radio de alcance. La ruta se rotula como hipótesis para que no se confunda con un hecho.' },
    { titulo: 'Resultado', texto: 'Aprobada y en producción en una institución de gobierno. Declarado: no verificable públicamente.' },
    { titulo: 'Qué aprendí', texto: 'En redacción.', pendiente: true },
  ] as { titulo: string; texto: string; pendiente?: boolean }[],
}
