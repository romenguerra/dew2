<?php
$host = "localhost";
$user = "romen";
$pass = "230904";
$db   = "tienda";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$conn->set_charset("utf8");