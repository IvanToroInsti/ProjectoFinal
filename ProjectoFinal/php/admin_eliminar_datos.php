<?php
session_start();
require __DIR__ . "/connexio.php";

header('Content-Type: application/json');

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode([
        "status" => "error",
        "message" => "No autorizado"
    ]);
    exit;
}

$nom = $_POST['nom'] ?? null;

if (!$nom) {
    echo json_encode([
        "status" => "error",
        "message" => "Falta nombre"
    ]);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM datos WHERE nom = :nom");
$stmt->execute([':nom' => $nom]);

echo json_encode([
    "status" => "ok",
    "message" => "Punto de interes eliminado correctamente"
]);