if (!localStorage.getItem("token")) {
    window.location.href = "/login";
}

const API = "/api/pedidos";
const API_CLIENTES = "/api/clientes";
const API_PRODUTOS = "/api/produtos";

let pedidoEditando = null;
let itensPedido = [];

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

    const res = await fetch(API_CLIENTES, {

        headers: headers()

    });

    const clientes = await res.json();

    const select =
        document.getElementById("cliente");

    select.innerHTML = `
        <option value="">
            Selecione um cliente
        </option>
    `;

    clientes.forEach(cliente => {

        select.innerHTML += `
            <option value="${cliente.id_cliente}">
                ${cliente.nome}
            </option>
        `;

    });

}

async function carregarProdutos() {

    const res = await fetch(API_PRODUTOS, {

        headers: headers()

    });

    const produtos = await res.json();

    const select =
        document.getElementById("produto");

    select.innerHTML = `
        <option value="">
            Selecione um produto
        </option>
    `;

    produtos.forEach(produto => {

        select.innerHTML += `
            <option
                value="${produto.id_produto}"
                data-valor="${produto.valor}"
                data-estoque="${produto.estoque}">

                ${produto.nome}

            </option>
        `;

    });

}

async function carregarPedidos() {

    const res = await fetch(API, {

        headers: headers()

    });

    const pedidos = await res.json();

    const tbody =
        document.getElementById("listaPedidos");

    tbody.innerHTML = "";

    pedidos.forEach(pedido => {

        tbody.innerHTML += `

            <tr>

                <td>${pedido.id_pedido}</td>

                <td>${pedido.data}</td>

                <td>${pedido.cliente}</td>

                <td>

                    <div class="actions">

                        <button
                            class="btn-delete"
                            onclick="excluirPedido(${pedido.id_pedido})">

                            Excluir

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

document.addEventListener("change", e => {

    if (e.target.id !== "produto")
        return;

    const option =
        e.target.options[e.target.selectedIndex];

    document.getElementById("valor").value =
        option.dataset.valor || "";

});

function adicionarProduto() {

    const clienteSelect =
        document.getElementById("cliente");

    const clienteId =
        clienteSelect.value;

    const clienteNome =
        clienteSelect.options[
            clienteSelect.selectedIndex
        ].text;

    const data =
        document.getElementById("data").value;

    const produtoSelect =
        document.getElementById("produto");

    const option =
        produtoSelect.options[
            produtoSelect.selectedIndex
        ];

    const id =
        Number(produtoSelect.value);

    const nome =
        option.text;

    const estoque =
        Number(option.dataset.estoque);

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);

    if (!clienteId) {

        alert("Selecione um cliente.");

        return;

    }

    if (!data) {

        alert("Informe a data do pedido.");

        return;

    }

    if (!id || !quantidade || !valor) {

        alert("Preencha todos os dados do produto.");

        return;

    }

    if (quantidade > estoque) {

        alert(`Estoque insuficiente. Disponível: ${estoque}`);

        return;

    }

    itensPedido.push({

        clienteId,

        clienteNome,

        produtos_id_produto: id,

        nome,

        quantidade,

        valor,

        subtotal: quantidade * valor

    });

    atualizarTabelaItens();

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}

function atualizarTabelaItens() {

    const tbody =
        document.getElementById("listaItens");

    tbody.innerHTML = "";

    itensPedido.forEach((item, index) => {

        tbody.innerHTML += `

            <tr>

                <td>${item.clienteNome}</td>

                <td>${item.nome}</td>

                <td>${item.quantidade}</td>

                <td>R$ ${item.valor.toFixed(2)}</td>

                <td>R$ ${item.subtotal.toFixed(2)}</td>

                <td>

                    <div class="actions">

                        <button
                            class="btn-delete"
                            onclick="removerItem(${index})">

                            Excluir

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

function removerItem(index) {

    itensPedido.splice(index, 1);

    atualizarTabelaItens();

}

async function salvarPedido() {

    const data =
        document.getElementById("data").value;

    const cliente =
        document.getElementById("cliente").value;

    if (!data || !cliente) {

        alert("Preencha a data e selecione um cliente.");

        return;

    }

    if (itensPedido.length === 0) {

        alert("Adicione pelo menos um produto.");

        return;

    }

    const body = {

        data,

        clientes_id_cliente: cliente,

        produtos: itensPedido.map(item => ({

            produtos_id_produto: item.produtos_id_produto,

            quantidade: item.quantidade,

            valor: item.valor

        }))

    };

    try {

        const res = await fetch(API, {

            method: "POST",

            headers: headers(),

            body: JSON.stringify(body)

        });

        const resposta = await res.json();

        if (!res.ok) {

            alert(resposta.msg);

            return;

        }

        alert(resposta.msg);

        limparFormulario();

        await carregarProdutos();

        await carregarPedidos();

    } catch (error) {

        console.error(error);

        alert("Erro ao salvar pedido.");

    }

}

async function excluirPedido(id) {

    if (!confirm("Deseja excluir este pedido?")) {

        return;

    }

    try {

        const res = await fetch(`${API}/${id}`, {

            method: "DELETE",

            headers: headers()

        });

        const resposta = await res.json();

        if (!res.ok) {

            alert(resposta.msg);

            return;

        }

        alert(resposta.msg);

        await carregarPedidos();

        await carregarProdutos();

    } catch (error) {

        console.error(error);

        alert("Erro ao excluir pedido.");

    }

}

function limparFormulario() {

    document.getElementById("data").value = "";

    document.getElementById("cliente").value = "";

    document.getElementById("produto").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";

    itensPedido = [];

    pedidoEditando = null;

    atualizarTabelaItens();

}

async function iniciar() {

    await carregarClientes();

    await carregarProdutos();

    await carregarPedidos();

}

iniciar();