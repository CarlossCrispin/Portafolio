import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Las etiquetas Open Graph necesitan una URL absoluta para la imagen. Netlify expone la URL del sitio en
   process.env.URL durante el build; en local queda vacía y la ruta es relativa. */
// Se lee sin importar tipos de Node (así no hace falta instalar @types/node)
const entorno = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {}
const urlDelSitio = (): Plugin => ({
  name: 'url-del-sitio',
  transformIndexHtml: (html) => html.replaceAll('__URL_SITIO__', (entorno.URL ?? '').replace(/\/$/, '')),
})

export default defineConfig({
  plugins: [react(), tailwindcss(), urlDelSitio()],
})
