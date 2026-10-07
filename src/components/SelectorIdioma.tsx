import { useIdioma, useUI, type Idioma } from '../i18n'

const OPCIONES: { id: Idioma; texto: string; nombre: string }[] = [
  { id: 'es', texto: 'ES', nombre: 'Español' },
  { id: 'en', texto: 'EN', nombre: 'English' },
]

/** Botón de idioma ES / EN (grupo de dos botones; el activo queda marcado con aria-pressed). */
export function SelectorIdioma() {
  const { idioma, setIdioma } = useIdioma()
  const t = useUI()
  return (
    <div className="idioma" role="group" aria-label={t.idiomaGrupo}>
      {OPCIONES.map((o) => (
        <button
          key={o.id}
          type="button"
          lang={o.id}
          className="idioma__op t-label"
          aria-pressed={o.id === idioma}
          aria-label={o.nombre}
          onClick={() => setIdioma(o.id)}
        >
          {o.texto}
        </button>
      ))}
    </div>
  )
}
