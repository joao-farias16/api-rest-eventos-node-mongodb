const API = '/api/auth';

async function register() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.msg);
        return;
    }

    alert(data.msg);

    window.location.href = '/login';
}

async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.msg);
        return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem("userId", data.usuario.id);

    window.location.href = "/dashboard";
}