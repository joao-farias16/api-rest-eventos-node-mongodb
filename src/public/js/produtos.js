if (!localStorage.getItem("token")) {
    window.location.href = "/login";
}

const API = "/api/produtos";
const API_CATEGORIAS = "/api/categorias";

let produtoEditando = null;

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
}

function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "x-user-id": localStorage.getItem("userId")
    };
}

async function carregarCategorias() {

    try {

        const res = await fetch(API_CATEGORIAS, {
            headers: headers()
        });

        const categorias = await res.json();

        const select = document.getElementById("categoria");

        select.innerHTML = `
            <option value="">
                Selecione uma categoria
            </option>
        `;

        categorias.forEach(categoria => {

            select.innerHTML += `
                <option value="${categoria.id_categoria}">
                    ${categoria.nome}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Erro ao carregar categorias.");

    }

}

async function carregarProdutos() {

    try {

        const res = await fetch(API, {
            headers: headers()
        });

        if (!res.ok) {
            throw new Error("Erro ao carregar produtos.");
        }

        const produtos = await res.json();

        const tbody =
            document.getElementById("listaProdutos");

        tbody.innerHTML = "";

        produtos.forEach(produto => {

            tbody.innerHTML += `

                <tr>

                    <td>${produto.id_produto}</td>

                    <td>${produto.nome}</td>

                    <td>R$ ${Number(produto.valor).toFixed(2)}</td>

                    <td>${produto.estoque}</td>

                    <td>${produto.categoria}</td>

                    <td>

                        <div class="actions">

                            <button
                                class="btn-edit"
                                onclick="editarProduto(
                                    ${produto.id_produto},
                                    '${produto.nome.replace(/'/g, "\\'")}',
                                    ${produto.valor},
                                    ${produto.estoque},
                                    ${produto.categorias_id_categoria}
                                )">

                                Editar

                            </button>

                            <button
                                class="btn-delete"
                                onclick="excluirProduto(${produto.id_produto})">

                                Excluir

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Erro ao carregar produtos.");

    }

}

async function salvarProduto() {

    const nome =
        document.getElementById("nome").value.trim();

    const valor =
        document.getElementById("valor").value;

    const estoque =
        document.getElementById("estoque").value;

    const categoria =
        document.getElementById("categoria").value;

    if (!nome || !valor || !estoque || !categoria) {

        alert("Preencha todos os campos.");

        return;

    }

    const body = {

        nome,

        valor,

        estoque,

        categorias_id_categoria: categoria

    };

        try {

        if (produtoEditando === null) {

            await fetch(API, {

                method: "POST",

                headers: headers(),

                body: JSON.stringify(body)

            });

        } else {

            await fetch(`${API}/${produtoEditando}`, {

                method: "PUT",

                headers: headers(),

                body: JSON.stringify(body)

            });

            produtoEditando = null;

            document.querySelector(".form button").textContent =
                "Salvar";

        }

        limparFormulario();

        carregarProdutos();

    } catch (error) {

        console.error(error);

        alert("Erro ao salvar produto.");

    }

}

function editarProduto(
    id,
    nome,
    valor,
    estoque,
    categoria
) {

    produtoEditando = id;

    document.getElementById("nome").value = nome;

    document.getElementById("valor").value = valor;

    document.getElementById("estoque").value = estoque;

    document.getElementById("categoria").value = categoria;

    document.querySelector(".form button").textContent =
        "Atualizar";

}

async function excluirProduto(id) {

    if (!confirm("Deseja excluir este produto?")) {
        return;
    }

    try {

        await fetch(`${API}/${id}`, {

            method: "DELETE",

            headers: headers()

        });

        carregarProdutos();

    } catch (error) {

        console.error(error);

        alert("Erro ao excluir produto.");

    }

}

function limparFormulario() {

    document.getElementById("nome").value = "";

    document.getElementById("valor").value = "";

    document.getElementById("estoque").value = "";

    document.getElementById("categoria").value = "";

    produtoEditando = null;

    document.querySelector(".form button").textContent =
        "Salvar";

}

async function iniciar() {

    await carregarCategorias();

    await carregarProdutos();

}

iniciar();