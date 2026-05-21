<?php
require "connexio.php";

$stmt = $pdo->query("SELECT * FROM datos");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));