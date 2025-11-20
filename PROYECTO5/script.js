const patterns = {
    nombre: /^[A-Z]{1}[a-z]{3,12}$/,
    apellidos: /^[A-Z]{1}[a-z]{2,15}\s{1}[A-Z]{1}[a-z]{2,15}$/,
    dni: /^[x]*\d{8}[a-z]$/i,
    fec_nacimiento: /^\d{2}\/\d{2}\/\d{4}$/,
    cod_postal: /^\d{5}$/,
    email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i,
    telf_fijo: /^(8|9)\d{8}$/,
    telf_movil: /^(6|7)\d{8}$/,
    iban: /^[a-zA-Z]{2}\d{2}(\s?\d{4})+$/,
    tarjeta: /^(\d{4}[-\s]?){3,4}\d{1,4}$/,
    pass: /^.{12,40}$/,
    pass2: /^.{12,40}$/
};


const inputs = document.querySelectorAll('input');

//para validar en timepo real
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        
    const name = e.target.attributes.name.value;
    //if (e.target.name =="dni") {validate(e.target, dni)};
    //if (e.target.name =="username") {validate(e.target, username)};

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
        if(pass.value === pass2.value){
            pass2.className = 'valido';
        } else {
            pass2.className = 'invalido';
    }
    }
};


function validarFormularioCompleto() {
    let todosValidos = true;

    inputs.forEach((input) => {
        const name = input.name;
        if (patterns[name] && !patterns[name].test(input.value)) {
            input.className = 'invalido';
            todosValidos = false;
        }
        
    });
    return todosValidos;
};


document.getElementById('btnGuardar').addEventListener('click', function(){
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
    console.log('boton recuperar');
})

