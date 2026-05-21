<?php 
$bd = "mysql:host=localhost;dbname=CircuitBarcelona;charset=utf8";
$usuari = "root";
$password = "alum01";

try {
    $pdo = new PDO($bd, $usuari, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>