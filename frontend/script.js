let currentUserId = '';
let currentUsername = '';

const map = L.map('map').setView([28.6139, 77.2090], 13); // New Delhi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:5000/api/location/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) throw new Error('Invalid credentials');
      return res.json();
    })
    .then(data => {
      currentUserId = data.userId;
      currentUsername = data.username;
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('controls').style.display = 'block';
      document.getElementById('welcomeUser').innerText = `Welcome, ${currentUsername}!`;
      document.getElementById('errorMsg').innerText = '';
    })
    .catch(err => {
      document.getElementById('errorMsg').innerText = err.message;
    });
}

function sendLocation(type) {
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const timestamp = new Date().toLocaleString();

    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    const address = data.display_name;

    const locationData = { userId: currentUserId, username: currentUsername, type, lat, lng, address, timestamp };

    await fetch('http://localhost:5000/api/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationData)
    });

    alert(`${type} location saved with address: ${address}`);
  });
}


async function showLocations() {
  const res = await fetch('http://localhost:5000/api/location');
  const locations = await res.json();

  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng]).addTo(map);
    marker.bindPopup(`<b>${loc.type.toUpperCase()} - ${loc.timestamp}</b><br><i>${loc.username}</i><br>${loc.address}`);
  });
}
