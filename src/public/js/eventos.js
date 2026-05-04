if (!localStorage.getItem('token')) {
    window.location.href = '/login';
}

const API = '/api/eventos';

let editandoId = null;

function getToken() {
    return localStorage.getItem('token');
}

function getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

// LISTAR EVENTOS
async function carregarEventos() {
    const res = await fetch(API);
    const data = await res.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    const userId = getUserId();

    data.forEach(e => {
        const li = document.createElement('li');

        const criadorId = e.criador?._id || e.criador;

        let botoes = '';

        if (criadorId === userId) {
            botoes = `
                <button onclick="prepararEdicao('${e._id}', '${e.titulo}', '${e.descricao}')">Editar</button>
                <button onclick="deletarEvento('${e._id}')">Deletar</button>
            `;
        }

        li.innerHTML = `
            <strong>${e.titulo}</strong><br>
            ${e.descricao}<br>
            ${botoes}
        `;

        lista.appendChild(li);
    });
}

// CRIAR OU ATUALIZAR
async function salvarEvento() {
    const titulo = document.getElementById('titulo').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;

    if (!titulo || !descricao) return;

    if (editandoId) {
        // UPDATE
        await fetch(`${API}/${editandoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify({ titulo, descricao })
        });

        editandoId = null;
        document.getElementById('btnSalvar').innerText = 'Criar';
    } else {
        // CREATE
        await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify({ titulo, data, descricao })
        });
    }

    limparFormulario();
    carregarEventos();
}

// PREPARA EDIÇÃO
function prepararEdicao(id, titulo, descricao) {
    document.getElementById('titulo').value = titulo;
    document.getElementById('descricao').value = descricao;

    editandoId = id;

    document.getElementById('btnSalvar').innerText = 'Atualizar';
}

// DELETAR
async function deletarEvento(id) {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });

    carregarEventos();
}

// LIMPAR FORMULÁRIO
function limparFormulario() {
    document.getElementById('titulo').value = '';
    document.getElementById('data').value = '';
    document.getElementById('descricao').value = '';
}

// INICIAR
carregarEventos();