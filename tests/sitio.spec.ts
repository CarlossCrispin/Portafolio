import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/* Landing de una sola página: se revisa la página completa y el panel del caso (#mapa). */
const VISTAS = [
  { nombre: 'móvil 390', width: 390, height: 844 },
  { nombre: 'tablet 768', width: 768, height: 1024 },
  { nombre: 'desktop 1440', width: 1440, height: 900 },
]
const TEMAS = ['claro', 'contraste-alto', 'salvia', 'durazno', 'ciruela', 'monokai', 'oscuro']
const SECCIONES = ['inicio', 'collage', 'trabajo', 'camino', 'laboratorio', 'por-que', 'contacto']
const ETIQUETAS_WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function violaciones(page: import('@playwright/test').Page) {
  const r = await new AxeBuilder({ page }).withTags(ETIQUETAS_WCAG).analyze()
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)
}

for (const vista of VISTAS) {
  test.describe(vista.nombre, () => {
    test.use({ viewport: { width: vista.width, height: vista.height } })

    // Accesibilidad de toda la landing en los 7 temas (se baja hasta el final para que todo se descubra)
    for (const tema of TEMAS) {
      test(`axe · landing · ${tema}`, async ({ page }) => {
        await page.goto('/')
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), tema)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(500)
        expect(await violaciones(page)).toEqual([])
      })
    }

    test('estructura · secciones, un h1 y sin scroll horizontal', async ({ page }) => {
      await page.goto('/')
      for (const id of SECCIONES) await expect(page.locator(`#${id}`)).toHaveCount(1)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page).toHaveTitle(/Carlos Crispín/)
      const desborde = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(desborde).toBeLessThanOrEqual(0)
    })

    test('caso del mapa · panel accesible', async ({ page }) => {
      await page.goto('/#mapa')
      const panel = page.getByRole('dialog')
      await expect(panel).toBeVisible()
      expect(await violaciones(page)).toEqual([])
      await page.keyboard.press('Escape')
      await expect(panel).toHaveCount(0)
    })
  })
}

test('teclado · enlace para saltar al contenido', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator(':focus')).toHaveClass(/saltar/)
})

test('menú · lleva a la sección y la marca como actual', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Secciones' }).getByRole('link', { name: /Camino/ }).click()
  await expect(page).toHaveURL(/#camino$/)
  await expect(page.getByRole('navigation', { name: 'Secciones' }).getByRole('link', { name: /Camino/ })).toHaveAttribute('aria-current', 'location')
})

test('idioma · cambia entre español e inglés', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await page.getByRole('button', { name: 'Cambiar a English' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('#camino h2').first()).toContainText('From writing code')
  await page.getByRole('button', { name: 'Switch to Español' }).click()
  await expect(page.locator('#camino h2').first()).toContainText('De escribir código')
})
