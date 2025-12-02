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

/* document.getElementById('btnGuardar').addEventListener('click', function(){
    if(validarFormularioCompleto()) {
        const datosUsuario = {
            nombre: document.querySelector('input[name="nombre"]').value,
            apellidos: document.querySelector('input[name="apellidos"]').value,
            dni: document.querySelector('input[name="dni"]').value,
            fecha: document.querySelector('input[name="fecha"]').value,
            cod_postal: document.querySelector('input[name="cod_postal"]').value,
            email: document.querySelector('input[name="email"]').value,
            telf_fijo: document.querySelector('input[name="telf_fijo"]').value,
            telf_movil: document.querySelector('input[name="telf_movil"]').value,
            iban: document.querySelector('input[name="iban"]').value,
            tarjeta:document.querySelector('input[name="tarjeta"]').value,
            pass:document.querySelector('input[name="pass"]').value,
            pass2: document.querySelector('input[name="pass2"]').value
        }

        sessionStorage.setItem('formularioTienda', JSON.stringify(datosUsuario));

        console.log('Datos guardados!');

    } else {
        console.log('HAY ERRORES');
    }
})

document.getElementById('btnRecuperar').addEventListener('click', function(){
    const datosGuardados = sessionStorage.getItem('formularioTienda');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        
        Object.keys(datos).forEach(key => {
            const input = document.querySelector(`input[name="${key}"]`);
            if (input) {
                input.value = datos[key];
                if (patterns[key]) {
                    validate(input, patterns[key]);
                }
            }
        });
        
        console.log('Datos recuperados!');
    } else {
        console.log('No hay datos guardados');
    }
}) */


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
document.getElementById('GETJSON').addEventListener('click', function(){

    console.log("Boton POST clickeado");

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

document.getElementById('POST').addEventListener('click', function(){

    console.log('Boton Publicar en PHP clicado');

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
document.getElementById('GETPHP').addEventListener('click', function(){

    console.log('Boton OBTENER DATOS en PHP clicado');

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





