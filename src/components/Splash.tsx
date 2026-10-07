import { useEffect, useRef, useState } from 'react'
import { Isotipo } from './Isotipo'
import { FRASE_SPLASH } from '../content/inicio'

/* Splash (~2.5 s, una vez por sesión de navegación): el isotipo + nombre entran enormes (recortados y tenues),
   se reducen hasta el centro, aparece la frase y todo viaja hasta la posición exacta del logo de la cabecera. */

const CLAVE = 'splash-visto'
const DURACION = 2500
// Para revisarlo siempre: abrir con /?splash (ignora que ya se haya visto en la sesión)
const forzado = () => new URLSearchParams(window.location.search).has('splash')
const vista = () => { if (forzado()) return false; try { return sessionStorage.getItem(CLAVE) === '1' } catch { return false } }
const marcar = () => { try { sessionStorage.setItem(CLAVE, '1') } catch { /* sin almacenamiento: se mostrará de nuevo */ } }
const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Splash() {
  const [activo, setActivo] = useState(() => !vista() && !sinMovimiento())
  const fondo = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const frase = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const html = document.documentElement
    if (!activo) { html.setAttribute('data-listo', ''); return } // sin splash: el contenido aparece de inmediato
    const l = logo.current, f = frase.current, b = fondo.current
    const destino = document.querySelector('.cab > .cab__logo')?.getBoundingClientRect()
    const fin = () => { html.removeAttribute('data-splash'); html.setAttribute('data-listo', ''); marcar(); setActivo(false) }
    if (!l || !f || !b || !destino) { fin(); return }

    html.setAttribute('data-splash', '')
    // El logo del splash se coloca justo sobre el de la cabecera y se escala/mueve desde el centro
    l.style.left = `${destino.left}px`
    l.style.top = `${destino.top}px`
    const vw = window.innerWidth, vh = window.innerHeight
    const dx = vw / 2 - (destino.left + destino.width / 2)
    const dy = vh / 2 - (destino.top + destino.height / 2) - vh * 0.03
    const centro = Math.min((vw * 0.62) / destino.width, 7) // tamaño de reposo en el centro
    const enorme = centro * 2.3 // arranque: recortado por los bordes
    f.style.top = `${vh / 2 - vh * 0.03 + (destino.height * centro) / 2 + 28}px`

    const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
    const t = (s: number, x: number, y: number) => `translate(${x}px, ${y}px) scale(${s})`
    const animaciones = [
      l.animate(
        [
          { transform: t(enorme, dx, dy), opacity: 0.12, offset: 0, easing: ease },
          { transform: t(centro, dx, dy), opacity: 1, offset: 0.36, easing: 'linear' },
          { transform: t(centro, dx, dy), opacity: 1, offset: 0.6, easing: ease },
          { transform: t(1, 0, 0), opacity: 1, offset: 1 },
        ],
        { duration: DURACION, fill: 'forwards' },
      ),
      f.animate(
        [
          { opacity: 0, transform: 'translateY(10px)', offset: 0 },
          { opacity: 0, transform: 'translateY(10px)', offset: 0.2, easing: ease },
          { opacity: 1, transform: 'translateY(0)', offset: 0.42 },
          { opacity: 1, transform: 'translateY(0)', offset: 0.6 },
          { opacity: 0, transform: 'translateY(-6px)', offset: 0.74 },
          { opacity: 0, offset: 1 },
        ],
        { duration: DURACION, fill: 'forwards' },
      ),
      b.animate(
        [{ opacity: 1, offset: 0 }, { opacity: 1, offset: 0.62 }, { opacity: 0, offset: 1 }],
        { duration: DURACION, fill: 'forwards', easing: 'ease-in-out' },
      ),
    ]
    animaciones[0].finished.then(fin).catch(() => { /* cancelada */ })

    // Saltar con clic, toque o cualquier tecla
    const saltar = () => fin()
    document.addEventListener('pointerdown', saltar)
    document.addEventListener('keydown', saltar)
    return () => {
      animaciones.forEach((a) => a.cancel())
      html.removeAttribute('data-splash')
      document.removeEventListener('pointerdown', saltar)
      document.removeEventListener('keydown', saltar)
    }
  }, [activo])

  if (!activo) return null
  return (
    <div className="splash" aria-hidden="true">
      <div ref={fondo} className="splash__fondo" />
      <div ref={logo} className="cab__logo splash__logo">
        <Isotipo />
        <span className="cab__nombre t-label">CARLOS CRISPIN</span>
      </div>
      <p ref={frase} className="splash__frase t-label">{FRASE_SPLASH}</p>
    </div>
  )
}
