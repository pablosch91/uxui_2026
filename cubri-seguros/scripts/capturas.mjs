// Genera las 14 capturas del README recorriendo el flujo completo.
// Uso: con `npm run dev` corriendo en otra terminal, ejecutar `npm run capturas`.
import { chromium } from 'playwright'

const URL = process.env.URL ?? 'http://localhost:5173/'
const SALIDA = process.env.SALIDA ?? 'docs/capturas'
const NOMBRES = ['01-inicio', '02-cotizar', '03-elegir-plan', '04-datos', '05-pago', '06-exito', '07-error-pago']
const VISTAS = [
  { nombre: 'mobile', ancho: 390, alto: 844 },
  { nombre: 'desktop', ancho: 1440, alto: 900 },
]

const navegador = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })

for (const { nombre, ancho, alto } of VISTAS) {
  const pg = await navegador.newPage({ viewport: { width: ancho, height: alto } })
  await pg.goto(URL)
  await pg.evaluate(() => document.fonts.ready) // espera a que cargue Inter
  const foto = async (i) => {
    await pg.evaluate(() => document.fonts.ready)
    await pg.screenshot({ path: `${SALIDA}/${nombre}-${NOMBRES[i]}.png`, fullPage: true })
  }

  await foto(0)
  await pg.locator('[data-paso="0"] [data-ir="1"]:visible').click()
  await pg.fill('#modelo', 'Galaxy A55')
  await pg.selectOption('#marca', 'Samsung')
  await pg.fill('#valor', '600000')
  await pg.press('#valor', 'Tab')
  await pg.locator('input[name=antiguedad][value=menos1]').check({ force: true })
  await foto(1)

  await pg.locator('[data-paso="1"] [data-continuar]:visible').click()
  await foto(2)

  await pg.locator('[data-paso="2"] button[data-ir="3"]:visible').click()
  await pg.fill('#nombre', 'Juan')
  await pg.fill('#apellido', 'Pérez')
  await pg.fill('#dni', '30123456')
  await pg.fill('#nacimiento', '1995-03-10')
  await pg.fill('#email', 'juan.perez@') // email inválido a propósito, como en el Figma
  await pg.press('#email', 'Tab')
  await pg.fill('#celular', '11 5555-1234')
  await pg.check('#terminos')
  await foto(3)

  await pg.fill('#email', 'juan.perez@mail.com')
  await pg.locator('[data-paso="3"] [data-continuar]:visible').click()
  await pg.fill('#tarjeta', '4000 0000 0000 0002')
  await pg.fill('#vencimiento', '12/28')
  await pg.fill('#cvv', '123')
  await pg.fill('#titular-tarjeta', 'JUAN PEREZ')
  await foto(4)

  await pg.locator('[data-paso="4"] [data-pagar]:visible').click()
  await pg.waitForSelector('[data-paso="6"]:not([hidden])')
  await foto(6)

  await pg.locator('[data-paso="6"] [data-ir="4"]:visible').first().click()
  await pg.fill('#tarjeta', '4111 1111 1111 1111')
  await pg.locator('[data-paso="4"] [data-pagar]:visible').click()
  await pg.waitForSelector('[data-paso="5"]:not([hidden])')
  await foto(5)

  await pg.close()
  console.log(`✔ ${nombre}: 7 capturas`)
}
await navegador.close()
console.log(`Listo. Capturas guardadas en ${SALIDA}/`)
