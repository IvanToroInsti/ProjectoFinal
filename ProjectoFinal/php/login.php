<?php

session_start();

require "connexio.php";

$usuariNom = trim($_POST['usuari'] ?? '');
$contrasenya = $_POST['pass'] ?? '';

$stmt = $pdo->prepare("
    SELECT nom, contrasenya, rol
    FROM usuaris
    WHERE nom = :usuari
");

$stmt->execute([
    ':usuari' => $usuariNom
]);

$usuari = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuari) {

    header("Location: ../html/index.html?error=usuari");
    exit;
}

if (!password_verify($contrasenya, $usuari['contrasenya'])) {

    header("Location: ../html/index.html?error=pass");
    exit;
}

$_SESSION['usuari'] = $usuari['nom'];
$_SESSION['rol'] = $usuari['rol'];

if ($usuari['rol'] === 'admin') {

    header("Location: ../html/admin.php");
    exit;

} else {

    header("Location: ../html/app.php");
    exit;
}
?>