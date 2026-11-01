import { pasoCheckout } from './layout.js';

const campo = (id, etiqueta, { tipo = 'text', placeholder = '', modo = '', auto = 'off' } = {}) => `
  <div role="group" class="field">
    <label for="${id}">${etiqueta}</label>
    <input id="${id}" name="${id}" type="${tipo}" placeholder="${placeholder}" ${modo ? `inputmode="${modo}"` : ''} autocomplete="${auto}">
  </div>`;

const contenido = `
  <form id="form-datos" novalidate class="grid gap-4 grid-cols-2 lg:grid-cols-3">
    ${campo('nombre', 'Nombre', { auto: 'given-name' })}
    ${campo('apellido', 'Apellido', { auto: 'family-name' })}
    <div class="col-span-2 lg:col-span-1">${campo('dni', 'DNI', { modo: 'numeric' })}</div>
    <div class="col-span-2 lg:col-span-1">${campo('nacimiento', 'Fecha de nacimiento', { tipo: 'date', auto: 'bday' })}</div>
    <div class="col-span-2 lg:col-span-1">${campo('email', 'Email', { tipo: 'email', auto: 'email' })}</div>
    <div class="col-span-2 lg:col-span-1">${campo('celular', 'Celular', { tipo: 'tel', placeholder: '11 5555-1234', auto: 'tel' })}</div>
    <div class="col-span-2 lg:col-span-3">
      <label class="flex items-start gap-2 text-xs text-slate-500">
        <input id="terminos" name="terminos" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-indigo-600">
        <span>Acepto los términos y condiciones y la política de privacidad.</span>
      </label>
    </div>
  </form>`;

export const datos = pasoCheckout({
  paso: 3,
  titulo: 'Tus datos',
  volverA: 2,
  contenido,
  acciones: `
    <button type="button" data-ir="2" class="btn hidden lg:inline-flex" data-variant="outline">Volver</button>
    <div class="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
      <p data-ayuda-boton class="order-2 text-[11px] text-slate-500 lg:order-1">El botón se habilita cuando el formulario es válido</p>
      <button type="button" data-ir="4" class="btn order-1 w-full lg:order-2 lg:w-auto" disabled>Continuar al pago</button>
    </div>`,
});
