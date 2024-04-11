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
  try {
    const resultado = await fetch(`${BASE_URL}/${fecha}?from=${base}`);
    const resultadoJSON = await resultado.json();
    if (resultadoJSON.rates) {
      return resultadoJSON.rates;
    } else {
      return resultadoJSON.message;
    }
  } catch (error) {
    return console.log(error);
  }
}

export async function obtenerCambios(fecha, base) {
  const cambios = await obtenerListadoCambios(fecha, base);
  if (cambios === 'not found') {
    return `No se encontraron cambios para ${base} en fecha ${fecha}`;
  } else {
    return Object.entries(cambios);
  }
}
