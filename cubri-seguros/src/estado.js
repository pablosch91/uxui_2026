// Un único objeto con toda la información del flujo.
const inicial = () => ({
  paso: 0, // 0 = inicio, 1..4 = checkout, 5 = éxito, 6 = error
  equipo: { marca: '', modelo: '', valor: 0, antiguedad: '' },
  plan: 'plus',
  titular: { nombre: '', apellido: '', dni: '', nacimiento: '', email: '', celular: '', terminos: false },
  pago: { metodo: 'credito', tarjeta: '', vencimiento: '', cvv: '', titular: '' },
  poliza: null,
});
export const solicitud = inicial();

// render() se registra desde main.js (evita imports circulares)
let alCambiar = () => {};
export function suscribir(fn) { alCambiar = fn; }

export function irAPaso(n) {
  solicitud.paso = n;
  alCambiar(); // siempre después de cambiar el estado
}

export function reiniciar() {
  Object.assign(solicitud, inicial());
  irAPaso(0);
}

// Solo para revisar el maquetado: abrir con ?demo
export function cargarDemo() {
  solicitud.equipo = { marca: 'Samsung', modelo: 'Galaxy A55', valor: 600000, antiguedad: 'menos1' };
  solicitud.titular.nombre = 'Juan';
  solicitud.titular.apellido = 'Pérez';
  solicitud.titular.email = 'juan.perez@mail.com';
  solicitud.poliza = 'POL-2026-000123';
}
