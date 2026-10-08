import { useEffect, useState } from 'react'
import { useUI } from '../i18n'
import { irASeccion } from './Cabecera'

const ESPERA_MS = 8000 // tiempo para leer al menos la primera pestaña

/* Indicador "scroll down": aparece 8 s después de que el contenido está listo y se oculta en cuanto la persona baja */
export function ScrollDown() {
  const t = useUI()
  const [ver, setVer] = useState(false)
  const [bajo, setBajo] = useState(false)

  useEffect(() => {
    let tm = 0
    const html = document.documentElement
    const armar = () => { tm = window.setTimeout(() => setVer(true), ESPERA_MS) }
    if (html.hasAttribute('data-listo')) armar()
    else {
      const mo = new MutationObserver(() => { if (html.hasAttribute('data-listo')) { mo.disconnect(); armar() } })
      mo.observe(html, { attributes: true, attributeFilter: ['data-listo'] })
      return () => { mo.disconnect(); window.clearTimeout(tm) }
    }
    return () => window.clearTimeout(tm)
  }, [])

  useEffect(() => {
    const f = () => setBajo(window.scrollY > 80)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  return (
    <a
      href="#collage"
      className="scroll-down"
      data-ver={ver && !bajo ? '' : undefined}
      aria-label={t.bajarSeccion}
      tabIndex={ver && !bajo ? 0 : -1}
      aria-hidden={ver && !bajo ? undefined : true}
      onClick={(e) => { e.preventDefault(); irASeccion('collage') }}
    >
      <svg className="scroll-down__flecha" width="35" height="76" viewBox="0 0 35 76" fill="none" aria-hidden="true" focusable="false">
        <path className="scroll-down__base" pathLength={1} d="M17.0678 2C15.5759 11.2831 13.0294 20.631 9.57374 29.3719C7.72209 34.0555 5.30615 38.4342 3.2277 43.01C3.1589 43.1615 1.46026 46.7121 2.17535 45.997C3.63672 44.5357 6.20569 43.7756 7.94737 42.7124C13.8866 39.0867 19.1726 34.5623 24.7851 30.4774C27.2081 28.7139 30.0251 26.6899 32.8638 25.6196C33.8049 25.2647 33.2678 26.2428 33.0976 26.7144C30.3972 34.2021 28.07 41.7506 24.8489 49.0478C21.8617 55.815 18.7081 62.5438 15.0694 68.9894C14.4816 70.0306 14.4563 70.6136 14.3678 69.3083C14.1181 65.6246 13.4549 61.9042 12.8158 58.2745C12.5448 56.7351 12.2514 55.1934 11.891 53.6718C11.6606 52.6988 12.3033 55.6295 12.4651 56.6163C13.1449 60.7632 13.0952 65.0135 13.0072 69.202C12.9757 70.7001 12.884 72.2111 12.9753 73.7091C13.0491 74.9195 13.3906 74.4708 13.9745 73.741C17.7182 69.0613 22.5892 64.9924 27.5488 61.6548C28.3507 61.1153 30.5815 60.3091 31.0354 59.4013" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="scroll-down__luz" pathLength={1} d="M17.0678 2C15.5759 11.2831 13.0294 20.631 9.57374 29.3719C7.72209 34.0555 5.30615 38.4342 3.2277 43.01C3.1589 43.1615 1.46026 46.7121 2.17535 45.997C3.63672 44.5357 6.20569 43.7756 7.94737 42.7124C13.8866 39.0867 19.1726 34.5623 24.7851 30.4774C27.2081 28.7139 30.0251 26.6899 32.8638 25.6196C33.8049 25.2647 33.2678 26.2428 33.0976 26.7144C30.3972 34.2021 28.07 41.7506 24.8489 49.0478C21.8617 55.815 18.7081 62.5438 15.0694 68.9894C14.4816 70.0306 14.4563 70.6136 14.3678 69.3083C14.1181 65.6246 13.4549 61.9042 12.8158 58.2745C12.5448 56.7351 12.2514 55.1934 11.891 53.6718C11.6606 52.6988 12.3033 55.6295 12.4651 56.6163C13.1449 60.7632 13.0952 65.0135 13.0072 69.202C12.9757 70.7001 12.884 72.2111 12.9753 73.7091C13.0491 74.9195 13.3906 74.4708 13.9745 73.741C17.7182 69.0613 22.5892 64.9924 27.5488 61.6548C28.3507 61.1153 30.5815 60.3091 31.0354 59.4013" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="scroll-down__texto">{t.desliza}</span>
    </a>
  )
}
