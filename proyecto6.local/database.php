<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Configuración de la base de datos (¡CAMBIA SEGÚN TU SERVIDOR!)
$host = 'localhost';
$db   = 'tienda_online';
$user = 'romen';      // Usuario MySQL (normalmente "root")
$pass = '230904';          // Contraseña MySQL (normalmente vacía o "root")
$port = 3306;

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db, $port);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]);
    exit;
}
$conn->set_charset("utf8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // PUBLICAR base de datos (POST + SQL)
    $dni = $_POST['dni'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $apellidos = $_POST['apellidos'] ?? '';
    $fecha = $_POST['fecha'] ?? '';
    $cp = $_POST['cp'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $movil = $_POST['movil'] ?? '';
    $tarjeta = $_POST['tarjeta'] ?? '';
    $iban = $_POST['iban'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';

    // Validar que el DNI no esté vacío
    if (empty($dni)) {
        echo json_encode(['error' => 'El DNI es obligatorio']);
        exit;
    }

    // INSERT o UPDATE (REPLACE hace ambas)
    $sql = "REPLACE INTO usuarios (dni, nombre, apellido, fecha, cp, correo, telefono, movil, tarjeta, iban, contrasena) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(['error' => 'Error en preparación: ' . $conn->error]);
        exit;
    }
    
    $stmt->bind_param("sssssssssss", 
        $dni, $nombre, $apellidos, $fecha, $cp, $correo, 
        $telefono, $movil, $tarjeta, $iban, $contrasena
    );
    
    if ($stmt->execute()) {
        echo json_encode(['mensaje' => 'Usuario guardado en base de datos']);
    } else {
        echo json_encode(['error' => 'Error al guardar: ' . $stmt->error]);
    }
    
    $stmt->close();
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // OBTENER base de datos (GET + SQL)
    $dni_buscado = $_GET['dni'] ?? '';
    
    if (empty($dni_buscado)) {
        echo json_encode(['error' => 'DNI no proporcionado']);
        exit;
    }
    
    $sql = "SELECT * FROM usuarios WHERE dni = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        echo json_encode(['error' => 'Error en preparación: ' . $conn->error]);
        exit;
    }
    
    $stmt->bind_param("s", $dni_buscado);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Mapear nombres de columna (tu BD usa 'apellido', tu JS espera 'apellidos')
        $datos = [
            'dni' => $row['dni'] ?? '',
            'nombre' => $row['nombre'] ?? '',
            'apellidos' => $row['apellido'] ?? '',  // ← Mapeo importante!
            'fecha' => $row['fecha'] ?? '',
            'cp' => $row['cp'] ?? '',
            'correo' => $row['correo'] ?? '',
            'telefono' => $row['telefono'] ?? '',
            'movil' => $row['movil'] ?? '',
            'tarjeta' => $row['tarjeta'] ?? '',
            'iban' => $row['iban'] ?? '',
            'contrasena' => $row['contrasena'] ?? ''
        ];
        
        echo json_encode($datos);
    } else {
        echo json_encode(['error' => 'DNI no encontrado en base de datos']);
    }
    
    $stmt->close();
}

$conn->close();
?>