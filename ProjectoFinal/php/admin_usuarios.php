<?php
session_start();
require "connexio.php";

if ($_SESSION['rol'] !== 'admin') {
    http_response_code(403);
    exit;
}

$stmt = $pdo->query("SELECT id, nom, rol FROM usuaris");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));