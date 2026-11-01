import './style.css'
import { solicitud, irAPaso, suscribir, cargarDemo } from './estado.js'
import { render, setPlanes } from './render.js'
import { header } from './componentes/header.js'
import { catalogo } from './pasos/catalogo.js'
import { cotizar } from './pasos/cotizar.js'
import { plan } from './pasos/plan.js'
import { datos } from './pasos/datos.js'
import { pago } from './pasos/pago.js'
import { exito, error } from './pasos/resultado.js'

document.querySelector('#header').innerHTML = header
document.querySelector('#app').innerHTML = [catalogo, cotizar, plan, datos, pago, exito, error].join('')

// Navegación: todo botón con data-ir lleva a ese paso.
document.addEventListener('click', (e) => {
  const destino = e.target.closest('[data-ir]')
  if (destino && !destino.disabled) irAPaso(Number(destino.dataset.ir))
})

async function iniciar() {
  suscribir(render)
  const params = new URLSearchParams(location.search)
  if (params.has('demo')) cargarDemo() // solo para revisar el maquetado
  const res = await fetch(`${import.meta.env.BASE_URL}data/planes.json`)
  setPlanes(await res.json())
  solicitud.paso = Number(params.get('paso') ?? 0)
  render()
}
iniciar()
