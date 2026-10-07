import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Rejilla, BotonRejilla, useRejilla } from './components/Rejilla'
import { SelectorTema } from './components/SelectorTema'
import { Cabecera } from './components/Cabecera'
import { CursorCirculo } from './components/CursorCirculo'
import { Splash } from './components/Splash'
import { TemaContext } from './tema-context'
import { IdiomaContext, UI, idiomaInicial, type Idioma } from './i18n'
import { aplicarTema, temaInicial, type Tema } from './theme'
import Inicio from './pages/Inicio'
import EnConstruccion from './pages/EnConstruccion'
import Camino from './pages/Camino'
import PaginaHitos from './pages/PaginaHitos'
import { LABORATORIO, POR_QUE, CONTACTO } from './content/secundarias'
import Trabajo from './pages/Trabajo'
import CasoMapa from './pages/CasoMapa'
import Tokens from './pages/Tokens'

export default function App() {
  const [tema, setTema] = useState<Tema>(temaInicial)
  const [idioma, setIdioma] = useState<Idioma>(idiomaInicial)
  const t = UI[idioma]
  const rej = useRejilla()
  const { pathname } = useLocation()

  useEffect(() => aplicarTema(tema), [tema])
  useEffect(() => { document.documentElement.lang = idioma }, [idioma])
  useEffect(() => { document.title = t.titulos[pathname] ?? t.titulos['/'] }, [pathname, t])
  useEffect(() => {
    document.documentElement.dataset.pagina = pathname === '/' ? 'inicio' : 'interior'
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
    <TemaContext.Provider value={{ tema, setTema }}>
      <a className="saltar" href="#contenido">{t.saltar}</a>
      <Rejilla activa={rej.activa} />
      <Cabecera />
      <CursorCirculo />
      <Splash />
      <SelectorTema tema={tema} onTema={setTema} />
      <BotonRejilla activa={rej.activa} onToggle={rej.toggle} />
      <main id="contenido" className="pagina">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/trabajo" element={<Trabajo />} />
          <Route path="/trabajo/mapa" element={<CasoMapa />} />
          <Route path="/camino" element={<Camino />} />
          <Route path="/laboratorio" element={<PaginaHitos datos={LABORATORIO} />} />
          <Route path="/por-que" element={<PaginaHitos datos={POR_QUE} />} />
          <Route path="/contacto" element={<PaginaHitos datos={CONTACTO} />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="*" element={<EnConstruccion />} />
        </Routes>
      </main>
    </TemaContext.Provider>
    </IdiomaContext.Provider>
  )
}
