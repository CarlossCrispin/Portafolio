import { useTema } from '../tema-context'
import { TEMAS } from '../theme'
import { ETIQUETAS, PALETA, TOKENS_COLOR, contraste, type Token } from '../paleta'

const PARES: [Token, Token][] = [['fg', 'bg'], ['muted', 'bg'], ['accent-text', 'bg'], ['on-accent', 'accent-fill']]

function Seccion({ n, titulo, children }: { n: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <p className="t-label text-muted">{n}</p>
      <h2 className="t-nav mt-1 text-fg">{titulo}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function Tokens() {
  const { tema, setTema } = useTema()
  const paletas: [string, Record<Token, string>][] = TEMAS.map((t) => [ETIQUETAS[t], PALETA[t]])

  return (
    <div className="tokens reveal rv1">
      <p className="t-label text-muted">FASE 1 · BASE DE CÓDIGO</p>
      <h1 className="t-display mt-2 text-fg">Tokens, tipografía y rejilla</h1>
      <p className="t-body mt-4 text-muted">
        Vista temporal para revisar la base antes de construir pantallas. Cambia de tema aquí, con el sol de la izquierda o con las flechas.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Tema">
        {TEMAS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tema === t}
            onClick={() => setTema(t)}
            className="t-tab border border-line px-4 py-2 rounded-full text-fg cursor-pointer aria-pressed:bg-accent aria-pressed:text-on-accent aria-pressed:border-transparent"
          >
            {ETIQUETAS[t]}
          </button>
        ))}
      </div>

      <Seccion n="01" titulo="Color · 7 modos">
        <p className="t-body text-muted">El tema activo está en la paleta de arriba; abajo, los 7 con su contraste de texto (AA ≥ 4.5).</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paletas.map(([nombre, p]) => (
            <article key={nombre} className="rounded-2xl p-4 border border-line" style={{ background: p.bg, color: p.fg }}>
              <h3 className="t-tab" style={{ fontWeight: 600 }}>{nombre}</h3>
              <ul className="mt-3 grid gap-1">
                {TOKENS_COLOR.map((k) => (
                  <li key={k} className="flex items-center gap-2 t-label">
                    <span className="size-4 rounded-full shrink-0" style={{ background: p[k], border: `1px solid ${p.line}` }} />
                    <span className="w-24 shrink-0">{k}</span>
                    <span>{p[k]}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-3 grid gap-1 t-label" style={{ color: p.muted }}>
                {PARES.map(([a, b]) => {
                  const r = contraste(p[a], p[b])
                  return <li key={a}>{a} / {b} · {r.toFixed(1)}:1 {r >= 4.5 ? '✓' : '✗'}</li>
                })}
              </ul>
            </article>
          ))}
        </div>
      </Seccion>

      <Seccion n="02" titulo="Tipografía">
        <p className="t-body text-muted">Archivo (titulares y UI) y JetBrains Mono (etiquetas). Tamaños según el ancho de la ventana.</p>
        <dl className="mt-6 grid gap-6">
          <div><dt className="t-label text-muted">t-display · SemiBold · 32/36 → 52/58 → 56/62 · −2 %</dt><dd className="t-display mt-2 text-fg">Transformo datos y problemas complejos.</dd></div>
          <div><dt className="t-label text-muted">t-nav · Medium · 20/28</dt><dd className="t-nav mt-2 text-fg">Inicio · Trabajo · Camino</dd></div>
          <div><dt className="t-label text-muted">t-tab · Medium · 15/20 (14/20 en desktop)</dt><dd className="t-tab mt-2 text-fg">Para cualquiera · Reclutadores</dd></div>
          <div><dt className="t-label text-muted">t-body · Regular · 16/24</dt><dd className="t-body mt-2 text-fg">Texto de párrafo para casos y secciones, con lectura cómoda.</dd></div>
          <div><dt className="t-label text-muted">t-label · JetBrains Mono · 12/14</dt><dd className="t-label mt-2 text-fg">01 · CASO · MAPA DE UBICACIÓN</dd></div>
        </dl>
      </Seccion>

      <Seccion n="03" titulo="Rejilla">
        <p className="t-body text-muted">Pulsa el botón de rejilla (abajo a la izquierda) para dibujarla.</p>
        <table className="mt-6 t-label text-fg border-collapse">
          <thead><tr className="text-muted text-left"><th className="pr-6 pb-2 font-normal">Ancho</th><th className="pr-6 pb-2 font-normal">Columnas</th><th className="pr-6 pb-2 font-normal">Margen</th><th className="pb-2 font-normal">Calle</th></tr></thead>
          <tbody>
            <tr><td className="pr-6 py-1">390</td><td className="pr-6">3</td><td className="pr-6">24</td><td>16</td></tr>
            <tr><td className="pr-6 py-1">768</td><td className="pr-6">6</td><td className="pr-6">40</td><td>16</td></tr>
            <tr><td className="pr-6 py-1">1440</td><td className="pr-6">12</td><td className="pr-6">64</td><td>24</td></tr>
          </tbody>
        </table>
      </Seccion>

      <Seccion n="04" titulo="Movimiento">
        <ul className="t-label text-fg grid gap-1">
          <li>rápida · 150 ms</li><li>media · 250 ms</li><li>lenta · 400 ms</li><li>rejilla · 1500 ms</li><li>curva · ease-out</li>
        </ul>
        <p className="t-body mt-4 text-muted">Con prefers-reduced-motion todo es instantáneo.</p>
      </Seccion>
    </div>
  )
}
