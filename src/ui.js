export function mostrarListadoMonedas(monedas) {
  agregarMonedasBase(monedas);
  const $listado = document.querySelector('#listado');
  $listado.innerHTML = '';

  for (const [simbolo, moneda] of monedas) {
    const $filaMoneda = document.createElement('tr');
    const $simbolo = document.createElement('th');
    const $moneda = document.createElement('td');
    const $cambio = document.createElement('td');
    $simbolo.textContent = simbolo;
    $moneda.textContent = moneda;
    $cambio.textContent = '#';

    $listado.appendChild($filaMoneda);
    $filaMoneda.appendChild($simbolo);
    $filaMoneda.appendChild($moneda);
    $filaMoneda.appendChild($cambio);
  }
}

async function agregarMonedasBase(monedas) {
  const $monedasBase = document.querySelector('#monedas-base');

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
  return undefined;
}

export function obtenerFechaSeleccionada() {
  return undefined;
}

export function mostrarCartelCargando() {
  const $listado = document.querySelector('#listado');
  $listado.innerHTML = '';

  const $contendedor = document.createElement('div');
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
