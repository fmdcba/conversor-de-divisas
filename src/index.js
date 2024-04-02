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
    $simbolo.textContent = simbolo;
    $moneda.textContent = moneda;

    $tabla.appendChild($fila);
    $fila.appendChild($simbolo);
    $fila.appendChild($moneda);
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
  const $opcionBaseA = document.createElement("option");
  $opcionBaseA.textContent = simbolo;

  $contenedorBaseDe.appendChild($opcionBaseDe);
  $contenedorBaseA.appendChild($opcionBaseA);
}
obtenerMonedas();
