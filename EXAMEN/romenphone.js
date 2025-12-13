const telefono = {

    // ATRIBUTOS
    numeroMarcado: "",
    
    teclas: {
        "1": ["1"],
        "2": ["2", "A", "B", "C"],
        "3": ["3", "D", "E", "F"],
        "4": ["4", "G", "H", "I"],
        "5": ["5", "J", "K", "L"],
        "6": ["6", "M", "N", "O"],
        "7": ["7", "P", "Q", "R", "S"],
        "8": ["8", "T", "U", "V"],
        "9": ["9", "W", "X", "Y", "Z"],
        "0": ["0"]
    },

    // ATRIBUTOS PARA TIMERS (PUNTO 2.c)
    ultimaTeclaPulsada: null,
    indiceCaracterActual: 0,
    timer: null,
    tiempoEspera: 3000,

    // ATRIBUTOS PARA EL DOM (PUNTO 2.e)
    contadorCajones: 1,
    cajonActivo: null,

    dom: {},

    // INICIO - MÉTODO PRINCIPAL
    init() {
        this.cargarElementosDOM();
        this.configurarEventos();
        this.cargarNumeroDeSessionStorage();
    },

    // MÉTODO PARA CARGAR ELEMENTOS DEL DOM
    cargarElementosDOM() {
        this.dom.tabla = document.getElementById('tabla');
        this.dom.cajonAzul = document.getElementById('cajonAzul');
        this.dom.formulario = document.getElementById('contenedor');
        this.dom.btnVerde = document.getElementById('btnVerde');
        this.dom.btnRojo = document.getElementById('btnRojo');
        this.dom.btnR = document.getElementById('btnR');
        this.dom.mensajes = document.getElementById('mensajes');
        
        // El primer cajón activo es el cajonAzul original
        this.cajonActivo = this.dom.cajonAzul;
        
        // Deshabilitar botón verde inicialmente
        this.dom.btnVerde.disabled = true;
    },

    // MÉTODO PARA CONFIGURAR TODOS LOS EVENTOS (PUNTO 2.b)
    configurarEventos() {
        // Prevenir que el formulario se envíe
        this.dom.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Evento para las teclas numéricas (mouseup como pide el examen)
        this.dom.tabla.addEventListener('mouseup', (e) => {
            e.preventDefault();

            const boton = e.target.closest('button');
            
            if (boton && boton.id !== 'btnVerde' && boton.id !== 'btnRojo' && boton.id !== 'btnR') {
                const textoBoton = boton.textContent.trim();
                // Obtener el primer carácter que es el número
                const primeraLinea = textoBoton.split('\n')[0];
                const tecla = primeraLinea.trim().charAt(0);
                
                const caracteresTecla = this.teclas[tecla];
                
                if (caracteresTecla) {
                    this.procesarPulsacionTecla(tecla, caracteresTecla);
                }
            }
        });

        // Evento para el botón verde de Llamar (PUNTO 2.e)
        this.dom.btnVerde.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.realizarLlamada();
        });

        // Evento para el botón R de Rellamada (PUNTO 2.f)
        this.dom.btnR.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.realizarRellamada();
        });

        // Evento para el botón rojo de Colgar (PUNTO 2.e)
        this.dom.btnRojo.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.realizarColgar();
        });
    },

    // MÉTODO PARA PROCESAR PULSACIÓN DE TECLA (PUNTO 2.c)
    procesarPulsacionTecla(tecla, caracteresTecla) {
        // Verificar si contiene "CUMPLE" (PUNTO 2.d)
        const textoActual = this.cajonActivo.value + tecla;
        if (this.verificarPalabraCumple(textoActual)) {
            this.reiniciarAplicacionCompleta();
            return;
        }

        // Lógica del timer (PUNTO 2.c)
        if (this.ultimaTeclaPulsada === tecla && this.timer !== null) {
            clearTimeout(this.timer);
            
            this.indiceCaracterActual = (this.indiceCaracterActual + 1) % caracteresTecla.length;
            
            this.reemplazarUltimoCaracterEnCajon(caracteresTecla[this.indiceCaracterActual]);
        } else {
            this.ultimaTeclaPulsada = tecla;
            this.indiceCaracterActual = 0;
            
            this.agregarCaracterACajon(caracteresTecla[0]);
        }
        
        this.iniciarContadorTimer();
        
        // Validar número después de cada pulsación (PUNTO 2.d)
        this.validarNumeroTelefonico();
    },

    // MÉTODO PARA AGREGAR CARACTER AL CAJÓN ACTIVO
    agregarCaracterACajon(caracter) {
        if (this.cajonActivo.value.length < 9) {
            this.cajonActivo.value += caracter;
        }
    },

    // MÉTODO PARA REEMPLAZAR ÚLTIMO CARACTER EN CAJÓN
    reemplazarUltimoCaracterEnCajon(caracter) {
        const valorActual = this.cajonActivo.value;
        if (valorActual.length > 0) {
            this.cajonActivo.value = valorActual.slice(0, -1) + caracter;
        }
    },

    // MÉTODO PARA INICIAR CONTADOR TIMER (PUNTO 2.c)
    iniciarContadorTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        
        this.timer = setTimeout(() => {
            this.reiniciarEstadoTimer();
        }, this.tiempoEspera);
    },

    // MÉTODO PARA REINICIAR ESTADO DEL TIMER
    reiniciarEstadoTimer() {
        this.ultimaTeclaPulsada = null;
        this.indiceCaracterActual = 0;
        this.timer = null;
    },

    // MÉTODO PARA VALIDAR NÚMERO TELEFÓNICO (PUNTO 2.d)
    validarNumeroTelefonico() {
        const numero = this.cajonActivo.value;
        
        // Expresión regular para número español (PUNTO 2.d)
        const esNumeroValido = /^[6-9]\d{8}$/.test(numero);
        
        // Cambiar color según validación
        if (esNumeroValido) {
            this.cajonActivo.style.color = "green";
            this.cajonActivo.style.borderColor = "green";
            this.dom.btnVerde.disabled = false;
        } else {
            this.cajonActivo.style.color = "red";
            this.cajonActivo.style.borderColor = "red";
            this.dom.btnVerde.disabled = true;
        }
    },

    // MÉTODO PARA VERIFICAR PALABRA "CUMPLE" (PUNTO 2.d)
    verificarPalabraCumple(texto) {
        const textoMayusculas = texto.toUpperCase();
        const letrasRequeridas = ["C", "U", "M", "P", "L", "E"];
        
        // Verificar si todas las letras están presentes
        return letrasRequeridas.every(letra => textoMayusculas.includes(letra));
    },

    // MÉTODO PARA REINICIAR APLICACIÓN COMPLETA (PUNTO 2.d)
    reiniciarAplicacionCompleta() {
        // Limpiar todos los cajones
        const todosCajones = document.querySelectorAll('textarea');
        todosCajones.forEach(cajon => {
            cajon.value = "";
            cajon.style.color = "black";
            cajon.style.borderColor = "black";
        });
        
        // Eliminar cajones adicionales creados
        const cajonesAdicionales = document.querySelectorAll('textarea:not(#cajonAzul)');
        cajonesAdicionales.forEach(cajon => {
            cajon.remove();
        });
        
        // Reiniciar estado
        this.reiniciarEstadoTimer();
        this.contadorCajones = 1;
        this.cajonActivo = this.dom.cajonAzul;
        this.dom.btnVerde.disabled = true;
        
        // Limpiar sessionStorage
        sessionStorage.removeItem("ultimoNumeroMarcado");
        
        // Mostrar mensaje
        this.mostrarMensaje("¡Aplicación reiniciada! Se detectó la palabra 'CUMPLE'.", "info");
    },

    // MÉTODO PARA REALIZAR LLAMADA (PUNTO 2.e y 2.f)
    realizarLlamada() {
        const numeroActual = this.cajonActivo.value;
        
        // Solo si el número es válido y está en verde
        if (this.cajonActivo.style.color === "green" && /^[6-9]\d{8}$/.test(numeroActual)) {
            
            // Guardar en sessionStorage (PUNTO 2.f)
            this.guardarNumeroEnSessionStorage(numeroActual);
            
            // Crear nuevo cajón (PUNTO 2.e)
            this.crearNuevoCajon();
            
            this.mostrarMensaje(`Llamando al número: ${numeroActual}`, "exito");
        }
    },

    // MÉTODO PARA CREAR NUEVO CAJÓN (PUNTO 2.e)
    crearNuevoCajon() {
        // Cambiar estilo del cajón anterior
        this.cajonActivo.style.color = "black";
        this.cajonActivo.style.borderColor = "black";
        this.cajonActivo.readOnly = true;
        
        // Crear nuevo textarea
        const nuevoCajon = document.createElement("textarea");
        nuevoCajon.readOnly = true;
        nuevoCajon.id = `cajonAzul${this.contadorCajones + 1}`;
        nuevoCajon.className = "cajon-numeros";
        nuevoCajon.style.display = "block";
        nuevoCajon.style.marginTop = "10px";
        nuevoCajon.style.width = "100%";
        nuevoCajon.style.height = "40px";
        nuevoCajon.style.padding = "5px";
        
        // Insertar después del contenedor de números
        const contenedorNumeros = document.getElementById('contenedorDeMumeros');
        contenedorNumeros.appendChild(document.createElement("br"));
        contenedorNumeros.appendChild(nuevoCajon);
        
        // Actualizar estado
        this.contadorCajones++;
        this.cajonActivo = nuevoCajon;
        
        // Deshabilitar botón verde hasta que haya nuevo número válido
        this.dom.btnVerde.disabled = true;
    },

    // MÉTODO PARA GUARDAR NÚMERO EN SESSIONSTORAGE (PUNTO 2.f)
    guardarNumeroEnSessionStorage(numero) {
        sessionStorage.setItem("ultimoNumeroMarcado", numero);
    },

    // MÉTODO PARA CARGAR NÚMERO DE SESSIONSTORAGE
    cargarNumeroDeSessionStorage() {
        const numeroGuardado = sessionStorage.getItem("ultimoNumeroMarcado");
        if (numeroGuardado) {
            this.cajonActivo.value = numeroGuardado;
            this.validarNumeroTelefonico();
        }
    },

    // MÉTODO PARA REALIZAR RELLAMADA (PUNTO 2.f)
    realizarRellamada() {
        const numeroGuardado = sessionStorage.getItem("ultimoNumeroMarcado");
        
        if (numeroGuardado) {
            // Poner número guardado en cajón activo
            this.cajonActivo.value = numeroGuardado;
            
            // Validar número
            this.validarNumeroTelefonico();
            
            // Mostrar mensaje
            if (this.cajonActivo.style.color === "green") {
                this.mostrarMensaje(`Número recuperado: ${numeroGuardado}`, "exito");
                this.dom.btnVerde.disabled = false;
            } else {
                this.mostrarMensaje("Número recuperado no válido", "error");
                this.dom.btnVerde.disabled = true;
            }
        } else {
            this.mostrarMensaje("No hay número guardado para rellamar", "info");
        }
    },

    // MÉTODO PARA REALIZAR COLGAR (PUNTO 2.e)
    realizarColgar() {
        // Eliminar todos los cajones excepto el primero
        const todosCajones = document.querySelectorAll('textarea');
        
        todosCajones.forEach((cajon, indice) => {
            if (indice > 0) {
                cajon.remove();
            } else {
                // Resetear primer cajón
                cajon.value = "";
                cajon.style.color = "black";
                cajon.style.borderColor = "black";
                cajon.readOnly = false;
            }
        });
        
        // Eliminar saltos de línea adicionales
        const brs = document.querySelectorAll('#contenedorDeMumeros br');
        brs.forEach((br, indice) => {
            if (indice > 0) br.remove();
        });
        
        // Reiniciar estado
        this.contadorCajones = 1;
        this.cajonActivo = this.dom.cajonAzul;
        this.dom.btnVerde.disabled = true;
        
        // Reiniciar timer
        this.reiniciarEstadoTimer();
        
        this.mostrarMensaje("Llamada finalizada", "info");
    },

    // MÉTODO PARA MOSTRAR MENSAJES
    mostrarMensaje(texto, tipo) {
        this.dom.mensajes.innerHTML = `<div class="mensaje ${tipo}">${texto}</div>`;
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
            this.dom.mensajes.innerHTML = "";
        }, 3000);
    }
};

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    telefono.init();
});