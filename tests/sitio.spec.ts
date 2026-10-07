import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const RUTAS = ['/', '/trabajo', '/trabajo/mapa', '/camino', '/laboratorio', '/por-que', '/contacto']
const TEMAS = ['claro', 'contraste-alto', 'salvia', 'durazno', 'ciruela', 'monokai', 'oscuro']
const VISTAS = [
  { nombre: 'móvil 390', width: 390, height: 844 },
  { nombre: 'tablet 768', width: 768, height: 1024 },
  { nombre: 'desktop 1440', width: 1440, height: 900 },
]

for (const vista of VISTAS) {
  test.describe(vista.nombre, () => {
    test.use({ viewport: { width: vista.width, height: vista.height } })

    for (const ruta of RUTAS) {
      // Accesibilidad (WCAG 2.x A/AA) en los 7 temas
      for (const tema of TEMAS) {
        test(`axe · ${ruta} · ${tema}`, async ({ page }) => {
          await page.goto(ruta)
          await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), tema)
          await page.waitForTimeout(400) // transición de color del fondo
          const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
          expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
        })
      }

      // Sin scroll horizontal y con un único h1
      test(`estructura · ${ruta}`, async ({ page }) => {
        await page.goto(ruta)
        const desborde = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(desborde).toBeLessThanOrEqual(0)
        await expect(page.locator('h1')).toHaveCount(1)
        await expect(page).toHaveTitle(/Carlos Crispín/)
      })
    }
  })
}

// Teclado: el enlace "saltar al contenido" es lo primero que recibe el foco
test('teclado · enlace para saltar al contenido', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator(':focus')).toHaveClass(/saltar/)
})

// Idioma: el botón EN traduce la página y cambia el atributo lang; ES lo revierte
test('idioma · cambia entre español e inglés', async ({ page }) => {
  await page.goto('/camino')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.locator('h1')).toContainText('De escribir código')
  await page.getByRole('button', { name: 'English' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('h1')).toContainText('From writing code')
  await page.getByRole('button', { name: 'Español' }).click()
  await expect(page.locator('h1')).toContainText('De escribir código')
})

// Accesibilidad en inglés (una pasada por ruta, tema claro y desktop)
test.describe('inglés', () => {
  test.use({ locale: 'en-US', viewport: { width: 1440, height: 900 } })
  for (const ruta of RUTAS) {
    test(`axe · ${ruta} · en`, async ({ page }) => {
      await page.goto(ruta)
      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
    })
  }
})
