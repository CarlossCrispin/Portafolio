/* Collage de Inicio · piezas reales del portafolio (WebP, 1000 px máx.).
   Originales de gran formato en dist/assets/Piezas (fuera de git); las versiones optimizadas viven en public/assets/Piezas.
   Las dos primeras (FOCO) quedan arriba a la izquierda: póster de Perihelio y cartel 1 de Isobara. Sin repeticiones. */
export interface ImagenCollage { src: string; forma: string; alt: string }

const FOCO = [
  { src: '/assets/Piezas/PERIHELIO/perihelio-poster.webp', ancho: 707, alto: 1000, alt: 'Perihelio · Póster' },
  { src: '/assets/Piezas/Isobara/isobara-cartel-rojo.webp', ancho: 707, alto: 1000, alt: 'Isobara · Cartel boceto 1, rojo' },
]

// Series intercaladas; cada tile conserva la proporción real de su pieza.
const PIEZAS = [
  { src: '/assets/Piezas/PERIHELIO/perihelio-mockup-hud.webp', ancho: 1000, alto: 469, alt: 'Perihelio · Mockup de los estados del HUD' },
  { src: '/assets/Piezas/Isobara/isobara-cartel-naranja.webp', ancho: 707, alto: 1000, alt: 'Isobara · Cartel boceto 2, naranja' },
  { src: '/assets/Piezas/KIT/kit-portada.webp', ancho: 1000, alto: 567, alt: 'Kit de microinteracciones · Portada' },
  { src: '/assets/Piezas/VINILO/vinilo-mockup.webp', ancho: 1000, alto: 722, alt: 'Vinilo · Mockup de tres pantallas' },
  { src: '/assets/Piezas/zona-probable/zona-probable-portadas.webp', ancho: 1000, alto: 567, alt: 'Zona probable · Mockup de portadas' },
  { src: '/assets/Piezas/PERIHELIO/perihelio-normal.webp', ancho: 1000, alto: 562, alt: 'Perihelio · HUD en estado normal' },
  { src: '/assets/Piezas/Isobara/isobara-cartel-negro.webp', ancho: 707, alto: 1000, alt: 'Isobara · Cartel boceto 3, negro' },
  { src: '/assets/Piezas/KIT/kit-collage.webp', ancho: 1000, alto: 919, alt: 'Kit de microinteracciones · Collage' },
  { src: '/assets/Piezas/VINILO/vinilo-descubrir.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Pantalla Descubrir' },
  { src: '/assets/Piezas/zona-probable/zona-probable-disco.webp', ancho: 1000, alto: 1000, alt: 'Zona probable · Mockup del disco' },
  { src: '/assets/Piezas/docencia/docencia-pizarron.webp', ancho: 733, alto: 1000, alt: 'Docencia · Explicando frente al pizarrón' },
  { src: '/assets/Piezas/PERIHELIO/perihelio-alerta.webp', ancho: 1000, alto: 562, alt: 'Perihelio · HUD en alerta' },
  { src: '/assets/Piezas/Isobara/isobara-main.webp', ancho: 1000, alto: 464, alt: 'Isobara · Pieza principal' },
  { src: '/assets/Piezas/KIT/kit-captura.webp', ancho: 855, alto: 788, alt: 'Kit de microinteracciones · Sistema de componentes' },
  { src: '/assets/Piezas/VINILO/vinilo-ficha.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Ficha de disco' },
  { src: '/assets/Piezas/docencia/docencia-taller.webp', ancho: 600, alto: 1000, alt: 'Docencia · Taller de desarrollo web en el salón' },
  { src: '/assets/Piezas/PERIHELIO/perihelio-critico.webp', ancho: 1000, alto: 562, alt: 'Perihelio · HUD en estado crítico' },
  { src: '/assets/Piezas/Isobara/isobara-guia-estilo.webp', ancho: 666, alto: 1000, alt: 'Isobara · Guía de estilo' },
  { src: '/assets/Piezas/KIT/kit-demo-ajustes.webp', ancho: 1000, alto: 833, alt: 'Kit de microinteracciones · Demo de ajustes' },
  { src: '/assets/Piezas/VINILO/vinilo-carrito.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Carrito y deseos' },
  { src: '/assets/Piezas/docencia/docencia-explicando.webp', ancho: 750, alto: 1000, alt: 'Docencia · Explicando durante el taller' },
  { src: '/assets/Piezas/PERIHELIO/perihelio-sistema.webp', ancho: 1000, alto: 476, alt: 'Perihelio · Sistema del HUD' },
  { src: '/assets/Piezas/Isobara/isobara-bocetos.webp', ancho: 1000, alto: 442, alt: 'Isobara · Bloque de bocetos' },
  { src: '/assets/Piezas/KIT/kit-variables.webp', ancho: 1000, alto: 456, alt: 'Kit de microinteracciones · Variables de movimiento' },
  { src: '/assets/Piezas/VINILO/vinilo-sistema.webp', ancho: 1000, alto: 449, alt: 'Vinilo · Sistema de componentes' },
  { src: '/assets/Piezas/Isobara/isobara-componente.webp', ancho: 667, alto: 1000, alt: 'Isobara · Componente y documentación' },
  { src: '/assets/Piezas/KIT/kit-demo-enviando.webp', ancho: 1000, alto: 833, alt: 'Kit de microinteracciones · Demo enviando' },
  { src: '/assets/Piezas/VINILO/vinilo-descubrir-cargando.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Descubrir, estado cargando' },
  { src: '/assets/Piezas/Isobara/isobara-estilos.webp', ancho: 668, alto: 1000, alt: 'Isobara · Estilos' },
  { src: '/assets/Piezas/KIT/kit-documentacion.webp', ancho: 1000, alto: 955, alt: 'Kit de microinteracciones · Estados, duración y curva' },
  { src: '/assets/Piezas/VINILO/vinilo-ficha-error-audio.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Ficha, error de audio' },
  { src: '/assets/Piezas/VINILO/vinilo-carrito-cargando.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Carrito, estado cargando' },
  { src: '/assets/Piezas/VINILO/vinilo-descubrir-vacio.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Descubrir, sin resultados' },
  { src: '/assets/Piezas/VINILO/vinilo-carrito-vacio.webp', ancho: 462, alto: 1000, alt: 'Vinilo · Carrito vacío' },
]

export const IMAGENES_COLLAGE: ImagenCollage[] = [...FOCO, ...PIEZAS].map((p) => ({ src: p.src, forma: `${p.ancho} / ${p.alto}`, alt: p.alt }))
