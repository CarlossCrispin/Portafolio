import { createContext, useContext } from 'react'

/* Idioma del sitio: español (por defecto si el navegador está en español) o inglés.
   Los textos largos viven en src/content/*.ts (un objeto por idioma); los textos cortos de la interfaz, aquí. */
export type Idioma = 'es' | 'en'

export function idiomaInicial(): Idioma {
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export const IdiomaContext = createContext<{ idioma: Idioma; setIdioma: (i: Idioma) => void } | null>(null)

export function useIdioma() {
  const c = useContext(IdiomaContext)
  if (!c) throw new Error('useIdioma fuera de IdiomaContext')
  return c
}

const ES = {
  saltar: 'Saltar al contenido',
  logoAria: 'Carlos Crispín, ir al inicio',
  menuAbrir: 'Abrir menú',
  menuCerrar: 'Cerrar menú',
  navSecciones: 'Secciones',
  navMenu: 'Menú',
  idiomaGrupo: 'Idioma',
  quienEres: '¿Quién eres?',
  mostrarRejilla: 'Mostrar rejilla',
  temaColor: 'Tema de color',
  temaElegir: (actual: string) => `Elegir tema de color. Actual: ${actual}`,
  temaMezcla: (n: string) => `Mezcla cercana a ${n}`,
  temaPosicion: (n: string, i: number, total: number) => `${n}, ${i} de ${total}`,
  temaParada: (n: string) => `Tema ${n}`,
  inicioH1: 'Carlos Crispín · Diseñador UX/UI',
  noEncontrado: 'No encontrado',
  enConstruccion: 'Esta sección está en construcción.',
  enNuevaPestana: ' (se abre en otra pestaña)',
  trabajoTitulo: 'Trabajos',
  trabajoBajada: 'Cuatro casos recreados con datos ficticios: qué había que resolver, qué decidí y qué cambió.',
  principal: 'Principal',
  segunda: 'Segunda línea',
  casoPrincipal: 'CASO PRINCIPAL',
  casoSegunda: 'SEGUNDA LÍNEA',
  casos: 'Casos',
  recreado: 'RECREADO CON DATOS FICTICIOS',
  loPedido: 'LO PEDIDO · UNA TABLA',
  loPropuesto: 'LO PROPUESTO · UN MAPA',
  tablaCaption: 'Historial de llamadas ficticio por hora y zona',
  hora: 'HORA', zona: 'ZONA', llamadas: 'LLAMADAS',
  verCasos: 'Ver todos los casos',
  mapaAria: 'Mapa ficticio, no es un mapa real: un círculo de zona probable dentro de un radio de alcance, con una ruta preliminar marcada como hipótesis que llega al centro.',
  mapaRadio: 'RADIO DE ALCANCE', mapaZona: 'ZONA PROBABLE', mapaRuta: 'RUTA PRELIMINAR · HIPÓTESIS', mapaNota: 'DATOS FICTICIOS · NO ES UN MAPA REAL',
  proximamente: 'PRÓXIMAMENTE',
  titulos: {
    '/': 'Carlos Crispín · UX/UI', '/trabajo': 'Trabajo · Carlos Crispín', '/trabajo/mapa': 'Mapa de ubicación · Carlos Crispín',
    '/camino': 'Camino · Carlos Crispín', '/laboratorio': 'Laboratorio · Carlos Crispín', '/por-que': 'Por qué · Carlos Crispín',
    '/contacto': 'Contacto · Carlos Crispín', '/tokens': 'Tokens · fase 1',
  } as Record<string, string>,
}

const EN: typeof ES = {
  saltar: 'Skip to content',
  logoAria: 'Carlos Crispín, go to home',
  menuAbrir: 'Open menu',
  menuCerrar: 'Close menu',
  navSecciones: 'Sections',
  navMenu: 'Menu',
  idiomaGrupo: 'Language',
  quienEres: 'Who are you?',
  mostrarRejilla: 'Show grid',
  temaColor: 'Color theme',
  temaElegir: (actual) => `Choose color theme. Current: ${actual}`,
  temaMezcla: (n) => `Mix close to ${n}`,
  temaPosicion: (n, i, total) => `${n}, ${i} of ${total}`,
  temaParada: (n) => `${n} theme`,
  inicioH1: 'Carlos Crispín · UX/UI Designer',
  noEncontrado: 'Not found',
  enConstruccion: 'This section is under construction.',
  enNuevaPestana: ' (opens in a new tab)',
  trabajoTitulo: 'Work',
  trabajoBajada: 'Four cases recreated with fictitious data: what had to be solved, what I decided and what changed.',
  principal: 'Main',
  segunda: 'Secondary',
  casoPrincipal: 'MAIN CASE',
  casoSegunda: 'SECONDARY CASE',
  casos: 'Cases',
  recreado: 'RECREATED WITH FICTITIOUS DATA',
  loPedido: 'WHAT WAS ASKED · A TABLE',
  loPropuesto: 'WHAT I PROPOSED · A MAP',
  tablaCaption: 'Fictitious call history by hour and zone',
  hora: 'TIME', zona: 'ZONE', llamadas: 'CALLS',
  verCasos: 'See all cases',
  mapaAria: 'Fictitious map, not a real map: a probable-zone circle inside a reach radius, with a preliminary route marked as a hypothesis that reaches the center.',
  mapaRadio: 'REACH RADIUS', mapaZona: 'PROBABLE ZONE', mapaRuta: 'PRELIMINARY ROUTE · HYPOTHESIS', mapaNota: 'FICTITIOUS DATA · NOT A REAL MAP',
  proximamente: 'COMING SOON',
  titulos: {
    '/': 'Carlos Crispín · UX/UI', '/trabajo': 'Work · Carlos Crispín', '/trabajo/mapa': 'Location map · Carlos Crispín',
    '/camino': 'Journey · Carlos Crispín', '/laboratorio': 'Lab · Carlos Crispín', '/por-que': 'Why · Carlos Crispín',
    '/contacto': 'Contact · Carlos Crispín', '/tokens': 'Tokens · phase 1',
  },
}

export const UI = { es: ES, en: EN }
export const useUI = () => UI[useIdioma().idioma]

export const ETIQUETAS_TEMA: Record<Idioma, Record<string, string>> = {
  es: { claro: 'Claro', salvia: 'Salvia', durazno: 'Durazno', ciruela: 'Ciruela', oscuro: 'Oscuro', monokai: 'Monokai', 'contraste-alto': 'Alto contraste' },
  en: { claro: 'Light', salvia: 'Sage', durazno: 'Peach', ciruela: 'Plum', oscuro: 'Dark', monokai: 'Monokai', 'contraste-alto': 'High contrast' },
}
