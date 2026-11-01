import { pasoCheckout } from './layout.js';

export const plan = pasoCheckout({
  paso: 2,
  titulo: 'Elegí tu plan',
  volverA: 1,
  contenido: `<div data-planes class="grid gap-3 lg:grid-cols-3" role="radiogroup" aria-label="Plan"></div>`,
  acciones: `
    <button type="button" data-ir="1" class="btn order-2 w-full lg:order-1 lg:w-auto" data-variant="outline">Volver</button>
    <button type="button" data-ir="3" class="btn order-1 w-full lg:order-2 lg:w-auto">Continuar</button>`,
});

const TODAS = ['Rotura de pantalla', 'Hurto / pérdida'];

// Una card de plan: <label> clickeable que envuelve un .card + radio (mismo name="plan").
export function cardPlan(p, cuota, elegido) {
  const tiene = (c) => p.coberturas.includes(c) || (c === 'Rotura de pantalla' && p.coberturas.includes('Rotura total'));
  const items = [...p.coberturas, ...TODAS.filter((c) => !tiene(c))].map((c) => {
    const ok = tiene(c) || p.coberturas.includes(c);
    return `<li class="flex items-center gap-1.5 text-xs ${ok ? '' : 'text-slate-400'}">
      <span class="${ok ? 'text-emerald-600' : 'text-slate-400'}">${ok ? '&#10003;' : '&#10005;'}</span>${c}</li>`;
  }).join('');
  return `
  <label class="block cursor-pointer">
    <input type="radio" name="plan" value="${p.id}" class="peer sr-only" ${elegido ? 'checked' : ''}>
    <div class="card gap-2 p-4 peer-checked:border-indigo-600 peer-checked:bg-indigo-50/40 peer-checked:ring-1 peer-checked:ring-indigo-600 peer-focus-visible:ring-2">
      <div class="flex items-center gap-2">
        <span class="text-[13px] font-semibold">${p.nombre}</span>
        ${p.recomendado ? '<span class="badge">Recomendado</span>' : ''}
      </div>
      <p class="text-2xl font-extrabold">${cuota}<span class="text-xs font-normal text-slate-500"> / mes</span></p>
      <ul class="grid gap-1 border-t border-slate-200 pt-2">${items}</ul>
    </div>
  </label>`;
}
