import { Link } from 'react-router'
import { MAPA } from '../content/casos'
import { MapaFicticio } from '../components/MapaFicticio'

const Flecha = ({ atras }: { atras?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {atras ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
)

export default function CasoMapa() {
  return (
    <article className="interior caso">
      <Link to="/trabajo" className="volver reveal rv0"><Flecha atras /> Casos</Link>
      <header className="reveal rv1">
        <p className="t-label etiqueta">CASO PRINCIPAL</p>
        <h1 className="t-display">Mapa de ubicación</h1>
        <p className="t-label rotulo">RECREADO CON DATOS FICTICIOS</p>
      </header>

      <div className="figuras reveal rv2">
        <figure className="figura figura--tabla">
          <figcaption className="t-label etiqueta">LO PEDIDO · UNA TABLA</figcaption>
          <table className="tabla">
            <caption className="solo-lector">Historial de llamadas ficticio por hora y zona</caption>
            <thead><tr><th scope="col" className="t-label">HORA</th><th scope="col" className="t-label">ZONA</th><th scope="col" className="t-label">LLAMADAS</th></tr></thead>
            <tbody>
              {MAPA.filas.map((f) => <tr key={f.hora}><td>{f.hora}</td><td>{f.zona}</td><td>{f.llamadas}</td></tr>)}
            </tbody>
          </table>
        </figure>
        <div className="figura figura--mapa">
          <p className="t-label etiqueta">LO PROPUESTO · UN MAPA</p>
          <MapaFicticio />
        </div>
      </div>

      <dl className="ficha reveal rv3">
        {MAPA.ficha.map(([k, v]) => (
          <div key={k}><dt className="t-label">{k}</dt><dd className="t-body">{v}</dd></div>
        ))}
      </dl>

      <div className="secciones-caso reveal rv3">
        {MAPA.secciones.map((s) => (
          <section key={s.titulo} className="seccion-caso">
            <h2 className="t-h2">{s.titulo}</h2>
            <p className={s.pendiente ? 't-texto pendiente' : 't-texto'}>{s.texto}</p>
          </section>
        ))}
      </div>

      <Link to="/trabajo" className="boton-linea reveal rv4">Ver todos los casos <Flecha /></Link>
    </article>
  )
}
