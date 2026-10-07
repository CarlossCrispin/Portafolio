import type { PaginaHitos as Datos } from '../content/camino'

/* Página interior con etiqueta, titular grande, bajada opcional y bloques (fecha/rótulo, título, texto). */
export default function PaginaHitos({ datos }: { datos: Datos }) {
  return (
    <div className="interior">
      <p className="t-label etiqueta reveal rv1">{datos.etiqueta}</p>
      <h1 className="t-display reveal rv1">{datos.titular}</h1>
      {datos.bajada && <p className="t-lead bajada reveal rv2">{datos.bajada}</p>}
      <ol className="camino">
        {datos.hitos.map((h, i) => (
          <li key={h.titulo} className="camino__hito reveal" style={{ ['--i' as string]: i + 3 }}>
            <p className="t-label etiqueta">{h.fecha}</p>
            <h2 className="t-h2">{h.titulo}</h2>
            <p className={`t-texto${h.pendiente ? ' pendiente' : ''}`}>
              {h.href ? <a className="camino__enlace" href={h.href} {...(h.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{h.texto}{h.href.startsWith('http') && <span className="solo-lectores"> (se abre en otra pestaña)</span>}</a> : h.texto}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
