import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Rejilla, BotonRejilla, useRejilla } from './components/Rejilla'
import { SelectorTema } from './components/SelectorTema'
import { Cabecera } from './components/Cabecera'
import { CursorCirculo } from './components/CursorCirculo'
import { Splash } from './components/Splash'
import { TemaContext } from './tema-context'
import { aplicarTema, temaInicial, type Tema } from './theme'
import Inicio from './pages/Inicio'
import EnConstruccion from './pages/EnConstruccion'
import Trabajo from './pages/Trabajo'
import CasoMapa from './pages/CasoMapa'
import Tokens from './pages/Tokens'

const TITULOS: Record<string, string> = {
  '/': 'Carlos Crispín · UX/UI',
  '/trabajo': 'Trabajo · Carlos Crispín',
  '/trabajo/mapa': 'Mapa de ubicación · Carlos Crispín',
  '/camino': 'Camino · Carlos Crispín',
  '/laboratorio': 'Laboratorio · Carlos Crispín',
  '/por-que': 'Por qué · Carlos Crispín',
  '/contacto': 'Contacto · Carlos Crispín',
  '/tokens': 'Tokens · fase 1',
}

export default function App() {
  const [tema, setTema] = useState<Tema>(temaInicial)
  const rej = useRejilla()
  const { pathname } = useLocation()

  useEffect(() => aplicarTema(tema), [tema])
  useEffect(() => {
    document.title = TITULOS[pathname] ?? TITULOS['/']
    document.documentElement.dataset.pagina = pathname === '/' ? 'inicio' : 'interior'
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      <a className="saltar" href="#contenido">Saltar al contenido</a>
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
          <Route path="/camino" element={<EnConstruccion titulo="Camino" />} />
          <Route path="/laboratorio" element={<EnConstruccion titulo="Laboratorio" />} />
          <Route path="/por-que" element={<EnConstruccion titulo="Por qué" />} />
          <Route path="/contacto" element={<EnConstruccion titulo="Contacto" />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="*" element={<EnConstruccion titulo="No encontrado" />} />
        </Routes>
      </main>
    </TemaContext.Provider>
  )
}
