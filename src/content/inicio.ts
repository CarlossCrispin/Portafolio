/* Textos finales de las pestañas del Inicio (historial/09-textos-pestanas.md). */
export type Parte = string | { codigo: string }

export interface Audiencia {
  id: string
  etiqueta: string
  texto: Parte[]
}

export const AUDIENCIAS: Audiencia[] = [
  { id: 'cualquiera', etiqueta: 'Para cualquiera', texto: ['Transformo datos y problemas complejos en colores, formas y experiencias humanas. Autodidacta por supervivencia desde 1988; aprendo, cuestiono y comparto lo que descubro.'] },
  { id: 'reclutadores', etiqueta: 'Reclutadores', texto: ['Diseñador UX/UI con mirada de producto, en camino a Product Design. Conecto UX, diseño de interfaces y código para convertir requerimientos complejos en productos digitales claros y funcionales.'] },
  { id: 'lideres', etiqueta: 'Líderes de producto', texto: ['Me muevo bien entre la ambigüedad y la complejidad. Cuestiono supuestos, conecto perspectivas y ayudo a convertir problemas difusos en soluciones concretas, sin perder de vista al usuario.'] },
  { id: 'designers', etiqueta: 'Product Designers', texto: ['Me pidieron una tabla. Propuse un mapa. Investigo, estructuro información y diseño sistemas e interfaces que hacen comprensible lo complejo.'] },
  { id: 'desarrolladores', etiqueta: 'Desarrolladores', texto: ['Soy ', { codigo: '{diseño + código}' }, '. Construyo interfaces y sistemas de diseño con React, TypeScript y Tailwind. Diseño pensando en la implementación, la accesibilidad y la consistencia.'] },
  { id: 'docencia', etiqueta: 'Docencia y comunidad', texto: ['Enseñé HTML y CSS a personas que nunca habían programado y compartí conocimientos de desarrollo web en el TecNM Tláhuac. Creo en hacer comprensible lo complejo y en una tecnología accesible para todas y todos.'] },
]
