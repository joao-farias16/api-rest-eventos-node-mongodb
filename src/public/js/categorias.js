if (!localStorage.getItem("token")) {
    window.location.href = "/login";
}

const API = "/api/categorias";

let categoriaEditando = null;

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

async function carregarCategorias() {

    const res = await fetch(API, {

        headers: headers()

    });

    const categorias = await res.json();

    const tbody =
        document.getElementById("listaCategorias");

    tbody.innerHTML = "";

    categorias.forEach(categoria => {

        tbody.innerHTML += `

            <tr>

                <td>${categoria.id_categoria}</td>

                <td>${categoria.nome}</td>

                <td>

                    <div class="actions">

                        <button
                            class="btn-edit"
                            onclick="editarCategoria(${categoria.id_categoria}, '${categoria.nome}')">

                            Editar

                        </button>

                        <button
                            class="btn-delete"
                            onclick="excluirCategoria(${categoria.id_categoria})">

                            Excluir

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

async function salvarCategoria() {

    const nome =
        document.getElementById("nome").value;

    if (!nome) {

        alert("Informe o nome.");

        return;

    }

    if (categoriaEditando == null) {

        await fetch(API, {

            method: "POST",

            headers: headers(),

            body: JSON.stringify({

                nome

            })

        });

    } else {

        await fetch(

            `${API}/${categoriaEditando}`,

            {

                method: "PUT",

                headers: headers(),

                body: JSON.stringify({

                    nome

                })

            }

        );

        categoriaEditando = null;

    }

    document.getElementById("nome").value = "";

    carregarCategorias();

}

function editarCategoria(id, nome) {

    categoriaEditando = id;

    document.getElementById("nome").value = nome;

}

async function excluirCategoria(id) {

    if (!confirm("Deseja excluir esta categoria?"))
        return;

    await fetch(

        `${API}/${id}`,

        {

            method: "DELETE",

            headers: headers()

        }

    );

    carregarCategorias();

}

carregarCategorias();