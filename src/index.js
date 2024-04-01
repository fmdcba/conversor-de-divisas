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
  console.log(monedas);

  for (const [simbolo, moneda] of monedas) {
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

obtenerMonedas();
