const ETAPAS = ['Cotizar', 'Plan', 'Datos', 'Pago'];

// Recibe el paso actual (1..4) y pinta 3 estados: completo / activo / pendiente.
export function stepper(paso) {
  return ETAPAS.map((nombre, i) => {
    const n = i + 1;
    const completo = n < paso;
    const activo = n === paso;
    const circulo = completo
      ? `<span class="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-[11px] text-white">&#10003;</span>`
      : `<span class="grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
          activo ? 'bg-indigo-600 text-white' : 'border border-slate-300 text-slate-500'}">${n}</span>`;
    const color = completo ? 'text-emerald-600' : activo ? 'text-indigo-600' : 'text-slate-500';
    const linea = i < ETAPAS.length - 1
      ? `<span class="mx-2 h-px flex-1 ${completo ? 'bg-emerald-600' : 'bg-slate-200'}"></span>` : '';
    return `<li class="flex items-center gap-1.5 text-[11px] font-semibold ${color} ${i < ETAPAS.length - 1 ? 'flex-1' : ''}"
                ${activo ? 'aria-current="step"' : ''}>${circulo}${nombre}${linea}</li>`;
  }).join('');
}

export const contenedorStepper =
  `<ol data-stepper class="flex items-center rounded-xl bg-white px-4 py-2.5 lg:border lg:border-slate-200"></ol>`;
