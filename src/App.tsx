import { useCallback, useEffect, useState } from 'react'
import { Rejilla, BotonRejilla, useRejilla } from './components/Rejilla'
import { SelectorTema } from './components/SelectorTema'
import { SelectorIdioma } from './components/SelectorIdioma'
import { Cabecera } from './components/Cabecera'
import { CursorCirculo } from './components/CursorCirculo'
import { Splash } from './components/Splash'
import { Collage } from './components/Collage'
import { ScrollDown } from './components/ScrollDown'
import { CasoPanel } from './components/CasoPanel'
import { TemaContext } from './tema-context'
import { IdiomaContext, UI, idiomaInicial, type Idioma } from './i18n'
import { aplicarTema, temaInicial, type Tema } from './theme'
import Inicio from './pages/Inicio'
import Camino from './pages/Camino'
import PaginaHitos from './pages/PaginaHitos'
import { LABORATORIO, POR_QUE, CONTACTO } from './content/secundarias'
import Trabajo from './pages/Trabajo'

/* Landing de una sola página (sin router): Inicio → Collage → Trabajo → Camino → Laboratorio → Por qué → Contacto.
   El caso del mapa se abre en un panel con la URL #mapa. */
const CASOS_ABRIBLES = ['mapa']
const leerCaso = () => { const h = window.location.hash.slice(1); return CASOS_ABRIBLES.includes(h) ? h : null }

export default function App() {
  const [tema, setTema] = useState<Tema>(temaInicial)
  const [idioma, setIdioma] = useState<Idioma>(idiomaInicial)
  const [caso, setCaso] = useState<string | null>(leerCaso)
  const rej = useRejilla()
  const t = UI[idioma]

  useEffect(() => aplicarTema(tema), [tema])
  useEffect(() => { document.documentElement.lang = idioma; document.title = t.titulos['/'] }, [idioma, t])

  // Caso abierto = ancla #mapa. Abrir añade una entrada al historial; cerrar vuelve atrás (o limpia el ancla)
  useEffect(() => {
    const leer = () => setCaso(leerCaso())
    window.addEventListener('popstate', leer)
    window.addEventListener('hashchange', leer)
    return () => { window.removeEventListener('popstate', leer); window.removeEventListener('hashchange', leer) }
  }, [])
  const abrirCaso = useCallback((slug: string) => { history.pushState({ caso: true }, '', `#${slug}`); setCaso(slug) }, [])
  const cerrarCaso = useCallback(() => {
    if (history.state?.caso) history.back()
    else { history.replaceState(null, '', `${window.location.pathname}${window.location.search}#trabajo`); setCaso(null) }
  }, [])

  // Las secciones de abajo se descubren (barrido de arriba a abajo) al entrar en pantalla
  useEffect(() => {
    const secs = document.querySelectorAll<HTMLElement>('.seccion--scroll')
    const mostrar = (sec: Element) => sec.querySelectorAll('.reveal').forEach((e) => e.setAttribute('data-visto', ''))
    if (!('IntersectionObserver' in window)) { secs.forEach(mostrar); return }
    const io = new IntersectionObserver(
      (entradas) => entradas.forEach((en) => { if (en.isIntersecting) { mostrar(en.target); io.unobserve(en.target) } }),
      { threshold: 0.15 },
    )
    secs.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      <TemaContext.Provider value={{ tema, setTema }}>
        <a className="saltar" href="#contenido">{t.saltar}</a>
        <Rejilla activa={rej.activa} />
        <div className="contenido-nav" inert={caso ? true : undefined}><Cabecera /></div>
        <CursorCirculo />
        <Splash />
        <SelectorTema tema={tema} onTema={setTema} />
        <SelectorIdioma />
        <BotonRejilla activa={rej.activa} onToggle={rej.toggle} />
        <main id="contenido" className="pagina" inert={caso ? true : undefined}>
          <section id="inicio" className="seccion seccion--inicio" data-seccion="inicio"><Inicio /><ScrollDown /></section>
          <Collage />
          <section id="trabajo" className="seccion seccion--interior seccion--scroll" data-seccion="trabajo"><Trabajo onAbrirCaso={abrirCaso} /></section>
          <section id="camino" className="seccion seccion--interior seccion--scroll" data-seccion="camino"><Camino /></section>
          <section id="laboratorio" className="seccion seccion--interior seccion--scroll" data-seccion="laboratorio"><PaginaHitos datos={LABORATORIO} /></section>
          <section id="por-que" className="seccion seccion--interior seccion--scroll" data-seccion="por-que"><PaginaHitos datos={POR_QUE} /></section>
          <section id="contacto" className="seccion seccion--interior seccion--scroll" data-seccion="contacto"><PaginaHitos datos={CONTACTO} /></section>
        </main>
        {caso && <CasoPanel slug={caso} onCerrar={cerrarCaso} />}
      </TemaContext.Provider>
    </IdiomaContext.Provider>
  )
}
