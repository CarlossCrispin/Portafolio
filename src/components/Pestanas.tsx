import { useRef, useState } from 'react'
import { AUDIENCIAS, type Parte } from '../content/inicio'

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
  const [activa, setActiva] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function ir(i: number) {
    const n = (i + AUDIENCIAS.length) % AUDIENCIAS.length
    setActiva(n)
    refs.current[n]?.focus()
  }
  function alTeclear(e: React.KeyboardEvent) {
    const mapa: Record<string, number> = { ArrowRight: activa + 1, ArrowLeft: activa - 1, Home: 0, End: AUDIENCIAS.length - 1 }
    if (e.key in mapa) { e.preventDefault(); ir(mapa[e.key]) }
  }
  const a = AUDIENCIAS[activa]

  return (
    <>
      <div className="tabs">
        <div className="tabs__lista" role="tablist" aria-label="¿Quién eres?" onKeyDown={alTeclear}>
          {AUDIENCIAS.map((x, i) => (
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
      <div className="titular" role="tabpanel" id="panel-audiencia" aria-labelledby={`tab-${a.id}`} tabIndex={0}>
        <p className="t-display"><Texto partes={a.texto} /></p>
      </div>
    </>
  )
}
