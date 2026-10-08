import { useEffect, useRef, useState } from 'react'
import { AUDIENCIAS, type Parte } from '../content/inicio'
import { useIdioma, useUI } from '../i18n'

function Texto({ partes }: { partes: Parte[] }) {
  return (
    <>
      {partes.map((p, i) =>
        typeof p === 'string' ? <span key={i}>{p}</span> : <code key={i} className="codigo">{p.codigo}</code>,
      )}
    </>
  )
}

// Tiempo desde que el contenido está listo hasta activar la primera pestaña (barrido de todas las pestañas + pausa)
const PAUSA_INTRO_MS = 2000

/** Pestañas de audiencia (patrón tablist) + titular que cambia con la pestaña activa. */
export function Pestanas() {
  const { idioma } = useIdioma()
  const t = useUI()
  const LISTA = AUDIENCIAS[idioma]
  const [activa, setActiva] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  // El primer titular aparece sin animación; los siguientes entran al cambiar de pestaña
  const primera = useRef(true)
  useEffect(() => { primera.current = false }, [])

  // Intro: primero se muestran todas las pestañas sin ninguna activa y sin titular; después se activa la primera y entra el contenido.
  // Se salta con movimiento reducido o en cuanto la persona interactúa.
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (!intro) return
    const html = document.documentElement
    let tm = 0
    const armar = () => { tm = window.setTimeout(() => setIntro(false), PAUSA_INTRO_MS) }
    if (html.hasAttribute('data-listo')) { armar(); return () => window.clearTimeout(tm) }
    const mo = new MutationObserver(() => { if (html.hasAttribute('data-listo')) { mo.disconnect(); armar() } })
    mo.observe(html, { attributes: true, attributeFilter: ['data-listo'] })
    return () => { mo.disconnect(); window.clearTimeout(tm) }
  }, [intro])

  // Indicador de desborde: marca en .tabs si hay más pestañas a la izquierda o a la derecha
  const cont = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const lista = cont.current?.querySelector<HTMLElement>('.tabs__lista')
    if (!cont.current || !lista) return
    const el = cont.current
    const medir = () => {
      el.toggleAttribute('data-mas-izq', lista.scrollLeft > 4)
      el.toggleAttribute('data-mas-der', lista.scrollLeft + lista.clientWidth < lista.scrollWidth - 4)
    }
    // Si no caben todas, la fila se recorta a la mitad de una pestaña: siempre asoma un poco de texto a la derecha según el ancho disponible
    const ajustar = () => {
      lista.style.maxWidth = ''
      const disponible = el.clientWidth - 36 // deja sitio a la flecha ›
      if (lista.scrollWidth <= el.clientWidth + 1) { medir(); return }
      const tabs = Array.from(lista.querySelectorAll<HTMLElement>('.tab'))
      let corte = 0
      for (const tb of tabs) {
        const c = tb.offsetLeft + tb.offsetWidth * 0.5
        if (c <= disponible) corte = c
      }
      if (corte > 0) lista.style.maxWidth = `${Math.round(corte)}px`
      medir()
    }
    ajustar()
    lista.addEventListener('scroll', medir, { passive: true })
    const ro = new ResizeObserver(ajustar)
    ro.observe(el)
    document.fonts?.ready.then(ajustar)
    return () => { lista.removeEventListener('scroll', medir); ro.disconnect(); lista.style.maxWidth = '' }
  }, [idioma])

  // Flechas ‹ ›: desplazan la fila hasta la siguiente (o anterior) pestaña parcialmente oculta
  function mover(dir: 1 | -1) {
    const lista = cont.current?.querySelector<HTMLElement>('.tabs__lista')
    if (!lista) return
    const tabs = Array.from(lista.querySelectorAll<HTMLElement>('.tab'))
    const borde = dir === 1 ? lista.scrollLeft + lista.clientWidth : lista.scrollLeft
    const destino = dir === 1 ? tabs.find((tb) => tb.offsetLeft + tb.offsetWidth > borde + 2) : [...tabs].reverse().find((tb) => tb.offsetLeft < borde - 2)
    if (!destino) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lista.scrollTo({ left: dir === 1 ? destino.offsetLeft + destino.offsetWidth - lista.clientWidth : destino.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }

  function ir(i: number) {
    const n = (i + LISTA.length) % LISTA.length
    setIntro(false)
    setActiva(n)
    refs.current[n]?.focus()
  }
  function alTeclear(e: React.KeyboardEvent) {
    const mapa: Record<string, number> = { ArrowRight: activa + 1, ArrowLeft: activa - 1, Home: 0, End: LISTA.length - 1 }
    if (e.key in mapa) { e.preventDefault(); ir(mapa[e.key]) }
  }
  const a = LISTA[activa]

  return (
    <>
      <div ref={cont} className={intro ? 'tabs reveal rv1 tabs--intro' : 'tabs reveal rv1'}>
        <button type="button" className="tabs__flecha tabs__flecha--izq" tabIndex={-1} aria-hidden="true" onClick={() => mover(-1)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="tabs__flecha tabs__flecha--der" tabIndex={-1} aria-hidden="true" onClick={() => mover(1)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="tabs__lista" role="tablist" aria-label={t.quienEres} onKeyDown={alTeclear}>
          {LISTA.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => { refs.current[i] = el }}
              type="button"
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={i === activa}
              aria-controls="panel-audiencia"
              tabIndex={i === activa ? 0 : -1}
              className="tab t-tab"
              data-etiqueta={x.etiqueta}
              onClick={() => { setIntro(false); setActiva(i) }}
            >
              {x.etiqueta}
            </button>
          ))}
        </div>
      </div>
      <div className="titular reveal rv2" role="tabpanel" id="panel-audiencia" aria-labelledby={`tab-${a.id}`} aria-live="polite" tabIndex={0}>
        <p key={a.id} className={primera.current ? 't-display titular__principal' : 't-display titular__principal titular--entra'}><Texto partes={a.texto} /></p>
      </div>
    </>
  )
}
