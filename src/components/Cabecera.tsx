import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Isotipo } from './Isotipo'
import { secciones } from '../content/secciones'
import { useIdioma, useUI } from '../i18n'
import { SelectorIdioma } from './SelectorIdioma'
import { CLAVE as CLAVE_SPLASH } from './Splash'

/** Cabecera fija: isotipo + menú (móvil y tablet). En desktop, navegación lateral fija. */
export function Cabecera() {
  const { idioma } = useIdioma()
  const t = useUI()
  const SECCIONES = secciones(idioma)
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()
  const boton = useRef<HTMLButtonElement>(null)
  const primero = useRef<HTMLAnchorElement>(null)

  // Estando en Inicio, tocar el logo reinicia la visita: olvida que el splash ya se vio y recarga la página
  function alLogo(e: React.MouseEvent) {
    if (pathname !== '/') return
    e.preventDefault()
    try { sessionStorage.removeItem(CLAVE_SPLASH) } catch { /* sin almacenamiento: se recarga igual */ }
    window.location.reload()
  }

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
        <Link to="/" className="cab__logo" aria-label={t.logoAria} onClick={alLogo}>
          <Isotipo />
          <span className="cab__nombre t-label" aria-hidden="true">CARLOS CRISPIN</span>
        </Link>
        <div className="cab__der reveal rv0">
          <SelectorIdioma />
        <button
          ref={boton}
          type="button"
          className="cab__menu"
          aria-expanded={abierto}
          aria-controls="menu"
          aria-label={abierto ? t.menuCerrar : t.menuAbrir}
          onClick={() => setAbierto((a) => !a)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M5 9h14M5 15h14" />}
          </svg>
        </button>
        </div>
      </header>

      {/* Desktop: navegación lateral */}
      <nav className="secciones reveal rv0" aria-label={t.navSecciones}>
        {SECCIONES.map((s) => (
          <NavLink key={s.ruta} to={s.ruta} end={s.ruta === '/'} className="t-nav"><span className="num t-label" aria-hidden="true">{s.n}</span>{s.nombre}</NavLink>
        ))}
      </nav>

      {/* Móvil y tablet: menú a pantalla completa */}
      <nav id="menu" className="menu" aria-label={t.navMenu} hidden={!abierto}>
        {SECCIONES.map((s, i) => (
          <NavLink key={s.ruta} to={s.ruta} end={s.ruta === '/'} className="menu__enlace" ref={i === 0 ? primero : undefined}><span className="num t-label" aria-hidden="true">{s.n}</span>{s.nombre}</NavLink>
        ))}
      </nav>
    </>
  )
}
