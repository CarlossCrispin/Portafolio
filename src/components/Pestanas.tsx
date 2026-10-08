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

  const cont = useRef<HTMLDivElement>(null)

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
