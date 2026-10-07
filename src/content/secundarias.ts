import type { PaginaHitos } from './camino'

/* Laboratorio, Por qué y Contacto · textos de los frames v2 de Figma.
   Lo pendiente se muestra como "En redacción" y no se inventa contenido. */
export const LABORATORIO: PaginaHitos = {
  etiqueta: 'LABORATORIO',
  titular: 'La IA como herramienta de diseño.',
  bajada: 'Qué decido yo y qué orquesto con IA.',
  hitos: [
    { fecha: 'SISTEMA EDITORIAL', titulo: 'Brochures con control de calidad', texto: 'Concepto, análisis y dirección de arte: míos. Variantes: orquestadas con IA.' },
    { fecha: 'PENDIENTE', titulo: 'Flujo con Claude', texto: 'En redacción.', pendiente: true },
    { fecha: 'PENDIENTE', titulo: 'Experimentos', texto: 'En redacción.', pendiente: true },
  ],
}

export const POR_QUE: PaginaHitos = {
  etiqueta: 'POR QUÉ',
  titular: 'Reducir la distancia entre la persona y la información.',
  hitos: [
    { fecha: 'ORIGEN · DOCENCIA', titulo: 'Brecha digital', texto: 'Enseñar programación a adultos principiantes me enseñó a diseñar para quien empieza.' },
    { fecha: 'SESGOS COGNITIVOS', titulo: 'Cómo comunicar la incertidumbre', texto: 'Una ruta "preliminar" evita que el analista confunda una hipótesis con un hecho.' },
    { fecha: 'PENDIENTE', titulo: 'Texto personal', texto: 'En redacción.', pendiente: true },
  ],
}

export const CONTACTO: PaginaHitos = {
  etiqueta: 'CONTACTO',
  titular: 'Hablemos.',
  bajada: 'Cuéntame qué datos hay que volver claros.',
  hitos: [
    { fecha: 'CORREO', titulo: 'Escribirme por correo', texto: 'carlos.crispin.cc@gmail.com', href: 'mailto:carlos.crispin.cc@gmail.com' },
    { fecha: 'LINKEDIN', titulo: 'LinkedIn', texto: 'linkedin.com/in/carlos-crispin', href: 'https://www.linkedin.com/in/carlos-crispin/' },
  ],
}
