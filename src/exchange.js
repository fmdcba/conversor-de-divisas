const BASE_URL = 'https://api.frankfurter.app';

async function obtenerListadoMonedas() {
  const resultado = await fetch(`${BASE_URL}/currencies`);
  const resultadoJSON = await resultado.json();
  return resultadoJSON;
}

export async function obtenerMonedas() {
  const monedas = await obtenerListadoMonedas();
  return Object.entries(monedas);
}

async function obtenerListadoCambios(fecha = 'latest', base = 'AUD') {
  const resultado = await fetch(`${BASE_URL}/${fecha}?from=${base}`);
  const resultadoJSON = await resultado.json();
  if (resultadoJSON.rates) {
    return resultadoJSON.rates;
  } else {
    return resultadoJSON.message;
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

export async function obtenerConversionMoneda(cantidad, monedaDe, monedaA) {
  const resultado = await fetch(
    `${BASE_URL}/latest?amount=${cantidad}&from=${monedaDe}&to=${monedaA}`,
  );
  const resultadoJSON = resultado.json();
  return resultadoJSON;
}

export async function obtenerConversion(cantidad, monedaDe, monedaA) {
  if (monedaDe !== monedaA) {
    const conversion = await obtenerConversionMoneda(
      cantidad,
      monedaDe,
      monedaA,
    );
    if (conversion.rates) {
      return conversion.rates;
    } else {
      return '';
    }
  }
}
