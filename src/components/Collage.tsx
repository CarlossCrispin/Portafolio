import { IMAGENES_COLLAGE } from '../content/collage'
import { useUI } from '../i18n'

/** Muro de imágenes a todo el ancho (referencia: billysweeney.com). Mosaico en columnas con proporciones variadas,
 *  recortado abajo con un degradado. Las imágenes son decorativas; si una no carga, queda el bloque de color. */
export function Collage() {
  const t = useUI()
  return (
    <section id="collage" className="seccion seccion--scroll collage" data-seccion="collage" aria-label={t.collageAria}>
      <div className="collage__muro">
        {IMAGENES_COLLAGE.map((im, i) => (
          <figure key={im.src} className="collage__item reveal" style={{ ['--forma' as string]: im.forma, ['--i' as string]: i % 6 }}>
            <img
              src={im.src}
              alt=""
              loading={i < 6 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
            />
          </figure>
        ))}
      </div>
      <p className="t-label etiqueta collage__nota">{t.collageNota}</p>
    </section>
  )
}
