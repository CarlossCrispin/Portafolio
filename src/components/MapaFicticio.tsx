/* Mapa ficticio en SVG (caso "Mapa de ubicación"). Solo muestra la idea: zona probable, ruta preliminar (hipótesis) y radio de alcance.
   Los colores salen de los tokens del tema. */
export function MapaFicticio() {
  const calles = [44, 88, 132, 176, 220, 264, 308, 352]
  return (
    <figure
      className="mapa"
      role="img"
      aria-label="Mapa ficticio, no es un mapa real: un círculo de zona probable dentro de un radio de alcance, con una ruta preliminar marcada como hipótesis que llega al centro."
    >
      <svg viewBox="0 0 527 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {calles.map((y) => <line key={y} x1="0" x2="527" y1={y} y2={y} className="mapa__fila" />)}
        <line x1="0" y1="106" x2="425" y2="1" className="mapa__calle" strokeWidth="12" />
        <line x1="0" y1="307" x2="527" y2="400" className="mapa__calle" strokeWidth="10" />
        <circle cx="306" cy="184" r="162" className="mapa__radio" />
        <circle cx="306" cy="184" r="78" className="mapa__zona" />
        <polyline points="52,335 159,265 240,245 306,184" className="mapa__ruta" />
        <circle cx="52" cy="335" r="5" className="mapa__punto" />
        <circle cx="306" cy="184" r="5" className="mapa__punto" />
      </svg>
      <span className="mapa__rotulo" style={{ left: '5%', top: '4%' }} aria-hidden="true">RADIO DE ALCANCE</span>
      <span className="mapa__rotulo" style={{ left: '61%', top: '18%' }} aria-hidden="true">ZONA PROBABLE</span>
      <span className="mapa__rotulo" style={{ left: '5%', top: '86%' }} aria-hidden="true">RUTA PRELIMINAR · HIPÓTESIS</span>
      <span className="mapa__nota" aria-hidden="true">DATOS FICTICIOS · NO ES UN MAPA REAL</span>
    </figure>
  )
}
