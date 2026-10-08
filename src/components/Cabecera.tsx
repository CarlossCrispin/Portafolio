import { useEffect, useRef, useState } from 'react'
import { Isotipo } from './Isotipo'
import { secciones, IDS_SECCION } from '../content/secciones'
import { useIdioma, useUI } from '../i18n'
import { CLAVE as CLAVE_SPLASH } from './Splash'

const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Desplaza la página a una sección (scroll suave salvo movimiento reducido) y actualiza el ancla de la URL. */
export function irASeccion(id: string) {
  const destino = document.getElementById(id)
  if (!destino) return
  const arriba = id === 'inicio'
  window.scrollTo({ top: arriba ? 0 : destino.getBoundingClientRect().top + window.scrollY, behavior: sinMovimiento() ? 'auto' : 'smooth' })
  history.replaceState(null, '', arriba ? window.location.pathname + window.location.search : `#${id}`)
}

/** Sección visible: la última cuyo borde superior ya pasó el 40 % de la altura de la ventana. */
function useSeccionActiva() {
  const [activa, setActiva] = useState<string>('inicio')
  useEffect(() => {
    let raf = 0
    const calcular = () => {
      raf = 0
      const limite = window.innerHeight * 0.4
      let actual = 'inicio'
      for (const id of IDS_SECCION) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= limite) actual = id
      }
      setActiva(actual)
      // Sobre el collage, logo y navegación se mezclan en 'difference' para no perderse sobre fotos claras
      const col = document.getElementById('collage')?.getBoundingClientRect()
      document.documentElement.toggleAttribute('data-sobre-collage', !!col && col.top < window.innerHeight && col.bottom > 0)
    }
    const alScroll = () => { if (!raf) raf = requestAnimationFrame(calcular) }
    calcular()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll)
    return () => { window.removeEventListener('scroll', alScroll); window.removeEventListener('resize', alScroll); document.documentElement.removeAttribute('data-sobre-collage'); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return activa
}

/** Cabecera fija: isotipo + menú (móvil y tablet). En desktop, navegación lateral fija. */
export function Cabecera() {
  const { idioma } = useIdioma()
  const t = useUI()
  const SECCIONES = secciones(idioma)
  const activa = useSeccionActiva()
  const [abierto, setAbierto] = useState(false)
  const boton = useRef<HTMLButtonElement>(null)
  const primero = useRef<HTMLAnchorElement>(null)

  // Logo: arriba de la página reinicia la visita (olvida que el splash ya se vio y recarga); en otra sección vuelve arriba
  function alLogo(e: React.MouseEvent) {
    e.preventDefault()
    if (window.scrollY < 80) {
      try { sessionStorage.removeItem(CLAVE_SPLASH) } catch { /* sin almacenamiento: se recarga igual */ }
      window.location.reload()
    } else irASeccion('inicio')
  }
  function alEnlace(e: React.MouseEvent, id: string) {
    e.preventDefault()
    setAbierto(false)
    // Con el menú a pantalla completa cerrándose, el scroll espera un instante para medir bien
    window.setTimeout(() => irASeccion(id), abierto ? 50 : 0)
  }

  useEffect(() => { if (abierto) primero.current?.focus() }, [abierto])
  useEffect(() => {
    if (!abierto) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAbierto(false); boton.current?.focus() } }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [abierto])
  // Si se entra con un ancla (p. ej. /#camino), se va a esa sección
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if ((IDS_SECCION as readonly string[]).includes(id)) window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 100)
  }, [])

  return (
    <>
      <header className="cab">
        <a href="#inicio" className="cab__logo" aria-label={t.logoAria} onClick={alLogo}>
          <Isotipo />
          <span className="cab__nombre t-label" aria-hidden="true">CARLOS CRISPIN</span>
        </a>
        <button
          ref={boton}
          type="button"
          className="cab__menu reveal rv0"
          aria-expanded={abierto}
          aria-controls="menu"
          aria-label={abierto ? t.menuCerrar : t.menuAbrir}
          onClick={() => setAbierto((a) => !a)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M5 9h14M5 15h14" />}
          </svg>
        </button>
      </header>

      {/* Desktop: navegación lateral */}
      <nav className="secciones reveal rv0" aria-label={t.navSecciones}>
        {SECCIONES.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="t-nav" aria-current={activa === s.id ? 'location' : undefined} onClick={(e) => alEnlace(e, s.id)}>
            <span className="num t-label" aria-hidden="true">{s.n}</span>{s.nombre}
          </a>
        ))}
      </nav>

      {/* Móvil y tablet: menú a pantalla completa */}
      <nav id="menu" className="menu" aria-label={t.navMenu} hidden={!abierto}>
        {SECCIONES.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className="menu__enlace" ref={i === 0 ? primero : undefined} aria-current={activa === s.id ? 'location' : undefined} onClick={(e) => alEnlace(e, s.id)}>
            <span className="num t-label" aria-hidden="true">{s.n}</span>{s.nombre}
          </a>
        ))}
      </nav>
    </>
  )
}
