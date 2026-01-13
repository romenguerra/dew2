
console.log("Iniciando generación de escena...");
alert("¡Bienvenido! Vamos a crear una escena de calle.");

//PREGUNTAS

//TIENDAS
let numTiendas = parseInt(prompt("¿Cuantos tiendas quieres poner en la imagen de 1 a 5?"))
while(isNaN(numTiendas) || numTiendas < 1 || numTiendas > 5){
  alert("Introduce un número válido (1-5)");
  numTiendas = parseInt(prompt("¿Cuantas tiendas quieres poner (1-5)?"))
}
console.log("Numero de tiendas:", numTiendas)


//CARTELES//PUERTAS
let carteles = [];
let numerosPuerta = [];

for ( let i = 0; i < numTiendas; i++){
    carteles[i] = prompt("¿Qué quieres poner en el cartel " + (i + 1) + "?");
    while (!carteles[i]) {
      carteles[i] = prompt("Escribe algo en el cartel " + (i + 1) + ":");
    }
    numerosPuerta[i] = prompt("¿Qué número quieres poner en la puerta " + (i + 1) + "?");
    while (!numerosPuerta[i]) {
      numerosPuerta[i] = prompt("Tienes que añadir un numero a la puerta " + (i + 1) +  ":");
    }
}


//RELOJ 
let hora = parseInt(prompt("¿Que hora quieres que aparezca en la imagen? (1-12)"));
while(hora < 1 || hora > 12 || isNaN(hora)){
  alert("Introduce un numero valido de hora (1-12)");
  hora = parseInt(prompt("¿Que hora quieres que aparezca en la imagen? (1-12)"));
}
console.log("variable de hora: ", hora);

//SEMAFORO
let luzSemaforo = prompt ("¿De que color es la luz del semaforo? ").toLowerCase();
while (!["verde","rojo","naranja"].includes(luzSemaforo)) {
  luzSemaforo = prompt("Color no valido. ¿De que color es la luz del semaforo?: ")
}
console.log("variable de semaforo: ", luzSemaforo)



//COCHES
let numCoches = parseInt(prompt("¿Cuántos coches quieres que haya en la imagen?"));
while (isNaN(numCoches) || numCoches < 0) {
  numCoches = parseInt(prompt("Introduce un numero de cochees validos: "))
}
console.log("Numero de coches: ", numCoches);
if (numCoches === 0 ) {
  console.log("No hay coches en la escena")
}

//AÑADIR A LA IMAGEN -------------------------------


//CARTELES
document.write("<div id='carteles'>");
for(let i = 0; i < carteles.length; i++){
  document.write("<h3>" + carteles[i] + "</h3>");
}
document.write("</div>");


//PUERTAS
document.write("<div id='puertas'>")
for(let i = 0; i < numerosPuerta.length; i++){
  document.write("<div class='puerta'>"),
  document.write("<p>" + numerosPuerta[i] + "</p>");
  document.write('<img src=IMG/puerta.png alt=puerta class="puerta-img">');
  document.write("</div>")
}
document.write("</div>");


//ESCAPARATES
document.write("<div id='escaparates'>");
for(let i = 0; i < numTiendas; i++){
  document.write("<img src='IMG/escaparate.png' class='escaparate-img'>");
}
document.write("</div>")


//HORA//SEMAFORO
console.log("Mostrando el reloj: IMG/reloj" + hora + ".png")
document.write("<div id='relojSemaforo'>");


switch(hora){
  case 1: document.write("<img src='IMG/reloj/1.png' class='reloj-img'>"); break;
  case 2: document.write("<img src='IMG/reloj/2.png' class='reloj-img'>"); break;
  case 3: document.write("<img src='IMG/reloj/3.png' class='reloj-img'>"); break;
  case 4: document.write("<img src='IMG/reloj/4.png' class='reloj-img'>"); break;
  case 5: document.write("<img src='IMG/reloj/5.png' class='reloj-img'>"); break;
  case 6: document.write("<img src='IMG/reloj/6.png' class='reloj-img'>"); break;
  case 7: document.write("<img src='IMG/reloj/7.png' class='reloj-img'>"); break;
  case 8: document.write("<img src='IMG/reloj/8.png' class='reloj-img'>"); break;
  case 9: document.write("<img src='IMG/reloj/9.png' class='reloj-img'>"); break;
  case 10: document.write("<img src='IMG/reloj/10.png' class='reloj-img'>"); break;
  case 11: document.write("<img src='IMG/reloj/11.png' class='reloj-img'>"); break;
  case 12: document.write("<img src='IMG/reloj/12.png' class='reloj-img'>"); break;

}



switch (luzSemaforo){
    case "verde":
      document.write("<img src='IMG/semaforo_verde.png' class='semaforo-img'>");
      break;
  
    case "rojo":
      document.write("<img src='IMG/semaforo_rojo.png' class='semaforo-img'>");
      break; 

    case "naranja":      
      document.write("<img src='IMG/semaforo_naranja.png' class='semaforo-img'>");
      break;

}

document.write("</div>");

//COCHES
document.write('<div id="coches">');

for (let i = 0; i < numCoches; i++) {
  document.write('<img src="IMG/coche2.png" alt="coche" class="coche-img">');
}

document.write("</div>");