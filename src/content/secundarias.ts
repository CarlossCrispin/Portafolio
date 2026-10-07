import type { Idioma } from '../i18n'
import type { PaginaHitos } from './camino'

/* Laboratorio, Por qué y Contacto · textos de los frames v2 de Figma, en español e inglés.
   Lo pendiente se muestra como "En redacción" y no se inventa contenido. */
export const LABORATORIO: Record<Idioma, PaginaHitos> = {
  es: {
    etiqueta: 'LABORATORIO',
    titular: 'La IA como herramienta de diseño.',
    bajada: 'Qué decido yo y qué orquesto con IA.',
    hitos: [
      { fecha: 'SISTEMA EDITORIAL', titulo: 'Brochures con control de calidad', texto: 'Concepto, análisis y dirección de arte: míos. Variantes: orquestadas con IA.' },
      { fecha: 'PENDIENTE', titulo: 'Flujo con Claude', texto: 'En redacción.', pendiente: true },
      { fecha: 'PENDIENTE', titulo: 'Experimentos', texto: 'En redacción.', pendiente: true },
    ],
  },
  en: {
    etiqueta: 'LAB',
    titular: 'AI as a design tool.',
    bajada: 'What I decide and what I orchestrate with AI.',
    hitos: [
      { fecha: 'EDITORIAL SYSTEM', titulo: 'Brochures with quality control', texto: 'Concept, analysis and art direction: mine. Variants: orchestrated with AI.' },
      { fecha: 'PENDING', titulo: 'Workflow with Claude', texto: 'Draft in progress.', pendiente: true },
      { fecha: 'PENDING', titulo: 'Experiments', texto: 'Draft in progress.', pendiente: true },
    ],
  },
}

export const POR_QUE: Record<Idioma, PaginaHitos> = {
  es: {
    etiqueta: 'POR QUÉ',
    titular: 'Reducir la distancia entre la persona y la información.',
    hitos: [
      { fecha: 'ORIGEN · DOCENCIA', titulo: 'Brecha digital', texto: 'Enseñar programación a adultos principiantes me enseñó a diseñar para quien empieza.' },
      { fecha: 'SESGOS COGNITIVOS', titulo: 'Cómo comunicar la incertidumbre', texto: 'Una ruta "preliminar" evita que el analista confunda una hipótesis con un hecho.' },
      { fecha: 'PENDIENTE', titulo: 'Texto personal', texto: 'En redacción.', pendiente: true },
    ],
  },
  en: {
    etiqueta: 'WHY',
    titular: 'Shrinking the distance between people and information.',
    hitos: [
      { fecha: 'ORIGIN · TEACHING', titulo: 'Digital divide', texto: 'Teaching programming to adult beginners taught me to design for people who are just starting.' },
      { fecha: 'COGNITIVE BIASES', titulo: 'How to communicate uncertainty', texto: 'A "preliminary" route keeps the analyst from mistaking a hypothesis for a fact.' },
      { fecha: 'PENDING', titulo: 'Personal text', texto: 'Draft in progress.', pendiente: true },
    ],
  },
}

export const CONTACTO: Record<Idioma, PaginaHitos> = {
  es: {
    etiqueta: 'CONTACTO',
    titular: 'Hablemos.',
    bajada: 'Cuéntame qué datos hay que volver claros.',
    hitos: [
      { fecha: 'CORREO', titulo: 'Escribirme por correo', texto: 'carlos.crispin.cc@gmail.com', href: 'mailto:carlos.crispin.cc@gmail.com' },
      { fecha: 'LINKEDIN', titulo: 'LinkedIn', texto: 'linkedin.com/in/carlos-crispin', href: 'https://www.linkedin.com/in/carlos-crispin/' },
    ],
  },
  en: {
    etiqueta: 'CONTACT',
    titular: "Let's talk.",
    bajada: 'Tell me which data needs to be made clear.',
    hitos: [
      { fecha: 'EMAIL', titulo: 'Write to me by email', texto: 'carlos.crispin.cc@gmail.com', href: 'mailto:carlos.crispin.cc@gmail.com' },
      { fecha: 'LINKEDIN', titulo: 'LinkedIn', texto: 'linkedin.com/in/carlos-crispin', href: 'https://www.linkedin.com/in/carlos-crispin/' },
    ],
  },
}
