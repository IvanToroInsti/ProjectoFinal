<?php
session_start();
session_destroy();

header("Location: /ProjectoFinal/html/index.html");
exit;
?>
