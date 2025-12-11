<?php
// process.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$archivoJson = 'datos.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $input = file_get_contents('php://input');
    $datos_usuario = json_decode($input, true);


    $usuarios = [];

    if(file_exists($archivoJson)){
        $contenido = file_get_contents($archivoJson);
        $usuarios = json_decode($contenido, true);

        if(!is_array($usuarios)){
            $usuarios = [];
        }
    }


    $usuarios[] = $datos_usuario;
    if (file_put_contents($archivoJson, json_encode($usuarios, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(["mensaje" => "Usuario añadido correctamente"]);
    
    } else {
        echo json_encode(['error' => "No se pudo guardar el archivo"]);
    }


} else {
        // Si no hay archivo devolver datos de ejemplo
        $ejemplo = [
            "nombre" => "Pepe",
            "apellidos" => "López Pérez",
            "dni" => "12345678X",
            "fecha" => "22/09/2000",
            "cp" => "35500",
            "correo" => "pepe@gmail.com",
            "telefono" => "928666666",
            "movil" => "666999666",
            "tarjeta" => "4539955085883327",
            "iban" => "ES7921000813610123456789",
            "contrasena" => "Pepe1234567890*"
        ];
        
        echo json_encode($ejemplo); 
}

?>