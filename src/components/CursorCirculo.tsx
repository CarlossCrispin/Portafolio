import { useEffect, useRef } from 'react'

const INTERACTIVO = 'a, button, [role="tab"], [role="slider"], [role="button"], select, summary, input'

/**
 * Cursor de círculo (blanco, mix-blend-mode: difference): siempre visible con mouse, sigue con una ligera inercia,
 * crece sobre lo interactivo y se encoge al hacer clic. Con teclado, táctil, colores forzados o
 * movimiento reducido (sin inercia) no interfiere: vuelve la flecha normal y manda el foco.
 */
export function CursorCirculo() {
  const raiz = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const fino = window.matchMedia('(pointer: fine) and (hover: hover)')
    const forzado = window.matchMedia('(forced-colors: active)')
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fino.matches || forzado.matches) return

    const html = document.documentElement
    const meta = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let visto = false
    let raf = 0

    const pintar = () => {
      const k = reducido.matches ? 1 : 0.2
      pos.x += (meta.x - pos.x) * k
      pos.y += (meta.y - pos.y) * k
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = Math.abs(meta.x - pos.x) + Math.abs(meta.y - pos.y) > 0.1 ? requestAnimationFrame(pintar) : 0
    }
    const mover = () => { if (!raf) raf = requestAnimationFrame(pintar) }
    const sobre = (t: EventTarget | null) => !!(t as Element | null)?.closest?.(INTERACTIVO)

    const alMover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      meta.x = e.clientX
      meta.y = e.clientY
      if (!visto) { pos.x = meta.x; pos.y = meta.y; visto = true }
      html.setAttribute('data-cursor', '')
      el.dataset.visible = 'true'
      el.dataset.estado = sobre(e.target) ? 'enlace' : ''
      mover()
    }
    const alSalir = () => { el.dataset.visible = '' }
    const alBajar = () => { el.dataset.estado = 'presion' }
    const alSoltar = (e: PointerEvent) => { el.dataset.estado = sobre(e.target) ? 'enlace' : '' }
    // Navegación con teclado: vuelve la flecha normal y el círculo se oculta
    const alTeclear = (e: KeyboardEvent) => {
      if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        html.removeAttribute('data-cursor')
        el.dataset.visible = ''
      }
    }

    document.addEventListener('pointermove', alMover, { passive: true })
    document.addEventListener('pointerdown', alBajar)
    document.addEventListener('pointerup', alSoltar)
    html.addEventListener('mouseleave', alSalir)
    document.addEventListener('keydown', alTeclear)
    return () => {
      cancelAnimationFrame(raf)
      html.removeAttribute('data-cursor')
      document.removeEventListener('pointermove', alMover)
      document.removeEventListener('pointerdown', alBajar)
      document.removeEventListener('pointerup', alSoltar)
      html.removeEventListener('mouseleave', alSalir)
      document.removeEventListener('keydown', alTeclear)
    }
  }, [])

  return <div ref={raiz} className="cursor-circulo" aria-hidden="true"><span /></div>
}
