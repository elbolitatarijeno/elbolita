// 🌍 Preserve your map setup
function initMap() {
  const location = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: location,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

// 📬 Submit contact form via Tunnelmole server
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('msg').value
    };

    fetch('https://2gdn29-ip-177-222-62-20.tunnelmole.net/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
      alert('Mensaje enviado correctamente');
      console.log('Server response:', msg);
      form.reset();
    })
    .catch(err => {
      alert('Hubo un error al enviar el mensaje');
      console.error(err);
    });
  });
});