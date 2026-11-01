import { pasoCheckout } from './layout.js';

const medio = (valor, texto, marcado = false) => `
  <label class="group cursor-pointer">
    <input type="radio" name="metodo" value="${valor}" class="peer sr-only" ${marcado ? 'checked' : ''}>
    <span class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-[13px] font-semibold
      peer-checked:border-indigo-600 peer-checked:ring-1 peer-checked:ring-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600">
      <span class="size-3.5 rounded-full border border-slate-300 group-has-[:checked]:border-[5px] group-has-[:checked]:border-indigo-600"></span>${texto}
    </span>
  </label>`;

const campo = (id, etiqueta, extra = '') => `
  <div role="group" class="field">
    <label for="${id}">${etiqueta}</label>
    <input id="${id}" name="${id}" type="text" autocomplete="off" ${extra}>
  </div>`;

const contenido = `
  <form id="form-pago" novalidate class="grid gap-4 lg:grid-cols-2">
    <div class="grid gap-2 lg:col-span-2 lg:grid-cols-2" role="radiogroup" aria-label="Medio de pago">
      ${medio('credito', 'Tarjeta de crédito', true)}${medio('debito', 'Tarjeta de débito')}
    </div>
    ${campo('tarjeta', 'Número de tarjeta', 'inputmode="numeric" placeholder="4111 1111 1111 1111"')}
    <div class="hidden lg:block">${campo('titular-tarjeta', 'Titular', 'placeholder="JUAN PEREZ"')}</div>
    <div class="grid grid-cols-2 gap-4 lg:contents">
      ${campo('vencimiento', 'Vencimiento', 'inputmode="numeric" placeholder="MM/AA"')}
      ${campo('cvv', 'CVV', 'inputmode="numeric" maxlength="3" placeholder="123"')}
    </div>
    <div class="lg:hidden">${campo('titular-tarjeta-m', 'Titular', 'placeholder="JUAN PEREZ"')}</div>
    <div class="alert rounded-lg bg-amber-50 p-3 text-xs text-amber-800 lg:col-span-2" role="note">
      Simulación: no se procesan pagos reales. Usá la tarjeta de prueba
      <span class="font-semibold">4111 1111 1111 1111</span> (aprobada) o
      <span class="font-semibold">4000 0000 0000 0002</span> (rechazada).
    </div>
  </form>`;

export const pago = pasoCheckout({
  paso: 4,
  titulo: 'Pago',
  volverA: 3,
  contenido,
  resumenArriba: true,
  acciones: `
    <button type="button" data-ir="3" class="btn hidden lg:inline-flex" data-variant="outline">Volver</button>
    <button type="button" data-pagar class="btn w-full lg:w-auto">Pagar y contratar</button>`,
});
