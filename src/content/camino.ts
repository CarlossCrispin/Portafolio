/* Camino · de lo más reciente a lo más antiguo. Fuente: LinkedIn de Carlos (cargos y fechas declarados).
   Octopy es hoy BlackHole. */
import type { Idioma } from '../i18n'

export interface Hito { fecha: string; titulo: string; texto: string; pendiente?: boolean; href?: string }
export interface PaginaHitos { etiqueta: string; titular: string; bajada?: string; hitos: Hito[] }

export const CAMINO: Record<Idioma, PaginaHitos> = {
  es: {
    etiqueta: 'CAMINO',
    titular: 'De escribir código a diseñar para quien lo usa.',
    hitos: [
      {
        fecha: 'NOV. 2022 – HOY · BLACKHOLE',
        titulo: 'User Experience Engineer',
        texto: 'Lidero el diseño de experiencias de usuario en proyectos de robótica, visión computacional y desarrollo de software. Combino estructura y empatía para transformar la complejidad técnica en experiencias claras, funcionales y accesibles.',
      },
      {
        fecha: 'JUL. 2021 – NOV. 2023 · OCTOPY',
        titulo: 'Desarrollador de front-end',
        texto: 'Desarrollé interfaces para una plataforma forense de voz, transformando requerimientos complejos en experiencias claras mediante visualizaciones interactivas, formularios dinámicos y componentes accesibles y optimizados para rendimiento.',
      },
      { fecha: '2019–2021', titulo: 'Docencia y comunidad', texto: 'Clases de programación web a adultos principiantes (PILARES CDMX) y charlas sobre Angular + Firebase y frameworks.' },
    ],
  },
  en: {
    etiqueta: 'JOURNEY',
    titular: 'From writing code to designing for the people who use it.',
    hitos: [
      {
        fecha: 'NOV 2022 – PRESENT · BLACKHOLE',
        titulo: 'User Experience Engineer',
        texto: 'I lead the design of user experiences in robotics, computer vision and software development projects. I combine structure and empathy to turn technical complexity into clear, functional and accessible experiences.',
      },
      {
        fecha: 'JUL 2021 – NOV 2023 · OCTOPY',
        titulo: 'Front-end developer',
        texto: 'I built interfaces for a voice forensics platform, turning complex requirements into clear experiences through interactive visualizations, dynamic forms and accessible, performance-optimized components.',
      },
      { fecha: '2019–2021', titulo: 'Teaching and community', texto: 'Web programming classes for adult beginners (PILARES CDMX) and talks on Angular + Firebase and frameworks.' },
    ],
  },
}
