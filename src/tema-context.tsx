import { createContext, useContext } from 'react'
import type { Tema } from './theme'

export const TemaContext = createContext<{ tema: Tema; setTema: (t: Tema) => void } | null>(null)

export function useTema() {
  const c = useContext(TemaContext)
  if (!c) throw new Error('useTema fuera de TemaContext')
  return c
}
