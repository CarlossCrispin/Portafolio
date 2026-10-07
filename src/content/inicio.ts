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
    { id: 'cualquiera', etiqueta: 'Para cualquier persona', texto: ['Transformo problemas complejos en productos digitales e interfaces claras, funcionales y humanas. ', 'Aprendo por curiosidad, cuestiono por necesidad y comparto lo que descubro.'] },
    { id: 'reclutadores', etiqueta: 'Reclutadores', texto: ['Diseño UX/UI + Frontend Developer. ', 'Diseño productos digitales de principio a fin, conectando problemas, arquitectura de información, sistemas de diseño, interfaces y tecnología. ', 'Puedo moverme entre diseño y desarrollo para convertir problemas complejos en productos que las personas puedan entender, usar y hacer propios.'] },
    { id: 'lideres', etiqueta: 'Líderes de producto', texto: ['Cuestiono el problema antes de diseñar la solución. ', 'Conecto contexto, información, negocio, usuario y tecnología para transformar la ambigüedad en dirección y las ideas difusas en soluciones concretas.'] },
    { id: 'designers', etiqueta: 'Diseñadores de producto', texto: ['Me pidieron una tabla. Propuse un mapa. ', 'Exploro el contexto, estructuro la información y encuentro formas de representarla mediante arquitectura, mapas y visualización de datos para hacer comprensible lo complejo.'] },
    { id: 'desarrolladores', etiqueta: 'Desarrolladores', texto: [{ codigo: 'product(problem) => experience' }, ' Pienso en componentes, estados, comportamiento y accesibilidad desde el diseño. Entiendo las restricciones técnicas, hablo el lenguaje del desarrollo y puedo moverme de Figma → React → Figma para explorar, validar y mejorar. ', 'Diseñar ≠ entregar pantallas. Diseñar = entender cómo se construyen.'] },
    { id: 'docencia', etiqueta: 'Docencia y comunidad', texto: ['Enseñar me enseñó a explicar. ', 'Adapto mi forma de comunicar según la persona, encuentro maneras sencillas de explicar conceptos complejos y comparto conocimiento para que otros puedan construir por sí mismos. ', 'También descubrí que enseñar mejora mi propia forma de pensar, estructurar y diseñar.'] },
  ],
  en: [
    { id: 'cualquiera', etiqueta: 'For anyone', texto: ['I turn complex problems into clear, functional, human digital products and interfaces. ', 'I learn out of curiosity, question out of necessity, and share what I discover.'] },
    { id: 'reclutadores', etiqueta: 'Recruiters', texto: ['UX/UI Design + Frontend Developer. ', 'I design digital products from end to end, connecting problems, information architecture, design systems, interfaces, and technology. ', 'I move between design and development to turn complex problems into products people can understand, use, and make their own.'] },
    { id: 'lideres', etiqueta: 'Product leaders', texto: ['I question the problem before designing the solution. ', 'I connect context, information, business, users, and technology to turn ambiguity into direction and fuzzy ideas into concrete solutions.'] },
    { id: 'designers', etiqueta: 'Product Designers', texto: ['They asked me for a table. I proposed a map. ', 'I explore context, structure information, and find ways to represent it through architecture, maps, and data visualization to make complexity understandable.'] },
    { id: 'desarrolladores', etiqueta: 'Developers', texto: [{ codigo: 'product(problem) => experience' }, ' I think about components, states, behavior, and accessibility from the design stage. I understand technical constraints, speak the language of development, and can move from Figma → React → Figma to explore, validate, and improve. ', 'Designing ≠ delivering screens. Designing = understanding how they are built.'] },
    { id: 'docencia', etiqueta: 'Teaching and community', texto: ['Teaching taught me how to explain. ', 'I adapt how I communicate to the person, find simple ways to explain complex concepts, and share knowledge so others can build for themselves. ', 'I also discovered that teaching improves the way I think, structure, and design.'] },
  ],
}

/* Frase del splash (editable). */
export const FRASE_SPLASH: Record<Idioma, string> = {
  es: 'Diseño soluciones digitales',
  en: 'I design digital solutions',
}
