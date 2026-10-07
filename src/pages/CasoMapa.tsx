import { Link } from 'react-router'
import { MAPA } from '../content/casos'
import { MapaFicticio } from '../components/MapaFicticio'
import { useIdioma, useUI } from '../i18n'

const Flecha = ({ atras }: { atras?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {atras ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
)

export default function CasoMapa() {
  const { idioma } = useIdioma()
  const t = useUI()
  const M = MAPA[idioma]
  return (
    <article className="interior caso">
      <Link to="/trabajo" className="volver reveal rv0"><Flecha atras /> {t.casos}</Link>
      <header className="reveal rv1">
        <p className="t-label etiqueta">{t.casoPrincipal}</p>
        <h1 className="t-display">{M.titulo}</h1>
        <p className="t-label rotulo">{t.recreado}</p>
      </header>

      <div className="figuras reveal rv2">
        <figure className="figura figura--tabla">
          <figcaption className="t-label etiqueta">{t.loPedido}</figcaption>
          <table className="tabla">
            <caption className="solo-lector">{t.tablaCaption}</caption>
            <thead><tr><th scope="col" className="t-label">{t.hora}</th><th scope="col" className="t-label">{t.zona}</th><th scope="col" className="t-label">{t.llamadas}</th></tr></thead>
            <tbody>
              {M.filas.map((f) => <tr key={f.hora}><td>{f.hora}</td><td>{f.zona}</td><td>{f.llamadas}</td></tr>)}
            </tbody>
          </table>
        </figure>
        <div className="figura figura--mapa">
          <p className="t-label etiqueta">{t.loPropuesto}</p>
          <MapaFicticio />
        </div>
      </div>

      <dl className="ficha reveal rv3">
        {M.ficha.map(([k, v]) => (
          <div key={k}><dt className="t-label">{k}</dt><dd className="t-body">{v}</dd></div>
        ))}
      </dl>

      <div className="secciones-caso reveal rv3">
        {M.secciones.map((s) => (
          <section key={s.titulo} className="seccion-caso">
            <h2 className="t-h2">{s.titulo}</h2>
            <p className={s.pendiente ? 't-texto pendiente' : 't-texto'}>{s.texto}</p>
          </section>
        ))}
      </div>

      <Link to="/trabajo" className="boton-linea reveal rv4">{t.verCasos} <Flecha /></Link>
    </article>
  )
}
