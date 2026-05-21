
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
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828859.png",
  iconSize: [28, 28]
});

const tiendaIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  iconSize: [28, 28]
});

// ================= DATOS =================
const puertas = [
  { nom: "Puerta 1", lat: 41.57358414534825, lng: 2.2577796192549173 },
  { nom: "Puerta 2", lat: 41.574337562719805, lng: 2.263736902283102 },
  { nom: "Puerta 3", lat: 41.57045034330061, lng: 2.263384702661838 },
  { nom: "Puerta 4", lat: 41.566554165553335, lng: 2.26015166405373 },
  { nom: "Puerta 5", lat: 41.56582755148905, lng: 2.2584747083326744 },
  { nom: "Puerta 6", lat: 41.56362576279445, lng: 2.251721741815354 },
  { nom: "Puerta 7", lat: 41.56926685502898, lng: 2.2540137937396962 },
];

const tribunas = [
  { nom: "Tribuna Principal", lat: 41.57007508192984, lng: 2.2616373930705573 },
  { nom: "Tribuna A", lat: 41.564149345230845, lng: 2.254919328417029 },
  { nom: "Tribuna L", lat: 41.56482134250079, lng: 2.253589903258085 },
  { nom: "Tribuna F", lat: 41.56496196951934, lng: 2.257349635269684 },
  { nom: "Tribuna E", lat: 41.56562542636767, lng: 2.257891884622491 },
  { nom: "Tribuna K", lat: 41.566288876412436, lng: 2.2584724103923266 },
  { nom: "Tribuna J", lat: 41.56731983562511, lng: 2.2593400093341534 },
];

const baños = [
  { nom: "WC Tribuna D", lat: 41.56901120533182, lng: 2.2608596035299 },
  { nom: "WC Tribuna F", lat: 41.56454812007726, lng: 2.2571259687679928 },
  { nom: "WC Tribuna E", lat: 41.56558364752653, lng: 2.2579413602483567 },
  { nom: "WC Tribuna B", lat: 41.57242252844093, lng: 2.2594326684408466 },
  { nom: "WC Tribuna C", lat: 41.57518356154787, lng: 2.260430450106517 },
  { nom: "WC Tribuna G", lat: 41.57381911226953, lng: 2.2580271910064975 },
  { nom: "WC Paddock", lat: 41.569273959210165, lng: 2.2600103117412362 },
];

const bares = [
  { nom: "Food Truck", lat: 41.57494258882424, lng: 2.259702186917352 },
  { nom: "Carpa bar 1", lat: 41.56750987524392, lng: 2.2599734342794604 },
  { nom: "Carpa bar 2", lat: 41.567207781256606, lng: 2.2541858785358273 },
  { nom: "Hot Dogs", lat: 41.565885704957374, lng: 2.254920437992722 },
];

const parkings = [
  { nom: "Parking 1", lat: 41.57552903151843, lng: 2.2629809403204852 },
  { nom: "Parking 2", lat: 41.57557718776761, lng: 2.264719011633892 },
  { nom: "Parking 3", lat: 41.57247906259213, lng: 2.2654593012673803 },
  { nom: "Parking 4", lat: 41.566410801286956, lng: 2.2612965130472613 },
];

const tiendas = [
  { nom: "Tienda 1", lat: 41.574581951271014, lng: 2.2579598451126963 },
  { nom: "Tienda 2", lat: 41.57057677213056, lng: 2.2571873689734034 },
  { nom: "Tienda 3", lat: 41.568409537612425, lng: 2.258507015711361 },
];

// ================= MAPA =================
const map = L.map("map").setView(circuitCoords, 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);

// ================= VARIABLES =================
let userCoords = null;
let userMarker = null;
let currentTribuna = null;

// markers
let wcMarkers = [];
let barMarkers = [];
let parkingMarkers = [];
let tiendaMarkers = [];

// ================= ROUTING =================
let routingControl = L.Routing.control({
  waypoints: [],
  routeWhileDragging: false,
  addWaypoints: false,
  draggableWaypoints: false,
  show: false,
  lineOptions: { styles: [{ color: "#E61415", weight: 5 }] }
}).addTo(map);

// ================= GPS =================
navigator.geolocation.watchPosition((pos) => {

  userCoords = [pos.coords.latitude, pos.coords.longitude];

  if (!userMarker) {
    userMarker = L.marker(userCoords)
      .addTo(map)
      .bindPopup("📍 Estás aquí");
  } else {
    userMarker.setLatLng(userCoords);
  }

});

// ================= INPUT =================
const entradaInput = document.getElementById("puerta");
const visitaToggle = document.getElementById("visitaToggle");

document.getElementById("nentradas").textContent =
  `Número de entrada (1 - ${CAPACIDAD})`;

entradaInput.addEventListener("input", updateRoute);
visitaToggle.addEventListener("change", updateRoute);

// ================= ROUTE =================
function updateRoute() {

  if (!userCoords) return;

  // VISITA
  if (visitaToggle.checked) {

    routingControl.setWaypoints([
      L.latLng(userCoords),
      L.latLng(circuitCoords)
    ]);

    currentTribuna = null;
    return;
  }

  const num = parseInt(entradaInput.value);
  if (isNaN(num)) return;

  let tribunaIndex = Math.floor((num - 1) / 200);
  if (tribunaIndex >= tribunas.length) tribunaIndex = tribunas.length - 1;

  const tribuna = tribunas[tribunaIndex];
  currentTribuna = tribuna;

  let puerta = puertas[0];
  let min = Infinity;

  puertas.forEach(p => {
    const d = Math.hypot(p.lat - tribuna.lat, p.lng - tribuna.lng);
    if (d < min) {
      min = d;
      puerta = p;
    }
  });

  routingControl.setWaypoints([
    L.latLng(userCoords),
    L.latLng(puerta.lat, puerta.lng),
    L.latLng(tribuna.lat, tribuna.lng)
  ]);
}

// ================= POI ROUTE =================
function routeToPOI(poi) {

  if (!userCoords) return;

  const start = userCoords;

  if (currentTribuna) {
    routingControl.setWaypoints([
      L.latLng(start),
      L.latLng(currentTribuna.lat, currentTribuna.lng),
      L.latLng(poi.lat, poi.lng)
    ]);
  } else {
    routingControl.setWaypoints([
      L.latLng(start),
      L.latLng(poi.lat, poi.lng)
    ]);
  }
}

// ================= HELPERS =================
function addMarkers(data, icon, arr, emoji) {
  data.forEach(p => {
    const m = L.marker([p.lat, p.lng], { icon })
      .addTo(map)
      .bindPopup(`${emoji} ${p.nom}`)
      .on("click", () => routeToPOI(p));
    arr.push(m);
  });
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

// ================= IDIOMAS =================
const idiomaSelect = document.getElementById("idioma");
const capacidadInfo = document.getElementById("capacidadInfo");

function actualizarTexto() {

  const i = idiomaSelect.value;

  const nav = document.getElementById("nav");
  const pt = document.getElementById("pt");
  const entrada = document.getElementById("nentradas");
  const visita = document.getElementById("visita");
  const botonCircuit = document.getElementById("btnCircuit");
  const botonUbicacion = document.getElementById("btnLocation");

  const wc = document.getElementById("wc");
  const baresTxt = document.getElementById("bares");
  const parking = document.getElementById("parking");
  const tiendasTxt = document.getElementById("tiendas");
  

  if (i === "Castellano") {
    nav.textContent = "Navegación";
    pt.textContent = "Puntos de interés";
    entrada.textContent = "Número de entrada";
    visita.textContent = "Voy de visita";
    capacidadInfo.textContent = `Capacidad: ${CAPACIDAD.toLocaleString()}`;
    botonUbicacion.textContent = "📍 Mi ubicación";
    botonCircuit.textContent = "🏁 Circuito";

  } else if (i === "Catalán") {
    nav.textContent = "Navegació";
    pt.textContent = "Punts d'interès";
    entrada.textContent = "Número entrada";
    visita.textContent = "Visita";
    capacidadInfo.textContent = `Capacitat: ${CAPACIDAD.toLocaleString()}`;
    botonUbicacion.textContent = "📍 Mi ubicació";
    botonCircuit.textContent = "🏁 Circuit";

  } else {
    nav.textContent = "Navigation";
    pt.textContent = "Points of interest";
    entrada.textContent = "Ticket number";
    visita.textContent = "Visit";
    capacidadInfo.textContent = `Capacity: ${CAPACIDAD.toLocaleString()}`;
    botonUbicacion.textContent = "📍 My location";
    botonCircuit.textContent = "🏁 Circuit";
  }

  wc.textContent = i === "Inglés" ? "WC" : "WC";
  baresTxt.textContent = i === "Inglés" ? "Bars" : i === "Catalán" ? "Bars" : "Bares";
  parking.textContent = i === "Inglés" ? "Parking" : i === "Catalán" ? "Pàrquings" : "Parkings";
  tiendasTxt.textContent = i === "Inglés" ? "Shops" : i === "Catalán" ? "Botigues" : "Tiendas";
}

idiomaSelect.addEventListener("change", actualizarTexto);
actualizarTexto();