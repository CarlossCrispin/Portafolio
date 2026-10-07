/* Textos finales de las pestañas del Inicio (historial/09-textos-pestanas.md), en español e inglés. */
import type { Idioma } from '../i18n'

export type Parte = string | { codigo: string }

export interface Audiencia {
  id: string
  etiqueta: string
  texto: Parte[]
}

export const AUDIENCIAS: Record<Idioma, Audiencia[]> = {
  es: [
    { id: 'cualquiera', etiqueta: 'Para cualquiera', texto: ['Transformo datos y problemas complejos en colores, formas y experiencias humanas. Autodidacta por supervivencia desde 1988; aprendo, cuestiono y comparto lo que descubro.'] },
    { id: 'reclutadores', etiqueta: 'Reclutadores', texto: ['Diseñador UX/UI con mirada de producto, en camino a Product Design. Conecto UX, diseño de interfaces y código para convertir requerimientos complejos en productos digitales claros y funcionales.'] },
    { id: 'lideres', etiqueta: 'Líderes de producto', texto: ['Me muevo bien entre la ambigüedad y la complejidad. Cuestiono supuestos, conecto perspectivas y ayudo a convertir problemas difusos en soluciones concretas, sin perder de vista al usuario.'] },
    { id: 'designers', etiqueta: 'Product Designers', texto: ['Me pidieron una tabla. Propuse un mapa. Investigo, estructuro información y diseño sistemas e interfaces que hacen comprensible lo complejo.'] },
    { id: 'desarrolladores', etiqueta: 'Desarrolladores', texto: ['Soy ', { codigo: '{diseño + código}' }, '. Construyo interfaces y sistemas de diseño con React, TypeScript y Tailwind. Diseño pensando en la implementación, la accesibilidad y la consistencia.'] },
    { id: 'docencia', etiqueta: 'Docencia y comunidad', texto: ['Enseñé HTML y CSS a personas que nunca habían programado y compartí conocimientos de desarrollo web en el TecNM Tláhuac. Creo en hacer comprensible lo complejo y en una tecnología accesible para todas y todos.'] },
  ],
  en: [
    { id: 'cualquiera', etiqueta: 'For anyone', texto: ['I turn complex data and problems into colors, shapes and human experiences. Self-taught out of necessity since 1988; I learn, question and share what I find.'] },
    { id: 'reclutadores', etiqueta: 'Recruiters', texto: ['UX/UI designer with a product mindset, on the way to Product Design. I connect UX, interface design and code to turn complex requirements into clear, functional digital products.'] },
    { id: 'lideres', etiqueta: 'Product leaders', texto: ['I move comfortably through ambiguity and complexity. I question assumptions, connect perspectives and help turn fuzzy problems into concrete solutions, without losing sight of the user.'] },
    { id: 'designers', etiqueta: 'Product Designers', texto: ['They asked me for a table. I proposed a map. I research, structure information and design systems and interfaces that make the complex understandable.'] },
    { id: 'desarrolladores', etiqueta: 'Developers', texto: ['I am ', { codigo: '{design + code}' }, '. I build interfaces and design systems with React, TypeScript and Tailwind. I design with implementation, accessibility and consistency in mind.'] },
    { id: 'docencia', etiqueta: 'Teaching and community', texto: ['I taught HTML and CSS to people who had never programmed and shared web development knowledge at TecNM Tláhuac. I believe in making the complex understandable and in technology that is accessible to everyone.'] },
  ],
}

/* Frase del splash (editable). */
export const FRASE_SPLASH: Record<Idioma, string> = {
  es: 'Diseño soluciones digitales',
  en: 'I design digital solutions',
}
