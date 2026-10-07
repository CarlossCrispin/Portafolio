export default function EnConstruccion({ titulo }: { titulo: string }) {
  return (
    <div className="inicio">
      <h1 className="t-display titular-pagina reveal rv1">{titulo}</h1>
      <p className="t-body texto-pagina reveal rv2">Esta sección está en construcción.</p>
    </div>
  )
}
