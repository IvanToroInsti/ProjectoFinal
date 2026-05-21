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
  const entradasPorTribuna = Math.ceil(CAPACIDAD / tribunas.length);
  let tribunaIndex = Math.ceil(numEntrada / entradasPorTribuna) - 1;

  if (tribunaIndex < 0) tribunaIndex = 0;
  if (tribunaIndex >= tribunas.length) tribunaIndex = tribunas.length - 1;

  return tribunas[tribunaIndex];
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

entradaInput.addEventListener("input", updateRoute);
visitaToggle.addEventListener("change", updateRoute);
idiomaSelect.addEventListener("change", actualizarTexto);
actualizarTexto();
