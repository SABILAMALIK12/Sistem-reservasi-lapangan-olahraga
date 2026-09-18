const API_URL = 'http://localhost:3000';

async function register() {
  const nama_users = document.getElementById('reg-nama').value;
  const telepon = document.getElementById('reg-telepon').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama_users, telepon, email, password })
  });

  const data = await response.json();
  document.getElementById('reg-hasil').innerText = data.message;
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token);
    document.getElementById('login-hasil').innerText = `Login berhasil, role: ${data.role}`;
  } else {
    document.getElementById('login-hasil').innerText = data.message;
  }
}

async function lihatLapangan() {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/lapangan`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await response.json();
  const list = document.getElementById('lapangan-list');
  list.innerHTML = '';

  if (response.ok) {
    data.data.forEach(l => {
      const li = document.createElement('li');
      li.innerText = `ID ${l.id} - ${l.nama_lapangan} - Rp${l.harga_per_jam}/jam`;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = `<li>${data.message}</li>`;
  }
}

async function tambahLapangan() {
  const token = localStorage.getItem('token');
  const nama_lapangan = document.getElementById('tambah-nama').value;
  const harga_per_jam = document.getElementById('tambah-harga').value;

  const response = await fetch(`${API_URL}/api/lapangan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nama_lapangan, harga_per_jam })
  });

  const data = await response.json();
  document.getElementById('tambah-hasil').innerText = data.message;
}

async function buatBooking() {
  const token = localStorage.getItem('token');
  const lapangan_id = document.getElementById('booking-lapangan-id').value;
  const jadwal_mulai = document.getElementById('booking-mulai').value.replace('T', ' ') + ':00';
  const jadwal_selesai = document.getElementById('booking-selesai').value.replace('T', ' ') + ':00';

  const response = await fetch(`${API_URL}/api/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ lapangan_id, jadwal_mulai, jadwal_selesai })
  });

  const data = await response.json();
  document.getElementById('booking-hasil').innerText = data.message;
}