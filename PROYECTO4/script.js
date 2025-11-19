// Elementos principales
let arbol = document.getElementById("carpetas");
let formAgregar = document.getElementById("formFlotante");
let inputNombre = document.getElementById("nombreInput");
let selectTipo = document.getElementById("tipoSelect");
let inputBuscar = document.getElementById("buscarInput");

// Variable global para saber en qué carpeta agregar
let carpetaSeleccionada = null;

// Mostrar formulario al hacer clic en +
arbol.addEventListener("click", function(e) {
    if (e.target.classList.contains("btnMas")) {
        // Guardar en qué carpeta estamos agregando
        carpetaSeleccionada = e.target.closest(".carpeta");
        formAgregar.style.display = "block";
        inputNombre.focus();
    }
});

// Agregar elemento
document.getElementById("btnAgregar").addEventListener("click", function() {
    let nombre = inputNombre.value.trim();
    let tipo = selectTipo.value;

    if (!nombre) {
        alert("Ingresa un nombre");
        return;
    }

    if (tipo === "archivo" && !nombre.includes('.')) {
        alert("Los archivos deben tener extensión (.txt, .js, etc)");
        return;
    }

    let contenedor = carpetaSeleccionada.querySelector(".contenido-carpeta");
    
    // Verificar si ya existe
    let existe = false;
    let elementos = contenedor.querySelectorAll(".nombre-carpeta, .nombre-archivo");
    elementos.forEach(function(elem) {
        if (elem.textContent === nombre) {
            existe = true;
        }
    });

    if (existe) {
        alert("Ya existe un elemento con ese nombre");
        return;
    }

// En la función agregar elemento, cambia esto:
// Crear el nuevo elemento
if (tipo === "carpeta") {
    let nuevaCarpeta = document.createElement("div");
    nuevaCarpeta.className = "carpeta";
    nuevaCarpeta.innerHTML = `
        <div>
            <input type="checkbox" class="mostrar" checked>
            <span class="icono-carpeta">📁</span>
            <span class="nombre-carpeta">${nombre}</span>
            <button class="btnMas">+</button>
            <button class="btnX">x</button>
        </div>
        <div class="contenido-carpeta"></div>
    `;
    contenedor.appendChild(nuevaCarpeta);
} else {
    let nuevoArchivo = document.createElement("div");
    nuevoArchivo.className = "archivo";
    nuevoArchivo.innerHTML = `
        <span class="icono-archivo">📄</span>
        <span class="nombre-archivo">${nombre}</span>
        <button class="btnX">x</button>
    `;
    contenedor.appendChild(nuevoArchivo);
}

    // Limpiar y cerrar formulario
    inputNombre.value = "";
    formAgregar.style.display = "none";
});

// Cancelar formulario
document.getElementById("btnCancelar").addEventListener("click", function() {
    formAgregar.style.display = "none";
    inputNombre.value = "";
});

// Eliminar elementos
arbol.addEventListener("click", function(e) {
    if (e.target.classList.contains("btnX")) {
        let elemento = e.target.closest(".carpeta, .archivo");
        
        // No permitir eliminar la raíz
        if (elemento.classList.contains("raiz")) {
            alert("No se puede eliminar la carpeta raíz");
            return;
        }

        // Verificar si la carpeta está vacía
        if (elemento.classList.contains("carpeta")) {
            let contenido = elemento.querySelector(".contenido-carpeta");
            if (contenido.children.length > 0) {
                alert("No se puede eliminar una carpeta que no está vacía");
                return;
            }
        }

        // Eliminar el elemento
        elemento.remove();
    }
});

// Mostrar/ocultar contenido con checkbox
arbol.addEventListener("click", function(e) {
    if (e.target.classList.contains("mostrar")) {
        let carpeta = e.target.closest(".carpeta");
        let contenido = carpeta.querySelector(".contenido-carpeta");
        
        if (e.target.checked) {
            contenido.classList.remove("oculto");
        } else {
            contenido.classList.add("oculto");
        }
    }
});

// Buscar elementos
document.getElementById("btnBuscar").addEventListener("click", buscar);

function buscar() {
    let texto = inputBuscar.value.trim().toLowerCase();
    
    if (!texto) {
        // Mostrar todos si no hay texto
        document.querySelectorAll(".carpeta, .archivo").forEach(function(elem) {
            elem.classList.remove("oculto");
            elem.classList.remove("coincidencia");
        });
        return;
    }

    // Ocultar todos primero
    document.querySelectorAll(".carpeta, .archivo").forEach(function(elem) {
        elem.classList.add("oculto");
    });

    let encontrados = 0;

    // Buscar en carpetas
    document.querySelectorAll(".nombre-carpeta").forEach(function(nombre) {
        if (nombre.textContent.toLowerCase().includes(texto)) {
            let carpeta = nombre.closest(".carpeta");
            carpeta.classList.remove("oculto");
            carpeta.classList.add("coincidencia");
            encontrados++;
            
            // Mostrar padres
            mostrarPadres(carpeta);
        }
    });

    // Buscar en archivos
    document.querySelectorAll(".nombre-archivo").forEach(function(nombre) {
        if (nombre.textContent.toLowerCase().includes(texto)) {
            let archivo = nombre.closest(".archivo");
            archivo.classList.remove("oculto");
            archivo.classList.add("coincidencia");
            encontrados++;
            
            // Mostrar padres
            mostrarPadres(archivo);
        }
    });

    if (encontrados === 0) {
        alert("No se encontraron elementos con ese nombre");
    }
}

// Función para mostrar elementos padres
function mostrarPadres(elemento) {
    let padre = elemento.parentElement.closest(".carpeta");
    while (padre) {
        padre.classList.remove("oculto");
        padre = padre.parentElement.closest(".carpeta");
    }
}

// Autocompletar con TAB
inputBuscar.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
        e.preventDefault();
        
        let texto = inputBuscar.value.trim().toLowerCase();
        if (!texto) return;

        let coincidencias = [];
        
        // Buscar coincidencias
        document.querySelectorAll(".nombre-carpeta, .nombre-archivo").forEach(function(nombre) {
            if (nombre.textContent.toLowerCase().includes(texto)) {
                coincidencias.push(nombre.textContent);
            }
        });

        // Eliminar duplicados
        coincidencias = [...new Set(coincidencias)];

        // Autocompletar si hay una sola coincidencia
        if (coincidencias.length === 1) {
            inputBuscar.value = coincidencias[0];
        }
    }
    
    // Buscar con Enter
    if (e.key === "Enter") {
        e.preventDefault();
        buscar();
    }
});

// Agregar con Enter en el formulario
inputNombre.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("btnAgregar").click();
    }
});