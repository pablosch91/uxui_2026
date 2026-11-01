const productos = [
  { id: 'celular', nombre: 'Celular', desc: 'Robo, rotura y pérdida', desde: 'desde $2.000/mes', activo: true },
  { id: 'hogar', nombre: 'Hogar', desc: 'Incendio y robo', desde: 'desde $5.500/mes' },
  { id: 'bicicleta', nombre: 'Bicicleta', desc: 'Robo total', desde: 'desde $1.800/mes' },
  { id: 'viaje', nombre: 'Viaje', desc: 'Asistencia al viajero', desde: 'desde $900/día' },
];

const tarjeta = (p) => `
  <button type="button" data-producto="${p.id}" ${p.activo ? 'aria-pressed="true"' : 'disabled'}
    class="card relative flex flex-col items-start gap-1 p-3 text-left ${p.activo ? 'border-indigo-600 ring-1 ring-indigo-600' : 'opacity-70'}">
    <span class="mb-2 grid size-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600">&#9670;</span>
    <span class="text-sm font-semibold">${p.nombre}</span>
    <span class="text-xs text-slate-500">${p.desc}</span>
    <span class="hidden text-xs font-semibold text-indigo-600 lg:block">${p.desde}</span>
    ${p.activo ? '' : '<span class="badge absolute right-2 top-2" data-variant="secondary">Próximamente</span>'}
  </button>`;

export const catalogo = `
<section data-paso="0" class="flex min-h-[calc(100vh-57px)] flex-col lg:min-h-0">
  <div class="flex-1 px-4 py-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-6 lg:py-16">
    <div>
      <span class="badge mb-3 hidden bg-emerald-50! text-emerald-600! lg:inline-flex" data-variant="secondary">Primer mes con 20% OFF</span>
      <h1 class="text-2xl font-extrabold leading-tight lg:text-5xl">Protegé lo que más usás en menos de 3 minutos</h1>
      <p class="mt-2 text-[15px] text-slate-500">Elegí qué querés asegurar, cotizá al instante y contratá 100% online.<span class="hidden lg:inline"> Sin papeles ni llamadas.</span></p>
      <button type="button" data-ir="1" class="btn mt-6 hidden lg:inline-flex">Cotizar ahora</button>
    </div>
    <div class="mt-5 grid grid-cols-2 gap-3 lg:mt-0">${productos.map(tarjeta).join('')}</div>
    <div class="card mt-3 flex items-center gap-3 p-3 text-xs lg:hidden">
      <span class="badge bg-emerald-50! text-emerald-600!" data-variant="secondary">NUEVO</span>
      <span class="text-slate-500">Primer mes con 20% OFF en todos los planes</span>
    </div>
  </div>
  <div class="mx-auto hidden w-full grid-cols-3 gap-3 px-6 pb-16 lg:grid">
    <div class="card p-3"><p class="text-xs font-semibold">100% online</p><p class="text-[11px] text-slate-500">Cotizás y contratás desde la web</p></div>
    <div class="card p-3"><p class="text-xs font-semibold">Póliza al instante</p><p class="text-[11px] text-slate-500">La recibís por email al confirmar</p></div>
    <div class="card p-3"><p class="text-xs font-semibold">Sin permanencia</p><p class="text-[11px] text-slate-500">Cancelás cuando quieras</p></div>
  </div>
  <div class="border-t border-slate-200 bg-white p-4 lg:hidden">
    <button type="button" data-ir="1" class="btn w-full">Cotizar seguro de Celular</button>
  </div>
</section>`;
