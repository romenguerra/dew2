
let botonInicio = document.getElementById("inicio");
let botonResolver = document.getElementById("resolver")
let movimientos = 0;

tabla = document.getElementById('cuadricula')
tabla.addEventListener("click",function(e) {

    //posicion tabla
    pos = e.target.parentElement.id

    //console.log(e.target.parentElement.id);

    //td entero
    casilla = document.getElementById(pos)

    //console.log(casilla)

    imagen = casilla.innerHTML


    //console.log(imagen)

    //posicion de la casilla vacia
    for (let i = 0; i <= 8; i++) {
    let casilla = document.getElementById(i);
    if (casilla.innerHTML.includes('id="img8"')) {
        posVacia = i;
        break; 
    }
}


    casillaVacia = document.getElementById(posVacia)
    imagenvacia = casillaVacia.innerHTML

    pos = Number(pos)
    posVacia = Number(posVacia)

    if (pos + 1 == posVacia && posVacia % 3 != 0 ||
        pos - 1 == posVacia && pos % 3 != 0 ||
        pos + 3 == posVacia ||
        pos - 3 == posVacia
    ){
        aux = casilla.innerHTML
        casilla.innerHTML = casillaVacia.innerHTML
        casillaVacia.innerHTML = aux

    }

    movimientos++;
    document.getElementById("movimientosid").innerText = "NUMERO DE MOVIMIENTOS: " +  movimientos;

    comprobarPuzzle();


})

botonInicio.addEventListener("click", function() {
    var array1 = [0, 1, 2, 3, 4, 5, 6, 7]
    var array2 = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];

    array1.sort(() => Math.random() - 0.5);

    console.log(array1)

    array1.push(8);
    array2.push("8.png");

    for(var i = 0; i < array1.length; i++) {
        aux = array2[i]
        array2[i] = array1[i] + '.png'

    }
    
    console.log(array2)

    for(var i = 0; i < array2.length; i++){
        celda = document.getElementById(i);
        console.log(celda)

        celda.innerHTML = ''

        celda.innerHTML = '<img src="imgs/' + array1[i] + '.png" id="img' + array1[i] + '">';        
        // celda.innerHTML = '<img src="imgs/.png" alt=""></img>';

    }

    movimientos = 0;
    document.getElementById("movimientosid").innerText = "NUMERO DE MOVIMIENTOS: " +  movimientos;

    iniciarTiempo();

    
})

function comprobarPuzzle() {
    let resulto = 0;

    for (i = 0; i<= 8; i++){
        let casilla = document.getElementById(i);
        let imagen = casilla.querySelector('img');


        //console.log(casilla)
        console.log(imagen)
        console.log(imagen.id);

        if ( imagen.id === 'img'+ i){
            resulto += 1;
            
            
        }
    
        if(resulto == 8){
                document.getElementById("resueltoid").innerText = "¡Enhorabuena, has resuelto el Puzzle.";
                pararTiempo();
        }
    

}}

let tiempo = 0;
let temporizador = null;

function iniciarTiempo() {
    clearInterval(temporizador);  // por si ya estaba corriendo
    tiempo = 0;
    document.getElementById("tiempo").innerText = "TIMEPO: 00:00";

    temporizador = setInterval(function() {
        tiempo++;

        var minutos = Math.floor(tiempo / 60);
        var segundos = tiempo % 60;

        // formatear con dos dígitos (ej: 01:05)
        if (minutos < 10) minutos = "0" + minutos;
        if (segundos < 10) segundos = "0" + segundos;

        document.getElementById("tiempo").innerText = "TIEMPO: " + minutos + ":" + segundos;
    }, 1000);
}

function pararTiempo() {
    clearInterval(temporizador);
}

botonResolver.addEventListener("click", function() {
    var array1 = [0, 1, 2, 3, 4, 5, 6, 7]
    var array2 = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];

    //array1.sort(() => Math.random() - 0.5);

    console.log(array1)

    array1.push(8);
    array2.push("8.png");

    for(var i = 0; i < array1.length; i++) {
        aux = array2[i]
        array2[i] = array1[i] + '.png'

    }
    
    console.log(array2)

    for(var i = 0; i < array2.length; i++){
        celda = document.getElementById(i);
        console.log(celda)

        celda.innerHTML = ''

        celda.innerHTML = '<img src="imgs/' + array1[i] + '.png" id="img' + array1[i] + '">';        
        // celda.innerHTML = '<img src="imgs/.png" alt=""></img>';

    }

})