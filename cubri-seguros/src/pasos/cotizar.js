import { pasoCheckout } from './layout.js';

const chip = (valor, texto, marcado = false) => `
  <label class="cursor-pointer">
    <input type="radio" name="antiguedad" value="${valor}" class="peer sr-only" ${marcado ? 'checked' : ''}>
    <span class="inline-block rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-900
      peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-800
      peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600">${texto}</span>
  </label>`;

const contenido = `
  <p class="mb-4 text-xl font-extrabold lg:hidden">Contanos sobre tu celular</p>
  <form id="form-cotizar" novalidate class="grid gap-4 lg:grid-cols-2">
    <div role="group" class="field">
      <label for="marca">Marca</label>
      <select id="marca" name="marca">
        <option value="">Elegí una marca</option>
        <option>Samsung</option><option>Apple</option><option>Motorola</option>
        <option>Xiaomi</option><option>Otra</option>
      </select>
    </div>
    <div role="group" class="field">
      <label for="modelo">Modelo</label>
      <input id="modelo" name="modelo" type="text" placeholder="Galaxy A55" autocomplete="off">
    </div>
    <div role="group" class="field">
      <label for="valor">Valor del equipo</label>
      <input id="valor" name="valor" type="text" inputmode="numeric" placeholder="$ 600.000" autocomplete="off">
      <p data-ayuda>Entre $100.000 y $2.500.000</p>
    </div>
    <fieldset id="antiguedad" class="grid gap-2">
      <legend class="mb-1 text-[13px] font-semibold">Antigüedad</legend>
      <div class="flex flex-wrap gap-2">
        ${chip('menos1', 'Menos de 1 año')}${chip('1a2', '1 a 2 años')}${chip('mas2', '+2 años')}
      </div>
    </fieldset>
  </form>`;

export const cotizar = pasoCheckout({
  paso: 1,
  titulo: 'Contanos sobre tu celular',
  tituloMobile: 'Cotizá tu seguro',
  resumenEnMobile: false,
  volverA: 0,
  contenido,
  acciones: `<p data-ayuda-boton class="text-center text-[11px] text-slate-500 empty:hidden lg:text-left"></p>
    <button type="button" data-ir="2" data-continuar class="btn w-full lg:w-auto" disabled>Ver planes</button>`,
});
