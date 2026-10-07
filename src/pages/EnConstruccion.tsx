import { useUI } from '../i18n'

export default function EnConstruccion({ titulo }: { titulo?: string }) {
  const t = useUI()
  return (
    <div className="inicio">
      <h1 className="t-display titular-pagina reveal rv1">{titulo ?? t.noEncontrado}</h1>
      <p className="t-body texto-pagina reveal rv2">{t.enConstruccion}</p>
    </div>
  )
}
