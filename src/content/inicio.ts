/* Textos de las pestañas del Inicio, en español e inglés. Versión V2 (23–25 palabras por pestaña); la V1 está guardada en memoria como "inicio V1". */
import type { Idioma } from '../i18n'

export type Parte = string | { codigo: string }

export interface Audiencia {
  id: string
  etiqueta: string
  texto: Parte[]
}

export const AUDIENCIAS: Record<Idioma, Audiencia[]> = {
  es: [
    { id: 'cualquiera', etiqueta: 'Para cualquier persona', texto: ['Transformo problemas complejos en productos digitales e interfaces claras, funcionales y humanas. ', 'Aprendo por curiosidad, cuestiono por necesidad y comparto lo que descubro.'] },
    { id: 'reclutadores', etiqueta: 'Reclutadores', texto: ['Diseño UX/UI + Frontend Developer. ', 'Diseño productos digitales de principio a fin, del problema a la interfaz. ', 'Me muevo entre diseño y desarrollo.'] },
    { id: 'lideres', etiqueta: 'Líderes de producto', texto: ['Cuestiono el problema antes de diseñar la solución. ', 'Conecto contexto, negocio, usuario y tecnología para convertir ambigüedad en dirección e ideas difusas en soluciones.'] },
    { id: 'designers', etiqueta: 'Diseñadores de producto', texto: ['Me pidieron una tabla. Propuse un mapa. ', 'Estructuro la información y la represento con arquitectura, mapas y visualización de datos para hacer comprensible lo complejo.'] },
    { id: 'desarrolladores', etiqueta: 'Desarrolladores', texto: [{ codigo: 'producto(problema) => experiencia' }, ' Pienso en componentes, estados y accesibilidad desde el diseño. ', 'Diseñar ≠ entregar pantallas. Diseñar = entender cómo se construyen.'] },
    { id: 'docencia', etiqueta: 'Enseñanza y comunidad', texto: ['Enseñar me enseñó a explicar. ', 'Adapto cómo comunico según la persona y busco maneras sencillas de explicar lo complejo para que otros construyan solos.'] },
  ],
  en: [
    { id: 'cualquiera', etiqueta: 'For anyone', texto: ['I turn complex problems into clear, functional, human products and interfaces. ', 'I learn out of curiosity, question out of necessity, and share what I discover.'] },
    { id: 'reclutadores', etiqueta: 'Recruiters', texto: ['UX/UI Design + Frontend Developer. ', 'I design digital products from end to end, from problem to interface. ', 'I move between design and development.'] },
    { id: 'lideres', etiqueta: 'Product leaders', texto: ['I question the problem before designing the solution. ', 'I connect context, business, users, and technology to turn ambiguity into direction and fuzzy ideas into solutions.'] },
    { id: 'designers', etiqueta: 'Product Designers', texto: ['They asked me for a table. I proposed a map. ', 'I structure information through architecture, maps, and data visualization to make complexity understandable.'] },
    { id: 'desarrolladores', etiqueta: 'Developers', texto: [{ codigo: 'product(problem) => experience' }, ' I think about components, states, behavior, and accessibility from design. ', 'Designing ≠ delivering screens. Designing = understanding how they are built.'] },
    { id: 'docencia', etiqueta: 'Teaching and community', texto: ['Teaching taught me to explain. ', 'I adapt how I communicate to each person and find simple ways to explain complex ideas so others build alone.'] },
  ],
}

/* Frase del splash (editable). */
export const FRASE_SPLASH: Record<Idioma, string> = {
  es: 'Diseño soluciones digitales',
  en: 'I design digital solutions',
}
