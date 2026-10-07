import { useTema } from '../tema-context'
import { TEMAS, type Tema } from '../theme'

const TODOS: Tema[] = [...TEMAS, 'contraste-alto']
const TOKENS = ['bg', 'fg', 'muted', 'line', 'accent-fill', 'on-accent', 'accent-text'] as const

export default function Pruebas() {
  const { tema, setTema } = useTema()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-fg">Paso 1 · tokens de color</h1>
      <p className="text-muted mt-2">Prueba temporal: cambia de tema y revisa que todo se lea.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {TODOS.map((t) => (
          <button
            key={t}
            aria-pressed={tema === t}
            onClick={() => setTema(t)}
            className="border border-line px-3 py-2 rounded-full text-fg aria-pressed:bg-accent aria-pressed:text-on-accent"
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {TOKENS.map((k) => (
          <li key={k} className="flex items-center gap-3 border border-line p-2 rounded">
            <span className="size-8 rounded border border-line" style={{ background: `var(--${k})` }} />
            <code className="text-fg">{k}</code>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-accent-text">Texto de acento (accent-text)</p>
      <section className="mt-8 grid gap-4">
        <p className="t-label text-muted">t-label · JetBrains Mono 12/14</p>
        <h2 className="t-display text-fg">Transformo datos y problemas complejos en colores, formas y experiencias humanas.</h2>
        <p className="t-tab text-muted">t-tab · Para cualquiera · Reclutadores · Líderes de producto</p>
        <p className="t-nav text-fg">t-nav · Inicio Trabajo Camino</p>
        <p className="t-body text-fg">t-body · Texto de párrafo para casos y secciones, con lectura cómoda a 16/24.</p>
      </section>
    </div>
  )
}
