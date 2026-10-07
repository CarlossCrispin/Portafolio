import { useState } from 'react'

const COLUMNAS_MAX = 12 // el CSS oculta las que sobran según breakpoint

export function Rejilla({ activa }: { activa: boolean }) {
  return (
    <div className="rejilla" data-activa={activa} aria-hidden="true">
      <div className="rejilla__filas" />
      <div className="rejilla__cols">
        {Array.from({ length: COLUMNAS_MAX }, (_, i) => (
          <div key={i} className="rejilla__col" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  )
}

export function BotonRejilla({ activa, onToggle }: { activa: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="btn-rejilla"
      aria-pressed={activa}
      aria-label="Mostrar rejilla"
      onClick={onToggle}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="16" height="16" rx="1" />
        <path d="M3 8.3h16M3 13.7h16M8.3 3v16M13.7 3v16" />
      </svg>
    </button>
  )
}

export function useRejilla() {
  const [activa, setActiva] = useState(false)
  return { activa, toggle: () => setActiva((a) => !a) }
}
