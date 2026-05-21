<?php
session_start();
require "connexio.php";

$usuariNom = trim($_POST['usuari'] ?? '');
$contrasenya = $_POST['pass'] ?? '';

$stmt = $pdo->prepare("SELECT nom, contrasenya FROM usuaris WHERE nom = :usuari");
$stmt->execute([':usuari' => $usuariNom]);

$usuari = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuari) {
    echo "Usuari o contrasenya incorrectes.";
    exit;
}

if (!password_verify($contrasenya, $usuari['contrasenya'])) {
    echo "Usuari o contrasenya incorrectes.";
    exit;
}

$_SESSION['usuari'] = $usuari['nom'];

header("Location: /ProjectoFinal/html/app.php");
exit;
?>
