import { useState } from 'react'
import { Link } from 'react-router'
import { CASOS } from '../content/casos'
import { MapaFicticio } from '../components/MapaFicticio'
import { useIdioma, useUI } from '../i18n'

/* Lista de Trabajos: títulos grandes con la vista previa a la izquierda (desktop).
   Al pasar el cursor o enfocar un título, los demás se atenúan y cambia la vista previa. */
export default function Trabajo() {
  const { idioma } = useIdioma()
  const t = useUI()
  const lista = CASOS[idioma]
  const [activo, setActivo] = useState(0)
  const c = lista[activo]
  return (
    <div className="interior trabajos">
      <div className="trabajos__cab">
        <h1 className="t-display reveal rv1">{t.trabajoTitulo}</h1>
        <p className="t-lead bajada reveal rv2">{t.trabajoBajada}</p>
      </div>
      <figure className="trabajos__previa reveal rv3" aria-hidden="true">
        <div className="previa__imagen">
          {c.listo ? <MapaFicticio /> : <span className="t-label previa__vacia">{t.proximamente}</span>}
        </div>
        <figcaption className="trabajos__pie">
          <span className="t-label etiqueta">{c.nivel === 'principal' ? t.casoPrincipal : t.casoSegunda} · {c.titulo}</span>
          <p className="t-texto">{c.bajada}</p>
        </figcaption>
      </figure>
      <ol className="trabajos__lista reveal rv3" onMouseLeave={() => setActivo(0)}>
        {lista.map((k, i) => {
          const cuerpo = (
            <>
              <h2 className="trabajo__titulo">{k.titulo}</h2>
              <span className="t-label trabajo__meta">{k.nivel === 'principal' ? t.principal : t.segunda}</span>
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
