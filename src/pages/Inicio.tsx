import { Pestanas } from '../components/Pestanas'
import { useUI } from '../i18n'

export default function Inicio() {
  const t = useUI()
  return (
    <div className="inicio">
      <h1 className="solo-lector">{t.inicioH1}</h1>
      <Pestanas />
    </div>
  )
}
