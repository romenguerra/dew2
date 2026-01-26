<?php
include 'config.php';

// Agregar estas líneas al inicio
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$sql = "SELECT * FROM productos";
$resultado = $conn->query($sql);

$lista = [];
while ($fila = $resultado->fetch_assoc()) {
    $lista[] = [
        "id" => $fila['id_producto'],
        "nombre" => $fila['nombre'],
        "precio" => (float)$fila['precio'],
        "imagen" => $fila['imagen']
    ];
}

echo json_encode($lista);
?>