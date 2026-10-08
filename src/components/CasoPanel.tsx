import { useEffect, useRef } from 'react'
import CasoMapa from '../pages/CasoMapa'
import { useUI } from '../i18n'

/** Panel a pantalla completa sobre la landing con el contenido de un caso (sin router: la URL usa #mapa).
 *  Escape o el botón lo cierran; mientras está abierto la página de fondo no hace scroll ni recibe foco. */
export function CasoPanel({ onCerrar }: { slug: string; onCerrar: () => void }) {
  const t = useUI()
  const cerrar = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previo = document.activeElement as HTMLElement | null
    document.documentElement.setAttribute('data-caso', '')
    cerrar.current?.focus()
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', esc)
    return () => {
      document.documentElement.removeAttribute('data-caso')
      document.removeEventListener('keydown', esc)
      previo?.focus?.()
    }
  }, [onCerrar])

  return (
    <div ref={panel} className="caso-panel" role="dialog" aria-modal="true" aria-labelledby="caso-titulo">
      <button ref={cerrar} type="button" className="caso-cerrar" aria-label={t.cerrarCaso} onClick={onCerrar}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <CasoMapa onCerrar={onCerrar} />
    </div>
  )
}
