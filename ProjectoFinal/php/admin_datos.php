<?php
session_start();
require __DIR__ . "/connexio.php";

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode([
        "status" => "error",
        "message" => "No autorizado"
    ]);
    exit;
}

$nom = $_POST['nom'] ?? null;
$tipus = $_POST['tipus'] ?? null;
$lat = $_POST['lat'] ?? null;
$lng = $_POST['lng'] ?? null;

if (!$nom || !$tipus || !$lat || !$lng) {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos"
    ]);
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO datos (nom, tipus, lat, lng)
    VALUES (:nom, :tipus, :lat, :lng)
");

$stmt->execute([
    ':nom' => $nom,
    ':tipus' => $tipus,
    ':lat' => $lat,
    ':lng' => $lng
]);

echo json_encode([
    "status" => "ok",
    "message" => "Punto de interes creado correctamente"
]);