if (!localStorage.getItem("token")) {
    window.location.href = "/login";
}

const API = "/api/clientes";

let clienteEditando = null;

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
}

function headers() {

    return {

        "Content-Type": "application/json",

        "Authorization":
            "Bearer " + localStorage.getItem("token"),

        "x-user-id":
            localStorage.getItem("userId")

    };

}

async function carregarClientes() {

    try {

        const res = await fetch(API, {

            headers: headers()

        });

        if (!res.ok) {
            throw new Error("Erro ao carregar clientes.");
        }

        const clientes = await res.json();

        const tbody =
            document.getElementById("listaClientes");

        tbody.innerHTML = "";

        clientes.forEach(cliente => {

            tbody.innerHTML += `

                <tr>

                    <td>${cliente.id_cliente}</td>

                    <td>${cliente.nome}</td>

                    <td>${cliente.telefone}</td>

                    <td>${cliente.status == 1 ? "Ativo" : "Inativo"}</td>

                    <td>

                        <div class="actions">

                            <button
                                class="btn-edit"
                                onclick="editarCliente(
                                    ${cliente.id_cliente},
                                    '${cliente.nome.replace(/'/g, "\\'")}',
                                    '${cliente.telefone}',
                                    ${cliente.status}
                                )">

                                Editar

                            </button>

                            <button
                                class="btn-delete"
                                onclick="excluirCliente(${cliente.id_cliente})">

                                Excluir

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Erro ao carregar clientes.");

    }

}

async function salvarCliente() {

    const nome =
        document.getElementById("nome").value.trim();

    const telefone =
        document.getElementById("telefone").value.trim();

    const status =
        document.getElementById("status").value;

    if (!nome || !telefone || status === "") {

        alert("Preencha todos os campos.");

        return;

    }

    const body = {

        nome,

        telefone,

        status

    };

    try {

        if (clienteEditando === null) {

            await fetch(API, {

                method: "POST",

                headers: headers(),

                body: JSON.stringify(body)

            });

        } else {

            await fetch(`${API}/${clienteEditando}`, {

                method: "PUT",

                headers: headers(),

                body: JSON.stringify(body)

            });

            clienteEditando = null;

            document.querySelector(".form button").textContent =
                "Salvar";

        }

        limparFormulario();

        carregarClientes();

    } catch (error) {

        console.error(error);

        alert("Erro ao salvar cliente.");

    }

}

function editarCliente(
    id,
    nome,
    telefone,
    status
) {

    clienteEditando = id;

    document.getElementById("nome").value = nome;

    document.getElementById("telefone").value = telefone;

    document.getElementById("status").value = status;

    document.querySelector(".form button").textContent =
        "Atualizar";

}

async function excluirCliente(id) {

    if (!confirm("Deseja excluir este cliente?")) {
        return;
    }

    try {

        await fetch(`${API}/${id}`, {

            method: "DELETE",

            headers: headers()

        });

        carregarClientes();

    } catch (error) {

        console.error(error);

        alert("Erro ao excluir cliente.");

    }

}

function limparFormulario() {

    document.getElementById("nome").value = "";

    document.getElementById("telefone").value = "";

    document.getElementById("status").value = "";

    clienteEditando = null;

    document.querySelector(".form button").textContent =
        "Salvar";

}

carregarClientes();