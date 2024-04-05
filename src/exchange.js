const BASE_URL = 'https://api.frankfurter.app';

export async function obtenerListadoMonedas() {
  const resultado = await fetch(`${BASE_URL}/currencies`);
  const resultadoJSON = await resultado.json();
  return resultadoJSON;
}

export async function obtenerMonedas() {
  const monedas = await obtenerListadoMonedas();
  return Object.entries(monedas);
}

export async function obtenerListadoCambios(fecha = 'latest', base = 'AUD') {
  const resultado = await fetch(`${BASE_URL}/${fecha}?base=${base}`);
  const resultadoJSON = await resultado.json();
  return resultadoJSON.rates;
}

export async function obtenerCambios() {
  const cambios = await obtenerListadoCambios();
  return Object.entries(cambios);
}
