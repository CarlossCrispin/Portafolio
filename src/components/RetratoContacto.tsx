import { useIdioma } from '../i18n'

/** Retrato en blanco y negro al final de Contacto. Si no carga, no deja hueco. */
export function RetratoContacto() {
  const { idioma } = useIdioma()
  return (
    <figure className="retrato reveal" style={{ ['--i' as string]: 6 }}>
      <img
        src="/assets/retrato-carlos.webp"
        alt={idioma === 'es' ? 'Retrato de Carlos Crispín frente a una pared de madera' : 'Portrait of Carlos Crispín in front of a wooden wall'}
        width={900}
        height={675}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.parentElement?.setAttribute('hidden', '') }}
      />
    </figure>
  )
}
