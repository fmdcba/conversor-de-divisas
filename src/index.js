import {
  mostrarCartelCargando,
  mostrarListadoMonedas,
  obtenerFechaSeleccionada,
  obtenerMonedaSeleccionada,
  mostrarListadoCambios,
} from './ui.js';

import { obtenerCambios, obtenerMonedas } from './exchange.js';

async function actualizar() {
  const monedas = await obtenerCambios(
    obtenerFechaSeleccionada(),
    obtenerMonedaSeleccionada(),
  );
  mostrarListadoCambios(monedas);
}

async function inicializar() {
  mostrarCartelCargando();
  mostrarListadoMonedas(await obtenerMonedas(), actualizar);
}

inicializar();
