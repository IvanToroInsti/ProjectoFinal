<?php
session_start();
require __DIR__ . "/connexio.php";

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    http_response_code(403);
    exit;
}

$tipus = $_GET['tipus'] ?? null;

if ($tipus) {
    $stmt = $pdo->prepare("SELECT nom, tipus FROM datos WHERE tipus = :tipus");
    $stmt->execute([':tipus' => $tipus]);
} else {
    $stmt = $pdo->query("SELECT nom, tipus FROM datos");
}

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));