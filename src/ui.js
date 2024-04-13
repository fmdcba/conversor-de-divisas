export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
  agregarMonedasBase(monedas);
  const $listado = document.querySelector('#listado');
  const $cartelCarga = document.querySelector('#cartel-carga');
  $cartelCarga.remove();

  console.log(monedas);
  for (const [simbolo, moneda] of monedas) {
    const $filaMoneda = document.createElement('tr');
    const $simbolo = document.createElement('th');
    const $moneda = document.createElement('td');
    const $cambio = document.createElement('td');
    $filaMoneda.id = simbolo;
    $simbolo.textContent = simbolo;
    $moneda.textContent = moneda;
    $cambio.textContent = '#';
    $cambio.className = 'cambios';

    $listado.appendChild($filaMoneda);
    $filaMoneda.appendChild($simbolo);
    $filaMoneda.appendChild($moneda);
    $filaMoneda.appendChild($cambio);
  }

  document.querySelector('#mostrar').onclick = callbackSeleccionMoneda;
}

export function mostrarListadoCambios(cambios) {
  borrarCambiosAnteriores(cambios);
  const base = document.querySelector('#base').value;
  const $monedaActiva = document.querySelector(`#${base}`);
  const $cambioActivo = $monedaActiva.lastChild;
  $cambioActivo.textContent = '$ 1';
  $monedaActiva.className = 'table-light';

  for (const [simbolo, cambio] of cambios) {
    const $moneda = document.querySelector(`#${simbolo} td:last-child`);
    if ($moneda !== null) {
      $moneda.textContent = `$ ${cambio}`;
    }
  }
}

function borrarCambiosAnteriores(cambios) {
  document.querySelectorAll('.cambios').forEach(($cambio) => {
    $cambio.textContent = '#';
  });

  for (const [simbolo, cambio] of cambios) {
    const $monedaResaltada = document.querySelector(`#${simbolo}`);

    if ($monedaResaltada.classList.contains('table-light')) {
      $monedaResaltada.classList.remove('table-light');
    }
  }
}

function agregarMonedasBase(monedas) {
  const $monedasBase = document.querySelector('#base');

  for (const [simbolo] of monedas) {
    const $base = document.createElement('option');
    $base.setAttribute('for', simbolo);
    $base.textContent = simbolo;

    $monedasBase.appendChild($base);
  }
}

export function obtenerMonedaSeleccionada() {
  const $base = document.querySelector('#base').value;

  if ($base) {
    return $base;
  } else {
    return undefined;
  }
}

export function obtenerFechaSeleccionada() {
  const $fecha = document.querySelector('#fecha').value;

  if ($fecha) {
    return $fecha;
  } else {
    return undefined;
  }
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
