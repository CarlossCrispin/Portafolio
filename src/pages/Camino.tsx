import { CAMINO } from '../content/camino'

export default function Camino() {
  return (
    <div className="interior">
      <p className="t-label etiqueta reveal rv1">CAMINO</p>
      <h1 className="t-display reveal rv1">{CAMINO.titular}</h1>
      <ol className="camino">
        {CAMINO.hitos.map((h, i) => (
          <li key={h.titulo} className="camino__hito reveal" style={{ ['--i' as string]: i + 3 }}>
            <p className="t-label etiqueta">{h.fecha}</p>
            <h2 className="t-h2">{h.titulo}</h2>
            <p className="t-texto">{h.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
