import {
  mostrarCartelCargando,
  mostrarListadoMonedas,
  obtenerFechaSeleccionada,
  obtenerMonedaSeleccionada,
} from './ui.js';

import { obtenerMonedas } from './exchange.js';

/* async function actualizar() {
  mostrarCartelCargando();
  const monedas = await obtenerCambios(
    obtenerFechaSeleccionada(),
    obtenerMonedaSeleccionada(),
  );
  mostrarMonedas(monedas);
} */

async function inicializar() {
  mostrarCartelCargando();
  const monedas = await obtenerMonedas();
  mostrarListadoMonedas(monedas);
}

inicializar();

/* const API = 'https://api.frankfurter.app';
const $tabla = document.querySelector('.table #listado');

function obtenerMonedas() {
  fetch(`${API}/currencies`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      const Monedas = Object.entries(respuestaJSON);
      mostrarMonedas(Monedas);
    })
    .catch((error) => console.log('Falló', error));
}

function mostrarMonedas(monedas) {
  for (const [simbolo, moneda] of monedas) {
    mostrarSimbolosBase(simbolo);
    mostrarSimbolosConversor(simbolo);
    const $fila = document.createElement('tr');
    const $simbolo = document.createElement('th');
    const $moneda = document.createElement('td');
    const $valor = document.createElement('td');
    $fila.id = simbolo;
    $valor.id = `valor-${simbolo}`;
    $valor.className = 'valor';
    $simbolo.textContent = simbolo;
    $moneda.textContent = moneda;
    $valor.textContent = '#';

    $tabla.appendChild($fila);
    $fila.appendChild($simbolo);
    $fila.appendChild($moneda);
    $fila.appendChild($valor);
  }
}

function mostrarSimbolosBase(simbolo) {
  const $contenedorBases = document.querySelector('#simbolo-base');
  const $opcionBase = document.createElement('option');
  $opcionBase.textContent = simbolo;

  $contenedorBases.appendChild($opcionBase);
}

function mostrarSimbolosConversor(simbolo) {
  const $contenedorBaseDe = document.querySelector('#convertir-de');
  const $contenedorBaseA = document.querySelector('#convertir-a');
  const $opcionBaseDe = document.createElement('option');
  $opcionBaseDe.textContent = simbolo;
  $opcionBaseDe.value = simbolo;
  const $opcionBaseA = document.createElement('option');
  $opcionBaseA.textContent = simbolo;
  $opcionBaseA.value = simbolo;

  $contenedorBaseDe.appendChild($opcionBaseDe);
  $contenedorBaseA.appendChild($opcionBaseA);
}

document.querySelector('#listar').onclick = function (e) {
  const $mensajeFecha = document.querySelector('#mensaje-fecha');
  $mensajeFecha.textContent = '';

  manejarBase();
  e.preventDefault();
};

function manejarBase() {
  const $simbolo = document.querySelector('#simbolo-base');
  const simbolo = $simbolo.value;
  const $valor = document.querySelector(`#valor-${simbolo}`);
  const $filaValor = document.querySelector(`#${simbolo}`);
  $filaValor.className = 'table-light';
  $valor.textContent = '$1';

  actualizarValores(simbolo);
}

function actualizarValores(base) {
  fetch(`${API}/latest?from=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      const valores = Object.entries(respuestaJSON.rates);

      mostrarValores(valores);
    })
    .catch((error) => console.log('Falló', error));
}

function mostrarValores(valores) {
  for (const [simbolo, valor] of valores) {
    const $filaValor = document.querySelector(`#${simbolo}`);
    const $valor = document.querySelector(`#valor-${simbolo}`);

    if ($valor !== null) {
      $valor.textContent = `$${valor}`;
    }

    if ($filaValor !== null) {
      if ($filaValor.classList.contains('table-light')) {
        $filaValor.classList.remove('table-light');
      }
    }
  }
}

document.querySelector('#filtrar-fecha').onclick = function (e) {
  filtrarPorFecha();
  e.preventDefault();
};

function filtrarPorFecha() {
  const $anio = document.querySelector('#anio');
  const $mes = document.querySelector('#mes');
  const $dia = document.querySelector('#dia');
  const $simbolo = document.querySelector('#simbolo-base');
  const anio = Number($anio.value);
  let mes = Number($mes.value);
  let dia = Number($dia.value);
  const simbolo = $simbolo.value;

  if (mes < 10) {
    mes = ('0' + mes).slice(-2);
  }

  if (dia < 10) {
    dia = ('0' + dia).slice(-2);
  }

  obtenerValoresPorFecha(anio, mes, dia, simbolo);
}

function obtenerValoresPorFecha(anio, mes, dia, simbolo) {
  fetch(`${API}/${anio}-${mes}-${dia}?from=${simbolo}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      const $mensaje = document.querySelector('#mensaje-fecha');
      resultado = respuestaJSON;

      if (resultado.message) {
        $mensaje.textContent = 'No encontrado';
        $mensaje.className = 'badge text-bg-danger';
        reiniciarValores();
      } else {
        valores = Object.entries(resultado.rates);

        $mensaje.textContent = `Valores filtrados en fecha ${resultado.date} en base a $${resultado.amount}-${simbolo}`;
        $mensaje.className = 'badge text-bg-success';

        reiniciarValores();
        mostrarValores(valores);
      }
    })
    .catch((error) => console.log('Falló', error));
}

function reiniciarValores() {
  document.querySelectorAll('.valor').forEach((valor) => {
    valor.textContent = '#';
  });
}

document.querySelector('#convertir').onclick = function (e) {
  obtenerValoresParaConversion();
  e.preventDefault();
};

function obtenerValoresParaConversion() {
  const cantidad = document.querySelector('#cantidad').value;
  const convertirDe = document.querySelector('#convertir-de').value;
  const convertirA = document.querySelector('#convertir-a').value;

  convertirMoneda(cantidad, convertirDe, convertirA);
}

function convertirMoneda(cantidad, monedaDe, monedaA) {
  fetch(`${API}/latest?amount=${cantidad}&from=${monedaDe}&to=${monedaA}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      mostrarResultadoConversion(respuestaJSON);
    });
}

function mostrarResultadoConversion(resultado) {
  const $mensajeResultado = document.querySelector('#resultado-conversion');
  $mensajeResultado.textContent = `$${resultado.amount}-"${
    resultado.base
  }" equivale a $${Object.values(resultado.rates)}-"${Object.keys(
    resultado.rates,
  )}" a fecha ${resultado.date}`;
  $mensajeResultado.className = 'badge text-bg-success';
}

obtenerMonedas();
 */
