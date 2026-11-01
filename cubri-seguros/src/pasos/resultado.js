const fila = (k, v) => `<div class="flex justify-between text-xs"><dt class="text-slate-500">${k}</dt><dd class="font-semibold" data-bind="${v}"></dd></div>`;

// Estructura común de éxito y error: icono, título, texto, contenido, botones.
function pantalla({ paso, icono, colorIcono, titulo, texto, extra, botones }) {
  return `
<section data-paso="${paso}" hidden class="flex min-h-[calc(100vh-57px)] flex-col lg:min-h-0 lg:px-6 lg:py-12">
  <div class="flex flex-1 flex-col items-center px-4 pt-16 text-center lg:mx-auto lg:w-full lg:max-w-[420px] lg:flex-none lg:rounded-xl lg:border lg:border-slate-200 lg:bg-white lg:p-8">
    <span class="grid size-14 place-items-center rounded-full text-2xl ${colorIcono}" aria-hidden="true">${icono}</span>
    <h2 class="mt-5 text-xl font-extrabold leading-snug">${titulo}</h2>
    <p class="mt-2 text-xs text-slate-500">${texto}</p>
    <div class="mt-4 w-full">${extra}</div>
    <div class="mt-6 hidden w-full gap-2 lg:flex">${botones}</div>
  </div>
  <div class="flex flex-col gap-2 border-t border-slate-200 bg-white p-4 lg:hidden">${botones}</div>
</section>`;
}

export const exito = pantalla({
  paso: 5,
  icono: '&#10003;', colorIcono: 'bg-emerald-50 text-emerald-600',
  titulo: '¡Listo, <span data-bind="nombre"></span>!<br class="lg:hidden"> Tu celular ya está protegido',
  texto: 'Te enviamos la póliza a <span data-bind="email"></span>',
  extra: `
    <p class="mx-auto w-fit rounded-md bg-indigo-50 px-4 py-1.5 text-xs font-extrabold tracking-wide text-indigo-800" data-bind="poliza"></p>
    <dl class="mt-4 grid gap-1.5 rounded-lg bg-slate-50 p-3 text-left">
      ${fila('Plan', 'plan')}${fila('Equipo', 'equipo')}${fila('Vigencia desde', 'vigencia')}${fila('Cuota mensual', 'cuota')}
    </dl>`,
  botones: `
    <button type="button" class="btn w-full lg:flex-1" data-descargar>Descargar póliza</button>
    <button type="button" data-ir="0" data-reiniciar class="btn w-full lg:flex-1" data-variant="outline">Volver al inicio</button>`,
});

export const error = pantalla({
  paso: 6,
  icono: '&#10005;', colorIcono: 'bg-red-50 text-red-600',
  titulo: 'No pudimos procesar el pago',
  texto: 'La tarjeta fue rechazada. Revisá los datos o probá con otro medio de pago. Tus datos quedaron guardados.',
  extra: `<div class="rounded-lg bg-amber-50 p-3 text-left text-xs text-amber-800" role="alert">
    Tarjeta de prueba que fuerza el error: 4000 0000 0000 0002</div>`,
  botones: `
    <button type="button" data-ir="4" class="btn w-full lg:flex-1">Reintentar pago</button>
    <button type="button" data-ir="4" class="btn w-full lg:flex-1" data-variant="outline">Cambiar medio de pago</button>`,
});
