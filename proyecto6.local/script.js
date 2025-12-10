const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{3,12}$/,
    apellidos: /^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{2,15}\s{1}[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{2,15}$/,
    dni: /^[x]*\d{8}[a-z]$/i,
    fec_nacimiento: /^\d{2}\/\d{2}\/\d{4}$/,
    cod_postal: /^\d{5}$/,
    email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i,
    telf_fijo: /^(8|9)\d{8}$/,
    telf_movil: /^(6|7)\d{8}$/,
    iban: /^[a-zA-Z]{2}\d{2}(\s?\d{4})+$/,
    tarjeta: /^(\d{4}[-\s]?){3,4}\d{1,4}$/,
    pass: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/,
    pass2: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/
};


//mostar mensajes sin alert
function mostrarMensaje(texto, tipo) {
    const mensajesDiv = document.querySelector('#mensajes');
    
    // Limpiar mensaje anterior después de 4 segundos
    setTimeout(() => {
        mensajesDiv.innerHTML = '';
        mensajesDiv.className = '';
    }, 4000);
    
    // Mostrar nuevo mensaje
    mensajesDiv.innerHTML = texto;
    mensajesDiv.className = tipo;
}


const inputs = document.querySelectorAll('input');

//para validar en tiempo real
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        
    const name = e.target.attributes.name.value;

    if (patterns[name]) validate(e.target, patterns[name]);

    if (name === 'pass2') {
        const pass = document.querySelector('input[name="pass"]');
        validarContrasena(pass, e.target)
    }

    });
});


function validate(campo, regex) {
    if (regex.test(campo.value)) {
        campo.className = 'valido';
    } else {
        campo.className = 'invalido';
    }

};


function validarContrasena(pass, pass2) {
    if(pass && pass2) {
        const regexPass = patterns.pass;
        
        if(regexPass.test(pass.value) && pass.value === pass2.value){
            pass2.className = 'valido';
        } else {
            pass2.className = 'invalido';
        }
        
        if(!regexPass.test(pass.value)) {
            pass.className = 'invalido';
        } else if(pass.value === pass2.value) {
            pass.className = 'valido';
        }
    }
};


function validarFormularioCompleto() {
    let todosValidos = true;


    //limpiar mensaje anterior
    document.querySelector('#mensajes').innerHTML = '';
    document.querySelector('#mensajes').className = '';

    inputs.forEach((input) => {
        const name = input.name;
        if (patterns[name] && !patterns[name].test(input.value)) {
            input.className = 'invalido';
            todosValidos = false;
        }
        
        if (name === 'pass2') {
            const pass = document.querySelector('input[name="pass"]');
            if(pass.value !== input.value) {
                input.className = 'invalido';
                todosValidos = false;
            }
        }
    });


    if(!todosValidos) {
        mostrarMensaje('Hay errores en el formulario. Revisa los campos en rojo.');
    }

    return todosValidos;
};


//funcion para limpiar mensajes
function limpiarMensajes() {
    const mensajesDiv = document.querySelector('#mensajes');
    mensajesDiv.innerHTML = '';
    mensajesDiv.className = '';
}

function obtenerDatosFormulario() {
    return {
        nombre: document.querySelector('input[name="nombre"]').value,
        apellidos: document.querySelector('input[name="apellidos"]').value,
        dni: document.querySelector('input[name="dni"]').value,
        fecha: document.querySelector('input[name="fecha"]').value,
        cp: document.querySelector('input[name="cod_postal"]').value,
        correo: document.querySelector('input[name="email"]').value,
        telefono: document.querySelector('input[name="telf_fijo"]').value,
        movil: document.querySelector('input[name="telf_movil"]').value,
        tarjeta: document.querySelector('input[name="tarjeta"]').value,
        iban: document.querySelector('input[name="iban"]').value,
        contrasena: document.querySelector('input[name="pass"]').value
    };
}


//funcion para limpiar el formulario
function limpiarFormulario(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.className = '';
    });
}

function mostrarDatosFormulario(datos){
    const mapeo = {
        'nombre': 'nombre',
        'apellidos': 'apellidos',
        'fecha': 'fecha',
        'dni': 'dni',
        'cp': 'cod_postal',
        'correo': 'email',
        'telefono': 'telf_fijo',
        'movil': 'telf_movil',
        'tarjeta': 'tarjeta',
        'iban': 'iban',
        'contrasena': 'pass'
    };

    Object.keys(mapeo).forEach(keyJson => {
        const nombreInput = mapeo[keyJson];
        const input = document.querySelector(`input[name="${nombreInput}"]`);
        if (input && datos[keyJson]) {
            input.value = datos[keyJson];

            if (patterns[nombreInput]) {
                validate(input, patterns[nombreInput]);
            }
        }
    });

    const pass2 = document.querySelector(`input[name="pass2"]`);
    const pass = document.querySelector(`input[name="pass"]`);
    if (pass2 && pass) {
        pass2.value = datos.contrasena || '';
        validarContrasena(pass, pass2);
    }

}



//obtener datos desde json
document.querySelector('#GETJSON').addEventListener('click', function(){

    console.log("Boton Obtener desde .json clickeado");

    const datosEjemplo = {
        "nombre": "Pepe",
        "apellidos": "López Pérez",
        "dni": "12345678X",
        "fecha": "22/09/2000",
        "cp": "35500",
        "correo": "pepe@gmail.com",
        "telefono": "928666666",
        "movil": "666999666",
        "tarjeta": "4539955085883327",
        "iban": "ES7921000813610123456789",
        "contrasena": "Pepe1234567890*"
    };

    mostrarDatosFormulario(datosEjemplo);

    console.log('Datos cargados desde objeto JSON');

})


// publicar en php (POST)

document.querySelector('#POST').addEventListener('click', function(){

    console.log('Botón Publicar en .php clicado');

        //validar formulario
    if (!validarFormularioCompleto()) {
        return;
    }

    const datos = obtenerDatosFormulario();
    const datosJSON = JSON.stringify(datos);


    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            mostrarMensaje('Datos enviados correctamente');
        }
    };

    //enviar al servidor
    xmlhttp.open("POST", "process.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + datosJSON);

    limpiarFormulario();

});


//obtener datos desde php
document.querySelector('#GETPHP').addEventListener('click', function(){

    console.log('Botón Obtener desde .php clicado');

    limpiarMensajes();


    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);

            try {
                const myObj = JSON.parse(this.responseText);

                mostrarDatosFormulario(myObj);
                mostrarMensaje('Datos de ' + myObj.nombre + ' recibidos correctamente')

            } catch (e) {
                mostrarMensaje('Error en los datos')
            }
        
        }
    };
    xmlhttp.open("GET", "process.php", true);
    xmlhttp.send();


});

// PUBLICAR en base de datos (POST + SQL)
document.querySelector('#POST_SQL').addEventListener('click', function() {
    console.log('Botón Publicar base de datos clicado');

    // Validar formulario
    if (!validarFormularioCompleto()) {
        mostrarMensaje('Hay errores en el formulario. Corrígelos antes de enviar.', 'error');
        return;
    }

    const datos = obtenerDatosFormulario();

    // Verificar que el DNI no esté vacío
    if (!datos.dni || datos.dni.trim() === '') {
        mostrarMensaje('El DNI es obligatorio para guardar en base de datos', 'error');
        return;
    }

    // Crear parámetros igual que en el ejemplo del profesor
    const params = 
        "nombre=" + encodeURIComponent(datos.nombre) +
        "&apellidos=" + encodeURIComponent(datos.apellidos) +
        "&dni=" + encodeURIComponent(datos.dni) +
        "&fecha=" + encodeURIComponent(datos.fecha) +
        "&cp=" + encodeURIComponent(datos.cp) +
        "&correo=" + encodeURIComponent(datos.correo) +
        "&telefono=" + encodeURIComponent(datos.telefono) +
        "&movil=" + encodeURIComponent(datos.movil) +
        "&tarjeta=" + encodeURIComponent(datos.tarjeta) +
        "&iban=" + encodeURIComponent(datos.iban) +
        "&contrasena=" + encodeURIComponent(datos.contrasena);

    console.log('Enviando parámetros:', params);

    // Mostrar mensaje de carga
    mostrarMensaje('Enviando datos a la base de datos...', 'info');

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            mostrarMensaje('✓ ' + this.responseText, 'exito');
            limpiarFormulario();
        }
    };

    // Enviar al servidor igual que los otros botones
    xhr.open("POST", "database.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
});

// OBTENER desde base de datos (GET + SQL)
document.querySelector('#GET_SQL').addEventListener('click', function() {
    console.log('Botón Obtener base de datos clicado');

    // Obtener el DNI del formulario
    const dniInput = document.querySelector('input[name="dni"]');
    const dni = dniInput.value.trim();

    if (!dni) {
        mostrarMensaje('Introduce un DNI en el campo correspondiente para buscar', 'error');
        dniInput.focus();
        return;
    }

    // Validar formato del DNI (igual que validación en tiempo real)
    if (!patterns.dni.test(dni)) {
        mostrarMensaje('El formato del DNI no es válido', 'error');
        return;
    }

    limpiarMensajes();
    mostrarMensaje('Buscando en base de datos...', 'info');

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            try {
                const respuesta = JSON.parse(this.responseText);

                if (respuesta.error) {
                    mostrarMensaje(respuesta.error, 'error');
                } else {
                    mostrarDatosFormulario(respuesta);
                    mostrarMensaje('Datos recuperados para DNI: ' + respuesta.dni, 'exito');
                }
            } catch (e) {
                mostrarMensaje('Error en los datos recibidos', 'error');
            }
        }
    };

    // Obtener datos igual que los otros botones GET
    xhr.open("GET", "database.php?dni=" + encodeURIComponent(dni), true);
    xhr.send();
});