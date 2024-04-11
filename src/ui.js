export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
  agregarMonedasBase(monedas);
  const $listado = document.querySelector('#listado');
  const $cartelCarga = document.querySelector('#cartel-carga');
  $cartelCarga.remove();

  for (const [simbolo, moneda] of monedas) {
    const $filaMoneda = document.createElement('tr');
    const $simbolo = document.createElement('th');
    const $moneda = document.createElement('td');
    const $cambio = document.createElement('td');
    $filaMoneda.id = simbolo;
    $simbolo.textContent = simbolo;
    $moneda.textContent = moneda;
    $cambio.textContent = '#';

    $listado.appendChild($filaMoneda);
    $filaMoneda.appendChild($simbolo);
    $filaMoneda.appendChild($moneda);
    $filaMoneda.appendChild($cambio);
  }

  document.querySelector('#listar').onclick = callbackSeleccionMoneda;
}

export function mostrarListadoCambios(cambios) {
  for (const [simbolo, cambio] of cambios) {
    const $moneda = document.querySelector(`#${simbolo} td:last-child`);
    $moneda.textContent = cambio;
  }
}

function agregarMonedasBase(monedas) {
  const $monedasBase = document.querySelector('#moneda-base');

  for (const [simbolo] of monedas) {
    const $base = document.createElement('option');
    $base.setAttribute('for', simbolo);
    $base.textContent = simbolo;

    $monedasBase.appendChild($base);
  }
}

export function mostrarMonedas(monedas) {
  for (const [simbolo, moneda] of monedas) {
  }
}

export function obtenerMonedaSeleccionada() {
  const $base = document.querySelector('#moneda-base').value;

  if ($base) {
    return $base;
  } else {
    return undefined;
  }
}

export function obtenerFechaSeleccionada() {
  return undefined;
}

export function mostrarCartelCargando() {
  const $listado = document.querySelector('#listado');
  $listado.innerHTML = '';

  const $contendedor = document.createElement('div');
  $contendedor.id = 'cartel-carga';
  const $mensajeCarga = document.createElement('strong');
  const $animacionCarga = document.createElement('div');
  $contendedor.classList.add('d-flex', 'align-items-center');
  $mensajeCarga.textContent = 'Cargando monedas...';
  $mensajeCarga.setAttribute('role', 'status');
  $animacionCarga.setAttribute('aria-hidden', 'true');
  $animacionCarga.classList.add('spinner-border', 'ms-auto');

  $contendedor.appendChild($mensajeCarga);
  $contendedor.appendChild($animacionCarga);
  $listado.appendChild($contendedor);
}

export function configurarFechas() {
  const $fecha = document.querySelector('#fecha');
  const FECHA_MINIMA_PERMITIDA = '1999-01-04';

  $fecha.max = new Date().toISOString().split('T')[0];
  $fecha.min = FECHA_MINIMA_PERMITIDA;
}
