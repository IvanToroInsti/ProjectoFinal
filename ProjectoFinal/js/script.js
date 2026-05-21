const circuitCoords = [41.56919, 2.258137];
const CAPACIDAD = 140000;

// ================= ICONOS =================
const wcIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/8064/8064840.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const barIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1996/1996068.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const parkingIcon = L.icon({
  iconUrl: "https://static.vecteezy.com/system/resources/previews/024/382/909/non_2x/parking-sign-symbol-icon-blue-design-transparent-background-free-png.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28]
});

const tiendaIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28]
});

const puertaIcon = L.divIcon({
  html: "<div class='map-icon'>🚪</div>",
  className: "custom-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const tribunaIcon = L.divIcon({
  html: "<div class='map-icon'>🏟️</div>",
  className: "custom-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// ================= DATOS =================
let baños = [];
let bares = [];
let parkings = [];
let tiendas = [];
let tribunas = [];
let puertas = [];

async function cargarPOIs() {
  const res = await fetch("../php/datos.php");
  const data = await res.json();

  baños = data.filter(p => p.tipus === "wc");
  bares = data.filter(p => p.tipus === "bar");
  parkings = data.filter(p => p.tipus === "parking");
  tiendas = data.filter(p => p.tipus === "tienda");
  tribunas = data.filter(p => p.tipus === "tribuna");
  puertas = data.filter(p => p.tipus === "puerta");

  console.log("POIs cargados:", data);
}

cargarPOIs();
// ================= MAPA =================
const map = L.map("map").setView(circuitCoords, 15);

const lightLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19
  }
);

const darkLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19
  }
);

darkLayer.addTo(map);

// ================= VARIABLES =================
let userCoords = null;
let userMarker = null;
let currentTribuna = null;
let currentPuerta = null;
let lastRouteInfo = "initial";
let lastNumEntrada = null;
let selectedPoiMarker = null;
let selectedDoorMarker = null;
let selectedTribunaMarker = null;

const routeInfo = document.getElementById("routeInfo");
const entradaInput = document.getElementById("puerta");
const visitaToggle = document.getElementById("visitaToggle");
const idiomaSelect = document.getElementById("idioma");
const capacidadInfo = document.getElementById("capacidadInfo");
const themeToggle = document.getElementById("themeToggle");

let lightMode = false;

let wcMarkers = [];
let barMarkers = [];
let parkingMarkers = [];
let tiendaMarkers = [];

// ================= TEXTOS =================
const textos = {
  Castellano: {
    nav: "Navegación",
    poi: "Puntos de interés",
    entrada: "Número de entrada",
    visita: "Voy de visita",
    capacidad: "Capacidad",
    miUbicacion: "📍 Mi ubicación",
    circuito: "🏁 Circuito",
    borrarRuta: "❌ Borrar ruta",
    wcCercano: "🚻 WC cercano",
    emergencia: "🚨 Emergencia",
    cerrarSesion: "Cerrar sesión",
    bares: "Bares",
    parking: "Parkings",
    tiendas: "Tiendas",
    placeholder: "Introduce tu número de entrada o activa la ubicación.",
    ubicacionPopup: "📍 Estás aquí",
    rutaBorrada: "Ruta borrada correctamente.",
    activaUbicacion: "Activa la ubicación para calcular la ruta.",
    entradaInvalida: "Introduce un número de entrada válido entre 1 y",
    entradaTxt: "Entrada",
    tribunaAsignada: "Tribuna asignada",
    puertaRecomendada: "Puerta recomendada",
    ruta: "Ruta",
    tuUbicacion: "tu ubicación",
    activarParaDibujar: "Activa la ubicación para dibujar la ruta en el mapa.",
    modoVisita: "Modo visita",
    modoVisitaActivo: "Modo visita activado.",
    rutaCircuito: "Ruta directa hasta el Circuit de Catalunya.",
    wcMasCercano: "WC más cercano",
    rutaDesdeTribunaWC: "Ruta desde la tribuna hasta el lavabo más cercano.",
    rutaDesdeUbicacionWC: "Ruta desde tu ubicación hasta el lavabo más cercano.",
    faltaTribuna: "Primero introduce un número de entrada para saber tu tribuna.",
    emergenciaActiva: "Modo emergencia activado",
    salidaCercana: "Salida más cercana",
    rutaDesdeTribunaSalida: "Ruta desde la tribuna hasta la puerta más cercana.",
    rutaDesdeUbicacionSalida: "Ruta desde tu ubicación hasta la puerta más cercana."
  },
  Catalán: {
    nav: "Navegació",
    poi: "Punts d'interès",
    entrada: "Número d'entrada",
    visita: "Vaig de visita",
    capacidad: "Capacitat",
    miUbicacion: "📍 La meva ubicació",
    circuito: "🏁 Circuit",
    borrarRuta: "❌ Esborrar ruta",
    wcCercano: "🚻 WC proper",
    emergencia: "🚨 Emergència",
    cerrarSesion: "Tancar sessió",
    bares: "Bars",
    parking: "Pàrquings",
    tiendas: "Botigues",
    placeholder: "Introdueix el número d'entrada o activa la ubicació.",
    ubicacionPopup: "📍 Ets aquí",
    rutaBorrada: "Ruta esborrada correctament.",
    activaUbicacion: "Activa la ubicació per calcular la ruta.",
    entradaInvalida: "Introdueix un número d'entrada vàlid entre 1 i",
    entradaTxt: "Entrada",
    tribunaAsignada: "Tribuna assignada",
    puertaRecomendada: "Porta recomanada",
    ruta: "Ruta",
    tuUbicacion: "la teva ubicació",
    activarParaDibujar: "Activa la ubicació per dibuixar la ruta al mapa.",
    modoVisita: "Mode visita",
    modoVisitaActivo: "Mode visita activat.",
    rutaCircuito: "Ruta directa fins al Circuit de Catalunya.",
    wcMasCercano: "WC més proper",
    rutaDesdeTribunaWC: "Ruta des de la tribuna fins al lavabo més proper.",
    rutaDesdeUbicacionWC: "Ruta des de la teva ubicació fins al lavabo més proper.",
    faltaTribuna: "Primer introdueix un número d'entrada per saber la teva tribuna.",
    emergenciaActiva: "Mode emergència activat",
    salidaCercana: "Sortida més propera",
    rutaDesdeTribunaSalida: "Ruta des de la tribuna fins a la porta més propera.",
    rutaDesdeUbicacionSalida: "Ruta des de la teva ubicació fins a la porta més propera."
  },
  Inglés: {
    nav: "Navigation",
    poi: "Points of interest",
    entrada: "Ticket number",
    visita: "I am visiting",
    capacidad: "Capacity",
    miUbicacion: "📍 My location",
    circuito: "🏁 Circuit",
    borrarRuta: "❌ Clear route",
    wcCercano: "🚻 Nearest WC",
    emergencia: "🚨 Emergency",
    cerrarSesion: "Log out",
    bares: "Bars",
    parking: "Parking",
    tiendas: "Shops",
    placeholder: "Enter your ticket number or enable location.",
    ubicacionPopup: "📍 You are here",
    rutaBorrada: "Route cleared successfully.",
    activaUbicacion: "Enable location to calculate the route.",
    entradaInvalida: "Enter a valid ticket number between 1 and",
    entradaTxt: "Ticket",
    tribunaAsignada: "Assigned stand",
    puertaRecomendada: "Recommended gate",
    ruta: "Route",
    tuUbicacion: "your location",
    activarParaDibujar: "Enable location to draw the route on the map.",
    modoVisita: "Visit mode",
    modoVisitaActivo: "Visit mode enabled.",
    rutaCircuito: "Direct route to the Circuit de Catalunya.",
    wcMasCercano: "Nearest WC",
    rutaDesdeTribunaWC: "Route from the stand to the nearest WC.",
    rutaDesdeUbicacionWC: "Route from your location to the nearest WC.",
    faltaTribuna: "Enter a ticket number first to know your stand.",
    emergenciaActiva: "Emergency mode enabled",
    salidaCercana: "Nearest exit",
    rutaDesdeTribunaSalida: "Route from the stand to the nearest gate.",
    rutaDesdeUbicacionSalida: "Route from your location to the nearest gate."
  }
};

function t() {
  return textos[idiomaSelect.value] || textos.Castellano;
}

// ================= ROUTING =================
let routingControl = L.Routing.control({
  waypoints: [],
  routeWhileDragging: false,
  addWaypoints: false,
  draggableWaypoints: false,
  show: false,
  createMarker: function () {
    return null;
  },
  lineOptions: { styles: [{ color: "#E61415", weight: 5 }] }
}).addTo(map);

// ================= GPS =================
navigator.geolocation.watchPosition((pos) => {
  userCoords = [pos.coords.latitude, pos.coords.longitude];

  if (!userMarker) {
    userMarker = L.marker(userCoords)
      .addTo(map)
      .bindPopup(t().ubicacionPopup);
  } else {
    userMarker.setLatLng(userCoords);
    userMarker.bindPopup(t().ubicacionPopup);
  }
});

// ================= FUNCIONES DE RUTA =================
function obtenerTribunaPorEntrada(numEntrada) {

  if (numEntrada >= 1 && numEntrada <= 20000) {
    return tribunas.find(t => t.nom === "Tribuna Principal");
  }

  if (numEntrada >= 20001 && numEntrada <= 40000) {
    return tribunas.find(t => t.nom === "Tribuna A");
  }

  if (numEntrada >= 40001 && numEntrada <= 60000) {
    return tribunas.find(t => t.nom === "Tribuna L");
  }

  if (numEntrada >= 60001 && numEntrada <= 80000) {
    return tribunas.find(t => t.nom === "Tribuna F");
  }

  if (numEntrada >= 80001 && numEntrada <= 100000) {
    return tribunas.find(t => t.nom === "Tribuna E");
  }

  if (numEntrada >= 100001 && numEntrada <= 120000) {
    return tribunas.find(t => t.nom === "Tribuna K");
  }

  if (numEntrada >= 120001 && numEntrada <= 140000) {
    return tribunas.find(t => t.nom === "Tribuna J");
  }

  return tribunas[0];
}

function buscarMasCercano(lista, coords) {
  let cercano = lista[0];
  let distanciaMinima = Infinity;

  lista.forEach(punto => {
    const distancia = Math.hypot(
      punto.lat - coords[0],
      punto.lng - coords[1]
    );

    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      cercano = punto;
    }
  });

  return cercano;
}

function obtenerPuertaPorTribuna(tribuna) {
  return buscarMasCercano(puertas, [tribuna.lat, tribuna.lng]);
}

function limpiarMarcadorTemporal() {
  if (selectedPoiMarker) {
    map.removeLayer(selectedPoiMarker);
    selectedPoiMarker = null;
  }
}

function limpiarMarcadoresSeleccionados() {
  limpiarMarcadorTemporal();

  if (selectedDoorMarker) {
    map.removeLayer(selectedDoorMarker);
    selectedDoorMarker = null;
  }

  if (selectedTribunaMarker) {
    map.removeLayer(selectedTribunaMarker);
    selectedTribunaMarker = null;
  }
}

function mostrarMarcadoresRuta(puerta, tribuna) {
  if (selectedDoorMarker) map.removeLayer(selectedDoorMarker);
  if (selectedTribunaMarker) map.removeLayer(selectedTribunaMarker);

  selectedDoorMarker = L.marker([puerta.lat, puerta.lng], { icon: puertaIcon })
    .addTo(map)
    .bindPopup(`🚪 ${puerta.nom}`);

  selectedTribunaMarker = L.marker([tribuna.lat, tribuna.lng], { icon: tribunaIcon })
    .addTo(map)
    .bindPopup(`🏟️ ${tribuna.nom}`);
}

function updateRoute() {
  limpiarMarcadorTemporal();

  if (visitaToggle.checked) {
    currentTribuna = null;
    currentPuerta = null;
    lastRouteInfo = "visit";

    if (selectedDoorMarker) map.removeLayer(selectedDoorMarker), selectedDoorMarker = null;
    if (selectedTribunaMarker) map.removeLayer(selectedTribunaMarker), selectedTribunaMarker = null;

    if (!userCoords) {
      routingControl.setWaypoints([]);
      routeInfo.innerHTML = `<b>${t().modoVisitaActivo}</b><br>${t().activaUbicacion}`;
      return;
    }

    routingControl.setWaypoints([
      L.latLng(userCoords),
      L.latLng(circuitCoords)
    ]);

    routeInfo.innerHTML = `<b>${t().modoVisita}:</b><br>${t().rutaCircuito}`;
    return;
  }

  const num = parseInt(entradaInput.value);
  lastNumEntrada = num;

  if (isNaN(num) || num < 1 || num > CAPACIDAD) {
    routingControl.setWaypoints([]);
    currentTribuna = null;
    currentPuerta = null;
    limpiarMarcadoresSeleccionados();
    lastRouteInfo = "invalid";
    routeInfo.textContent = `${t().entradaInvalida} ${CAPACIDAD}.`;
    return;
  }

  const tribuna = obtenerTribunaPorEntrada(num);
  const puerta = obtenerPuertaPorTribuna(tribuna);

  currentTribuna = tribuna;
  currentPuerta = puerta;
  lastRouteInfo = "mainRoute";

  mostrarMarcadoresRuta(puerta, tribuna);
  console.log("Entrada:", num);
  console.log("Tribuna:", tribuna);
  console.log("Puerta:", puerta);
  if (userCoords) {
    routingControl.setWaypoints([
      L.latLng(userCoords),
      L.latLng(puerta.lat, puerta.lng),
      L.latLng(tribuna.lat, tribuna.lng)
    ]);

    routeInfo.innerHTML = `
      <b>${t().entradaTxt}:</b> ${num}<br>
      <b>${t().tribunaAsignada}:</b> ${tribuna.nom}<br>
      <b>${t().puertaRecomendada}:</b> ${puerta.nom}<br>
      <b>${t().ruta}:</b> ${t().tuUbicacion} → ${puerta.nom} → ${tribuna.nom}
    `;
  } else {
    routingControl.setWaypoints([]);

    routeInfo.innerHTML = `
      <b>${t().entradaTxt}:</b> ${num}<br>
      <b>${t().tribunaAsignada}:</b> ${tribuna.nom}<br>
      <b>${t().puertaRecomendada}:</b> ${puerta.nom}<br>
      ${t().activarParaDibujar}
    `;
  }
}

// ================= MARCADORES DE PUNTOS DE INTERÉS =================
function addMarkers(data, icon, arr, emoji) {
  data.forEach(p => {
    const m = L.marker([p.lat, p.lng], { icon })
      .addTo(map)
      .bindPopup(`${emoji} ${p.nom}`)
      .on("click", () => routeToPOI(p));
    arr.push(m);
  });
}

function routeToPOI(poi) {
  limpiarMarcadorTemporal();

  if (currentTribuna) {
    routingControl.setWaypoints([
      L.latLng(currentTribuna.lat, currentTribuna.lng),
      L.latLng(poi.lat, poi.lng)
    ]);

    routeInfo.innerHTML = `
      <b>${t().tribunaAsignada}:</b> ${currentTribuna.nom}<br>
      <b>${poi.nom}</b><br>
      ${t().ruta}: ${currentTribuna.nom} → ${poi.nom}
    `;
    return;
  }

  if (!userCoords) {
    routeInfo.textContent = t().faltaTribuna;
    return;
  }

  routingControl.setWaypoints([
    L.latLng(userCoords),
    L.latLng(poi.lat, poi.lng)
  ]);

  routeInfo.innerHTML = `
    <b>${poi.nom}</b><br>
    ${t().ruta}: ${t().tuUbicacion} → ${poi.nom}
  `;
}

function mostrarSoloPoi(poi, icon, emoji) {
  limpiarMarcadorTemporal();

  selectedPoiMarker = L.marker([poi.lat, poi.lng], { icon })
    .addTo(map)
    .bindPopup(`${emoji} ${poi.nom}`)
    .openPopup();
}

function ocultarTodosLosPuntos() {
  wcMarkers.forEach(m => map.removeLayer(m));
  barMarkers.forEach(m => map.removeLayer(m));
  parkingMarkers.forEach(m => map.removeLayer(m));
  tiendaMarkers.forEach(m => map.removeLayer(m));

  wcMarkers = [];
  barMarkers = [];
  parkingMarkers = [];
  tiendaMarkers = [];

  document.getElementById("wcToggle").checked = false;
  document.getElementById("barToggle").checked = false;
  document.getElementById("parkingToggle").checked = false;
  document.getElementById("tiendasToggle").checked = false;
}

function calcularRutaWcCercano() {
  ocultarTodosLosPuntos();

  let origen = null;
  let textoOrigen = "";

  if (currentTribuna) {
    origen = [currentTribuna.lat, currentTribuna.lng];
    textoOrigen = currentTribuna.nom;
  } else if (userCoords) {
    origen = userCoords;
    textoOrigen = t().tuUbicacion;
  } else {
    routeInfo.textContent = t().faltaTribuna;
    return;
  }

  const wcCercano = buscarMasCercano(baños, origen);

  routingControl.setWaypoints([
    L.latLng(origen),
    L.latLng(wcCercano.lat, wcCercano.lng)
  ]);

  mostrarSoloPoi(wcCercano, wcIcon, "🚻");
  lastRouteInfo = "wc";

  routeInfo.innerHTML = `
    <b>${t().wcMasCercano}:</b> ${wcCercano.nom}<br>
    <b>${t().ruta}:</b> ${textoOrigen} → ${wcCercano.nom}<br>
    ${currentTribuna ? t().rutaDesdeTribunaWC : t().rutaDesdeUbicacionWC}
  `;
}

function calcularRutaEmergencia() {
  ocultarTodosLosPuntos();

  let origen = null;
  let textoOrigen = "";

  if (currentTribuna) {
    origen = [currentTribuna.lat, currentTribuna.lng];
    textoOrigen = currentTribuna.nom;
  } else if (userCoords) {
    origen = userCoords;
    textoOrigen = t().tuUbicacion;
  } else {
    routeInfo.textContent = t().faltaTribuna;
    return;
  }

  const puertaCercana = buscarMasCercano(puertas, origen);

  routingControl.setWaypoints([
    L.latLng(origen),
    L.latLng(puertaCercana.lat, puertaCercana.lng)
  ]);

  mostrarSoloPoi(puertaCercana, puertaIcon, "🚪");
  lastRouteInfo = "emergency";

  routeInfo.innerHTML = `
    <b>${t().emergenciaActiva}</b><br>
    <b>${t().salidaCercana}:</b> ${puertaCercana.nom}<br>
    <b>${t().ruta}:</b> ${textoOrigen} → ${puertaCercana.nom}<br>
    ${currentTribuna ? t().rutaDesdeTribunaSalida : t().rutaDesdeUbicacionSalida}
  `;
}

// ================= TOGGLES =================
document.getElementById("wcToggle").addEventListener("change", e => {
  if (e.target.checked) addMarkers(baños, wcIcon, wcMarkers, "🚻");
  else wcMarkers.forEach(m => map.removeLayer(m)), wcMarkers = [];
});

document.getElementById("barToggle").addEventListener("change", e => {
  if (e.target.checked) addMarkers(bares, barIcon, barMarkers, "🍔");
  else barMarkers.forEach(m => map.removeLayer(m)), barMarkers = [];
});

document.getElementById("parkingToggle").addEventListener("change", e => {
  if (e.target.checked) addMarkers(parkings, parkingIcon, parkingMarkers, "🅿️");
  else parkingMarkers.forEach(m => map.removeLayer(m)), parkingMarkers = [];
});

document.getElementById("tiendasToggle").addEventListener("change", e => {
  if (e.target.checked) addMarkers(tiendas, tiendaIcon, tiendaMarkers, "🛍️");
  else tiendaMarkers.forEach(m => map.removeLayer(m)), tiendaMarkers = [];
});

// ================= BOTONES =================
document.getElementById("btnLocation").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(pos => {
    userCoords = [pos.coords.latitude, pos.coords.longitude];
    map.setView(userCoords, 17);
    updateRoute();
  });
});

document.getElementById("btnCircuit").addEventListener("click", () => {
  map.setView(circuitCoords, 16);
});

document.getElementById("btnBorrarRuta").addEventListener("click", () => {
  routingControl.setWaypoints([]);
  currentTribuna = null;
  currentPuerta = null;
  lastRouteInfo = "cleared";
  entradaInput.value = "";
  limpiarMarcadoresSeleccionados();
  routeInfo.textContent = t().rutaBorrada;
});

document.getElementById("btnWcCercano").addEventListener("click", calcularRutaWcCercano);

document.getElementById("btnEmergencia").addEventListener("click", calcularRutaEmergencia);

// ================= IDIOMAS =================
function actualizarTexto() {
  const txt = t();

  document.getElementById("nav").textContent = txt.nav;
  document.getElementById("pt").textContent = txt.poi;
  document.getElementById("nentradas").textContent = txt.entrada;
  document.getElementById("visita").textContent = txt.visita;
  document.getElementById("btnLocation").textContent = txt.miUbicacion;
  document.getElementById("btnCircuit").textContent = txt.circuito;
  document.getElementById("btnBorrarRuta").textContent = txt.borrarRuta;
  document.getElementById("btnWcCercano").textContent = txt.wcCercano;
  document.getElementById("btnEmergencia").textContent = txt.emergencia;
  document.getElementById("logoutBtn").textContent = txt.cerrarSesion;
  document.getElementById("wc").textContent = "WC";
  document.getElementById("bares").textContent = txt.bares;
  document.getElementById("parking").textContent = txt.parking;
  document.getElementById("tiendas").textContent = txt.tiendas;

  capacidadInfo.textContent = `${txt.capacidad}: ${CAPACIDAD.toLocaleString()}`;
  entradaInput.placeholder = txt.entrada;

  if (!entradaInput.value && lastRouteInfo === "initial") {
    routeInfo.textContent = txt.placeholder;
  } else if (lastRouteInfo === "cleared") {
    routeInfo.textContent = txt.rutaBorrada;
  } else if (lastRouteInfo === "wc") {
    calcularRutaWcCercano();
  } else if (lastRouteInfo === "emergency") {
    calcularRutaEmergencia();
  } else {
    updateRoute();
  }

  if (userMarker) {
    userMarker.bindPopup(txt.ubicacionPopup);
  }
}

// =====================
// MODO DIA / NOCHE
// =====================

function activarModoClaro() {

  document.body.classList.add("light-mode");

  map.removeLayer(darkLayer);
  lightLayer.addTo(map);

  themeToggle.textContent = "🌙";

  localStorage.setItem("theme", "light");

  lightMode = true;
}

function activarModoOscuro() {

  document.body.classList.remove("light-mode");

  map.removeLayer(lightLayer);
  darkLayer.addTo(map);

  themeToggle.textContent = "☀️";

  localStorage.setItem("theme", "dark");

  lightMode = false;
}

themeToggle.addEventListener("click", () => {

  if (lightMode) {
    activarModoOscuro();
  } else {
    activarModoClaro();
  }

});

// cargar tema guardado
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  activarModoClaro();
} else {
  activarModoOscuro();
}

entradaInput.addEventListener("change", updateRoute);
visitaToggle.addEventListener("change", updateRoute);
idiomaSelect.addEventListener("change", actualizarTexto);
actualizarTexto();
