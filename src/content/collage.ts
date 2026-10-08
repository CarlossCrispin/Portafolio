/* Collage de Inicio · imágenes de referencia TEMPORALES de Pexels (licencia gratuita), elegidas por tema:
   diseño y wireframes, espacios de trabajo, tipografía, interiores minimalistas y datos.
   Se reemplazan por los trabajos reales de Carlos: basta cambiar esta lista (id de Pexels o una ruta propia en /public). */
const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`

const IDS = [
  196644, 3062948, 7948065, 6373811, 326518, 33740221, 31738853, 4067764, 12277013, 1181343,
  97080, 36246684, 285814, 7303800, 17279853, 273230, 27454895, 28550000, 5238670, 20582004,
  7869103, 326514, 3471423, 4067763, 12760383, 34212988, 196646, 7376,
  9849319, 6322359, 4977459, 4219217, 9617366, 7147451, 7763069, 34133564,
  14528981, 3467152, 33551481, 13926760, 6010424, 8266927, 3637943, 25812173,
]

// Proporciones variadas para que el muro tenga ritmo, como en la referencia
const FORMAS = ['4 / 5', '1 / 1', '3 / 4', '4 / 3', '2 / 3', '16 / 10', '1 / 1', '4 / 5']

export interface ImagenCollage { src: string; forma: string }
export const IMAGENES_COLLAGE: ImagenCollage[] = IDS.map((id, i) => ({ src: pexels(id), forma: FORMAS[(i * 3 + Math.floor(i / 4)) % FORMAS.length] }))
