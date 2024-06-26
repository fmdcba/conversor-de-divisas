export function mostrarListadoMonedas(
  monedas,
  callbackSeleccionMoneda,
  callbackConvertir,
) {
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
  document.querySelector('#convertir').onclick = callbackConvertir;
}

export function mostrarListadoCambios(cambios) {
  const $mensajeCambios = document.querySelector('#mensaje');

  if (typeof cambios === 'string') {
    const mensajeError = cambios;
    mostrarMensajeError($mensajeCambios, mensajeError);
  } else {
    mostrarInformacionSeleccion($mensajeCambios);
  }

  borrarCambiosAnteriores();
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

export function mostrarConversion(conversion) {
  document.querySelector('#conversion').textContent =
    `El resultado es $${Object.entries(conversion)}`;
}

function mostrarInformacionSeleccion($mensaje) {
  const $base = document.querySelector('#base').value;
  const $fecha = document.querySelector('#fecha').value;

  if ($fecha) {
    $mensaje.textContent = `Mostrando cambios para ${$base} en fecha ${$fecha}`;
  } else {
    $mensaje.textContent = `Mostrando cambios mas recientes para ${$base}`;
  }
}

function mostrarMensajeError($mensaje, error) {
  $mensaje.textContent = error;
}

function borrarCambiosAnteriores() {
  const $monedaResaltada = document.querySelector('.table-light');

  if ($monedaResaltada !== null) {
    $monedaResaltada.classList.remove('table-light');
  }

  document.querySelectorAll('.cambios').forEach(($cambio) => {
    $cambio.textContent = '#';
  });
}

function agregarMonedasBase(monedas) {
  const $monedasBase = document.querySelector('#base');
  const $monedaConvertirDe = document.querySelector('#moneda-de');
  const $monedaConvertirA = document.querySelector('#moneda-a');

  for (const [simbolo] of monedas) {
    const $base = document.createElement('option');
    const $baseA = document.createElement('option');
    const $baseDe = document.createElement('option');
    $base.setAttribute('for', simbolo);
    $base.textContent = simbolo;
    $baseDe.textContent = simbolo;
    $baseA.textContent = simbolo;

    $monedasBase.appendChild($base);
    $monedaConvertirDe.appendChild($baseDe);
    $monedaConvertirA.appendChild($baseA);
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
  const fecha = document.querySelector('#fecha').value;

  if (fecha) {
    return fecha;
  } else {
    return undefined;
  }
}

export function obtenerCantidad() {
  const cantidad = document.querySelector('#cantidad').value;

  return cantidad;
}

export function obtenerMonedaDe() {
  const monedaDe = document.querySelector('#moneda-de').value;

  return monedaDe;
}

export function obtenerMonedaA() {
  const monedaA = document.querySelector('#moneda-a').value;

  return monedaA;
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
