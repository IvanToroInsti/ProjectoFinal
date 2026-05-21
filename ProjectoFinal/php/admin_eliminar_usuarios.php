<?php
session_start();
require "connexio.php";

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    http_response_code(403);
    echo "NO_ADMIN";
    exit;
}

$nom = $_POST['nom'] ?? null;

if (!$nom) {
    echo "NO_NOM";
    exit;
}

$stmt = $pdo->prepare("DELETE FROM usuaris WHERE nom = :nom");
$ok = $stmt->execute([':nom' => $nom]);

echo $ok ? "OK" : "ERROR";