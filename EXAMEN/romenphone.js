const botones = document.querySelectorAll("button");
const botonVerde = document.getElementById("btnVerde");
const cajonAzul = document.getElementById("cajonAzul");
const btnllamar = document.getElementById("btnVerde");

numero = ''

tabla = document.getElementById("tabla");
tabla.addEventListener("click", function(e) {
    
    
    pos = e.target.id
    console.log(pos)

    
    parseInt(pos)
    if(pos <= 9) {
        numero = numero + pos
        if(numero.length < 10) {
            mostrarEnPantalla(numero)
        } else {
            document.getElementById('mensajes').innerHTML = "¡solo 9 numeros!"
        }

    }

    
    validarNumero(numero)



    
});
    
function validarNumero(campo) {
    
    if(campo[0] == 6 || campo[0] == 7 || campo[0] == 8  || campo[0] == 9){
        if(campo.length == 9) {
            cajonAzul.style.color = "green"
            // llamar();
        }
    }
}

botonVerde.addEventListener('mouseup', function (e) {

    if(validarNumero) {
        cajonAzul.style.color = "black"
        document.getElementById('contenedorDeNumeros').appendChild('<textarea>readonly id="" class=""></textarea>');
        
    } else {
        console.log('no se puede llamar')
    }



})

function mostrarEnPantalla(boton) {

    parseInt(boton)

    if(boton) {
        cajonAzul.innerHTML = boton
    } else {
        console.log("hola soy romen")
    }
    
}

