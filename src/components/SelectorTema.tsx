import { useEffect, useRef, useState } from 'react'
import { TEMAS, aplicarTema, type Tema } from '../theme'
import { ETIQUETAS, PALETA, TOKENS_COLOR, mezclar } from '../paleta'

const SLOT = 48 // alto del botón
const PASO = 80 // distancia entre paradas
const ALTO = PASO * 4 // recorrido del sol entre Claro (arriba) y Oscuro (abajo)

const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const limitar = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))

function limpiarMezcla() {
  const r = document.documentElement
  TOKENS_COLOR.forEach((k) => r.style.removeProperty('--' + k))
  delete r.dataset.arrastrando
}

/** Mezcla continua entre dos temas vecinos. Con movimiento reducido salta a la parada más cercana. */
function aplicarMezcla(p: number) {
  const r = document.documentElement
  r.dataset.arrastrando = ''
  if (sinMovimiento()) {
    limpiarMezcla()
    aplicarTema(TEMAS[Math.round(p)])
    return
  }
  const i = Math.min(3, Math.floor(p))
  const t = p - i
  TOKENS_COLOR.forEach((k) => r.style.setProperty('--' + k, mezclar(PALETA[TEMAS[i]][k], PALETA[TEMAS[i + 1]][k], t)))
  aplicarTema(TEMAS[Math.round(p)])
}

export function SelectorTema({ tema, onTema }: { tema: Tema; onTema: (t: Tema) => void }) {
  const idx = Math.max(0, (TEMAS as readonly string[]).indexOf(tema)) // alto contraste: se muestra en la posición Claro
  const [abierto, setAbierto] = useState(false)
  const [pos, setPos] = useState<number | null>(null)
  const raiz = useRef<HTMLDivElement>(null)
  const arrastre = useRef<{ y0: number; movio: boolean } | null>(null)
  const posRef = useRef(0)
  const suprimirClic = useRef(false)
  const tipo = useRef<string>('mouse')

  const actual = pos ?? idx
  // Las paradas y puntos se posicionan dentro de la pista (origen = su borde superior)
  const y = abierto ? actual * PASO - ALTO : 0
  const nombre = ETIQUETAS[TEMAS[idx]]
  const etiquetaActual = tema === 'contraste-alto' ? 'Alto contraste' : nombre

  // Cerrar con Escape o al tocar fuera
  useEffect(() => {
    if (!abierto) return
    const fuera = (e: PointerEvent) => { if (!raiz.current?.contains(e.target as Node)) setAbierto(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setAbierto(false) }
    document.addEventListener('pointerdown', fuera)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', fuera); document.removeEventListener('keydown', esc) }
  }, [abierto])

  const ir = (i: number) => onTema(TEMAS[limitar(i, 0, 4)])

  function alBajar(e: React.PointerEvent) {
    tipo.current = e.pointerType
    if (!abierto) return
    arrastre.current = { y0: e.clientY, movio: false }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  function alMover(e: React.PointerEvent) {
    const a = arrastre.current
    if (!a) return
    if (Math.abs(e.clientY - a.y0) > 3) a.movio = true
    if (!a.movio || !raiz.current) return
    const centroClaro = raiz.current.getBoundingClientRect().top - ALTO + SLOT / 2
    const p = limitar((e.clientY - centroClaro) / PASO, 0, 4)
    posRef.current = p
    setPos(p)
    aplicarMezcla(p)
  }
  function alSoltar() {
    const a = arrastre.current
    arrastre.current = null
    if (!a?.movio) return
    suprimirClic.current = true
    const i = Math.round(posRef.current)
    setPos(null)
    limpiarMezcla()
    aplicarTema(TEMAS[i])
    onTema(TEMAS[i])
  }
  function alClic(e: React.MouseEvent) {
    if (suprimirClic.current) { suprimirClic.current = false; return }
    // Con mouse el hover ya abrió la pista: un clic no debe cerrarla (el teclado sí alterna)
    if (abierto && e.detail > 0 && tipo.current === 'mouse') return
    setAbierto((a) => !a)
  }
  function alTeclear(e: React.KeyboardEvent) {
    if (!abierto) return
    const mapa: Record<string, number> = { ArrowUp: idx - 1, ArrowLeft: idx - 1, ArrowDown: idx + 1, ArrowRight: idx + 1, Home: 0, End: 4 }
    if (e.key in mapa) { e.preventDefault(); ir(mapa[e.key]) }
  }

  const slider = abierto
    ? {
        role: 'slider' as const,
        'aria-label': 'Tema de color',
        'aria-orientation': 'vertical' as const,
        'aria-valuemin': 0,
        'aria-valuemax': 4,
        'aria-valuenow': idx,
        'aria-valuetext': `${etiquetaActual}, ${idx + 1} de 5`,
      }
    : { role: 'button' as const, 'aria-label': `Elegir tema de color. Actual: ${etiquetaActual}`, 'aria-expanded': false }

  return (
    <div
      ref={raiz}
      className="sel"
      data-abierto={abierto}
      data-arrastrando={pos !== null}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') { tipo.current = 'mouse'; setAbierto(true) } }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse' && !arrastre.current) setAbierto(false) }}
    >
      <div className="sel__pista" aria-hidden={!abierto ? true : undefined}>
        {Array.from({ length: 4 }, (_, i) =>
          [1, 2, 3].map((n) => (
            <span key={`${i}-${n}`} className="sel__punto" aria-hidden="true"
              style={{ top: (i + n / 4) * PASO + SLOT / 2 - 2 }} />
          )),
        )}
        {TEMAS.map((t, i) => (
          <button
            key={t}
            type="button"
            className="sel__parada"
            tabIndex={abierto ? 0 : -1}
            aria-label={`Tema ${ETIQUETAS[t]}`}
            aria-pressed={tema === t}
            style={{ top: i * PASO + SLOT / 2 - 22 }}
            onClick={() => onTema(t)}
          >
            <span />
          </button>
        ))}
      </div>
      <button
        type="button"
        className="sel__sol"
        style={{ transform: `translateY(${y}px)` }}
        onPointerDown={alBajar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onClick={alClic}
        onKeyDown={alTeclear}
        {...slider}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.6" fill="currentColor" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
        </svg>
      </button>
    </div>
  )
}
