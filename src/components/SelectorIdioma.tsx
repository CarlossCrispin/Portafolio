import { useIdioma, useUI, type Idioma } from '../i18n'

const NOMBRES: Record<Idioma, string> = { es: 'Español', en: 'English' }

/** Idioma: un solo botón circular que muestra el idioma activo (ES o EN) y al pulsarlo cambia al otro.
 *  Va entre el botón de rejilla y el selector de tema, con el mismo estilo que ambos. */
export function SelectorIdioma() {
  const { idioma, setIdioma } = useIdioma()
  const t = useUI()
  const otro: Idioma = idioma === 'es' ? 'en' : 'es'
  return (
    <button
      type="button"
      className="idioma reveal rv4"
      lang={otro}
      aria-label={t.idiomaCambiar(NOMBRES[otro])}
      onClick={() => setIdioma(otro)}
    >
      <span lang={idioma} aria-hidden="true">{idioma.toUpperCase()}</span>
    </button>
  )
}
