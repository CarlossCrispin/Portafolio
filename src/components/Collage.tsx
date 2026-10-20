import { useEffect, useMemo, useState } from 'react'
import { IMAGENES_COLLAGE } from '../content/collage'
import { useUI } from '../i18n'

/** Columnas según viewport (coinciden con caso.css): 3 móvil, 5 tablet, 6 escritorio. */
function useColumnas() {
  const calc = () => (typeof window === 'undefined' ? 6 : window.innerWidth >= 1440 ? 6 : window.innerWidth >= 768 ? 5 : 3)
  const [n, setN] = useState(calc)
  useEffect(() => {
    const f = () => setN(calc())
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return n
}

/** Muro de imágenes a todo el ancho (referencia: billysweeney.com). Mosaico en columnas: cada pieza se coloca en la columna
 *  más baja, así las dos primeras (póster de Perihelio y cartel 1 de Isobara) quedan arriba a la izquierda y las columnas
 *  terminan parejas. Cada tile muestra su pieza con texto alternativo; si una no carga, queda el bloque de color. */
export function Collage() {
  const t = useUI()
  const n = useColumnas()
  const columnas = useMemo(() => {
    const cols = Array.from({ length: n }, () => ({ h: 0, items: [] as { im: (typeof IMAGENES_COLLAGE)[number]; i: number }[] }))
    IMAGENES_COLLAGE.forEach((im, i) => {
      const [a, b] = im.forma.split('/').map(Number)
      const c = cols.reduce((m, x) => (x.h < m.h ? x : m), cols[0])
      c.items.push({ im, i })
      c.h += b / a
    })
    return cols
  }, [n])
  return (
    <section id="collage" className="seccion seccion--scroll collage" data-seccion="collage" aria-label={t.collageAria}>
      <div className="collage__muro">
        {columnas.map((c, k) => (
          <div className="collage__col" key={k}>
            {c.items.map(({ im, i }) => (
              <figure key={im.src} className="collage__item reveal" style={{ ['--forma' as string]: im.forma, ['--i' as string]: i % 6 }}>
                <img
                  src={im.src}
                  alt={im.alt}
                  loading={i < 8 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
