<?php
session_start();

if (!isset($_SESSION["usuari"])) {
    header("Location: /ProjectoFinal/html/index.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Circuit de Catalunya</title>

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />

  <link rel="stylesheet" href="/ProjectoFinal/css/style.css" />
</head>

<body>

  <!-- HEADER -->
  <header class="header">

    <div class="logo-container">
      <img src="https://blog.demediterraning.com/wp-content/uploads/2015/08/Circuito-de-Montmel%C3%B3-1024x615.jpg"
        alt="Circuito Montmeló" class="logo">
    </div>

    <h1>Circuit de Catalunya</h1>

    <div class="header-actions">
      <div class="lang">
        <select id="idioma">
          <option>Castellano</option>
          <option>Catalán</option>
          <option>Inglés</option>
        </select>
      </div>

      <a href="/ProjectoFinal/php/logout.php" class="logout-btn" id="logoutBtn">Cerrar sesión</a>
    </div>

  </header>

  <!-- MAPA -->
  <div id="map"></div>

  <!-- PANEL 
  <div class="panel">

    <div class="card">

      <h2 class="title">Navegación</h2>

      <div class="row">
        <div class="col">
          <label>Puerta</label>
          <select id="puerta"></select>
        </div>

        <div class="col">
          <label>Tribuna</label>
          <select id="tribuna"></select>
        </div>
      </div>
      <div class="nav-buttons">

        <button id="btnLocation" class="btn">
          📍 Mi ubicación
        </button>

        <button id="btnCircuit" class="btn">
          🏁 Circuito
        </button>

      </div>-->
  <div class="panel">

    <div class="card">

      <h2 class="title" id="nav">Navegación</h2>

      <div class="row">
        <div class="col">
          <label id="nentradas">Numero de la teva entrada</label>
          <p id="capacidadInfo"></p>
          <input id="puerta" type="number" min="1" max="140000">
        </div>

        <div class="row">
          <div class="col">
            <label class="toggle">
              <input type="checkbox" id="visitaToggle">
              <span id="visita">Voy de visita</span>
            </label>
          </div>
        </div>
      </div>
      <div class="nav-buttons">

        <button id="btnLocation" class="btn">
          📍 Mi ubicación
        </button>

        <button id="btnCircuit" class="btn">
          🏁 Circuito
        </button>

      </div>

      <div class="nav-buttons">
        <button id="btnBorrarRuta" class="btn btn-red">
          ❌ Borrar ruta
        </button>

        <button id="btnWcCercano" class="btn">
          🚻 WC cercano
        </button>

        <button id="btnEmergencia" class="btn btn-red">
          🚨 Emergencia
        </button>
      </div>

      <div id="routeInfo" class="info-box">
        Introduce tu número de entrada o activa la ubicación.
      </div>
    </div>



    <div class="card">

      <h2 class="title" id="pt">Puntos de interes</h2>

      <div class="grid-toggles">

        <label class="toggle">
          <input type="checkbox" id="wcToggle">
          <span id="wc">WC</span>
        </label>

        <label class="toggle">
          <input type="checkbox" id="barToggle">
          <span id="bares">Bares</span>
        </label>

        <label class="toggle">
          <input type="checkbox" id="parkingToggle">
          <span id="parking">Parkings</span>
        </label>

        <label class="toggle">
          <input type="checkbox" id="tiendasToggle">
          <span id="tiendas">Tiendas</span>
        </label>

      </div>

    </div>
  </div>


  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

  <script src="/ProjectoFinal/js/script.js"></script>

</body>

</html>