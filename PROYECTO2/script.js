function Avion(nFilas, nColumnas, nombreCompania, pBase) {
  this.nFilas = nFilas;
  this.nColumnas = nColumnas;
  this.nombreCompania = nombreCompania;
  this.pBase = pBase;

  // inicializamos la matriz (arrays anidados)
  this.matriz = [];
  for (let i = 0; i < nFilas; i++) {
    this.matriz[i] = [];
    for (let j = 0; j < nColumnas; j++) {
      this.matriz[i][j] = false; // false = libre
    }
  }

  // reservar: marca asiento como ocupado
  this.reservar = function (fila, columna) {
    if (!this.matriz[fila][columna]) {
      this.matriz[fila][columna] = true;
      return true;
    }
    return false;
  };

  // liberar: marca asiento como libre
  this.liberar = function (fila, columna) {
    if (this.matriz[fila][columna]) {
      this.matriz[fila][columna] = false;
      return true;
    }
    return false;
  };

  // consulta
  this.estaOcupado = function (fila, columna) {
    return this.matriz[fila][columna];
  };
}

// Crea un Avion según la compañía
function crearAvionCompania(compania) {
  if (compania === "binter") return new Avion(18, 4, "Binter", 100);
  if (compania === "iberia") return new Avion(33, 6, "Iberia", 150);
  if (compania === "ryanair") return new Avion(33, 6, "Ryanair", 80);
  return new Avion(10, 4, "Generica", 90);
}

// variable global que guarda el avión actual en la página
let avionActual = null;

function mostrarTabla(avion) {
  // cabecera
  document.write("<h2>" + avion.nombreCompania + "</h2>");
  document.write('<div class="contenedor-tabla">');
  document.write('<table id="tabla-asientos" border="0" style="border-collapse:separate;border-spacing:8px;text-align:center;margin:0 auto;">');

  for (let i = 0; i < avion.nFilas; i++) {
    document.write("<tr>");
    
    for (let j = 0; j < avion.nColumnas; j++) {
      // Definir clase y precio
      let clase = "lowcost";
      let precio = avion.pBase;
      if (i < 2) {
        clase = "business";
        precio = Math.round(precio * 2);
      } else if (i < 5) {
        clase = "economica";
        precio = Math.round(precio * 1.5);
      }

      let ocupado = avion.matriz[i][j];
      
      // Convertir número de columna a letra (0=A, 1=B, etc.)
      let letraColumna = String.fromCharCode(65 + j);
      let idAsiento = (i + 1) + letraColumna; // Ejemplo: 12A
      
      // Usar clases para el estado ocupado
      let clasesAdicionales = ocupado ? ' ocupado' : '';

      // Crear celda de asiento
      document.write(
        "<td id='asiento-" + i + "-" + j + "' class='asiento " + clase + clasesAdicionales + "' " +
        "data-fila='" + i + "' data-columna='" + j + "' data-clase='" + clase + "' data-precio='" + precio + "'" +
        " style='width:70px;height:50px;cursor:pointer;color:white;font-weight:bold;border-radius:8px;padding:4px;font-size:12px;'>" +
        "<small>" + idAsiento + "</small><br>" +
        "<small>" + precio + "€</small>" +
        "</td>"
      );
      
      // Agregar pasillo después de la mitad de las columnas
      if (j === Math.floor(avion.nColumnas / 2) - 1) {
        document.write("<td class='pasillo'></td>");
      }
    }
    document.write("</tr>");
  }
  document.write("</table></div>");

  // --- ahora enlazamos eventos a cada celda ---
  for (let i = 0; i < avion.nFilas; i++) {
    for (let j = 0; j < avion.nColumnas; j++) {
      (function (fila, columna) {
        const td = document.getElementById("asiento-" + fila + "-" + columna);
        if (!td) return;

        // onclick: alterna reserva
        td.onclick = function () {
          handleSeatClick(fila, columna);
        };

        // onmouseover: efecto hover
        td.onmouseover = function () {
          td.style.opacity = "0.9";
          td.style.transform = "scale(1.05)";
        };
        td.onmouseout = function () {
          td.style.opacity = "1";
          td.style.transform = "none";
        };

        // onmousedown / onmouseup: pequeño feedback visual
        td.onmousedown = function () {
          td.style.transform = "scale(0.95)";
        };
        td.onmouseup = function () {
          if (td.style.opacity === "0.9") {
            td.style.transform = "scale(1.05)";
          } else {
            td.style.transform = "none";
          }
        };
      })(i, j);
    }
  }
}

/* Inicializa avionActual y dibuja la tabla */
function initAvionParaCompania(compania) {
  avionActual = crearAvionCompania(compania);
  mostrarTabla(avionActual);
}

/* Maneja el click sobre un asiento */
function handleSeatClick(fila, columna) {
  if (!avionActual) return;
  
  const td = document.getElementById("asiento-" + fila + "-" + columna);
  if (!td) return;
  
  if (avionActual.estaOcupado(fila, columna)) {
    avionActual.liberar(fila, columna);
    // Remover la clase ocupado y restaurar la clase original
    td.classList.remove('ocupado');
  } else {
    avionActual.reservar(fila, columna);
    // Agregar clase ocupado
    td.classList.add('ocupado');
  }
}

/* Función extra: calcula el precio total */
function calcularPrecioSeleccion() {
  if (!avionActual) {
    alert("No hay avión inicializado.");
    return;
  }

  let total = 0;
  for (let i = 0; i < avionActual.nFilas; i++) {
    for (let j = 0; j < avionActual.nColumnas; j++) {
      if (avionActual.estaOcupado(i, j)) {
        const td = document.getElementById("asiento-" + i + "-" + j);
        if (!td) continue;
        const precio = Number(td.dataset.precio) || avionActual.pBase;
        total += precio;
      }
    }
  }

  if (total === 0) {
    alert("No hay asientos seleccionados.");
    return;
  }

  const esResidente = confirm("¿Eres residente? Pulsa Aceptar para aplicar 75% de descuento.");
  if (esResidente) {
    total = total * 0.25;
  }
  total = Math.round(total * 100) / 100;

  const tsKey = "compra_asientos_session";
  sessionStorage.setItem(tsKey, JSON.stringify({
    compania: avionActual.nombreCompania,
    total: total,
    fecha: new Date().toISOString()
  }));

  alert("Precio final: " + total + "€ (datos guardados en sessionStorage).");
}