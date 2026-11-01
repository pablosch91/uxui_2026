// Funciones puras: reciben un valor y devuelven un mensaje de error o null.
const sinSeparadores = (s) => String(s).replace(/[\s-]/g, '');
const letras = (s) => (String(s).match(/\p{L}/gu) ?? []).length;

export const validarMarca = (v) => (v ? null : 'Elegí una marca');

export const validarModelo = (v) => {
  const t = String(v).trim();
  return t.length >= 2 && t.length <= 40 ? null : 'Ingresá el modelo del equipo';
};

export const validarValor = (n) =>
  Number.isFinite(n) && n >= 100000 && n <= 2500000 ? null : 'El valor debe estar entre $100.000 y $2.500.000';

export const validarAntiguedad = (v) => (v ? null : 'Indicá la antigüedad');

export const validarNombre = (v) => (letras(v) >= 2 ? null : 'Ingresá tu nombre');
export const validarApellido = (v) => (letras(v) >= 2 ? null : 'Ingresá tu apellido');

export const validarDni = (v) => (/^\d{7,8}$/.test(String(v).trim()) ? null : 'El DNI debe tener 7 u 8 números');

// fecha: "AAAA-MM-DD" (lo que devuelve <input type="date">)
export function validarNacimiento(fecha, hoy = new Date()) {
  const msg = 'Tenés que ser mayor de edad';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha ?? '');
  if (!m) return msg;
  const [anio, mes, dia] = [Number(m[1]), Number(m[2]), Number(m[3])];
  let edad = hoy.getFullYear() - anio;
  if (hoy.getMonth() + 1 < mes || (hoy.getMonth() + 1 === mes && hoy.getDate() < dia)) edad--;
  return anio > 1900 && edad >= 18 ? null : msg;
}

export const validarEmail = (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()) ? null : 'Ingresá un email válido');

// 10 dígitos, sin 0 ni 15 al principio; se ignoran espacios y guiones.
export function validarCelular(v) {
  const c = sinSeparadores(v);
  return /^\d{10}$/.test(c) && !c.startsWith('0') && !c.startsWith('15') ? null : 'Ej.: 11 5555-1234';
}

export const validarTerminos = (v) => (v ? null : 'Tenés que aceptar los términos');

export const validarTarjeta = (v) => (/^\d{16}$/.test(String(v).replace(/\s/g, '')) ? null : 'Número de tarjeta inválido');

// MM/AA, mes 01–12 y que no haya vencido (la tarjeta vale hasta fin de mes).
export function validarVencimiento(v, hoy = new Date()) {
  const msg = 'Vencimiento inválido';
  const m = /^(\d{2})\/(\d{2})$/.exec(String(v).trim());
  if (!m) return msg;
  const mes = Number(m[1]);
  const anio = 2000 + Number(m[2]);
  if (mes < 1 || mes > 12) return msg;
  return new Date(anio, mes, 0, 23, 59, 59) >= hoy ? null : msg;
}

export const validarCvv = (v) => (/^\d{3}$/.test(String(v).trim()) ? null : 'CVV inválido');
export const validarTitular = (v) => (String(v).trim() ? null : 'Ingresá el nombre del titular');
