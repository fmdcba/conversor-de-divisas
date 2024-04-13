import {
  mostrarCartelCargando,
  mostrarListadoMonedas,
  obtenerFechaSeleccionada,
  obtenerMonedaSeleccionada,
  mostrarListadoCambios,
  configurarFechas,
  obtenerCantidad,
  obtenerMonedaDe,
  obtenerMonedaA,
  mostrarConversion,
} from './ui.js';

import {
  obtenerCambios,
  obtenerMonedas,
  obtenerConversion,
} from './exchange.js';

async function convertir() {
  const conversion = await obtenerConversion(
    obtenerCantidad(),
    obtenerMonedaDe(),
    obtenerMonedaA(),
  );
  mostrarConversion(conversion);
}

async function actualizar() {
  const cambios = await obtenerCambios(
    obtenerFechaSeleccionada(),
    obtenerMonedaSeleccionada(),
  );
  mostrarListadoCambios(cambios);
}

async function inicializar() {
  mostrarCartelCargando();
  mostrarListadoMonedas(await obtenerMonedas(), actualizar, convertir);
  configurarFechas();
}

inicializar();
