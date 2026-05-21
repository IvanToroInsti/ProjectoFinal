<?php
require "connexio.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $nom = trim($_POST['nom'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pass = $_POST['pass'] ?? '';
    $pass2 = $_POST['pass2'] ?? '';


    if ($pass != $pass2) {

        header("Location: ../html/CrearUsuario.html?error=pass");
        exit;
    }


    $sqlCheckEmail = "
        SELECT id
        FROM usuaris
        WHERE email = :email
    ";

    $stmtCheckEmail = $pdo->prepare($sqlCheckEmail);

    $stmtCheckEmail->execute([
        'email' => $email
    ]);

    if ($stmtCheckEmail->fetch()) {

        header("Location: ../html/CrearUsuario.html?error=email");
        exit;
    }

    $sqlCheckNom = "
        SELECT id
        FROM usuaris
        WHERE nom = :nom
    ";

    $stmtCheckNom = $pdo->prepare($sqlCheckNom);

    $stmtCheckNom->execute([
        'nom' => $nom
    ]);

    if ($stmtCheckNom->fetch()) {

        header("Location: ../html/CrearUsuario.html?error=nom");
        exit;
    }


    $contrasenya = password_hash($pass, PASSWORD_DEFAULT);

    $sql = "
    INSERT INTO usuaris (
        nom,
        email,
        contrasenya,
        rol
    )
    VALUES (
        :nom,
        :email,
        :contrasenya,
        'user'
    )
";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        'nom' => $nom,
        'email' => $email,
        'contrasenya' => $contrasenya
    ]);

    $_SESSION['usuari'] = $nom;

    header("Location: ../html/app.php");
    exit;
}

?>