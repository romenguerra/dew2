<?php
include 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // REGISTRO DE USUARIO
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input) {
        $id = uniqid(); // Generar ID único automáticamente
        $nombre = $conn->real_escape_string($input['nombre'] ?? '');
        $email = $conn->real_escape_string($input['email'] ?? '');
        $telefono = $conn->real_escape_string($input['telefono'] ?? '');
        
        // Verificar si el email ya existe
        $checkEmail = "SELECT id_usuario FROM usuarios WHERE email = '$email'";
        $result = $conn->query($checkEmail);
        
        if ($result->num_rows > 0) {
            echo json_encode(["error" => "El email ya está registrado"]);
            exit;
        }
        
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
} elseif ($method === 'GET') {
    // LOGIN DE USUARIO
    $email = $conn->real_escape_string($_GET['email'] ?? '');
    $telefono = $conn->real_escape_string($_GET['telefono'] ?? '');
    
    if (!$email || !$telefono) {
        echo json_encode(["error" => "Email y teléfono son requeridos"]);
        exit;
    }
    
    // Buscar usuario por email y teléfono
    $sql = "SELECT id_usuario, nombre, email, telefono FROM usuarios 
            WHERE email = '$email' AND telefono = '$telefono'";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        echo json_encode($usuario);
    } else {
        echo json_encode(["error" => "Usuario no encontrado o credenciales incorrectas"]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
?>