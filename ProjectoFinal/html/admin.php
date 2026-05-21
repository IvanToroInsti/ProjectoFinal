<?php
session_start();

if (!isset($_SESSION['usuari'])) {
    header("Location: ../html/index.html");
    exit;
}

if ($_SESSION['rol'] !== 'admin') {
    header("Location: ../html/app.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Admin</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>

    <div class="admin-panel-grid">


            <div class="card  admin-card">
                <h1 class="title">Panel de Administración</h1>

                <p>Bienvenido ADMIN.</p>

                <div class="nav-buttons">
                    <a href="../html/app.php" class="btn">
                        Ir a la app
                    </a>

                    <a href="../php/logout.php" class="logout-btn">
                        Cerrar sesión
                    </a>
                </div>
            </div>

            <!-- USUARIOS -->
            <div class="card users-card">
                <h2>👥 Usuarios</h2>
                <div id="users"></div>
            </div>

            <div class="card delete-user-card">
                <h2>🗑️ Borrar usuario</h2>

                <select id="userSelect"></select>

                <button onclick="deleteUser()" class="btn btn-red">
                    Borrar usuario
                </button>
                <p id="msgUser"></p>
            </div>

            <!-- POIS -->
            <div class="card add-poi-card">
                <h2>🗺️ Añadir Punto de interes </h2>

                <input id="nom" placeholder="Nombre">
                <select id="tipus">
                    <option value="wc">WC</option>
                    <option value="bar">Bar</option>
                    <option value="parking">Parking</option>
                    <option value="tienda">Tienda</option>
                </select>

                <input id="lat" placeholder="Lat">
                <input id="lng" placeholder="Lng">

                <button onclick="addPoi()" class="btn">Añadir</button>
                <p id="msgAddPoi"></p>
            </div>

            <div class="card delete-poi-card">
                <h2>🗺️ Borrar Punto de Interes</h2>

                <select id="filterType" onchange="cargarPois()">
                    <option value="">Todos</option>
                    <option value="wc">WC</option>
                    <option value="bar">Bar</option>
                    <option value="parking">Parking</option>
                    <option value="tienda">Tienda</option>
                </select>

                <select id="poiSelect"></select>

                <button onclick="deletePoi()" class="btn btn-red">
                    Borrar POI
                </button>
                <p id="msgDeletePoi"></p>
            </div>

    </div>
    <script src="../js/admin.js"></script>
</body>

</html>