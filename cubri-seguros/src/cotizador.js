// Única función que calcula la cuota (la usan planes y resumen).
export const FACTORES = { menos1: 1.0, '1a2': 1.1, mas2: 1.25 };

export function calcularCuota(valor, tasaAnual, antiguedad) {
  const factor = FACTORES[antiguedad] ?? 1;
  return Math.round(((valor * tasaAnual) / 12) * factor);
}
