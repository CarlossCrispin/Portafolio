import { Link } from 'react-router'
import { CASOS } from '../content/casos'

export default function Trabajo() {
  return (
    <div className="interior">
      <p className="t-label etiqueta reveal rv1">TRABAJO</p>
      <h1 className="t-display reveal rv1">Cuatro casos, recreados.</h1>
      <p className="t-lead bajada reveal rv2">Cada caso muestra el requisito, el problema real y la decisión. Los datos son ficticios.</p>
      <ol className="casos reveal rv3">
        {CASOS.map((c) => {
          const cuerpo = (
            <>
              <h2 className="t-h2">{c.titulo}</h2>
              <p className="t-texto">{c.bajada}</p>
              <p className="t-label etiqueta">{c.nivel} · RECREADO · DATOS FICTICIOS{c.listo ? '' : ' · PRÓXIMAMENTE'}</p>
            </>
          )
          return (
            <li key={c.slug} className="caso-item" data-listo={c.listo}>
              {c.listo ? <Link to={`/trabajo/${c.slug}`} className="caso-item__enlace">{cuerpo}</Link> : <div className="caso-item__enlace">{cuerpo}</div>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
