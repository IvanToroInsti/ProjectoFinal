<?php
session_start();
require "connexio.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $nom = trim($_POST['nom'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pass = $_POST['pass'] ?? '';
    $pass2 = $_POST['pass2'] ?? '';

    if ($pass != $pass2) {
        die("Les contrasenyes no coincideixen");
    }

    $sqlCheck = "SELECT id FROM usuaris WHERE email = :email";
    $stmtCheck = $pdo->prepare($sqlCheck);
    $stmtCheck->execute(['email' => $email]);

    if ($stmtCheck->fetch()) {
        die("Aquest email ja està registrat");
    }

    $contrasenya = password_hash($pass, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuaris (nom, email, contrasenya)
            VALUES (:nom, :email, :contrasenya)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        'nom' => $nom,
        'email' => $email,
        'contrasenya' => $contrasenya
    ]);

    $_SESSION['usuari'] = $nom;

    header("Location: /ProjectoFinal/html/app.php");
    exit;
}
?>
