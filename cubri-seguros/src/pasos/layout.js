import { contenedorStepper } from '../componentes/stepper.js';

// Estructura común de los pasos 1..4: barra superior (mobile), título, stepper,
// formulario/contenido + resumen lateral (desktop) y botones de acción.
export function pasoCheckout({ paso, titulo, tituloMobile = titulo, volverA, contenido, acciones, resumenEnMobile = true, resumenArriba = false }) {
  return `
<section data-paso="${paso}" hidden class="flex min-h-[calc(100vh-57px)] flex-col lg:min-h-0">
  <div class="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
    <button type="button" data-ir="${volverA}" aria-label="Volver" class="text-lg">&#8249;</button>
    <span class="text-sm font-semibold">${tituloMobile}</span>
  </div>
  <div class="flex-1 px-4 py-4 lg:px-6 lg:py-8">
    <p class="hidden text-xs font-semibold text-indigo-600 lg:block">Seguro de Celular</p>
    <h2 class="hidden text-3xl font-extrabold lg:block">${titulo}</h2>
    <div class="lg:mt-4">${contenedorStepper}</div>
    <div class="mt-4 grid gap-4 lg:grid-cols-[1fr_380px] lg:gap-8">
      <div class="card p-4 lg:p-6">
        ${contenido}
        <div class="mt-6 hidden items-center justify-between border-t border-slate-200 pt-4 lg:flex">${acciones}</div>
      </div>
      <aside data-resumen class="card h-fit p-4 ${resumenEnMobile ? '' : 'max-lg:hidden'} ${resumenArriba ? 'max-lg:order-first' : ''}"></aside>
    </div>
  </div>
  <div class="flex flex-col gap-2 border-t border-slate-200 bg-white p-4 lg:hidden">${acciones}</div>
</section>`;
}
