<?php
include 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Decodificar JSON recibido
$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    $id = uniqid(); // Generar ID único automáticamente
    $nombre = $conn->real_escape_string($input['nombre'] ?? '');
    $email = $conn->real_escape_string($input['email'] ?? '');
    $telefono = $conn->real_escape_string($input['telefono'] ?? '');
    
    // Insertar en la base de datos
    $sql = "INSERT INTO usuarios (id_usuario, nombre, email, telefono) 
            VALUES ('$id', '$nombre', '$email', '$telefono')";
    
    if ($conn->query($sql)) {
        // Devolver el usuario creado
        echo json_encode([
            "id" => $id,
            "nombre" => $nombre,
            "email" => $email,
            "telefono" => $telefono
        ]);
    } else {
        echo json_encode(["error" => "Error al registrar usuario: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Datos no recibidos"]);
}
?>