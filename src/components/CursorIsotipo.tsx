import { useEffect, useRef } from 'react'
import { Isotipo } from './Isotipo'

const INTERACTIVO = 'a, button, [role="tab"], [role="slider"], [role="button"], select, summary, input'

/**
 * Cursor con el isotipo. Solo con mouse (pointer: fine) y solo sobre elementos interactivos:
 * ahí reemplaza la flecha, crece y se invierte respecto de lo que tiene debajo (mix-blend-mode: difference).
 * Con teclado, táctil, movimiento reducido (sin inercia) o colores forzados, no interfiere.
 */
export function CursorIsotipo() {
  const raiz = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const fino = window.matchMedia('(pointer: fine) and (hover: hover)')
    const forzado = window.matchMedia('(forced-colors: active)')
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fino.matches || forzado.matches) return

    const html = document.documentElement
    const meta = { x: -100, y: -100 } // destino (puntero)
    const pos = { x: -100, y: -100 } // posición dibujada (con inercia)
    let visto = false
    let raf = 0

    const pintar = () => {
      const k = reducido.matches ? 1 : 0.28 // inercia corta
      pos.x += (meta.x - pos.x) * k
      pos.y += (meta.y - pos.y) * k
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = Math.abs(meta.x - pos.x) + Math.abs(meta.y - pos.y) > 0.1 ? requestAnimationFrame(pintar) : 0
    }
    const mover = () => { if (!raf) raf = requestAnimationFrame(pintar) }

    const alMover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      meta.x = e.clientX
      meta.y = e.clientY
      if (!visto) { pos.x = meta.x; pos.y = meta.y; visto = true }
      html.setAttribute('data-cursor-iso', '') // modo mouse: oculta la flecha solo sobre interactivos
      const sobre = (e.target as Element | null)?.closest?.(INTERACTIVO)
      el.dataset.estado = sobre ? 'enlace' : ''
      mover()
    }
    const alSalir = () => { el.dataset.estado = '' }
    const alBajar = () => { if (el.dataset.estado === 'enlace') el.dataset.estado = 'presion' }
    const alSoltar = (e: PointerEvent) => {
      if (el.dataset.estado === 'presion') el.dataset.estado = (e.target as Element | null)?.closest?.(INTERACTIVO) ? 'enlace' : ''
    }
    // Navegación con teclado: vuelve el cursor normal y el foco manda
    const alTeclear = (e: KeyboardEvent) => {
      if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        html.removeAttribute('data-cursor-iso')
        el.dataset.estado = ''
      }
    }

    document.addEventListener('pointermove', alMover, { passive: true })
    document.addEventListener('pointerdown', alBajar)
    document.addEventListener('pointerup', alSoltar)
    document.addEventListener('pointerleave', alSalir)
    document.documentElement.addEventListener('mouseleave', alSalir)
    document.addEventListener('keydown', alTeclear)
    return () => {
      cancelAnimationFrame(raf)
      html.removeAttribute('data-cursor-iso')
      document.removeEventListener('pointermove', alMover)
      document.removeEventListener('pointerdown', alBajar)
      document.removeEventListener('pointerup', alSoltar)
      document.removeEventListener('pointerleave', alSalir)
      document.documentElement.removeEventListener('mouseleave', alSalir)
      document.removeEventListener('keydown', alTeclear)
    }
  }, [])

  return (
    <div ref={raiz} className="cursor-iso" aria-hidden="true">
      <Isotipo />
    </div>
  )
}
