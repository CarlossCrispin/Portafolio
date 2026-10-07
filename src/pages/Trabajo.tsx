import { useState } from 'react'
import { Link } from 'react-router'
import { CASOS } from '../content/casos'
import { MapaFicticio } from '../components/MapaFicticio'

/* Lista de Trabajos: títulos grandes con la vista previa a la izquierda (desktop).
   Al pasar el cursor o enfocar un título, los demás se atenúan y cambia la vista previa. */
export default function Trabajo() {
  const [activo, setActivo] = useState(0)
  const c = CASOS[activo]
  return (
    <div className="interior trabajos">
      <div className="trabajos__cab">
        <h1 className="t-display reveal rv1">Trabajos</h1>
        <p className="t-lead bajada reveal rv2">Cuatro casos recreados con datos ficticios: qué había que resolver, qué decidí y qué cambió.</p>
      </div>
      <figure className="trabajos__previa reveal rv3" aria-hidden="true">
        <div className="previa__imagen">
          {c.listo ? <MapaFicticio /> : <span className="t-label previa__vacia">PRÓXIMAMENTE</span>}
        </div>
        <figcaption className="trabajos__pie">
          <span className="t-label etiqueta">{c.nivel} · {c.titulo}</span>
          <p className="t-texto">{c.bajada}</p>
        </figcaption>
      </figure>
      <ol className="trabajos__lista reveal rv3" onMouseLeave={() => setActivo(0)}>
        {CASOS.map((k, i) => {
          const cuerpo = (
            <>
              <h2 className="trabajo__titulo">{k.titulo}</h2>
              <span className="t-label trabajo__meta">{k.nivel === 'CASO PRINCIPAL' ? 'Principal' : 'Segunda línea'}</span>
            </>
          )
          return (
            <li key={k.slug} className="trabajo" data-listo={k.listo} data-activo={i === activo}
                onMouseEnter={() => setActivo(i)} onFocus={() => setActivo(i)}>
              {k.listo
                ? <Link to={`/trabajo/${k.slug}`} className="trabajo__fila">{cuerpo}</Link>
                : <div className="trabajo__fila">{cuerpo}</div>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
