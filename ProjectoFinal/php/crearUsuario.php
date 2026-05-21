<?php
session_start();

require "connexio.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $pass2 = $_POST['pass2'];

    // comprobar contraseñas
    if ($pass != $pass2) {
        die("Les contrasenyes no coincideixen");
    }

    // comprobar si el email ya existe
    $sqlCheck = "SELECT id FROM usuaris WHERE email = :email";
    $stmtCheck = $pdo->prepare($sqlCheck);
    $stmtCheck->execute(['email' => $email]);

    if ($stmtCheck->fetch()) {
        die("Aquest email ja està registrat");
    }

    // encriptar contraseña
    $contrasenya = password_hash($pass, PASSWORD_DEFAULT);

    // insertar usuario
    $sql = "INSERT INTO usuaris (nom, email, contrasenya)
            VALUES (:nom, :email, :contrasenya)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        'nom' => $nom,
        'email' => $email,
        'contrasenya' => $contrasenya
    ]);

    // guardar usuario en la sesión
    $_SESSION['usuari'] = $nom;

    // si todo es correcto → redirigir
    header("Location: /ProjectoFinal/html/app.php");
    exit;
}
?>
