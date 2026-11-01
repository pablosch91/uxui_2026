import { solicitud } from './estado.js';
import { stepper } from './componentes/stepper.js';
import { calcularCuota } from './cotizador.js';
import { moneda } from './formato.js';
import { cardPlan } from './pasos/plan.js';

export let planes = [];
export function setPlanes(lista) { planes = lista; }

export function render() {
  document.querySelectorAll('[data-paso]').forEach((s) => {
    s.hidden = Number(s.dataset.paso) !== solicitud.paso;
  });
  // En mobile, el header con logo solo se ve en el inicio.
  document.querySelector('[data-header]').classList.toggle('max-lg:hidden', solicitud.paso > 0);
  renderStepper();
  renderPlanes();
  renderResumen();
  renderTextos();
}

function renderStepper() {
  document.querySelectorAll('[data-stepper]').forEach((el) => {
    el.innerHTML = stepper(solicitud.paso);
  });
}

function renderPlanes() {
  const cont = document.querySelector('[data-planes]');
  if (!cont || !planes.length) return;
  const { valor, antiguedad } = solicitud.equipo;
  cont.innerHTML = planes
    .map((p) => cardPlan(p, moneda(calcularCuota(valor, p.tasaAnual, antiguedad)), p.id === solicitud.plan))
    .join('');
}

// Se genera una sola vez desde el estado (mobile y desktop comparten esta función).
function renderResumen() {
  const { equipo, plan, titular } = solicitud;
  const p = planes.find((x) => x.id === plan);
  const cuota = p ? calcularCuota(equipo.valor, p.tasaAnual, equipo.antiguedad) : 0;
  const equipoTxt = [equipo.marca, equipo.modelo].filter(Boolean).join(' ') || '—';
  const fila = (k, v) => `<div class="flex justify-between text-xs"><dt class="text-slate-500">${k}</dt><dd class="font-semibold">${v}</dd></div>`;
  const mostrarPlan = solicitud.paso >= 2 && p;
  document.querySelectorAll('[data-resumen]').forEach((el) => {
    el.innerHTML = `
      <h3 class="mb-2 text-sm font-extrabold">Resumen</h3>
      <dl class="grid gap-1.5">
        ${fila('Seguro', 'Celular')}
        ${fila('Equipo', equipoTxt)}
        ${mostrarPlan ? fila('Plan', p.nombre) : fila('Valor', equipo.valor ? moneda(equipo.valor) : '—')}
        ${solicitud.paso >= 4 && titular.nombre ? fila('Titular', `${titular.nombre} ${titular.apellido}`) : ''}
      </dl>
      ${mostrarPlan ? `<div class="mt-3 flex items-baseline justify-between border-t border-slate-200 pt-3">
        <span class="text-xs text-slate-500">Total mensual</span><span class="text-lg font-extrabold">${moneda(cuota)}</span></div>`
        : `<p class="mt-3 text-[11px] text-slate-500">Completá los datos del equipo para ver el precio.</p>`}
      <p class="mt-3 text-[11px] text-emerald-700">&#9679; Contratación 100% online · cancelás cuando quieras</p>`;
  });
}

// Textos de las pantallas de resultado: salen del estado (data-bind="clave").
function renderTextos() {
  const { equipo, plan, titular, poliza } = solicitud;
  const p = planes.find((x) => x.id === plan);
  const valores = {
    nombre: titular.nombre,
    email: titular.email,
    poliza: poliza ?? '',
    plan: p?.nombre ?? '',
    equipo: [equipo.marca, equipo.modelo].filter(Boolean).join(' '),
    vigencia: new Date().toLocaleDateString('es-AR'),
    cuota: p ? moneda(calcularCuota(equipo.valor, p.tasaAnual, equipo.antiguedad)) : '',
  };
  document.querySelectorAll('[data-bind]').forEach((el) => {
    el.textContent = valores[el.dataset.bind] ?? '';
  });
}
