// Inicio De Mapa
function iniciarMap() {
  const coordenadas = { lat: -34.397, lng: 150.644 };
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: coordenadas,
  });
}

// Btn Compartir Funcion
function compartir() {
  if (navigator.share) {
      navigator.share({
          title: 'Mapa',
          text: '¡Mira este mapa!',
          url: window.location.href
      })
      .then(() => console.log('Compartido con éxito'))
      .catch(error => console.error('Error al compartir:', error));
  } else {
      alert('La opción de compartir no es compatible con este navegador.');
  }
}

//muestra/oculta filtros de servicio
function toggleMenu() {
  const menu = document.getElementById('menuServicios');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}
