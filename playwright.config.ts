import { defineConfig } from '@playwright/test'

/* Pruebas automáticas del portafolio: accesibilidad (axe), desbordes y teclado en 3 breakpoints.
   Se usa movimiento reducido para que no haya splash ni animaciones y las pruebas sean estables. */
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:4173', reducedMotion: 'reduce', locale: 'es-ES' },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
