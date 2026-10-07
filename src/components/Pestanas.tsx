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

  function ir(i: number) {
    const n = (i + LISTA.length) % LISTA.length
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
      <div className="tabs reveal rv1">
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
              onClick={() => setActiva(i)}
            >
              {x.etiqueta}
            </button>
          ))}
        </div>
      </div>
      <div className="titular reveal rv2" role="tabpanel" id="panel-audiencia" aria-labelledby={`tab-${a.id}`} aria-live="polite" tabIndex={0}>
        <p key={a.id} className={primera.current ? 't-display' : 't-display titular--entra'}><Texto partes={a.texto} /></p>
      </div>
    </>
  )
}
