<?php
session_start();

require "connexio.php";

$usuariNom = trim($_POST['usuari'] ?? '');
$contrasenya = $_POST['pass'] ?? '';

// buscar usuario en BD
$stmt = $pdo->prepare("SELECT nom, contrasenya FROM usuaris WHERE nom = :usuari");
$stmt->execute([':usuari' => $usuariNom]);

$usuari = $stmt->fetch(PDO::FETCH_ASSOC);

// comprobar si existe
if (!$usuari) {
    echo "Usuari o contrasenya incorrectes.";
    exit;
}

// verificar contraseña
if (!password_verify($contrasenya, $usuari['contrasenya'])) {
    echo "Usuari o contrasenya incorrectes.";
    exit;
}

// guardar usuario en la sesión
$_SESSION['usuari'] = $usuari['nom'];

// si todo es correcto → redirigir
header("Location: /ProjectoFinal/html/app.php");
exit;
?>
