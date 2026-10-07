import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Isotipo } from './Isotipo'
import { SECCIONES } from '../content/secciones'

/** Cabecera fija: isotipo + menú (móvil y tablet). En desktop, navegación lateral fija. */
export function Cabecera() {
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()
  const boton = useRef<HTMLButtonElement>(null)
  const primero = useRef<HTMLAnchorElement>(null)

  useEffect(() => setAbierto(false), [pathname])
  useEffect(() => { if (abierto) primero.current?.focus() }, [abierto])
  useEffect(() => {
    if (!abierto) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAbierto(false); boton.current?.focus() } }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [abierto])

  return (
    <>
      <header className="cab">
        <Link to="/" className="cab__logo" aria-label="Carlos Crispín, ir al inicio">
          <Isotipo />
          <span className="cab__nombre t-label" aria-hidden="true">CARLOS CRISPIN</span>
        </Link>
        <button
          ref={boton}
          type="button"
          className="cab__menu"
          aria-expanded={abierto}
          aria-controls="menu"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((a) => !a)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M5 9h14M5 15h14" />}
          </svg>
        </button>
      </header>

      {/* Desktop: navegación lateral */}
      <nav className="secciones" aria-label="Secciones">
        {SECCIONES.map((s) => (
          <NavLink key={s.ruta} to={s.ruta} end className="t-nav">{s.nombre}</NavLink>
        ))}
      </nav>

      {/* Móvil y tablet: menú a pantalla completa */}
      <nav id="menu" className="menu" aria-label="Menú" hidden={!abierto}>
        {SECCIONES.map((s, i) => (
          <NavLink key={s.ruta} to={s.ruta} end className="menu__enlace" ref={i === 0 ? primero : undefined}>{s.nombre}</NavLink>
        ))}
      </nav>
    </>
  )
}
