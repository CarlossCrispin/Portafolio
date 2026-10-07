import { useEffect, useRef, useState } from 'react'
import { Isotipo } from './Isotipo'
import { FRASE_SPLASH } from '../content/inicio'
import { useIdioma } from '../i18n'

/* Splash (~2.5 s, una vez por sesión de navegación): el isotipo + nombre entran enormes (recortados y tenues),
   se reducen hasta el centro, aparece la frase y todo viaja hasta la posición exacta del logo de la cabecera. */

export const CLAVE = 'splash-visto'
const DURACION = 2500
// Para revisarlo siempre: abrir con /?splash (ignora que ya se haya visto en la sesión)
const forzado = () => new URLSearchParams(window.location.search).has('splash')
const vista = () => { if (forzado()) return false; try { return sessionStorage.getItem(CLAVE) === '1' } catch { return false } }
const marcar = () => { try { sessionStorage.setItem(CLAVE, '1') } catch { /* sin almacenamiento: se mostrará de nuevo */ } }
const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Splash() {
  const { idioma } = useIdioma()
  const FRASE = FRASE_SPLASH[idioma]
  const [activo, setActivo] = useState(() => !vista() && !sinMovimiento())
  const fondo = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const frase = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const html = document.documentElement
    if (!activo) { html.setAttribute('data-listo', ''); return } // sin splash: el contenido aparece de inmediato
    const l = logo.current, f = frase.current, b = fondo.current
    const destino = document.querySelector('.cab > .cab__logo')?.getBoundingClientRect()
    let borrado: number | undefined
    const llegar = () => { html.removeAttribute('data-splash'); marcar() }
    // El contenido aparece cuando la frase ya desapareció
    const fin = () => { window.clearInterval(borrado); llegar(); html.setAttribute('data-listo', ''); setActivo(false) }
    // Al llegar el logo, la frase se borra letra por letra (de izquierda a derecha), con un cursor en el frente
    const borrar = () => {
      if (!f) return fin()
      const texto = FRASE
      let n = 0
      const oculto = document.createElement('span')
      oculto.style.visibility = 'hidden'
      const cursor = document.createElement('span')
      cursor.className = 'splash__cursor'
      const resto = document.createElement('span')
      resto.textContent = texto
      f.replaceChildren(oculto, cursor, resto)
      window.setTimeout(() => {
        borrado = window.setInterval(() => {
          n += 1
          oculto.textContent = texto.slice(0, n)
          resto.textContent = texto.slice(n)
          if (n >= texto.length) fin()
        }, Math.max(24, Math.floor(900 / texto.length)))
      }, 250)
    }
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
    // Posición final: justo debajo del logo de la cabecera, alineada a la izquierda
    f.style.left = `${destino.left}px`
    f.style.top = `${destino.bottom + 8}px`
    const fr = f.getBoundingClientRect()
    const fx = vw / 2 - (destino.left + fr.width / 2)
    const fy = vh / 2 - vh * 0.03 + (destino.height * centro) / 2 + 28 - (destino.bottom + 8)

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
          { opacity: 0, transform: `translate(${fx}px, ${fy + 10}px)`, offset: 0 },
          { opacity: 0, transform: `translate(${fx}px, ${fy + 10}px)`, offset: 0.2, easing: ease },
          { opacity: 1, transform: `translate(${fx}px, ${fy}px)`, offset: 0.42, easing: 'linear' },
          { opacity: 1, transform: `translate(${fx}px, ${fy}px)`, offset: 0.6, easing: ease },
          { opacity: 1, transform: 'translate(0, 0)', offset: 1 },
        ],
        { duration: DURACION, fill: 'forwards' },
      ),
      b.animate(
        [{ opacity: 1, offset: 0 }, { opacity: 1, offset: 0.62 }, { opacity: 0, offset: 1 }],
        { duration: DURACION, fill: 'forwards', easing: 'ease-in-out' },
      ),
    ]
    animaciones[0].finished.then(() => { llegar(); borrar() }).catch(() => { /* cancelada */ })

    // Saltar con clic, toque o cualquier tecla
    const saltar = () => fin()
    document.addEventListener('pointerdown', saltar)
    document.addEventListener('keydown', saltar)
    return () => {
      window.clearInterval(borrado)
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
      <p ref={frase} className="splash__frase t-label"><span>{FRASE}</span></p>
    </div>
  )
}
