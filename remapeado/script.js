const map = L.map('map').setView([-38.4161, -63.6167], 5); // Centra el mapa en Argentina

// Capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Capa de enrutamiento
const routingControl = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim(),
    createMarker: function() { return null; } // No crear marcadores por defecto
}).addTo(map);

// Función para trazar ruta
function drawRoute() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    // Usar la API de GraphHopper para obtener la ruta
    const apiKey = 'ea0313bf-ed8e-43de-a131-6b1d2fcde1ef';
    const url = `https://graphhopper.com/api/1/route?point=${origin}&point=${destination}&key=${apiKey}&vehicle=car&locale=es&instructions=true&calcPoints=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.paths && data.paths.length > 0) {
                const route = data.paths[0];
                const routeCoordinates = route.points.coordinates.map(coord => [coord[1], coord[0]]); // Convierte a [lat, lng]
                routingControl.setWaypoints(routeCoordinates.map(coord => L.latLng(coord[0], coord[1])));
            } else {
                alert("No se encontró ninguna ruta.");
            }
        })
        .catch(err => {
            console.error("Error al obtener la ruta: ", err);
            alert("Error al obtener la ruta. Verifica los nombres de las ciudades.");
        });
}

// Función para limpiar el mapa
function clearMap() {
    routingControl.setWaypoints([]);
}
