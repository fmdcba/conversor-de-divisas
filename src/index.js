const API = "https://api.frankfurter.app";
const $tabla = document.querySelector(".table #listado");

function obtenerMonedas() {
  fetch(`${API}/currencies`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      const Monedas = Object.entries(respuestaJSON);

      mostrarMonedas(Monedas);
    })
    .catch((error) => console.log("Falló", error));
}

function mostrarMonedas(monedas) {
  for (const [simbolo, moneda] of monedas) {
    mostrarSimbolosBase(simbolo);
    mostrarSimbolosConversor(simbolo);
    const $fila = document.createElement("tr");
    const $simbolo = document.createElement("th");
    const $moneda = document.createElement("td");
    const $valor = document.createElement("td");
    $fila.id = simbolo;
    $valor.id = `valor-${simbolo}`;
    $simbolo.textContent = simbolo;
    $moneda.textContent = moneda;
    $valor.textContent = "#";

    $tabla.appendChild($fila);
    $fila.appendChild($simbolo);
    $fila.appendChild($moneda);
    $fila.appendChild($valor);
  }
}

function mostrarSimbolosBase(simbolo) {
  const $contenedorBases = document.querySelector("#simbolo-base");
  const $opcionBase = document.createElement("option");
  $opcionBase.textContent = simbolo;

  $contenedorBases.appendChild($opcionBase);
}

function mostrarSimbolosConversor(simbolo) {
  const $contenedorBaseDe = document.querySelector("#convertir-de");
  const $contenedorBaseA = document.querySelector("#convertir-a");
  const $opcionBaseDe = document.createElement("option");
  $opcionBaseDe.textContent = simbolo;
  $opcionBaseDe.value = simbolo;
  const $opcionBaseA = document.createElement("option");
  $opcionBaseA.textContent = simbolo;
  $opcionBaseA.value = simbolo;

  $contenedorBaseDe.appendChild($opcionBaseDe);
  $contenedorBaseA.appendChild($opcionBaseA);
}

function manejarSeleccionBase() {
  document.querySelectorAll("#simbolo-base option").forEach((simbolo) => {
    simbolo.onclick = function (e) {
      console.log(e.target);
    };
  });
}

document.querySelector("#listar").onclick = function (e) {
  manejarBase();
  e.preventDefault();
};

function manejarBase() {
  const $simbolo = document.querySelector("#simbolo-base");
  const simbolo = $simbolo.value;
  const $valor = document.querySelector(`#valor-${simbolo}`);
  const $filaValor = document.querySelector(`#${simbolo}`);
  $filaValor.className = "table-dark";
  $valor.textContent = 1;

  actualizarValores(simbolo);
}

function actualizarValores(base) {
  fetch(`${API}/latest?from=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      const valores = Object.entries(respuestaJSON.rates);

      mostrarValores(valores);
    })
    .catch((error) => console.log("Falló", error));
}

function mostrarValores(valores) {
  for (const [simbolo, valor] of valores) {
    const $filaValor = document.querySelector(`#${simbolo}`);
    const $valor = document.querySelector(`#valor-${simbolo}`);
    $valor.textContent = valor;

    if ($filaValor.classList.contains("table-dark")) {
      $filaValor.classList.remove("table-dark");
    }
  }
}

obtenerMonedas();
