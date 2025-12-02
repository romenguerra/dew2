<?php
// process.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_POST["x"])){
    // Recibir los datos enviados desde JavaScript
    $obj = json_decode($_POST["x"], false);
    $myJSON = json_encode($obj);
    echo ($myJSON);

} else {
    // Si no hay datos POST, devolver datos de ejemplo
    // CON LOS NOMBRES CORRECTOS (los que usas en tu JavaScript)
    $myObj = new stdClass;
    $myObj->nombre = "Pepe";
    $myObj->apellidos = "López Pérez";
    $myObj->dni = "12345678X";
    $myObj->fecha = "22/09/2000";
    $myObj->cp = "35500";
    $myObj->correo = "pepe@gmail.com";
    $myObj->telefono = "928666666";
    $myObj->movil = "666999666";
    $myObj->tarjeta = "4539955085883327";
    $myObj->iban = "ES7921000813610123456789";
    $myObj->contrasena = "Pepe1234567890*";
    
    $myJSON = json_encode($myObj);
    echo $myJSON;
}
?>