import { solicitud, irAPaso, reiniciar } from './estado.js';
import * as v from './validaciones.js';
import { moneda } from './formato.js';
import { renderResumen } from './render.js';
import { simularPago, generarPoliza } from './pago.js';

const aNumero = (t) => Number(String(t).replace(/\D/g, ''));

// Cada campo: id del DOM, dónde vive en el estado y qué función lo valida.
export const campos = {
  1: [
    { id: 'marca', nombre: 'Marca', grupo: 'equipo', clave: 'marca', validar: v.validarMarca },
    { id: 'modelo', nombre: 'Modelo', grupo: 'equipo', clave: 'modelo', validar: v.validarModelo },
    { id: 'valor', nombre: 'Valor', grupo: 'equipo', clave: 'valor', leer: aNumero,
      mostrar: (n) => (n ? moneda(n) : ''), validar: v.validarValor },
    { id: 'antiguedad', nombre: 'Antigüedad', grupo: 'equipo', clave: 'antiguedad', tipo: 'radio', validar: v.validarAntiguedad },
  ],
  3: [
    { id: 'nombre', nombre: 'Nombre', grupo: 'titular', clave: 'nombre', validar: v.validarNombre },
    { id: 'apellido', nombre: 'Apellido', grupo: 'titular', clave: 'apellido', validar: v.validarApellido },
    { id: 'dni', nombre: 'DNI', grupo: 'titular', clave: 'dni', validar: v.validarDni },
    { id: 'nacimiento', nombre: 'Fecha de nacimiento', grupo: 'titular', clave: 'nacimiento', validar: v.validarNacimiento },
    { id: 'email', nombre: 'Email', grupo: 'titular', clave: 'email', validar: v.validarEmail },
    { id: 'celular', nombre: 'Celular', grupo: 'titular', clave: 'celular', validar: v.validarCelular },
    { id: 'terminos', nombre: 'Términos', grupo: 'titular', clave: 'terminos', tipo: 'check', validar: v.validarTerminos },
  ],
  4: [
    { id: 'tarjeta', nombre: 'Tarjeta', grupo: 'pago', clave: 'tarjeta', validar: v.validarTarjeta },
    { id: 'vencimiento', nombre: 'Vencimiento', grupo: 'pago', clave: 'vencimiento', validar: v.validarVencimiento },
    { id: 'cvv', nombre: 'CVV', grupo: 'pago', clave: 'cvv', validar: v.validarCvv },
    { id: 'titular-tarjeta', nombre: 'Titular', grupo: 'pago', clave: 'titular', validar: v.validarTitular },
  ],
};
const todos = Object.entries(campos).flatMap(([paso, lista]) => lista.map((c) => ({ ...c, paso: Number(paso) })));

const nodo = (c) => document.getElementById(c.id);
const valorEstado = (c) => solicitud[c.grupo][c.clave];
const buscar = (t) => todos.find((c) => c.id === (t.name === 'antiguedad' ? 'antiguedad' : t.id));

// ---- DOM <-> estado ----
function leerDOM(c) {
  if (c.tipo === 'radio') return document.querySelector(`input[name="${c.id}"]:checked`)?.value ?? '';
  if (c.tipo === 'check') return nodo(c).checked;
  return c.leer ? c.leer(nodo(c).value) : nodo(c).value;
}
function escribirDOM(c) {
  const val = valorEstado(c);
  if (c.tipo === 'radio') document.querySelectorAll(`input[name="${c.id}"]`).forEach((r) => (r.checked = r.value === val));
  else if (c.tipo === 'check') nodo(c).checked = val;
  else nodo(c).value = c.mostrar ? c.mostrar(val) : val;
}
const guardar = (c) => { solicitud[c.grupo][c.clave] = leerDOM(c); };

// ---- errores en línea ----
const contenedor = (c) => nodo(c).closest('.field') ?? (c.tipo === 'radio' ? nodo(c) : nodo(c).closest('label').parentElement);
const hayError = (c) => !!document.getElementById(`${c.id}-error`);

function ponerError(c, msg) {
  const cont = contenedor(c);
  const n = nodo(c);
  const id = `${c.id}-error`;
  document.getElementById(id)?.remove();
  cont.removeAttribute('data-invalid');
  n.removeAttribute('aria-invalid');
  n.removeAttribute('aria-describedby');
  if (!msg) return;
  const p = document.createElement('p');
  p.id = id;
  p.setAttribute('role', 'alert');
  p.className = 'mt-1 text-xs text-red-600';
  p.textContent = msg;
  cont.append(p);
  cont.setAttribute('data-invalid', '');
  if (c.tipo !== 'radio') n.setAttribute('aria-invalid', 'true');
  n.setAttribute('aria-describedby', id);
}
function mostrar(c) {
  const msg = c.validar(valorEstado(c));
  ponerError(c, msg);
  return msg;
}

// Valida todo el paso, muestra los errores y devuelve el primer campo inválido.
function validarTodo(paso) {
  let primero = null;
  campos[paso].forEach((c) => {
    guardar(c);
    if (mostrar(c) && !primero) primero = c;
  });
  return primero;
}
const enfocar = (c) => (c.tipo === 'radio' ? document.querySelector(`input[name="${c.id}"]`) : nodo(c))?.focus();

// Botón deshabilitado + explicación de qué falta.
function actualizarBoton(paso) {
  const faltan = campos[paso].filter((c) => c.validar(valorEstado(c)));
  const sec = document.querySelector(`[data-paso="${paso}"]`);
  sec.querySelectorAll('[data-continuar]').forEach((b) => (b.disabled = faltan.length > 0));
  sec.querySelectorAll('[data-ayuda-boton]').forEach((p) => {
    p.textContent = faltan.length ? `Falta completar: ${faltan.map((c) => c.nombre).join(', ')}` : '';
  });
}

// ---- eventos ----
function alCambiar(e) {
  const t = e.target;
  if (t.name === 'plan') { solicitud.plan = t.value; renderResumen(); return; }
  if (t.name === 'metodo') { solicitud.pago.metodo = t.value; return; }
  const c = buscar(t);
  if (!c) return;
  guardar(c);
  const inmediato = e.type === 'change' && (c.tipo || t.tagName === 'SELECT' || t.type === 'date');
  if (inmediato || hayError(c)) mostrar(c); // si ya había error, se corrige en vivo
  renderResumen();
  if (campos[c.paso] && c.paso !== 4) actualizarBoton(c.paso);
}

function alSalir(e) {
  const c = buscar(e.target);
  if (!c || c.tipo) return; // los radios y el checkbox validan en "change"
  guardar(c);
  if (c.mostrar) escribirDOM(c);
  mostrar(c);
  if (c.paso !== 4) actualizarBoton(c.paso);
}

function alEnter(e) {
  const t = e.target;
  if (e.key === 'Enter' && t.tagName === 'INPUT' && t.form && !['checkbox', 'radio'].includes(t.type)) {
    e.preventDefault();
    t.form.requestSubmit();
  }
}

function alEnviar(e) {
  e.preventDefault(); // evita que la página se recargue
  const id = e.target.id;
  if (id === 'form-pago') return pagar();
  const paso = id === 'form-cotizar' ? 1 : id === 'form-datos' ? 3 : null;
  if (!paso) return;
  const primero = validarTodo(paso);
  actualizarBoton(paso);
  if (primero) enfocar(primero);
  else irAPaso(paso + 1);
}

// ---- pago ----
let pagando = false;
const botonesPagar = () => document.querySelectorAll('[data-pagar]');

async function pagar() {
  if (pagando) return; // evita el doble click
  const primero = validarTodo(4);
  if (primero) { enfocar(primero); return; }
  pagando = true;
  botonesPagar().forEach((b) => { b.disabled = true; b.textContent = 'Procesando…'; });
  const res = await simularPago(solicitud.pago.tarjeta);
  pagando = false;
  botonesPagar().forEach((b) => { b.textContent = 'Pagar y contratar'; if (!res.ok) b.disabled = false; });
  if (res.ok) {
    solicitud.poliza = generarPoliza();
    irAPaso(5);
  } else {
    irAPaso(6); // los datos quedan en el estado
  }
}

// ---- API ----
export function iniciarFormularios() {
  document.addEventListener('input', alCambiar);
  document.addEventListener('change', alCambiar);
  document.addEventListener('focusout', alSalir);
  document.addEventListener('keydown', alEnter);
  document.addEventListener('submit', alEnviar);
  document.addEventListener('click', (e) => { if (e.target.closest('[data-pagar]')) pagar(); });
}

// Rellena los inputs desde el estado (así "Volver" no pierde datos).
export function sincronizarFormularios() {
  todos.forEach(escribirDOM);
  document.querySelectorAll('input[name="metodo"]').forEach((r) => (r.checked = r.value === solicitud.pago.metodo));
  actualizarBoton(1);
  actualizarBoton(3);
}

export function reiniciarSolicitud() {
  document.querySelectorAll('[id$="-error"][role="alert"]').forEach((p) => p.remove());
  document.querySelectorAll('[data-invalid]').forEach((n) => n.removeAttribute('data-invalid'));
  document.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
  botonesPagar().forEach((b) => { b.disabled = false; b.textContent = 'Pagar y contratar'; });
  reiniciar();
}
