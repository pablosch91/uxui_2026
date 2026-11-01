const ars = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
export const moneda = (n) => ars.format(n).replace(/\u00a0/g, ' ');
