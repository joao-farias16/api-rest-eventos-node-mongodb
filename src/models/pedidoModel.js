const { pool } = require("../config/db");

async function listar() {
    const [rows] = await pool.execute(`
        SELECT
            p.id_pedido,
            p.data,
            p.clientes_id_cliente,
            c.nome AS cliente
        FROM pedidos p
        INNER JOIN clientes c
            ON c.id_cliente = p.clientes_id_cliente
    `);

    return rows;
}

async function buscarPorId(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM pedidos WHERE id_pedido = ?",
        [id]
    );

    return rows[0];
}

async function criar(data, clientes_id_cliente) {
    const [result] = await pool.execute(
        `INSERT INTO pedidos
        (data, clientes_id_cliente)
        VALUES (?, ?)`,
        [data, clientes_id_cliente]
    );

    return result.insertId;
}

async function atualizar(id, data, clientes_id_cliente) {
    await pool.execute(
        `UPDATE pedidos
        SET
            data = ?,
            clientes_id_cliente = ?
        WHERE id_pedido = ?`,
        [data, clientes_id_cliente, id]
    );
}

async function excluir(id) {

    // Exclui primeiro os itens do pedido
    await pool.execute(
        "DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?",
        [id]
    );

    // Depois exclui o pedido
    await pool.execute(
        "DELETE FROM pedidos WHERE id_pedido = ?",
        [id]
    );
}

async function adicionarProduto(
    pedido,
    produto,
    quantidade,
    valor
) {
    await pool.execute(
        `INSERT INTO produtos_pedidos
        (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
        VALUES (?, ?, ?, ?)`,
        [produto, pedido, quantidade, valor]
    );
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
    adicionarProduto
};